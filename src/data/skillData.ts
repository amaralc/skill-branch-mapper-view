// Dados das competências, branches, commits e tags

export interface Commit {
  id: string;
  message: string;
  description: string;
  evaluation: 'never' | 'sometimes' | 'always' | null;
}

export interface Branch {
  id: string;
  name: string;
  color: string;
  commits: Commit[];
}

export interface Tag {
  id: string;
  name: string;
  level: string;
  pointsRequired: number;
  description?: string;
}

export interface SkillPath {
  id: string;
  name: string;
  description: string;
  branches: Branch[];
  tags: Tag[];
}

// Trilha Engenharia de Software
const softwareCareerPath: SkillPath = {
  id: "software-career-path",
  name: "Engenharia de Software",
  description: "Trilhas de conhecimento em Qualidade, Segurança, Engenharia, Entrega Contínua e Full-Stack",
  branches: [
    {
      id: "qualidade",
      name: "Qualidade",
      color: "#4CAF50",
      commits: [
        { id: "q1", message: "Testa como o usuário final e busca aprender com falhas que poderiam passar despercebidas", description: "", evaluation: 'never' },
        { id: "q2", message: "Revisa sua entrega com atenção, corrigindo falhas e aprendendo com os próprios erros", description: "", evaluation: 'never' },
        { id: "q3", message: "Escreve testes úteis e entende melhor o comportamento esperado do sistema", description: "", evaluation: 'never' },
        { id: "q4", message: "Cria testes para falhas encontradas, aprendendo a evitar regressões com confiança", description: "", evaluation: 'never' },
        { id: "q5", message: "Participa de revisões e pares com atenção, aprendendo e aplicando padrões de qualidade do time", description: "", evaluation: 'never' },

        { id: "q6", message: "Garante por conta própria que o usuário final não perceba falhas na experiência", description: "", evaluation: 'never' },
        { id: "q7", message: "Valida a qualidade da entrega com rigor antes de envolver QA ou revisão técnica", description: "", evaluation: 'never' },
        { id: "q8", message: "Escreve testes claros e confiáveis para validar os cenários que entrega", description: "", evaluation: 'never' },
        { id: "q9", message: "Reproduz falhas reportadas com testes e ajuda colegas a evitar regressões", description: "", evaluation: 'never' },
        { id: "q10", message: "Revisa com critério e orienta colegas em pares para elevar o padrão do time", description: "", evaluation: 'never' },

        { id: "q11", message: "Antecipa falhas que afetariam o usuário e ajusta a entrega antes que elas ocorram", description: "", evaluation: 'never' },
        { id: "q12", message: "Garante qualidade de ponta a ponta com autonomia, mesmo em cenários ambíguos", description: "", evaluation: 'never' },
        { id: "q13", message: "Escreve testes completos, legíveis e sustentáveis para o time", description: "", evaluation: 'never' },
        { id: "q14", message: "Traduz falhas reais em testes robustos e compartilha o aprendizado com o time", description: "", evaluation: 'never' },
        { id: "q15", message: "Conduz revisões e pares com profundidade, formando o critério técnico do time", description: "", evaluation: 'never' },

        { id: "q16", message: "Estabelece práticas que evitam falhas perceptíveis em escala, com foco na experiência do usuário", description: "", evaluation: 'never' },
        { id: "q17", message: "Cria padrões e ferramentas que tornam a qualidade parte natural do fluxo de entrega", description: "", evaluation: 'never' },
        { id: "q18", message: "Define critérios e estruturas de teste que fortalecem a confiabilidade do sistema", description: "", evaluation: 'never' },
        { id: "q19", message: "Sistematiza testes para falhas críticas e orienta prevenção em escala no time", description: "", evaluation: 'never' },
        { id: "q20", message: "Promove revisões e pares intencionais para desenvolver critério técnico no time", description: "", evaluation: 'never' },

        { id: "q21", message: "Garante que falhas perceptíveis ao usuário sejam raras e evitadas sistemicamente", description: "", evaluation: 'never' },
        { id: "q22", message: "Influencia times e áreas a tornarem a qualidade parte natural do fluxo de entrega", description: "", evaluation: 'never' },
        { id: "q23", message: "Evolui critérios de testabilidade e práticas que aumentam a confiança em sistemas críticos", description: "", evaluation: 'never' },
        { id: "q24", message: "Estabelece padrões de prevenção e resposta a falhas com impacto além do próprio time", description: "", evaluation: 'never' },
        { id: "q25", message: "Constrói uma cultura de revisão e pairing que eleva o nível técnico da organização", description: "", evaluation: 'never' }
      ]
    },
    {
      id: "seguranca",
      name: "Segurança",
      color: "#EF4444",
      commits: [
        { id: "s1", message: "Evita expor dados sensíveis e aplica variáveis de ambiente com apoio e atenção ao detalhe", description: "", evaluation: null },
        { id: "s2", message: "Lê relatórios de SAST e busca entender vulnerabilidades OWASP, com ajuda, corrigindo o que entrega", description: "", evaluation: null },
        { id: "s3", message: "Usa autenticação e permissões com apoio, e entende seu papel nos fluxos seguros do time", description: "", evaluation: null },
        { id: "s4", message: "Cria testes para falhas conhecidas que entregou, com supervisão, garantindo que não voltem", description: "", evaluation: null },
        { id: "s5", message: "Reporta falhas com clareza, busca entender causas e aprende com o time como preveni-las", description: "", evaluation: null },
        
        { id: "s6", message: "Garante que tokens e dados sensíveis não sejam expostos em commits, logs ou respostas HTTP", description: "", evaluation: null },
        { id: "s7", message: "Monitora alertas de SAST e previne riscos conhecidos com base no OWASP Top 10", description: "", evaluation: null },
        { id: "s8", message: "Usa e configura corretamente autenticação, RBAC e ferramentas de scan e segurança exigidas", description: "", evaluation: null },
        { id: "s9", message: "Cria testes automatizados para cobrir falhas reportadas e prevenir reincidência", description: "", evaluation: null },
        { id: "s10", message: "Corrige falhas com agilidade e compartilha aprendizados com o time em revisão ou retro", description: "", evaluation: null },
        
        { id: "s11", message: "Garante que não haja vazamento de segredos em nenhum ponto da stack sob sua responsabilidade", description: "", evaluation: null },
        { id: "s12", message: "Interpreta alertas de SAST e previne vulnerabilidades OWASP com ações corretivas antes do deploy", description: "", evaluation: null },
        { id: "s13", message: "Implementa e reforça o uso correto de autenticação, RBAC e scanners em serviços sob responsabilidade de sua equipe", description: "", evaluation: null },
        { id: "s14", message: "Automatiza testes para falhas críticas e orienta o time na construção de simulações seguras", description: "", evaluation: null },
        { id: "s15", message: "Lidera atuação rápida em falhas, propõe melhorias e promove compartilhamento de aprendizados ativamente", description: "", evaluation: null },
        
        { id: "s16", message: "Define e audita práticas seguras de gestão de segredos em todo o time ou domínio técnico", description: "", evaluation: null },
        { id: "s17", message: "Garante que relatórios de SAST sejam tratados com prioridade e que riscos OWASP sejam mitigados", description: "", evaluation: null },
        { id: "s18", message: "Promove a adoção consistente de controles como RBAC, SCA, SSO, MFA e scanners de vulnerabilidade", description: "", evaluation: null },
        { id: "s19", message: "Estabelece padrões de testabilidade em segurança e cria exemplos para serem replicados", description: "", evaluation: null },
        { id: "s20", message: "Conduz análises pós-incidente, catalisa ações corretivas e institucionaliza aprendizados", description: "", evaluation: null },
        
        { id: "s21", message: "Define padrões e ferramentas seguras para gestão de segredos em escala organizacional", description: "", evaluation: null },
        { id: "s22", message: "Influencia processos de tratamento de vulnerabilidades e incorpora OWASP em revisões e projetos", description: "", evaluation: null },
        { id: "s23", message: "Garante adoção consistente de controles em sistemas críticos e orienta decisões de arquitetura", description: "", evaluation: null },
        { id: "s24", message: "Estabelece práticas de testabilidade em segurança aplicáveis a múltiplos times ou produtos", description: "", evaluation: null },
        { id: "s25", message: "Lidera resposta a falhas críticas, compartilha lições e muda processos para prevenir recorrência", description: "", evaluation: null },
        
        { id: "s26", message: "Garante que o time use práticas e ferramentas seguras, treinando quem ainda tem lacunas", description: "", evaluation: null },
        { id: "s27", message: "Estimula acompanhamento regular de relatórios e promove aprendizado técnico com base nos alertas", description: "", evaluation: null },
        { id: "s28", message: "Remove barreiras para adoção dos controles e reforça sua aplicação no dia a dia", description: "", evaluation: null },
        { id: "s29", message: "Incentiva o time a automatizar prevenção com exemplos reais, revisando cobertura junto aos devs", description: "", evaluation: null },
        { id: "s30", message: "Facilita discussões pós-falha, garante ações corretivas e aprendizado distribuído", description: "", evaluation: null },
        
        { id: "s31", message: "Cria padrões e governança que previnem exposição de dados sensíveis em toda a organização", description: "", evaluation: null },
        { id: "s32", message: "Garante que times monitorem vulnerabilidades e que planos de ação estejam integrados à rotina", description: "", evaluation: null },
        { id: "s33", message: "Assegura que ferramentas, práticas e políticas estejam implantadas e operantes em todas as áreas", description: "", evaluation: null },
        { id: "s34", message: "Promove cultura de prevenção baseada em testes e simulações, com investimento e apoio transversal", description: "", evaluation: null },
        { id: "s35", message: "Estimula aprendizado organizacional a partir de incidentes e define resposta padrão para riscos", description: "", evaluation: null }
      ]
    },
    {
      id: "engenharia",
      name: "Engenharia de Software",
      color: "#6366F1",
      commits: [
        { id: "e1", message: "Domina versionamento com Git", description: "", evaluation: 'never' },
        { id: "e2", message: "Pratica arquitetura modular", description: "", evaluation: 'never' },
        { id: "e3", message: "Aplica princípios SOLID", description: "", evaluation: 'never' },
        { id: "e4", message: "Faz code review construtivo", description: "", evaluation: 'never' },
        { id: "e5", message: "Participa ativamente de cerimônias técnicas", description: "", evaluation: 'never' }
      ]
    },
    {
      id: "entrega-continua",
      name: "Entrega Contínua",
      color: "#F59E42",
      commits: [
        { id: "ec1", message: "Utiliza pipelines de CI/CD", description: "", evaluation: 'never' },
        { id: "ec2", message: "Gerencia releases de forma incremental", description: "", evaluation: 'never' },
        { id: "ec3", message: "Implementa observabilidade", description: "", evaluation: 'never' },
        { id: "ec4", message: "Realiza rollback com segurança", description: "", evaluation: 'never' },
        { id: "ec5", message: "Valida entregas em ambiente de staging", description: "", evaluation: 'never' }
      ]
    },
    {
      id: "especialidade",
      name: "Especialidade (Full-Stack)",
      color: "#22C55E",
      commits: [
        { id: "es1", message: "Desenvolve backend escalável", description: "", evaluation: 'never' },
        { id: "es2", message: "Estrutura frontends modernos", description: "", evaluation: 'never' },
        { id: "es3", message: "Integra soluções de banco de dados", description: "", evaluation: 'never' },
        { id: "es4", message: "Realiza deploy full-stack", description: "", evaluation: 'never' },
        { id: "es5", message: "Interage com times multidisciplinares", description: "", evaluation: 'never' }
      ]
    }
  ],
  tags: [
    {
      id: "ic01",
      name: "IC01",
      level: "Iniciante",
      pointsRequired: 10,
      description: "Nível de senioridade inicial - Demonstra comportamentos básicos em todas as áreas"
    },
    {
      id: "ic02",
      name: "IC02",
      level: "Intermediário",
      pointsRequired: 20,
      description: "Nível de senioridade intermediário - Demonstra comportamentos consistentes em todas as áreas"
    },
    {
      id: "ic03",
      name: "IC03",
      level: "Avançado",
      pointsRequired: 30,
      description: "Nível de senioridade avançado - Demonstra comportamentos avançados em todas as áreas"
    },
    {
      id: "ic04",
      name: "IC04",
      level: "Especialista",
      pointsRequired: 40,
      description: "Nível de senioridade especialista - Demonstra comportamentos de liderança técnica"
    },
    {
      id: "ic05",
      name: "IC05",
      level: "Liderança",
      pointsRequired: 50,
      description: "Nível de senioridade sênior - Demonstra comportamentos de liderança e influência"
    },
    {
      id: "em01",
      name: "EM01",
      level: "Gestor",
      pointsRequired: 60,
      description: "Nível de gestão - Demonstra capacidade de gestão de equipes e processos"
    }
  ]
};

