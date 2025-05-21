
import { SkillPath } from '../../types/skill';

const productManagementPath: SkillPath = {
  id: "product-management",
  name: "Gestão de Produtos",
  description: "Trilha de habilidades essenciais para profissionais de gestão de produtos.",
  branches: [],
  tags: [
    {
      id: "nivel1",
      name: "Nível 1 - Júnior",
      level: "Júnior",
      code: "L2-T",
      track: "T",
      pointsRequired: 2,
      description: "Conhecimento inicial sobre produto."
    },
    {
      id: "nivel2",
      name: "Nível 2 - Pleno",
      level: "Pleno",
      code: "L3-T",
      track: "T",
      pointsRequired: 4,
      description: "Experiência intermediária em gestão de produtos."
    }
  ]
};

export default productManagementPath;
