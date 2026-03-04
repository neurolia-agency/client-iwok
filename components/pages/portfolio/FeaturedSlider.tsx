"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { FEATURED_SLIDES, SUBCATEGORY_SLUGS } from "@/data/portfolio-projects";
import * as THREE from "three";
import gsap from "gsap";

const VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAG = `
varying vec2 vUv;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D disp;
uniform float dispPower;
uniform float intensity;
uniform vec2 size;
uniform vec2 res;

vec2 backgroundCoverUv(vec2 screenSize, vec2 imageSize, vec2 uv) {
  float screenRatio = screenSize.x / screenSize.y;
  float imageRatio = imageSize.x / imageSize.y;
  vec2 newSize = screenRatio < imageRatio
    ? vec2(imageSize.x * (screenSize.y / imageSize.y), screenSize.y)
    : vec2(screenSize.x, imageSize.y * (screenSize.x / imageSize.x));
  vec2 newOffset = (screenRatio < imageRatio
    ? vec2((newSize.x - screenSize.x) / 2.0, 0.0)
    : vec2(0.0, (newSize.y - screenSize.y) / 2.0)) / newSize;
  return uv * screenSize / newSize + newOffset;
}

void main() {
  vec2 uv = backgroundCoverUv(res, size, vUv);
  vec4 dispTex = texture2D(disp, vUv);
  vec2 dispVec = vec2(dispTex.x, dispTex.y);
  vec2 distPos1 = uv + (dispVec * intensity * dispPower);
  vec2 distPos2 = uv + (dispVec * -(intensity * (1.0 - dispPower)));
  vec4 _texture1 = texture2D(texture1, distPos1);
  vec4 _texture2 = texture2D(texture2, distPos2);
  gl_FragColor = mix(_texture1, _texture2, dispPower);
}
`;

