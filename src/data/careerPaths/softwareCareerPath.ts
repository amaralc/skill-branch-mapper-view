import { Branch, SkillPath } from '@/types/skill';

const architectureBranch: Branch = {
  id: 'architecture',
  name: 'Arquitetura',
  color: '#2ecc71',
  commits: [
    {
      id: 'architecture-1',
      behaviorDescription: 'Escreve código com apoio, buscando aplicar os padrões e convenções definidos pelo time',
      evaluation: null
    },
    {
      id: 'architecture-2',
      behaviorDescription: 'Estrutura código com foco em responsabilidade única, com revisão e orientação',
      evaluation: null
    },
    {
      id: 'architecture-3',
      behaviorDescription: 'Segue exemplos e orientações para implementar módulos que respeitam contratos definidos',
      evaluation: null
    },
    {
      id: 'architecture-4',
      behaviorDescription: 'Aprende a avaliar, com apoio, quando alterar código existente ou optar por extensão segura',
      evaluation: null
    },
    {
      id: 'architecture-5',
      behaviorDescription: 'Cria módulos simples apenas com os atributos necessários, sem parâmetros excedentes',
      evaluation: null
    },
    {
      "id": "architecture-6",
      "behaviorDescription": "Escreve código claro e consistente, seguindo padrões definidos pelo time sem necessidade de apoio",
      "evaluation": null
    },
    {
      "id": "architecture-7",
      "behaviorDescription": "Organiza módulos com responsabilidade única e propósito claro, facilitando manutenção e testes",
      "evaluation": null
    },
    {
      "id": "architecture-8",
      "behaviorDescription": "Implementa módulos substituíveis com base em contratos e abstrações definidos pelo time",
      "evaluation": null
    },
    {
      "id": "architecture-9",
      "behaviorDescription": "Decide quando alterar ou estender código existente, priorizando segurança e clareza técnica",
      "evaluation": null
    },
    {
      "id": "architecture-10",
      "behaviorDescription": "Define estruturas com os atributos certos para o uso, evitando sobrecarga desnecessária",
      "evaluation": null
    },
    {
      "id": "architecture-11",
      "behaviorDescription": "Escreve código idiomático em cenários complexos, promovendo boas práticas no time",
      "evaluation": null
    },
    {
      "id": "architecture-12",
      "behaviorDescription": "Modela módulos coesos com responsabilidade clara, apoiando decisões de arquitetura",
      "evaluation": null
    },
    {
      "id": "architecture-13",
      "behaviorDescription": "Cria módulos substituíveis com base em abstrações claras e contratos confiáveis",
      "evaluation": null
    },
    {
      "id": "architecture-14",
      "behaviorDescription": "Refatora ou estende código com autonomia, mantendo clareza e estabilidade do sistema",
      "evaluation": null
    },
    {
      "id": "architecture-15",
      "behaviorDescription": "Modela estruturas enxutas, alinhadas ao domínio e ao uso real dos dados",
      "evaluation": null
    },
    {
      "id": "architecture-16",
      "behaviorDescription": "Define padrões de codificação idiomática aplicáveis a múltiplos contextos da equipe",
      "evaluation": null
    },
    {
      "id": "architecture-17",
      "behaviorDescription": "Orienta o time na separação de responsabilidades e na criação de módulos reutilizáveis",
      "evaluation": null
    },
    {
      "id": "architecture-18",
      "behaviorDescription": "Projeta componentes substituíveis e extensíveis que sustentam a evolução técnica",
      "evaluation": null
    },
    {
      "id": "architecture-19",
      "behaviorDescription": "Estabelece práticas de extensão segura, mesmo em sistemas legados e de alta complexidade",
      "evaluation": null
    },
    {
      "id": "architecture-20",
      "behaviorDescription": "Cria e revisa contratos de dados com foco em clareza, uso real e consistência técnica",
      "evaluation": null
    },
    {
      "id": "architecture-21",
      "behaviorDescription": "Dissemina padrões idiomáticos que promovem legibilidade e sustentabilidade entre equipes",
      "evaluation": null
    },
    {
      "id": "architecture-22",
      "behaviorDescription": "Influência estratégias de modularização técnica em múltiplos produtos ou domínios",
      "evaluation": null
    },
    {
      "id": "architecture-23",
      "behaviorDescription": "Define abstrações reutilizáveis que permitem substituição segura entre serviços e módulos",
      "evaluation": null
    },
    {
      "id": "architecture-24",
      "behaviorDescription": "Cria estruturas e fluxos que favorecem evolução contínua com impacto mínimo",
      "evaluation": null
    },
    {
      "id": "architecture-25",
      "behaviorDescription": "Estabelece critérios organizacionais para definição de contratos técnicos e APIs enxutas",
      "evaluation": null
    },
    {
      "id": "architecture-26",
      "behaviorDescription": "Garante tempo e contexto para que o time adote padrões idiomáticos e consistentes",
      "evaluation": null
    },
    {
      "id": "architecture-27",
      "behaviorDescription": "Orienta o time na criação de soluções modulares e sustentáveis com foco em longo prazo",
      "evaluation": null
    },
    {
      "id": "architecture-28",
      "behaviorDescription": "Ajuda o time a aplicar contratos claros e abstrações que suportam evolução segura",
      "evaluation": null
    },
    {
      "id": "architecture-29",
      "behaviorDescription": "Promove decisões técnicas que evitam retrabalho e favorecem extensão estruturada",
      "evaluation": null
    },
    {
      "id": "architecture-30",
      "behaviorDescription": "Orienta o time a modelar interfaces simples, específicas e úteis ao contexto real de uso",
      "evaluation": null
    },
    {
      "id": "architecture-31",
      "behaviorDescription": "Desenvolve líderes técnicos que promovem padrões idiomáticos entre domínios organizacionais",
      "evaluation": null
    },
    {
      "id": "architecture-32",
      "behaviorDescription": "Influência práticas de arquitetura modular aplicadas em múltiplos produtos da empresa",
      "evaluation": null
    },
    {
      "id": "architecture-33",
      "behaviorDescription": "Garante que times possam evoluir sistemas com contratos bem definidos e desacoplamento técnico",
      "evaluation": null
    },
    {
      "id": "architecture-34",
      "behaviorDescription": "Cria estruturas de governança técnica que promovem extensão segura e sustentável",
      "evaluation": null
    },
    {
      "id": "architecture-35",
      "behaviorDescription": "Dissemina boas práticas de design de interface que conectam domínio, clareza e sustentabilidade",
      "evaluation": null
    }
  ],
  levelRequirements: [
    { tagId: 'ic01', pointsRequired: 10 },
    { tagId: 'ic02', pointsRequired: 20 },
    { tagId: 'ic03', pointsRequired: 30 }
  ]
};

