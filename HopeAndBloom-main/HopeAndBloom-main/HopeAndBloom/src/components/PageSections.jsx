import { useEffect, useState } from 'react';
import { DEFAULT_PROGRAMS, getPrograms, PROGRAMS_UPDATED_EVENT } from '../programs.js';

const steps = [
  {
    number: '01',
    title: 'Free Consultation',
    description: 'Connect with our clinical director, tour our warm center, discuss your concerns, and ask all your questions.'
  },
  {
    number: '02',
    title: 'Observation & Assessment',
    description: 'We observe and play with your child to understand their unique strengths, favorite motivators, and areas for growth.'
  },
  {
    number: '03',
    title: 'Custom Care Plan',
    description: 'We collaboratively craft clear goals, schedule therapy hours that fit your family, and coordinate insurance details.'
  },
  {
    number: '04',
    title: 'Sessions Begin',
    description: "Therapy launches at your child's pace, filled with fun, positive encouragement, and regular progress reviews."
  }
];

const questions = [
  {
    question: 'Is ABA therapy right for my child?',
    answer: "ABA therapy is evidence-based and effective for children with Autism Spectrum Disorder (ASD), sensory integration challenges, and developmental delays. Our initial consultation gives you an honest, pressure-free evaluation of whether our approach matches your child's specific needs."
  },
  {
    question: 'How many hours per week will my child need?',
    answer: "Every child's program is personalized. Comprehensive programs may run 15–30 hours weekly, while focused programs (targeting specific skills like communication or social play) may require 8–12 hours. We always recommend schedules based on clinical necessity and your family's routine."
  },
  {
    question: 'Can parents observe or participate in sessions?',
    answer: 'Absolutely! Parent participation is a cornerstone of our success. We encourage observation and host regular hands-on parent coaching sessions so you feel empowered using positive reinforcement strategies at home.'
  },
  {
    question: 'Do you accept health insurance?',
    answer: 'Yes, we work with many major insurance providers and assist families with benefit verification and pre-authorization. During your consultation, we will review your coverage options and guide you step-by-step.'
  }
];

function SectionHeading({ badge, title, children, id }) {
  return (
    <div className="section-head">
      <div className="badge-pill">{badge}</div>
      <h2 id={id}>{title}</h2>
      {children && <p className="intro">{children}</p>}
    </div>
  );
}

