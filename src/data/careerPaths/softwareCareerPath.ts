
import { SkillPath } from "../../types/skill";
import softwareCareerTags from "./software/careerTags";

// Define an empty career path that will be populated only via CSV upload
const softwareCareerPath: SkillPath = {
  id: "software-engineering",
  name: "Engenharia de Software",
  description: "Trilha de desenvolvimento para Engenheiros de Software",
  branches: [],  // Branches will be populated via CSV import
  tags: softwareCareerTags,
};

export default softwareCareerPath;
