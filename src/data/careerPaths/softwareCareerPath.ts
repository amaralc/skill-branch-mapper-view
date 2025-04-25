import { Branch, SkillPath } from '@/types/skill';

const qualityBranch: Branch = {
  id: 'qualidade',
  name: 'Qualidade de Software',
  color: '#3498db',
  commits: [
    {
      id: 'quality-01',
      message: 'Testa como o usuário final e busca aprender com falhas que poderiam passar despercebidas',
      description: '',
      evaluation: null
    },
    {
      id: 'quality-02',
      message: 'Revisa sua entrega com atenção, corrigindo falhas e aprendendo com os próprios erros',
      description: '',
      evaluation: null
    },
    {
      id: 'quality-03',
      message: 'Escreve testes úteis e entende melhor o comportamento esperado do sistema',
      description: '',
      evaluation: null
    },
    {
      id: 'quality-04',
      message: 'Cria testes para falhas encontradas, aprendendo a evitar regressões com confiança',
      description: '',
      evaluation: null
    },
    {
      id: 'quality-05',
      message: 'Participa de revisões e pares com atenção, aprendendo e aplicando padrões de qualidade do time',
      description: '',
      evaluation: null
    },
    {
      id: 'quality-06',
      message: 'Garante por conta própria que o usuário final não perceba falhas na experiência',
      description: '',
      evaluation: null
    },
    {
      id: 'quality-07',
      message: 'Valida a qualidade da entrega com rigor antes de envolver QA ou revisão técnica',
      description: '',
      evaluation: null
    },
    {
      id: 'quality-08',
      message: 'Escreve testes claros e confiáveis para validar os cenários que entrega',
      description: '',
      evaluation: null
    },
    {
      id: 'quality-09',
      message: 'Reproduz falhas reportadas com testes e ajuda colegas a evitar regressões',
      description: '',
      evaluation: null
    },
    {
      id: 'quality-10',
      message: 'Revisa com critério e orienta colegas em pares para elevar o padrão do time',
      description: '',
      evaluation: null
    },
    {
      id: 'quality-11',
      message: 'Antecipa falhas que afetariam o usuário e ajusta a entrega antes que elas ocorram',
      description: '',
      evaluation: null
    },
    {
      id: 'quality-12',
      message: 'Garante qualidade de ponta a ponta com autonomia, mesmo em cenários ambíguos',
      description: '',
      evaluation: null
    },
    {
      id: 'quality-13',
      message: 'Escreve testes completos, legíveis e sustentáveis para o time',
      description: '',
      evaluation: null
    },
    {
      id: 'quality-14',
      message: 'Traduz falhas reais em testes robustos e compartilha o aprendizado com o time',
      description: '',
      evaluation: null
    },
    {
      id: 'quality-15',
      message: 'Conduz revisões e pares com profundidade, formando o critério técnico do time',
      description: '',
      evaluation: null
    },
    {
      id: 'quality-16',
      message: 'Estabelece práticas que evitam falhas perceptíveis em escala, com foco na experiência do usuário',
      description: '',
      evaluation: null
    },
    {
      id: 'quality-17',
      message: 'Cria padrões e ferramentas que tornam a qualidade parte natural do fluxo de entrega',
      description: '',
      evaluation: null
    },
    {
      id: 'quality-18',
      message: 'Define critérios e estruturas de teste que fortalecem a confiabilidade do sistema',
      description: '',
      evaluation: null
    },
    {
      id: 'quality-19',
      message: 'Sistematiza testes para falhas críticas e orienta prevenção em escala no time',
      description: '',
      evaluation: null
    },
    {
      id: 'quality-20',
      message: 'Promove revisões e pares intencionais para desenvolver critério técnico no time',
      description: '',
      evaluation: null
    },
    {
      id: 'quality-21',
      message: 'Garante que falhas perceptíveis ao usuário sejam raras e evitadas sistemicamente',
      description: '',
      evaluation: null
    },
    {
      id: 'quality-22',
      message: 'Influencia times e áreas a tornarem a qualidade parte natural do fluxo de entrega',
      description: '',
      evaluation: null
    },
    {
      id: 'quality-23',
      message: 'Evolui critérios de testabilidade e práticas que aumentam a confiança em sistemas críticos',
      description: '',
      evaluation: null
    },
    {
      id: 'quality-24',
      message: 'Estabelece padrões de prevenção e resposta a falhas com impacto além do próprio time',
      description: '',
      evaluation: null
    },
    {
      id: 'quality-25',
      message: 'Constrói uma cultura de revisão e pairing que eleva o nível técnico da organização',
      description: '',
      evaluation: null
    }
  ]
};