export default function FeaturedSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const animatingRef = useRef(false);
  const matRef = useRef<THREE.ShaderMaterial | null>(null);
  const texturesRef = useRef<THREE.Texture[]>([]);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const currentRef = useRef(0);

  // Preview image refs for GSAP
  const previewRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bulletLineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  // Pre-cached DOM nodes to avoid querySelectorAll during animations
  const previewImgsCache = useRef<Map<number, NodeListOf<Element>>>(new Map());
  const titleInnersCache = useRef<Map<number, Element | null>>(new Map());

  const render = useCallback(() => {
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  }, []);

  // Helper to get cached preview imgs
  const getPreviewImgs = useCallback((index: number) => {
    if (!previewImgsCache.current.has(index)) {
      const el = previewRefs.current[index];
      if (el) previewImgsCache.current.set(index, el.querySelectorAll(".preview-img"));
    }
    return previewImgsCache.current.get(index);
  }, []);

  const getTitleInner = useCallback((index: number) => {
    if (!titleInnersCache.current.has(index)) {
      const el = titleRefs.current[index];
      if (el) titleInnersCache.current.set(index, el.querySelector(".title-inner"));
    }
    return titleInnersCache.current.get(index);
  }, []);

  const goToSlide = useCallback((next: number) => {
    if (animatingRef.current || next === currentRef.current) return;
    animatingRef.current = true;

    const mat = matRef.current;
    const textures = texturesRef.current;
    if (!mat || textures.length === 0) return;

    const prev = currentRef.current;
    currentRef.current = next;

    // Set texture2 to the next slide
    mat.uniforms.texture2.value = textures[next];

    // Get cached DOM nodes
    const currentPreviews = previewRefs.current[prev];
    const nextPreviews = previewRefs.current[next];
    const currentTitle = titleRefs.current[prev];
    const nextTitle = titleRefs.current[next];
    const currentImgs = getPreviewImgs(prev);
    const nextImgs = getPreviewImgs(next);
    const currentTitleInner = getTitleInner(prev);
    const nextTitleInner = getTitleInner(next);
    const prevLine = bulletLineRefs.current[prev];
    const nextLine = bulletLineRefs.current[next];

    // Single coordinated timeline instead of ~8 independent tweens
    const tl = gsap.timeline({
      onComplete: () => {
        // Reset WebGL uniforms
        mat.uniforms.dispPower.value = 0.0;
        mat.uniforms.texture1.value = textures[next];
        mat.uniforms.texture2.value = textures[(next + 1) % textures.length];
        render();
        animatingRef.current = false;
        // React state update AFTER animation completes (avoids mid-animation re-render)
        setCurrent(next);
      },
    });

    // WebGL displacement
    tl.to(mat.uniforms.dispPower, { value: 1, duration: 2, ease: "expo.inOut", onUpdate: render }, 0);

    // Animate out current previews
    if (currentImgs && currentImgs.length > 0) {
      tl.to(currentImgs, { yPercent: -185, scaleY: 1.5, duration: 1.5, ease: "expo.inOut", stagger: 0.075 }, 0);
    }
    if (currentPreviews) {
      tl.set(currentPreviews, { autoAlpha: 0 }, 1.5);
    }

    // Animate out current title
    if (currentTitleInner) {
      tl.to(currentTitleInner, { yPercent: -100, duration: 1.5, ease: "power4.inOut" }, 0);
    }
    if (currentTitle) {
      tl.set(currentTitle, { autoAlpha: 0 }, 1.5);
    }

    // Animate bullet lines
    if (prevLine) {
      tl.set(prevLine, { transformOrigin: "right" }, 0);
      tl.to(prevLine, { scaleX: 0, duration: 1.5, ease: "expo.inOut" }, 0);
    }

    // Animate in next previews
    if (nextPreviews && nextImgs && nextImgs.length > 0) {
      tl.set(nextPreviews, { autoAlpha: 1 }, 0.8);
      tl.fromTo(nextImgs, { yPercent: 150, scaleY: 1.5 }, { yPercent: 0, scaleY: 1, duration: 1.5, ease: "expo.inOut", stagger: 0.075 }, 0.8);
    }

    // Animate in next title
    if (nextTitle && nextTitleInner) {
      tl.set(nextTitle, { autoAlpha: 1 }, 1.2);
      tl.fromTo(nextTitleInner, { yPercent: 100 }, { yPercent: 0, duration: 1.5, ease: "power4.out" }, 1.2);
    }

    if (nextLine) {
      tl.set(nextLine, { transformOrigin: "left" }, 0.8);
      tl.to(nextLine, { scaleX: 1, duration: 1.5, ease: "expo.inOut" }, 0.8);
    }
  }, [render, getPreviewImgs, getTitleInner]);

  const goPrev = useCallback(() => {
    const prev = (currentRef.current - 1 + FEATURED_SLIDES.length) % FEATURED_SLIDES.length;
    goToSlide(prev);
  }, [goToSlide]);

  const goNext = useCallback(() => {
    const next = (currentRef.current + 1) % FEATURED_SLIDES.length;
    goToSlide(next);
  }, [goToSlide]);

  // Init Three.js
  useEffect(() => {
    const el = containerRef.current;
    const inner = canvasRef.current;
    if (!el || !inner) return;

    const w = el.offsetWidth;
    const h = el.offsetHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(w / -2, w / 2, h / 2, h / -2, 1, 1000);
    camera.lookAt(scene.position);
    camera.position.z = 1;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    inner.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const loader = new THREE.TextureLoader();
    const textures: THREE.Texture[] = [];
    let loadedCount = 0;

    const disp = loader.load("/images/deco/rock-disp.png");
    disp.magFilter = THREE.LinearFilter;
    disp.minFilter = THREE.LinearFilter;
    disp.wrapS = THREE.RepeatWrapping;
    disp.wrapT = THREE.RepeatWrapping;

    FEATURED_SLIDES.forEach((slide, i) => {
      const tex = loader.load(slide.background, (t) => {
        loadedCount++;
        if (loadedCount === FEATURED_SLIDES.length && matRef.current) {
          matRef.current.uniforms.size.value = new THREE.Vector2(
            t.image.naturalWidth || 1600,
            t.image.naturalHeight || 1200
          );
          renderer.render(scene, camera);
        }
      });
      tex.minFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      textures[i] = tex;
    });
    texturesRef.current = textures;

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        dispPower: { value: 0.0 },
        intensity: { value: 0.5 },
        res: { value: new THREE.Vector2(w, h) },
        size: { value: new THREE.Vector2(1600, 1200) },
        texture1: { value: textures[0] },
        texture2: { value: textures[1] },
        disp: { value: disp },
      },
      transparent: true,
      vertexShader: VERT,
      fragmentShader: FRAG,
    });
    matRef.current = mat;

    const geometry = new THREE.PlaneGeometry(w, h, 1);
    const mesh = new THREE.Mesh(geometry, mat);
    scene.add(mesh);

    renderer.render(scene, camera);

    // Resize handler
    const onResize = () => {
      const nw = el.offsetWidth;
      const nh = el.offsetHeight;
      renderer.setSize(nw, nh);
      camera.left = nw / -2;
      camera.right = nw / 2;
      camera.top = nh / 2;
      camera.bottom = nh / -2;
      camera.updateProjectionMatrix();
      mat.uniforms.res.value.set(nw, nh);
      mesh.geometry.dispose();
      mesh.geometry = new THREE.PlaneGeometry(nw, nh, 1);
      renderer.render(scene, camera);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      mat.dispose();
      inner.removeChild(renderer.domElement);
    };
  }, []);

  // Autoplay 3s
  useEffect(() => {
    const interval = setInterval(() => {
      goNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [goNext]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "80vh",
        overflow: "hidden",
        borderRadius: "0.5rem",
      }}
    >
      {/* WebGL canvas */}
      <div
        ref={canvasRef}
        style={{ position: "absolute", inset: 0 }}
      />

      {/* Dark overlay for readability */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", pointerEvents: "none" }} />

      {/* Slides (preview images) — initial visibility set via inline styles */}
      {FEATURED_SLIDES.map((slide, i) => (
        <div
          key={slide.subcategory}
          ref={(el) => { previewRefs.current[i] = el; }}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            pointerEvents: "none",
            opacity: i === 0 ? 1 : 0,
            visibility: i === 0 ? "visible" : "hidden",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "2rem", paddingRight: "3rem" }}>
            <figure
              className="preview-img"
              style={{
                position: "relative",
                width: "15vw",
                minWidth: "8rem",
                height: "45vh",
                margin: 0,
                padding: 0,
                overflow: "hidden",
                top: "-1.5rem",
                transformOrigin: "top",
                willChange: "transform, opacity",
              }}
            >
              <img
                src={slide.preview1}
                alt=""
                style={{ display: "block", position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                loading="lazy"
              />
            </figure>
            <figure
              className="preview-img"
              style={{
                position: "relative",
                width: "15vw",
                minWidth: "8rem",
                height: "45vh",
                margin: 0,
                padding: 0,
                overflow: "hidden",
                bottom: "-1.5rem",
                transformOrigin: "top",
                willChange: "transform, opacity",
              }}
            >
              <img
                src={slide.preview2}
                alt=""
                style={{ display: "block", position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                loading="lazy"
              />
            </figure>
          </div>
        </div>
      ))}

      {/* Titles — only active slide visible, others hidden */}
      {FEATURED_SLIDES.map((slide, i) => (
        <div
          key={`title-${slide.subcategory}`}
          ref={(el) => { titleRefs.current[i] = el; }}
          style={{
            position: "absolute",
            top: "50%",
            left: "clamp(1.5rem, 4vw, 3rem)",
            transform: "translateY(-50%)",
            zIndex: 10,
            overflow: "hidden",
            pointerEvents: "none",
            willChange: "transform, opacity",
            opacity: i === 0 ? 1 : 0,
            visibility: i === 0 ? "visible" : "hidden",
          }}
        >
          <div
            className="title-inner"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.25rem, 3vw, 2.5rem)",
              textTransform: "uppercase",
              lineHeight: 1.075,
              color: "#fff",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            {slide.subcategory}
          </div>
        </div>
      ))}

      {/* Arrow navigation + counter */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(1.5rem, 4vw, 3rem)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "1.25rem",
        }}
      >
        <button
          onClick={goPrev}
          aria-label="Slide précédent"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "3rem",
            height: "3rem",
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "50%",
            cursor: "pointer",
            color: "#fff",
            fontSize: "1.25rem",
            transition: "background 0.3s",
          }}
        >
          &#8592;
        </button>
        <span
          style={{
            color: "#fff",
            fontSize: "0.85rem",
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            opacity: 0.8,
            whiteSpace: "nowrap",
          }}
        >
          {String(current + 1).padStart(2, "0")}/{String(FEATURED_SLIDES.length).padStart(2, "0")}
        </span>
        <button
          onClick={goNext}
          aria-label="Slide suivant"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "3rem",
            height: "3rem",
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "50%",
            cursor: "pointer",
            color: "#fff",
            fontSize: "1.25rem",
            transition: "background 0.3s",
          }}
        >
          &#8594;
        </button>
      </div>

      {/* Bullet nav — hidden */}
      <nav
        style={{
          display: "none",
        }}
      >
        {FEATURED_SLIDES.map((slide, i) => (
          <button
            key={`bullet-${slide.subcategory}`}
            onClick={() => goToSlide(i)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.75rem 0",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            aria-label={`Aller à ${slide.subcategory}`}
          >
            <span
              style={{
                color: "#fff",
                fontSize: "0.7rem",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                opacity: i === 0 ? 1 : 0.25,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              ref={(el) => { bulletLineRefs.current[i] = el; }}
              style={{
                display: "block",
                width: "1.5rem",
                height: "1px",
                backgroundColor: "#fff",
                transform: i === 0 ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
              }}
            />
          </button>
        ))}
      </nav>

      {/* CTA "Voir les projets {subcategory}" — links to subcategory page */}
      <Link
        href={`/portfolio/${SUBCATEGORY_SLUGS[FEATURED_SLIDES[current].subcategory]}`}
        style={{
          position: "absolute",
          bottom: "clamp(1.5rem, 4vw, 3rem)",
          right: "clamp(1rem, 3vw, 2rem)",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.6rem 1.25rem",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "2rem",
          color: "#fff",
          fontSize: "0.75rem",
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          textDecoration: "none",
          transition: "background 0.3s",
        }}
      >
        Voir les projets {FEATURED_SLIDES[current].subcategory}
      </Link>
    </div>
  );
}
