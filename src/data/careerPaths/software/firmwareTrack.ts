
import { Branch } from "@/types/skill";

const firmwareTrack: Branch = {
  id: "FIRMWARE",
  name: "Firmware Development",
  color: "#8E44AD",
  commits: [
    {
      id: "fw-1",
      behaviorDescription:
        "Desenvolve código otimizado para sistemas embarcados",
      evaluation: null,
    },
    {
      id: "fw-2",
      behaviorDescription: "Implementa comunicação com periféricos",
      evaluation: null,
    },
    {
      id: "fw-3",
      behaviorDescription: "Desenvolve drivers para hardware específico",
      evaluation: null,
    },
    {
      id: "fw-4",
      behaviorDescription: "Implementa tratamento de interrupções e timers",
      evaluation: null,
    },
    {
      id: "fw-5",
      behaviorDescription: "Otimiza consumo de energia em sistemas embarcados",
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

export default firmwareTrack;
