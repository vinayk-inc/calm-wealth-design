import { Mail, MapPin, Linkedin, Instagram } from "lucide-react";

const SiteFooter = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-start items-center justify-between gap-8 text-sm text-foreground/80">
          <div className="flex flex-col gap-3 text-center md:text-left">
            <a
              href="mailto:vinayk.inc@gmail.com"
              className="inline-flex items-center gap-2.5 text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              <Mail className="h-4 w-4 text-primary" />
              <span>vinayk.inc@gmail.com</span>
            </a>
            <div className="inline-flex items-center gap-2.5 text-foreground/80 justify-center md:justify-start">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Thane, Maharashtra, India</span>
            </div>
            <a
              href="https://www.linkedin.com/in/vinay-karnuk/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              <Linkedin className="h-4 w-4 text-primary" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://www.instagram.com/vinay.inc/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              <Instagram className="h-4 w-4 text-primary" />
              <span>Instagram</span>
            </a>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Mutual fund investments are subject to market risks.
          </p>
          <p className="text-xs text-muted-foreground text-center md:text-right">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
