
export type Emphasis = {
  id: string;
  label: string;
  icon: string;
  group: 'especialidade';
};

// Default options will be replaced with data from CSV when available
export const emphasisOptions: Emphasis[] = [
  { id: 'front-end', label: 'Front-End', icon: 'front-end', group: 'especialidade' },
  { id: 'back-end', label: 'Back-End', icon: 'back-end', group: 'especialidade' },
  { id: 'data-science', label: 'Data Science', icon: 'data-science', group: 'especialidade' },
  { id: 'mobile', label: 'Mobile', icon: 'mobile', group: 'especialidade' },
  { id: 'cloud', label: 'Cloud Infrastructure', icon: 'cloud', group: 'especialidade' },
  { id: 'firmware', label: 'Firmware', icon: 'firmware', group: 'especialidade' }
];
