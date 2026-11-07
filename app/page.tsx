"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, ArrowDown, ArrowUp, Github, Download, Copy, Check, Menu, X, Pause, Play, Braces, Cpu, Database, Server, ScanLine, Network, GraduationCap, MapPin, ExternalLink } from "lucide-react";
import { NeuralSculpture } from "@/components/neural-sculpture";
import { content, skillSets, type Language } from "@/lib/content";

const sectionIds = ["about", "work", "journey", "toolkit", "contact"];
const skillIcons = [Network, Cpu, Database, Server, ScanLine, Braces];

function ProjectVisual({ type }: { type: string }) {
  return <div className={`project-visual visual-${type}`} aria-hidden="true">
    <div className="visual-grid" />
    {type === "xcad" ? <svg viewBox="0 0 500 330" fill="none" className="cad-drawing">
      <defs><linearGradient id="cad-fill" x1="140" y1="60" x2="330" y2="290" gradientUnits="userSpaceOnUse"><stop stopColor="#41467e" stopOpacity=".55"/><stop offset="1" stopColor="#15182c" stopOpacity=".1"/></linearGradient></defs>
      <g className="cad-object" strokeLinejoin="round">
        <path d="M250 57 392 131 250 208 108 131Z" fill="url(#cad-fill)" stroke="#a3abf5" strokeWidth="1.2"/>
        <path d="M108 131v88l142 78v-89M392 131v88l-142 78" stroke="#7782c5" strokeWidth="1.2"/>
        <path d="m108 219 142-78 142 78M250 57v84" stroke="#57648f" strokeDasharray="4 6"/>
        <ellipse cx="250" cy="132" rx="68" ry="36" fill="#080d1b" stroke="#8de1e6" strokeWidth="1.3"/>
        <path d="M182 132v57c0 20 30 36 68 36s68-16 68-36v-57" stroke="#85cbdc"/>
        <path d="M182 189c0-20 30-36 68-36s68 16 68 36" stroke="#4f738c" strokeDasharray="4 4"/>
        <ellipse cx="250" cy="132" rx="42" ry="22" stroke="#536d8e"/>
        <path d="m250 19 178 94M414 131v91M250 315l-158-86" stroke="#5c6c8c" strokeWidth=".6"/>
        <path d="m250 14 0 10m178 84v10m-19 13h10m-10 91h10M92 224v10m158 76v10" stroke="#8a9ab9"/>
        <path d="M250 132v-36m0 36 34 18m-34-18-29 16" stroke="#c6e9f6"/>
        <circle cx="250" cy="132" r="3" fill="#d1ffff" stroke="none"/>
      </g>
      <g fill="#7b8fae" fontFamily="monospace" fontSize="10"><text x="344" y="54">120.00</text><text x="432" y="181">60.00</text><text x="108" y="285">Ø 48.00</text><text x="30" y="32">ISOMETRIC / STEP</text><text x="357" y="310">Z ↑  Y ↗  X →</text></g>
    </svg> : type === "robotics" ? <svg viewBox="0 0 500 260" fill="none" className="robot-drawing">
      <g stroke="#263e50" strokeWidth=".7"><path d="m80 215 170-77 170 77-170 77Z"/><path d="m115 231 170-77m-130 95 170-77m-90 113 170-77m-280-13 170 77m-130-95 170 77m-90-113 170 77"/></g>
      <ellipse cx="231" cy="215" rx="54" ry="16" stroke="#6397a0" fill="#0d1c25"/>
      <path d="M200 208v-32h62v32" stroke="#a4c6cb" strokeWidth="2" fill="#11232e"/>
      <g className="robot-arm"><path d="m226 176-45-78 25-15 49 81Z" fill="#183442" stroke="#83c3d0" strokeWidth="1.5"/><circle cx="238" cy="176" r="17" fill="#11222e" stroke="#89d3d9" strokeWidth="1.5"/><circle cx="238" cy="176" r="6" stroke="#89d3d9"/><path d="m186 88 88-53 15 25-86 54Z" fill="#183442" stroke="#83c3d0" strokeWidth="1.5"/><circle cx="195" cy="99" r="15" fill="#11222e" stroke="#89d3d9" strokeWidth="1.5"/><circle cx="195" cy="99" r="5" stroke="#89d3d9"/><path d="m282 48 25 34m-8-17 21 3 12 26m-25-12-5 24" stroke="#a3e5e6" strokeWidth="6" strokeLinecap="round"/><circle cx="282" cy="48" r="13" fill="#12232f" stroke="#89d3d9" strokeWidth="1.5"/></g>
      <path d="M325 160v28m-8-14h16" stroke="#69d4d4"/><path d="m342 184 17-8 16 8v26l-16 8-17-8Z" stroke="#c0ad86" fill="#332e29"/><path d="m342 184 17 9 16-9m-16 9v25" stroke="#c0ad86"/>
      <path d="M324 150v-8h12m39 0h12v9m0 58v9h-12m-39 0h-12v-9" stroke="#64b7bf" strokeDasharray="2 3"/>
      <g fill="#73a1ac" fontFamily="monospace" fontSize="9"><text x="45" y="40">ACT / TRAJECTORY</text><text x="350" y="47">SO-101</text></g>
    </svg> : <svg viewBox="0 0 500 260" fill="none" className="story-drawing">
      <defs><linearGradient id="story-fill" x1="160" y1="30" x2="330" y2="220" gradientUnits="userSpaceOnUse"><stop stopColor="#514563" stopOpacity=".7"/><stop offset="1" stopColor="#191826" stopOpacity=".4"/></linearGradient></defs>
      <g className="story-layers"><rect x="183" y="34" width="195" height="155" rx="4" stroke="#62537a" fill="#151322" transform="rotate(10 183 34)"/><rect x="141" y="46" width="195" height="155" rx="4" stroke="#8c76a5" fill="#1a1729" transform="rotate(-8 141 46)"/>
      <rect x="144" y="50" width="213" height="158" rx="4" stroke="#b49bce" fill="url(#story-fill)"/>
      <circle cx="290" cy="95" r="20" stroke="#c0a3d5" fill="#87759e" fillOpacity=".25"/><path d="m144 177 63-68 61 72 28-33 61 44v16H144Z" stroke="#b39bc8" fill="#3c344e"/><path d="m207 109 17 47 17-5" stroke="#9881ae"/>
      <path d="M167 228h165m-132 10h99" stroke="#6c597f"/><path d="M244 24v13m-6-6h12M381 128v14m-7-7h14M116 166v10m-5-5h10" stroke="#c7aed6"/>
      </g><g fill="#9c85b1" fontFamily="monospace" fontSize="9"><text x="40" y="40">STORY / REIMAGINED</text><text x="359" y="235">∞ POSSIBILITIES</text></g>
    </svg>}
  </div>;
}

