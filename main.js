/* ---------------- Translations & I18N ---------------- */
const translations = {
  en: {
    site_title: "Hasan Adam – Industrial Engineer",
    site_title_about: "About – Hasan Adam",
    site_title_projects: "Projects – Hasan Adam",
    site_title_dashboard: "Dashboard – Hasan Adam",
    site_title_contact: "Contact – Hasan Adam",
    nav_home: "Home", nav_about: "About", nav_projects: "Projects", nav_dashboard: "Dashboard", nav_contact: "Contact",
    name_only: "Hasan Adam",
    hero_title: "Hi, I'm <span style=\"color:var(--accent)\">Hasan Adam</span>.<br>",
    welcome_sub: "Welcome to my portfolio",
    hero_desc: "Industrial Engineer bridging Lean methodologies with AI automation. I build systems that solve bottlenecks—and track the results live.",
    btn_view_projects: "View Projects", btn_live_stats: "Live Job Stats",
    briefly_title: "Briefly",
    briefly_desc: "I'm a recent UBT graduate currently interning at Sela Co. in Governance. Beyond policy compliance, I apply Lean Six Sigma to operations (like optimizing KAIA airport workflows) and engineer AI solutions to automate complex processes.",
    btn_read_full: "Read full background",
    footer_copy: "Hasan Adam. Built with HTML, Tailwind, Chart.js & Google Sheets.",
    about_sub: "How I blend industrial engineering with modern automation.",
    job_title: "Industrial Engineer",
    loc: "Jeddah, Saudi Arabia", edu: "UBT",
    about_p1: "I'm an Industrial Engineer with a BSc from UBT, currently interning at Sela Co. in the Governance department. There, I review and enhance internal policies for government compliance, strategically contributing to multiple governance areas to shape how the company operates.",
    about_p2: "Outside of work, I built a multi‑agent job application engine — an n8n automation that scrapes, scores, tailors, and sends applications. In controlled tests, it boosted interview invitations by over 10%. I'm actively seeking opportunities where I can apply Lean, automation, and systems thinking to real‑world operations.",
    skills_title: "Skills & Tools",
    skill_1: "Lean", skill_2: "Optimization", skill_3: "Supply Chain", skill_4: "Data Analysis", skill_5: "Leadership", skill_6: "Risk Mgmt",
    projects_sub: "Systems, workflows, and automation engineering.",
    proj_1_title: "AI Job Engine", proj_1_desc: "Built a multi‑agent automation pipeline using n8n, Groq, and OpenAI. Scrapes jobs, scores fit, tailors CVs, and applies automatically.",
    btn_github: "View on GitHub", btn_case_study: "View Case Study", btn_soon: "Case study soon", btn_repo: "View Repo",
    proj_2_title: "KAIA Airport Project", proj_2_desc: "Applied DMAIC and VSM to optimize check‑in workflows at King Abdulaziz International Airport, cutting passenger wait times in half.",
    proj_3_title: "OpenCode Integration", proj_3_desc: "Integrated an open-source coding assistant into a personal workflow to speed up development and prototyping tasks.",
    proj_4_title: "This Portfolio", proj_4_desc: "A multi-page static site pulling data directly from Google Sheets to track job applications live, styled with Tailwind CSS.",
    kaia_tag: "Senior Capstone · Lean Six Sigma", kaia_title: "Process Optimization at King Abdulaziz International Airport",
    kaia_p1: "This capstone project applied Lean Management and the DMAIC framework to the passenger check-in process at KAIA Terminal 1. The goal: cut processing time, reduce queues, and balance workload.",
    kaia_stat1: "Faster check-in", kaia_stat2: "Shorter queues", kaia_stat3: "Faster verification", kaia_stat4: "Passengers surveyed",
    kaia_h2: "Approach", kaia_p2: "Using the DMAIC cycle, I mapped the current-state process with Value Stream Mapping, ran time-and-motion studies, then piloted interventions — self-service kiosks, digital ID verification, and dynamic counter allocation.",
    kaia_h3: "Key Results",
    kaia_li1: "Average total check-in time dropped from 15.5 to 9.2 minutes.", kaia_li2: "Queue waiting time was roughly halved.", kaia_li3: "Document verification time fell by 57%.", kaia_li4: "Off-peak counter utilization improved to 70%.",
    dash_sub: "Live data pulled directly from my Google Sheet tracker.",
    last_updated: "Last updated:", btn_refresh: "Refresh now",
    stat_sent: "Sent Today", stat_replies: "Replies", stat_interviews: "Interviews", stat_total: "Total Sent",
    chart_title: "Status Breakdown", table_title: "Recent Activity",
    th_company: "Company", th_job: "Job Title", th_score: "Score", th_status: "Status", th_date: "Date",
    contact_sub: "Open to Co‑op opportunities, collaborations, or a quick chat.",
    contact_channels: "Channels", contact_form_title: "Send a message",
    label_name: "Name", ph_name: "Your name",
    label_email: "Email", ph_email: "you@example.com",
    label_message: "Message", ph_message: "Say hello...",
    btn_send: "Send Message",
    kaia_case_study: "KAIA Case Study", ai_job_engine: "AI Job Engine",
    julie_placeholder: "Ask Julie anything...", julie_send: "Send"
  },
  ar: {
    site_title: "حسن آدم – مهندس صناعي",
    site_title_about: "نبذة عني – حسن آدم",
    site_title_projects: "المشاريع – حسن آدم",
    site_title_dashboard: "لوحة البيانات – حسن آدم",
    site_title_contact: "تواصل معي – حسن آدم",
    nav_home: "الرئيسية", nav_about: "نبذة عني", nav_projects: "المشاريع", nav_dashboard: "لوحة البيانات", nav_contact: "تواصل معي",
    name_only: "حسن آدم",
    hero_title: "أهلاً، أنا <span style=\"color:var(--accent)\">حسن آدم</span>.<br>",
    welcome_sub: "مرحباً بكم في ملفي التعريفي",
    hero_desc: "مهندس صناعي أدمج منهجيات الإدارة الرشيقة (Lean) مع أتمتة الذكاء الاصطناعي. أصمم أنظمة لمعالجة اختناقات العمل—وأتتبع نتائجها بشكل فوري.",
    btn_view_projects: "عرض المشاريع", btn_live_stats: "إحصائيات التوظيف المباشرة",
    briefly_title: "نبذة مختصرة",
    briefly_desc: "تخرجت حديثاً من جامعة الأعمال والتكنولوجيا (UBT)، وأتدرب حالياً في إدارة الحوكمة بشركة صلة (Sela Co.). إلى جانب الامتثال للسياسات، أطبق منهجية 6 سيجما الرشيقة في العمليات التشغيلية (مثل تحسين مسارات العمل في مطار الملك عبدالعزيز)، وأهندس حلول الذكاء الاصطناعي لأتمتة العمليات المعقدة.",
    btn_read_full: "قراءة التفاصيل كاملة",
    footer_copy: "حسن آدم. تم البناء بواسطة HTML, Tailwind, Chart.js & Google Sheets.",
    about_sub: "كيف أدمج الهندسة الصناعية مع الأتمتة الحديثة.",
    job_title: "مهندس صناعي",
    loc: "جدة، المملكة العربية السعودية", edu: "جامعة الأعمال والتكنولوجيا (UBT)",
    about_p1: "أنا مهندس صناعي حاصل على درجة البكالوريوس من جامعة الأعمال والتكنولوجيا، أتدرب حالياً في شركة صلة ضمن إدارة الحوكمة. يتمثل دوري في مراجعة وتطوير السياسات الداخلية لضمان الامتثال الحكومي، مساهماً بشكل استراتيجي في عدة مجالات حوكمة لتشكيل أسلوب عمل الشركة.",
    about_p2: "خارج إطار العمل، قمت ببناء محرك آلي للتقديم على الوظائف—نظام أتمتة عبر n8n يقوم باستخراج الوظائف، تقييم مدى الملاءمة، تخصيص السير الذاتية، وإرسال الطلبات. أظهرت الاختبارات زيادة في دعوات المقابلات بأكثر من 10%. أبحث حالياً عن فرص تتيح لي تطبيق منهجيات Lean، الأتمتة، والتفكير المنهجي في بيئات العمل الحقيقية.",
    skills_title: "المهارات والأدوات",
    skill_1: "الإدارة الرشيقة (Lean)", skill_2: "تحسين العمليات", skill_3: "سلاسل الإمداد", skill_4: "تحليل البيانات", skill_5: "القيادة", skill_6: "إدارة المخاطر",
    projects_sub: "الأنظمة، مسارات العمل، وهندسة الأتمتة.",
    proj_1_title: "محرك الوظائف الذكي", proj_1_desc: "نظام أتمتة متعدد الوكلاء مبني باستخدام n8n و Groq و OpenAI. يحلل الوظائف المطروحة، يقيّم الملاءمة، يخصص السير الذاتية، ويقدم الطلبات آلياً.",
    btn_github: "عرض على GitHub", btn_case_study: "عرض دراسة الحالة", btn_soon: "دراسة الحالة قريباً", btn_repo: "عرض المستودع",
    proj_2_title: "مشروع مطار الملك عبدالعزيز", proj_2_desc: "تطبيق منهجية DMAIC وتخطيط تدفق القيمة (VSM) لتحسين مسارات عمل تسجيل الدخول في المطار، مما أدى إلى خفض أوقات انتظار الركاب إلى النصف.",
    proj_3_title: "تكامل OpenCode", proj_3_desc: "دمج مساعد برمجي مفتوح المصدر ضمن مسار عمل شخصي لتسريع مهام التطوير وبناء النماذج الأولية.",
    proj_4_title: "هذا الموقع", proj_4_desc: "موقع متعدد الصفحات يستمد بياناته مباشرة من Google Sheets لتتبع طلبات التوظيف وعرضها حياً، تم تصميمه باستخدام Tailwind CSS.",
    kaia_tag: "مشروع التخرج · 6 سيجما الرشيقة", kaia_title: "تحسين العمليات في مطار الملك عبدالعزيز الدولي",
    kaia_p1: "قام مشروع التخرج بتطبيق الإدارة الرشيقة (Lean) وإطار DMAIC على عملية تسجيل الدخول للركاب في الصالة رقم 1. الهدف: تقليص وقت المعالجة، تقليل الطوابير، وموازنة العبء التشغيلي.",
    kaia_stat1: "تسجيل أسرع", kaia_stat2: "طوابير أقصر", kaia_stat3: "تحقق أسرع من الهوية", kaia_stat4: "مُسافر شملهم الاستطلاع",
    kaia_h2: "المنهجية", kaia_p2: "باستخدام دورة DMAIC، قمت بتخطيط العملية الحالية، تنفيذ دراسات الوقت والحركة، ثم تجربة التدخلات التشغيلية — أجهزة الخدمة الذاتية، التحقق الرقمي من الهوية، والتخصيص الديناميكي للمنصات.",
    kaia_h3: "النتائج الرئيسية",
    kaia_li1: "انخفض متوسط وقت تسجيل الدخول من 15.5 إلى 9.2 دقيقة.", kaia_li2: "وقت انتظار الطوابير انخفض إلى النصف تقريباً.", kaia_li3: "وقت التحقق من المستندات انخفض بنسبة 57%.", kaia_li4: "استخدام منصات الاستقبال خارج أوقات الذروة تحسن ليصل إلى 70%.",
    dash_sub: "بيانات حية ومباشرة مستمدة من متتبع Google Sheet الخاص بي.",
    last_updated: "آخر تحديث:", btn_refresh: "تحديث الآن",
    stat_sent: "أُرسلت اليوم", stat_replies: "الردود", stat_interviews: "المقابلات", stat_total: "إجمالي المُرسل",
    chart_title: "تحليل الحالات", table_title: "النشاط الأخير",
    th_company: "الشركة", th_job: "المسمى الوظيفي", th_score: "النسبة", th_status: "الحالة", th_date: "التاريخ",
    contact_sub: "متاح لفرص التدريب التعاوني (Co-op)، التعاون المشترك، أو حتى للنقاش السريع.",
    contact_channels: "قنوات التواصل", contact_form_title: "إرسال رسالة",
    label_name: "الاسم", ph_name: "اسمك الكريم",
    label_email: "البريد الإلكتروني", ph_email: "you@example.com",
    label_message: "الرسالة", ph_message: "مرحباً...",
    btn_send: "إرسال الرسالة",
    kaia_case_study: "دراسة حالة المطار", ai_job_engine: "محرك الوظائف الذكي",
    julie_placeholder: "اسأل جولي أي شيء...", julie_send: "إرسال"
  }
};

