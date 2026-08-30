import React, { useState, useEffect, useRef } from "react";

/*
  Портфолио — Ariet
  Концепция: тёплая бумага в клетку (тетрадь) как основа + один сильный
  акцент — окно редактора кода в hero, которое печатает bio как JS-объект.
  Мотив "редактора" проходит насквозь: git-log вместо обычного таймлайна,
  терминал в контактах, статус-бар в футере. Всё остальное — тихо и просто.
*/

const BIO_LINES = [
  "const ariet = {",
  "  status: 'учусь на разработчика',",
  "  learning: 'React',",
  "  mindset: 'разбираться, а не запоминать',",
  "};",
];

const SKILLS = [
  { key: "html", value: "разметка страниц", level: 3 },
  { key: "css", value: "адаптивная вёрстка", level: 3 },
  { key: "javascript", value: "логика, DOM, массивы", level: 2 },
  { key: "react", value: "компоненты, состояние", level: 2, current: true },
  { key: "git", value: "коммиты, ветки", level: 2 },
];

const COMMITS = [
  {
    hash: "a1f3c9d",
    title: "Начал(а) учиться",
    text: "Первые строки кода — HTML и CSS, простая вёрстка.",
  },
  {
    hash: "7b2e0aa",
    title: "JavaScript",
    text: "Логика, функции, работа с DOM и событиями.",
  },
  {
    hash: "e44d1f2",
    title: "React",
    text: "Компоненты, состояние, первые интерфейсы.",
    head: true,
  },
  {
    hash: "———————",
    title: "Дальше",
    text: "Pet-проекты, портфолио, первая стажировка.",
    pending: true,
  },
];

const PROJECTS = [
  {
    title: "task-tracker",
    url: "ariet.dev/task-tracker",
    desc: "Учебный трекер задач — практика работы с состоянием в React: добавление, отметка и удаление дел.",
    tag: "React",
  },
  {
    title: "coffee-landing",
    url: "ariet.dev/coffee-landing",
    desc: "Адаптивный лендинг кофейни на HTML и CSS — сетка, медиа-запросы, анимации при наведении.",
    tag: "HTML / CSS",
  },
  {
    title: "next-project",
    url: "ariet.dev/скоро",
    desc: "Место под следующую учебную работу — появится по мере прогресса.",
    tag: "в разработке",
  },
];

function useOnScreen(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const visible = useOnScreen(ref);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function TypedCode({ lines, speed = 26, startDelay = 300 }) {
  const [out, setOut] = useState(lines.map(() => ""));
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let li = 0;
    let ci = 0;
    const acc = lines.map(() => "");

    const timer = setTimeout(function tick() {
      if (cancelled) return;
      if (li >= lines.length) {
        setDone(true);
        return;
      }
      const line = lines[li];
      if (ci < line.length) {
        acc[li] += line[ci];
        ci++;
        setOut([...acc]);
        setTimeout(tick, speed);
      } else {
        li++;
        ci = 0;
        setTimeout(tick, speed * 4);
      }
    }, startDelay);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [lines, speed, startDelay]);

  const colorize = (line) => {
    if (line.trim().startsWith("const"))
      return (
        <>
          <span className="tok-kw">const</span>
          {line.replace("const", "")}
        </>
      );
    const m = line.match(/^(\s*)([a-zA-Z]+)(:\s*)(.*)$/);
    if (m) {
      const [, ws, key, colon, rest] = m;
      return (
        <>
          {ws}
          <span className="tok-prop">{key}</span>
          {colon}
          <span className="tok-str">{rest}</span>
        </>
      );
    }
    return line;
  };

  const activeIdx = out.findIndex((x, idx) => x.length < lines[idx].length);

  return (
    <>
      {out.map((l, i) => (
        <div className="code-line" key={i}>
          <span className="ln">{i + 1}</span>
          <span className="code-text">
            {colorize(l)}
            {!done && i === activeIdx && <span className="caret" />}
          </span>
        </div>
      ))}
    </>
  );
}

