const navHTML = `
<header id="desktop-nav" class="hidden lg:flex fixed top-0 w-full z-[150] glass-flat rounded-none border-t-0 border-x-0 h-16 items-center px-8 justify-between">
  <div class="font-heading font-extrabold text-accent text-xl tracking-tight" data-i18n="name_only">Hasan Adam</div>
  <nav>
    <ul class="flex items-center gap-2 text-sm font-medium">
      <li><a href="index.html" class="nav-link px-4 py-2 rounded-lg transition-colors" data-i18n="nav_home">Home</a></li>
      <li><a href="about.html" class="nav-link px-4 py-2 rounded-lg transition-colors" data-i18n="nav_about">About</a></li>
      <li class="relative group">
        <a href="projects.html" class="nav-link px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"><span data-i18n="nav_projects">Projects</span> <i class="fa-solid fa-chevron-down text-[10px]"></i></a>
        <div class="absolute top-[110%] left-0 hidden group-hover:flex flex-col glass-card p-2 min-w-[220px] shadow-xl rtl:right-0 rtl:left-auto">
          <a href="projects.html#kaiaModal" class="px-4 py-2.5 rounded-lg transition-colors flex items-center gap-3 text-sm" style="color:var(--text-dim)" onmouseover="this.style.background='var(--bg-elevated-2)'; this.style.color='var(--text)';" onmouseout="this.style.background=''; this.style.color='var(--text-dim)';">
            <i class="fa-solid fa-plane-departure text-accent w-4 text-center"></i> <span data-i18n="kaia_case_study">KAIA Case Study</span>
          </a>
          <a href="https://github.com/hsndm566" target="_blank" rel="noopener noreferrer" class="px-4 py-2.5 rounded-lg transition-colors flex items-center gap-3 text-sm" style="color:var(--text-dim)" onmouseover="this.style.background='var(--bg-elevated-2)'; this.style.color='var(--text)';" onmouseout="this.style.background=''; this.style.color='var(--text-dim)';">
            <i class="fa-solid fa-robot text-accent w-4 text-center"></i> <span data-i18n="ai_job_engine">AI Job Engine</span>
          </a>
        </div>
      </li>
      <li><a href="dashboard.html" class="nav-link px-4 py-2 rounded-lg transition-colors" data-i18n="nav_dashboard">Dashboard</a></li>
      <li><a href="contact.html" class="nav-link px-4 py-2 rounded-lg transition-colors" data-i18n="nav_contact">Contact</a></li>
    </ul>
  </nav>
  <div class="flex items-center gap-2">
    <button class="lang-toggle-btn glass-flat h-9 px-3 flex items-center justify-center rounded-lg text-sm font-semibold" aria-label="Toggle language">
      <span class="lang-label">AR</span>
    </button>
    <button class="theme-toggle-btn glass-flat w-9 h-9 flex items-center justify-center rounded-lg" aria-label="Toggle theme">
      <i class="fa-solid fa-moon theme-icon" aria-hidden="true"></i>
    </button>
  </div>
</header>

<button id="hamburger" class="lg:hidden fixed top-4 right-4 z-[200] w-11 h-11 rounded-xl flex items-center justify-center glass-flat shadow-md" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="sidebar">
  <i class="fa-solid fa-bars" id="hamburgerIcon" aria-hidden="true"></i>
</button>

<div id="overlay" class="overlay fixed inset-0 z-[90] lg:hidden"></div>
<nav id="sidebar" class="sidebar lg:hidden flex-col p-6 gap-6" aria-label="Main navigation">
  <div class="nav-links-mobile flex flex-col gap-6 w-full">
    <ul class="flex flex-col gap-1 flex-1">
      <li><a href="index.html" class="nav-link flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium justify-center"><i class="fa-solid fa-house w-5 text-center" aria-hidden="true"></i> <span data-i18n="nav_home">Home</span></a></li>
      <li><a href="about.html" class="nav-link flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium justify-center"><i class="fa-solid fa-user w-5 text-center" aria-hidden="true"></i> <span data-i18n="nav_about">About</span></a></li>
      <li><a href="projects.html" class="nav-link flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium justify-center"><i class="fa-solid fa-diagram-project w-5 text-center" aria-hidden="true"></i> <span data-i18n="nav_projects">Projects</span></a></li>
      <li><a href="dashboard.html" class="nav-link flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium justify-center"><i class="fa-solid fa-chart-line w-5 text-center" aria-hidden="true"></i> <span data-i18n="nav_dashboard">Dashboard</span></a></li>
      <li><a href="contact.html" class="nav-link flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium justify-center"><i class="fa-solid fa-envelope w-5 text-center" aria-hidden="true"></i> <span data-i18n="nav_contact">Contact</span></a></li>
    </ul>
  </div>
  <div class="flex gap-3 w-full max-w-[200px]">
    <button class="lang-toggle-btn glass-flat flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium flex-1" aria-label="Toggle language">
      <span class="lang-label">AR</span>
    </button>
    <button class="theme-toggle-btn glass-flat flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium flex-1" aria-label="Toggle theme">
      <i class="fa-solid fa-moon theme-icon" aria-hidden="true"></i>
    </button>
  </div>
</nav>
`;

document.getElementById('nav-placeholder').innerHTML = navHTML;

const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  if (link.getAttribute('href') === currentPath) link.classList.add('active');
});

const sidebar = document.getElementById('sidebar');
const hamburger = document.getElementById('hamburger');
const hamburgerIcon = document.getElementById('hamburgerIcon');
const overlay = document.getElementById('overlay');

function closeSidebar(){
  sidebar.classList.remove('open'); overlay.classList.remove('open');
  hamburgerIcon.className = 'fa-solid fa-bars'; hamburger.setAttribute('aria-expanded', 'false');
}
hamburger.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('open'); overlay.classList.toggle('open', isOpen);
  hamburgerIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  hamburger.setAttribute('aria-expanded', String(isOpen));
});
overlay.addEventListener('click', closeSidebar);
