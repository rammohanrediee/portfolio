import { useRef, useState } from "react";

const projects = [
  { name: "TAL", type: "Career workspace", view: "Career conversation",
    text: "Track job applications and bring résumé evidence into the same workspace as your career conversations." },
  { name: "CVLens", type: "Document analysis", view: "Résumé upload",
    text: "Compare a résumé with a job description and trace each match back to the line that supports it." },
  { name: "PeerMock", type: "Interview practice", view: "Practice workspace sign-in",
    text: "Book a mock interview slot and practise with an AI mentor." },
  { name: "OrbitDesk", type: "Support engineering", view: "Support request workspace",
    text: "Find answers in support documentation, inspect the citations, and stop when the available evidence is too thin." },
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
