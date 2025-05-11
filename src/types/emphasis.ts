export type Emphasis = {
  id: string;
  label: string;
  icon: string;
  group: "especialidade";
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
  // Removing Full-Stack as requested
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
    id: "firmware",
    label: "Firmware",
    icon: "firmware",
    group: "especialidade",
  },
];