const qualityBranch: Branch = {
  id: 'qualidade',
  name: 'Qualidade',
  color: '#3498db',
  commits: [
    {
      id: 'quality-01',
      behaviorDescription: 'Testa como o usuário final e busca aprender com falhas que poderiam passar despercebidas',
      evaluation: null
    },
    {
      id: 'quality-02',
      behaviorDescription: 'Revisa sua entrega com atenção, corrigindo falhas e aprendendo com os próprios erros',
      evaluation: null
    },
    {
      id: 'quality-03',
      behaviorDescription: 'Escreve testes úteis e entende melhor o comportamento esperado do sistema',
      evaluation: null
    },
    {
      id: 'quality-04',
      behaviorDescription: 'Cria testes para falhas encontradas, aprendendo a evitar regressões com confiança',
      evaluation: null
    },
    {
      id: 'quality-05',
      behaviorDescription: 'Participa de revisões e pares com atenção, aprendendo e aplicando padrões de qualidade do time',
      evaluation: null
    },
    {
      id: 'quality-06',
      behaviorDescription: 'Garante por conta própria que o usuário final não perceba falhas na experiência',
      evaluation: null
    },
    {
      id: 'quality-07',
      behaviorDescription: 'Valida a qualidade da entrega com rigor antes de envolver QA ou revisão técnica',
      evaluation: null
    },
    {
      id: 'quality-08',
      behaviorDescription: 'Escreve testes claros e confiáveis para validar os cenários que entrega',
      evaluation: null
    },
    {
      id: 'quality-09',
      behaviorDescription: 'Reproduz falhas reportadas com testes e ajuda colegas a evitar regressões',
      evaluation: null
    },
    {
      id: 'quality-10',
      behaviorDescription: 'Revisa com critério e orienta colegas em pares para elevar o padrão do time',
      evaluation: null
    },
    {
      id: 'quality-11',
      behaviorDescription: 'Antecipa falhas que afetariam o usuário e ajusta a entrega antes que elas ocorram',
      evaluation: null
    },
    {
      id: 'quality-12',
      behaviorDescription: 'Garante qualidade de ponta a ponta com autonomia, mesmo em cenários ambíguos',
      evaluation: null
    },
    {
      id: 'quality-13',
      behaviorDescription: 'Escreve testes completos, legíveis e sustentáveis para o time',
      evaluation: null
    },
    {
      id: 'quality-14',
      behaviorDescription: 'Traduz falhas reais em testes robustos e compartilha o aprendizado com o time',
      evaluation: null
    },
    {
      id: 'quality-15',
      behaviorDescription: 'Conduz revisões e pares com profundidade, formando o critério técnico do time',
      evaluation: null
    },
    {
      id: 'quality-16',
      behaviorDescription: 'Estabelece práticas que evitam falhas perceptíveis em escala, com foco na experiência do usuário',
      evaluation: null
    },
    {
      id: 'quality-17',
      behaviorDescription: 'Cria padrões e ferramentas que tornam a qualidade parte natural do fluxo de entrega',
      evaluation: null
    },
    {
      id: 'quality-18',
      behaviorDescription: 'Define critérios e estruturas de teste que fortalecem a confiabilidade do sistema',
      evaluation: null
    },
    {
      id: 'quality-19',
      behaviorDescription: 'Sistematiza testes para falhas críticas e orienta prevenção em escala no time',
      evaluation: null
    },
    {
      id: 'quality-20',
      behaviorDescription: 'Promove revisões e pares intencionais para desenvolver critério técnico no time',
      evaluation: null
    },
    {
      id: 'quality-21',
      behaviorDescription: 'Garante que falhas perceptíveis ao usuário sejam raras e evitadas sistemicamente',
      evaluation: null
    },
    {
      id: 'quality-22',
      behaviorDescription: 'Influencia times e áreas a tornarem a qualidade parte natural do fluxo de entrega',
      evaluation: null
    },
    {
      id: 'quality-23',
      behaviorDescription: 'Evolui critérios de testabilidade e práticas que aumentam a confiança em sistemas críticos',
      evaluation: null
    },
    {
      id: 'quality-24',
      behaviorDescription: 'Estabelece padrões de prevenção e resposta a falhas com impacto além do próprio time',
      evaluation: null
    },
    {
      id: 'quality-25',
      behaviorDescription: 'Constrói uma cultura de revisão e pairing que eleva o nível técnico da organização',
      evaluation: null
    }
  ],
  levelRequirements: [
    { tagId: 'ic01', pointsRequired: 10 },
    { tagId: 'ic02', pointsRequired: 20 },
    { tagId: 'ic03', pointsRequired: 30 },
    { tagId: 'ic04', pointsRequired: 40 },
    { tagId: 'ic05', pointsRequired: 50 }
  ]
};

