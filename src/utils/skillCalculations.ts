
import { SkillPath, Tag } from '../types/skill';

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
