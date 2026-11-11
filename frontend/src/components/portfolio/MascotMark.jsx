export function MascotMark({ className = "", playing = false }) {
  return (
    <svg className={className} viewBox="0 0 256 256" aria-hidden="true" focusable="false">
      <image href="/ramu-mark-eye-base.png" width="256" height="256" />
      <g className="mascot-eye-details" fill="none" stroke="#321807" strokeWidth="4" strokeLinecap="round">
        <path d="M79 143 Q97 126 115 143" />
        <path d="M141 143 Q159 126 177 143" />
      </g>
      <g className={playing ? "mascot-pupils mascot-pupils--playing" : "mascot-pupils"} fill="#321807">
        <circle cx="98" cy="147" r="9" />
        <circle cx="158" cy="147" r="9" />
        <g fill="#fff">
          <circle cx="101" cy="143" r="2.5" />
          <circle cx="161" cy="143" r="2.5" />
        </g>
      </g>
    </svg>
  );
}
