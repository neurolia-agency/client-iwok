import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from "pdf-lib";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface InvoiceCustomer {
  name: string;
  email: string;
  phone?: string | null;
  shippingLine1: string;
  shippingLine2: string | null;
  shippingPostalCode: string;
  shippingCity: string;
  shippingCountry: string;
}

export interface InvoiceItem {
  title: string;
  quantity: number;
  priceCents: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: Date;
  paidAt: Date;
  orderRef: string;
  customer: InvoiceCustomer;
  items: InvoiceItem[];
  shippingCostCents: number;
  totalCents: number;
  isPickup: boolean;
  currency: string;
}

// ─── Couleurs (palette IWOK) ─────────────────────────────────────────────────

const COLOR = {
  ink: rgb(0.11, 0.098, 0.09),       // foreground stone
  muted: rgb(0.47, 0.44, 0.42),      // muted-foreground
  light: rgb(0.86, 0.84, 0.81),      // border
  accent: rgb(0.66, 0.58, 0.41),     // primary terracotta-ish
  paper: rgb(0.97, 0.96, 0.95),      // background-alt
  white: rgb(1, 1, 1),
};

const fmt = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatDate(d: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

// pdf-lib WinAnsi ne gère pas certains caractères — on remplace les plus fréquents
function safeWinAnsi(s: string): string {
  return s
    .replace(/—/g, "-")
    .replace(/–/g, "-")
    .replace(/…/g, "...")
    .replace(/œ/g, "oe")
    .replace(/Œ/g, "OE")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/ /g, " ");
}

// ─── Helpers de dessin ────────────────────────────────────────────────────────

function drawText(
  page: PDFPage,
  text: string,
  opts: {
    x: number;
    y: number;
    font: PDFFont;
    size: number;
    color?: ReturnType<typeof rgb>;
    maxWidth?: number;
  }
): void {
  page.drawText(safeWinAnsi(text), {
    x: opts.x,
    y: opts.y,
    size: opts.size,
    font: opts.font,
    color: opts.color ?? COLOR.ink,
    maxWidth: opts.maxWidth,
  });
}

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const safe = safeWinAnsi(text);
  const words = safe.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const w of words) {
    const candidate = current ? `${current} ${w}` : w;
    const width = font.widthOfTextAtSize(candidate, size);
    if (width <= maxWidth) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = w;
    }
  }
  if (current) lines.push(current);
  return lines;
}

// ─── Génération du PDF ────────────────────────────────────────────────────────

