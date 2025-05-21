
import productManagementPath from './productCareerPath';
import softwareCareerPath from './softwareCareerPath';
import { careerOptions } from '../../types/emphasis';

// Define an empty career path that will be populated only via CSV upload
const emptySoftwareCareerPath = {
  ...softwareCareerPath,
  branches: [],
  specialties: careerOptions.find(c => c.id === "software")?.specialties || []
};

// Create an initial product path with empty branches
const emptyProductPath = {
  ...productManagementPath,
  branches: [],
  specialties: careerOptions.find(c => c.id === "product-management")?.specialties || []
};

export const careerPaths = [emptySoftwareCareerPath, emptyProductPath];
