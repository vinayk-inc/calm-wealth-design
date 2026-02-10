const steps = [
  "Financial Goal Understanding",
  "Risk Profiling",
  "Portfolio Design",
  "Investment Execution",
  "Ongoing Monitoring & Rebalancing",
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-24 md:py-32">
      <div className="section-container">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-4">
          My Investment Framework
        </h2>
        <div className="gold-divider mb-16" />

        <div className="max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <div key={step} className="flex items-start gap-6 md:gap-8">
              {/* Number + line */}
              <div className="flex flex-col items-center">
                <span className="text-primary font-serif text-2xl md:text-3xl font-medium w-10 text-center">
                  {i + 1}
                </span>
                {i < steps.length - 1 && (
                  <div className="w-px h-12 md:h-16 bg-border mt-2" />
                )}
              </div>

              {/* Text */}
              <p className="text-foreground text-base md:text-lg pt-1 pb-4">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
