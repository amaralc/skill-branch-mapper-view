import { Branch, Commit, SkillPath, Tag } from "@/types/skill";

interface CsvRow {
  career: string;
  behaviorDifferentiator: string;
  baseBehavior: string;
  level: string;
  track: string;
  groupCompetence: string;
  groupCompetenceId: string;
  groupCompetenceLevelId: string;
  id: string;
  description: string;
  size: string;
}

export const parseCsv = (csvContent: string): CsvRow[] => {
  // Normalize line breaks for cross-platform compatibility
  const normalizedContent = csvContent
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");

  const lines = normalizedContent.split("\n");
  if (lines.length === 0) {
    throw new Error("CSV vazio ou inválido");
  }

  // Clean up any BOM (Byte Order Mark) from the first line
  let firstLine = lines[0];
  if (firstLine.charCodeAt(0) === 0xFEFF) {
    firstLine = firstLine.substring(1);
    lines[0] = firstLine;
  }

  const headers = firstLine.split(",").map(header => header.trim());

  return lines
    .slice(1)
    .filter((line) => line.trim() !== "")
    .map((line) => {
      // Manipulação avançada para valores que contêm vírgulas dentro de aspas
      const values: string[] = [];
      let inQuotes = false;
      let currentValue = "";

      for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
          values.push(currentValue.trim().replace(/^"|"$/g, ""));
          currentValue = "";
        } else {
          currentValue += char;
        }
      }

      // Adiciona o último valor
      values.push(currentValue.trim().replace(/^"|"$/g, ""));

      // Cria um objeto CsvRow corretamente tipado com strings vazias padrão
      const row: CsvRow = {
        career: "",
        behaviorDifferentiator: "", 
        baseBehavior: "",
        level: "",
        track: "",
        groupCompetence: "",
        groupCompetenceId: "",
        groupCompetenceLevelId: "",
        id: "",
        description: "",
        size: "",
      };

      // Preenche os valores do CSV
      headers.forEach((header, index) => {
        const trimmedHeader = header.trim();
        // Apenas define valores para chaves que existem no tipo CsvRow
        if (trimmedHeader in row && index < values.length) {
          (row as any)[trimmedHeader] = values[index];
        }
      });

      // Verifique se há caracteres problemáticos na descrição e limpe-os
      if (row.description) {
        row.description = cleanText(row.description);
      }

      // Limpeza de outros campos de texto
      row.career = cleanText(row.career);
      row.behaviorDifferentiator = cleanText(row.behaviorDifferentiator);
      row.baseBehavior = cleanText(row.baseBehavior);
      row.groupCompetence = cleanText(row.groupCompetence);

      return row;
    });
};

// Função para limpar texto com caracteres problemáticos
const cleanText = (text: string): string => {
  if (!text) return "";
  
  // Substituir caracteres comuns de codificação errada
  return text
    .replace(/\uFFFD/g, '') // Unicode replacement character
    .replace(/�/g, '') // Mojibake characters
    .replace(/[\u0080-\u009F]/g, match => {
      // Map common Windows-1252 control chars to their UTF-8 equivalents
      const charMap: Record<number, string> = {
        0x80: '€', 0x82: '‚', 0x83: 'ƒ', 0x84: '„', 0x85: '…', 
        0x86: '†', 0x87: '‡', 0x88: 'ˆ', 0x89: '‰', 0x8A: 'Š',
        0x8B: '‹', 0x8C: 'Œ', 0x8E: 'Ž', 0x91: ''', 0x92: ''',
        0x93: '"', 0x94: '"', 0x95: '•', 0x96: '–', 0x97: '—',
        0x98: '˜', 0x99: '™', 0x9A: 'š', 0x9B: '›', 0x9C: 'œ',
        0x9E: 'ž', 0x9F: 'Ÿ'
      };
      return charMap[match.charCodeAt(0)] || '';
    })
    .replace(/crit�rio/g, 'critério')
    .replace(/c�digo/g, 'código')
    .replace(/leg�vel/g, 'legível')
    .replace(/f�cil/g, 'fácil')
    .trim();
};

export const convertCsvToSkillPath = (csvData: CsvRow[]): SkillPath => {
  if (!csvData.length) {
    throw new Error("CSV data is empty");
  }

  const careerName = csvData[0].career;
  const groupedByCompetence = csvData.reduce((acc, row) => {
    // Normalize the ID for consistency
    const normalizedId = normalizeCompetenceId(row.groupCompetenceId);
    
    if (!acc[normalizedId]) {
      acc[normalizedId] = [];
    }
    acc[normalizedId].push(row);
    return acc;
  }, {} as Record<string, CsvRow[]>);

  // Create branches from the grouped data
  const branches: Branch[] = Object.entries(groupedByCompetence).map(
    ([competenceId, rows]) => {
      // Group behaviors by behavior ID to create commits
      const commits = rows.reduce((acc, row) => {
        // Only include rows with specific levels that should become commits
        if (
          ["L0", "L1", "L2", "L3", "L4", "L5", "L6", "L7"].includes(row.level)
        ) {
          acc.push({
            id: row.id,
            behaviorDescription: row.description,
            evaluation: null,
            updatedAt: null,
            // Store all relevant metadata in the commit
            metadata: {
              career: row.career,
              behaviorDifferentiator: row.behaviorDifferentiator,
              baseBehavior: row.baseBehavior,
              level: row.level,
              track: row.track,
              groupCompetence: row.groupCompetence,
              groupCompetenceId: normalizeCompetenceId(row.groupCompetenceId),
              groupCompetenceLevelId: row.groupCompetenceLevelId,
            },
          });
        }
        return acc;
      }, [] as Commit[]);

      return {
        id: normalizeCompetenceId(competenceId),
        name: rows[0].groupCompetence,
        color: getRandomColor(),
        commits,
        levelRequirements: [
          { tagId: "junior", pointsRequired: 3 },
          { tagId: "pleno", pointsRequired: 6 },
          { tagId: "senior", pointsRequired: 8 },
        ],
      };
    }
  );

  // Create tags with the required properties
  const tags: Tag[] = [
    {
      id: "junior",
      name: "Junior",
      level: "1",
      code: "L2-T",
      track: "T",
      pointsRequired: 3,
      description: "Entry level",
    },
    {
      id: "pleno",
      name: "Pleno",
      level: "2",
      code: "L3-T",
      track: "T",
      pointsRequired: 6,
      description: "Mid level",
    },
    {
      id: "senior",
      name: "Senior",
      level: "3",
      code: "L4-T",
      track: "T",
      pointsRequired: 8,
      description: "Senior level",
    },
  ];

  return {
    id: `imported-${careerName.toLowerCase()}`,
    name: `Imported: ${careerName}`,
    description: `Career path imported from CSV for ${careerName}`,
    branches,
    tags,
  };
};

// Helper function to normalize competence IDs for consistent matching
const normalizeCompetenceId = (id: string): string => {
  // Convert to uppercase and handle specific mappings
  const upperId = id.toUpperCase();
  
  // Handle specific mappings
  if (upperId === "CLOUD-INFRASTRUCTURE" || upperId === "CLOUD INFRASTRUCTURE") {
    return "CLOUD";
  }
  
  // For all other cases, just return the uppercase ID
  return upperId;
};

// Helper function to generate random colors for branches
const getRandomColor = (): string => {
  const colors = [
    "#0ea5e9",
    "#0ea1e9",
    "#03a109",
    "#fbbf24",
    "#8b5cf6",
    "#ec4899",
    "#f43f5e",
    "#10b981",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