const securityBranch: Branch = {
  id: 'seguranca',
  name: 'Segurança',
  color: '#e74c3c',
  commits: [
    {
      id: 'security-01',
      behaviorDescription: 'Evita expor dados sensíveis e aplica variáveis de ambiente com apoio e atenção ao detalhe',
      evaluation: 'sometimes'
    },
    {
      id: 'security-02',
      behaviorDescription: 'Lê relatórios de SAST e busca entender vulnerabilidades OWASP, com ajuda, corrigindo o que entrega',
      evaluation: 'always'
    },
    {
      id: 'security-03',
      behaviorDescription: 'Usa autenticação e permissões com apoio, e entende seu papel nos fluxos seguros do time',
      evaluation: null
    },
    {
      id: 'security-04',
      behaviorDescription: 'Cria testes para falhas conhecidas que entregou, com supervisão, garantindo que não voltem',
      evaluation: 'always'
    },
    {
      id: 'security-05',
      behaviorDescription: 'Reporta falhas com clareza, busca entender causas e aprende com o time como preveni-las',
      evaluation: null
    },
    {
      id: 'security-06',
      behaviorDescription: 'Garante que tokens e dados sensíveis não sejam expostos em commits, logs ou respostas HTTP',
      evaluation: null
    },
    {
      id: 'security-07',
      behaviorDescription: 'Monitora alertas de SAST e previne riscos conhecidos com base no OWASP Top 10',
      evaluation: null
    },
    {
      id: 'security-08',
      behaviorDescription: 'Usa e configura corretamente autenticação, RBAC e ferramentas de scan e segurança exigidas',
      evaluation: null
    },
    {
      id: 'security-09',
      behaviorDescription: 'Cria testes automatizados para cobrir falhas reportadas e prevenir reincidência',
      evaluation: null
    },
    {
      id: 'security-10',
      behaviorDescription: 'Corrige falhas com agilidade e compartilha aprendizados com o time em revisão ou retro',
      evaluation: null
    },
    {
      id: 'security-11',
      behaviorDescription: 'Garante que não haja vazamento de segredos em nenhum ponto da stack sob sua responsabilidade',
      evaluation: null
    },
    {
      id: 'security-12',
      behaviorDescription: 'Interpreta alertas de SAST e previne vulnerabilidades OWASP com ações corretivas antes do deploy',
      evaluation: null
    },
    {
      id: 'security-13',
      behaviorDescription: 'Implementa e reforça o uso correto de autenticação, RBAC e scanners em serviços sob responsabilidade de sua equipe',
      evaluation: null
    },
    {
      id: 'security-14',
      behaviorDescription: 'Automatiza testes para falhas críticas e orienta o time na construção de simulações seguras',
      evaluation: null
    },
    {
      id: 'security-15',
      behaviorDescription: 'Lidera atuação rápida em falhas, propõe melhorias e promove compartilhamento de aprendizados ativamente',
      evaluation: null
    },
    {
      id: 'security-16',
      behaviorDescription: 'Define e audita práticas seguras de gestão de segredos em todo o time ou domínio técnico',
      evaluation: null
    },
    {
      id: 'security-17',
      behaviorDescription: 'Garante que relatórios de SAST sejam tratados com prioridade e que riscos OWASP sejam mitigados',
      evaluation: null
    },
    {
      id: 'security-18',
      behaviorDescription: 'Promove a adoção consistente de controles como RBAC, SCA, SSO, MFA e scanners de vulnerabilidade',
      evaluation: null
    },
    {
      id: 'security-19',
      behaviorDescription: 'Estabelece padrões de testabilidade em segurança e cria exemplos para serem replicados',
      evaluation: null
    },
    {
      id: 'security-20',
      behaviorDescription: 'Conduz análises pós-incidente, catalisa ações corretivas e institucionaliza aprendizados',
      evaluation: null
    },
    {
      id: 'security-21',
      behaviorDescription: 'Define padrões e ferramentas seguras para gestão de segredos em escala organizacional',
      evaluation: null
    },
    {
      id: 'security-22',
      behaviorDescription: 'Influencia processos de tratamento de vulnerabilidades e incorpora OWASP em revisões e projetos',
      evaluation: null
    },
    {
      id: 'security-23',
      behaviorDescription: 'Garante adoção consistente de controles em sistemas críticos e orienta decisões de arquitetura',
      evaluation: null
    },
    {
      id: 'security-24',
      behaviorDescription: 'Estabelece práticas de testabilidade em segurança aplicáveis a múltiplos times ou produtos',
      evaluation: null
    },
    {
      id: 'security-25',
      behaviorDescription: 'Lidera resposta a falhas críticas, compartilha lições e muda processos para prevenir recorrência',
      evaluation: null
    },
    {
      id: 'security-26',
      behaviorDescription: 'Garante que o time use práticas e ferramentas seguras, treinando quem ainda tem lacunas',
      evaluation: null
    },
    {
      id: 'security-27',
      behaviorDescription: 'Estimula acompanhamento regular de relatórios e promove aprendizado técnico com base nos alertas',
      evaluation: null
    },
    {
      id: 'security-28',
      behaviorDescription: 'Remove barreiras para adoção dos controles e reforça sua aplicação no dia a dia',
      evaluation: null
    },
    {
      id: 'security-29',
      behaviorDescription: 'Incentiva o time a automatizar prevenção com exemplos reais, revisando cobertura junto aos devs',
      evaluation: null
    },
    {
      id: 'security-30',
      behaviorDescription: 'Facilita discussões pós-falha, garante ações corretivas e aprendizado distribuído',
      evaluation: null
    },
    {
      id: 'security-31',
      behaviorDescription: 'Cria padrões e governança que previnem exposição de dados sensíveis em toda a organização',
      evaluation: null
    },
    {
      id: 'security-32',
      behaviorDescription: 'Garante que times monitorem vulnerabilidades e que planos de ação estejam integrados à rotina',
      evaluation: null
    },
    {
      id: 'security-33',
      behaviorDescription: 'Assegura que ferramentas, práticas e políticas estejam implantadas e operantes em todas as áreas',
      evaluation: null
    },
    {
      id: 'security-34',
      behaviorDescription: 'Promove cultura de prevenção baseada em testes e simulações, com investimento e apoio transversal',
      evaluation: null
    },
    {
      id: 'security-35',
      behaviorDescription: 'Estimula aprendizado organizacional a partir de incidentes e define resposta padrão para riscos',
      evaluation: null
    }
  ],
  levelRequirements: [
    { tagId: 'ic01', pointsRequired: 10 },
    { tagId: 'ic02', pointsRequired: 20 },
    { tagId: 'ic03', pointsRequired: 30 },
    { tagId: 'ic04', pointsRequired: 40 },
    { tagId: 'ic05', pointsRequired: 50 }
  ]
};

