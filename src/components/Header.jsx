import logo from '../../hope-and-bloom-full-logo.png';
import playroom from '../../center-playroom.png';
import entrance from '../../center-entrance.png';
import reception from '../../center-reception.png';

export function Header() {
  return (
    <header className="top">
      <div className="wrap nav-container">
        <a className="brand" href="#top" aria-label="Hope and Bloom Home">
          <img className="brand-logo" src={logo} alt="" />
        </a>
        <nav className="main-nav" aria-label="Main Navigation">
          <a className="nav-link" href="#approach">Our Approach</a>
          <a className="nav-link" href="#mission-vision">Mission &amp; Vision</a>
          <a className="nav-link" href="#promo">Promo</a>
          <a className="nav-link" href="#services">Programs</a>
          <a className="nav-link" href="#roadmap">How It Works</a>
          <a className="nav-link" href="#faq">Questions</a>
          <a className="nav-link" href="#contact">Contact</a>
        </nav>
        <div className="nav-actions">
          <a className="btn" href="#contact">
            <span>Book consultation</span>
            <span className="btn-arrow">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section className="hero-section">
      <div className="wrap hero-grid">
        <div className="hero-content">
          <div className="badge-pill">
            <span>✨</span> EARLY LEARNING &amp; THERAPY, MADE JOYFUL
          </div>
          <h1 className="hero-title">
            Every Child Grows at Their Own Pace. We Help Them{' '}
            <span className="highlight-container">
              Bloom
              <svg className="wavy-stroke" viewBox="0 0 140 18" preserveAspectRatio="none">
                <path d="M4 14 Q 35 3, 70 12 T 136 7" />
              </svg>
            </span>
          </h1>
          <p className="hero-lead">
            A joyful, goal-led learning experience that helps children build the communication, confidence, social connection, and everyday skills they need for life.
          </p>
          <div className="hero-acts">
            <a className="btn" href="#contact">
              <span>Book a free consultation</span>
              <span className="btn-arrow">→</span>
            </a>
            <a className="btn ghost" href="#approach">
              <span>What to expect</span>
            </a>
          </div>
          <div className="setting-chips">
            <a
              className="chip"
              href="https://www.google.com/maps/search/?api=1&amp;query=ABA+therapy+center+near+me"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Find nearby ABA therapy centers on Google Maps, opens in a new tab"
            >
              <span className="chip-icon">🏢</span> Center-based
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-blob-coral" aria-hidden="true" />
          <div className="hero-blob-gold" aria-hidden="true" />
          <div className="hero-dot-accent" aria-hidden="true" />
          <div className="photo-card carousel" aria-roledescription="carousel" aria-label="Hope and Bloom center photos">
            <div className="carousel-track">
              <figure className="carousel-slide active" aria-label="1 of 3">
                <img src={playroom} alt="Bright and colorful Hope and Bloom playroom" loading="eager" />
              </figure>
              <figure className="carousel-slide" aria-label="2 of 3">
                <img src={entrance} alt="Hope and Bloom welcoming center entrance" loading="lazy" />
              </figure>
              <figure className="carousel-slide" aria-label="3 of 3">
                <img src={reception} alt="Warm Hope and Bloom reception area" loading="lazy" />
              </figure>
            </div>
            <button className="carousel-button carousel-button-prev" type="button" aria-label="Previous photo">‹</button>
            <button className="carousel-button carousel-button-next" type="button" aria-label="Next photo">›</button>
            <div className="carousel-dots" role="tablist" aria-label="Choose photo">
              <button className="carousel-dot active" type="button" role="tab" aria-label="Show photo 1" aria-selected="true" />
              <button className="carousel-dot" type="button" role="tab" aria-label="Show photo 2" aria-selected="false" />
              <button className="carousel-dot" type="button" role="tab" aria-label="Show photo 3" aria-selected="false" />
            </div>
            <div className="floating-pill-tag">
              <span>🏡</span> HOME &amp; CENTER CARE
            </div>
            <div className="floating-review-card">
              <span className="review-headline">GROWING EVERY DAY</span>
              <span className="review-stars">★★★★★</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
