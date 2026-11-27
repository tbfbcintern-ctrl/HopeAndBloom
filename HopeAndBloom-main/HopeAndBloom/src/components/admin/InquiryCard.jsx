import { useEffect, useState } from 'react';

export function InquiryCard({ inquiry, onDelete, onUpdate }) {
  const [comment, setComment] = useState(inquiry.comment);
  const [commentSaved, setCommentSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    setComment(inquiry.comment);
  }, [inquiry.comment]);

  const saveComment = () => {
    if (onUpdate(inquiry.id, { comment })) {
      setCommentSaved(true);
    }
  };

  const markDone = () => {
    onUpdate(inquiry.id, { status: inquiry.status === 'done' ? 'open' : 'done' });
  };

  const startEditing = () => {
    setEditForm({
      name: inquiry.name,
      contactNumber: inquiry.contactNumber || '',
      email: inquiry.email,
      relationship: inquiry.relationship || '',
      childName: inquiry.childName || '',
      age: inquiry.age,
      address: inquiry.address || '',
      message: inquiry.message
    });
    setIsEditing(true);
  };

  const saveEdits = (event) => {
    event.preventDefault();
    if (onUpdate(inquiry.id, editForm)) {
      setIsEditing(false);
    }
  };

  return (
    <article className={`admin-inquiry-card${inquiry.status === 'done' ? ' is-done' : ''}`}>
      {isEditing ? (
        <form className="admin-walk-in-form admin-inquiry-edit-form" onSubmit={saveEdits}>
          <div className="admin-walk-in-heading">
            <h3>Edit inquiry</h3>
          </div>
          <div className="admin-walk-in-grid">
            <div className="form-group">
              <label htmlFor={`inquiry-name-${inquiry.id}`}>Parent or Guardian Name</label>
              <input id={`inquiry-name-${inquiry.id}`} required value={editForm.name} onChange={(event) => setEditForm({ ...editForm, name: event.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor={`inquiry-contact-${inquiry.id}`}>Contact Number</label>
              <input id={`inquiry-contact-${inquiry.id}`} type="tel" required value={editForm.contactNumber} onChange={(event) => setEditForm({ ...editForm, contactNumber: event.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor={`inquiry-email-${inquiry.id}`}>Email Address</label>
              <input id={`inquiry-email-${inquiry.id}`} type="email" value={editForm.email} onChange={(event) => setEditForm({ ...editForm, email: event.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor={`inquiry-relationship-${inquiry.id}`}>Relationship to the Child</label>
              <select id={`inquiry-relationship-${inquiry.id}`} value={editForm.relationship} onChange={(event) => setEditForm({ ...editForm, relationship: event.target.value })}>
                <option value="">Select relationship</option>
                <option value="parent">Parent</option>
                <option value="guardian">Guardian</option>
                <option value="grandparent">Grandparent</option>
                <option value="teacher">Teacher</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor={`inquiry-child-name-${inquiry.id}`}>Child's Name</label>
              <input id={`inquiry-child-name-${inquiry.id}`} value={editForm.childName} onChange={(event) => setEditForm({ ...editForm, childName: event.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor={`inquiry-age-${inquiry.id}`}>Child's Age</label>
              <select id={`inquiry-age-${inquiry.id}`} required value={editForm.age} onChange={(event) => setEditForm({ ...editForm, age: event.target.value })}>
                <option value="under-3">Under 3 years old</option>
                <option value="3-5">3 to 5 years old</option>
                <option value="6-12">6 to 12 years old</option>
                <option value="13-plus">13+ years old</option>
              </select>
            </div>
            <div className="form-group admin-walk-in-full">
              <label htmlFor={`inquiry-address-${inquiry.id}`}>Address</label>
              <input id={`inquiry-address-${inquiry.id}`} value={editForm.address} onChange={(event) => setEditForm({ ...editForm, address: event.target.value })} />
            </div>
            <div className="form-group admin-walk-in-full">
              <label htmlFor={`inquiry-message-${inquiry.id}`}>How Can We Help?</label>
              <textarea id={`inquiry-message-${inquiry.id}`} rows="3" value={editForm.message} onChange={(event) => setEditForm({ ...editForm, message: event.target.value })} />
            </div>
          </div>
          <div className="admin-inquiry-actions">
            <button className="admin-done-button" type="submit">Save changes</button>
            <button className="admin-delete-button" type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
      <>
      <div className="admin-inquiry-heading">
        <div>
          <div className="admin-inquiry-title-row">
            <h3>{inquiry.name}</h3>
            <span className={`admin-inquiry-status${inquiry.status === 'done' ? ' is-done' : ''}`}>
              {inquiry.status === 'done' ? 'Done' : 'Open'}
            </span>
          </div>
          {inquiry.email && <a href={`mailto:${inquiry.email}`}>{inquiry.email}</a>}
          {inquiry.source === 'walk-in' && <span className="admin-inquiry-source">Walk-in</span>}
          {inquiry.contactNumber && (
            <a href={`tel:${inquiry.contactNumber}`}>{inquiry.contactNumber}</a>
          )}
        </div>
        <div className="admin-inquiry-actions">
          <button className="admin-done-button" type="button" onClick={startEditing}>Edit</button>
          <button
            className="admin-done-button"
            type="button"
            onClick={markDone}
          >
            {inquiry.status === 'done' ? 'Reopen' : 'Mark as done'}
          </button>
          <button
            className="admin-delete-button"
            type="button"
            onClick={() => onDelete(inquiry.id)}
            aria-label={`Delete inquiry from ${inquiry.name}`}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="admin-inquiry-meta">
        {inquiry.childName && <span>Child: {inquiry.childName}</span>}
        <span>Child age: {inquiry.age}</span>
        {inquiry.relationship && <span>Relationship: {inquiry.relationship}</span>}
        {inquiry.address && <span>Address: {inquiry.address}</span>}
        <time dateTime={inquiry.createdAt}>{new Date(inquiry.createdAt).toLocaleString()}</time>
      </div>
      {inquiry.message && <p className="admin-inquiry-message">{inquiry.message}</p>}
      <div className="admin-inquiry-comment">
        <label htmlFor={`inquiry-comment-${inquiry.id}`}>Internal comment</label>
        <textarea
          id={`inquiry-comment-${inquiry.id}`}
          rows="3"
          maxLength="1000"
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
            setCommentSaved(false);
          }}
          placeholder="Add a note about the follow-up..."
        />
        <div className="admin-inquiry-comment-actions">
          <button className="admin-done-button" type="button" onClick={saveComment}>
            Save comment
          </button>
          {commentSaved && <span role="status">Saved in this browser</span>}
        </div>
      </div>
      </>
      )}
    </article>
  );
}
