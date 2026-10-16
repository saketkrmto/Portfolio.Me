(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (menuButton && nav) {
    const closeMenu = () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      menuButton.textContent = "☰";
    };
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
      menuButton.textContent = isOpen ? "×" : "☰";
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") { closeMenu(); menuButton.focus(); }
    });
    window.addEventListener("resize", () => { if (window.innerWidth > 800) closeMenu(); });
  }
  const themeButton = document.querySelector(".theme-toggle");
  if (themeButton) {
    const root = document.documentElement;
    const themeColor = document.querySelector('meta[name="theme-color"]');
    const updateThemeButton = () => {
      const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
      themeButton.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
      themeButton.title = `Switch to ${nextTheme} theme`;
      if (themeColor) themeColor.content = root.dataset.theme === "light" ? "#f4f7ef" : "#10120f";
    };
    updateThemeButton();
    themeButton.addEventListener("click", () => {
      root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
      try {
        localStorage.setItem("saket-portfolio-theme", root.dataset.theme);
      } catch {}
      updateThemeButton();
    });
  }
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  const targets = document.querySelectorAll(".section-kicker, .about-grid, .project-card, .skill-group, .timeline-item, .contact-pretitle, .contact-section h2");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    targets.forEach((el, i) => { el.classList.add("js-reveal"); el.style.transitionDelay = `${(i % 4) * 65}ms`; });
    const observer = new IntersectionObserver((entries, obs) => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); obs.unobserve(entry.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    targets.forEach(el => observer.observe(el));
  }
})();