export function ProgramsSection({
  programs,
  programError,
  programNotice,
  editingProgramId,
  programForm,
  setProgramForm,
  onSaveProgram,
  onEditProgram,
  onToggleProgramVisibility,
  onCancelEdit
}) {
  return (
    <section className="admin-panel admin-programs-panel" aria-label="Manage website programs">
      <div className="admin-panel-heading">
        <div>
          <h2>Program catalog</h2>
          <p>{programs.filter((program) => program.active).length} published · {programs.length} total</p>
        </div>
        <span className="admin-readonly-label">LOCAL DEMO</span>
      </div>
      <p className="admin-programs-help">Add or edit a service, then publish or hide it from the public Programs section. Changes stay in this browser.</p>
      {programError && <p className="admin-inquiry-error" role="alert">{programError}</p>}
      {programNotice && <p className="admin-appointment-notice" role="status">{programNotice}</p>}
    
      <div className="admin-program-manager">
        <div className="admin-program-manager-list">
          {programs.map((program) => (
            <article className={`admin-program-card${program.active ? '' : ' is-hidden'}`} key={program.id}>
              <div className="admin-program-card-heading">
                <div>
                  <span className={`admin-program-state${program.active ? ' is-published' : ''}`}>
                    {program.active ? 'Published' : 'Hidden'}
                  </span>
                  <h3>{program.title}</h3>
                  <p className="admin-program-age">{program.age}</p>
                </div>
                <div className="admin-program-actions">
                  <button className="admin-done-button" type="button" onClick={() => onEditProgram(program)}>
                    Edit
                  </button>
                  <button className="admin-delete-button" type="button" onClick={() => onToggleProgramVisibility(program)}>
                    {program.active ? 'Hide' : 'Publish'}
                  </button>
                </div>
              </div>
              <p className="admin-program-description">{program.description}</p>
            </article>
          ))}
        </div>
    
        <form className="admin-panel admin-program-form" onSubmit={onSaveProgram}>
          <h3>{editingProgramId ? 'Edit program' : 'Add a program'}</h3>
          <p>{editingProgramId ? 'Update the details shown to families.' : 'New programs are published on this browser’s website preview.'}</p>
          <div className="form-group">
            <label htmlFor="program-title">Program name</label>
            <input
              id="program-title"
              required
              maxLength="100"
              value={programForm.title}
              onChange={(event) => setProgramForm({ ...programForm, title: event.target.value })}
              placeholder="e.g. Play and Learning"
            />
          </div>
          <div className="form-group">
            <label htmlFor="program-age">Age range or group</label>
            <input
              id="program-age"
              required
              maxLength="80"
              value={programForm.age}
              onChange={(event) => setProgramForm({ ...programForm, age: event.target.value })}
              placeholder="e.g. Ages 3–6"
            />
          </div>
          <div className="form-group">
            <label htmlFor="program-description">Description</label>
            <textarea
              id="program-description"
              required
              maxLength="1200"
              rows="5"
              value={programForm.description}
              onChange={(event) => setProgramForm({ ...programForm, description: event.target.value })}
              placeholder="Describe the service for families."
            />
          </div>
          <button className="btn admin-program-submit" type="submit">
            <span>{editingProgramId ? 'Save changes' : 'Add and publish'}</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </button>
          {editingProgramId && (
            <button className="admin-program-cancel" type="button" onClick={onCancelEdit}>
              Cancel edit
            </button>
          )}
        </form>
      </div>
    </section>
  );
}
