// ==========================================
//  Main JS — no theme toggle
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

  // ---- Loader ----
  const loader = document.getElementById("loader");
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    loader.classList.add("hidden");
    document.body.style.overflow = "";
  }, 1800);


  // ---- Custom Cursor (single rAF loop, no freeze) ----
  const cursor = document.getElementById("cursor");
  const trail  = document.getElementById("cursor-trail");

  let mouseX = 0, mouseY = 0;
  let trailX  = 0, trailY  = 0;
  let cursorVisible = false;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!cursorVisible) {
      cursor.style.opacity = "1";
      trail.style.opacity  = "0.4";
      cursorVisible = true;
    }
  }, { passive: true });

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
    trail.style.opacity  = "0";
    cursorVisible = false;
  });

  function cursorLoop() {
    cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;
    trail.style.transform = `translate(${trailX - 15}px, ${trailY - 15}px)`;
    requestAnimationFrame(cursorLoop);
  }
  cursorLoop();

  function refreshCursorTargets() {
    document.querySelectorAll("a, button, .project-card, .skill-card, input, textarea").forEach(el => {
      el.addEventListener("mouseenter", () => {
        cursor.style.width  = "16px";
        cursor.style.height = "16px";
        trail.style.width   = "50px";
        trail.style.height  = "50px";
      });
      el.addEventListener("mouseleave", () => {
        cursor.style.width  = "10px";
        cursor.style.height = "10px";
        trail.style.width   = "30px";
        trail.style.height  = "30px";
      });
    });
  }
  refreshCursorTargets();


  // ---- Smooth scroll on nav clicks ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const href   = anchor.getAttribute("href");
      const target = document.querySelector(href);
      if (!target || href === "#") return;
      e.preventDefault();
      const navH = document.getElementById("navbar").offsetHeight;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH - 20;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });


  // ---- Sticky Navbar ----
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
  }, { passive: true });


  // ---- Active Nav Highlight ----
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = "";
          if (link.getAttribute("href") === "#" + entry.target.id) {
            link.style.color = "var(--accent)";
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => navObserver.observe(sec));


  // ---- Hamburger ----
  const hamburger  = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const spans      = hamburger.querySelectorAll("span");

  hamburger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    spans[0].style.transform = isOpen ? "translateY(7px) rotate(45deg)"  : "";
    spans[1].style.opacity   = isOpen ? "0" : "1";
    spans[2].style.transform = isOpen ? "translateY(-7px) rotate(-45deg)" : "";
  });

  document.querySelectorAll(".mob-link").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      spans.forEach(s => { s.style.transform = ""; s.style.opacity = "1"; });
    });
  });


  // ---- Contact Form — EmailJS ----
  // Replace these 3 values with your actual EmailJS credentials
  const EMAILJS_PUBLIC_KEY  = "hw6yMnFC-FVZFqSaY";
  const EMAILJS_SERVICE_ID  = "service_qgannt9";
  const EMAILJS_TEMPLATE_ID = "template_sxcj9bf";

  const ejsScript   = document.createElement("script");
  ejsScript.src     = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
  ejsScript.onload  = () => emailjs.init(EMAILJS_PUBLIC_KEY);
  document.head.appendChild(ejsScript);

  const form      = document.getElementById("contact-form");
  const submitBtn = form ? form.querySelector("button[type=submit]") : null;

  if (form && submitBtn) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name    = form.querySelector("input[type=text]").value.trim();
      const email   = form.querySelector("input[type=email]").value.trim();
      const message = form.querySelector("textarea").value.trim();
      if (!name || !email || !message) return;

      submitBtn.textContent = "Sending...";
      submitBtn.disabled    = true;

      try {
        if (typeof emailjs === "undefined") throw new Error("SDK not loaded");

        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name:  name,
          from_email: email,
          message,
          to_name:    "Rajendra"
        });

        submitBtn.innerHTML = "&#10003; Message Sent!";
        form.reset();
        setTimeout(() => {
          submitBtn.innerHTML  = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
          submitBtn.disabled   = false;
        }, 3000);

      } catch (err) {
        submitBtn.textContent = "&#10005; Failed — email me directly";
        setTimeout(() => {
          submitBtn.innerHTML  = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
          submitBtn.disabled   = false;
        }, 3000);
        console.error("EmailJS:", err);
      }
    });
  }

});