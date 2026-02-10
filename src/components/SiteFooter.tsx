const SiteFooter = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted-foreground">
          <p className="font-serif text-sm text-foreground/70">WealthPath</p>
          <p>Mutual fund investments are subject to market risks.</p>
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
