import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
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
  ResponsiveContainer,
} from "recharts";
import { ArrowLeft, TrendingUp, Wallet, PiggyBank } from "lucide-react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const formatCurrency = (val: number) => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
  return `₹${val.toLocaleString("en-IN")}`;
};

const SipCalculator = () => {
  const [monthlyAmount, setMonthlyAmount] = useState(10000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [duration, setDuration] = useState(10);
  const [stepUpEnabled, setStepUpEnabled] = useState(false);
  const [stepUpPercent, setStepUpPercent] = useState(10);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const results = useMemo(() => {
    const yearlyData: {
      year: number;
      invested: number;
      value: number;
    }[] = [];

    const r = annualReturn / 100 / 12;
    let totalInvested = 0;
    let futureValue = 0;
    let currentSip = monthlyAmount;

    for (let year = 1; year <= duration; year++) {
      for (let month = 1; month <= 12; month++) {
        totalInvested += currentSip;
        futureValue = (futureValue + currentSip) * (1 + r);
      }
      yearlyData.push({
        year,
        invested: Math.round(totalInvested),
        value: Math.round(futureValue),
      });
      if (stepUpEnabled) {
        currentSip = Math.round(currentSip * (1 + stepUpPercent / 100));
      }
    }

    return {
      totalInvested: Math.round(totalInvested),
      futureValue: Math.round(futureValue),
      wealthGained: Math.round(futureValue - totalInvested),
      yearlyData,
    };
  }, [monthlyAmount, annualReturn, duration, stepUpEnabled, stepUpPercent]);

  const chartConfig = {
    invested: { label: "Invested", color: "hsl(var(--muted-foreground))" },
    value: { label: "Future Value", color: "hsl(var(--primary))" },
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
            SIP Calculator
          </h1>
          <p className="text-muted-foreground mb-10 max-w-xl">
            Estimate the future value of your Systematic Investment Plan and
            plan long-term wealth creation through mutual funds.
          </p>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Inputs */}
            <Card className="lg:col-span-2 bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Investment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                    Monthly SIP Amount (₹)
                  </Label>
                  <Input
                    type="number"
                    min={500}
                    max={10000000}
                    value={monthlyAmount}
                    onChange={(e) =>
                      setMonthlyAmount(
                        Math.max(500, Math.min(10000000, Number(e.target.value)))
                      )
                    }
                    className="mt-2 bg-secondary border-border"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                      Expected Annual Return
                    </Label>
                    <span className="text-primary font-semibold">
                      {annualReturn}%
                    </span>
                  </div>
                  <Slider
                    value={[annualReturn]}
                    onValueChange={([v]) => setAnnualReturn(v)}
                    min={1}
                    max={30}
                    step={0.5}
                    className="mt-3"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                      Investment Duration
                    </Label>
                    <span className="text-primary font-semibold">
                      {duration} yrs
                    </span>
                  </div>
                  <Slider
                    value={[duration]}
                    onValueChange={([v]) => setDuration(v)}
                    min={1}
                    max={40}
                    step={1}
                    className="mt-3"
                  />
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                      Annual Step-Up SIP
                    </Label>
                    <Switch
                      checked={stepUpEnabled}
                      onCheckedChange={setStepUpEnabled}
                    />
                  </div>
                  {stepUpEnabled && (
                    <div className="mt-4">
                      <div className="flex justify-between">
                        <Label className="text-muted-foreground text-xs">
                          Step-Up Percentage
                        </Label>
                        <span className="text-primary font-semibold">
                          {stepUpPercent}%
                        </span>
                      </div>
                      <Slider
                        value={[stepUpPercent]}
                        onValueChange={([v]) => setStepUpPercent(v)}
                        min={1}
                        max={50}
                        step={1}
                        className="mt-3"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="lg:col-span-3 space-y-6">
              {/* Summary Cards */}
              <div className="grid sm:grid-cols-3 gap-4">
                <Card className="bg-card border-border">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Wallet className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-wider">
                        Total Invested
                      </span>
                    </div>
                    <p className="text-xl font-serif text-foreground">
                      {formatCurrency(results.totalInvested)}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-wider">
                        Future Value
                      </span>
                    </div>
                    <p className="text-xl font-serif text-primary">
                      {formatCurrency(results.futureValue)}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <PiggyBank className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-wider">
                        Wealth Gained
                      </span>
                    </div>
                    <p className="text-xl font-serif text-accent-foreground">
                      {formatCurrency(results.wealthGained)}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Chart */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-base">
                    Investment Growth Over Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[280px] w-full">
                    <AreaChart data={results.yearlyData}>
                      <defs>
                        <linearGradient id="investedGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="valueGrad" x1="0" y1="0" x2="0" y2="1">
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
                            formatter={(value) =>
                              formatCurrency(value as number)
                            }
                          />
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="invested"
                        stroke="hsl(var(--muted-foreground))"
                        fill="url(#investedGrad)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        fill="url(#valueGrad)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Yearly Breakdown */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-base">Yearly Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-muted-foreground">
                          <th className="text-left py-2 px-3">Year</th>
                          <th className="text-right py-2 px-3">Invested</th>
                          <th className="text-right py-2 px-3">Value</th>
                          <th className="text-right py-2 px-3">Gain</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.yearlyData.map((row) => (
                          <tr
                            key={row.year}
                            className="border-b border-border/50 hover:bg-secondary/50 transition-colors"
                          >
                            <td className="py-2 px-3 text-foreground">
                              {row.year}
                            </td>
                            <td className="py-2 px-3 text-right text-muted-foreground">
                              {formatCurrency(row.invested)}
                            </td>
                            <td className="py-2 px-3 text-right text-primary">
                              {formatCurrency(row.value)}
                            </td>
                            <td className="py-2 px-3 text-right text-accent-foreground">
                              {formatCurrency(row.value - row.invested)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <p className="text-xs text-muted-foreground text-center">
                Disclaimer: Returns are indicative and not guaranteed. Past
                performance does not guarantee future results. Mutual fund
                investments are subject to market risks.
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default SipCalculator;