function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if(translations[lang][key]) el.innerHTML = translations[lang][key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if(translations[lang][key]) el.setAttribute('placeholder', translations[lang][key]);
  });

  document.querySelectorAll('.lang-label').forEach(el => el.textContent = lang === 'en' ? 'AR' : 'EN');

  try { if(window.localStorage) localStorage.setItem('site-lang', lang); } catch(e){}

  if (typeof window.initHeroTyping === 'function') window.initHeroTyping();
}

document.querySelectorAll('.lang-toggle-btn').forEach(btn => btn.addEventListener('click', () => {
  const currentLang = document.documentElement.lang === 'ar' ? 'en' : 'ar';
  setLanguage(currentLang);
}));


/* ---- CURSOR GLOW ---- */
(function initCursorGlow(){
  const glow = document.createElement('div'); glow.className='cursor-glow'; document.body.appendChild(glow);
  let trails = [];
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX+'px'; glow.style.top = e.clientY+'px';
    if (trails.length < 8) {
      const t = document.createElement('div'); t.className='cursor-trail';
      t.style.left = e.clientX+'px'; t.style.top = e.clientY+'px'; document.body.appendChild(t);
      trails.push(t); setTimeout(() => { t.remove(); trails = trails.filter(x=>x!==t); }, 600);
    }
  });
  document.querySelectorAll('a, button, input, textarea, .clickable').forEach(el => {
    el.addEventListener('mouseenter', () => glow.classList.add('hovering'));
    el.addEventListener('mouseleave', () => glow.classList.remove('hovering'));
  });
})();

