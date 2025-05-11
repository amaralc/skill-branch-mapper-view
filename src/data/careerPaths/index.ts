
import softwareCareerPath from './softwareCareerPath';
import productManagementPath from './productCareerPath';
import { commonBranches } from './allCareerPaths';

// Função auxiliar para adicionar branches comuns a um skillPath
const addCommonBranches = (skillPath: typeof softwareCareerPath) => ({
  ...skillPath,
  branches: [...commonBranches, ...skillPath.branches]
});

// Adiciona as branches comuns a todos os caminhos de carreira
const enhancedSoftwarePath = addCommonBranches(softwareCareerPath);
const enhancedProductPath = addCommonBranches(productManagementPath);

export const careerPaths = [enhancedSoftwarePath, enhancedProductPath];