const securityBranch: Branch = {
  id: 'seguranca',
  name: 'Segurança de Software',
  color: '#e74c3c',
  commits: [
    {
      id: 'security-1',
      message: 'Aplica princípios de segurança no desenvolvimento de software',
      description: 'Implementa medidas de segurança para proteger o sistema contra ameaças',
      evaluation: null
    },
    {
      id: 'security-2',
      message: 'Realiza testes de segurança para identificar vulnerabilidades',
      description: 'Utiliza ferramentas de teste de segurança para encontrar falhas no sistema',
      evaluation: null
    },
    {
      id: 'security-3',
      message: 'Implementa medidas de proteção contra ataques de injeção de código',
      description: 'Valida e sanitiza os dados de entrada para evitar ataques de injeção',
      evaluation: null
    },
    {
      id: 'security-4',
      message: 'Utiliza criptografia para proteger os dados confidenciais',
      description: 'Criptografa os dados em repouso e em trânsito para evitar o acesso não autorizado',
      evaluation: null
    },
    {
      id: 'security-5',
      message: 'Implementa autenticação e autorização para controlar o acesso ao sistema',
      description: 'Verifica a identidade dos usuários e controla o acesso aos recursos do sistema',
      evaluation: null
    }
  ]
};

const softwareEngineeringBranch: Branch = {
  id: 'engenharia-software',
  name: 'Engenharia de Software',
  color: '#2ecc71',
  commits: [
    {
      id: 'software-1',
      message: 'Escreve código limpo e legível',
      description: 'Utiliza nomes significativos, formatação consistente e comentários claros',
      evaluation: null
    },
    {
      id: 'software-2',
      message: 'Aplica princípios de design de software',
      description: 'Utiliza padrões de projeto, SOLID e outros princípios para criar um sistema flexível e manutenível',
      evaluation: null
    },
    {
      id: 'software-3',
      message: 'Utiliza controle de versão para gerenciar o código',
      description: 'Cria branches, faz commits e merge de código utilizando Git',
      evaluation: null
    },
    {
      id: 'software-4',
      message: 'Participa de discussões técnicas para definir a arquitetura do sistema',
      description: 'Colabora com outros membros da equipe para tomar decisões sobre a estrutura do sistema',
      evaluation: null
    },
    {
      id: 'software-5',
      message: 'Resolve problemas de forma eficiente',
      description: 'Analisa o problema, propõe soluções e implementa a melhor solução',
      evaluation: null
    }
  ]
};

const continuousDeliveryBranch: Branch = {
  id: 'entrega-continua',
  name: 'Entrega Contínua',
  color: '#f39c12',
  commits: [
    {
      id: 'delivery-1',
      message: 'Automatiza o processo de build e teste',
      description: 'Cria scripts para compilar o código, executar testes e gerar relatórios',
      evaluation: null
    },
    {
      id: 'delivery-2',
      message: 'Automatiza o processo de deploy',
      description: 'Cria scripts para implantar o sistema em diferentes ambientes',
      evaluation: null
    },
    {
      id: 'delivery-3',
      message: 'Monitora o sistema em produção',
      description: 'Utiliza ferramentas de monitoramento para identificar problemas e gargalos',
      evaluation: null
    },
    {
      id: 'delivery-4',
      message: 'Realiza rollbacks em caso de falha',
      description: 'Reverte o sistema para uma versão anterior em caso de problemas',
      evaluation: null
    },
    {
      id: 'delivery-5',
      message: 'Participa de discussões sobre o processo de entrega contínua',
      description: 'Colabora com outros membros da equipe para melhorar o processo de entrega contínua',
      evaluation: null
    }
  ]
};

