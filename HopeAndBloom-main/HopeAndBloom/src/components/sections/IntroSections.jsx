import { useState } from 'react';
import { SectionHeading } from './SectionHeading.jsx';
import { PromoCheckoutDialog } from './PromoCheckoutDialog.jsx';

export function GlanceBanner() {
  const highlights = [
    ['🧩', 'Play-Led Learning', 'Joyful, interest-driven therapy sessions'],
    ['📋', 'BCBA-Led Plans', 'Personalized goals built with your family'],
    ['🤝', 'Parent Coaching', 'Strategies that carry over seamlessly at home']
  ];

  return (
    <div className="glance-banner">
      <div className="wrap glance-grid">
        {highlights.map(([icon, title, description]) => (
          <div className="glance-item" key={title}>
            <div className="glance-icon">{icon}</div>
            <div className="glance-text">
              <h4>{title}</h4>
              <p>{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PurposeSection() {
  return (
    <section id="mission-vision" className="purpose-section" aria-labelledby="purpose-title">
      <div className="wrap">
        <div className="purpose-heading">
          <div className="badge-pill">OUR PURPOSE</div>
          <h2 id="purpose-title">Mission &amp; Vision</h2>
        </div>
        <div className="purpose-grid">
          <article className="purpose-card purpose-card-mission">
            <div className="purpose-card-icon" aria-hidden="true">🌱</div>
            <div>
              <h3>Our Mission</h3>
              <p>To provide exceptional, individualized, and evidence-based developmental and ABA services through compassionate care, professional excellence, and a nurturing learning environment that empowers every child to build essential life skills, achieve meaningful progress, and develop independence for a brighter future.</p>
            </div>
          </article>
          <article className="purpose-card purpose-card-vision">
            <div className="purpose-card-icon" aria-hidden="true">✨</div>
            <div>
              <h3>Our Vision</h3>
              <p>To become a leading center of excellence in child development and learning, recognized for delivering innovative, high-quality, and compassionate services that transform children's abilities into lifelong strengths, empower families, and create a future where every child has the opportunity to thrive independently and reach their fullest potential.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function AboutCenterSection() {
  const cards = [
    {
      icon: '🎯',
      title: 'Our Focus',
      description: 'Individualized, evidence-based developmental and ABA services.',
      detail: 'focus'
    },
    {
      icon: '🧸',
      title: 'Our Approach',
      description: 'Compassionate care, professional excellence, and a nurturing learning environment.',
      detail: 'approach'
    },
    {
      icon: '🤝',
      title: 'Our Partners',
      description: 'Children, families, teachers, and qualified professionals.',
      detail: 'partners'
    }
  ];

  return (
    <section className="about-center-section" aria-labelledby="about-center-title">
      <div className="wrap">
        <div className="about-center-intro">
          <div className="about-center-heading">
            <div className="badge-pill">ABOUT HOPE &amp; BLOOM</div>
            <h2 id="about-center-title">About the Center</h2>
            <p className="about-center-subtitle">A child-centered ABA service model</p>
          </div>
          <p className="about-center-lead">Hope and Bloom Child Development Center is an ABA center focused on helping children build essential life skills, achieve meaningful progress, and develop greater independence.</p>
        </div>
        <div className="about-center-grid">
          {cards.map(({ icon, title, description, detail }) => (
            <article className="about-center-card" key={detail}>
              <div className="about-center-card-icon" aria-hidden="true">{icon}</div>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="about-center-card-action" aria-hidden="true">
                Explore details <span>↗</span>
              </span>
              <button
                className="about-center-card-trigger"
                type="button"
                data-about-detail={detail}
                aria-haspopup="dialog"
                aria-controls="about-detail-dialog"
                aria-label={`View details about ${title}`}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ApproachSection() {
  const cards = [
    {
      icon: '🎯',
      title: 'Plans Built With You',
      description: "You know your child best. A Board Certified Behavior Analyst (BCBA) listens to your family's priorities to create an individualized growth plan and reviews it with you continuously."
    },
    {
      icon: '🧸',
      title: 'Learning Through Play',
      description: 'Skills are woven directly into games, favorite songs, snack times, and routines your child already loves, ensuring real progress carries over into daily life.'
    },
    {
      icon: '📊',
      title: 'Progress You Can See',
      description: 'We monitor growth every session and share transparent, plain-language reports so you always know what is working and what milestone comes next.'
    }
  ];

  return (
    <section id="approach" className="approach-section">
      <div className="wrap">
        <SectionHeading badge="OUR PHILOSOPHY" title="How We Help Your Child Bloom">
          Applied Behavior Analysis (ABA) teaches essential skills by breaking them into achievable, bite-sized steps and celebrating every milestone. We keep every session warm, respectful, and led by your child's natural curiosity.
        </SectionHeading>
        <div className="cols-cards">
          {cards.map(({ icon, title, description }) => (
            <article className="approach-card" key={title}>
              <div className="card-badge-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PromoSection() {
  const [selectedPromo, setSelectedPromo] = useState(null);
  const promos = [
    {
      name: 'Promo A',
      sessions: '10 Sessions',
      count: '10 therapy sessions',
      bonus: '+ 1 free session',
      price: '₱12,000'
    },
    {
      name: 'Promo B',
      sessions: '15 Sessions',
      count: '15 therapy sessions',
      bonus: '+ 2 free sessions',
      price: '₱18,000'
    },
    {
      name: 'Promo C',
      sessions: '20 Sessions',
      count: '20 therapy sessions',
      inclusions: ['2 free sessions', 'Free assessment', 'Uniform and handbook'],
      price: '₱24,000',
      featured: true
    }
  ];

  return (
    <section id="promo" className="promo-section" aria-labelledby="promo-title">
      <div className="wrap">
        <SectionHeading badge="THERAPY PROMOS" title="Therapy Promo Packages" id="promo-title">
          Choose a session package with extra support and savings for your family.
        </SectionHeading>
        <div className="promo-grid">
          {promos.map((promo) => (
            <article className={`promo-card${promo.featured ? ' promo-card-featured' : ''}`} key={promo.name}>
              <div className="promo-card-top">
                <span className="promo-label">{promo.name}</span>
                <h3>{promo.sessions}</h3>
              </div>
              <div className="promo-card-content">
                <p className="promo-session-count">{promo.count}</p>
                {promo.bonus && <p className="promo-bonus">{promo.bonus}</p>}
                {promo.inclusions && (
                  <ul className="promo-inclusions">
                    {promo.inclusions.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
                <p className="promo-price">{promo.price}</p>
                <button
                  className="promo-link"
                  type="button"
                  onClick={() => setSelectedPromo(promo)}
                >
                  View demo checkout <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
        <p className="promo-note"><strong>Non-promo availment:</strong> Minimum of 6 sessions required for all new and existing clients.</p>
        <p className="promo-payment-note">
          Checkout is a demo only. PayMongo is not connected and no payment will be processed.
        </p>
      </div>
      <PromoCheckoutDialog
        promo={selectedPromo}
        onClose={() => setSelectedPromo(null)}
      />
    </section>
  );
}
