import { fromDateKey, toDateKey } from '../../utils/date.js';

export function AppointmentSection({
  appointments,
  appointmentError,
  appointmentNotice,
  selectedDate,
  onSelectDate,
  onMoveMonth,
  onDeleteAppointment,
  onAddAppointment
}) {
  const selectedDateValue = fromDateKey(selectedDate);
  const firstDayOfMonth = new Date(selectedDateValue.getFullYear(), selectedDateValue.getMonth(), 1);
  const daysInMonth = new Date(selectedDateValue.getFullYear(), selectedDateValue.getMonth() + 1, 0).getDate();
  const calendarCells = Array.from(
    { length: firstDayOfMonth.getDay() + daysInMonth },
    (_, index) => index < firstDayOfMonth.getDay() ? null : index - firstDayOfMonth.getDay() + 1
  );
  const appointmentCounts = appointments.reduce((counts, appointment) => {
    counts[appointment.date] = (counts[appointment.date] || 0) + 1;
    return counts;
  }, {});
  const selectedDayAppointments = appointments
    .filter((appointment) => appointment.date === selectedDate)
    .sort((first, second) => first.time.localeCompare(second.time));

  return (
    <div className="admin-appointment-layout">
      <section className="admin-panel admin-calendar-panel" aria-label="Appointment calendar">
        <div className="admin-calendar-heading">
          <div>
            <h2>Appointment calendar</h2>
            <p>Appointments are stored in this browser only.</p>
          </div>
          <div className="admin-calendar-month-controls">
            <button type="button" aria-label="Previous month" onClick={() => onMoveMonth(-1)}>‹</button>
            <button type="button" aria-label="Next month" onClick={() => onMoveMonth(1)}>›</button>
          </div>
        </div>
        <h3 className="admin-calendar-month">
          {selectedDateValue.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
        </h3>
        <div className="admin-calendar-grid" aria-label="Calendar days">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <span className="admin-calendar-weekday" key={day}>{day}</span>
          ))}
          {calendarCells.map((day, index) => {
            if (day === null) {
              return <span className="admin-calendar-blank" key={`blank-${index}`} aria-hidden="true" />;
            }
    
            const date = new Date(
              selectedDateValue.getFullYear(),
              selectedDateValue.getMonth(),
              day
                        );
                        const dateKey = toDateKey(date);
                        const count = appointmentCounts[dateKey] || 0;
                        return (
                          <button
                            className={`admin-calendar-day${dateKey === selectedDate ? ' is-selected' : ''}${dateKey === toDateKey(new Date()) ? ' is-today' : ''}`}
                            type="button"
                            key={dateKey}
                            aria-pressed={dateKey === selectedDate}
                            aria-label={`${date.toLocaleDateString()}${count ? `, ${count} ${count === 1 ? 'appointment' : 'appointments'}` : ''}`}
                            onClick={() => {
                              onSelectDate(dateKey);
                            }}
                          >
                            <span>{day}</span>
                            {count > 0 && <span className="admin-calendar-count">{count}</span>}
                          </button>
                        );
                      })}
                    </div>
                  </section>
    
                  <div className="admin-appointment-details">
                    <section className="admin-panel admin-selected-day" aria-label="Selected day appointments">
                      <div className="admin-panel-heading">
                        <div>
                          <h2>{selectedDateValue.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</h2>
                          <p>{selectedDayAppointments.length} {selectedDayAppointments.length === 1 ? 'appointment' : 'appointments'}</p>
                        </div>
                      </div>
                      {appointmentError && <p className="admin-inquiry-error" role="alert">{appointmentError}</p>}
                      {!appointmentError && !selectedDayAppointments.length && (
                        <p className="admin-calendar-empty">No appointments on this day.</p>
                      )}
                      {!appointmentError && selectedDayAppointments.map((appointment) => (
                        <article className="admin-appointment-card" key={appointment.id}>
                          <div>
                            <time>{appointment.time}</time>
                            <h3>{appointment.name}</h3>
                            <p>{appointment.type}</p>
                            {appointment.notes && <p className="admin-appointment-notes">{appointment.notes}</p>}
                          </div>
                          <button
                            className="admin-delete-button"
                            type="button"
                            onClick={() => onDeleteAppointment(appointment.id)}
                            aria-label={`Delete ${appointment.type} appointment for ${appointment.name}`}
                          >
                            Delete
                          </button>
                        </article>
                      ))}
                    </section>
    
                    <section className="admin-panel admin-new-appointment" aria-label="Create a demo appointment">
                      <h2>Add appointment</h2>
                      <p className="admin-new-appointment-date">
                        {selectedDateValue.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                      <form className="admin-appointment-form" onSubmit={onAddAppointment}>
                        <div className="form-group">
                          <label htmlFor="appointment-client">Client name</label>
                          <input id="appointment-client" name="clientName" required maxLength="120" placeholder="Test client name" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="appointment-time">Time</label>
                          <input id="appointment-time" name="time" type="time" required defaultValue="09:00" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="appointment-type">Appointment type</label>
                          <select id="appointment-type" name="type" defaultValue="Consultation">
                            <option>Consultation</option>
                            <option>Assessment</option>
                            <option>Therapy session</option>
                            <option>Parent coaching</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="appointment-notes">Notes (optional)</label>
                          <textarea id="appointment-notes" name="notes" rows="2" maxLength="1000" placeholder="Demo note" />
                        </div>
                        <button className="btn admin-appointment-submit" type="submit">
                          <span>Add demo appointment</span>
                          <span className="btn-arrow" aria-hidden="true">→</span>
                        </button>
                        {appointmentNotice && <p className="admin-appointment-notice" role="status">{appointmentNotice}</p>}
                      </form>
                    </section>
                  </div>
                </div>
  );
}