const frontEndTrack: Branch = {
  id: 'front-end',
  name: 'Front-End Development',
  color: '#FF6B6B',
  commits: [
    {
      id: 'fe-1',
      message: 'Implementa interfaces responsivas seguindo princípios de design mobile-first',
      description: 'Demonstra capacidade de criar layouts adaptáveis para diferentes dispositivos',
      evaluation: null
    },
    {
      id: 'fe-2',
      message: 'Aplica boas práticas de acessibilidade web (WCAG)',
      description: 'Garante que as interfaces sejam acessíveis para todos os usuários',
      evaluation: null
    },
    {
      id: 'fe-3',
      message: 'Otimiza performance do front-end utilizando técnicas modernas',
      description: 'Implementa lazy loading, code splitting e outras otimizações',
      evaluation: null
    },
    {
      id: 'fe-4',
      message: 'Desenvolve componentes reutilizáveis e mantém consistência visual',
      description: 'Cria sistemas de design escaláveis e documenta componentes',
      evaluation: null
    },
    {
      id: 'fe-5',
      message: 'Implementa integrações com APIs RESTful de forma eficiente',
      description: 'Gerencia estados, loading e tratamento de erros adequadamente',
      evaluation: null
    }
  ]
};

const backEndTrack: Branch = {
  id: 'back-end',
  name: 'Back-End Development',
  color: '#4ECDC4',
  commits: [
    {
      id: 'be-1',
      message: 'Desenvolve APIs RESTful seguindo padrões e boas práticas',
      description: 'Implementa endpoints com documentação adequada e versionamento',
      evaluation: null
    },
    {
      id: 'be-2',
      message: 'Implementa autenticação e autorização de forma segura',
      description: 'Utiliza JWT, OAuth e controle de acesso baseado em roles',
      evaluation: null
    },
    {
      id: 'be-3',
 message: 'Modela bancos de dados relacionais de forma eficiente',
      description: 'Cria schemas otimizados e implementa índices adequados',
      evaluation: null
    },
    {
      id: 'be-4',
      message: 'Desenvolve serviços com alta disponibilidade e escalabilidade',
      description: 'Implementa cache, filas e estratégias de resiliência',
      evaluation: null
    },
    {
      id: 'be-5',
      message: 'Monitora e otimiza performance de aplicações backend',
      description: 'Utiliza ferramentas de APM e implementa melhorias',
      evaluation: null
    }
  ]
};

const dataScienceTrack: Branch = {
  id: 'data-science',
  name: 'Data Science',
  color: '#9B59B6',
  commits: [
    {
      id: 'ds-1',
      message: 'Realiza análise exploratória de dados efetivamente',
      description: 'Utiliza técnicas estatísticas e visualizações adequadas',
      evaluation: null
    },
    {
      id: 'ds-2',
      message: 'Prepara e limpa dados para análise',
      description: 'Trata missing values, outliers e normaliza dados',
      evaluation: null
    },
    {
      id: 'ds-3',
      message: 'Desenvolve modelos de machine learning básicos',
      description: 'Implementa regressão, classificação e clustering',
      evaluation: null
    },
    {
      id: 'ds-4',
      message: 'Avalia e valida modelos adequadamente',
      description: 'Utiliza métricas apropriadas e cross-validation',
      evaluation: null
    },
    {
      id: 'ds-5',
      message: 'Comunica resultados de forma clara e efetiva',
      description: 'Cria visualizações e relatórios compreensíveis',
      evaluation: null
    }
  ]
};

const mobileTrack: Branch = {
  id: 'mobile',
  name: 'Mobile Development',
  color: '#3498DB',
  commits: [
    {
      id: 'mb-1',
      message: 'Desenvolve interfaces nativas seguindo guidelines da plataforma',
      description: 'Implementa UI/UX conforme Material Design e Human Interface Guidelines',
      evaluation: null
    },
    {
      id: 'mb-2',
      message: 'Gerencia estados e ciclo de vida de apps mobile',
      description: 'Lida com background/foreground e preservação de estado',
      evaluation: null
    },
    {
      id: 'mb-3',
      message: 'Implementa features específicas de dispositivos móveis',
      description: 'Utiliza câmera, GPS, notificações push e sensores',
      evaluation: null
    },
    {
      id: 'mb-4',
      message: 'Otimiza performance e consumo de recursos',
      description: 'Gerencia memória, bateria e dados móveis eficientemente',
      evaluation: null
    },
    {
      id: 'mb-5',
      message: 'Implementa armazenamento local e sincronização offline',
      description: 'Utiliza SQLite e estratégias de sincronização',
      evaluation: null
    }
  ]
};

