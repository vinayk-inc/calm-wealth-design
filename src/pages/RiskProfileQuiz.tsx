import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, ShieldCheck, Scale, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const questions = [
  {
    q: "What is your investment horizon?",
    options: [
      "Less than 3 years",
      "3 – 5 years",
      "5 – 10 years",
      "More than 10 years",
    ],
  },
  {
    q: "How would you react if your portfolio dropped by 20% during a market crash?",
    options: [
      "Sell immediately to avoid further loss",
      "Wait and monitor the situation",
      "Stay invested and remain patient",
      "Invest more to take advantage of lower prices",
    ],
  },
  {
    q: "What is your primary investment objective?",
    options: [
      "Protect my capital",
      "Generate stable income",
      "Balanced growth",
      "Maximum long-term wealth creation",
    ],
  },
  {
    q: "How familiar are you with stock market investments?",
    options: [
      "Beginner",
      "Basic knowledge",
      "Experienced investor",
      "Very experienced / professional",
    ],
  },
  {
    q: "What percentage of your monthly income can you invest comfortably?",
    options: ["Less than 10%", "10% – 20%", "20% – 30%", "More than 30%"],
  },
  {
    q: "When markets are volatile, you usually:",
    options: [
      "Feel uncomfortable and avoid risk",
      "Prefer safe investments",
      "Stay invested with some caution",
      "Actively look for opportunities",
    ],
  },
  {
    q: "What type of investment returns do you prefer?",
    options: [
      "Low risk with stable returns",
      "Moderate risk with steady returns",
      "Balanced risk and growth potential",
      "High risk with high return potential",
    ],
  },
  {
    q: "Your reaction to short-term losses would be:",
    options: [
      "Exit investments immediately",
      "Reduce exposure",
      "Hold investments and wait",
      "Increase investment for long-term gain",
    ],
  },
  {
    q: "How long can you stay invested without needing the money?",
    options: [
      "Less than 2 years",
      "2 – 5 years",
      "5 – 10 years",
      "More than 10 years",
    ],
  },
  {
    q: "Which statement best describes you as an investor?",
    options: [
      "I prioritize safety of capital",
      "I prefer stability with moderate growth",
      "I am comfortable with some market risk",
      "I actively pursue high-growth opportunities",
    ],
  },
];

type RiskProfile = "Conservative" | "Moderate" | "Aggressive";

const profileInfo: Record<
  RiskProfile,
  { icon: typeof ShieldCheck; description: string; color: string }
> = {
  Conservative: {
    icon: ShieldCheck,
    description:
      "Conservative investors prioritize safety of capital over high returns. They prefer stable, low-risk investments such as fixed deposits and debt funds, accepting lower returns in exchange for minimal volatility.",
    color: "text-blue-400",
  },
  Moderate: {
    icon: Scale,
    description:
      "Moderate investors seek a balance between growth and stability. They are willing to take some market risk to achieve better long-term returns while maintaining some protection against major losses.",
    color: "text-primary",
  },
  Aggressive: {
    icon: Flame,
    description:
      "Aggressive investors actively pursue high-growth opportunities and are comfortable with significant market volatility. They focus on long-term wealth creation through equity-heavy portfolios.",
    color: "text-orange-400",
  },
};

