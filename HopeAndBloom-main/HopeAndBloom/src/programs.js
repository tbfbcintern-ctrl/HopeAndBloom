const STORAGE_KEY = 'hope-and-bloom:demo-programs:v1';
export const PROGRAMS_UPDATED_EVENT = 'hope-and-bloom:programs-updated';

export const DEFAULT_PROGRAMS = [
  {
    id: 'early-intervention',
    age: 'Ages 18mo – 6yrs',
    title: 'Early Intervention',
    description: 'Intensive, warm one-on-one therapy for toddlers and young children building foundational words, imitation, play, and emotional regulation.',
    active: true
  },
  {
    id: 'communication-skills',
    age: 'All Ages',
    title: 'Communication Skills',
    description: 'Verbal speech, gestures, PECS, or AAC devices — we empower your child with the exact tools they need to express their needs and thoughts.',
    active: true
  },
  {
    id: 'social-skills-play',
    age: 'Peer Groups',
    title: 'Social Skills & Play',
    description: 'Small, carefully matched peer groups where children practice sharing, taking turns, reciprocal play, and making authentic friendships.',
    active: true
  },
  {
    id: 'daily-living-routines',
    age: 'Independence',
    title: 'Daily Living Routines',
    description: 'Fostering autonomy in everyday essentials: independent dressing, mealtime habits, personal hygiene, and gentle toileting routines.',
    active: true
  },
  {
    id: 'parent-training-coaching',
    age: 'Family First',
    title: 'Parent Training & Coaching',
    description: 'Hands-on coaching and practical guidance for parents, siblings, and caregivers so positive habits thrive smoothly at home.',
    active: true
  },
  {
    id: 'school-transition-support',
    age: 'School Ready',
    title: 'School Transition Support',
    description: 'Collaborative coordination with teachers, IEP advocacy, and classroom-readiness skills for confident school integration.',
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
