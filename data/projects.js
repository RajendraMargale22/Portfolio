// ==========================================
//  Projects Data
//  "categories" is an ARRAY — one project
//  can appear in multiple filter tabs.
//
//  HOW TO ADD PROJECT IMAGES:
//  1. Put your screenshot in: assets/images/projects/
//     Example: assets/images/projects/velmora.png
//  2. Set the "image" field below to that path.
//     Example: image: "assets/images/projects/velmora.png"
//  3. If no image is set, a placeholder is shown.
//
//  Recommended image size: 1280x720px (16:9)
// ==========================================

const projectsData = [
  {
    id: 1,
    title: "Velmora",
    subtitle: "Hotel Booking Platform",
    description: "Full stack hotel booking platform with authentication, listing management and responsive UI. Focused on seamless booking experience and scalable backend design.",
    stack: ["MongoDB", "Express.js", "Node.js", "EJS"],
    categories: ["fullstack", "backend"],
    image: "assets/velmora.png",
    live: "https://velmora-23cd.onrender.com",
    github: "https://github.com/RajendraMargale22/Velmora"
  },
  {
    id: 2,
    title: "Hostel Haven",
    subtitle: "Hostel Booking System",
    description: "Platform for searching and booking hostels with filters, pricing and user management features. Designed for performance and usability.",
    stack: ["Node.js", "Express", "MongoDB", "HTML5", "CSS3", "JavaScript"],
    categories: ["fullstack", "frontend", "backend"],
    image: "assets/hostelhaven.png",
    live: "https://hostel-haven-blush.vercel.app/",
    github: "https://github.com/RajendraMargale22/HostelHaven"
  },
  {
    id: 3,
    title: "Jury AI",
    subtitle: "Legal AI Assistant",
    description: "AI-powered assistant for legal queries with community interaction features for lawyers and users. Integrates NLP concepts with web systems.",
    stack: ["Python", "FastAPI", "React", "MongoDB", "Node.js", "Express"],
    categories: ["ai", "fullstack", "backend"],
    image: "assets/juryai.jpeg",
    // live: "https://juryai-demo.vercel.app",
    github: "https://github.com/RajendraMargale22/JURY-AI"
  },
  {
    id: 4,
    title: "SpeakMind",
    subtitle: "AI Chatbot Application",
    description: "Full-stack AI chatbot with persistent conversations, secure authentication, and context-aware responses using scalable backend architecture.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    categories: ["fullstack", "ai", "backend"],
    image: "assets/speakmind.png",
    live: "Frontend : https://speak-mind-pi.vercel.app/",
    github: "https://github.com/RajendraMargale22/SpeakMind"
  },
  {
    id: 5,
    title: "Keeper App",
    subtitle: "Lightweight Note Taking",
    description: "Lightweight note-taking application with CRUD operations and persistent storage.",
    stack: ["React", "Node.js", "Express", "PostgreSQL"],
    categories: ["fullstack", "backend"],
    image: "assets/keeper-app.png",
    // live: "https://notes-demo.vercel.app",
    github: "https://github.com/RajendraMargale22/keeper-app"
  },
  // {
  //   id: 6,
  //   title: "To-Do App",
  //   subtitle: "Task Management",
  //   description: "Task management application with intuitive UI and real-time updates.",
  //   stack: ["React", "JavaScript", "CSS"],
  //   categories: ["frontend"],
  //   image: "assets/images/projects/todo.png",
  //   // live: "https://todo-demo.vercel.app",
  //   github: "https://github.com/yourusername/todo-app"
  // }
];

function renderProjects(filter = "all") {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = "";

  // Filter: show project if any of its categories match
  const filtered = filter === "all"
    ? projectsData
    : projectsData.filter(p => p.categories.includes(filter));

  filtered.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card reveal-up";

    // Build image section — use real image if available, else placeholder
    const imgHTML = `
      <div class="project-img">
        <img
          src="${project.image}"
          alt="${project.title} screenshot"
          onerror="this.parentElement.innerHTML='<span>[ No Image ]</span>'"
          loading="lazy"
        />
      </div>
    `;

    card.innerHTML = `
      ${imgHTML}
      <div class="project-body">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.description}</p>
        <div class="project-stack">
          ${project.stack.map(t => `<span class="stack-tag">${t}</span>`).join("")}
        </div>
        <div class="project-links">
          <a href="${project.live}" class="proj-link" target="_blank" rel="noopener">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Live
          </a>
          <a href="${project.github}" class="proj-link" target="_blank" rel="noopener">
            <i class="fa-brands fa-github"></i> GitHub
          </a>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  if (typeof observeElements === "function") observeElements();
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects("all");

  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects(btn.dataset.filter);
    });
  });
});