// Trilha Gestão de Produtos (estrutura SkillPath)
const productManagementPath: SkillPath = {
  id: "product-management",
  name: "Gestão de Produtos",
  description: "Trilha de habilidades essenciais para profissionais de gestão de produtos.",
  branches: [
    {
      id: "prod1",
      name: "Fundamentos de Gestão de Produtos",
      color: "#f97316",
      commits: [
        {
          id: "pcommit1",
          message: "Entendimento do usuário",
          description: "Identificar e compreender as necessidades do usuário.",
          evaluation: null
        },
        {
          id: "pcommit2",
          message: "Visão de Produto",
          description: "Definir a visão do produto e alinhar ao negócio.",
          evaluation: null
        }
      ]
    }
    // Outras branches podem ser adicionadas seguindo o padrão acima
  ],
  tags: [
    {
      id: "nivel1",
      name: "Nível 1 - Júnior",
      level: "Júnior",
      pointsRequired: 2,
      description: "Conhecimento inicial sobre produto."
    },
    {
      id: "nivel2",
      name: "Nível 2 - Pleno",
      level: "Pleno",
      pointsRequired: 4,
      description: "Experiência intermediária em gestão de produtos."
    }
  ]
};

// Agora exportamos todas as trilhas disponíveis no projeto como um array
export const careerPaths: SkillPath[] = [softwareCareerPath, productManagementPath];

