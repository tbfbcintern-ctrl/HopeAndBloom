const STORAGE_KEY = 'hope-and-bloom:demo-programs:v2';
export const PROGRAMS_UPDATED_EVENT = 'hope-and-bloom:programs-updated';

export const DEFAULT_PROGRAMS = [
  {
    id: 'individualized-aba',
    age: '4.1',
    title: 'Individualized ABA Therapy (1:1)',
    description: 'Individualized behavioral intervention based on the learner’s developmental profile, strengths, needs, and assessment results. Each learner completes an initial assessment, receives an individualized program and intervention plan, and is monitored through continuous progress tracking and periodic reassessment.',
    active: true
  },
  {
    id: 'classroom-simulation',
    age: '4.2',
    title: 'Classroom Simulation Program',
    description: 'Structured opportunities for children to experience classroom situations and participate in group-based learning before entering an actual school environment.',
    active: true
  },
  {
    id: 'daily-living',
    age: '4.3',
    title: 'Daily Living Activities (DLA) Program',
    description: 'Practical competencies that help children function more independently at home and in the community through supported practice of personal care, laundry, kitchen skills, household maintenance, organization, food preparation, safety, and money awareness.',
    active: true
  },
  {
    id: 'vocational-training',
    age: '4.4',
    title: 'Vocational Training Program',
    description: 'Foundational work behaviors and practical competencies that support independence and future employment, including task initiation and completion, work endurance, following instructions, responsibility, independence, attention, adaptability, teamwork, work habits, and communication.',
    active: true
  }
];

function isProgram(value) {
  return value !== null
    && typeof value === 'object'
    && typeof value.id === 'string'
    && typeof value.title === 'string'
    && typeof value.age === 'string'
    && typeof value.description === 'string'
    && typeof value.active === 'boolean';
}

export function getPrograms() {
  const storedValue = window.localStorage.getItem(STORAGE_KEY);
  if (storedValue === null) {
    return DEFAULT_PROGRAMS.map((program) => ({ ...program }));
  }

  let programs;
  try {
    programs = JSON.parse(storedValue);
  } catch {
    throw new Error('Saved demo programs are unreadable. Clear this site’s local storage and try again.');
  }

  if (!Array.isArray(programs) || !programs.every(isProgram)) {
    throw new Error('Saved demo programs have an invalid format. Clear this site’s local storage and try again.');
  }

  return programs;
}

export function savePrograms(programs) {
  if (!Array.isArray(programs) || !programs.every(isProgram)) {
    throw new Error('Programs must include a title, audience, description, and visibility status.');
  }

  getPrograms();

  const programIds = programs.map((program) => program.id);
  if (new Set(programIds).size !== programIds.length) {
    throw new Error('Each program must have a unique ID.');
  }

  const hasInvalidContent = programs.some((program) => (
    !program.id.trim()
    || !program.title.trim()
    || program.title.length > 100
    || !program.age.trim()
    || program.age.length > 80
    || !program.description.trim()
    || program.description.length > 1200
  ));
  if (hasInvalidContent) {
    throw new Error('Add a title, target audience, and description within the allowed length.');
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(programs));
  window.dispatchEvent(new Event(PROGRAMS_UPDATED_EVENT));
}
