
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
    id: "ACCOUNTABILITY",
    name: "Accountability",
    color: "#0ea1e9",
    commits: [
      {
        "id": "AC01-BASE-ALL",
        "behaviorDescription": "Assume responsabilidade por entregas",
        "evaluation": null
      },
      {
        "id": "AC02-BASE-ALL",
        "behaviorDescription": "Reconhece erros prontamente",
        "evaluation": null
      },
      {
        "id": "AC03-BASE-ALL",
        "behaviorDescription": "Toma decisões com autonomia no seu escopo",
        "evaluation": null
      },
      {
        "id": "AC04-BASE-ALL",
        "behaviorDescription": "Define expectativas claras para entregas",
        "evaluation": null
      },
      {
        "id": "AC05-BASE-ALL",
        "behaviorDescription": "Prioriza tarefas com foco em valor",
        "evaluation": null
      },
      {
        "id": "AC01-L0-T-ALL",
        "behaviorDescription": "Entrega tarefas designadas com supervisão",
        "evaluation": null
      },
      {
        "id": "AC02-L0-T-ALL",
        "behaviorDescription": "Admite erros quando identificados",
        "evaluation": null
      },
      {
        "id": "AC03-L0-T-ALL",
        "behaviorDescription": "Toma decisões simples dentro de diretrizes estabelecidas",
        "evaluation": null
      },
      {
        "id": "AC04-L0-T-ALL",
        "behaviorDescription": "Define critérios básicos para suas tarefas",
        "evaluation": null
      },
      {
        "id": "AC05-L0-T-ALL",
        "behaviorDescription": "Organiza tarefas conforme orientação",
        "evaluation": null
      },
      {
        "id": "AC01-L1-T-ALL",
        "behaviorDescription": "Cumpre compromissos de forma autônoma",
        "evaluation": null
      },
      {
        "id": "AC02-L1-T-ALL",
        "behaviorDescription": "Reconhece falhas proativamente",
        "evaluation": null
      },
      {
        "id": "AC03-L1-T-ALL",
        "behaviorDescription": "Faz escolhas autônomas em seu escopo",
        "evaluation": null
      },
      {
        "id": "AC04-L1-T-ALL",
        "behaviorDescription": "Estabelece métricas claras para entregas individuais",
        "evaluation": null
      },
      {
        "id": "AC05-L1-T-ALL",
        "behaviorDescription": "Prioriza atividades com autonomia",
        "evaluation": null
      },
      {
        "id": "AC01-L2-T-ALL",
        "behaviorDescription": "Gerencia múltiplas entregas e orienta iniciantes em técnicas de cumprimento de compromissos",
        "evaluation": null
      },
      {
        "id": "AC01-L3-T-ALL",
        "behaviorDescription": "Coordena entregas complexas e ensina estratégias de gerenciamento de expectativas para juniores",
        "evaluation": null
      },
      {
        "id": "AC01-L4-T-ALL",
        "behaviorDescription": "Lidera entregas interdependentes e conduz treinamentos sobre gerenciamento de compromissos",
        "evaluation": null
      },
      {
        "id": "AC01-L5-M-ALL",
        "behaviorDescription": "Promove cultura de compromisso entre times e implementa métricas de confiabilidade em entregas",
        "evaluation": null
      },
      {
        "id": "AC01-L5-T-ALL",
        "behaviorDescription": "Estabelece padrões de responsabilidade e implementa programas de excelência em entregas",
        "evaluation": null
      },
      {
        "id": "AC01-L6-M-ALL",
        "behaviorDescription": "Direciona estratégias de responsabilidade organizacional e estabelece governança de compromissos",
        "evaluation": null
      },
      {
        "id": "AC01-L6-T-ALL",
        "behaviorDescription": "Define frameworks de responsabilidade técnica e lidera iniciativas de transformação em entregas",
        "evaluation": null
      },
      {
        "id": "AC01-L7-M-ALL",
        "behaviorDescription": "Molda cultura corporativa de accountability e determina direcionamentos de excelência operacional",
        "evaluation": null
      },
      {
        "id": "AC02-L2-T-ALL",
        "behaviorDescription": "Analisa causas-raiz de falhas e orienta iniciantes sobre como lidar construtivamente com erros",
        "evaluation": null
      },
      {
        "id": "AC02-L3-T-ALL",
        "behaviorDescription": "Transforma falhas em melhorias sistemáticas e ensina técnicas de aprendizado com erros para juniores",
        "evaluation": null
      },
      {
        "id": "AC02-L4-T-ALL",
        "behaviorDescription": "Implementa processos de análise pós-falha e conduz treinamentos sobre cultura de aprendizado",
        "evaluation": null
      },
      {
        "id": "AC02-L5-M-ALL",
        "behaviorDescription": "Promove cultura de experimentação segura e implementa práticas de análise de falha sem culpa",
        "evaluation": null
      },
      {
        "id": "AC02-L5-T-ALL",
        "behaviorDescription": "Estabelece metodologias de melhoria contínua e implementa programas de aprendizado organizacional",
        "evaluation": null
      },
      {
        "id": "AC02-L6-M-ALL",
        "behaviorDescription": "Direciona políticas de experimentação responsável e estabelece governança de aprendizado sistêmico",
        "evaluation": null
      },
      {
        "id": "AC02-L6-T-ALL",
        "behaviorDescription": "Define estratégias de resiliência técnica e lidera transformações em gestão de falhas e incidentes",
        "evaluation": null
      },
      {
        "id": "AC02-L7-M-ALL",
        "behaviorDescription": "Molda cultura organizacional de transparência em falhas e determina abordagens de inovação responsável",
        "evaluation": null
      },
      {
        "id": "AC03-L2-T-ALL",
        "behaviorDescription": "Toma decisões em cenários com variáveis múltiplas e orienta iniciantes em tomada de decisão consciente",
        "evaluation": null
      },
      {
        "id": "AC03-L3-T-ALL",
        "behaviorDescription": "Navega por decisões complexas com impactos amplos e ensina abordagens estruturadas para juniores",
        "evaluation": null
      },
      {
        "id": "AC03-L4-T-ALL",
        "behaviorDescription": "Toma decisões estratégicas de médio prazo e conduz treinamentos sobre processos decisórios",
        "evaluation": null
      },
      {
        "id": "AC03-L5-M-ALL",
        "behaviorDescription": "Coordena decisões entre múltiplos times e promove cultura de autonomia com alinhamento",
        "evaluation": null
      },
      {
        "id": "AC03-L5-T-ALL",
        "behaviorDescription": "Estabelece frameworks decisórios e implementa programas de desenvolvimento de autonomia decisória",
        "evaluation": null
      },
      {
        "id": "AC03-L6-M-ALL",
        "behaviorDescription": "Direciona estratégias de decisão organizacional e estabelece governança de autonomia responsável",
        "evaluation": null
      },
      {
        "id": "AC03-L6-T-ALL",
        "behaviorDescription": "Define arquitetura de governança técnica e lidera transformações nos modelos decisórios",
        "evaluation": null
      },
      {
        "id": "AC03-L7-M-ALL",
        "behaviorDescription": "Molda modelo corporativo de liderança decisória e determina diretrizes de autonomia organizacional",
        "evaluation": null
      },
      {
        "id": "AC04-L2-T-ALL",
        "behaviorDescription": "Formula critérios para entregas colaborativas e orienta iniciantes em definição de expectativas",
        "evaluation": null
      },
      {
        "id": "AC04-L3-T-ALL",
        "behaviorDescription": "Estrutura critérios para projetos complexos e ensina técnicas de alinhamento de expectativas para juniores",
        "evaluation": null
      },
      {
        "id": "AC04-L4-T-ALL",
        "behaviorDescription": "Define frameworks de qualidade entre times e conduz treinamentos sobre gestão de expectativas",
        "evaluation": null
      },
      {
        "id": "AC04-L5-M-ALL",
        "behaviorDescription": "Promove alinhamento de expectativas entre departamentos e implementa práticas de visibilidade de resultados",
        "evaluation": null
      },
      {
        "id": "AC04-L5-T-ALL",
        "behaviorDescription": "Estabelece padrões de excelência técnica e implementa programas de mensuração de valor entregue",
        "evaluation": null
      },
      {
        "id": "AC04-L6-M-ALL",
        "behaviorDescription": "Direciona políticas de definição de expectativas claras e estabelece governança de gestão por resultados",
        "evaluation": null
      },
      {
        "id": "AC04-L6-T-ALL",
        "behaviorDescription": "Define metodologias de gestão de qualidade e lidera transformações em mensuração de valor técnico",
        "evaluation": null
      },
      {
        "id": "AC04-L7-M-ALL",
        "behaviorDescription": "Molda cultura corporativa de clareza de propósito e determina diretrizes para mensuração de impacto",
        "evaluation": null
      },
      {
        "id": "AC05-L2-T-ALL",
        "behaviorDescription": "Equilibra múltiplas demandas com foco em impacto e orienta iniciantes em gestão de prioridades",
        "evaluation": null
      },
      {
        "id": "AC05-L3-T-ALL",
        "behaviorDescription": "Otimiza alocação de recursos em projetos e ensina métodos de priorização baseada em valor para juniores",
        "evaluation": null
      },
      {
        "id": "AC05-L4-T-ALL",
        "behaviorDescription": "Define critérios de priorização entre iniciativas e conduz treinamentos sobre gestão de recursos",
        "evaluation": null
      },
      {
        "id": "AC05-L5-M-ALL",
        "behaviorDescription": "Coordena alocação estratégica de recursos e promove cultura de foco em resultados significativos",
        "evaluation": null
      },
      {
        "id": "AC05-L5-T-ALL",
        "behaviorDescription": "Estabelece metodologias de priorização e implementa programas de maximização de valor entregue",
        "evaluation": null
      },
      {
        "id": "AC05-L6-M-ALL",
        "behaviorDescription": "Direciona estratégias de investimento organizacional e estabelece governança de alocação de recursos",
        "evaluation": null
      },
      {
        "id": "AC05-L6-T-ALL",
        "behaviorDescription": "Define frameworks de otimização de recursos técnicos e lidera transformações em gestão de valor",
        "evaluation": null
      },
      {
        "id": "AC05-L7-M-ALL",
        "behaviorDescription": "Molda cultura corporativa de foco em impacto e determina diretrizes de criação de valor sustentável",
        "evaluation": null
      }
    ],
    levelRequirements: [
      { tagId: "junior", pointsRequired: 3 },
      { tagId: "pleno", pointsRequired: 6 },
      { tagId: "senior", pointsRequired: 8 }
    ]
  }
];

