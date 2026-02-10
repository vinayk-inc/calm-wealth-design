const ComplianceSection = () => {
  return (
    <section id="compliance" className="py-24 md:py-32">
      <div className="section-container max-w-4xl">
        <h2 className="font-serif text-2xl md:text-3xl text-foreground text-center mb-4">
          Regulatory & Compliance
        </h2>
        <div className="gold-divider mb-12" />

        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="border border-border p-6">
              <p className="text-xs tracking-widest uppercase text-foreground/60 mb-2">
                ARN Number
              </p>
              <p className="text-foreground">ARN-XXXXXX</p>
            </div>
            <div className="border border-border p-6">
              <p className="text-xs tracking-widest uppercase text-foreground/60 mb-2">
                EUIN Number
              </p>
              <p className="text-foreground">E-XXXXXX</p>
            </div>
          </div>

          <div className="border border-border p-6">
            <p className="text-xs tracking-widest uppercase text-foreground/60 mb-3">
              Empaneled AMCs
            </p>
            <p>
              SBI Mutual Fund, HDFC Mutual Fund, ICICI Prudential, Axis Mutual Fund,
              Kotak Mutual Fund, Nippon India, DSP Mutual Fund, Mirae Asset, Parag Parikh,
              UTI Mutual Fund, and others.
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-xs leading-relaxed">
              Mutual fund investments are subject to market risks. Please read all scheme-related
              documents carefully before investing. Past performance is not indicative of future
              returns. The NAV of the schemes may go up or down depending upon the factors and
              forces affecting the securities market. The Mutual Fund is not guaranteeing or
              assuring any dividend under any of the schemes and the same is subject to the
              availability and adequacy of distributable surplus in the relevant scheme.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceSection;
