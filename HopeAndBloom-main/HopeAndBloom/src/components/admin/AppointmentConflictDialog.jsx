import { useEffect, useRef } from 'react';
import { fromDateKey } from '../../utils/date.js';

export function AppointmentConflictDialog({ conflict, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (conflict && !dialog.open) {
      dialog.showModal();
    } else if (!conflict && dialog.open) {
      dialog.close();
    }
  }, [conflict]);

  return (
    <dialog
      ref={dialogRef}
      className="appointment-conflict-dialog"
      aria-labelledby="appointment-conflict-title"
      aria-describedby="appointment-conflict-description"
      onCancel={onClose}
    >
      {conflict && (
        <>
          <div className="appointment-conflict-icon" aria-hidden="true">!</div>
          {conflict.reason === 'APPOINTMENT_PAST_DATE' ? (
            <>
              <p className="appointment-conflict-eyebrow">DATE NO LONGER AVAILABLE</p>
              <h2 id="appointment-conflict-title">This date has already passed</h2>
              <p id="appointment-conflict-description">
                Appointments can’t be booked for {fromDateKey(conflict.date).toLocaleDateString(undefined, {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}.
              </p>
              <p className="appointment-conflict-tip">Please choose today or a future date.</p>
            </>
          ) : (
            <>
              <p className="appointment-conflict-eyebrow">SCHEDULE CONFLICT</p>
              <h2 id="appointment-conflict-title">This schedule is full</h2>
              <p id="appointment-conflict-description">
                {conflict.name} already has a {conflict.type.toLowerCase()} appointment
                {' '}on {fromDateKey(conflict.date).toLocaleDateString(undefined, {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })} at {conflict.time}.
              </p>
              <p className="appointment-conflict-tip">Please choose another available time.</p>
            </>
          )}
          <button
            className="btn appointment-conflict-close"
            type="button"
            onClick={onClose}
          >
            {conflict.reason === 'APPOINTMENT_PAST_DATE' ? 'Choose another date' : 'Choose another time'}
          </button>
        </>
      )}
    </dialog>
  );
}
