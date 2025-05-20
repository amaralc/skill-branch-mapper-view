
export type Emphasis = {
  id: string;
  label: string;
  icon: string;
  group: "especialidade";
};

export type Career = {
  id: string;
  label: string;
  specialties: string[];
};

export const emphasisOptions: Emphasis[] = [
  {
    id: "front-end",
    label: "Front-End",
    icon: "front-end",
    group: "especialidade",
  },
  {
    id: "back-end",
    label: "Back-End",
    icon: "back-end",
    group: "especialidade",
  },
  {
    id: "engineering-and-data-science",
    label: "Data Science",
    icon: "engineering-and-data-science",
    group: "especialidade",
  },
  { id: "mobile", label: "Mobile", icon: "mobile", group: "especialidade" },
  {
    id: "cloud",
    label: "Cloud Infrastructure",
    icon: "cloud",
    group: "especialidade",
  },
  {
    id: "value-refinement",
    label: "Value Refinement",
    icon: "value-refinement",
    group: "especialidade",
  },
];

export const careerOptions: Career[] = [
  {
    id: "front-end",
    label: "Front-End",
    specialties: ["front-end"],
  },
  {
    id: "back-end",
    label: "Back-End",
    specialties: ["back-end"],
  },
  {
    id: "mobile",
    label: "Mobile",
    specialties: ["mobile"],
  },
  {
    id: "engineering-and-data-science",
    label: "Engineering and Data Science",
    specialties: ["back-end", "engineering-and-data-science"],
  },
  {
    id: "full-stack",
    label: "Full-Stack",
    specialties: ["front-end", "back-end"],
  },
  {
    id: "qa",
    label: "QA",
    specialties: ["value-refinement"],
  },
  {
    id: "cloud-infrastructure",
    label: "Cloud Infrastructure",
    specialties: ["back-end", "cloud"],
  },
];
