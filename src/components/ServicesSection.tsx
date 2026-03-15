const services = [
  {
    title: "Mutual Fund Investment Planning",
    items: [
      "SIP Planning",
      "Goal-Based Planning",
      "Retirement Planning",
      "Child Education Planning",
      "Tax Saving (ELSS)",
    ],
  },
  {
    title: "Portfolio Review Service",
    items: [
      "Existing MF portfolio analysis",
      "Risk & return comparison",
      "Expense ratio optimization",
      "Asset allocation check",
    ],
  },
  {
    title: "Wealth Management Advisory",
    items: [
      "Asset allocation strategy",
      "Long-term compounding strategy",
      "Multi-AMC portfolio construction",
    ],
  },
  {
    title: "Insurance Planning & Risk Protection",
    items: [
      "Term Life Insurance Planning",
      "Health Insurance Guidance",
      "Family Financial Protection Strategy",
      "Income Replacement Planning",
      "Long-Term Risk Management",
      "Insurance Portfolio Review",
    ],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-card/50">
      <div className="section-container">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-4">
          Services
        </h2>
        <div className="gold-divider mb-16" />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-10">
          {services.map((service) => (
            <div
              key={service.title}
              className="border border-border p-8 md:p-10 transition-all duration-500 hover:border-primary/30"
            >
              <h3 className="font-serif text-lg md:text-xl text-foreground mb-6 leading-snug">
                {service.title}
              </h3>
              <ul className="space-y-3">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-muted-foreground leading-relaxed pl-4 border-l border-border"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
