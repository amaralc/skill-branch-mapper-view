import { Branch } from '../../types/skill';

export const commonBranches: Branch[] = [
  {
    id: "communication",
    name: "Comunicação",
    color: "#0ea5e9",
    commits: [
      {
        id: "comm1",
        behaviorDescription: "Comunica ideias de forma clara e objetiva.",
        evaluation: null
      },
      {
        id: "comm2",
        behaviorDescription: "Adapta a comunicação ao público-alvo.",
        evaluation: null
      },
      {
        id: "comm3",
        behaviorDescription: "Escuta ativamente e demonstra compreensão.",
        evaluation: null
      }
    ],
    levelRequirements: [
      { tagId: "junior", pointsRequired: 2 },
      { tagId: "pleno", pointsRequired: 4 },
      { tagId: "senior", pointsRequired: 6 }
    ]
  },
  {
    id: "leadership",
    name: "Liderança",
    color: "#a855f7",
    commits: [
      {
        id: "lead1",
        behaviorDescription: "Toma iniciativa em situações desafiadoras.",
        evaluation: null
      },
      {
        id: "lead2",
        behaviorDescription: "Influencia positivamente a equipe.",
        evaluation: null
      },
      {
        id: "lead3",
        behaviorDescription: "Desenvolve outros profissionais através de mentoria.",
        evaluation: null
      }
    ],
    levelRequirements: [
      { tagId: "junior", pointsRequired: 2 },
      { tagId: "pleno", pointsRequired: 4 },
      { tagId: "senior", pointsRequired: 6 }
    ]
  },
  {
    id: "teamwork",
    name: "Trabalho em Equipe",
    color: "#22c55e",
    commits: [
      {
        id: "team1",
        behaviorDescription: "Colabora efetivamente com colegas de equipe.",
        evaluation: null
      },
      {
        id: "team2",
        behaviorDescription: "Compartilha conhecimento e experiências.",
        evaluation: null
      },
      {
        id: "team3",
        behaviorDescription: "Contribui para um ambiente positivo de trabalho.",
        evaluation: null
      }
    ],
    levelRequirements: [
      { tagId: "junior", pointsRequired: 2 },
      { tagId: "pleno", pointsRequired: 4 },
      { tagId: "senior", pointsRequired: 6 }
    ]
  }
];

import softwareCareerPath from './softwareCareerPath';
import productManagementPath from './productCareerPath';

export const careerPaths = [softwareCareerPath, productManagementPath];

export default careerPaths;
