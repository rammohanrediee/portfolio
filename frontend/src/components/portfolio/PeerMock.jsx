import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, RotateCcw, Lock, Check, X, Database } from "lucide-react";
import { PEERMOCK } from "../../constants/portfolio";

// phase: idle -> inflight -> locking -> resolved
const RequestCard = ({ req, phase, outcome, testid }) => {
  const confirmed = outcome === "confirmed";
  const conflict = outcome === "conflict";
  const borderColor = confirmed
    ? "var(--red)"
    : conflict
      ? "var(--rule-strong)"
      : "var(--rule)";

  return (
    <motion.div
      data-testid={testid}
      animate={{
        y: phase === "inflight" ? -6 : 0,
        opacity: conflict ? 0.72 : 1,
        x: conflict && phase === "resolved" ? [0, -6, 6, -4, 0] : 0,
      }}
      transition={{ duration: conflict ? 0.4 : 0.3 }}
      className="rounded-lg border bg-[var(--card)] p-5"
      style={{ borderColor, boxShadow: "var(--shadow)" }}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono-code text-xs uppercase tracking-[0.16em] text-[var(--text-2)]">
          Request {req.id}
        </span>
        <span className="font-mono-code text-[10px] text-[var(--muted)]">{req.sentAt}</span>
      </div>
      <p className="mt-3 font-serif-display text-lg text-[var(--text)]">{req.user}</p>
      <p className="font-mono-code text-[11px] text-[var(--muted)]">
        PATCH /slots/A17 · If-Match: {req.version}
      </p>

      <div className="mt-4 h-[1px] w-full bg-[var(--rule)]" />

      <div className="mt-4 h-10">
        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.span
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-mono-code text-xs text-[var(--muted)]"
            >
              queued · awaiting dispatch
            </motion.span>
          )}
          {phase === "inflight" && (
            <motion.span
              key="inflight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 font-mono-code text-xs text-[var(--text-2)]"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="inline-block"
              >
                <Lock className="h-3.5 w-3.5" />
              </motion.span>
              acquiring row lock…
            </motion.span>
          )}
          {phase === "resolved" && confirmed && (
            <motion.div
              key="ok"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--red)] text-[#faf8f3]">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <span className="font-mono-code text-xs font-medium text-[var(--red)]">
                200 OK · slot reserved → rev 9
              </span>
            </motion.div>
          )}
          {phase === "resolved" && conflict && (
            <motion.div
              key="conflict"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--rule-strong)] text-[var(--text-2)]">
                <X className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <span className="font-mono-code text-xs font-medium text-[var(--text-2)]">
                409 Conflict · version stale, rolled back
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const PeerMock = () => {
  const [phase, setPhase] = useState("idle"); // idle | inflight | resolved
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const sendBoth = () => {
    timers.current.forEach(clearTimeout);
    setPhase("inflight");
    timers.current = [setTimeout(() => setPhase("resolved"), 1300)];
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    setPhase("idle");
  };

  return (
    <div>
      <div className="flex items-center gap-2 border-b border-[var(--rule)] pb-3">
        <Database className="h-4 w-4 text-[var(--red)]" strokeWidth={1.75} />
        <span className="font-mono-code text-xs uppercase tracking-[0.14em] text-[var(--text-2)]">
          {PEERMOCK.slot}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <RequestCard
          req={PEERMOCK.requestA}
          phase={phase}
          outcome={phase === "resolved" ? "confirmed" : null}
          testid="peermock-request-a-card"
        />
        <RequestCard
          req={PEERMOCK.requestB}
          phase={phase}
          outcome={phase === "resolved" ? "conflict" : null}
          testid="peermock-request-b-card"
        />
      </div>

      {/* shared row lock indicator */}
      <div className="mt-5 flex items-center gap-3">
        <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-[var(--rule)]">
          <motion.div
            className="absolute inset-y-0 left-0 bg-[var(--red)]"
            animate={{ width: phase === "idle" ? "0%" : phase === "inflight" ? "60%" : "100%" }}
            transition={{ duration: phase === "inflight" ? 1.2 : 0.3 }}
          />
        </div>
        <span className="font-mono-code text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
          {phase === "idle" ? "row unlocked" : phase === "inflight" ? "contending…" : "committed by A"}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          data-testid="peermock-send-both-button"
          onClick={sendBoth}
          disabled={phase === "inflight"}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--red)] px-5 py-2.5 font-mono-code text-xs uppercase tracking-[0.14em] text-[#faf8f3] transition-transform hover:scale-[1.03] disabled:opacity-50"
        >
          <Send className="h-3.5 w-3.5" strokeWidth={2} />
          Send both requests
        </button>
        <button
          type="button"
          data-testid="peermock-reset-button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--rule-strong)] px-5 py-2.5 font-mono-code text-xs uppercase tracking-[0.14em] text-[var(--text-2)] transition-colors hover:border-[var(--text)]"
        >
          <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} />
          Reset
        </button>
      </div>

      <p className="mt-4 font-mono-code text-xs italic text-[var(--red)]">
        [ERR-409] optimistic concurrency: the stale writer loses, the slot stays consistent.
      </p>
    </div>
  );
};
