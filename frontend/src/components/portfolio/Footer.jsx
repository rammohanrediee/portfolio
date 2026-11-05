import { ArrowUp } from "lucide-react";
import { LINKS, PROFILE } from "../../constants/portfolio";
import { SocialLinks } from "./SocialLinks";
import "./Footer.css";

export const Footer = () => (
  <footer id="contact" className="site-footer">
    <div className="site-footer-inner">
      <div className="site-footer-top">
        <div className="site-footer-identity">
          <h2>{PROFILE.name}</h2>
          <p>{PROFILE.role}</p>
        </div>
        <nav aria-label="Footer navigation">
          <a href="#top">Home</a>
          <a href="#about">About</a>
          <a href="#work">Projects</a>
          <a href={LINKS.email}>Contact</a>
        </nav>
        <SocialLinks className="site-footer-social" />
      </div>
      <div className="site-footer-meta">
        <p>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
        <a href={LINKS.email}>{LINKS.email.slice(7)}</a>
        <p>Made in Nandyala, India</p>
      </div>
    </div>
    <a className="site-footer-up" href="#top" aria-label="Back to top"><ArrowUp size={21} strokeWidth={1.4} /></a>
  </footer>
);
