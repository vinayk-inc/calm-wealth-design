import { useState, useEffect } from "react";
import heroBg from "@/assets/image.jpeg";

const HeroSection = () => {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    const show = () => {
      setShowNotice(true);
      setTimeout(() => setShowNotice(false), 5000);
    };

    const initialTimer = setTimeout(() => {
      show();
      interval = setInterval(show, 10000);
    }, 2000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Availability popup notice */}
      <div
        className={`fixed bottom-6 right-6 z-50 max-w-xs bg-card border border-border/60 rounded-sm px-5 py-3.5 shadow-lg transition-all duration-500 ${
          showNotice
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <p className="text-xs md:text-sm text-muted-foreground tracking-wide leading-relaxed">
          Limited consultation availability this week —{" "}
          <span className="text-accent-foreground font-medium">4 slots remaining</span>
        </p>
        <button
          onClick={() => setShowNotice(false)}
          className="absolute top-1.5 right-2.5 text-muted-foreground hover:text-foreground text-xs"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-background/60" />

      <div className="relative z-10 section-container text-center py-32">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground animate-fade-up text-balance leading-tight">
          Thoughtful Investing.
          <br />
          Long-Term Wealth.
        </h1>

        <p className="mt-6 md:mt-8 text-base md:text-lg text-muted-foreground max-w-xl mx-auto animate-fade-up-delay leading-relaxed">
          Mutual fund distributor helping individuals and families invest with clarity and confidence.
        </p>

        {/* Trust Badge */}
        <div className="mt-8 md:mt-10 animate-fade-up-delay-3">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-5 sm:px-8 py-3.5 rounded-sm border border-gold-premium/60 bg-card/40 backdrop-blur-md shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)] transition-all duration-500 hover:bg-card/60 hover:border-gold-premium hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-sm text-foreground tracking-wide font-sans whitespace-nowrap">
                Trusted Capital Managed: <span className="font-medium text-gold-premium">₹4,00,000+</span>
              </span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-gold-premium/30" />
            <div className="text-sm text-foreground tracking-wide font-sans whitespace-nowrap">
              Monthly SIP Commitments: <span className="font-medium text-gold-premium">₹45,000+</span>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up-delay-2">
          <a
            href="https://calendly.com/vinayk-inc/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-primary text-primary-foreground font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:bg-primary/90"
          >
            Book a Call
          </a>
          <a
            href="#services"
            className="px-8 py-3.5 border border-foreground/20 text-foreground font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:border-primary/50 hover:text-primary"
          >
            Start Your Journey
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
