import { MapPin, Code2, Heart, ClipboardList, Users, Puzzle, Sprout, GraduationCap, Telescope } from "lucide-react";
import portrait from "../../assets/ram-mohan-reddy.webp";
import { PROFILE } from "../../constants/portfolio";
import "./About.css";

const facts = [
  [MapPin, "Location", "Nandyala, India"],
  [Code2, "Languages", "Python · SQL · JavaScript"],
  [Heart, "Interests", "Dev · AI · Gym · Sports"],
];
const approach = [
  [ClipboardList, "Planning First", "I believe in thorough planning and design before coding. Understanding requirements and mapping out solutions leads to better outcomes."],
  [Users, "Working Together", "Collaboration and teamwork are at the heart of great software. I value open communication and shared knowledge to achieve common goals."],
  [Puzzle, "Finding Solutions", "I create versatile solutions that work across platforms and environments. I build adaptive systems that function anywhere, anytime."],
];
const motivations = [
  [Sprout, "The Beginning", "In first grade, I already knew I wanted to be an “IT man.” While other kids dreamed of becoming astronauts or firefighters, I dreamed of working with computers."],
  [GraduationCap, "School Days", "Throughout school, I wanted to understand how computers worked. The more I learned, the more curious I became."],
  [Telescope, "The Fascination", "I was fascinated by how one click in an app could launch an entirely different program. I wanted to know what happened between that click and the new window opening. That curiosity still drives my work today."],
];
export function About() {
  return (
    <section id="about" className="about-board" aria-labelledby="about-title">
      <h1 id="about-title">About Me</h1>
      <header className="about-person">
        <span className="about-portrait">
          <img src={portrait} width="1065" height="1400" alt={PROFILE.name} />
        </span>
        <div>
          <h2>Hey, I’m {PROFILE.name}</h2>
          <p>{PROFILE.bio}</p>
          <p className="about-education">B.Tech in AI &amp; Data Science · KL University, 2022–2026</p>
        </div>
      </header>
      <div className="about-content">
        <dl className="about-facts">{facts.map(([Icon, title, value]) => (
          <div className="about-panel" key={title}>
            <dt><Icon aria-hidden="true" />{title}</dt>
            <dd>{value}</dd>
          </div>
        ))}</dl>
        <h3 className="about-heading">My Approach</h3>
        <div className="about-methods">{approach.map(([Icon, title, text]) => (
          <article className="about-panel" key={title}><span className="about-icon"><Icon aria-hidden="true" /></span><h4>{title}</h4><p>{text}</p></article>
        ))}</div>
        <h3 className="about-heading">What Drives Me</h3>
        <div className="about-inset about-drives">
          <div className="about-stories">{motivations.map(([Icon, title, text]) => (
            <article className="about-panel" key={title}><span className="about-icon"><Icon aria-hidden="true" /></span><div><h4>{title}</h4><p>{text}</p></div></article>
          ))}</div>
          <aside className="about-panel about-quote">
            <figure>
              <blockquote>“The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.”</blockquote>
              <figcaption>— Steve Jobs</figcaption>
            </figure>
          </aside>
        </div>
      </div>
    </section>
  );
}