const continuousDeliveryBranch: Branch = {
  id: 'entrega-continua',
  name: 'Entrega Contínua',
  color: '#f39c12',
  commits: [
    {
      "id": "continuous-delivery-1",
      "behaviorDescription": "Entrega partes simples do sistema com apoio, focando em pequenas entregas úteis",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-2",
      "behaviorDescription": "Aprende a integrar mudanças com frequência, com apoio para manter o sistema estável",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-3",
      "behaviorDescription": "Corrige falhas simples com orientação, aprendendo a monitorar seu impacto após o deploy",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-4",
      "behaviorDescription": "Compreende os recursos da infraestrutura e pede apoio ao identificar problemas básicos",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-5",
      "behaviorDescription": "Refatora partes do código com apoio, mantendo clareza e simplicidade em pequenas tarefas",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-6",
      "behaviorDescription": "Entrega com autonomia pequenas melhorias com valor claro para o produto",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-7",
      "behaviorDescription": "Integra mudanças frequentemente, mantendo o sistema sempre em estado entregável",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-8",
      "behaviorDescription": "Monitora suas entregas em produção e corrige falhas de forma ágil e responsável",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-9",
      "behaviorDescription": "Ajusta configurações e recursos básicos da infraestrutura para garantir estabilidade e custo",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-10",
      "behaviorDescription": "Refatora de forma contínua e autônoma para melhorar clareza, performance e manutenção",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-11",
      "behaviorDescription": "Entrega valor com frequência, articulando com o time impacto e escopo das entregas",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-12",
      "behaviorDescription": "Automatiza integrações frequentes e ajuda a manter o sistema funcional e versionado",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-13",
      "behaviorDescription": "Detecta e corrige falhas em produção com agilidade, guiando a análise de causa raiz",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-14",
      "behaviorDescription": "Faz ajustes eficientes na infraestrutura com consciência de custo, risco e disponibilidade",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-15",
      "behaviorDescription": "Refatora componentes de forma contínua, mantendo simplicidade em cenários complexos",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-16",
      "behaviorDescription": "Define critérios para entregas frequentes com impacto técnico e de produto",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-17",
      "behaviorDescription": "Garante cultura de integração frequente, revisando práticas com foco em estabilidade",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-18",
      "behaviorDescription": "Previne e responde a falhas críticas com rapidez, clareza e suporte ao time",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-19",
      "behaviorDescription": "Otimiza arquitetura de infraestrutura com foco em resiliência, escalabilidade e custo",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-20",
      "behaviorDescription": "Promove refatorações amplas e seguras que reduzem dívida técnica e aumentam fluidez",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-21",
      "behaviorDescription": "Dissemina boas práticas de entrega frequente com foco em previsibilidade e valor contínuo",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-22",
      "behaviorDescription": "Influência práticas de integração frequente em múltiplos times e domínios",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-23",
      "behaviorDescription": "Cria mecanismos de monitoramento e resposta a falhas replicáveis entre sistemas",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-24",
      "behaviorDescription": "Define estratégias técnicas que equilibram custo, robustez e autonomia dos times",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-25",
      "behaviorDescription": "Evolui continuamente sistemas críticos com refatorações técnicas e organizacionais",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-26",
      "behaviorDescription": "Garante tempo e contexto para que o time entregue valor com ritmo sustentável",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-27",
      "behaviorDescription": "Ajuda o time a adotar boas práticas de integração frequente com autonomia",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-28",
      "behaviorDescription": "Promove cultura de monitoramento, correção rápida e aprendizado com o time",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-29",
      "behaviorDescription": "Acompanha decisões de arquitetura de infraestrutura com foco em impacto e alinhamento",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-30",
      "behaviorDescription": "Cria estruturas de apoio para que o time refatore com segurança e eficiência",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-31",
      "behaviorDescription": "Desenvolve líderes que promovem entregas frequentes com impacto organizacional",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-32",
      "behaviorDescription": "Garante que a integração contínua seja prática consolidada entre produtos e áreas",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-33",
      "behaviorDescription": "Fomenta estruturas de confiabilidade e resposta rápida a falhas em toda a organização",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-34",
      "behaviorDescription": "Garante sustentabilidade financeira e técnica das decisões de infraestrutura",
      "evaluation": null
    },
    {
      "id": "continuous-delivery-35",
      "behaviorDescription": "Promove refatoração organizacional como prática contínua de melhoria e simplificação",
      "evaluation": null
    }
  ],
  levelRequirements: [
    { tagId: 'ic01', pointsRequired: 10 },
    { tagId: 'ic02', pointsRequired: 20 },
    { tagId: 'ic03', pointsRequired: 30 },
    { tagId: 'ic04', pointsRequired: 40 },
    { tagId: 'ic05', pointsRequired: 50 }
  ]
};