const RiskProfileQuiz = () => {
  const { toast } = useToast();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(-1));
  const [showResult, setShowResult] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    goal: "",
    monthlyCapacity: "",
  });

  const handleSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = optionIndex;
    setAnswers(newAnswers);
  };

  const totalScore = answers.reduce((sum, a) => sum + (a >= 0 ? a + 1 : 0), 0);

  const getProfile = (): RiskProfile => {
    if (totalScore <= 18) return "Conservative";
    if (totalScore <= 30) return "Moderate";
    return "Aggressive";
  };

  const handleNext = () => {
    if (currentQ < 9) setCurrentQ(currentQ + 1);
    else setShowResult(true);
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();

    if (!trimmedName || trimmedName.length > 100) {
      toast({ title: "Please enter a valid name", variant: "destructive" });
      return;
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }
    if (!trimmedPhone || !/^[6-9]\d{9}$/.test(trimmedPhone)) {
      toast({ title: "Please enter a valid 10-digit phone number", variant: "destructive" });
      return;
    }

    // For now, log the data (backend integration can be added later)
    console.info("Risk profile lead:", {
      ...formData,
      profile: getProfile(),
      score: totalScore,
    });

    setFormSubmitted(true);
    toast({ title: "Thank you! Our advisor will contact you shortly." });
  };

  const progress = ((currentQ + 1) / 10) * 100;
  const profile = getProfile();
  const ProfileIcon = profileInfo[profile].icon;

  if (showResult) {
    return (
      <>
        <SiteHeader />
        <main className="min-h-screen bg-background pt-24 pb-16">
          <div className="section-container max-w-2xl">
            <Link
              to="/#tools"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>

            <Card className="bg-card border-border">
              <CardContent className="p-8 text-center">
                <ProfileIcon
                  className={`w-16 h-16 mx-auto mb-4 ${profileInfo[profile].color}`}
                />
                <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
                  You are a {profile} Investor
                </h2>
                <p className="text-sm text-muted-foreground mb-1">
                  Score: {totalScore}/40
                </p>
                <p className="text-muted-foreground mt-4 max-w-lg mx-auto leading-relaxed">
                  {profileInfo[profile].description}
                </p>
              </CardContent>
            </Card>

            {/* Lead Capture */}
            {!formSubmitted ? (
              <Card className="bg-card border-border mt-8">
                <CardHeader>
                  <CardTitle className="text-lg text-center">
                    Get Your Personalized Investment Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!showForm ? (
                    <div className="text-center">
                      <Button
                        onClick={() => setShowForm(true)}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Request Consultation
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4 max-w-md mx-auto">
                      <div>
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                          Full Name *
                        </Label>
                        <Input
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          maxLength={100}
                          className="mt-1 bg-secondary border-border"
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                          Email Address *
                        </Label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          maxLength={255}
                          className="mt-1 bg-secondary border-border"
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                          Phone Number *
                        </Label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          maxLength={10}
                          className="mt-1 bg-secondary border-border"
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                          Investment Goal (Optional)
                        </Label>
                        <Input
                          value={formData.goal}
                          onChange={(e) =>
                            setFormData({ ...formData, goal: e.target.value })
                          }
                          maxLength={200}
                          className="mt-1 bg-secondary border-border"
                        />
                      </div>
                      <div>
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                          Monthly Investment Capacity (Optional)
                        </Label>
                        <Input
                          value={formData.monthlyCapacity}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              monthlyCapacity: e.target.value,
                            })
                          }
                          maxLength={50}
                          className="mt-1 bg-secondary border-border"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Request Consultation
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card border-border mt-8">
                <CardContent className="p-8 text-center">
                  <p className="text-foreground font-serif text-lg">
                    Thank you for completing the risk profile.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Our advisor will contact you shortly.
                  </p>
                </CardContent>
              </Card>
            )}

            <p className="text-xs text-muted-foreground text-center mt-6">
              Disclaimer: This quiz is for educational purposes only and does
              not constitute investment advice.
            </p>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="section-container max-w-2xl">
          <Link
            to="/#tools"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Tools
          </Link>

          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
            Risk Profiling Quiz
          </h1>
          <p className="text-muted-foreground mb-8">
            Answer 10 questions to discover your investor personality.
          </p>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>
                Question {currentQ + 1} of 10
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>

          {/* Question */}
          <Card className="bg-card border-border">
            <CardContent className="p-6 md:p-8">
              <h2 className="font-serif text-lg md:text-xl text-foreground mb-6">
                {questions[currentQ].q}
              </h2>
              <div className="space-y-3">
                {questions[currentQ].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`w-full text-left p-4 border transition-colors rounded-sm text-sm ${
                      answers[currentQ] === i
                        ? "border-primary bg-accent text-foreground"
                        : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    <span className="font-semibold mr-2 text-primary">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {opt}
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentQ === 0}
                  className="border-border"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" /> Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={answers[currentQ] === -1}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {currentQ === 9 ? "See Results" : "Next"}{" "}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Disclaimer: This quiz is for educational purposes only and does not
            constitute investment advice.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default RiskProfileQuiz;