/* ---- FLOATING PARTICLES ---- */
(function initParticles(){
  const container = document.createElement('div'); container.className='particles-container'; document.body.appendChild(container);
  const colors = ['#2563eb','#3b82f6','#a855f7','#22c55e','#60a5fa'];
  for (let i=0;i<30;i++) {
    const p = document.createElement('div'); p.className='particle';
    p.style.left = Math.random()*100+'%'; p.style.width = (2 + Math.random()*5)+'px';
    p.style.height = p.style.width; p.style.background = colors[Math.floor(Math.random()*colors.length)];
    p.style.animationDuration = (8 + Math.random()*16)+'s'; p.style.animationDelay = Math.random()*15+'s';
    container.appendChild(p);
  }
})();


document.addEventListener('DOMContentLoaded', () => {
  const savedLang = document.documentElement.lang || 'en';
  setLanguage(savedLang);
});

/* ---------------- Global Overlays Injection ---------------- */
const globalUI = `
<div id="joulie-bubble" onclick="document.getElementById('joulie-chat').classList.toggle('open');">
  <img src="https://raw.githubusercontent.com/hsndm566/hsndm.tech/main/joulie.png" alt="Julie" width="54" height="54" loading="lazy" onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 100\\'%3E%3Ccircle cx=\\'50\\' cy=\\'50\\' r=\\'50\\' fill=\\'%232563eb\\'/%3E%3Ctext x=\\'50\\' y=\\'55\\' font-size=\\'40\\' font-family=\\'sans-serif\\' fill=\\'white\\' text-anchor=\\'middle\\' dominant-baseline=\\'middle\\'%3EJ%3C/text%3E%3C/svg%3E';">
</div>
<div id="joulie-chat">
  <div id="joulie-header">
    <img src="https://raw.githubusercontent.com/hsndm566/hsndm.tech/main/joulie.png" alt="Julie" width="36" height="36" loading="lazy" onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 100\\'%3E%3Ccircle cx=\\'50\\' cy=\\'50\\' r=\\'50\\' fill=\\'%232563eb\\'/%3E%3Ctext x=\\'50\\' y=\\'55\\' font-size=\\'40\\' font-family=\\'sans-serif\\' fill=\\'white\\' text-anchor=\\'middle\\' dominant-baseline=\\'middle\\'%3EJ%3C/text%3E%3C/svg%3E';">
    <span>Julie</span>
  </div>
  <div id="joulie-messages"></div>
  <div id="joulie-input-area">
    <input type="text" id="joulie-input" data-i18n-placeholder="julie_placeholder" placeholder="Ask Julie anything..." onkeypress="if(event.key==='Enter') window.sendJulieMessage()">
    <button id="joulie-send" data-i18n="julie_send" onclick="window.sendJulieMessage()">Send</button>
  </div>
</div>
`;
document.body.insertAdjacentHTML('beforeend', globalUI);

