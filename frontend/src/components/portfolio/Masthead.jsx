import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { PROFILE } from "../../constants/portfolio";
import { SocialLinks } from "./SocialLinks";
import { MascotMark } from "./MascotMark";
import "./Masthead.css";

const introduction = `I’m ${PROFILE.name}`;
const headlines = [introduction, "Python Backend Developer", "Applied AI Engineer"];

function IntroTitle() {
  const reducedMotion = useReducedMotion();
  const [text, setText] = useState(introduction);

  useEffect(() => {
    if (reducedMotion) return;
    let index = 0;
    let length = introduction.length;
    let deleting = true;
    setText(introduction);
    let timer = setTimeout(step, 1800);

    function step() {
      const phrase = headlines[index];
      length += deleting ? -1 : 1;
      setText(phrase.slice(0, length));

      let delay = deleting ? 35 : 65;
      if (length === 0) {
        index = (index + 1) % headlines.length;
        deleting = false;
        delay = 200;
      } else if (length === phrase.length) {
        deleting = true;
        delay = 1800;
      }
      timer = setTimeout(step, delay);
    }
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <h1 className="intro-title text-3xl sm:text-4xl lg:text-5xl" data-testid="masthead-name" aria-label={`${PROFILE.name}, ${PROFILE.role}`}>
      {headlines.map(phrase => (
        <span key={phrase} className="intro-measure" aria-hidden="true">{phrase}<i className="intro-caret" /></span>
      ))}
      <span aria-hidden="true">{reducedMotion ? introduction : text}<i className="intro-caret" /></span>
    </h1>
  );
}

export function Masthead() {
  const [logoPlayCount, setLogoPlayCount] = useState(0);

  return (
    <header className="intro-page">
      <div className="intro-copy">
        <button className="intro-mark-button" type="button" onClick={() => setLogoPlayCount(n => n + 1)} aria-label="Play mascot eye animation">
          <MascotMark key={logoPlayCount} className="intro-mark" playing={logoPlayCount > 0} />
        </button>
        <IntroTitle />
        <p>I build full-stack web applications in Nandyala, India. Using JavaScript, Python, React, and other technologies, I turn complex ideas into modern web apps with clean, user-friendly experiences.</p>
        <p>I like being able to check an answer for myself. That’s why I build tools that show where their answers come from.</p>
        <a className="journey-link" href="#about">Explore my journey <span aria-hidden="true">→</span></a>
        <SocialLinks className="intro-social" />
      </div>
    </header>
  );
}
