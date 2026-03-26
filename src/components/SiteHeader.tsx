import { useState, useEffect } from "react";
import MarketTicker from "./MarketTicker";

const navLinks = [
  { label: "About", href: "#positioning" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Tools", href: "#tools" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#cta" },
];

const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-10 md:h-12 border-b border-border/30">
          <MarketTicker />
        </div>
        <div className="flex items-center justify-between h-12 md:h-14">
        <a href="#" className="font-serif text-lg md:text-xl tracking-wide text-foreground">
          vinay.inc
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-foreground transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
          <span className={`block w-5 h-px bg-foreground transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-foreground transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-background/95 backdrop-blur-md border-b border-border px-6 pb-6 pt-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
