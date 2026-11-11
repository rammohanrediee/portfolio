import { useRef, useState } from "react";
import { LINKS } from "../../constants/portfolio";

const projects = [
  { id: "tal", name: "TAL", type: "Career workspace", view: "Career conversation",
    text: "Keep job applications and résumé evidence together as you work through your job search." },
  { id: "cvlens", name: "CVLens", type: "Document analysis", view: "Résumé upload",
    text: "Compare your résumé with a job description and see the exact lines behind each match." },
  { id: "peermock", name: "PeerMock", type: "Interview practice", view: "Practice workspace sign-in",
    text: "Book a mock interview slot. Practice with an AI mentor is still in the works." },
  { id: "orbitdesk", name: "OrbitDesk", type: "Support engineering", view: "Support request workspace",
    text: "Review a support answer beside the documents it came from, and see when a question needs a person instead." },
];

export function InterviewSection() {
  const dialog = useRef(null);
  const [selected, setSelected] = useState(null);
  const imagePath = p => '/projects/' + p.name.toLowerCase() + '.webp';
  return (
    <section id="work" aria-labelledby="work-title">
      <div className="work-heading"><h2 id="work-title" className="font-serif-display">Projects</h2></div>
      <div className="work-grid">
        {projects.map(p => (
          <article key={p.name} className="work-entry">
            <button className="project-print" aria-label={'Enlarge ' + p.name + ' screenshot'} onClick={() => {setSelected(p); dialog.current.showModal();}}>
              <img src={imagePath(p)} width="1200" height="800" alt={p.view} /><span aria-hidden="true">⤢</span>
            </button>
            <div className="project-heading"><h3 className="font-serif-display">{p.name}</h3><span>{p.type}</span></div>
            <p>{p.text}</p>
            <a className="source-link" href={LINKS.projectRepos[p.id]} target="_blank" rel="noopener noreferrer" aria-label={`View ${p.name} source on GitHub`}>View source ↗</a>
          </article>
        ))}
      </div>
      <dialog ref={dialog} aria-label={selected?.name + ' screenshot'}>
        {selected && <><div className="dialog-head"><strong>{selected.name}</strong><button onClick={() => dialog.current.close()}>Close ×</button></div>
          <img src={imagePath(selected)} alt={selected.view} /><p>{selected.view}</p></>}
      </dialog>
    </section>
  );
}