/* ---------------- Julie Chatbot Logic ---------------- */
window.sendJulieMessage = async function() {
  const input = document.getElementById('joulie-input');
  const msg = input.value.trim();
  if (!msg) return;

  const msgsContainer = document.getElementById('joulie-messages');
  const divUser = document.createElement('div'); divUser.className = 'msg user'; divUser.textContent = msg;
  msgsContainer.appendChild(divUser); divUser.scrollIntoView({ behavior: 'smooth' });
  input.value = '';

  const typingIndicator = document.createElement('div');
  typingIndicator.className = 'msg bot typing-indicator';
  typingIndicator.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
  msgsContainer.appendChild(typingIndicator);
  typingIndicator.scrollIntoView({ behavior: 'smooth' });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch('https://julie-proxy.hsndm.workers.dev/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg }),
      signal: controller.signal });
    clearTimeout(timeoutId);
    const data = await res.json();
    typingIndicator.remove();
    const divBot = document.createElement('div'); divBot.className = 'msg bot';
    divBot.textContent = (data.reply) || "I'm here! But I didn't understand that.";
    typingIndicator.remove();
    const divBot = document.createElement('div'); divBot.className = 'msg bot'; divBot.textContent = data.reply || "I'm here! But I didn't understand that.";
    msgsContainer.appendChild(divBot); divBot.scrollIntoView({ behavior: 'smooth' });
  } catch(e) {
    typingIndicator.remove();
    const divBot = document.createElement('div'); divBot.className = 'msg bot'; divBot.textContent = "Julie is recharging... try again in a moment!";
    msgsContainer.appendChild(divBot); divBot.scrollIntoView({ behavior: 'smooth' });
  }
};

