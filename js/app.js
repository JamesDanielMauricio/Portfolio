const projects = [
  {
    title: "ichica.co",
    category: "bubble",
    label: "Bubble.io",
    year: "2024–2026",
    description:
      "Lottery-style web application with complex draw mechanics, randomized selection logic, ticketing systems, admin dashboards, and secure payment handling for around 140,000 users.",
    stack: ["Bubble.io", "Ticketing systems", "Payment flows"],
    highlights: [
      "Handled high user activity and concurrent participation",
      "Implemented draw logic and randomized selection systems",
      "Built admin tooling for configuration and operations",
    ],
    demoUrl: "https://ichica.co",
    sourceUrl: "https://ichica.co",
    colors: ["#5dceff", "#255dff"],
  },
  {
    title: "sparkable.cc",
    category: "bubble",
    label: "Bubble.io",
    year: "2025–Present",
    description:
      "Social platform for sharing quality content, ideas, and perspectives. Volunteer Bubble.io contribution focused on workflow improvements, performance, and feature delivery.",
    stack: ["Bubble.io", "Database improvements", "Feature delivery"],
    highlights: [
      "Improved workflows and structure for better performance",
      "Supported feature delivery and debugging",
      "Contributed to a user-focused social product",
    ],
    demoUrl: "https://sparkable.cc",
    sourceUrl: "https://sparkable.cc",
    colors: ["#67f0c3", "#087b7b"],
  },
];

const testimonials = [
  {
    quote:
      "Senior Bubble.io Developer with 5+ years of experience building scalable, workflow-heavy applications for startups, agencies, and international clients.",
    name: "Professional Summary",
    role: "Bubble.io, architecture, and performance",
  },
  {
    quote:
      "Proven production experience with high-usage systems, including ichica.co, a live application serving approximately 140,000 users.",
    name: "Scale Highlight",
    role: "Seleby Inc. | Japan",
  },
  {
    quote:
      "Strong integration background across REST APIs, webhooks, Stripe, Apple Pay, Google Pay, Amazon Pay, Paidy, GMO-PG, and Fincode.",
    name: "Integration Highlight",
    role: "Payments, APIs, and automation",
  },
];

const themeToggle = document.querySelector("#themeToggle");
const projectsGrid = document.querySelector("#projectsGrid");
const projectFilters = document.querySelector("#projectFilters");
const template = document.querySelector("#projectCardTemplate");
const form = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");
const testimonialCard = document.querySelector("#testimonialCard");
const prevTestimonialButton = document.querySelector("#prevTestimonial");
const nextTestimonialButton = document.querySelector("#nextTestimonial");
const counters = document.querySelectorAll("[data-count]");
const filterStatus = document.querySelector("#filterStatus");
const navLinks = document.querySelectorAll(".site-nav a");
const sections = document.querySelectorAll("main section[id]");
const projectModal = document.querySelector("#projectModal");
const closeModalButton = document.querySelector("#closeModal");
const modalTag = document.querySelector("#modalTag");
const modalTitle = document.querySelector("#modalTitle");
const modalYear = document.querySelector("#modalYear");
const modalDescription = document.querySelector("#modalDescription");
const modalStack = document.querySelector("#modalStack");
const modalHighlights = document.querySelector("#modalHighlights");
const modalDemoLink = document.querySelector("#modalDemoLink");

let activeFilter = "all";
let activeTestimonial = 0;

function getSavedTheme() {
  return localStorage.getItem("portfolio-theme") || "dark";
}

function applyTheme(theme) {
  document.body.dataset.theme = theme;
}

function toggleTheme() {
  const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("portfolio-theme", nextTheme);
  applyTheme(nextTheme);
}

function createListItem(content) {
  const item = document.createElement("li");
  item.textContent = content;
  return item;
}

