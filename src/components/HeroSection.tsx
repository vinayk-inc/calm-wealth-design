import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

        <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up-delay-2">
          <a
            href="https://calendly.com/vinayk-inc/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-primary text-primary-foreground font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:bg-primary/90"
          >
            Book a Consultation
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