export default function Home({ initialLanguage = "zh" }: { initialLanguage?: Language }) {
  const [lang, setLang] = useState<Language>(initialLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [showEarlier, setShowEarlier] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = content[lang];
  const currentProject = t.projects.find(project => project.id === selectedProject);
  const resumeBase = typeof window !== "undefined" && window.location.protocol === "file:" ? "./resumes/" : "/resumes/";

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("lang");
    let saved: string | null = null;
    try { saved = localStorage.getItem("qiwei-language"); } catch {}
    if (query === "en" || query === "zh") setLang(query);
    else if (saved === "en" || saved === "zh") setLang(saved);
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    setPaused(preference.matches);
    const update = (e: MediaQueryListEvent) => setPaused(e.matches);
    preference.addEventListener("change", update);
    return () => { preference.removeEventListener("change", update); if (copyTimer.current) clearTimeout(copyTimer.current); };
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.title = lang === "zh" ? "张其炜 · AI 工程师与构建者" : "Qiwei Zhang · AI Engineer & Builder";
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.intro);
    try { localStorage.setItem("qiwei-language", lang); } catch {}
  }, [lang, t.intro]);
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      elements.forEach(el => el.classList.add("revealed")); return;
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("revealed"); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    elements.forEach(el => observer.observe(el));
    const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) setActiveSection(entry.target.id);
    }), { rootMargin: "-15% 0px -50% 0px" });
    sectionIds.forEach(id => { const el = document.getElementById(id); if (el) navObserver.observe(el); });
    return () => { observer.disconnect(); navObserver.disconnect(); };
  }, []);
  useEffect(() => { if (selectedProject && dialog.current && !dialog.current.open) dialog.current.showModal(); }, [selectedProject]);
  useEffect(() => {
    document.body.style.overflow = selectedProject || menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject, menuOpen]);
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (event: KeyboardEvent) => { if (event.key === "Escape") { setMenuOpen(false);menuButton.current?.focus(); } };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  const changeLanguage = (value: Language) => {
    setLang(value);
    const url = new URL(window.location.href);url.searchParams.set("lang", value);window.history.replaceState(null, "", url);
  };
  const closeProject = useCallback(() => { dialog.current?.close(); setSelectedProject(null); }, []);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("et112131@gmail.com");setCopied(true);setCopyError(false);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch { setCopyError(true); }
  };

  return <div className={`site language-${lang} ${paused ? "motion-paused" : ""}`}>
    <a className="skip-link" href="#main">{t.skip}</a>
    <header className="site-header"><div className="header-inner">
      <a href="#" className="wordmark" aria-label={lang === "zh" ? "张其炜，首页" : "Qiwei Zhang, home"}><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="m16 2 12 7v14l-12 7-12-7V9Z" stroke="currentColor" strokeWidth="1.5"/><path d="m10 12 6-3 6 3v8l-6 3-6-3Z" stroke="currentColor"/><path d="m17 18 9 9" stroke="currentColor" strokeWidth="1.5"/></svg><span>qiwei<span className="wordmark-dot">.</span></span></a>
      <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label={lang === "zh" ? "主导航" : "Main navigation"} id="main-nav">
        {t.nav.map((label, i) => <a key={sectionIds[i]} href={`#${sectionIds[i]}`} className={activeSection === sectionIds[i] ? "active" : ""} aria-current={activeSection === sectionIds[i] ? "location" : undefined} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
      <div className="header-actions"><div className="language-switch" role="group" aria-label="Language / 语言"><button type="button" lang="zh-CN" aria-pressed={lang === "zh"} onClick={() => changeLanguage("zh")}>中</button><span>/</span><button type="button" lang="en" aria-pressed={lang === "en"} onClick={() => changeLanguage("en")}>EN</button></div><a className="icon-button header-github" href="https://github.com/rainbowsteins/" target="_blank" rel="noopener noreferrer" aria-label={t.github}><Github size={19}/></a><button ref={menuButton} type="button" className="icon-button menu-toggle" aria-label={menuOpen ? t.close : t.menu} aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21}/> : <Menu size={21}/>}</button></div>
    </div></header>
    <main id="main" inert={menuOpen}>
      <section className="hero" aria-labelledby="hero-title"><div className="hero-grid"/><div className="hero-glow"/>
        <div className="container hero-layout"><div className="hero-copy">
          <div className="eyebrow hero-eyebrow"><span className="status-light"/>{t.eyebrow}</div>
          <div className="hero-name"><span>{t.hello}</span><strong>{t.name}<span className="name-period">.</span></strong><span className="name-caption">{t.englishName}</span></div>
          <h1 id="hero-title">{t.headline[0]}<br/><span className="gradient-text">{t.headline[1]}</span></h1>
          <p className="hero-intro">{t.intro}</p>
          <div className="hero-buttons"><a href="#work" className="button button-primary">{t.projectsCta}<ArrowUpRight size={18}/></a><a href="#contact" className="button button-text">{t.contactCta}<ArrowRight size={17}/></a></div>
          <a className="currently-building" href="https://x-cad.xyz" target="_blank" rel="noopener noreferrer"><span className="building-symbol"><Braces size={19}/></span><span><small>{t.building}</small><strong>{t.buildingName}</strong></span><ArrowUpRight size={15}/></a>
        </div><div className="hero-art">
          <div className="art-topline"><span><i/>LIVE SYSTEM</span><span>QZ — 2026</span></div>
          <NeuralSculpture paused={paused}/>
          <div className="art-label label-one"><span className="node-dot"/>REASON<span className="label-line"/></div><div className="art-label label-two"><span className="node-dot"/>CREATE<span className="label-line"/></div><div className="art-label label-three"><span className="node-dot"/>CONNECT<span className="label-line"/></div>
          <div className="art-bottomline"><span className="mono">[ {t.sculpture} ]</span><button type="button" className="icon-button motion-toggle" onClick={() => setPaused(!paused)} aria-label={paused ? t.play : t.pause} aria-pressed={paused}>{paused ? <Play size={14}/> : <Pause size={14}/>}</button></div><span className="art-hint">{t.sculptureHint}</span>
        </div></div>
        <div className="container hero-bottom"><a href="#about" className="scroll-link"><span className="scroll-track"><i/></span>{t.scroll}<ArrowDown size={13}/></a><div className="hero-coordinates mono">AGENTIC AI <span>×</span> PHYSICAL WORLD</div></div>
      </section>
      <div className="container stats-strip reveal">{["8+", "2", "100M+"].map((value, i) => <div className="stat" key={value}><strong>{value}<span>{i === 0 ? "YRS" : i === 1 ? "CLIENTS" : "RECORDS"}</span></strong><span>{t.statLabels[i]}</span></div>)}</div>
      <section id="about" className="section about-section container reveal"><div className="section-label"><span className="section-mark"/>{t.aboutLabel}</div><div className="about-layout"><h2>{t.aboutTitle}</h2><div className="about-content"><p>{t.aboutText}</p><p>{t.aboutText2}</p><div className="focus-list"><span className="mono focus-title">{t.focus}</span>{t.focusItems.map((item, i) => <span key={item}><i className={`focus-dot dot-${i}`}/>{item}</span>)}</div></div></div></section>
      <section id="work" className="section work-section container"><div className="section-heading reveal"><div><div className="section-label"><span className="section-mark"/>{t.selectedLabel}</div><h2>{t.selectedTitle}</h2></div><p>{t.selectedIntro}</p></div>
        <div className="project-grid">{t.projects.map(project => <article className={`project-card project-${project.id} reveal`} key={project.id}>
          <div className="project-card-content"><div className="project-meta mono"><span><i/>{project.category}</span><span>{project.year}</span></div><h3>{project.title}</h3><p className="project-subtitle">{project.subtitle}</p><p className="project-description">{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-card-bottom"><div className="project-metric"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div><button type="button" className="project-link" onClick={() => setSelectedProject(project.id)} aria-label={`${t.detail} · ${project.subtitle}`}>{t.detail}<ArrowUpRight size={17}/></button></div></div>
          <ProjectVisual type={project.id}/>
        </article>)}</div>
        <a className="github-more reveal" href="https://github.com/rainbowsteins/" target="_blank" rel="noopener noreferrer"><Github size={19}/><span>{lang === "zh" ? "更多代码与探索，在 GitHub" : "More code and experiments on GitHub"}</span><span className="github-handle mono">@rainbowsteins</span><ArrowUpRight size={17}/></a>
      </section>
      <section id="journey" className="section journey-section container"><div className="section-heading reveal"><div><div className="section-label"><span className="section-mark"/>{t.journeyLabel}</div><h2>{t.journeyTitle}</h2></div><p>{t.journeyIntro}</p></div>
        <div className="timeline">{t.jobs.map((job, index) => <article className={`timeline-item reveal ${index === 0 ? "is-current" : ""}`} key={job.company}><div className="timeline-date mono"><span className="timeline-dot"/>{job.date}</div><div className="timeline-detail"><div className="job-heading"><div><h3>{job.company}</h3><span className="job-role">{job.role}</span></div><span className="job-location"><MapPin size={12}/>{job.location}</span></div><p>{job.description}</p><span className="job-highlight"><ArrowUpRight size={13}/>{job.highlight}</span></div></article>)}</div>
        <div className="earlier-experience reveal"><button type="button" aria-expanded={showEarlier} aria-controls="earlier-content" onClick={() => setShowEarlier(!showEarlier)}><span className="mono">2015 — 2020</span>{t.earlier}<span className={`expand-sign ${showEarlier ? "expanded" : ""}`}>+</span></button><p id="earlier-content" hidden={!showEarlier}>{t.earlierText}</p></div>
      </section>
      <section id="toolkit" className="section toolkit-section"><div className="container"><div className="section-heading reveal"><div><div className="section-label"><span className="section-mark"/>{t.stackEyebrow}</div><h2>{t.stackTitle}</h2></div><p>{t.stackIntro}</p></div><div className="skills-grid">{skillSets.map((skills, i) => { const Icon = skillIcons[i];return <article className="skill-group reveal" key={i}><div className="skill-heading"><span className={`skill-icon skill-icon-${i}`}><Icon size={21}/></span><h3>{t.skillGroups[i]}</h3></div><div className="skill-tags">{skills.map(skill => <span key={skill}>{lang === "zh" && skill === "Tool use" ? "工具调用" : lang === "zh" && skill === "Prompt engineering" ? "提示词工程" : lang === "zh" && skill === "Async crawlers" ? "异步爬虫" : lang === "zh" && skill === "Distributed crawling" ? "分布式爬虫" : skill}</span>)}</div></article>; })}</div></div></section>
      <section className="section education-section container"><div className="section-heading reveal"><div><div className="section-label"><span className="section-mark"/>{t.educationLabel}</div><h2>{t.educationTitle}</h2></div><GraduationCap size={34} strokeWidth={1} className="education-heading-icon"/></div><div className="education-grid">{t.education.map(item => <article className="education-card reveal" key={item.school}><span className="mono education-date">{item.date}</span><span className="education-country mono">{item.country}</span><h3>{item.school}</h3><span className="education-english">{item.english}</span><p className="education-degree">{item.degree}</p><p className="education-detail">{item.detail}</p></article>)}</div></section>
      <section id="contact" className="contact-section"><div className="contact-orbit" aria-hidden="true"/><div className="container contact-inner reveal"><div className="section-label"><span className="status-light"/>{t.contactLabel}</div><h2>{t.contactTitle[0]}<br/><span className="gradient-text">{t.contactTitle[1]}</span></h2><p>{t.contactText}</p><div className="email-row"><a href="mailto:et112131@gmail.com" aria-label={`${t.emailLabel} · et112131@gmail.com`}>et112131@gmail.com<ArrowUpRight size={25}/></a><button type="button" className="icon-button copy-button" onClick={copyEmail} aria-label={copied ? t.copied : t.copy}>{copied ? <Check size={17}/> : <Copy size={17}/>}</button></div><span className="copy-status" role="status">{copied ? t.copied : copyError ? t.copyFailed : ""}</span><div className="contact-links"><a href="https://github.com/rainbowsteins/" target="_blank" rel="noopener noreferrer"><Github size={17}/>GitHub<ArrowUpRight size={13}/></a><a href={`${resumeBase}${lang === "zh" ? "Qiwei_Zhang_CV_ZH.docx" : "Qiwei_Zhang_CV_EN.docx"}`} download title={t.resumeNote}><Download size={17}/>{t.resume}</a><span className="contact-languages">{t.languageText}</span></div></div></section>
    </main>
    <footer className="container site-footer" inert={menuOpen}><a href="#" className="footer-brand">qiwei<span>.</span></a><span>© {new Date().getFullYear()} Qiwei Zhang</span><span className="footer-note">{t.footer}</span><a href="#" className="back-top" aria-label={t.top}>{t.top}<ArrowUp size={14}/></a></footer>
    <dialog ref={dialog} className="project-dialog" onClose={() => setSelectedProject(null)} onCancel={closeProject} onClick={event => { if (event.target === event.currentTarget) closeProject(); }} aria-labelledby="dialog-title">
      {currentProject && <div className="dialog-content"><div className="dialog-top"><span className="mono">{currentProject.category}</span><button type="button" className="icon-button" onClick={closeProject} aria-label={t.close} autoFocus><X size={21}/></button></div><h2 id="dialog-title">{currentProject.subtitle}</h2><p className="dialog-intro">{currentProject.description}</p><div className="dialog-section"><h3>{t.roleLabel}</h3><p>{currentProject.role}</p></div>{currentProject.approach.length > 0 && <div className="dialog-section"><h3>{t.approachLabel}</h3><ul>{currentProject.approach.map(item => <li key={item}>{item}</li>)}</ul></div>}<div className="dialog-outcome"><h3>{t.resultLabel}</h3><p>{currentProject.result}</p></div>{currentProject.tech && <div className="dialog-section"><h3>{t.stackLabel}</h3><p className="dialog-tech">{currentProject.tech}</p></div>}{currentProject.id === "xcad" && <a className="button button-primary" href="https://x-cad.xyz" target="_blank" rel="noopener noreferrer">{t.product}<ExternalLink size={16}/></a>}</div>}
    </dialog>
  </div>;
}