export default function App() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        :root {
          --paper: #FAF7EF;
          --grid-line: #E7DFC9;
          --ink: #1D3557;
          --ink-soft: #536585;
          --text: #2B2620;
          --marker: #F4C95D;
          --marker-deep: #D99E2B;
          --rule: #C9BFA4;
          --white: #FFFFFF;
          --editor-bg: #16213A;
          --code-fg: #DCE4F5;
          --tok-kw: #F4C95D;
          --tok-prop: #7FB8E0;
          --tok-str: #C4E3A0;
        }

        * { box-sizing: border-box; }

        .page {
          background:
            linear-gradient(var(--grid-line) 1px, transparent 1px) 0 0 / 100% 32px,
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px) 0 0 / 32px 100%,
            var(--paper);
          color: var(--text);
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          position: relative;
        }

        .mono { font-family: 'JetBrains Mono', monospace; }

        /* NAV */
        .nav {
          position: sticky;
          top: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 32px;
          background: rgba(250, 247, 239, 0.86);
          backdrop-filter: blur(6px);
          border-bottom: 1px solid var(--grid-line);
        }

        .nav-logo {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          color: var(--ink);
          font-size: 15px;
        }
        .nav-logo span { color: var(--marker-deep); }

        .nav-links {
          display: flex;
          gap: 26px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
        }
        .nav-links a { color: var(--ink-soft); text-decoration: none; }
        .nav-links a:hover { color: var(--ink); }

        @media (max-width: 620px) { .nav-links { display: none; } }

        .wrap { max-width: 980px; margin: 0 auto; padding: 0 32px; }

        /* HERO */
        .hero {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: 56px;
          align-items: center;
          padding: 76px 0 90px;
        }
        @media (max-width: 860px) {
          .hero { grid-template-columns: 1fr; padding: 48px 0 60px; gap: 40px; }
        }

        .hero-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13.5px;
          color: var(--ink-soft);
          margin: 0 0 18px;
        }
        .hero-tag::before { content: "// "; color: var(--rule); }

        h1.name {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 800;
          font-size: clamp(38px, 6.4vw, 60px);
          line-height: 1.08;
          margin: 0 0 22px;
          color: var(--ink);
          letter-spacing: -0.01em;
        }

        .hero-lede {
          font-size: 18px;
          line-height: 1.65;
          max-width: 46ch;
          color: var(--text);
          margin: 0 0 32px;
        }

        .mark {
          background: linear-gradient(120deg, var(--marker) 0%, var(--marker) 100%);
          background-repeat: no-repeat;
          background-size: 100% 42%;
          background-position: 0 88%;
          padding: 0 2px;
        }

        .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }

        .btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px;
          padding: 12px 20px;
          border-radius: 4px;
          text-decoration: none;
          cursor: pointer;
          border: 1.5px solid var(--ink);
          transition: transform 0.15s ease, background 0.15s ease;
          display: inline-block;
        }
        .btn-fill { background: var(--ink); color: var(--paper); }
        .btn-fill:hover { transform: translateY(-2px); }
        .btn-line { background: transparent; color: var(--ink); }
        .btn-line:hover { background: rgba(29,53,87,0.06); transform: translateY(-2px); }

        /* CODE EDITOR WINDOW */
        .editor {
          background: var(--editor-bg);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 24px 60px -20px rgba(22, 33, 58, 0.55);
          transform: rotate(0.6deg);
        }
        .editor-bar { display: flex; align-items: center; gap: 8px; padding: 12px 14px; background: #101a30; }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .editor-file { margin-left: 10px; font-family: 'JetBrains Mono', monospace; font-size: 12.5px; color: #8FA3C9; }
        .editor-body { padding: 22px 20px 28px; min-height: 200px; }
        .code-line { display: flex; font-family: 'JetBrains Mono', monospace; font-size: 14.5px; line-height: 1.9; white-space: pre; }
        .ln { width: 24px; color: #4A5A80; user-select: none; flex-shrink: 0; }
        .code-text { color: var(--code-fg); }
        .tok-kw { color: var(--tok-kw); }
        .tok-prop { color: var(--tok-prop); }
        .tok-str { color: var(--tok-str); }
        .caret {
          display: inline-block; width: 7px; height: 15px; background: var(--marker);
          margin-left: 2px; transform: translateY(2px); animation: blink 1s step-end infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }

        /* SECTIONS */
        section { padding-top: 90px; }
        .section-head {
          display: flex; align-items: baseline; gap: 12px; margin-bottom: 30px;
          border-bottom: 1.5px solid var(--rule); padding-bottom: 12px;
        }
        .section-head .idx { font-family: 'JetBrains Mono', monospace; color: var(--marker-deep); font-size: 14px; }
        .section-head h2 { font-family: 'JetBrains Mono', monospace; font-size: 23px; margin: 0; color: var(--ink); font-weight: 700; }

        /* ABOUT */
        .about-grid { display: grid; grid-template-columns: 1.3fr 0.9fr; gap: 40px; align-items: start; }
        @media (max-width: 760px) { .about-grid { grid-template-columns: 1fr; } }
        .about-text { font-size: 16.5px; line-height: 1.78; max-width: 56ch; }

        .sticky-note {
          background: var(--marker); color: #3A2E0C; padding: 22px 20px; border-radius: 2px;
          font-family: 'JetBrains Mono', monospace; font-size: 14px; line-height: 1.6;
          transform: rotate(-1.4deg); box-shadow: 0 14px 30px -14px rgba(0,0,0,0.25);
        }
        .sticky-note strong { display: block; margin-bottom: 6px; font-size: 12px; opacity: 0.7; }

        /* SKILLS */
        .skills-editor { background: var(--editor-bg); border-radius: 8px; padding: 24px 22px; }
        .skills-editor .code-line { font-size: 14.5px; }
        .skill-row { display: flex; align-items: center; gap: 14px; justify-content: space-between; }
        .skill-bars { display: flex; gap: 4px; }
        .skill-bars span { width: 14px; height: 5px; border-radius: 2px; background: #2C3A5C; }
        .skill-bars span.on { background: var(--tok-kw); }
        .skill-current { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--tok-kw); margin-left: 8px; }

        /* JOURNEY — git log */
        .git-log { display: flex; flex-direction: column; }
        .commit {
          display: grid; grid-template-columns: 26px 100px 1fr; gap: 16px;
          padding: 18px 0; border-bottom: 1px solid var(--grid-line); align-items: start;
        }
        .commit:last-child { border-bottom: none; }
        .commit-node { display: flex; justify-content: center; padding-top: 4px; }
        .commit-node span { width: 10px; height: 10px; border-radius: 50%; background: var(--rule); display: block; }
        .commit.head .commit-node span { background: var(--marker-deep); box-shadow: 0 0 0 4px rgba(217,158,43,0.18); }
        .commit.pending .commit-node span { background: transparent; border: 1.5px dashed var(--rule); }
        .commit-hash { font-family: 'JetBrains Mono', monospace; font-size: 13px; color: var(--ink-soft); padding-top: 1px; }
        .commit-body h3 { margin: 0 0 6px; font-size: 16px; color: var(--ink); font-weight: 600; display: flex; gap: 10px; align-items: center; }
        .head-badge { font-family: 'JetBrains Mono', monospace; font-size: 10.5px; background: var(--ink); color: var(--paper); padding: 2px 7px; border-radius: 3px; }
        .commit-body p { margin: 0; font-size: 14.5px; line-height: 1.6; color: var(--text); }
        .commit.pending .commit-body h3, .commit.pending .commit-body p { color: var(--ink-soft); }

        /* PROJECTS */
        .projects-grid { display: flex; flex-direction: column; gap: 18px; }
        .browser-card { border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; background: var(--white); }
        .browser-bar { display: flex; align-items: center; gap: 8px; padding: 10px 12px; background: #F1ECDD; border-bottom: 1px solid var(--rule); }
        .browser-bar .dot { width: 8px; height: 8px; opacity: 0.55; }
        .browser-url {
          margin-left: 8px; font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--ink-soft);
          background: var(--white); border: 1px solid var(--grid-line); border-radius: 4px; padding: 3px 10px; flex: 1;
        }
        .browser-body { padding: 20px 22px 24px; }
        .browser-body .top-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; gap: 12px; }
        .browser-body h3 { font-family: 'JetBrains Mono', monospace; margin: 0; font-size: 17px; color: var(--ink); }
        .project-tag {
          font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: var(--marker-deep);
          border: 1px solid var(--marker-deep); padding: 3px 8px; border-radius: 3px; white-space: nowrap;
        }
        .browser-body p { margin: 0; font-size: 15px; line-height: 1.62; color: var(--text); }

        /* CONTACT — terminal */
        .terminal { background: var(--editor-bg); border-radius: 10px; overflow: hidden; box-shadow: 0 24px 60px -24px rgba(22, 33, 58, 0.5); }
        .terminal-bar { display: flex; align-items: center; gap: 8px; padding: 12px 14px; background: #101a30; }
        .terminal-title { margin-left: 8px; font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #8FA3C9; }
        .terminal-body { padding: 26px 24px 30px; font-family: 'JetBrains Mono', monospace; font-size: 14.5px; line-height: 2; }
        .prompt { color: #6FE89A; }
        .cmd { color: var(--code-fg); }
        .out { color: #8FA3C9; padding-left: 18px; }
        .out a { color: var(--marker); text-decoration: none; }
        .out a:hover { text-decoration: underline; }
        .term-caret {
          display: inline-block; width: 8px; height: 16px; background: var(--marker);
          margin-left: 4px; transform: translateY(3px); animation: blink 1s step-end infinite;
        }

        .copy-btn {
          margin-top: 22px; font-family: 'JetBrains Mono', monospace; font-size: 13px; background: var(--marker);
          color: #3A2E0C; border: none; padding: 10px 18px; border-radius: 4px; cursor: pointer; font-weight: 700;
        }
        .copy-btn:hover { background: var(--marker-deep); color: #fff; }

        /* FOOTER */
        footer {
          margin-top: 100px; background: var(--ink); padding: 12px 32px; display: flex;
          justify-content: space-between; font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #B9C6DE;
        }
        @media (max-width: 560px) {
          footer { font-size: 10.5px; padding: 12px 18px; }
          .commit { grid-template-columns: 20px 76px 1fr; gap: 10px; }
        }
      `}</style>

      <nav className="nav">
        <div className="nav-logo mono">
          Ariet<span>.jsx</span>
        </div>
        <div className="nav-links">
          <a href="#about">о себе</a>
          <a href="#skills">навыки</a>
          <a href="#journey">путь</a>
          <a href="#projects">проекты</a>
          <a href="#contact">контакты</a>
        </div>
      </nav>

      <div className="wrap">
        {/* HERO */}
        <div className="hero">
          <Reveal>
            <p className="hero-tag">портфолио · в процессе обучения</p>
            <h1 className="name">Привет, я Ariet</h1>
            <p className="hero-lede">
              Учусь на разработчика. Прямо сейчас разбираюсь с{" "}
              <span className="mark">React</span> и собираю первые проекты —
              страница растёт вместе со мной.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-fill">Написать мне</a>
              <a href="#projects" className="btn btn-line">Смотреть проекты</a>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="editor">
              <div className="editor-bar">
                <span className="dot" style={{ background: "#E86F6F" }} />
                <span className="dot" style={{ background: "#E8C56F" }} />
                <span className="dot" style={{ background: "#6FE89A" }} />
                <span className="editor-file">ariet.js</span>
              </div>
              <div className="editor-body">
                <TypedCode lines={BIO_LINES} />
              </div>
            </div>
          </Reveal>
        </div>

        {/* ABOUT */}
        <section id="about">
          <Reveal>
            <div className="section-head">
              <span className="idx mono">§1</span>
              <h2>Обо мне</h2>
            </div>
            <div className="about-grid">
              <p className="about-text">
                Меня зовут Ariet. Сейчас я учусь на разработчика — прохожу
                путь от вёрстки до JavaScript и React. Мне нравится
                разбираться, как всё устроено внутри, и постепенно превращать
                выученное в рабочие проекты.
              </p>
              <div className="sticky-note">
                <strong>заметка на память</strong>
                Прогресс важнее скорости. Каждый маленький проект — это шаг
                вперёд.
              </div>
            </div>
          </Reveal>
        </section>

        {/* SKILLS */}
        <section id="skills">
          <Reveal>
            <div className="section-head">
              <span className="idx mono">§2</span>
              <h2>Навыки</h2>
            </div>
            <div className="skills-editor">
              {SKILLS.map((s, i) => (
                <div className="code-line skill-row" key={s.key}>
                  <span style={{ display: "flex" }}>
                    <span className="ln">{i + 1}</span>
                    <span className="code-text">
                      <span className="tok-prop">{s.key}</span>
                      {": "}
                      <span className="tok-str">'{s.value}'</span>
                      {s.current && <span className="skill-current">// сейчас учу</span>}
                    </span>
                  </span>
                  <span className="skill-bars">
                    {[0, 1, 2].map((n) => (
                      <span key={n} className={n < s.level ? "on" : ""} />
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* JOURNEY */}
        <section id="journey">
          <Reveal>
            <div className="section-head">
              <span className="idx mono">§3</span>
              <h2>Путь обучения</h2>
            </div>
            <div className="git-log">
              {COMMITS.map((c) => (
                <div
                  className={"commit" + (c.head ? " head" : "") + (c.pending ? " pending" : "")}
                  key={c.hash}
                >
                  <div className="commit-node"><span /></div>
                  <div className="commit-hash mono">{c.hash}</div>
                  <div className="commit-body">
                    <h3>
                      {c.title}
                      {c.head && <span className="head-badge">HEAD</span>}
                    </h3>
                    <p>{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <Reveal>
            <div className="section-head">
              <span className="idx mono">§4</span>
              <h2>Проекты</h2>
            </div>
            <div className="projects-grid">
              {PROJECTS.map((p) => (
                <div className="browser-card" key={p.title}>
                  <div className="browser-bar">
                    <span className="dot" style={{ background: "#E86F6F" }} />
                    <span className="dot" style={{ background: "#E8C56F" }} />
                    <span className="dot" style={{ background: "#6FE89A" }} />
                    <span className="browser-url">{p.url}</span>
                  </div>
                  <div className="browser-body">
                    <div className="top-row">
                      <h3>{p.title}</h3>
                      <span className="project-tag">{p.tag}</span>
                    </div>
                    <p>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <Reveal>
            <div className="section-head">
              <span className="idx mono">§5</span>
              <h2>Связаться</h2>
            </div>
            <div className="terminal">
              <div className="terminal-bar">
                <span className="dot" style={{ background: "#E86F6F" }} />
                <span className="dot" style={{ background: "#E8C56F" }} />
                <span className="dot" style={{ background: "#6FE89A" }} />
                <span className="terminal-title">zsh — contact</span>
              </div>
              <div className="terminal-body">
                <div><span className="prompt">ariet@dev</span><span className="cmd"> ~ % whoami</span></div>
                <div className="out">Ariet — учусь на разработчика</div>
                <div><span className="prompt">ariet@dev</span><span className="cmd"> ~ % contact --phone</span></div>
                <div className="out"><a href="tel:+996708406088">+996 708 406 088</a></div>
                <div><span className="prompt">ariet@dev</span><span className="cmd"> ~ % contact --telegram</span></div>
                <div className="out">
                  <a href="https://t.me/+996708406088" target="_blank" rel="noreferrer">открыть telegram</a>
                </div>
                <div>
                  <span className="prompt">ariet@dev</span>
                  <span className="cmd"> ~ %</span>
                  <span className="term-caret" />
                </div>
                <button
                  className="copy-btn"
                  onClick={() => {
                    navigator.clipboard?.writeText("+996708406088");
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1800);
                  }}
                >
                  {copied ? "скопировано ✓" : "cp номер в буфер"}
                </button>
              </div>
            </div>
          </Reveal>
        </section>
      </div>

      <footer>
        <span>Ariet.jsx · UTF-8</span>
        <span>main · обновляется по мере учёбы</span>
      </footer>
    </div>
  );
} 