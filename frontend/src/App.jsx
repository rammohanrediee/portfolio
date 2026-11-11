import { useState, useEffect, useLayoutEffect } from "react";
import { HangingLamp } from "./components/portfolio/HangingLamp";
import { Masthead } from "./components/portfolio/Masthead";
import "./App.css";
import { About } from "./components/portfolio/About";
import { ThemeProvider } from "./context/ThemeContext";
import { InterviewSection } from "./components/portfolio/InterviewSection";
import { TechStack } from "./components/portfolio/TechStack";
import { Footer } from "./components/portfolio/Footer";

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);
  const [introVisit, setIntroVisit] = useState(0);
  const isIntro = !hash || hash === "#top" || hash === "#intro";

  useEffect(() => {
    const navigate = () => setHash(window.location.hash);
    window.addEventListener("hashchange", navigate);
    return () => window.removeEventListener("hashchange", navigate);
  }, []);

  useLayoutEffect(() => {
    if (isIntro || hash === "#about") window.scrollTo({ top: 0, behavior: "instant" });
    else document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "instant" });
  }, [hash, isIntro, introVisit]);

  return (
    <ThemeProvider>
      <div id="top" className="page-shell">
        <nav className="folio-nav" aria-label="Portfolio">
          <a className="brand-link" href="#intro" onClick={() => setIntroVisit(n => n + 1)} aria-label="Ram Mohan Reddy K, intro">
            <img className="brand-mark" src="/ramu-mark.png" alt="" width="52" height="52" />
          </a>
          <div>
            <a href="#about" aria-current={hash === "#about" ? "location" : undefined}>About</a>
            <a href="#work" aria-current={hash === "#work" ? "location" : undefined}>Projects</a>
            <a href="#contact" aria-current={hash === "#contact" ? "location" : undefined}>Contact</a>
          </div>
        </nav>
        <main className="folio-main">
          <div className="folio-lamp"><HangingLamp /></div>
          {isIntro ? (
            <Masthead key={introVisit} />
          ) : (
            <>
              <About />
              <InterviewSection />
              <TechStack />
            </>
          )}
        </main>
      </div>
      {!isIntro && <Footer />}
    </ThemeProvider>
  );
}
