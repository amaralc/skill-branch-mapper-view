
import { Tag } from "@/types/skill";

const softwareCareerTags: Tag[] = [
  {
    id: "ic01",
    name: "IC01",
    level: "Júnior",
    code: "L2-T",
    track: "T",
    pointsRequired: 10,
    description:
      "Júnior - Atua com orientação em tarefas com estrutura e baixa ambiguidade",
  },
  {
    id: "ic02",
    name: "IC02",
    level: "Pleno",
    code: "L3-T",
    track: "T",
    pointsRequired: 20,
    description:
      "Pleno - Atua com autonomia em tarefas completas e colabora com o time",
  },
  {
    id: "ic03",
    name: "IC03",
    level: "Sênior",
    code: "L4-T",
    track: "T",
    pointsRequired: 30,
    description:
      "Sênior - Resolve problemas complexos e guia tecnicamente outras pessoas",
  },
  {
    id: "ic04",
    name: "IC04",
    level: "Staff",
    code: "L5-T",
    track: "T",
    pointsRequired: 40,
    description:
      "Staff - Atua em decisões técnicas amplas, influencia padrões e arquitetura",
  },
  {
    id: "ic05",
    name: "IC05",
    level: "Principal",
    code: "L6-T",
    track: "T",
    pointsRequired: 50,
    description:
      "Principal - Lidera técnica e estrategicamente múltiplos times ou domínios",
  },
  {
    id: "em01",
    name: "EM01",
    level: "Coordenador",
    code: "L5-M",
    track: "M",
    pointsRequired: 60,
    description:
      "Coordenador - Mesmo escopo que Staff, com foco em coordenação de pessoas e processos",
  },
  {
    id: "em02",
    name: "EM02",
    level: "Gerente",
    code: "L6-M",
    track: "M",
    pointsRequired: 70,
    description:
      "Gerente - Mesmo escopo que Principal, com foco em direção técnica e organizacional",
  },
  {
    id: "em03",
    name: "EM03",
    level: "Diretor",
    code: "L7-M",
    track: "M",
    pointsRequired: 80,
    description:
      "Diretor - Lidera a definição da estratégia técnica e organizacional",
  },
];

export default softwareCareerTags;
