
import { SkillPath } from '../../types/skill';

const productManagementPath: SkillPath = {
  id: "product-management",
  name: "Gestão de Produtos",
  description: "Trilha de habilidades essenciais para profissionais de gestão de produtos.",
  branches: [
    {
      id: "prod1",
      name: "Fundamentos de Gestão de Produtos",
      color: "#f97316",
      commits: [
        {
          id: "pcommit1",
          behaviorDescription: "Identificar e compreender as necessidades do usuário.",
          evaluation: null,
          updatedAt: null
        },
        {
          id: "pcommit2",
          behaviorDescription: "Definir a visão do produto e alinhar ao negócio.",
          evaluation: null,
          updatedAt: null
        }
      ],
      levelRequirements: [
        { tagId: "nivel1", pointsRequired: 1 },
        { tagId: "nivel2", pointsRequired: 3 }
      ]
    }
  ],
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
