
import { Branch } from "@/types/skill";

const frontEndTrack: Branch = {
  id: "FRONT-END",
  name: "Front-End Development",
  color: "#FF6B6B",
  commits: [
    {
      id: "fe-1",
      behaviorDescription:
        "Implementa interfaces responsivas seguindo princípios de design mobile-first",
      evaluation: null,
    },
    {
      id: "fe-2",
      behaviorDescription: "Aplica boas práticas de acessibilidade web (WCAG)",
      evaluation: null,
    },
    {
      id: "fe-3",
      behaviorDescription:
        "Otimiza performance do front-end utilizando técnicas modernas",
      evaluation: null,
    },
    {
      id: "fe-4",
      behaviorDescription:
        "Desenvolve componentes reutilizáveis e mantém consistência visual",
      evaluation: null,
    },
    {
      id: "fe-5",
      behaviorDescription:
        "Implementa integrações com APIs RESTful de forma eficiente",
      evaluation: null,
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

export default frontEndTrack;
