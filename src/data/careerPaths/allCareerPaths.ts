
import { Branch } from '@/types/skill';

export const commonBranches: Branch[] = [
  {
    id: "communication",
    name: "Comunicação",
    color: "#0ea5e9",
    commits: [
      {
        id: "comm1",
        behaviorDescription: "Expressa ideias de forma clara e concisa em comunicações escritas.",
        evaluation: null
      },
      {
        id: "comm2",
        behaviorDescription: "Adapta o estilo de comunicação para diferentes públicos.",
        evaluation: null
      },
      {
        id: "comm3",
        behaviorDescription: "Escuta ativamente e demonstra compreensão das perspectivas dos outros.",
        evaluation: null
      },
      {
        id: "comm4",
        behaviorDescription: "Fornece e recebe feedback construtivo de forma profissional.",
        evaluation: null
      },
      {
        id: "comm5",
        behaviorDescription: "Facilita discussões e reuniões de forma efetiva.",
        evaluation: null
      }
    ],
    levelRequirements: [
      { tagId: "junior", pointsRequired: 3 },
      { tagId: "pleno", pointsRequired: 6 },
      { tagId: "senior", pointsRequired: 8 }
    ]
  },
  {
    id: "collaboration",
    name: "Colaboração",
    color: "#8b5cf6",
    commits: [
      {
        id: "collab1",
        behaviorDescription: "Trabalha efetivamente em equipes multidisciplinares.",
        evaluation: null
      },
      {
        id: "collab2",
        behaviorDescription: "Compartilha conhecimento e experiências com colegas.",
        evaluation: null
      },
      {
        id: "collab3",
        behaviorDescription: "Contribui para um ambiente de trabalho positivo e inclusivo.",
        evaluation: null
      },
      {
        id: "collab4",
        behaviorDescription: "Resolve conflitos de forma construtiva.",
        evaluation: null
      }
    ],
    levelRequirements: [
      { tagId: "junior", pointsRequired: 2 },
      { tagId: "pleno", pointsRequired: 5 },
      { tagId: "senior", pointsRequired: 7 }
    ]
  }
];

