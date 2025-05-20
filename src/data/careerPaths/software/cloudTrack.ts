
import { Branch } from "@/types/skill";

const cloudTrack: Branch = {
  id: "CLOUD",
  name: "Cloud Infrastructure",
  color: "#E67E22",
  commits: [
    {
      id: "cl-1",
      behaviorDescription: "Provisiona e gerencia recursos em nuvem",
      evaluation: null,
      updatedAt: null,
    },
    {
      id: "cl-2",
      behaviorDescription: "Implementa práticas de segurança em nuvem",
      evaluation: null,
      updatedAt: null,
    },
    {
      id: "cl-3",
      behaviorDescription: "Desenvolve arquiteturas serverless básicas",
      evaluation: null,
      updatedAt: null,
    },
    {
      id: "cl-4",
      behaviorDescription: "Configura monitoramento e logging",
      evaluation: null,
      updatedAt: null,
    },
    {
      id: "cl-5",
      behaviorDescription: "Otimiza custos de recursos em nuvem",
      evaluation: null,
      updatedAt: null,
    },
  ],
  levelRequirements: [
    { tagId: "ic01", pointsRequired: 10 },
    { tagId: "ic02", pointsRequired: 20 },
    { tagId: "ic03", pointsRequired: 30 },
    { tagId: "ic04", pointsRequired: 40 },
    { tagId: "ic05", pointsRequired: 50 },
  ],
};

export default cloudTrack;
