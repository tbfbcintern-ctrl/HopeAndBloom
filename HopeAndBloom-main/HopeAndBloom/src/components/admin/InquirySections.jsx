import { InquiryList } from './InquiryList.jsx';

export function DashboardSection({
  inquiries,
  publishedProgramCount,
  inquiryError,
  onDeleteInquiry,
  onUpdateInquiry,
  onViewInquiries
}) {
  return (
    <>
      <section className="admin-stats" aria-label="Website overview">
        <article className="admin-stat-card">
          <span className="admin-stat-icon admin-stat-teal" aria-hidden="true">✉</span>
          <span className="admin-stat-label">Demo inquiries</span>
          <strong>{inquiries.length}</strong>
          <span className="admin-stat-caption">Stored in this browser only</span>
        </article>
        <article className="admin-stat-card">
          <span className="admin-stat-icon admin-stat-gold" aria-hidden="true">▦</span>
          <span className="admin-stat-label">Upcoming consultations</span>
          <strong>0</strong>
          <span className="admin-stat-caption">Online booking is not connected</span>
        </article>
        <article className="admin-stat-card">
          <span className="admin-stat-icon admin-stat-coral" aria-hidden="true">✿</span>
          <span className="admin-stat-label">Website programs</span>
          <strong>{publishedProgramCount}</strong>
          <span className="admin-stat-caption">Published on the website in this browser</span>
        </article>
      </section>

      <section className="admin-panel" aria-labelledby="admin-recent-title">
        <div className="admin-panel-heading">
          <div>
            <h2 id="admin-recent-title">Recent inquiries</h2>
            <p>New messages from families</p>
          </div>
          <button className="admin-text-button" type="button" onClick={onViewInquiries}>
            View inquiries <span aria-hidden="true">→</span>
          </button>
        </div>
        <InquiryList
          items={inquiries.slice(0, 3)}
          error={inquiryError}
          onDelete={onDeleteInquiry}
          onUpdate={onUpdateInquiry}
        />
      </section>
    </>
  );
}

export function InquiriesSection({
  inquiries,
  inquiryError,
  onDeleteInquiry,
  onUpdateInquiry,
  onAddInquiry
}) {
  return (
    <section className="admin-panel" aria-label="Inquiries">
      <div className="admin-panel-heading">
        <div>
          <h2>Consultation inquiries</h2>
          <p>
            {inquiries.length} demo {inquiries.length === 1 ? 'inquiry' : 'inquiries'} stored in this browser
          </p>
        </div>
        <button className="admin-text-button" type="button" onClick={onAddInquiry}>
          Add inquiry <span aria-hidden="true">+</span>
        </button>
      </div>
      <InquiryList
        items={inquiries}
        error={inquiryError}
        onDelete={onDeleteInquiry}
        onUpdate={onUpdateInquiry}
      />
    </section>
  );
}