/* ---------------- Utilities ---------------- */
document.getElementById('year').textContent = new Date().getFullYear();
const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); fadeObserver.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

/* ---------------- Theme & UI ---------------- */
const body = document.body;
function applyTheme(theme) {
  body.setAttribute('data-theme', theme);
  document.documentElement.classList.toggle('dark', theme === 'dark');
  const themeMeta = document.getElementById('theme-color-meta');

  document.querySelectorAll('.theme-icon').forEach(i => i.className = theme === 'light' ? 'fa-solid fa-sun theme-icon' : 'fa-solid fa-moon theme-icon');
  if(themeMeta) themeMeta.setAttribute('content', theme === 'light' ? '#ffffff' : '#0a0e17');
  if(typeof window.statusChartInstance !== 'undefined' && window.statusChartInstance) {
    window.statusChartInstance.options.plugins.legend.labels.color = theme === 'light' ? '#57647a' : '#8b95a8';
    window.statusChartInstance.update();
  }
}
document.querySelectorAll('.theme-toggle-btn').forEach(btn => btn.addEventListener('click', () => {
  let curr = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  if(document.startViewTransition) document.startViewTransition(() => applyTheme(curr)); else applyTheme(curr);
  try { if(window.localStorage) localStorage.setItem('site-theme', curr); } catch(e){}
}));

document.addEventListener('click', (e) => {
  const el = e.target.closest('.btn-primary, .btn-outline, #refreshBtn, .theme-toggle-btn, .lang-toggle-btn');
  if(!el) return;
  const rect = el.getBoundingClientRect(), ripple = document.createElement('span'), size = Math.max(rect.width, rect.height);
  ripple.className = 'ripple'; ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (e.clientX - rect.left - size/2) + 'px'; ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
  el.appendChild(ripple); setTimeout(() => ripple.remove(), 650);
});

