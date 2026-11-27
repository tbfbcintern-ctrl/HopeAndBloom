import logo from '../../../images/hope-and-bloom-full-logo.png';

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-content">
          <div className="footer-brand">
            <a className="brand" href="#top" aria-label="Hope and Bloom Home">
              <img className="brand-logo" src={logo} alt="" />
            </a>
            <p className="footer-tagline">
              Empowering every child with individualized, play-based ABA therapy.
            </p>
          </div>
          <div className="footer-links">
            <a href="#approach">Approach</a>
            <a href="#services">Programs</a>
            <a href="#roadmap">How It Works</a>
            <a href="#faq">FAQs</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div>&copy; 2026 Hope and Bloom ABA Therapy Center. All rights reserved.</div>
          <div>Care with kindness, science, and patience.</div>
        </div>
      </div>
    </footer>
  );
}

export function FloatingControls() {
  return (
    <>
      <a href="#contact" className="floating-chat" aria-label="Message Us">
        <span>💬</span>
        <span>Message us</span>
      </a>
      <a href="#top" className="back-to-top" aria-label="Back to top">↑</a>
    </>
  );
}
