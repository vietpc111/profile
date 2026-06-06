gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll("[data-profile]").forEach((element) => {
  const key = element.dataset.profile;
  if (portfolioData[key]) element.textContent = portfolioData[key];
});

document.querySelectorAll("[data-profile-link]").forEach((element) => {
  const key = element.dataset.profileLink;
  element.href = key === "email" ? `mailto:${portfolioData.email}` : portfolioData[key];
});

document.querySelector("#skillGrid").innerHTML = portfolioData.skills.map((skill) => `
  <article class="skill-card">
    <b>${skill.icon}</b>
    <h3>${skill.name}</h3>
    <p>${skill.note}</p>
  </article>
`).join("");

document.querySelector("#projectGrid").innerHTML = portfolioData.projects.map((project, index) => `
  <a class="project-card" href="#">
    <div class="project-poster">
      <span class="project-number">0${index + 1} / 04</span>
      <span class="project-label">${project.label}</span>
      <div class="project-mockup">
        <div class="mockup-top"><i></i><i></i><i></i></div>
        <div class="mockup-content">
          <small>PROJECT 0${index + 1}</small>
          <strong>${project.name}</strong>
          <div class="mockup-lines"><i></i><i></i><i></i></div>
        </div>
      </div>
    </div>
    <div class="project-info">
      <small>SELECTED WORK / 0${index + 1}</small>
      <h3>${project.name}</h3>
      <p>Sản phẩm được xây dựng với trọng tâm là trải nghiệm người dùng, hiệu năng và khả năng mở rộng.</p>
      <div class="project-meta-row">${project.type.split(" · ").map((item) => `<span>${item}</span>`).join("")}</div>
      <span class="project-link">↗</span>
    </div>
  </a>
`).join("");

const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
  intro
    .from(".topbar", { y: -30, autoAlpha: 0, duration: .7 })
    .from(".hero-copy > *", { y: 35, autoAlpha: 0, duration: .7, stagger: .09 }, "-=.25")
    .from(".orange-disc", { scale: .4, autoAlpha: 0, duration: 1 }, "-=.7")
    .from(".portrait-card, .terminal-card, .floating-stack", { y: 60, autoAlpha: 0, duration: .8, stagger: .09 }, "-=.65")
    .from(".code-card", { scale: .6, rotation: 0, autoAlpha: 0, duration: .6, stagger: .12 }, "-=.5");

  const fullName = document.querySelector('[data-profile="fullName"]');
  const nameCursor = fullName.nextElementSibling;
  const nameText = portfolioData.fullName;
  const typing = gsap.timeline({ repeat: -1, repeatDelay: .45, delay: 2 });

  const addTyping = (element, cursor, text) => {
    typing.set(cursor, { visibility: "visible", autoAlpha: 1 });
    [...text].forEach((character, index) => {
      typing.call(() => { element.textContent = text.slice(0, index + 1); })
        .to({}, { duration: .13 });
    });
    typing.set(cursor, { visibility: "hidden" });
  };

  const addDeleting = (element, cursor, text) => {
    typing.set(cursor, { visibility: "visible", autoAlpha: 1 });
    [...text].forEach((_, index) => {
      typing.call(() => { element.textContent = text.slice(0, text.length - index - 1); })
        .to({}, { duration: .075 });
    });
    typing.set(cursor, { visibility: "hidden" });
  };

  typing.set(fullName, { textContent: "" });
  addTyping(fullName, nameCursor, nameText);
  typing
    .set(nameCursor, { visibility: "visible" })
    .to(nameCursor, { autoAlpha: 0, duration: .32, repeat: 3, yoyo: true })
    .to({}, { duration: .35 });
  addDeleting(fullName, nameCursor, nameText);

  gsap.to(".code-card-one", { y: -10, rotation: 7, repeat: -1, yoyo: true, duration: 2.4, ease: "sine.inOut" });
  gsap.to(".code-card-two", { y: 12, rotation: -9, repeat: -1, yoyo: true, duration: 2.8, ease: "sine.inOut" });
  gsap.to(".floating-stack", { y: -9, repeat: -1, yoyo: true, duration: 2.5, ease: "sine.inOut" });

  gsap.utils.toArray(".section-heading, .project-heading, .featured-heading, .about-card, .quick-info, .contact > *, .footer-top, .footer-links").forEach((element) => {
    gsap.from(element, {
      y: 45,
      autoAlpha: 0,
      duration: .8,
      ease: "power3.out",
      scrollTrigger: { trigger: element, start: "top 88%" }
    });
  });

  ScrollTrigger.batch(".skill-card, .project-card", {
    start: "top 90%",
    once: true,
    onEnter: (elements) => gsap.from(elements, {
      y: 45,
      autoAlpha: 0,
      stagger: .08,
      duration: .7,
      ease: "power3.out"
    })
  });

  gsap.from(".site-browser", {
    x: -70,
    rotation: -1.5,
    autoAlpha: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: { trigger: ".site-showcase", start: "top 82%" }
  });

  gsap.from(".site-details", {
    x: 70,
    rotation: 1.5,
    autoAlpha: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: { trigger: ".site-showcase", start: "top 82%" }
  });

  gsap.to(".big-code", {
    rotation: 12,
    y: -70,
    ease: "none",
    scrollTrigger: { trigger: ".contact", start: "top bottom", end: "bottom top", scrub: 1 }
  });

  gsap.from(".footer-wordmark", {
    xPercent: -12,
    autoAlpha: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".site-footer",
      start: "top bottom",
      end: "bottom bottom",
      scrub: 1
    }
  });
});

window.addEventListener("load", () => ScrollTrigger.refresh());
