
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
        { id: "q1", message: "Testa como o usuário final e busca aprender com falhas que poderiam passar despercebidas", description: "", evaluation: null },
        { id: "q2", message: "Revisa sua entrega com atenção, corrigindo falhas e aprendendo com os próprios erros", description: "", evaluation: null },
        { id: "q3", message: "Escreve testes úteis e entende melhor o comportamento esperado do sistema", description: "", evaluation: null },
        { id: "q4", message: "Cria testes para falhas encontradas, aprendendo a evitar regressões com confiança", description: "", evaluation: null },
        { id: "q5", message: "Participa de revisões e pares com atenção, aprendendo e aplicando padrões de qualidade do time", description: "", evaluation: null },

        { id: "q6", message: "Garante por conta própria que o usuário final não perceba falhas na experiência", description: "", evaluation: null },
        { id: "q7", message: "Valida a qualidade da entrega com rigor antes de envolver QA ou revisão técnica", description: "", evaluation: null },
        { id: "q8", message: "Escreve testes claros e confiáveis para validar os cenários que entrega", description: "", evaluation: null },
        { id: "q9", message: "Reproduz falhas reportadas com testes e ajuda colegas a evitar regressões", description: "", evaluation: null },
        { id: "q10", message: "Revisa com critério e orienta colegas em pares para elevar o padrão do time", description: "", evaluation: null },

        { id: "q11", message: "Antecipa falhas que afetariam o usuário e ajusta a entrega antes que elas ocorram", description: "", evaluation: null },
        { id: "q12", message: "Garante qualidade de ponta a ponta com autonomia, mesmo em cenários ambíguos", description: "", evaluation: null },
        { id: "q13", message: "Escreve testes completos, legíveis e sustentáveis para o time", description: "", evaluation: null },
        { id: "q14", message: "Traduz falhas reais em testes robustos e compartilha o aprendizado com o time", description: "", evaluation: null },
        { id: "q15", message: "Conduz revisões e pares com profundidade, formando o critério técnico do time", description: "", evaluation: null },

        { id: "q16", message: "Estabelece práticas que evitam falhas perceptíveis em escala, com foco na experiência do usuário", description: "", evaluation: null },
        { id: "q17", message: "Cria padrões e ferramentas que tornam a qualidade parte natural do fluxo de entrega", description: "", evaluation: null },
        { id: "q18", message: "Define critérios e estruturas de teste que fortalecem a confiabilidade do sistema", description: "", evaluation: null },
        { id: "q19", message: "Sistematiza testes para falhas críticas e orienta prevenção em escala no time", description: "", evaluation: null },
        { id: "q20", message: "Promove revisões e pares intencionais para desenvolver critério técnico no time", description: "", evaluation: null },

        { id: "q21", message: "Garante que falhas perceptíveis ao usuário sejam raras e evitadas sistemicamente", description: "", evaluation: null },
        { id: "q22", message: "Influencia times e áreas a tornarem a qualidade parte natural do fluxo de entrega", description: "", evaluation: null },
        { id: "q23", message: "Evolui critérios de testabilidade e práticas que aumentam a confiança em sistemas críticos", description: "", evaluation: null },
        { id: "q24", message: "Estabelece padrões de prevenção e resposta a falhas com impacto além do próprio time", description: "", evaluation: null },
        { id: "q25", message: "Constrói uma cultura de revisão e pairing que eleva o nível técnico da organização", description: "", evaluation: null }
      ]
    },
    {
      id: "seguranca",
      name: "Segurança",
      color: "#EF4444",
      commits: [
        { id: "s1", message: "Segue boas práticas de segurança", description: "", evaluation: null },
        { id: "s2", message: "Conhece principais vulnerabilidades", description: "", evaluation: null },
        { id: "s3", message: "Realiza revisão de segurança em código", description: "", evaluation: null },
        { id: "s4", message: "Gerencia segredos e chaves", description: "", evaluation: null },
        { id: "s5", message: "Monitora e responde a incidentes", description: "", evaluation: null }
      ]
    },
    {
      id: "engenharia",
      name: "Engenharia de Software",
      color: "#6366F1",
      commits: [
        { id: "e1", message: "Domina versionamento com Git", description: "", evaluation: null },
        { id: "e2", message: "Pratica arquitetura modular", description: "", evaluation: null },
        { id: "e3", message: "Aplica princípios SOLID", description: "", evaluation: null },
        { id: "e4", message: "Faz code review construtivo", description: "", evaluation: null },
        { id: "e5", message: "Participa ativamente de cerimônias técnicas", description: "", evaluation: null }
      ]
    },
    {
      id: "entrega-continua",
      name: "Entrega Contínua",
      color: "#F59E42",
      commits: [
        { id: "ec1", message: "Utiliza pipelines de CI/CD", description: "", evaluation: null },
        { id: "ec2", message: "Gerencia releases de forma incremental", description: "", evaluation: null },
        { id: "ec3", message: "Implementa observabilidade", description: "", evaluation: null },
        { id: "ec4", message: "Realiza rollback com segurança", description: "", evaluation: null },
        { id: "ec5", message: "Valida entregas em ambiente de staging", description: "", evaluation: null }
      ]
    },
    {
      id: "especialidade",
      name: "Especialidade (Full-Stack)",
      color: "#22C55E",
      commits: [
        { id: "es1", message: "Desenvolve backend escalável", description: "", evaluation: null },
        { id: "es2", message: "Estrutura frontends modernos", description: "", evaluation: null },
        { id: "es3", message: "Integra soluções de banco de dados", description: "", evaluation: null },
        { id: "es4", message: "Realiza deploy full-stack", description: "", evaluation: null },
        { id: "es5", message: "Interage com times multidisciplinares", description: "", evaluation: null }
      ]
    }
  ],
  tags: [
    {
      id: "ic01",
      name: "IC01",
      branchId: "qualidade",
      commitIndex: 4,
      pointsRequired: 10,
      level: "Iniciante"
    },
    {
      id: "ic02",
      name: "IC02",
      branchId: "qualidade",
      commitIndex: 9,
      pointsRequired: 20,
      level: "Intermediário"
    },
    {
      id: "ic03",
      name: "IC03",
      branchId: "qualidade",
      commitIndex: 14,
      pointsRequired: 30,
      level: "Avançado"
    },
    {
      id: "ic04",
      name: "IC04",
      branchId: "qualidade",
      commitIndex: 19,
      pointsRequired: 40,
      level: "Especialista"
    },
    {
      id: "ic05",
      name: "IC05",
      branchId: "qualidade",
      commitIndex: 24,
      pointsRequired: 50,
      level: "Liderança"
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

