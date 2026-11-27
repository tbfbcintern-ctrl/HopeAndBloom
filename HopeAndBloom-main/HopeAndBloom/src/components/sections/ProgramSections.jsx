import { useEffect, useState } from 'react';
import { DEFAULT_PROGRAMS, getPrograms, PROGRAMS_UPDATED_EVENT } from '../../data/programs.js';
import { SectionHeading } from './SectionHeading.jsx';

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

export function ServicesSection() {
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
          {publishedPrograms.map(({
            id,
            age,
            title,
            description,
            objectives,
            implementation,
            modules,
            assessmentFocus
          }) => (
            <article className="service-box" key={id}>
              <span className="service-pill">{age}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              {objectives && (
                <div className="service-objectives">
                  <h4>Program objectives</h4>
                  <ul>
                    {objectives.map((objective) => <li key={objective}>{objective}</li>)}
                  </ul>
                </div>
              )}
              {implementation && (
                <p className="service-program-note"><strong>Implementation:</strong> {implementation}</p>
              )}
              {modules && (
                <div className="service-modules-wrap">
                  <table className="service-modules">
                    <thead>
                      <tr>
                        <th scope="col">Module</th>
                        <th scope="col">Sample activities</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modules.map(({ name, activities }) => (
                        <tr key={name}>
                          <th scope="row">{name}</th>
                          <td>{activities}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {assessmentFocus && (
                <p className="service-program-note"><strong>Assessment focus:</strong> {assessmentFocus}</p>
              )}
              <a className="service-link" href="#contact">Learn more <span>→</span></a>
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

export function RoadmapSection() {
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

export function FaqSection() {
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
