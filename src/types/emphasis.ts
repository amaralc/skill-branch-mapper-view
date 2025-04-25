
export type Emphasis = {
  id: string;
  label: string;
  icon: string;
  group: 'especialidade';
};

export const emphasisOptions: Emphasis[] = [
  { id: 'front-end', label: 'Front-End', icon: 'front-end', group: 'especialidade' },
  { id: 'back-end', label: 'Back-End', icon: 'back-end', group: 'especialidade' },
  { id: 'full-stack', label: 'Full-Stack', icon: 'full-stack', group: 'especialidade' },
  { id: 'data-science', label: 'Data Science', icon: 'data-science', group: 'especialidade' },
  { id: 'mobile', label: 'Mobile', icon: 'mobile', group: 'especialidade' },
  { id: 'cloud', label: 'Cloud Infrastructure', icon: 'cloud', group: 'especialidade' },
  { id: 'firmware', label: 'Firmware', icon: 'firmware', group: 'especialidade' }
];

