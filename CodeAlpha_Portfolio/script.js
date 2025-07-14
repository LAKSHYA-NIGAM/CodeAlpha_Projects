  // Scroll to section on navbar item click
  document.querySelectorAll(".navbar ul li").forEach((item, index) => {
    item.addEventListener("click", () => {
      const sectionIds = ["hero-section", "about", "skills", "portfolio", "education", "contact"];
      const sectionId = sectionIds[index];
      const target = document.getElementById(sectionId) || document.querySelector(`.${sectionId}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Add active class on scroll
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".navbar ul li");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((li, index) => {
      li.classList.remove("active");
      const ids = ["hero-section", "about", "skills", "portfolio", "education", "contact"];
      if (ids[index] === current) {
        li.classList.add("active");
      }
    });
  });

  // Resume download tracking (Optional analytics logging)
  document.querySelector(".btn-primary")?.addEventListener("click", () => {
    console.log("Resume download initiated");
  });

  // Scroll icon
  document.querySelector(".scroll-icon")?.addEventListener("click", () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  });

  // Contact form submission (demo only)
  document.querySelector("form")?.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thanks for your message! I'll get back to you soon.");
    this.reset();
  });

 

