
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
  branchId: string;
  commitIndex: number;
  pointsRequired: number;
  level: string;
}

export interface SkillPath {
  id: string;
  name: string;
  description: string;
  branches: Branch[];
  tags: Tag[];
}

// Nova trilha com as áreas solicitadas
export const dataScientistPath: SkillPath = {
  id: "software-career-path",
  name: "Trilha de Carreira em Software",
  description: "Trilhas de conhecimento em Qualidade, Segurança, Engenharia, Entrega Contínua e Full-Stack",
  branches: [
    {
      id: "qualidade",
      name: "Qualidade",
      color: "#4CAF50",
      commits: [
        { id: "q1", message: "Adota revisão de código", description: "Participa regularmente de revisões de código para manter o padrão e reduzir erros.", evaluation: null },
        { id: "q2", message: "Escreve testes automatizados", description: "Cria testes unitários, de integração e end-to-end.", evaluation: null },
        { id: "q3", message: "Documenta requisitos e comportamentos", description: "Mantém documentação clara sobre requisitos, bugs e funcionalidades.", evaluation: null },
        { id: "q4", message: "Conhece métricas de qualidade", description: "Interpreta métricas como cobertura de testes, defeitos por release e MTTR.", evaluation: null },
        { id: "q5", message: "Implementa práticas de melhoria contínua", description: "Sugere melhorias baseadas em resultados recorrentes ou métricas.", evaluation: null }
      ]
    },
    {
      id: "seguranca",
      name: "Segurança",
      color: "#EF4444",
      commits: [
        { id: "s1", message: "Segue boas práticas de segurança", description: "Aplica conceitos como validação de input e gerenciamento seguro de senhas.", evaluation: null },
        { id: "s2", message: "Conhece principais vulnerabilidades", description: "Está atento a OWASP Top 10 e ao impacto de vulnerabilidades comuns.", evaluation: null },
        { id: "s3", message: "Realiza revisão de segurança em código", description: "Participa de code reviews com foco em segurança.", evaluation: null },
        { id: "s4", message: "Gerencia segredos e chaves", description: "Evita expor chaves e utiliza cofres de segredos (ex: Vault, AWS Secrets).", evaluation: null },
        { id: "s5", message: "Monitora e responde a incidentes", description: "Está apto a identificar e agir frente a possíveis ameaças no sistema.", evaluation: null }
      ]
    },
    {
      id: "engenharia",
      name: "Engenharia de Software",
      color: "#6366F1",
      commits: [
        { id: "e1", message: "Domina versionamento com Git", description: "Utiliza ramificações, pull requests e resolves conflitos.", evaluation: null },
        { id: "e2", message: "Pratica arquitetura modular", description: "Divide aplicações em módulos/componentes reutilizáveis.", evaluation: null },
        { id: "e3", message: "Aplica princípios SOLID", description: "Adota padrões que aumentam a manutenibilidade do código.", evaluation: null },
        { id: "e4", message: "Faz code review construtivo", description: "Oferece feedback útil e aprende com revisões alheias.", evaluation: null },
        { id: "e5", message: "Participa ativamente de cerimônias técnicas", description: "Contribui em refinamentos, retrospectivas e discussões técnicas.", evaluation: null }
      ]
    },
    {
      id: "entrega-continua",
      name: "Entrega Contínua",
      color: "#F59E42",
      commits: [
        { id: "ec1", message: "Utiliza pipelines de CI/CD", description: "Automatiza builds, testes e deploys.", evaluation: null },
        { id: "ec2", message: "Gerencia releases de forma incremental", description: "Realiza deploys frequentes e com baixo risco.", evaluation: null },
        { id: "ec3", message: "Implementa observabilidade", description: "Adiciona logs, métricas e alertas adequados nas entregas.", evaluation: null },
        { id: "ec4", message: "Realiza rollback com segurança", description: "Tem processos claros para reverter mudanças problemáticas.", evaluation: null },
        { id: "ec5", message: "Valida entregas em ambiente de staging", description: "Testa funcionalidades antes da liberação para produção.", evaluation: null }
      ]
    },
    {
      id: "especialidade",
      name: "Especialidade (Full-Stack)",
      color: "#22C55E",
      commits: [
        { id: "es1", message: "Desenvolve backend escalável", description: "Implementa APIs REST ou GraphQL performáticas.", evaluation: null },
        { id: "es2", message: "Estrutura frontends modernos", description: "Utiliza frameworks e boas práticas em frontend.", evaluation: null },
        { id: "es3", message: "Integra soluções de banco de dados", description: "Escolhe e manipula bancos SQL/NoSQL adequados.", evaluation: null },
        { id: "es4", message: "Realiza deploy full-stack", description: "Publica aplicações integrando front, back e banco.", evaluation: null },
        { id: "es5", message: "Interage com times multidisciplinares", description: "Colabora de forma eficiente com outras áreas.", evaluation: null }
      ]
    }
  ],
  tags: [
    {
      id: "ic01",
      name: "IC01",
      branchId: "qualidade",
      commitIndex: 2,
      pointsRequired: 10,
      level: "Iniciante"
    },
    {
      id: "ic02",
      name: "IC02",
      branchId: "engenharia",
      commitIndex: 2,
      pointsRequired: 20,
      level: "Intermediário"
    },
    {
      id: "ic03",
      name: "IC03",
      branchId: "especialidade",
      commitIndex: 1,
      pointsRequired: 40,
      level: "Avançado"
    },
    {
      id: "ic04",
      name: "IC04",
      branchId: "especialidade",
      commitIndex: 3,
      pointsRequired: 60,
      level: "Especialista"
    },
    {
      id: "em01",
      name: "EM01",
      branchId: "engenharia",
      commitIndex: 4,
      pointsRequired: 60,
      level: "Gestor"
    }
  ]
};

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

