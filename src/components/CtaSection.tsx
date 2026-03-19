const CtaSection = () => {
  const scrollToConsultation = () => {
    const el = document.getElementById("consultation");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="cta" className="py-24 md:py-32">
      <div className="section-container text-center max-w-2xl">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6 text-balance">
          Start your investment journey with clarity and confidence.
        </h2>
        <div className="gold-divider mb-10" />

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="https://calendly.com/vinayk-inc/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-primary text-primary-foreground font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:bg-primary/90"
          >
            Book a Call
          </a>
          <button
            onClick={scrollToConsultation}
            className="px-8 py-3.5 border border-primary text-primary font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            Request Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