const frontEndTrack: Branch = {
  id: 'front-end',
  name: 'Front-End Development',
  color: '#FF6B6B',
  commits: [
    {
      id: 'fe-1',
      behaviorDescription: 'Implementa interfaces responsivas seguindo princípios de design mobile-first',
      evaluation: null
    },
    {
      id: 'fe-2',
      behaviorDescription: 'Aplica boas práticas de acessibilidade web (WCAG)',
      evaluation: null
    },
    {
      id: 'fe-3',
      behaviorDescription: 'Otimiza performance do front-end utilizando técnicas modernas',
      evaluation: null
    },
    {
      id: 'fe-4',
      behaviorDescription: 'Desenvolve componentes reutilizáveis e mantém consistência visual',
      evaluation: null
    },
    {
      id: 'fe-5',
      behaviorDescription: 'Implementa integrações com APIs RESTful de forma eficiente',
      evaluation: null
    }
  ],
  levelRequirements: [
    { tagId: 'ic01', pointsRequired: 10 },
    { tagId: 'ic02', pointsRequired: 20 },
    { tagId: 'ic03', pointsRequired: 30 },
    { tagId: 'ic04', pointsRequired: 40 },
    { tagId: 'ic05', pointsRequired: 50 }
  ]
};

const backEndTrack: Branch = {
  id: 'back-end',
  name: 'Back-End Development',
  color: '#4ECDC4',
  commits: [
    {
      id: 'be-1',
      behaviorDescription: 'Desenvolve APIs RESTful seguindo padrões e boas práticas',
      evaluation: null
    },
    {
      id: 'be-2',
      behaviorDescription: 'Implementa autenticação e autorização de forma segura',
      evaluation: null
    },
    {
      id: 'be-3',
      behaviorDescription: 'Modela bancos de dados relacionais de forma eficiente',
      evaluation: null
    },
    {
      id: 'be-4',
      behaviorDescription: 'Desenvolve serviços com alta disponibilidade e escalabilidade',
      evaluation: null
    },
    {
      id: 'be-5',
      behaviorDescription: 'Monitora e otimiza performance de aplicações backend',
      evaluation: null
    }
  ],
  levelRequirements: [
    { tagId: 'ic01', pointsRequired: 10 },
    { tagId: 'ic02', pointsRequired: 20 },
    { tagId: 'ic03', pointsRequired: 30 },
    { tagId: 'ic04', pointsRequired: 40 },
    { tagId: 'ic05', pointsRequired: 50 }
  ]
};

