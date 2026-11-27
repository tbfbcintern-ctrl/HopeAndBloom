export function ContactSection() {
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
              <label htmlFor="contact-number">Contact Number</label>
              <input id="contact-number" name="contactNumber" type="tel" required autoComplete="tel" placeholder="e.g. 09xx xxx xxxx" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input id="email" name="email" type="email" required autoComplete="email" placeholder="sarah@example.com" />
            </div>
            <div className="form-group">
              <label htmlFor="relationship">Relationship to the Child</label>
              <select id="relationship" name="relationship" defaultValue="" required>
                <option value="" disabled>Select relationship</option>
                <option value="parent">Parent</option>
                <option value="guardian">Guardian</option>
                <option value="grandparent">Grandparent</option>
                <option value="teacher">Teacher</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="child-name">Child's Name <span className="home-request-optional">(optional)</span></label>
              <input id="child-name" name="childName" autoComplete="off" placeholder="e.g. Alex" />
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
              <label htmlFor="address">Address <span className="home-request-optional">(optional)</span></label>
              <input id="address" name="address" autoComplete="street-address" placeholder="Street, barangay, city" />
            </div>
            <div className="form-group">
              <label htmlFor="msg">How Can We Help Your Child?</label>
              <textarea id="msg" name="msg" placeholder="Share a little about your child's strengths, needs, or what you hope to achieve..." />
            </div>
            <button className="btn contact-submit-button" type="submit">
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
