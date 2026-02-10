const reviews = [
  {
    quote:
      "Starting a SIP felt overwhelming until I found the right guidance. Over five years, the discipline of systematic investing helped our family plan for our daughter's education with confidence.",
    attribution: "— A long-term SIP investor, Mumbai",
  },
  {
    quote:
      "Having someone review my scattered mutual fund holdings and consolidate them into a focused portfolio made all the difference. The process was calm, thorough, and completely transparent.",
    attribution: "— IT professional, Bengaluru",
  },
  {
    quote:
      "What I appreciate most is the patience. No pressure to invest more, no chasing trends — just thoughtful advice aligned with our retirement timeline.",
    attribution: "— Couple planning retirement, Pune",
  },
];

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-24 md:py-32 bg-card/50">
      <div className="section-container max-w-4xl">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-4">
          Client Journeys
        </h2>
        <div className="gold-divider mb-16" />

        <div className="space-y-10">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="border-l border-primary/30 pl-8 py-2"
            >
              <p className="text-foreground/90 text-base md:text-lg leading-relaxed italic font-serif">
                "{review.quote}"
              </p>
              <p className="mt-4 text-xs tracking-widest uppercase text-muted-foreground">
                {review.attribution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