function GlanceBanner() {
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

function PurposeSection() {
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

function AboutCenterSection() {
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
            <article className="about-center-card" key={title}>
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

function ApproachSection() {
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

function PromoSection() {
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
                  className="promo-link promo-pay-button"
                  type="button"
                  data-promo-name={promo.name}
                  data-promo-sessions={promo.sessions}
                  data-promo-price={promo.price}
                >
                  Choose &amp; pay <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
        <p className="promo-note"><strong>Non-promo availment:</strong> Minimum of 6 sessions required for all new and existing clients.</p>
      </div>
    </section>
  );
}

function ServicesSection() {
  const [programs, setPrograms] = useState(DEFAULT_PROGRAMS);
  const [programError, setProgramError] = useState('');

  useEffect(() => {
    const refreshPrograms = () => {
      try {
        setPrograms(getPrograms());
        setProgramError('');
      } catch (error) {
        setProgramError(error.message);
      }
    };

    refreshPrograms();
    window.addEventListener(PROGRAMS_UPDATED_EVENT, refreshPrograms);
    window.addEventListener('storage', refreshPrograms);
    return () => {
      window.removeEventListener(PROGRAMS_UPDATED_EVENT, refreshPrograms);
      window.removeEventListener('storage', refreshPrograms);
    };
  }, []);

  const publishedPrograms = programs.filter((program) => program.active);

  return (
    <section id="services">
      <div className="wrap">
        <SectionHeading badge="CORE PROGRAMS" title="Programs Matched to Every Need">
          Each child is unique. Our therapy programs are custom-tailored to your child's age, sensory profile, and developmental milestones.
        </SectionHeading>
        {programError && <p className="service-program-error" role="alert">{programError}</p>}
        <div className="services-grid">
          {publishedPrograms.map(({ id, age, title, description }) => (
            <article className="service-box" key={id}>
              <div className="service-top">
                <span className="service-pill">{age}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <span className="service-link" aria-hidden="true">Learn more <span>→</span></span>
              <button
                className="service-box-trigger"
                type="button"
                data-program-detail={id}
                aria-haspopup="dialog"
                aria-controls="about-detail-dialog"
                aria-label={`View full details for ${title}`}
              />
            </article>
          ))}
        </div>
        {!programError && publishedPrograms.length === 0 && (
          <p className="service-program-empty">Our programs are currently being updated. Please contact us to learn more.</p>
        )}
      </div>
    </section>
  );
}

function RoadmapSection() {
  return (
    <section id="roadmap" className="steps-section">
      <div className="wrap">
        <SectionHeading badge="GETTING STARTED" title="What Your First Weeks Look Like">
          We believe in complete transparency and clarity. Here is our straightforward step-by-step path to starting therapy.
        </SectionHeading>
        <div className="steps-grid">
          {steps.map(({ number, title, description }) => (
            <article className="step-card" key={number}>
              <div className="step-number">{number}</div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq">
      <div className="wrap">
        <SectionHeading badge="COMMON QUESTIONS" title="Questions Parents Ask">
          Finding the right support for your child is a big step. Here are answers to what families ask most.
        </SectionHeading>
        <div className="faq-wrap">
          {questions.map(({ question, answer }, index) => (
            <details className="faq-item" open={index === 0} key={question}>
              <summary className="faq-q">
                <span>{question}</span>
                <span className="faq-icon">+</span>
              </summary>
              <div className="faq-answer">{answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="wrap contact-layout">
        <div className="contact-info">
          <div className="badge-pill">LET'S CONNECT</div>
          <h2>Start with a Warm Conversation</h2>
          <p className="intro">
            Tell us a little about your child and your family goals. We will reply within one business day to set up a free, no-obligation consultation.
          </p>
          <div className="contact-perks">
            <div className="perk-item">
              <div className="perk-check">✓</div>
              <span>No long waitlists — prompt initial evaluation</span>
            </div>
            <div className="perk-item">
              <div className="perk-check">✓</div>
              <span>100% confidential and family-centered consultation</span>
            </div>
            <div className="perk-item">
              <div className="perk-check">✓</div>
              <span>Guidance with insurance verification &amp; intake</span>
            </div>
          </div>
        </div>
        <div className="contact-card-box">
          <form id="f">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input id="name" name="name" required autoComplete="name" placeholder="e.g. Sarah Jenkins" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input id="email" name="email" type="email" required autoComplete="email" placeholder="sarah@example.com" />
            </div>
            <div className="form-group">
              <label htmlFor="age">Child's Age</label>
              <select id="age" name="age" defaultValue="3-5">
                <option value="under-3">Under 3 years old</option>
                <option value="3-5">3 to 5 years old</option>
                <option value="6-12">6 to 12 years old</option>
                <option value="13-plus">13+ years old</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="msg">How Can We Help Your Child?</label>
              <textarea id="msg" name="msg" placeholder="Share a little about your child's strengths, needs, or what you hope to achieve..." />
            </div>
            <button className="btn" type="submit" style={{ width: '100%', marginTop: '0.5rem' }}>
              <span>Request a Consultation</span>
              <span className="btn-arrow">→</span>
            </button>
            <div id="form-error" role="status" aria-live="polite" />
          </form>
          <section
            className="contact-success"
            id="form-success"
            aria-labelledby="form-success-title"
            aria-live="polite"
            hidden
          >
            <span className="contact-success-icon" aria-hidden="true">✓</span>
            <h3 id="form-success-title">Thank you!</h3>
            <p>Your consultation request has been saved in this browser.</p>
            <p className="contact-success-note">This is a local demo. No email was sent and the center has not received your request.</p>
            <button className="btn" id="submit-another" type="button">
              <span>Submit another request</span>
              <span className="btn-arrow">→</span>
            </button>
          </section>
        </div>
      </div>
    </section>
  );
}

export function PageSections() {
  return (
    <>
      <GlanceBanner />
      <PurposeSection />
      <AboutCenterSection />
      <ApproachSection />
      <PromoSection />
      <ServicesSection />
      <RoadmapSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
