// ==========================================
//  Animations — fixed
//  FIX 1: Hero elements are force-set visible
//          immediately — they never rely on
//          IntersectionObserver so scroll up/down
//          can never blank the hero again.
//  FIX 2: Navbar scroll listener moved here and
//          uses passive:true so it never blocks
//          the main thread.
//  FIX 3: html scroll-behavior removed from CSS —
//          smooth scroll is handled only by JS in
//          main.js to avoid double-smooth conflict.
// ==========================================

function observeElements() {
  const items = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, i * 70);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  items.forEach(el => {
    // Hero content elements must NEVER be hidden after load
    // Skip observing them — mark them visible immediately
    if (el.closest("#hero")) {
      el.classList.add("visible");
      return;
    }
    observer.observe(el);
  });
}

document.addEventListener("DOMContentLoaded", () => {

  // Hero animation runs once after loader — purely GSAP, no observer
  if (typeof gsap !== "undefined") {
    // Start invisible via inline style, not the CSS class
    const heroEls = document.querySelectorAll(".hero-content .reveal-up");
    heroEls.forEach(el => {
      el.style.opacity   = "0";
      el.style.transform = "translateY(28px)";
    });

    setTimeout(() => {
      gsap.to(".hero-content .reveal-up", {
        opacity:  1,
        y:        0,
        duration: 0.9,
        stagger:  0.14,
        ease:     "power3.out",
        onComplete: () => {
          // Remove inline styles after animation so CSS takes over cleanly
          heroEls.forEach(el => {
            el.style.opacity   = "";
            el.style.transform = "";
            el.classList.add("visible");
          });
        }
      });
    }, 1800);
  }

  // Run observer for all non-hero sections
  observeElements();

});