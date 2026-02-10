const tools = [
  { name: "SIP Calculator", status: "Coming Soon" },
  { name: "Goal Planning Calculator", status: "Coming Soon" },
  { name: "Risk Profiling Quiz", status: "Coming Soon" },
  { name: "Portfolio Tracker", status: "Demo" },
];

const ToolsSection = () => {
  return (
    <section id="tools" className="py-24 md:py-32 bg-card/50">
      <div className="section-container">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-4">
          Tools & Resources
        </h2>
        <div className="gold-divider mb-16" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="border border-border p-8 text-center opacity-60 hover:opacity-80 transition-opacity duration-500"
            >
              <h3 className="font-serif text-base text-foreground mb-3">
                {tool.name}
              </h3>
              <span className="text-xs tracking-widest uppercase text-muted-foreground">
                {tool.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
