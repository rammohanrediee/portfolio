import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";
import { CVLENS } from "../../constants/portfolio";

export const CVLens = () => {
  const [active, setActive] = useState(null); // requirement id

  const activeReq = CVLENS.requirements.find((r) => r.id === active) || null;
  const matchLine = activeReq ? activeReq.matchLine : null;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      {/* requirements */}
      <div className="lg:col-span-2">
        <span className="font-mono-code text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
          Job requirements
        </span>
        <ul className="mt-3 space-y-2">
          {CVLENS.requirements.map((req) => {
            const on = active === req.id;
            return (
              <li key={req.id}>
                <button
                  type="button"
                  data-testid={`cvlens-req-item-${req.id}`}
                  onClick={() => setActive(on ? null : req.id)}
                  className={`group flex w-full items-center justify-between gap-3 rounded-md border px-4 py-3 text-left transition-colors ${
                    on
                      ? "border-[var(--red)] bg-[var(--red-soft)]"
                      : "border-[var(--rule)] bg-[var(--card)] hover:border-[var(--rule-strong)]"
                  }`}
                >
                  <span className="text-sm leading-snug text-[var(--text)]">{req.label}</span>
                  <ArrowRight
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      on ? "translate-x-0 text-[var(--red)]" : "-translate-x-1 text-[var(--muted)] group-hover:translate-x-0"
                    }`}
                    strokeWidth={1.75}
                  />
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 font-mono-code text-[11px] italic text-[var(--muted)]">
          click a requirement to find its evidence →
        </p>
      </div>

      {/* resume */}
      <div className="lg:col-span-3">
        <div className="mb-2 flex items-center gap-2">
          <FileText className="h-4 w-4 text-[var(--red)]" strokeWidth={1.75} />
          <span className="font-mono-code text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
            résumé.pdf
          </span>
        </div>
        <div
          data-testid="cvlens-resume-container"
          className="relative rounded-lg border border-[var(--rule)] bg-[var(--card)] p-5"
          style={{ boxShadow: "var(--shadow)" }}
        >
          {CVLENS.resume.map((row) => {
            const matched = matchLine === row.line;
            if (row.head) {
              return (
                <p key={row.line} className="font-serif-display text-lg font-medium text-[var(--text)]">
                  {row.text}
                </p>
              );
            }
            if (row.small) {
              return (
                <p
                  key={row.line}
                  className="mt-3 font-mono-code text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]"
                >
                  {row.text}
                </p>
              );
            }
            return (
              <div key={row.line} className="relative mt-1.5 flex items-start gap-2">
                <span className="mt-[3px] select-none font-mono-code text-[10px] text-[var(--muted)]">
                  ·
                </span>
                <p
                  className="relative text-sm leading-relaxed transition-colors duration-300"
                  style={{
                    color: matched ? "var(--text)" : "var(--text-2)",
                    backgroundImage: matched
                      ? "linear-gradient(transparent 62%, var(--red-soft) 62%)"
                      : "none",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: matched ? "100% 100%" : "0% 100%",
                    animation: matched ? "marker-sweep 0.5s ease-out" : "none",
                  }}
                >
                  {row.text}
                  {matched && (
                    <motion.span
                      layoutId="cvlens-underline"
                      className="absolute -bottom-0.5 left-0 h-[2px] w-full"
                      style={{ background: "var(--red)" }}
                    />
                  )}
                </p>
              </div>
            );
          })}

          {/* margin annotation */}
          <AnimatePresence>
            {activeReq && (
              <motion.div
                key={activeReq.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                className="mt-4 flex items-center gap-2 border-t border-dashed border-[var(--red)] pt-3"
              >
                <span className="font-mono-code text-[10px] uppercase tracking-[0.14em] text-[var(--red)]">
                  [MATCH]
                </span>
                <span className="font-serif-display text-sm italic text-[var(--text)]">
                  {activeReq.annotation}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
