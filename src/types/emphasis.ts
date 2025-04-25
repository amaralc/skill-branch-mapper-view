
export type Emphasis = {
  id: string;
  label: string;
  icon: string;
};

export const emphasisOptions: Emphasis[] = [
  { id: 'front-end', label: 'Front-End', icon: 'front-end' },
  { id: 'back-end', label: 'Back-End', icon: 'back-end' },
  { id: 'full-stack', label: 'Full-Stack', icon: 'full-stack' },
  { id: 'data-science', label: 'Data Science', icon: 'data-science' },
  { id: 'mobile', label: 'Mobile', icon: 'mobile' },
  { id: 'cloud', label: 'Cloud Infrastructure', icon: 'cloud' },
  { id: 'firmware', label: 'Firmware', icon: 'firmware' }
];
