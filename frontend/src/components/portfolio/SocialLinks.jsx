import { Github, Mail } from "lucide-react";
import { LINKS } from "../../constants/portfolio";

export function SocialLinks({ className }) {
  return (
    <div className={className}>
      <a href={LINKS.github} aria-label="GitHub"><Github size={20} /></a>
      <a href={LINKS.x} aria-label="X">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.9 2h3.3l-7.2 8.2L23.5 22h-6.7l-5.2-6.8L5.7 22H2.4l7.7-8.8L1.9 2h6.9l4.7 6.2L18.9 2ZM17.7 20h1.8L7.8 3.9H5.9L17.7 20Z" />
        </svg>
      </a>
      <a href={LINKS.email} aria-label="Email Ram"><Mail size={20} /></a>
    </div>
  );
}
