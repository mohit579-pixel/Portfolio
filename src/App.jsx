import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import Arch from './components/Arch';
import CommandMenu from './components/CommandMenu';
import Cursor from './components/Cursor';
import EngineCore from './components/EngineCore';
import ExperienceLog from './components/ExperienceLog';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Progress from './components/Progress';
import ProjectGrid from './components/ProjectGrid';
import ProjectPage from './components/ProjectPage';
import Section from './components/Section';
import Toolbox from './components/Toolbox';
import { EMAIL, LINKS, RESUME_URL } from './data/links';
import { ABOUT, EDUCATION, SECTIONS } from './data/profile';
import { PROJECTS } from './data/projects';
import { useRouter } from './lib/routing';
import { sfx } from './lib/sfx';

const THEME_COLOR = { dark: '#0b0b0c', light: '#F5F5F2' };

export default function App() {
  const { projectId, openProject, goSection } = useRouter();
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sound, setSound] = useState(true);
  const copyTimer = useRef(null);

  useEffect(() => {
    const theme = dark ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
  }, [dark]);

  // Every button or link click makes a soft click sound.
  useEffect(() => {
    const onDown = (e) => {
      if (e.target.closest?.('button,a')) sfx.click();
    };
    window.addEventListener('pointerdown', onDown);
    return () => window.removeEventListener('pointerdown', onDown);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setMenuOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const copy = useCallback(() => {
    navigator.clipboard?.writeText(EMAIL).catch(() => {});
    setCopied(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 1500);
  }, []);

  const toggleSound = () => {
    const v = !sound;
    setSound(v);
    sfx.setEnabled(v);
    if (v) sfx.ok();
  };

  const menuItems = [
    { label: 'Go to Projects', hint: '01', run: () => goSection('projects') },
    { label: 'Go to Retrieval Engine', hint: '02', run: () => goSection('work') },
    { label: 'Go to Experience', hint: '03', run: () => goSection('log') },
    { label: 'Go to Toolbox', hint: '04', run: () => goSection('tools') },
    { label: 'Go to About', hint: '05', run: () => goSection('about') },
    { label: 'Go to Contact', hint: '06', run: () => goSection('contact') },
    ...PROJECTS.map((p) => ({ label: p.menuLabel, hint: p.id, run: () => openProject(p.id) })),
    { label: 'Copy email', hint: 'action', run: copy },
    { label: 'Download resume', hint: 'action', run: () => window.open(RESUME_URL, '_blank') },
    { label: 'Open GitHub', hint: 'link', run: () => window.open(LINKS.GitHub, '_blank') },
    { label: 'Open LinkedIn', hint: 'link', run: () => window.open(LINKS.LinkedIn, '_blank') },
    {
      label: 'Send an email',
      hint: 'action',
      run: () => (window.location.href = 'mailto:' + EMAIL),
    },
    {
      label: dark ? 'Switch to light theme' : 'Switch to dark theme',
      hint: 'action',
      run: () => setDark((d) => !d),
    },
  ];

  return (
    <>
      <Cursor />
      <Progress />
      {menuOpen && <CommandMenu items={menuItems} onClose={() => setMenuOpen(false)} />}
      <Header
        dark={dark}
        onToggleTheme={() => setDark(!dark)}
        sound={sound}
        onToggleSound={toggleSound}
        onOpenMenu={() => setMenuOpen(true)}
        onTop={() => goSection('top')}
      />
      {projectId && <ProjectPage id={projectId} />}
      <main id="top" className={projectId ? 'off' : undefined}>
        <Hero copied={copied} onCopy={copy} onSeeWork={() => goSection('projects')} />
        <Section id="projects" {...SECTIONS.projects}>
          <ProjectGrid />
        </Section>
        <Section id="work" {...SECTIONS.work}>
          <EngineCore />
          <Arch />
        </Section>
        <Section id="log" {...SECTIONS.log}>
          <ExperienceLog />
        </Section>
        <Section id="tools" {...SECTIONS.tools}>
          <Toolbox />
        </Section>
        <Section id="about" {...SECTIONS.about}>
          <div className="about" style={{ marginTop: '2rem' }}>
            <div>
              {ABOUT.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            <div className="card">
              {EDUCATION.map((e, n) => (
                <Fragment key={e.title}>
                  <b>{e.title}</b>
                  <p style={n === EDUCATION.length - 1 ? { marginBottom: 0 } : undefined}>
                    {e.lines.map((l, i) => (
                      <span key={l}>
                        {i > 0 && <br />}
                        {l}
                      </span>
                    ))}
                  </p>
                </Fragment>
              ))}
            </div>
          </div>
        </Section>
      </main>
      <Footer copied={copied} onCopy={copy} />
    </>
  );
}
