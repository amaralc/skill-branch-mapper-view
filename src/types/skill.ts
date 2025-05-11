export interface Commit {
  id: string;
  behaviorDescription: string;
  evaluation: "never" | "sometimes" | "always" | null;
  updatedAt: number | null;
  metadata?: {
    career?: string;
    baseBehavior?: string;
    level?: string;
    track?: string;
    groupCompetence?: string;
    groupCompetenceId?: string;
    groupCompetenceLevelId?: string;
  };
}

export interface BranchTag {
  tagId: string;
  pointsRequired: number;
}

export interface Branch {
  id: string;
  name: string;
  color: string;
  commits: Commit[];
  levelRequirements: BranchTag[];
}

export interface Tag {
  id: string;
  name: string;
  level: string;
  code: string;
  track: string;
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
