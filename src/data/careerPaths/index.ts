
import productManagementPath from './productCareerPath';
import { careerOptions } from '../../types/emphasis';

// Define an empty career path that will be populated only via CSV upload
const emptySoftwareCareerPath = {
  id: "software",
  name: "Software Engineering",
  description: "Trilha de conhecimento para profissionais de engenharia de software",
  branches: [],
  tags: [],
  specialties: careerOptions.find(c => c.id === "software")?.specialties || ["front-end", "back-end"]
};

// Create an initial product path with empty branches
const emptyProductPath = {
  ...productManagementPath,
  branches: [],
  specialties: careerOptions.find(c => c.id === "product-management")?.specialties || ["value-refinement"]
};

export const careerPaths = [emptySoftwareCareerPath, emptyProductPath];
