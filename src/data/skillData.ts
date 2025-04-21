
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

// Dados de exemplo para a trilha de Data Science
export const dataScientistPath: SkillPath = {
  id: "data-science-path",
  name: "Data Science Path",
  description: "Trilhas de conhecimento organizadas por área",
  branches: [
    {
      id: "start",
      name: "START",
      color: "#4CAF50",
      commits: [
        { id: "s1", message: "Demonstra curiosidade para resolver problemas", description: "Busca ativamente entender os problemas antes de propor soluções", evaluation: null },
        { id: "s2", message: "Identifica fontes de dados relevantes", description: "Consegue mapear quais dados são necessários para resolver um problema", evaluation: null },
        { id: "s3", message: "Formula hipóteses iniciais", description: "Cria hipóteses baseadas em observações preliminares", evaluation: null },
        { id: "s4", message: "Utiliza ferramentas básicas de análise", description: "Conhece ferramentas como Excel, SQL básico", evaluation: null },
        { id: "s5", message: "Comunica descobertas com clareza", description: "Consegue explicar suas descobertas para não-especialistas", evaluation: null },
      ]
    },
    {
      id: "analytical-culture",
      name: "ANALYTICAL CULTURE",
      color: "#333333",
      commits: [
        { id: "ac1", message: "Toma decisões baseadas em dados", description: "Usa dados concretos para fundamentar decisões importantes", evaluation: null },
        { id: "ac2", message: "Promove cultura de experimentação", description: "Incentiva testes e experimentos controlados", evaluation: null },
        { id: "ac3", message: "Questiona pressupostos", description: "Não aceita afirmações sem evidências", evaluation: null },
        { id: "ac4", message: "Compartilha conhecimento", description: "Dissemina aprendizados com a equipe", evaluation: null },
        { id: "ac5", message: "Busca melhoria contínua", description: "Constantemente revisa processos analíticos", evaluation: null },
      ]
    },
    {
      id: "dataviz",
      name: "DATAVIZ",
      color: "#00BCD4",
      commits: [
        { id: "dv1", message: "Cria visualizações básicas", description: "Gera gráficos e tabelas simples", evaluation: null },
        { id: "dv2", message: "Escolhe visualizações adequadas", description: "Seleciona o tipo de visualização apropriado para cada tipo de dado", evaluation: null },
        { id: "dv3", message: "Implementa dashboards interativos", description: "Constrói painéis que permitem exploração dos dados", evaluation: null },
        { id: "dv4", message: "Ajusta visualizações para audiência", description: "Adapta o nível técnico das visualizações conforme o público", evaluation: null },
        { id: "dv5", message: "Conta histórias com dados", description: "Usa visualizações para construir narrativas convincentes", evaluation: null },
      ]
    },
    {
      id: "business-analytics",
      name: "BUSINESS ANALYTICS",
      color: "#2196F3",
      commits: [
        { id: "ba1", message: "Entende métricas de negócio", description: "Compreende KPIs e indicadores críticos", evaluation: null },
        { id: "ba2", message: "Realiza análises de tendências", description: "Identifica padrões de comportamento ao longo do tempo", evaluation: null },
        { id: "ba3", message: "Conduz análises de segmentação", description: "Agrupa dados por características relevantes", evaluation: null },
        { id: "ba4", message: "Propõe insights de negócio", description: "Transforma análises em recomendações acionáveis", evaluation: null },
        { id: "ba5", message: "Avalia ROI de iniciativas", description: "Mede o retorno sobre investimento de projetos analíticos", evaluation: null },
      ]
    },
    {
      id: "statistics",
      name: "STATISTICS",
      color: "#E91E63",
      commits: [
        { id: "st1", message: "Aplica estatística descritiva", description: "Utiliza médias, medianas, variância, etc", evaluation: null },
        { id: "st2", message: "Realiza testes de hipóteses", description: "Conduz testes estatísticos adequados", evaluation: null },
        { id: "st3", message: "Constrói modelos de regressão", description: "Implementa e avalia modelos preditivos simples", evaluation: null },
        { id: "st4", message: "Avalia significância estatística", description: "Determina a validade estatística dos resultados", evaluation: null },
        { id: "st5", message: "Entende probabilidade e distribuições", description: "Aplica conceitos de distribuição de probabilidade", evaluation: null },
      ]
    },
    {
      id: "coding",
      name: "CODING",
      color: "#9C27B0",
      commits: [
        { id: "c1", message: "Programa em Python/R", description: "Escreve código funcional para análise de dados", evaluation: null },
        { id: "c2", message: "Manipula estruturas de dados", description: "Trabalha eficientemente com arrays, dataframes, etc", evaluation: null },
        { id: "c3", message: "Utiliza controle de versão", description: "Usa Git para versionamento de código", evaluation: null },
        { id: "c4", message: "Escreve funções reutilizáveis", description: "Cria código modular e bem documentado", evaluation: null },
        { id: "c5", message: "Automatiza tarefas repetitivas", description: "Implementa scripts para automatizar fluxos de trabalho", evaluation: null },
      ]
    },
    {
      id: "machine-learning",
      name: "MACHINE LEARNING",
      color: "#FF9800",
      commits: [
        { id: "ml1", message: "Implementa modelos supervisionados", description: "Treina e avalia modelos de classificação e regressão", evaluation: null },
        { id: "ml2", message: "Utiliza modelos não-supervisionados", description: "Aplica técnicas de clustering e redução de dimensionalidade", evaluation: null },
        { id: "ml3", message: "Realiza feature engineering", description: "Cria e seleciona características relevantes", evaluation: null },
        { id: "ml4", message: "Avalia performance de modelos", description: "Utiliza métricas apropriadas para medir desempenho", evaluation: null },
        { id: "ml5", message: "Deploy modelos em produção", description: "Implementa modelos em ambientes produtivos", evaluation: null },
      ]
    },
    {
      id: "text-mining",
      name: "TEXT MINING & NLP",
      color: "#FFEB3B",
      commits: [
        { id: "tm1", message: "Processa texto para análise", description: "Realiza limpeza e tokenização de texto", evaluation: null },
        { id: "tm2", message: "Aplica técnicas de NLP básicas", description: "Utiliza análise de sentimento, extração de entidades, etc", evaluation: null },
        { id: "tm3", message: "Utiliza embeddings de palavras", description: "Trabalha com word2vec, GloVe ou similares", evaluation: null },
        { id: "tm4", message: "Implementa modelos de linguagem", description: "Usa BERT, GPT ou similares para tarefas específicas", evaluation: null },
        { id: "tm5", message: "Cria soluções de processamento de texto", description: "Desenvolve aplicações baseadas em texto", evaluation: null },
      ]
    },
    {
      id: "big-data",
      name: "BIG DATA",
      color: "#673AB7",
      commits: [
        { id: "bd1", message: "Trabalha com dados distribuídos", description: "Utiliza tecnologias como Hadoop, Spark", evaluation: null },
        { id: "bd2", message: "Processa dados em larga escala", description: "Manipula datasets que não cabem em memória", evaluation: null },
        { id: "bd3", message: "Implementa pipelines de processamento", description: "Cria fluxos de tratamento para grandes volumes", evaluation: null },
        { id: "bd4", message: "Otimiza consultas e processamento", description: "Melhora performance de operações com grandes dados", evaluation: null },
        { id: "bd5", message: "Arquiteta soluções escaláveis", description: "Desenha sistemas que crescem com aumento de volume", evaluation: null },
      ]
    },
    {
      id: "data-ingestion",
      name: "DATA INGESTION",
      color: "#E91E63",
      commits: [
        { id: "di1", message: "Coleta dados de APIs", description: "Integra com fontes de dados via APIs", evaluation: null },
        { id: "di2", message: "Realiza web scraping", description: "Extrai dados estruturados de sites", evaluation: null },
        { id: "di3", message: "Configura ETL básico", description: "Implementa processos de extração, transformação e carga", evaluation: null },
        { id: "di4", message: "Gerencia qualidade dos dados", description: "Valida e garante integridade na ingestão", evaluation: null },
        { id: "di5", message: "Automatiza coleta de dados", description: "Cria processos para atualização regular dos dados", evaluation: null },
      ]
    },
    {
      id: "data-munging",
      name: "DATA MUNGING",
      color: "#E91E63",
      commits: [
        { id: "dm1", message: "Limpa e formata dados", description: "Remove inconsistências e padroniza formatos", evaluation: null },
        { id: "dm2", message: "Trata dados ausentes", description: "Implementa estratégias para lidar com missing values", evaluation: null },
        { id: "dm3", message: "Realiza feature engineering", description: "Transforma variáveis para melhorar modelos", evaluation: null },
        { id: "dm4", message: "Converte entre formatos de dados", description: "Trabalha com CSV, JSON, parquet, etc", evaluation: null },
        { id: "dm5", message: "Normaliza e padroniza dados", description: "Aplica técnicas como scaling, encoding", evaluation: null },
      ]
    },
    {
      id: "toolbox",
      name: "TOOLBOX",
      color: "#000000",
      commits: [
        { id: "tb1", message: "Utiliza SQL avançado", description: "Escreve queries complexas e otimizadas", evaluation: null },
        { id: "tb2", message: "Trabalha com ambientes cloud", description: "Opera em AWS, GCP ou Azure", evaluation: null },
        { id: "tb3", message: "Usa ferramentas de BI", description: "Maneja Tableau, Power BI ou similares", evaluation: null },
        { id: "tb4", message: "Implementa versionamento de dados", description: "Controla mudanças em datasets ao longo do tempo", evaluation: null },
        { id: "tb5", message: "Configura ambientes de desenvolvimento", description: "Cria e mantém ambientes reproduzíveis", evaluation: null },
      ]
    }
  ],
  tags: [
    {
      id: "ic01",
      name: "IC01",
      branchId: "start",
      commitIndex: 2,
      pointsRequired: 10,
      level: "Iniciante"
    },
    {
      id: "ic02",
      name: "IC02",
      branchId: "statistics",
      commitIndex: 2,
      pointsRequired: 20,
      level: "Intermediário"
    },
    {
      id: "ic03",
      name: "IC03",
      branchId: "machine-learning",
      commitIndex: 1,
      pointsRequired: 40,
      level: "Avançado"
    },
    {
      id: "ic04",
      name: "IC04",
      branchId: "machine-learning",
      commitIndex: 3,
      pointsRequired: 60,
      level: "Especialista"
    },
    {
      id: "em01",
      name: "EM01",
      branchId: "analytical-culture",
      commitIndex: 3,
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
