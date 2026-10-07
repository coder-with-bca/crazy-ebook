import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const canvas = document.getElementById("hero3dCanvas");
const host = document.getElementById("heroScene");
const section = document.getElementById("heroSection");

if (canvas && host && section) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "low-power"
    });
  } catch (error) {
    canvas.hidden = true;
    canvas.style.display = "none";
    console.info("WebGL is unavailable; showing the static hero artwork instead.", error);
  }

  if (renderer) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
    camera.position.set(0, 0.05, 5.8);

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

    scene.add(new THREE.HemisphereLight(0xffffff, 0x9aa4d1, 2.2));
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.1);
    keyLight.position.set(-3.5, 4.5, 6);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xc7d2fe, 2.1);
    fillLight.position.set(4, 1, 2);
    scene.add(fillLight);

    const bookRig = new THREE.Group();
    scene.add(bookRig);

    const scroll = { target: 0, current: 0 };
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let resizeObserver;

    function resize() {
      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      camera.aspect = width / height;
      camera.position.z = width < 480 ? 6.2 : 5.8;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.setSize(width, height, false);
      if (reducedMotion.matches || !visible) renderer.render(scene, camera);
    }

    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    window.addEventListener("resize", resize, { passive: true });

    canvas.addEventListener("pointermove", event => {
      if (reducedMotion.matches) return;
      const bounds = canvas.getBoundingClientRect();
      pointer.targetX = THREE.MathUtils.clamp(((event.clientX - bounds.left) / bounds.width - 0.5) * 2, -1, 1);
      pointer.targetY = THREE.MathUtils.clamp(((event.clientY - bounds.top) / bounds.height - 0.5) * 2, -1, 1);
    }, { passive: true });
    canvas.addEventListener("pointerleave", () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
    }, { passive: true });

    function updateScroll() {
      const bounds = section.getBoundingClientRect();
      scroll.target = THREE.MathUtils.clamp(-bounds.top / Math.max(bounds.height, 1), 0, 1);
      const darkTheme = document.documentElement.dataset.theme === "dark";
      const from = darkTheme ? [11, 18, 32] : [255, 255, 255];
      const to = darkTheme ? [35, 49, 86] : [224, 232, 255];
      const color = from.map((channel, index) => Math.round(channel + (to[index] - channel) * scroll.target));
      section.style.backgroundColor = `rgb(${color.join(",")})`;
    }

    let scrollFrame = 0;
    window.addEventListener("scroll", () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        updateScroll();
        scrollFrame = 0;
      });
    }, { passive: true });
    updateScroll();
    new MutationObserver(updateScroll).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    function renderFrame(time = 0) {
      if (!visible) return;
      if (reducedMotion.matches) {
        renderer.render(scene, camera);
        renderer.setAnimationLoop(null);
        return;
      }

      const seconds = time * 0.001;
      scroll.current += (scroll.target - scroll.current) * 0.055;
      pointer.x += (pointer.targetX - pointer.x) * 0.075;
      pointer.y += (pointer.targetY - pointer.y) * 0.075;

      bookRig.rotation.y = 0.24 + scroll.current * 0.48 + pointer.x * 0.2 + Math.sin(seconds * 0.36) * 0.025;
      bookRig.rotation.x = -0.11 + scroll.current * 0.2 + pointer.y * 0.13 + Math.sin(seconds * 0.52) * 0.014;
      bookRig.position.y = 0.24 + Math.sin(seconds * 0.82) * 0.055;

      camera.position.x += (scroll.current * 0.18 + pointer.x * 0.1 - camera.position.x) * 0.035;
      camera.position.y += (0.05 - scroll.current * 0.12 - pointer.y * 0.07 - camera.position.y) * 0.035;
      camera.lookAt(0, 0.12, 0);
      renderer.render(scene, camera);
    }

    const visibilityObserver = new IntersectionObserver(entries => {
      visible = entries[0]?.isIntersecting ?? false;
      renderer.setAnimationLoop(visible && !reducedMotion.matches ? renderFrame : null);
      if (visible && reducedMotion.matches) renderer.render(scene, camera);
    }, { threshold: 0.05 });
    visibilityObserver.observe(host);

    reducedMotion.addEventListener("change", () => {
      renderer.setAnimationLoop(visible && !reducedMotion.matches ? renderFrame : null);
      if (visible && reducedMotion.matches) renderer.render(scene, camera);
    });

    new GLTFLoader().load("assets/ebook.glb", gltf => {
      const model = gltf.scene;
      const bounds = new THREE.Box3().setFromObject(model);
      const center = bounds.getCenter(new THREE.Vector3());
      const size = bounds.getSize(new THREE.Vector3());
      model.position.sub(center);
      model.scale.multiplyScalar(2.55 / size.y);
      bookRig.add(model);
      host.classList.add("is-loaded");
      resize();
      if (visible && reducedMotion.matches) renderer.render(scene, camera);
    }, undefined, error => {
      console.info("The 3D ebook model could not be loaded; showing the static hero artwork instead.", error);
    });
  }
}
