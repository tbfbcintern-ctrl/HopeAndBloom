export function Dialogs() {
  return (
    <>
      <dialog
        className="about-detail-dialog"
        id="about-detail-dialog"
        aria-labelledby="about-detail-title"
        aria-describedby="about-detail-summary"
      >
        <div className="about-detail-dialog-top">
          <div className="about-detail-dialog-icon" id="about-detail-icon" aria-hidden="true" />
          <button className="about-detail-close" type="button" aria-label="Close details">×</button>
        </div>
        <p className="about-detail-eyebrow">ABOUT THE CENTER</p>
        <h2 id="about-detail-title" />
        <p className="about-detail-summary" id="about-detail-summary" />
        <div className="about-detail-content">
          <h3>What this means at Hope and Bloom</h3>
          <ul id="about-detail-points" />
        </div>
      </dialog>

      <dialog
        className="about-detail-dialog home-request-dialog"
        id="home-based-dialog"
        aria-labelledby="home-request-title"
        aria-describedby="home-request-description"
      >
        <div className="about-detail-dialog-top">
          <div className="about-detail-dialog-icon" aria-hidden="true">🏡</div>
          <button className="about-detail-close" type="button" aria-label="Close home-based request form">×</button>
        </div>
        <p className="about-detail-eyebrow">HOME-BASED ABA</p>
        <h2 id="home-request-title">Tell Us About Your Family</h2>
        <p className="about-detail-summary" id="home-request-description">
          Share a few details so we can understand your home-based support needs.
        </p>
        <form className="home-request-form" id="home-request-form">
          <div className="home-request-fields">
            <div className="form-group">
              <label htmlFor="home-guardian-name">Parent or Guardian Name</label>
              <input id="home-guardian-name" name="guardianName" autoComplete="name" required autoFocus placeholder="Your full name" />
            </div>
            <div className="form-group">
              <label htmlFor="home-contact-number">Contact Number</label>
              <input id="home-contact-number" name="contactNumber" type="tel" autoComplete="tel" required placeholder="e.g. 09xx xxx xxxx" />
            </div>
            <div className="form-group">
              <label htmlFor="home-email">Email Address <span className="home-request-optional">(optional)</span></label>
              <input id="home-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
            </div>
            <div className="form-group">
              <label htmlFor="home-child-age">Child's Age</label>
              <select id="home-child-age" name="childAge" required defaultValue="">
                <option value="" disabled>Select age range</option>
                <option value="under-3">Under 3 years old</option>
                <option value="3-5">3 to 5 years old</option>
                <option value="6-12">6 to 12 years old</option>
                <option value="13-plus">13+ years old</option>
              </select>
            </div>
            <div className="form-group home-request-full">
              <label htmlFor="home-address">Home Address</label>
              <input id="home-address" name="homeAddress" autoComplete="street-address" required placeholder="Street, barangay, city" />
            </div>
            <div className="form-group home-request-full">
              <label htmlFor="home-request-notes">
                Preferred Schedule or Support Needs <span className="home-request-optional">(optional)</span>
              </label>
              <textarea id="home-request-notes" name="notes" rows="3" placeholder="Share a preferred schedule or what you hope to work on." />
            </div>
          </div>
          <p className="home-request-privacy">
            This form is a preview only. Your information will not be sent or saved because online booking is not connected yet.
          </p>
          <button className="btn home-request-submit" type="submit">
            <span>Review Request</span>
            <span className="btn-arrow">→</span>
          </button>
          <div className="home-request-status" id="home-request-status" role="status" aria-live="polite" />
        </form>
      </dialog>
    </>
  );
}
