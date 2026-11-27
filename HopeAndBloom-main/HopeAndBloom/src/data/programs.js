import { readStoredJson, writeStoredJson } from './storage.js';

const STORAGE_KEY = 'hope-and-bloom:demo-programs:v1';
export const PROGRAMS_UPDATED_EVENT = 'hope-and-bloom:programs-updated';

const LEGACY_PROGRAM_IDS = new Set([
  'early-intervention',
  'communication-skills',
  'social-skills-play',
  'daily-living-routines',
  'parent-training-coaching',
  'school-transition-support'
]);

export const DEFAULT_PROGRAMS = [
  {
    id: 'individualized-aba-therapy',
    age: 'One-to-one support',
    title: 'Individualized ABA Therapy (1:1)',
    description: 'Personalized, one-to-one support built around each child’s strengths, needs, and learning goals.',
    objectives: [
      'Build communication, understanding, and readiness to learn.',
      'Grow independence with everyday and learning tasks.',
      'Practice positive behaviors, play, and social interaction.',
      'Support emotional regulation and coping.',
      'Develop early learning and pre-academic skills.'
    ],

    active: true
  },
  {
    id: 'classroom-simulation',
    age: 'Practice for school',
    title: 'Classroom Simulation Program',
    description: 'A friendly practice classroom where children can learn routines and group skills before starting school.',
    objectives: [
      'Join group activities and follow instructions and routines.',
      'Practice paying attention, waiting, and moving between activities.',
      'Build peer skills through sharing and taking turns.',
      'Finish tasks and grow independence.',
      'Practice flexibility when plans or routines change.'
    ],
    active: true
  },
  {
    id: 'daily-living-activities',
    age: 'Everyday independence',
    title: 'Daily Living Activities (DLA) Program',
    description: 'Hands-on practice with everyday home and community skills, helping children grow confidence and independence.',
    objectives: [
      'Build confidence with personal care and household tasks.',
      'Practice organizing, sequencing, and following directions.',
      'Grow safety awareness and responsibility.',
      'Use communication and decision-making in daily activities.'
    ],

    active: true
  },
  {
    id: 'vocational-training',
    age: 'Work readiness',
    title: 'Vocational Training Program',
    description: 'Builds practical work habits for future participation in the community and employment, at a pace suited to each learner.',
    objectives: [
      'Practice starting and finishing tasks and following instructions.',
      'Build responsibility and work stamina at an individual pace.',
      'Grow independence, attention to detail, and adaptability.',
      'Develop teamwork and positive communication.'
    ],
    active: true
  }
];

const isStringArray = (value) => (
  value === undefined || (Array.isArray(value) && value.every((item) => typeof item === 'string'))
);

function isProgram(value) {
  return value !== null
    && typeof value === 'object'
    && typeof value.id === 'string'
    && typeof value.title === 'string'
    && typeof value.age === 'string'
    && typeof value.description === 'string'
    && typeof value.active === 'boolean'
    && isStringArray(value.objectives)
    && (value.implementation === undefined || typeof value.implementation === 'string')
    && (value.modules === undefined || (
      Array.isArray(value.modules)
      && value.modules.every((module) => (
        module !== null
        && typeof module === 'object'
        && typeof module.name === 'string'
        && typeof module.activities === 'string'
      ))
    ))
    && (value.assessmentFocus === undefined || typeof value.assessmentFocus === 'string');
}

export function getPrograms() {
  const programs = readStoredJson(
    STORAGE_KEY,
    'Saved demo programs are unreadable. Clear this site’s local storage and try again.'
  );
  if (programs === null) {
    return DEFAULT_PROGRAMS.map((program) => ({ ...program }));
  }

  if (!Array.isArray(programs) || !programs.every(isProgram)) {
    throw new Error('Saved demo programs have an invalid format. Clear this site’s local storage and try again.');
  }

  if (programs.some((program) => LEGACY_PROGRAM_IDS.has(program.id))) {
    const defaultProgramIds = new Set(DEFAULT_PROGRAMS.map((program) => program.id));
    const savedDefaults = new Map(
      programs
        .filter((program) => defaultProgramIds.has(program.id))
        .map((program) => [program.id, program])
    );
    const customPrograms = programs.filter((program) => (
      !LEGACY_PROGRAM_IDS.has(program.id) && !defaultProgramIds.has(program.id)
    ));

    return [
      ...DEFAULT_PROGRAMS.map((program) => ({
        ...program,
        ...savedDefaults.get(program.id)
      })),
      ...customPrograms
    ];
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

  writeStoredJson(STORAGE_KEY, programs, PROGRAMS_UPDATED_EVENT);
}
