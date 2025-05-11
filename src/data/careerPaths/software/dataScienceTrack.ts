
import { Branch } from "@/types/skill";

const dataScienceTrack: Branch = {
  id: "ENGINEERING-AND-DATA-SCIENCE",
  name: "Data Science",
  color: "#9B59B6",
  commits: [
    {
      id: "ds-1",
      behaviorDescription: "Realiza análise exploratória de dados efetivamente",
      evaluation: null,
    },
    {
      id: "ds-2",
      behaviorDescription: "Prepara e limpa dados para análise",
      evaluation: null,
    },
    {
      id: "ds-3",
      behaviorDescription: "Desenvolve modelos de machine learning básicos",
      evaluation: null,
    },
    {
      id: "ds-4",
      behaviorDescription: "Avalia e valida modelos adequadamente",
      evaluation: null,
    },
    {
      id: "ds-5",
      behaviorDescription: "Comunica resultados de forma clara e efetiva",
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

export default dataScienceTrack;