const cloudTrack: Branch = {
  id: 'cloud',
  name: 'Cloud Infrastructure',
  color: '#E67E22',
  commits: [
    {
      id: 'cl-1',
      message: 'Provisiona e gerencia recursos em nuvem',
      description: 'Utiliza IaC para criar e manter infraestrutura',
      evaluation: null
    },
    {
      id: 'cl-2',
      message: 'Implementa práticas de segurança em nuvem',
      description: 'Configura IAM, security groups e encryption',
      evaluation: null
    },
    {
      id: 'cl-3',
      message: 'Desenvolve arquiteturas serverless básicas',
      description: 'Utiliza funções lambda e serviços gerenciados',
      evaluation: null
    },
    {
      id: 'cl-4',
      message: 'Configura monitoramento e logging',
      description: 'Implementa métricas, alertas e centralização de logs',
      evaluation: null
    },
    {
      id: 'cl-5',
      message: 'Otimiza custos de recursos em nuvem',
      description: 'Implementa auto-scaling e gerenciamento de recursos',
      evaluation: null
    }
  ]
};

const firmwareTrack: Branch = {
  id: 'firmware',
  name: 'Firmware Development',
  color: '#8E44AD',
  commits: [
    {
      id: 'fw-1',
      message: 'Desenvolve código otimizado para sistemas embarcados',
      description: 'Escreve código eficiente em memória e processamento',
      evaluation: null
    },
    {
      id: 'fw-2',
      message: 'Implementa comunicação com periféricos',
      description: 'Utiliza protocolos como I2C, SPI e UART',
      evaluation: null
    },
    {
      id: 'fw-3',
      message: 'Desenvolve drivers para hardware específico',
      description: 'Implementa interfaces com sensores e atuadores',
      evaluation: null
    },
    {
      id: 'fw-4',
      message: 'Implementa tratamento de interrupções e timers',
      description: 'Gerencia eventos de hardware e temporização',
      evaluation: null
    },
    {
      id: 'fw-5',
      message: 'Otimiza consumo de energia em sistemas embarcados',
      description: 'Implementa modos de baixo consumo e sleep',
      evaluation: null
    }
  ]
};

const softwareCareerPath: SkillPath = {
  id: 'software-engineering',
  name: 'Engenharia de Software',
  description: 'Trilha de desenvolvimento para Engenheiros de Software',
  branches: [
    qualityBranch,
    securityBranch,
    softwareEngineeringBranch,
    continuousDeliveryBranch,
    frontEndTrack,
    backEndTrack,
    dataScienceTrack,
    mobileTrack,
    cloudTrack,
    firmwareTrack,
  ],
  tags: [
    {
      id: 'ic00',
      name: 'IC0',
      level: 'Júnior',
      pointsRequired: 0,
      description: 'Primeiro nível da carreira de engenharia de software'
    },
    {
      id: 'ic01',
      name: 'IC1',
      level: 'Júnior',
      pointsRequired: 10,
      description: 'Segundo nível da carreira de engenharia de software'
    },
    {
      id: 'ic02',
      name: 'IC2',
      level: 'Pleno',
      pointsRequired: 20,
      description: 'Terceiro nível da carreira de engenharia de software'
    },
    {
      id: 'ic03',
      name: 'IC3',
      level: 'Pleno',
      pointsRequired: 30,
      description: 'Quarto nível da carreira de engenharia de software'
    },
    {
      id: 'ic04',
      name: 'IC4',
      level: 'Sênior',
      pointsRequired: 40,
      description: 'Quinto nível da carreira de engenharia de software'
    },
  ]
};

export default softwareCareerPath;
