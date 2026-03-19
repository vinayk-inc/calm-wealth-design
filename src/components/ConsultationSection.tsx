import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

const ConsultationSection = () => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSavingLead, setIsSavingLead] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    goal: "",
    monthlyCapacity: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      setIsSavingLead(true);
      if (!isSupabaseConfigured || !supabase) {
        throw new Error(
          "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then restart the dev server.",
        );
      }

      const payload = {
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        goal: (formData.goal || "").trim() || null,
        monthly_capacity: (formData.monthlyCapacity || "").trim() || null,
        source: "consultation_section",
        user_agent: navigator.userAgent,
      };

      const { error } = await supabase
        .from("consultation_leads")
        .insert(payload);

      if (error) throw error;

      setSubmitted(true);
      toast({ title: "Thank you! Our advisor will contact you shortly." });
    } catch (err) {
      console.error("Failed to save consultation lead to Supabase:", err);
      toast({
        title: "Could not save your details",
        description:
          err instanceof Error ? err.message : "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSavingLead(false);
    }
  };

  return (
    <section id="consultation" className="py-24 md:py-32 bg-card/50">
      <div className="section-container max-w-2xl text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
          Request a Consultation
        </h2>
        <div className="gold-divider mb-10" />

        {submitted ? (
          <div className="py-8">
            <p className="font-serif text-lg text-foreground">
              Thank you for reaching out.
            </p>
            <p className="text-muted-foreground mt-2">
              Our advisor will contact you shortly.
            </p>
          </div>
        ) : !showForm ? (
          <Button
            onClick={() => setShowForm(true)}
            className="px-8 py-3.5 bg-primary text-primary-foreground font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:bg-primary/90"
          >
            Request Consultation
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-left max-w-md mx-auto">
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Full Name *
              </Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, monthlyCapacity: e.target.value })}
                maxLength={50}
                className="mt-1 bg-secondary border-border"
              />
            </div>
            <Button
              type="submit"
              disabled={isSavingLead}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 tracking-widest uppercase text-sm"
            >
              {isSavingLead ? "Submitting..." : "Submit"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ConsultationSection;
