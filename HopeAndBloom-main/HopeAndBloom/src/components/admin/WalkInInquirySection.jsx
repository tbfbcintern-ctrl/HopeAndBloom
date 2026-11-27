export function WalkInInquirySection({ walkInForm, setWalkInForm, onSubmit }) {
  return (
    <section className="admin-panel" aria-label="Add inquiry">
      <div className="admin-panel-heading">
        <div>
          <h2>Add walk-in inquiry</h2>
          <p>Enter details received directly at the center.</p>
        </div>
        <span className="admin-readonly-label">LOCAL DEMO</span>
      </div>
      <form className="admin-walk-in-form" onSubmit={onSubmit}>
        <div className="admin-walk-in-grid">
          <div className="form-group">
            <label htmlFor="walkin-name">Parent or Guardian Name</label>
            <input id="walkin-name" required value={walkInForm.name} onChange={(event) => setWalkInForm({ ...walkInForm, name: event.target.value })} placeholder="Full name" />
          </div>
          <div className="form-group">
            <label htmlFor="walkin-contact">Contact Number</label>
            <input id="walkin-contact" type="tel" required value={walkInForm.contactNumber} onChange={(event) => setWalkInForm({ ...walkInForm, contactNumber: event.target.value })} placeholder="09xx xxx xxxx" />
          </div>
          <div className="form-group">
            <label htmlFor="walkin-email">Email Address <span>(optional)</span></label>
            <input id="walkin-email" type="email" value={walkInForm.email} onChange={(event) => setWalkInForm({ ...walkInForm, email: event.target.value })} placeholder="you@example.com" />
          </div>
          <div className="form-group">
            <label htmlFor="walkin-relationship">Relationship to the Child</label>
            <select id="walkin-relationship" value={walkInForm.relationship} onChange={(event) => setWalkInForm({ ...walkInForm, relationship: event.target.value })}>
              <option value="">Select relationship</option>
              <option value="parent">Parent</option>
              <option value="guardian">Guardian</option>
              <option value="grandparent">Grandparent</option>
              <option value="teacher">Teacher</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="walkin-child-name">Child's Name <span>(optional)</span></label>
            <input id="walkin-child-name" value={walkInForm.childName} onChange={(event) => setWalkInForm({ ...walkInForm, childName: event.target.value })} placeholder="Child's name" />
          </div>
          <div className="form-group">
            <label htmlFor="walkin-age">Child's Age</label>
            <select id="walkin-age" required value={walkInForm.age} onChange={(event) => setWalkInForm({ ...walkInForm, age: event.target.value })}>
              <option value="under-3">Under 3 years old</option>
              <option value="3-5">3 to 5 years old</option>
              <option value="6-12">6 to 12 years old</option>
              <option value="13-plus">13+ years old</option>
            </select>
          </div>
          <div className="form-group admin-walk-in-full">
            <label htmlFor="walkin-address">Address <span>(optional)</span></label>
            <input id="walkin-address" value={walkInForm.address} onChange={(event) => setWalkInForm({ ...walkInForm, address: event.target.value })} placeholder="Street, barangay, city" />
          </div>
          <div className="form-group admin-walk-in-full">
            <label htmlFor="walkin-message">How Can We Help?</label>
            <textarea id="walkin-message" rows="3" value={walkInForm.message} onChange={(event) => setWalkInForm({ ...walkInForm, message: event.target.value })} placeholder="Concerns, goals, or notes from the walk-in consultation" />
          </div>
        </div>
        <button className="admin-done-button admin-walk-in-submit" type="submit">Add walk-in inquiry</button>
      </form>
    </section>
  );
}