const dataScienceTrack: Branch = {
  id: 'data-science',
  name: 'Data Science',
  color: '#9B59B6',
  commits: [
    {
      id: 'ds-1',
      behaviorDescription: 'Realiza análise exploratória de dados efetivamente',
      evaluation: null
    },
    {
      id: 'ds-2',
      behaviorDescription: 'Prepara e limpa dados para análise',
      evaluation: null
    },
    {
      id: 'ds-3',
      behaviorDescription: 'Desenvolve modelos de machine learning básicos',
      evaluation: null
    },
    {
      id: 'ds-4',
      behaviorDescription: 'Avalia e valida modelos adequadamente',
      evaluation: null
    },
    {
      id: 'ds-5',
      behaviorDescription: 'Comunica resultados de forma clara e efetiva',
      evaluation: null
    }
  ],
  levelRequirements: [
    { tagId: 'ic01', pointsRequired: 10 },
    { tagId: 'ic02', pointsRequired: 20 },
    { tagId: 'ic03', pointsRequired: 30 },
    { tagId: 'ic04', pointsRequired: 40 },
    { tagId: 'ic05', pointsRequired: 50 }
  ]
};

const mobileTrack: Branch = {
  id: 'mobile',
  name: 'Mobile Development',
  color: '#3498DB',
  commits: [
    {
      id: 'mb-1',
      behaviorDescription: 'Desenvolve interfaces nativas seguindo guidelines da plataforma',
      evaluation: null
    },
    {
      id: 'mb-2',
      behaviorDescription: 'Gerencia estados e ciclo de vida de apps mobile',
      evaluation: null
    },
    {
      id: 'mb-3',
      behaviorDescription: 'Implementa features específicas de dispositivos móveis',
      evaluation: null
    },
    {
      id: 'mb-4',
      behaviorDescription: 'Otimiza performance e consumo de recursos',
      evaluation: null
    },
    {
      id: 'mb-5',
      behaviorDescription: 'Implementa armazenamento local e sincronização offline',
      evaluation: null
    }
  ],
  levelRequirements: [
    { tagId: 'ic01', pointsRequired: 10 },
    { tagId: 'ic02', pointsRequired: 20 },
    { tagId: 'ic03', pointsRequired: 30 },
    { tagId: 'ic04', pointsRequired: 40 },
    { tagId: 'ic05', pointsRequired: 50 }
  ]
};

