import { SkillPath, Tag, Branch } from '../types/skill';

export const calculatePoints = (path: SkillPath): number => {
  let totalPoints = 0;

  path.branches.forEach(branch => {
    branch.commits.forEach(commit => {
      if (commit.evaluation === 'sometimes') totalPoints += 1;
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

export const calculateBranchPoints = (branch: Branch): number => {
  let points = 0;
  branch.commits.forEach(commit => {
    if (commit.evaluation === 'sometimes') points += 1;
    else if (commit.evaluation === 'always') points += 2;
  });
  return points;
};

export const getBranchCurrentLevel = (branch: Branch, tags: Tag[]): Tag | null => {
  const points = calculateBranchPoints(branch);
  
  // Get the tag requirements specific to this branch
  const branchRequirements = branch.levelRequirements || [];
  
  // Sort tags by points required in descending order
  const sortedTags = [...tags]
    .sort((a, b) => b.pointsRequired - a.pointsRequired)
    .filter(tag => {
      // Only include tags that are defined for this branch
      return branchRequirements.some(req => req.tagId === tag.id);
    });
  
  for (const tag of sortedTags) {
    const requirement = branchRequirements.find(req => req.tagId === tag.id);
    if (requirement && points >= requirement.pointsRequired) {
      return tag;
    }
  }
  
  return null;
};

export const getBranchNextLevel = (branch: Branch, tags: Tag[]): Tag | null => {
  const points = calculateBranchPoints(branch);
  
  const branchRequirements = branch.levelRequirements || [];
  
  const sortedTags = [...tags]
    .sort((a, b) => a.pointsRequired - b.pointsRequired)
    .filter(tag => {
      return branchRequirements.some(req => req.tagId === tag.id);
    });
  
  for (const tag of sortedTags) {
    const requirement = branchRequirements.find(req => req.tagId === tag.id);
    if (requirement && points < requirement.pointsRequired) {
      return tag;
    }
  }
  
  return null;
};

export const getCurrentLevel = (path: SkillPath): Tag | null => {
  const points = calculatePoints(path);
  const sortedTags = [...path.tags].sort((a, b) => b.pointsRequired - a.pointsRequired);
  
  for (const tag of sortedTags) {
    if (points >= tag.pointsRequired) {
      return tag;
    }
  }
  
  return null;
};

export const getNextLevel = (path: SkillPath): Tag | null => {
  const points = calculatePoints(path);
  const sortedTags = [...path.tags].sort((a, b) => a.pointsRequired - b.pointsRequired);
  
  for (const tag of sortedTags) {
    if (points < tag.pointsRequired) {
      return tag;
    }
  }
  
  return null;
};
