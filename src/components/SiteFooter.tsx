const SiteFooter = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-start items-center justify-between gap-8 text-xs text-muted-foreground">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <a
              href="mailto:vinayk.inc@gmail.com"
              className="transition-colors hover:text-foreground"
            >
              📧 vinayk.inc@gmail.com
            </a>
            <p>📍 Thane, Maharashtra, India</p>
            <a
              href="https://www.linkedin.com/in/vinay-karnuk/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              🔗 LinkedIn
            </a>
            <a
              href="https://www.instagram.com/vinay.inc/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              📸 Instagram
            </a>
          </div>
          <p className="md:self-center">Mutual fund investments are subject to market risks.</p>
          <p className="md:self-center">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