const cloudTrack: Branch = {
  id: 'cloud',
  name: 'Cloud Infrastructure',
  color: '#E67E22',
  commits: [
    {
      id: 'cl-1',
      behaviorDescription: 'Provisiona e gerencia recursos em nuvem',
      evaluation: null
    },
    {
      id: 'cl-2',
      behaviorDescription: 'Implementa práticas de segurança em nuvem',
      evaluation: null
    },
    {
      id: 'cl-3',
      behaviorDescription: 'Desenvolve arquiteturas serverless básicas',
      evaluation: null
    },
    {
      id: 'cl-4',
      behaviorDescription: 'Configura monitoramento e logging',
      evaluation: null
    },
    {
      id: 'cl-5',
      behaviorDescription: 'Otimiza custos de recursos em nuvem',
      evaluation: null
    }
  ],
  levelRequirements: [
    { tagId: 'ic01', pointsRequired: 10 },
    { tagId: 'ic02', pointsRequired: 20 },
    { tagId: 'ic03', pointsRequired: 30 },
    { tagId: 'ic04', pointsRequired: 40 },
    { tagId: 'ic05', pointsRequired: 50 }
  ]
};

const firmwareTrack: Branch = {
  id: 'firmware',
  name: 'Firmware Development',
  color: '#8E44AD',
  commits: [
    {
      id: 'fw-1',
      behaviorDescription: 'Desenvolve código otimizado para sistemas embarcados',
      evaluation: null
    },
    {
      id: 'fw-2',
      behaviorDescription: 'Implementa comunicação com periféricos',
      evaluation: null
    },
    {
      id: 'fw-3',
      behaviorDescription: 'Desenvolve drivers para hardware específico',
      evaluation: null
    },
    {
      id: 'fw-4',
      behaviorDescription: 'Implementa tratamento de interrupções e timers',
      evaluation: null
    },
    {
      id: 'fw-5',
      behaviorDescription: 'Otimiza consumo de energia em sistemas embarcados',
      evaluation: null
    }
  ],
  levelRequirements: [
    { tagId: 'ic01', pointsRequired: 10 },
    { tagId: 'ic02', pointsRequired: 20 },
    { tagId: 'ic03', pointsRequired: 30 },
    { tagId: 'ic04', pointsRequired: 40 },
    { tagId: 'ic05', pointsRequired: 50 }
  ]
};