function openProjectModal(project) {
  modalTag.textContent = project.label;
  modalTitle.textContent = project.title;
  modalYear.textContent = project.year;
  modalDescription.textContent = project.description;
  modalStack.innerHTML = "";
  modalHighlights.innerHTML = "";

  project.stack.forEach((entry) => {
    modalStack.appendChild(createListItem(entry));
  });

  project.highlights.forEach((entry) => {
    modalHighlights.appendChild(createListItem(entry));
  });

  modalDemoLink.href = project.demoUrl;
  projectModal.classList.add("is-open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeProjectModal() {
  projectModal.classList.remove("is-open");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function createProjectCard(project) {
  const fragment = template.content.cloneNode(true);
  const card = fragment.querySelector(".project-card");
  const media = fragment.querySelector(".project-card__media");
  const tag = fragment.querySelector(".project-card__tag");
  const year = fragment.querySelector(".project-card__year");
  const title = fragment.querySelector("h3");
  const description = fragment.querySelector(".project-card__description");
  const stackList = fragment.querySelector(".project-card__stack");
  const detailsButton = fragment.querySelector(".project-card__button");

  card.dataset.category = project.category;
  media.style.setProperty("--card-start", project.colors[0]);
  media.style.setProperty("--card-end", project.colors[1]);
  tag.textContent = project.label;
  year.textContent = project.year;
  title.textContent = project.title;
  description.textContent = project.description;

  project.stack.forEach((item) => {
    stackList.appendChild(createListItem(item));
  });

  detailsButton.addEventListener("click", () => openProjectModal(project));

  return fragment;
}

function getVisibleProjects(filter = "all") {
  return filter === "all"
    ? projects
    : projects.filter((project) => project.category === filter);
}

function renderProjects(filter = "all") {
  projectsGrid.innerHTML = "";
  const visibleProjects = getVisibleProjects(filter);

  visibleProjects.forEach((project) => {
    projectsGrid.appendChild(createProjectCard(project));
  });

  filterStatus.textContent =
    filter === "all"
      ? `Showing all projects (${visibleProjects.length})`
      : `Showing Bubble.io projects (${visibleProjects.length})`;
}

function updateFilterState(nextFilter) {
  activeFilter = nextFilter;
  projectFilters.querySelectorAll(".filter-chip").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === nextFilter);
  });
  renderProjects(nextFilter);
}

function renderTestimonial(index) {
  const entry = testimonials[index];
  testimonialCard.querySelector(".testimonial-card__quote").textContent = entry.quote;
  testimonialCard.querySelector(".testimonial-card__name").textContent = entry.name;
  testimonialCard.querySelector(".testimonial-card__role").textContent = entry.role;
}

function animateCounter(element) {
  const target = Number(element.dataset.count);
  const suffix = element.dataset.suffix || "";
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    element.textContent = `${value}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

function initCounters() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.7 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function initScrollSpy() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-35% 0px -50% 0px", threshold: 0.1 }
  );

  sections.forEach((section) => observer.observe(section));
}

function handleFormSubmit(event) {
  event.preventDefault();

  const data = new FormData(form);
  const name = data.get("name")?.toString().trim();
  const email = data.get("email")?.toString().trim();
  const message = data.get("message")?.toString().trim();

  if (!name || !email || !message) {
    formStatus.textContent = "Please complete all fields before sending.";
    return;
  }

  formStatus.textContent = "Sending your inquiry...";
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton instanceof HTMLButtonElement) {
    submitButton.disabled = true;
  }

  const formData = new FormData(form);
  formData.set("subject", `New portfolio inquiry from ${name}`);
  formData.set("from_name", name);

  fetch(form.action, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData,
  })
    .then(async (response) => {
      const result = await response.json().catch(() => ({}));
      if (!result.success) {
        throw new Error(result.message || "Submission failed.");
      }

      formStatus.textContent =
        "Inquiry sent successfully. James will receive it by email.";
      form.reset();
    })
    .catch(() => {
      formStatus.textContent =
        "The form could not send right now. Please email jamesdanielmauricio@gmail.com directly.";
    })
    .finally(() => {
      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = false;
      }
    });
}

function initSectionAnimations() {
  const animatableSections = document.querySelectorAll("main section[id]:not(#home)");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  animatableSections.forEach((section) => {
    section.classList.add("section--animate");
    observer.observe(section);
  });
}

function initScrollTop() {
  const scrollTopButton = document.querySelector("#scrollTop");
  if (!scrollTopButton) return;

  window.addEventListener("scroll", () => {
    scrollTopButton.classList.toggle("is-visible", window.scrollY > 500);
  }, { passive: true });

  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initMobileNav() {
  const navToggle = document.querySelector("#navToggle");
  const siteHeader = document.querySelector(".site-header");
  if (!navToggle || !siteHeader) return;

  navToggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteHeader.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

applyTheme(getSavedTheme());
renderProjects(activeFilter);
renderTestimonial(activeTestimonial);
initCounters();
initScrollSpy();
initSectionAnimations();
initScrollTop();
initMobileNav();

themeToggle.addEventListener("click", toggleTheme);

projectFilters.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) {
    return;
  }

  updateFilterState(target.dataset.filter || "all");
});

prevTestimonialButton.addEventListener("click", () => {
  activeTestimonial = (activeTestimonial - 1 + testimonials.length) % testimonials.length;
  renderTestimonial(activeTestimonial);
});

nextTestimonialButton.addEventListener("click", () => {
  activeTestimonial = (activeTestimonial + 1) % testimonials.length;
  renderTestimonial(activeTestimonial);
});

closeModalButton.addEventListener("click", closeProjectModal);

projectModal.addEventListener("click", (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && target.dataset.closeModal === "true") {
    closeProjectModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProjectModal();
  }
});

form.addEventListener("submit", handleFormSubmit);
