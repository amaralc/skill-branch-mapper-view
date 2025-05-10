import { Branch, Commit, SkillPath, Tag } from "@/types/skill";

interface CsvRow {
  career: string;
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
  const headers = lines[0].split(",");

  return lines
    .slice(1)
    .filter((line) => line.trim() !== "")
    .map((line) => {
      // Enhanced handling for values that contain commas within quotes
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

      // Add the last value
      values.push(currentValue.trim().replace(/^"|"$/g, ""));

      // Create a properly typed CsvRow object with default empty strings
      const row: CsvRow = {
        career: "",
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

      // Fill in values from the CSV
      headers.forEach((header, index) => {
        const trimmedHeader = header.trim();
        // Only set values for keys that actually exist in CsvRow type
        if (trimmedHeader in row && index < values.length) {
          (row as any)[trimmedHeader] = values[index];
        }
      });

      return row;
    });
};

export const convertCsvToSkillPath = (csvData: CsvRow[]): SkillPath => {
  if (!csvData.length) {
    throw new Error("CSV data is empty");
  }

  const careerName = csvData[0].career;
  const groupedByCompetence = csvData.reduce((acc, row) => {
    if (!acc[row.groupCompetenceId]) {
      acc[row.groupCompetenceId] = [];
    }
    acc[row.groupCompetenceId].push(row);
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
            // Store all relevant metadata in the commit
            metadata: {
              career: row.career,
              baseBehavior: row.baseBehavior,
              level: row.level,
              track: row.track,
              groupCompetence: row.groupCompetence,
              groupCompetenceId: row.groupCompetenceId,
              groupCompetenceLevelId: row.groupCompetenceLevelId,
            },
          });
        }
        return acc;
      }, [] as Commit[]);

      return {
        id: competenceId,
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

  // Create tags
  const tags: Tag[] = [
    {
      id: "junior",
      name: "Junior",
      level: "1",
      pointsRequired: 3,
      description: "Entry level",
    },
    {
      id: "pleno",
      name: "Pleno",
      level: "2",
      pointsRequired: 6,
      description: "Mid level",
    },
    {
      id: "senior",
      name: "Senior",
      level: "3",
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