const fullStackTrack: Branch = {
  id: 'full-stack',
  name: 'Full-Stack Development',
  color: '#8854d0',
  commits: [
    {
      id: 'fs-01',
      behaviorDescription: 'Desenvolve interfaces responsivas e componentes reutilizáveis',
      evaluation: null
    },
    {
      id: 'fs-02',
      behaviorDescription: 'Implementa APIs RESTful seguindo padrões e documentação adequada',
      evaluation: null
    },
    {
      id: 'fs-03',
      behaviorDescription: 'Gerencia estado e integração entre front-end e back-end',
      evaluation: null
    },
    {
      id: 'fs-04',
      behaviorDescription: 'Modela e otimiza bancos de dados para aplicações full-stack',
      evaluation: null
    },
    {
      id: 'fs-05',
      behaviorDescription: 'Implementa deploys e CI/CD para aplicações full-stack',
      evaluation: null
    }
  ],
  levelRequirements: [
    { tagId: 'ic01', pointsRequired: 10 },
    { tagId: 'ic02', pointsRequired: 20 },
    { tagId: 'ic03', pointsRequired: 30 },
    { tagId: 'ic04', pointsRequired: 40 },
    { tagId: 'ic05', pointsRequired: 50 }
  ]
};

const softwareCareerPath: SkillPath = {
  id: 'software-engineering',
  name: 'Engenharia de Software',
  description: 'Trilha de desenvolvimento para Engenheiros de Software',
  branches: [
    qualityBranch,
    securityBranch,
    architectureBranch,
    continuousDeliveryBranch,
    frontEndTrack,
    backEndTrack,
    fullStackTrack,
    dataScienceTrack,
    mobileTrack,
    cloudTrack,
    firmwareTrack,
  ],
  tags: [
    {
      id: 'ic01',
      name: 'IC01',
      level: 'Júnior',
      pointsRequired: 10,
      description: 'Júnior - Atua com orientação em tarefas com estrutura e baixa ambiguidade'
    },
    {
      id: 'ic02',
      name: 'IC02',
      level: 'Pleno',
      pointsRequired: 20,
      description: 'Pleno - Atua com autonomia em tarefas completas e colabora com o time'
    },
    {
      id: 'ic03',
      name: 'IC03',
      level: 'Sênior',
      pointsRequired: 30,
      description: 'Sênior - Resolve problemas complexos e guia tecnicamente outras pessoas'
    },
    {
      id: 'ic04',
      name: 'IC04',
      level: 'Staff',
      pointsRequired: 40,
      description: 'Staff - Atua em decisões técnicas amplas, influencia padrões e arquitetura'
    },
    {
      id: 'ic05',
      name: 'IC05',
      level: 'Principal',
      pointsRequired: 50,
      description: 'Principal - Lidera técnica e estrategicamente múltiplos times ou domínios'
    },
    {
      id: 'em01',
      name: 'EM01',
      level: 'Coordenador',
      pointsRequired: 60,
      description: 'Coordenador - Mesmo escopo que Staff, com foco em coordenação de pessoas e processos'
    },
    {
      id: 'em02',
      name: 'EM02',
      level: 'Gerente',
      pointsRequired: 70,
      description: 'Gerente - Mesmo escopo que Principal, com foco em direção técnica e organizacional'
    }
  ]
};

export default softwareCareerPath;
