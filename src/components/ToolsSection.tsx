import { Link } from "react-router-dom";
import { Calculator, Target, UserCheck } from "lucide-react";

const tools = [
  { name: "SIP Calculator", path: "/sip-calculator", icon: Calculator, status: "Live" },
  { name: "Goal Planning Calculator", path: "/goal-planner", icon: Target, status: "Live" },
  { name: "Risk Profiling Quiz", path: "/risk-profile", icon: UserCheck, status: "Live" },
];

const ToolsSection = () => {
  return (
    <section id="tools" className="py-24 md:py-32 bg-card/50">
      <div className="section-container">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-4">
          Tools & Resources
        </h2>
        <div className="gold-divider mb-16" />

        <div className="grid sm:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.name}
                to={tool.path}
                className="border border-border p-8 text-center hover:border-primary/50 hover:bg-accent/30 transition-all duration-500 group"
              >
                <Icon className="w-8 h-8 mx-auto mb-4 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
                <h3 className="font-serif text-base text-foreground mb-3">
                  {tool.name}
                </h3>
                <span className="text-xs tracking-widest uppercase text-primary">
                  Try Now →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
