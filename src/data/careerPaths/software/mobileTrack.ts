
import { Branch } from "@/types/skill";

const mobileTrack: Branch = {
  id: "MOBILE",
  name: "Mobile Development",
  color: "#3498DB",
  commits: [
    {
      id: "mb-1",
      behaviorDescription:
        "Desenvolve interfaces nativas seguindo guidelines da plataforma",
      evaluation: null,
      updatedAt: null,
    },
    {
      id: "mb-2",
      behaviorDescription: "Gerencia estados e ciclo de vida de apps mobile",
      evaluation: null,
      updatedAt: null,
    },
    {
      id: "mb-3",
      behaviorDescription:
        "Implementa features específicas de dispositivos móveis",
      evaluation: null,
      updatedAt: null,
    },
    {
      id: "mb-4",
      behaviorDescription: "Otimiza performance e consumo de recursos",
      evaluation: null,
      updatedAt: null,
    },
    {
      id: "mb-5",
      behaviorDescription:
        "Implementa armazenamento local e sincronização offline",
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

export default mobileTrack;
