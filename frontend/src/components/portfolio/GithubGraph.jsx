import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Code2, ArrowUpRight } from "lucide-react";
import { LINKS } from "../../constants/portfolio";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const DOT_VARS = ["--dot0", "--dot1", "--dot2", "--dot3", "--dot4"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const GithubGraph = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let active = true;
    axios
      .get(`${API}/github/contributions`)
      .then((res) => {
        if (active) setData(res.data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const weeks = data?.weeks || [];

  // month labels: mark the week where a new month first appears
  const monthMarks = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const first = week.find(Boolean);
    if (!first) return;
    const m = new Date(first.date).getMonth();
    if (m !== lastMonth) {
      monthMarks.push({ wi, label: MONTHS[m] });
      lastMonth = m;
    }
  });

  return (
    <section
      data-testid="github-graph-container"
      className="relative z-10 mx-auto w-full max-w-[1180px] px-6 py-16 md:px-10"
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 font-mono-code text-sm text-[var(--text-2)]">
          <Code2 className="h-4 w-4 text-[var(--red)]" strokeWidth={1.75} />
          Open source
        </span>
        <a
          href={LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="github-profile-link"
          className="group inline-flex items-center gap-1 font-mono-code text-sm text-[var(--muted)] transition-colors hover:text-[var(--text)]"
        >
          GitHub profile
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      <div className="mt-6 flex items-baseline gap-4">
        <span
          data-testid="github-total-contributions"
          className="font-serif-display text-5xl font-medium tracking-tight text-[var(--text)] md:text-6xl"
        >
          {data ? data.total.toLocaleString() : "—"}
        </span>
        <span className="text-sm leading-tight text-[var(--muted)]">
          contributions on GitHub
          <br />
          in the last year
        </span>
      </div>

      {/* dot grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8 }}
        className="mt-8 overflow-x-auto pb-2"
      >
        <div className="flex gap-[5px]" style={{ minWidth: "640px" }}>
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[5px]">
              {Array.from({ length: 7 }).map((_, di) => {
                const day = week[di];
                const level = day ? day.level : 0;
                return (
                  <motion.span
                    key={di}
                    title={day ? `${day.count} on ${day.date}` : ""}
                    initial={{ opacity: 0, scale: 0.4 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: Math.min(wi * 0.006, 0.4) }}
                    whileHover={{ scale: 1.6 }}
                    className="h-[11px] w-[11px] rounded-full"
                    style={{ backgroundColor: `var(${DOT_VARS[level]})` }}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* month labels */}
        <div className="relative mt-3 h-4" style={{ minWidth: "640px" }}>
          {monthMarks.map((m) => (
            <span
              key={`${m.wi}-${m.label}`}
              className="absolute font-mono-code text-[11px] text-[var(--muted)]"
              style={{ left: `${m.wi * 16}px` }}
            >
              {m.label}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
