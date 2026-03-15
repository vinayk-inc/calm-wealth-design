import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import {
  ArrowLeft,
  GraduationCap,
  Home,
  Car,
  Plane,
  Landmark,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const formatCurrency = (val: number) => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
  return `₹${val.toLocaleString("en-IN")}`;
};

const goals = [
  { name: "Retirement", icon: Landmark },
  { name: "Education", icon: GraduationCap },
  { name: "House", icon: Home },
  { name: "Car", icon: Car },
  { name: "Travel", icon: Plane },
  { name: "Other", icon: Target },
];

const scenarios = [
  { name: "Conservative", returnRate: 8 },
  { name: "Moderate", returnRate: 12 },
  { name: "Aggressive", returnRate: 15 },
];

const GoalPlanner = () => {
  const [selectedGoal, setSelectedGoal] = useState("Retirement");
  const [currentCost, setCurrentCost] = useState(5000000);
  const [years, setYears] = useState(15);
  const [inflation, setInflation] = useState(6);
  const [expectedReturn, setExpectedReturn] = useState(12);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const results = useMemo(() => {
    const futureCost = currentCost * Math.pow(1 + inflation / 100, years);
    const r = expectedReturn / 100 / 12;
    const n = years * 12;
    const sipRequired =
      r > 0
        ? futureCost / (((Math.pow(1 + r, n) - 1) / r) * (1 + r))
        : futureCost / n;
    const totalInvestment = sipRequired * n;
    const lumpSum = futureCost / Math.pow(1 + expectedReturn / 100, years);

    const yearlyData = [];
    let cumInvested = 0;
    let cumValue = 0;
    for (let y = 1; y <= years; y++) {
      for (let m = 1; m <= 12; m++) {
        cumInvested += sipRequired;
        cumValue = (cumValue + sipRequired) * (1 + r);
      }
      yearlyData.push({
        year: y,
        invested: Math.round(cumInvested),
        value: Math.round(cumValue),
        target: Math.round(
          currentCost * Math.pow(1 + inflation / 100, y)
        ),
      });
    }

    const scenarioResults = scenarios.map((s) => {
      const sr = s.returnRate / 100 / 12;
      const sip =
        sr > 0
          ? futureCost / (((Math.pow(1 + sr, n) - 1) / sr) * (1 + sr))
          : futureCost / n;
      return { name: s.name, returnRate: s.returnRate, sip: Math.round(sip) };
    });

    return {
      futureCost: Math.round(futureCost),
      sipRequired: Math.round(sipRequired),
      totalInvestment: Math.round(totalInvestment),
      wealthGenerated: Math.round(futureCost - totalInvestment),
      lumpSum: Math.round(lumpSum),
      yearlyData,
      scenarioResults,
    };
  }, [currentCost, years, inflation, expectedReturn]);

  const chartConfig = {
    invested: { label: "Invested", color: "hsl(var(--muted-foreground))" },
    value: { label: "Portfolio Value", color: "hsl(var(--primary))" },
  };

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="section-container">
          <Link
            to="/#tools"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Tools
          </Link>

          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
            Goal Planning Calculator
          </h1>
          <p className="text-muted-foreground mb-10 max-w-xl">
            Determine the monthly SIP or lump sum needed to achieve your
            financial goals.
          </p>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Inputs */}
            <Card className="lg:col-span-2 bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Your Goal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Goal Selector */}
                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-3 block">
                    Goal Type
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {goals.map((g) => {
                      const Icon = g.icon;
                      return (
                        <button
                          key={g.name}
                          onClick={() => setSelectedGoal(g.name)}
                          className={`flex flex-col items-center gap-1.5 p-3 border transition-colors rounded-sm text-xs ${
                            selectedGoal === g.name
                              ? "border-primary bg-accent text-primary"
                              : "border-border text-muted-foreground hover:border-primary/50"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          {g.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                    Current Cost of Goal (₹)
                  </Label>
                  <Input
                    type="number"
                    value={currentCost}
                    onChange={(e) => setCurrentCost(Number(e.target.value) || 0)}
                    onBlur={() => setCurrentCost(Math.max(10000, Math.min(1000000000, currentCost)))}
                    className="mt-2 bg-secondary border-border"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                      Years Until Goal
                    </Label>
                    <span className="text-primary font-semibold">
                      {years} yrs
                    </span>
                  </div>
                  <Slider
                    value={[years]}
                    onValueChange={([v]) => setYears(v)}
                    min={1}
                    max={40}
                    step={1}
                    className="mt-3"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                      Expected Inflation
                    </Label>
                    <span className="text-primary font-semibold">
                      {inflation}%
                    </span>
                  </div>
                  <Slider
                    value={[inflation]}
                    onValueChange={([v]) => setInflation(v)}
                    min={0}
                    max={15}
                    step={0.5}
                    className="mt-3"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                      Expected Return
                    </Label>
                    <span className="text-primary font-semibold">
                      {expectedReturn}%
                    </span>
                  </div>
                  <Slider
                    value={[expectedReturn]}
                    onValueChange={([v]) => setExpectedReturn(v)}
                    min={1}
                    max={30}
                    step={0.5}
                    className="mt-3"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="lg:col-span-3 space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="bg-card border-border">
                  <CardContent className="p-5">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      Future Cost of {selectedGoal}
                    </span>
                    <p className="text-xl font-serif text-foreground mt-1">
                      {formatCurrency(results.futureCost)}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-5">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      Required Monthly SIP
                    </span>
                    <p className="text-xl font-serif text-primary mt-1">
                      {formatCurrency(results.sipRequired)}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-5">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      Total Investment
                    </span>
                    <p className="text-xl font-serif text-foreground mt-1">
                      {formatCurrency(results.totalInvestment)}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-5">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      Lump Sum Alternative
                    </span>
                    <p className="text-xl font-serif text-accent-foreground mt-1">
                      {formatCurrency(results.lumpSum)}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Chart */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-base">
                    Goal Growth Projection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[280px] w-full">
                    <AreaChart data={results.yearlyData}>
                      <defs>
                        <linearGradient id="goalInvGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="goalValGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="year"
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                        tickFormatter={(v) => `Yr ${v}`}
                      />
                      <YAxis
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                        tickFormatter={(v) => formatCurrency(v)}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(value) => formatCurrency(value as number)}
                          />
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="invested"
                        stroke="hsl(var(--muted-foreground))"
                        fill="url(#goalInvGrad)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        fill="url(#goalValGrad)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Scenario Comparison */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-base">
                    Scenario Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {results.scenarioResults.map((s) => (
                      <div
                        key={s.name}
                        className={`border p-4 text-center rounded-sm ${
                          s.returnRate === expectedReturn
                            ? "border-primary bg-accent"
                            : "border-border"
                        }`}
                      >
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                          {s.name} ({s.returnRate}%)
                        </p>
                        <p className="font-serif text-lg text-foreground">
                          {formatCurrency(s.sip)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          /month
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <p className="text-xs text-muted-foreground text-center">
                Disclaimer: Projections are estimates and do not guarantee
                returns. Mutual fund investments are subject to market risks.
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default GoalPlanner;
