import { useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

/**
 * A custom-drawn drafting lamp that hangs from the masthead.
 * Tug (drag) or click the brass pull-bead to toggle paper / night reading.
 */
export const HangingLamp = () => {
  const { isNight, toggleTheme } = useTheme();
  const y = useMotionValue(0);
  const didPull = useRef(false);

  // the pull chain visibly extends from the shade as you tug the bead
  const cordLength = useTransform(y, [0, 46], [104, 150]);
  const beadCy = useTransform(y, [0, 46], [108, 154]);

  const release = () => {
    const pulled = didPull.current || y.get() > 22;
    if (pulled) toggleTheme();
    didPull.current = false;
    animate(y, 0, { type: "spring", stiffness: 300, damping: 15 });
  };

  return (
    <div
      className="relative select-none"
      style={{ width: 128, height: 232 }}
      data-testid="hanging-lamp"
      aria-label="Toggle reading light"
    >
      <motion.svg
        viewBox="0 0 128 232"
        width="128"
        height="232"
        fill="none"
        initial={{ rotate: -1.4 }}
        animate={{ rotate: [-1.4, 1.4, -1.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "64px 0px", overflow: "visible" }}
      >
        {/* one thin continuous cord from the top edge down to the shade */}
        <line x1="64" y1="0" x2="64" y2="57" stroke="var(--rule-strong)" strokeWidth="1.25" />

        {/* warm glow when the lamp is "on" (night reading) */}
        <motion.ellipse
          cx="64"
          cy="72"
          rx="46"
          ry="36"
          fill="var(--red)"
          animate={{ opacity: isNight ? 0.16 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ filter: "blur(14px)" }}
        />

        {/* simple domed shade (~32px wide, x48–x80) */}
        <path
          d="M48 78 Q48 56 64 56 Q80 56 80 78 Z"
          fill="var(--card)"
          stroke="var(--text)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* rim + bulb */}
        <ellipse cx="64" cy="78" rx="16" ry="3.2" fill="var(--bg-2)" stroke="var(--text)" strokeWidth="1.6" />
        <motion.circle
          cx="64"
          cy="80"
          r="4.5"
          fill="var(--red)"
          animate={{ opacity: isNight ? 1 : 0.25 }}
          transition={{ duration: 0.5 }}
        />

        {/* short pull chain connected to the shade rim, bead at the end */}
        <motion.line
          x1="72"
          y1="79"
          x2="72"
          y2={cordLength}
          stroke="var(--rule-strong)"
          strokeWidth="1.25"
          strokeDasharray="2 3"
        />
        <motion.circle cx="72" cy={beadCy} r="4.5" fill="var(--rule-strong)" />
      </motion.svg>

      {/* draggable brass bead hit-area (generous target over the bead) */}
      <motion.button
        type="button"
        data-testid="hanging-lamp-pull"
        onTap={() => {
          if (!didPull.current) toggleTheme();
        }}
        onPointerDown={() => (didPull.current = false)}
        drag="y"
        dragConstraints={{ top: 0, bottom: 46 }}
        dragElastic={0.2}
        style={{ y, top: 84, left: 48 }}
        onDrag={(_, info) => {
          if (info.offset.y > 18) didPull.current = true;
        }}
        onDragEnd={release}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.92 }}
        className="absolute h-12 w-12 cursor-grab rounded-full active:cursor-grabbing"
        aria-label={isNight ? "Switch to paper mode" : "Switch to night reading mode"}
      />
    </div>
  );
};