export const calculatePoints = (path: SkillPath): number => {
  let totalPoints = 0;

  path.branches.forEach(branch => {
    branch.commits.forEach(commit => {
      if (commit.evaluation === 'never') totalPoints += 0;
      else if (commit.evaluation === 'sometimes') totalPoints += 1;
      else if (commit.evaluation === 'always') totalPoints += 2;
    });
  });

  return totalPoints;
};

export const getMaxPoints = (path: SkillPath): number => {
  let maxPoints = 0;
  
  path.branches.forEach(branch => {
    maxPoints += branch.commits.length * 2;
  });
  
  return maxPoints;
};

export const getCurrentLevel = (path: SkillPath): Tag | null => {
  const points = calculatePoints(path);
  
  // Ordenar tags por pontos necessários, do maior para o menor
  const sortedTags = [...path.tags].sort((a, b) => b.pointsRequired - a.pointsRequired);
  
  // Encontrar o maior nível que o usuário atingiu
  for (const tag of sortedTags) {
    if (points >= tag.pointsRequired) {
      return tag;
    }
  }
  
  return null;
};

export const getNextLevel = (path: SkillPath): Tag | null => {
  const points = calculatePoints(path);
  
  // Ordenar tags por pontos necessários, do menor para o maior
  const sortedTags = [...path.tags].sort((a, b) => a.pointsRequired - b.pointsRequired);
  
  // Encontrar o próximo nível que o usuário ainda não atingiu
  for (const tag of sortedTags) {
    if (points < tag.pointsRequired) {
      return tag;
    }
  }
  
  return null;
};