if(!prefersReducedMotion) {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect(), px = (e.clientX - rect.left) / rect.width - 0.5, py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-4px) rotateX(${(-py*6).toFixed(2)}deg) rotateY(${(px*6).toFixed(2)}deg)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
  });
}

/* ---------------- Modals & Focus Trap ---------------- */
let currentTrapListener = null, lastFocusedEl = null;
function handleFocusTrap(e, modal) {
  const els = modal.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
  if (!els.length) return;
  const first = els[0], last = els[els.length - 1];
  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
    else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
  }
}
window.openModal = function(id) {
  const modal = document.getElementById(id); if(!modal) return;
  lastFocusedEl = document.activeElement; modal.classList.add('open');
  const closeBtn = modal.querySelector('.modal-close'); if(closeBtn) closeBtn.focus();
  currentTrapListener = (e) => handleFocusTrap(e, modal); modal.addEventListener('keydown', currentTrapListener);
};
window.closeModal = function(id) {
  const modal = document.getElementById(id); if(!modal) return;
  modal.classList.remove('open'); if(lastFocusedEl) lastFocusedEl.focus();
  if(currentTrapListener) { modal.removeEventListener('keydown', currentTrapListener); currentTrapListener = null; }
};
document.addEventListener('keydown', (e) => { if(e.key === 'Escape') { document.querySelectorAll('.modal-backdrop.open, #easterEgg.open').forEach(m => m.classList.remove('open')); } });

if (window.location.hash === '#kaiaModal') setTimeout(() => window.openModal('kaiaModal'), 100);

/* ---------------- Easter Egg ---------------- */
(function initKonami(){
  const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']; let pos = 0;
  document.addEventListener('keydown', (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if(key === seq[pos]) { if(++pos === seq.length) { document.getElementById('easterEgg').classList.add('open'); pos = 0; } }
    else pos = (key === seq[0]) ? 1 : 0;
  });
})();
window.closeEasterEgg = () => document.getElementById('easterEgg').classList.remove('open');

