import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Zap, Crosshair, AlertTriangle, CheckCircle2 } from "lucide-react";
import { ORBITDESK } from "../../constants/portfolio";

const Stat = ({ label, value, tone }) => (
  <div className="flex flex-col">
    <span className="font-mono-code text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
      {label}
    </span>
    <span
      className="font-serif-display text-xl font-medium"
      style={{ color: tone === "good" ? "var(--red)" : tone === "bad" ? "var(--text)" : "var(--text)" }}
    >
      {value}
    </span>
  </div>
);

export const OrbitDesk = () => {
  const [mode, setMode] = useState("fixed");
  const [query, setQuery] = useState("");
  const data = mode === "fixed" ? ORBITDESK.fixed : ORBITDESK.first;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data.results;
    return data.results.filter(
      (r) => r.title.toLowerCase().includes(q) || r.snippet.toLowerCase().includes(q),
    );
  }, [query, data.results]);

  return (
    <div>
      {/* tabs */}
      <div className="flex gap-2">
        <button
          type="button"
          data-testid="orbitdesk-tab-first-attempt"
          onClick={() => setMode("first")}
          className={`rounded-full border px-4 py-1.5 font-mono-code text-[11px] uppercase tracking-[0.14em] transition-colors ${
            mode === "first"
              ? "border-[var(--text)] bg-[var(--text)] text-[var(--bg)]"
              : "border-[var(--rule-strong)] text-[var(--text-2)] hover:border-[var(--text)]"
          }`}
        >
          First attempt
        </button>
        <button
          type="button"
          data-testid="orbitdesk-tab-after-fix"
          onClick={() => setMode("fixed")}
          className={`rounded-full border px-4 py-1.5 font-mono-code text-[11px] uppercase tracking-[0.14em] transition-colors ${
            mode === "fixed"
              ? "border-[var(--red)] bg-[var(--red)] text-[#faf8f3]"
              : "border-[var(--rule-strong)] text-[var(--text-2)] hover:border-[var(--red)]"
          }`}
        >
          After the fix
        </button>
      </div>

      {/* query input */}
      <div className="mt-5 flex items-center gap-3 border-b border-[var(--rule-strong)] pb-2">
        <Search className="h-4 w-4 text-[var(--muted)]" strokeWidth={1.75} />
        <input
          data-testid="orbitdesk-query-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={ORBITDESK.query}
          className="w-full bg-transparent font-mono-code text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none"
        />
      </div>

      {/* result panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          data-testid="orbitdesk-results-view"
          className="mt-6"
        >
          <div className="flex flex-wrap items-center gap-6 border-b border-[var(--rule)] pb-4">
            <Stat label="Latency" value={data.latency} tone={data.tone} />
            <Stat label="Precision" value={data.precision} tone={data.tone} />
            <Stat label="Recall" value={data.recall} tone={data.tone} />
            <div className="ml-auto flex items-center gap-2">
              {data.tone === "good" ? (
                <CheckCircle2 className="h-4 w-4 text-[var(--red)]" strokeWidth={1.75} />
              ) : (
                <AlertTriangle className="h-4 w-4 text-[var(--text)]" strokeWidth={1.75} />
              )}
              <span className="font-mono-code text-xs uppercase tracking-[0.14em] text-[var(--text-2)]">
                {data.sub}
              </span>
            </div>
          </div>

          <p className="mt-3 font-mono-code text-xs italic text-[var(--red)]">{data.note}</p>

          <ul className="mt-4 space-y-3">
            {results.map((r, i) => (
              <motion.li
                key={r.title}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
                className="rounded-md border border-[var(--rule)] bg-[var(--card)] p-4"
                style={{ boxShadow: "var(--shadow)" }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono-code text-sm text-[var(--text)]">{r.title}</span>
                  <span className="font-mono-code text-xs text-[var(--muted)]">
                    {r.score.toFixed(2)}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-2)]">{r.snippet}</p>
                {r.flag && (
                  <span
                    className={`mt-2 inline-flex items-center gap-1.5 font-mono-code text-[10px] uppercase tracking-[0.14em] ${
                      r.bad ? "text-[var(--red)]" : "text-[var(--text-2)]"
                    }`}
                  >
                    {r.bad ? <AlertTriangle className="h-3 w-3" /> : <Crosshair className="h-3 w-3" />}
                    {r.flag}
                  </span>
                )}
              </motion.li>
            ))}
            {results.length === 0 && (
              <li className="py-6 text-center font-mono-code text-xs text-[var(--muted)]">
                no spans match “{query}”
              </li>
            )}
          </ul>

          <div className="mt-4 flex items-center gap-2 text-[var(--muted)]">
            <Zap className="h-3.5 w-3.5" strokeWidth={1.75} />
            <span className="font-mono-code text-[10px] uppercase tracking-[0.16em]">
              [FIG 1.{mode === "fixed" ? "2" : "1"}] retrieval trace
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
