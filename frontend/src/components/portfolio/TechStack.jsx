import { FileText, ScanText } from "lucide-react";

const groups = [
  ["Frontend", [["React", "UI component library"], ["Next.js", "React web framework"], ["JavaScript", "Language for interactive websites"]]],
  ["Backend", [["Python", "General-purpose programming language"], ["FastAPI", "Python API framework"], ["PostgreSQL", "Relational database"]]],
  ["AI & documents", [["LangGraph", "AI workflow library"], ["PyMuPDF", "PDF processing library"], ["Tesseract", "Text recognition engine"]]],
  ["Infrastructure", [["Docker", "Container platform"], ["Redis", "In-memory data store"], ["Celery", "Distributed task queue"]]],
  ["Development & testing", [["Git", "Version control system"], ["pytest", "Python testing framework"], ["Vite", "Frontend build tool"]]],
];

const logos = import.meta.glob("../../assets/tech/*.svg", { eager: true, import: "default" });

function TechIcon({ name }) {
  if (name === "PyMuPDF") return <FileText size={18} aria-hidden="true" />;
  if (name === "Tesseract") return <ScanText size={18} aria-hidden="true" />;
  const slug = name.toLowerCase().replace(".", "dot");
  const url = logos[`../../assets/tech/${slug}.svg`];
  return <span className="tech-logo" aria-hidden="true" style={{ maskImage: `url("${url}")` }} />;
}

export function TechStack() {
  return (
    <section className="tech-stack" aria-labelledby="tech-heading">
      <div className="tech-panel">
        <h2 id="tech-heading">Tech stack</h2>
        <div className="about-skill-grid">
          {groups.map(([category, technologies]) => (
            <div key={category}>
              <h3>{category}</h3>
              <ul>{technologies.map(([name, description]) => (
                <li key={name} tabIndex={0} aria-describedby={`tip-${name}`}>
                  <TechIcon name={name} />{name}
                  <span className="tech-tooltip" role="tooltip" id={`tip-${name}`}>{description}</span>
                </li>
              ))}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
