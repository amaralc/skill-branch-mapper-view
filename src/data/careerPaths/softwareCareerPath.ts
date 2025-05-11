
import { SkillPath } from "../../types/skill";
import architectureBranch from "./software/architectureBranch";
import qualityBranch from "./software/qualityBranch";
import securityBranch from "./software/securityBranch";
import continuousDeliveryBranch from "./software/continuousDeliveryBranch";
import frontEndTrack from "./software/frontEndTrack";
import backEndTrack from "./software/backEndTrack";
import fullStackTrack from "./software/fullStackTrack";
import dataScienceTrack from "./software/dataScienceTrack";
import mobileTrack from "./software/mobileTrack";
import cloudTrack from "./software/cloudTrack";
import firmwareTrack from "./software/firmwareTrack";
import softwareCareerTags from "./software/careerTags";

const softwareCareerPath: SkillPath = {
  id: "software-engineering",
  name: "Engenharia de Software",
  description: "Trilha de desenvolvimento para Engenheiros de Software",
  branches: [
    // Base Competencies
    architectureBranch,
    qualityBranch,
    securityBranch,
    continuousDeliveryBranch,
    
    // Specialty Tracks
    frontEndTrack,
    backEndTrack,
    fullStackTrack,
    dataScienceTrack,
    mobileTrack,
    cloudTrack,
    firmwareTrack,
  ],
  tags: softwareCareerTags,
};

export default softwareCareerPath;
