// ==========================================
//  Three.js Hero Background
//  FIX: renderer.setClearColor(0x0a0a0a) ensures
//       canvas background is always dark, never
//       transparent white on scroll up.
//  FIX: resize uses debounce — no more rerender
//       stutter on window resize.
//  FIX: mousemove uses passive:true — never
//       blocks scroll/pointer events.
//  FIX: particle count reduced 600→350 for
//       smoother framerate on mid-range hardware.
// ==========================================

(function () {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas || typeof THREE === "undefined") return;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,          // FIX: alpha:false prevents transparent white bleed
    powerPreference: "high-performance"
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // FIX: cap at 1.5 not 2
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x0a0a0a, 1);  // FIX: always dark background, matches --bg

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 5);

  // Wireframe torus knot
  const geometry = new THREE.TorusKnotGeometry(1.4, 0.38, 120, 16);
  const material = new THREE.MeshBasicMaterial({
    color:       0x38bdf8,
    wireframe:   true,
    transparent: true,
    opacity:     0.1
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(3.5, 0, 0);
  scene.add(mesh);

  // Particle field — reduced count for performance
  const particleCount = 350;
  const positions     = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const pMat = new THREE.PointsMaterial({
    color:       0x38bdf8,
    size:        0.022,
    transparent: true,
    opacity:     0.3
  });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  // Mouse — passive listener, only updates variables (no DOM writes)
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;

  document.addEventListener("mousemove", (e) => {
    targetMouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  // Animation loop — lerp mouse for smooth tracking
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Smooth mouse lerp
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    mesh.rotation.x = t * 0.16 + mouseY * 0.18;
    mesh.rotation.y = t * 0.22 + mouseX * 0.18;

    particles.rotation.y = t * 0.03;
    particles.rotation.x = t * 0.015;

    renderer.render(scene, camera);
  }
  animate();

  // Debounced resize — prevents stutter on resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, 150);
  }, { passive: true });

})();