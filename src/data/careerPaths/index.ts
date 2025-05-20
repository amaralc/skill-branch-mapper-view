
import softwareCareerPath from './softwareCareerPath';
import productManagementPath from './productCareerPath';
import { commonBranches } from './allCareerPaths';
import { careerOptions } from '../../types/emphasis';

// Função auxiliar para adicionar branches comuns a um skillPath
const addCommonBranches = (skillPath: typeof softwareCareerPath) => ({
  ...skillPath,
  branches: [...commonBranches, ...skillPath.branches]
});

// Adiciona as branches comuns a todos os caminhos de carreira
const enhancedSoftwarePath = addCommonBranches({
  ...softwareCareerPath,
  specialties: careerOptions.find(c => c.id === "software")?.specialties || ["front-end", "back-end"]
});

const enhancedProductPath = addCommonBranches({
  ...productManagementPath,
  specialties: careerOptions.find(c => c.id === "product-management")?.specialties || ["value-refinement"]
});

export const careerPaths = [enhancedSoftwarePath, enhancedProductPath];
