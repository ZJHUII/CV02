const portfolioData = {
  profile: {
    lead: "我相信设计不是给答案加上一层漂亮的包装，而是找到那个真正值得被解决的问题。",
    bio: "过去六年里，我和早期团队、文化机构以及有远见的品牌一起工作。从策略到落地，从一张海报到一整套数字体验，我喜欢在不同尺度之间来回切换。",
    email: "hello@linxia.studio",
    meta: [
      ["Currently", "Independent / 2020—"],
      ["Previously", "Studio N°8 / 2018—20"],
      ["Based in", "Shanghai, CN"]
    ]
  },
  projects: [
    { title: "lamp", client: "Noma Objects", type: "Branding", category: "brand", image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=85" },
    { title: "Common Ground", client: "Tideway Foundation", type: "Digital", category: "digital", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85" },
    { title: "An ode to the everyday", client: "KIN Magazine", type: "Branding", category: "brand", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=85" },
    { title: "Field Notes", client: "Atlas / App", type: "Digital", category: "digital", image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=85" },
    { title: "Small rituals", client: "Mori Tea House", type: "Space", category: "space", image: "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?auto=format&fit=crop&w=1200&q=85" },
    { title: "Good things take time", client: "Sunday Studio", type: "Digital", category: "digital", image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1200&q=85" }
  ],
  notes: [
    { date: "18.06.26", title: "On making room for the unfinished", tag: "Process / 04 min" },
    { date: "02.05.26", title: "The quiet power of a good constraint", tag: "Thinking / 06 min" },
    { date: "11.02.26", title: "A field guide to noticing things", tag: "Life / 03 min" }
  ]
};

const projectGrid = document.querySelector("#project-grid");
const notesList = document.querySelector("#notes-list");

function renderProfile() {
  const lead = document.querySelector("#profile-lead");
  const bio = document.querySelector("#profile-bio");
  const link = document.querySelector("#profile-link");
  const meta = document.querySelector("#profile-meta");

  if (!lead || !bio || !link || !meta) return;

  lead.textContent = portfolioData.profile.lead;
  bio.textContent = portfolioData.profile.bio;
  link.href = `mailto:${portfolioData.profile.email}`;
  meta.innerHTML = portfolioData.profile.meta.map(item => `<span>${item[0]}<br><b>${item[1]}</b></span>`).join("");
}

function renderProjects(filter = "all") {
  if (!projectGrid) return;

  const projects = portfolioData.projects.filter(project => filter === "all" || project.category === filter);
  projectGrid.innerHTML = projects.map((project) => `
    <article class="project-card">
      <div class="project-art">
        <span class="project-number">0${portfolioData.projects.indexOf(project) + 1}</span>
        <img src="${project.image}" alt="${project.title}" loading="lazy">
      </div>
      <div class="project-info">
        <div><div class="project-title">${project.title}</div><div class="project-client">${project.client}</div></div>
        <div class="project-type">${project.type} ↗</div>
      </div>
    </article>`).join("");
}

function renderNotes() {
  if (!notesList) return;

  notesList.innerHTML = portfolioData.notes.map(note => `
    <a class="note-row" href="#notes">
      <span class="note-date">${note.date}</span><span class="note-title">${note.title}</span><span class="note-tag">${note.tag} ↗</span>
    </a>`).join("");
}

const filterButtons = document.querySelectorAll(".filter-button");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const activeButton = document.querySelector(".filter-button.is-active");
    if (activeButton) activeButton.classList.remove("is-active");
    button.classList.add("is-active");
    renderProjects(button.dataset.filter);
  });
});

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".main-nav");
if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });
}

if (projectGrid || notesList || document.querySelector("#profile-lead")) {
  renderProjects();
  renderNotes();
  renderProfile();
}