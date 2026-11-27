import { EmptyState } from './EmptyState.jsx';
import { InquiryCard } from './InquiryCard.jsx';

export function InquiryList({ items, error, onDelete, onUpdate }) {
  if (error) {
    return <p className="admin-inquiry-error" role="alert">{error}</p>;
  }

  if (!items.length) {
    return (
      <EmptyState icon="✉" title="No inquiries to show">
        Submit the website contact form with test details to see a demo inquiry here. No message is sent.
      </EmptyState>
    );
  }

  return (
    <div className="admin-inquiry-list">
      {items.map((inquiry) => (
        <InquiryCard
          key={inquiry.id}
          inquiry={inquiry}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
