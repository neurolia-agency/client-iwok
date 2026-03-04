const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

gsap.registerPlugin(ScrollTrigger);

const wrapper = document.querySelector(".col-scroll");
const boxes = gsap.utils.toArray(".col-scroll__box");

const columns = boxes
  .map((box, index) => {
    const list = box.querySelector(".col-scroll__list");
    if (!list) return null;

    const isCenterColumn = index === 1;
    const travelPx = Math.max(list.scrollHeight - box.clientHeight, 0);
    return { list, isCenterColumn, travelPx };
  })
  .filter(Boolean);

if (wrapper && columns.length) {
  columns.forEach(({ list, isCenterColumn, travelPx }) => {
    gsap.set(list, { y: isCenterColumn ? 0 : -travelPx });
  });

  const maxTravelPx = Math.max(...columns.map((column) => column.travelPx), 0);
  const pinDistance = Math.max(window.innerHeight * 0.9, maxTravelPx * 1.4);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapper,
      start: "center 62%",
      end: `+=${pinDistance}`,
      scrub: true,
      pin: true,
      anticipatePin: 1
      // markers: true
    }
  });

  columns.forEach(({ list, isCenterColumn, travelPx }) => {
    tl.to(
      list,
      { y: isCenterColumn ? -travelPx : 0, ease: "none" },
      0
    );
  });
}