export async function generateInvoicePdf(data: InvoiceData): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`Facture ${data.invoiceNumber}`);
  pdf.setAuthor("IWOK / GuiHome Decoration");
  pdf.setCreator("guihome-art.com");
  pdf.setProducer("guihome-art.com");

  const page = pdf.addPage([595.28, 841.89]); // A4 portrait
  const { width, height } = page.getSize();

  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const fontItalic = await pdf.embedFont(StandardFonts.HelveticaOblique);

  const marginX = 50;
  const marginTop = 50;
  let y = height - marginTop;

  // ── 1. Header bandeau sombre ────────────────────────────────────────────
  page.drawRectangle({
    x: 0,
    y: y - 70,
    width,
    height: 70,
    color: COLOR.ink,
  });

  drawText(page, "IWOK / GuiHome Decoration", {
    x: marginX,
    y: y - 28,
    font: fontBold,
    size: 14,
    color: COLOR.white,
  });
  drawText(page, "Guillaume Jeanjean - Artiste mural", {
    x: marginX,
    y: y - 48,
    font: font,
    size: 9,
    color: rgb(0.78, 0.7, 0.5),
  });

  // Numéro de facture aligné à droite dans le bandeau
  const factureLabel = "FACTURE";
  const factureWidth = fontBold.widthOfTextAtSize(factureLabel, 11);
  drawText(page, factureLabel, {
    x: width - marginX - factureWidth,
    y: y - 28,
    font: fontBold,
    size: 11,
    color: rgb(0.78, 0.7, 0.5),
  });
  const invNumWidth = fontBold.widthOfTextAtSize(data.invoiceNumber, 14);
  drawText(page, data.invoiceNumber, {
    x: width - marginX - invNumWidth,
    y: y - 48,
    font: fontBold,
    size: 14,
    color: COLOR.white,
  });

  y -= 95;

  // ── 2. Bloc Émetteur + Client ────────────────────────────────────────────
  const blockY = y;
  const colWidth = (width - marginX * 2 - 30) / 2;

  // Émetteur (gauche)
  drawText(page, "EMETTEUR", {
    x: marginX,
    y: blockY,
    font: fontBold,
    size: 8,
    color: COLOR.accent,
  });

  let leftY = blockY - 18;
  const emitteurLines = [
    { text: "Guillaume Jeanjean", bold: true },
    { text: "IWOK / GuiHome Decoration", bold: false },
    { text: "15 rue Bellevue", bold: false },
    { text: "12510 Olemps - France", bold: false },
    { text: "SIRET 812 130 086 00018", bold: false },
    { text: "contact@guihome-art.com", bold: false },
  ];
  for (const line of emitteurLines) {
    drawText(page, line.text, {
      x: marginX,
      y: leftY,
      font: line.bold ? fontBold : font,
      size: 9,
      color: line.bold ? COLOR.ink : COLOR.muted,
    });
    leftY -= 13;
  }

  // Client (droite)
  const rightX = marginX + colWidth + 30;
  drawText(page, "DESTINATAIRE", {
    x: rightX,
    y: blockY,
    font: fontBold,
    size: 8,
    color: COLOR.accent,
  });

  let rightY = blockY - 18;
  drawText(page, data.customer.name || "-", {
    x: rightX,
    y: rightY,
    font: fontBold,
    size: 9,
    color: COLOR.ink,
  });
  rightY -= 13;

  const clientAddressLines: string[] = [];
  if (data.isPickup) {
    clientAddressLines.push("Retrait sur place");
    clientAddressLines.push("5 Pl. de la Fontaine, 12510 Olemps");
  } else {
    if (data.customer.shippingLine1) clientAddressLines.push(data.customer.shippingLine1);
    if (data.customer.shippingLine2) clientAddressLines.push(data.customer.shippingLine2);
    if (data.customer.shippingPostalCode || data.customer.shippingCity) {
      clientAddressLines.push(
        `${data.customer.shippingPostalCode} ${data.customer.shippingCity}`.trim()
      );
    }
    if (data.customer.shippingCountry) {
      clientAddressLines.push(data.customer.shippingCountry);
    }
  }
  for (const line of clientAddressLines) {
    drawText(page, line, {
      x: rightX,
      y: rightY,
      font: font,
      size: 9,
      color: COLOR.muted,
    });
    rightY -= 13;
  }
  if (data.customer.email) {
    drawText(page, data.customer.email, {
      x: rightX,
      y: rightY,
      font: font,
      size: 9,
      color: COLOR.muted,
    });
    rightY -= 13;
  }
  if (data.customer.phone) {
    drawText(page, data.customer.phone, {
      x: rightX,
      y: rightY,
      font: font,
      size: 9,
      color: COLOR.muted,
    });
    rightY -= 13;
  }

  y = Math.min(leftY, rightY) - 20;

  // ── 3. Métadonnées facture (date / commande / mode) ──────────────────────
  page.drawRectangle({
    x: marginX,
    y: y - 50,
    width: width - marginX * 2,
    height: 50,
    color: COLOR.paper,
  });

  const metaTop = y - 15;
  const metaItems = [
    { label: "Date d'emission", value: formatDate(data.invoiceDate) },
    { label: "Date de paiement", value: formatDate(data.paidAt) },
    { label: "Reference commande", value: `#${data.orderRef}` },
    { label: "Mode", value: data.isPickup ? "Retrait sur place" : "Livraison" },
  ];
  const metaColWidth = (width - marginX * 2) / metaItems.length;
  metaItems.forEach((item, i) => {
    const x = marginX + i * metaColWidth + 12;
    drawText(page, item.label.toUpperCase(), {
      x,
      y: metaTop,
      font: font,
      size: 7,
      color: COLOR.muted,
    });
    drawText(page, item.value, {
      x,
      y: metaTop - 16,
      font: fontBold,
      size: 10,
      color: COLOR.ink,
    });
  });

  y -= 75;

  // ── 4. Tableau des items ─────────────────────────────────────────────────
  // En-tête
  const tableX = marginX;
  const tableW = width - marginX * 2;
  page.drawRectangle({
    x: tableX,
    y: y - 22,
    width: tableW,
    height: 22,
    color: COLOR.ink,
  });

  const colQtyW = 50;
  const colPriceW = 90;
  const colTotalW = 90;
  const colDescX = tableX + 14;
  const colDescW = tableW - colQtyW - colPriceW - colTotalW - 14 - 14;
  const colQtyX = colDescX + colDescW;
  const colPriceX = colQtyX + colQtyW;
  const colTotalX = colPriceX + colPriceW;
  const headerY = y - 15;

  drawText(page, "DESIGNATION", {
    x: colDescX,
    y: headerY,
    font: fontBold,
    size: 8,
    color: COLOR.white,
  });
  // Right-align column headers
  const qtyHead = "QTE";
  drawText(page, qtyHead, {
    x: colQtyX + colQtyW - fontBold.widthOfTextAtSize(qtyHead, 8) - 8,
    y: headerY,
    font: fontBold,
    size: 8,
    color: COLOR.white,
  });
  const priceHead = "PRIX UNITAIRE";
  drawText(page, priceHead, {
    x: colPriceX + colPriceW - fontBold.widthOfTextAtSize(priceHead, 8) - 8,
    y: headerY,
    font: fontBold,
    size: 8,
    color: COLOR.white,
  });
  const totalHead = "TOTAL";
  drawText(page, totalHead, {
    x: colTotalX + colTotalW - fontBold.widthOfTextAtSize(totalHead, 8) - 14,
    y: headerY,
    font: fontBold,
    size: 8,
    color: COLOR.white,
  });

  y -= 22;

  // Lignes items
  for (const item of data.items) {
    const titleLines = wrapText(item.title, font, 10, colDescW - 10);
    const rowH = Math.max(24, titleLines.length * 12 + 10);

    // background alternating? Keep white for simplicity
    let titleY = y - 14;
    for (let i = 0; i < titleLines.length; i++) {
      drawText(page, titleLines[i], {
        x: colDescX,
        y: titleY,
        font: i === 0 ? fontBold : font,
        size: 10,
        color: i === 0 ? COLOR.ink : COLOR.muted,
      });
      titleY -= 12;
    }

    const qty = String(item.quantity);
    drawText(page, qty, {
      x: colQtyX + colQtyW - font.widthOfTextAtSize(qty, 10) - 8,
      y: y - 14,
      font: font,
      size: 10,
      color: COLOR.ink,
    });

    const priceStr = fmt.format(item.priceCents / 100);
    drawText(page, priceStr, {
      x: colPriceX + colPriceW - font.widthOfTextAtSize(priceStr, 10) - 8,
      y: y - 14,
      font: font,
      size: 10,
      color: COLOR.ink,
    });

    const lineTotal = fmt.format((item.priceCents * item.quantity) / 100);
    drawText(page, lineTotal, {
      x: colTotalX + colTotalW - fontBold.widthOfTextAtSize(lineTotal, 10) - 14,
      y: y - 14,
      font: fontBold,
      size: 10,
      color: COLOR.ink,
    });

    y -= rowH;
    // Ligne séparatrice fine
    page.drawLine({
      start: { x: tableX, y },
      end: { x: tableX + tableW, y },
      color: COLOR.light,
      thickness: 0.5,
    });
  }

  // Frais de port (ligne supplémentaire si > 0 et pas pickup)
  if (data.shippingCostCents > 0 && !data.isPickup) {
    drawText(page, "Frais de port", {
      x: colDescX,
      y: y - 16,
      font: font,
      size: 10,
      color: COLOR.ink,
    });
    const shipPrice = fmt.format(data.shippingCostCents / 100);
    drawText(page, shipPrice, {
      x: colTotalX + colTotalW - fontBold.widthOfTextAtSize(shipPrice, 10) - 14,
      y: y - 16,
      font: fontBold,
      size: 10,
      color: COLOR.ink,
    });
    y -= 24;
    page.drawLine({
      start: { x: tableX, y },
      end: { x: tableX + tableW, y },
      color: COLOR.light,
      thickness: 0.5,
    });
  }

  y -= 16;

  // ── 5. Total ─────────────────────────────────────────────────────────────
  const totalLabel = "TOTAL TTC";
  const totalValue = fmt.format(data.totalCents / 100);

  // Bandeau total à droite
  const totalBoxW = 240;
  const totalBoxX = width - marginX - totalBoxW;
  page.drawRectangle({
    x: totalBoxX,
    y: y - 50,
    width: totalBoxW,
    height: 50,
    color: COLOR.ink,
  });

  drawText(page, totalLabel, {
    x: totalBoxX + 16,
    y: y - 22,
    font: fontBold,
    size: 10,
    color: rgb(0.78, 0.7, 0.5),
  });
  drawText(page, totalValue, {
    x: totalBoxX + totalBoxW - fontBold.widthOfTextAtSize(totalValue, 16) - 16,
    y: y - 30,
    font: fontBold,
    size: 16,
    color: COLOR.white,
  });

  y -= 70;

  // ── 6. Mentions légales obligatoires ─────────────────────────────────────
  const legalLines = [
    "TVA non applicable, art. 293 B du CGI.",
    "Facture acquittee - reglement comptant par carte bancaire via Stripe.",
    "Conformement a l'article 1231-5 du Code civil, tout retard de paiement entrainera des penalites au taux legal.",
    "Pas d'escompte pour paiement anticipe.",
  ];
  for (const line of legalLines) {
    drawText(page, line, {
      x: marginX,
      y,
      font: fontItalic,
      size: 8,
      color: COLOR.muted,
      maxWidth: width - marginX * 2,
    });
    y -= 12;
  }

  // ── 7. Footer ────────────────────────────────────────────────────────────
  const footerY = 40;
  page.drawLine({
    start: { x: marginX, y: footerY + 28 },
    end: { x: width - marginX, y: footerY + 28 },
    color: COLOR.light,
    thickness: 0.5,
  });

  drawText(page, "www.guihome-art.com  -  contact@guihome-art.com", {
    x: marginX,
    y: footerY + 14,
    font: font,
    size: 8,
    color: COLOR.muted,
  });

  const pageLabel = "1 / 1";
  drawText(page, pageLabel, {
    x: width - marginX - font.widthOfTextAtSize(pageLabel, 8),
    y: footerY + 14,
    font: font,
    size: 8,
    color: COLOR.muted,
  });

  return await pdf.save();
}
