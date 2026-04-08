const skillsData = [
  {
    category: "Frontend",
    skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "React Router", "React Hooks", "EJS", "Bootstrap"]
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "FastAPI", "JWT Auth", "REST APIs"]
  },
  {
    category: "Databases",
    skills: ["MongoDB", "MySQL", "PostgreSQL", "SQLite"]
  },
  {
    category: "DevOps & Tools",
    skills: ["Git", "GitHub", "NPM", "Postman", "Render", "Vercel", "Figma", "Canva"]
  },
  {
    category: "AI / ML",
    skills: ["Python", "NumPy", "Pandas", "TensorFlow", "scikit-learn", "PyTorch", "Matplotlib"]
  },
  {
    category: "Languages",
    skills: ["C", "C++", "Python", "JavaScript", "TypeScript"]
  }
];

function renderSkills() {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;

  grid.innerHTML = "";

  skillsData.forEach(group => {
    const card = document.createElement("div");
    card.className = "skill-card reveal-up";

    card.innerHTML = `
      <p class="skill-card-title">${group.category}</p>
      <div class="skill-tags">
        ${group.skills.map(s => `<span class="skill-tag">${s}</span>`).join("")}
      </div>
    `;

    grid.appendChild(card);
  });

  if (typeof observeElements === "function") observeElements();
}

document.addEventListener("DOMContentLoaded", renderSkills);