/* ---------------- Hero Section (index.html) ---------------- */
const heroSection = document.getElementById('hero-section');
if (heroSection) {
  window.handleHeroMouse = (e) => {
    const rect = heroSection.getBoundingClientRect();
    heroSection.style.setProperty('--mx', (((e.clientX - rect.left) / rect.width) * 100) + '%');
    heroSection.style.setProperty('--my', (((e.clientY - rect.top) / rect.height) * 100) + '%');
  };

  const canvas = document.getElementById('dotGrid');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d'); let w, h, dots = [], mouseX = -9999, mouseY = -9999;
    const resize = () => {
      w = canvas.width = heroSection.getBoundingClientRect().width; h = canvas.height = heroSection.getBoundingClientRect().height;
      dots = []; for(let x = 21; x < w; x += 42) for(let y = 21; y < h; y += 42) dots.push({x, y});
    };
    const draw = () => {
      ctx.clearRect(0,0,w,h); const accent = getComputedStyle(document.body).getPropertyValue('--accent-rgb').trim() || '37,99,235';
      dots.forEach(d => {
        const dist = Math.hypot(d.x - mouseX, d.y - mouseY), inf = Math.max(0, 1 - dist / 160);
        ctx.beginPath(); ctx.arc(d.x, d.y, 1.2 + inf * 2.2, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${accent},${0.12 + inf * 0.55})`; ctx.fill();
      });
      requestAnimationFrame(draw);
    };
    heroSection.addEventListener('mousemove', (e) => { const rect = heroSection.getBoundingClientRect(); mouseX = e.clientX - rect.left; mouseY = e.clientY - rect.top; });
    heroSection.addEventListener('mouseleave', () => { mouseX = -9999; mouseY = -9999; });
    window.addEventListener('resize', resize); resize(); requestAnimationFrame(draw);
  }

  window.initHeroTyping = function() {
    const elType = document.getElementById('heroTyping');
    if (!elType) return;
    if(window._typeTimeout) clearTimeout(window._typeTimeout);
    const isAr = document.documentElement.lang === 'ar';
    const phrases = isAr ? ['مهندس صناعي ومطور أتمتة', 'ممارس 6 سيجما الرشيقة', 'مصمم أدوات توظيف ذكية', 'معتمد على البيانات في حل المشكلات'] : ['Industrial Engineer & Automation Builder', 'Lean Six Sigma Practitioner', 'Builder of AI-Powered Job Tools', 'Data-Driven Problem Solver'];
    if (prefersReducedMotion) { elType.textContent = phrases[0]; return; }
    let pIndex = 0, charIndex = 0, deleting = false;
    const tick = () => {
      const current = phrases[pIndex];
      if(!deleting) { elType.textContent = current.slice(0, ++charIndex); if(charIndex === current.length) { deleting = true; return window._typeTimeout = setTimeout(tick, 1600); } }
      else { elType.textContent = current.slice(0, --charIndex); if(charIndex === 0) { deleting = false; pIndex = (pIndex + 1) % phrases.length; } }
      window._typeTimeout = setTimeout(tick, deleting ? 28 : 42);
    };
    elType.textContent = '';
    tick();
  };
  window.initHeroTyping();
}

/* ---------------- Dashboard Logic (dashboard.html) ---------------- */
if (document.getElementById('statusChart')) {
  function animateCount(el, value){
    if(!el) return;
    const target = Number(value) || 0, startVal = Number(el.dataset.rawValue || 0), duration = 1000, startTime = performance.now();
    if(el._countRaf) cancelAnimationFrame(el._countRaf);
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      el.textContent = Math.round(startVal + (target - startVal) * (1 - Math.pow(1 - progress, 3)));
      if(progress < 1) el._countRaf = requestAnimationFrame(tick); else { el.textContent = target; el.dataset.rawValue = target; }
    };
    el._countRaf = requestAnimationFrame(tick);
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, function(m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }

  function slugify(text) { return String(text || '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, ''); }

  async function loadData() {
    try {
      const res = await fetch(`https://docs.google.com/spreadsheets/d/1rivD5luGlZqq6MCEUVvlT263OfUKXrzH6cr9cf0nG3A/gviz/tq?tqx=out:json&sheet=Job%20Applications%20Log`);
      const text = await res.text(), json = JSON.parse(text.substring(47, text.length - 2));
      const headers = json.table.cols.map(c => (c.label || '').toLowerCase());
      const data = json.table.rows.map(r => { const obj = {}; r.c.forEach((c, i) => obj[headers[i]] = c ? c.v : ''); return obj; });

      const today = new Date().toISOString().split('T')[0];
      animateCount(document.getElementById('sent'), data.filter(r => r.status === 'sent' && (r.timestamp||'').startsWith(today)).length);
      animateCount(document.getElementById('replies'), data.filter(r => (r.decision||'').includes('reply') || (r.status||'').includes('replied')).length);
      animateCount(document.getElementById('interviews'), data.filter(r => r.decision === 'interview_invite' || r.status === 'interview_invite').length);
      animateCount(document.getElementById('total'), data.filter(r => r.status === 'sent').length);

      document.querySelectorAll('.skeleton').forEach(el => el.classList.remove('skeleton'));
      document.getElementById('recentBody').innerHTML = data.filter(r => r.timestamp).sort((a,b) => (b.timestamp||'').localeCompare(a.timestamp||'')).slice(0,10).map(r => `
        <tr style="border-bottom:1px solid var(--border)">
          <td class="py-2 px-2">${escapeHtml(r.company || '—')}</td>
          <td class="py-2 px-2">${escapeHtml(r.job_title || '—')}</td>
          <td class="py-2 px-2 font-num">${escapeHtml(r.fit_score || '—')}</td>
          <td class="py-2 px-2 font-num status-${slugify(r.status)}">${escapeHtml(r.status || '—')}</td>
          <td class="py-2 px-2 font-num">${escapeHtml(r.timestamp ? r.timestamp.split('T')[0] : '—')}</td>
        </tr>
      `).join('');

      const statusCounts = {}; data.forEach(r => { const s = r.status || 'unknown'; statusCounts[s] = (statusCounts[s] || 0) + 1; });
      const labels = Object.keys(statusCounts), values = Object.values(statusCounts);

      if(window.statusChartInstance) {
        window.statusChartInstance.data.labels = labels; window.statusChartInstance.data.datasets[0].data = values; window.statusChartInstance.update();
      } else {
        window.statusChartInstance = new Chart(document.getElementById('statusChart').getContext('2d'), {
          type: 'doughnut', data: { labels, datasets: [{ data: values, backgroundColor: ['#2563eb','#22c55e','#ef4444','#eab308','#a855f7','#3b82f6','#ec4899'], borderWidth: 0 }] },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: body.getAttribute('data-theme') === 'light' ? '#57647a' : '#8b95a8', font: { family: 'JetBrains Mono' } } } } }
        });
      }
      document.getElementById('lastUpdate').textContent = new Date().toLocaleTimeString();
    } catch(e) {
      document.querySelectorAll('.skeleton').forEach(el => el.classList.remove('skeleton'));
      document.getElementById('recentBody').innerHTML = '<tr><td colspan="5" class="text-center py-4" style="color:var(--red);">Error loading data.</td></tr>';
    }
  }
  document.getElementById('refreshBtn').addEventListener('click', loadData);
  loadData(); setInterval(loadData, 300000);
}

