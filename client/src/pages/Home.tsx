/**
 * Design reminder — Operational Clarity: Swiss information design with a signal rail,
 * deliberate asymmetry, near-black ink, warm paper, and signal vermilion used only for action.
 */
import { ChangeEvent, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  Globe2,
  Languages,
  Menu,
  MessageCircle,
  MoveRight,
  Paperclip,
  ScanSearch,
  Send,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/966571448656?text=Hi%20AutoApply%20SA%2C%20I%20want%20to%20start%20a%20campaign.";

const plans = [
  {
    name: "Starter",
    price: "99",
    descriptor: "A focused starting lane.",
    features: ["~40 applications", "Email + portal submit", "Weekly report"],
  },
  {
    name: "Pro",
    price: "149",
    descriptor: "For active multi-channel momentum.",
    features: ["~90 applications", "Priority tailoring", "Julie copilot", "Daily report"],
    featured: true,
  },
  {
    name: "Founder",
    price: "249",
    descriptor: "High-touch targeting for a pivotal move.",
    features: ["~150 applications", "Multi-role targeting", "White-glove onboarding"],
  },
];

const faqs = [
  {
    question: "Is my CV data private?",
    answer:
      "Your CV is used to match and tailor applications. You can request deletion at any time; it is not sold as a separate product.",
  },
  {
    question: "Do you apply to real companies?",
    answer:
      "The service is designed for live Gulf roles, using email and direct portal submission, with bounce-checked addresses where email is used.",
  },
  {
    question: "Which languages are supported?",
    answer:
      "The current service supports English, Arabic, Somali, and Filipino to serve a broad Gulf job market.",
  },
  {
    question: "How do I pay?",
    answer:
      "Monthly plans can be arranged through STC Pay or bank transfer (IBAN). You can ask the team about the current payment instructions when you start a campaign.",
  },
];

function RailLabel({ children }: { children: React.ReactNode }) {
  return <span className="rail-label">{children}</span>;
}

function StatusDot({ tone = "active" }: { tone?: "active" | "quiet" }) {
  return <span className={`status-dot ${tone}`} aria-hidden="true" />;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedFile, setSelectedFile] = useState("");

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0]?.name || "");
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="AutoApply SA home">
          <img src="/manus-storage/autoapply-symbol_80d77010.png" alt="" className="brand-mark" />
          <span>AutoApply <em>SA</em></span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <button onClick={() => scrollTo("how")}>How it works</button>
          <button onClick={() => scrollTo("product")}>Product</button>
          <button onClick={() => scrollTo("upload")}>Upload CV</button>
          <button onClick={() => scrollTo("pricing")}>Pricing</button>
          <button onClick={() => scrollTo("faq")}>FAQ</button>
        </nav>

        <div className="nav-actions">
          <a className="language-link" href="https://hsndm.tech" lang="ar" aria-label="Visit the Arabic version">
            العربية
          </a>
          <a className="button button-ink button-small" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            Start a campaign <ArrowUpRight size={15} />
          </a>
          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={21} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {[
              ["How it works", "how"],
              ["Product", "product"],
              ["Upload CV", "upload"],
              ["Pricing", "pricing"],
              ["FAQ", "faq"],
            ].map(([label, id], index) => (
              <button key={id} onClick={() => scrollTo(id)}>
                <span>0{index + 1}</span> {label} <ArrowDownRight size={18} />
              </button>
            ))}
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              Talk to the team <MessageCircle size={18} />
            </a>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-heading">
          <img className="hero-image" src="/manus-storage/autoapply-hero-operations_ad007abc.jpg" alt="Professional reviewing a job application at a laptop" />
          <div className="hero-overlay" />
          <div className="hero-structure" aria-hidden="true">
            <span className="hero-grid-line one" />
            <span className="hero-grid-line two" />
            <span className="hero-grid-line three" />
          </div>
          <div className="hero-content page-frame">
            <div className="hero-lead">
              <div className="eyebrow light"><StatusDot /> 24/7 job engine <span /> Jeddah, KSA</div>
              <h1 id="hero-heading">
                Your applications,<br />
                <i>engineered</i> while<br />
                you sleep.
              </h1>
              <p>
                AutoApply SA finds, tailors, and submits applications to Gulf roles by email and portal—built around your CV and your preferred language.
              </p>
              <div className="hero-actions">
                <button className="button button-paper" onClick={() => scrollTo("upload")}>
                  Upload your CV <ArrowDownRight size={18} />
                </button>
                <button className="text-button light-text" onClick={() => scrollTo("how")}>
                  See the system <MoveRight size={18} />
                </button>
              </div>
              <div className="hero-note">From 99 SAR / month <b /> no card needed to begin a conversation</div>
            </div>

            <div className="hero-ledger" aria-label="Application engine status">
              <div className="ledger-topline">
                <span>APPLICATION ENGINE</span>
                <span>LIVE / 24H</span>
              </div>
              <div className="ledger-route">
                <div><StatusDot /> CV parsed</div>
                <span />
                <div><StatusDot /> Roles matched</div>
                <span />
                <div><StatusDot tone="quiet" /> Applying</div>
              </div>
              <div className="ledger-record">
                <span className="record-number">03</span>
                <div>
                  <b>Targeting ready</b>
                  <small>Skills, experience & language mapped</small>
                </div>
                <ArrowUpRight size={16} />
              </div>
            </div>

            <div className="hero-stats">
              <div><strong>500+</strong><span>Gulf roles scanned</span></div>
              <div><strong>24/7</strong><span>Engine in motion</span></div>
              <div><strong>4</strong><span>Languages supported</span></div>
            </div>
          </div>
        </section>

        <section id="product" className="service-intro section-paper">
          <div className="page-frame split-layout">
            <aside className="section-rail">
              <RailLabel>01 / Platform</RailLabel>
              <span className="rail-rule" />
              <p>NOT ANOTHER JOB BOARD</p>
            </aside>
            <div className="intro-main">
              <div className="section-kicker"><Zap size={15} /> APPLICATION INFRASTRUCTURE</div>
              <h2>Everything a serious search <i>needs to keep moving.</i></h2>
              <p className="section-summary">
                From CV interpretation to submission follow-through, the system turns your job search into a planned operating rhythm—not a late-night copy-and-paste exercise.
              </p>
              <div className="capability-grid">
                <article className="capability-card">
                  <span className="capability-index">A/01</span>
                  <ScanSearch size={27} strokeWidth={1.6} />
                  <h3>Application engine</h3>
                  <p>CV details are matched to live Gulf roles and each application is tailored to the opening.</p>
                  <span className="card-rule" />
                </article>
                <article className="capability-card dark-card">
                  <span className="capability-index">A/02</span>
                  <Languages size={27} strokeWidth={1.6} />
                  <h3>CV matching</h3>
                  <p>Surface the most relevant target roles first, so your effort follows your actual profile.</p>
                  <span className="card-rule" />
                </article>
                <article className="capability-card accent-card">
                  <span className="capability-index">A/03</span>
                  <Clock3 size={27} strokeWidth={1.6} />
                  <h3>Ops automation</h3>
                  <p>Follow-ups, resends, and delivery checks help keep application activity from losing pace.</p>
                  <span className="card-rule" />
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="how" className="workflow-section section-ink">
          <div className="page-frame split-layout">
            <aside className="section-rail inverted">
              <RailLabel>02 / Workflow</RailLabel>
              <span className="rail-rule" />
              <p>THREE MOVES. ZERO MANUAL APPLYING.</p>
            </aside>
            <div className="workflow-main">
              <div className="section-kicker inverse"><Sparkles size={15} /> CLEAR BY DESIGN</div>
              <h2>Put the search <i>on a system.</i></h2>
              <p className="section-summary inverse-summary">Start with the material you already have. Then let the engine turn it into a consistent application routine.</p>
              <div className="process-list">
                <article className="process-item">
                  <div className="process-number">01</div>
                  <div className="process-content">
                    <h3>Upload your CV</h3>
                    <p>Drop a PDF, DOC, DOCX, or TXT. Your skills, experience, and career trajectory become the starting brief.</p>
                  </div>
                  <FileText size={24} strokeWidth={1.4} />
                </article>
                <article className="process-item">
                  <div className="process-number">02</div>
                  <div className="process-content">
                    <h3>Set your target roles</h3>
                    <p>Review the best-fit role lanes found across Gulf listings and align the search to your next move.</p>
                  </div>
                  <Globe2 size={24} strokeWidth={1.4} />
                </article>
                <article className="process-item active-process">
                  <div className="process-number">03</div>
                  <div className="process-content">
                    <h3>The engine applies 24/7</h3>
                    <p>Applications, tailored cover letters, portals, email sends, and delivery checks progress while you get on with your day.</p>
                  </div>
                  <Send size={24} strokeWidth={1.4} />
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="upload" className="upload-section section-paper">
          <div className="page-frame upload-grid">
            <div className="upload-image-wrap">
              <img src="/manus-storage/autoapply-desk_635170b2.jpg" alt="Minimal worktable prepared for a job search" />
              <div className="image-stamp"><span>START / 60 SEC</span><ArrowDownRight size={17} /></div>
            </div>
            <div className="upload-copy">
              <div className="section-kicker"><Paperclip size={15} /> CV INTAKE</div>
              <h2>Drop your CV. <i>Find your lanes.</i></h2>
              <p className="section-summary">Select the latest version of your CV and continue the conversation directly with the team. You will receive the relevant next steps for your campaign.</p>
              <label className={`drop-zone ${selectedFile ? "has-file" : ""}`}>
                <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={onFileChange} />
                <span className="drop-symbol"><FileText size={24} /></span>
                <span className="drop-copy">
                  <b>{selectedFile || "Choose your CV"}</b>
                  <small>{selectedFile ? "Ready to share with the team" : "PDF, DOC, DOCX or TXT"}</small>
                </span>
                <span className="drop-arrow"><ArrowUpRight size={20} /></span>
              </label>
              <p className="privacy-note"><ShieldCheck size={16} /> This static preview keeps the selection in your browser only. For a real campaign, continue with the team below.</p>
              <a className="button button-ink" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                Continue on WhatsApp <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Service properties">
          <div className="page-frame proof-grid">
            <div><StatusDot /> Bounce-verified sends</div>
            <div><StatusDot /> Email + portal submission</div>
            <div><StatusDot /> STC Pay & IBAN accepted</div>
            <div><StatusDot /> EN / AR / SO / FIL</div>
          </div>
        </section>

        <section className="detail-section section-fog">
          <div className="page-frame detail-layout">
            <aside className="section-rail">
              <RailLabel>03 / In practice</RailLabel>
              <span className="rail-rule" />
              <p>VISIBLE WORK. NOT VAGUE PROMISES.</p>
            </aside>
            <div className="detail-content">
              <div>
                <div className="section-kicker"><ScanSearch size={15} /> WHAT THE SERVICE DOES</div>
                <h2>The moving parts behind a <i>considered application.</i></h2>
              </div>
              <img className="flow-image" src="/manus-storage/autoapply-flow_6c03602a.jpg" alt="Desk workspace illustrating a structured job application process" />
              <div className="detail-points">
                <article><span>01</span><p><b>Read the signal.</b> Interpret your CV, availability, language, and target direction before a role is selected.</p></article>
                <article><span>02</span><p><b>Match with context.</b> Focus on openings where your profile has relevance, instead of treating every vacancy the same.</p></article>
                <article><span>03</span><p><b>Carry the thread.</b> Tailor, submit, and follow through on the operational tasks that can otherwise interrupt a search.</p></article>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="pricing-section section-paper">
          <div className="page-frame split-layout">
            <aside className="section-rail">
              <RailLabel>04 / Pricing</RailLabel>
              <span className="rail-rule" />
              <p>MONTHLY PLANS / SAR</p>
            </aside>
            <div className="pricing-main">
              <div className="pricing-heading">
                <div>
                  <div className="section-kicker"><Zap size={15} /> CHOOSE YOUR ENGINE</div>
                  <h2>Set the pace that <i>fits your search.</i></h2>
                </div>
                <p>Monthly plans. STC Pay or IBAN. Cancel anytime.</p>
              </div>
              <div className="plans-grid">
                {plans.map((plan) => (
                  <article className={`plan-card ${plan.featured ? "plan-featured" : ""}`} key={plan.name}>
                    {plan.featured && <div className="plan-flag">MOST SELECTED</div>}
                    <div className="plan-top"><span>{plan.name}</span><ArrowUpRight size={18} /></div>
                    <div className="price"><b>{plan.price}</b><span>SAR<br />/ MO</span></div>
                    <p>{plan.descriptor}</p>
                    <ul>{plan.features.map((feature) => <li key={feature}><Check size={15} /> {feature}</li>)}</ul>
                    <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="plan-cta">Choose {plan.name} <MoveRight size={17} /></a>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="faq-section section-ink">
          <div className="page-frame split-layout">
            <aside className="section-rail inverted">
              <RailLabel>05 / FAQ</RailLabel>
              <span className="rail-rule" />
              <p>BEFORE YOU BEGIN</p>
            </aside>
            <div className="faq-main">
              <div className="section-kicker inverse"><MessageCircle size={15} /> QUESTIONS, ANSWERED</div>
              <h2>A few things worth <i>making clear.</i></h2>
              <div className="faq-list">
                {faqs.map((faq, index) => {
                  const isOpen = activeFaq === index;
                  return (
                    <article className={`faq-item ${isOpen ? "open" : ""}`} key={faq.question}>
                      <button onClick={() => setActiveFaq(isOpen ? null : index)} aria-expanded={isOpen}>
                        <span>0{index + 1}</span><b>{faq.question}</b><ChevronDown size={20} />
                      </button>
                      <div className="faq-answer"><p>{faq.answer}</p></div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="final-cta section-accent">
          <div className="page-frame final-inner">
            <div>
              <div className="eyebrow dark"><StatusDot tone="quiet" /> OPEN A NEW CAMPAIGN</div>
              <h2>Make the next role<br /><i>your next move.</i></h2>
            </div>
            <div className="final-action">
              <p>Reach Hasan directly for campaign setup, payment details, and the best way to share your CV.</p>
              <a className="button button-ink" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Talk on WhatsApp <ArrowUpRight size={18} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="page-frame footer-top">
          <a className="brand footer-brand" href="#top">
            <img src="/manus-storage/autoapply-symbol_80d77010.png" alt="" className="brand-mark" />
            <span>AutoApply <em>SA</em></span>
          </a>
          <p>Your 24/7 job application engine.<br />Jeddah built. Gulf focused.</p>
          <a className="footer-email" href="mailto:hasan@hsndm.tech">hasan@hsndm.tech <ArrowUpRight size={16} /></a>
        </div>
        <div className="page-frame footer-bottom">
          <span>© 2026 AUTOAPPLY SA</span>
          <div><a href="https://instagram.com/hsndm_" target="_blank" rel="noreferrer">Instagram</a><a href="https://linkedin.com/in/hsndm" target="_blank" rel="noreferrer">LinkedIn</a><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp</a></div>
          <span>JEDDAH, KSA</span>
        </div>
      </footer>
    </div>
  );
}
