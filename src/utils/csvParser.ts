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
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).filter(line => line.trim() !== '').map(line => {
    // Handle values that contain commas within quotes
    const matches = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g) || [];
    const values = matches.map(val => val.replace(/^"|"$/g, '').trim());
    
    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      row[header.trim()] = values[index] || '';
    });
    
    // Check if all required fields exist in the row
    const requiredFields: (keyof CsvRow)[] = [
      'career', 'baseBehavior', 'level', 'track', 'groupCompetence', 
      'groupCompetenceId', 'groupCompetenceLevelId', 'id', 'description', 'size'
    ];
    
    // Ensure all required fields are present
    requiredFields.forEach(field => {
      if (row[field] === undefined) {
        row[field] = ''; // Set default empty string for missing fields
      }
    });
    
    // Type assertion with 'as' since we've ensured all required fields exist
    return row as CsvRow;
  });
};

export const convertCsvToSkillPath = (csvData: CsvRow[]): SkillPath => {
  if (!csvData.length) {
    throw new Error('CSV data is empty');
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
  const branches: Branch[] = Object.entries(groupedByCompetence).map(([competenceId, rows]) => {
    // Group behaviors by behavior ID to create commits
    const commits = rows.reduce((acc, row) => {
      // Only include rows with specific levels that should become commits
      if (["L0", "L1", "L2", "L3", "L4", "L5", "L6", "L7"].includes(row.level)) {
        acc.push({
          id: row.id,
          behaviorDescription: row.description,
          evaluation: null
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
        { tagId: "senior", pointsRequired: 8 }
      ]
    };
  });

  // Create tags
  const tags: Tag[] = [
    { id: "junior", name: "Junior", level: "1", pointsRequired: 3, description: "Entry level" },
    { id: "pleno", name: "Pleno", level: "2", pointsRequired: 6, description: "Mid level" },
    { id: "senior", name: "Senior", level: "3", pointsRequired: 8, description: "Senior level" }
  ];

  return {
    id: `imported-${careerName.toLowerCase()}`,
    name: `Imported: ${careerName}`,
    description: `Career path imported from CSV for ${careerName}`,
    branches,
    tags
  };
};

// Helper function to generate random colors for branches
const getRandomColor = (): string => {
  const colors = [
    "#0ea5e9", "#0ea1e9", "#03a109", "#fbbf24", 
    "#8b5cf6", "#ec4899", "#f43f5e", "#10b981"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
