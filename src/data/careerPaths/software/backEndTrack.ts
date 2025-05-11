
import { Branch } from "@/types/skill";

const backEndTrack: Branch = {
  id: "BACK-END",
  name: "Back-End Development",
  color: "#4ECDC4",
  commits: [
    {
      id: "be-1",
      behaviorDescription:
        "Desenvolve APIs RESTful seguindo padrões e boas práticas",
      evaluation: null,
      updatedAt: null,
    },
    {
      id: "be-2",
      behaviorDescription:
        "Implementa autenticação e autorização de forma segura",
      evaluation: null,
      updatedAt: null,
    },
    {
      id: "be-3",
      behaviorDescription:
        "Modela bancos de dados relacionais de forma eficiente",
      evaluation: null,
      updatedAt: null,
    },
    {
      id: "be-4",
      behaviorDescription:
        "Desenvolve serviços com alta disponibilidade e escalabilidade",
      evaluation: null,
      updatedAt: null,
    },
    {
      id: "be-5",
      behaviorDescription:
        "Monitora e otimiza performance de aplicações backend",
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

export default backEndTrack;