/* ---------------- Contact Form Logic (contact.html) ---------------- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const contactSubmit = document.getElementById('contactSubmit'), formStatus = document.getElementById('formStatus');
  const nameInput = document.getElementById('cf-name'), emailInput = document.getElementById('cf-email'), messageInput = document.getElementById('cf-message');

  const valField = (input, errId, fn, msg) => {
    const v = input.value.trim(), valid = fn(v);
    input.classList.toggle('input-error', v.length > 0 && !valid); input.classList.toggle('input-valid', valid);
    document.getElementById(errId).textContent = (v.length > 0 && !valid) ? msg : ''; return valid;
  };
  const runVal = (i) => {
    if(i === nameInput) return valField(nameInput, 'err-name', v => v.length >= 2, document.documentElement.lang === 'ar' ? 'يجب ألا يقل عن حرفين.' : 'Min 2 chars.');
    if(i === emailInput) return valField(emailInput, 'err-email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), document.documentElement.lang === 'ar' ? 'صيغة بريد غير صحيحة.' : 'Valid email req.');
    if(i === messageInput) return valField(messageInput, 'err-message', v => v.length >= 10, document.documentElement.lang === 'ar' ? 'يجب ألا تقل الرسالة عن 10 أحرف.' : 'Min 10 chars.');
  };
  [nameInput, emailInput, messageInput].forEach(i => { i.addEventListener('input', () => runVal(i)); i.addEventListener('blur', () => runVal(i)); });

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if(!runVal(nameInput) || !runVal(emailInput) || !runVal(messageInput)) { formStatus.className = 'text-sm msg-error block'; formStatus.textContent = document.documentElement.lang === 'ar' ? 'يرجى تصحيح الحقول المحددة.' : 'Fix highlighted fields.'; return; }
    contactSubmit.disabled = true; contactSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>...'; formStatus.className = 'text-sm hidden';
    try {
      if((await (await fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(contactForm) })).json()).success) {
        formStatus.innerHTML = `<svg class="success-check" viewBox="0 0 52 52"><circle cx="26" cy="26" r="24"/><path d="M14 27l7 7 17-17"/></svg><p class="text-center mt-2">${document.documentElement.lang === 'ar' ? 'تم الإرسال!' : 'Sent!'}</p>`;
        formStatus.className = 'text-sm msg-success block'; contactForm.reset(); [nameInput, emailInput, messageInput].forEach(i => i.classList.remove('input-valid','input-error'));
      } else throw new Error();
    } catch(err) { formStatus.textContent = document.documentElement.lang === 'ar' ? 'فشل الإرسال.' : 'Error sending.'; formStatus.className = 'text-sm msg-error block'; }
    finally { contactSubmit.disabled = false; contactSubmit.innerHTML = `<i class="fa-solid fa-paper-plane"></i> ${translations[document.documentElement.lang]['btn_send']}`; }
  });
}
