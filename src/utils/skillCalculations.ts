
import { SkillPath, Tag, Branch } from '../types/skill';

export const calculatePoints = (path: SkillPath, selectedTrack: string | null = null, selectedLevel: string | null = null): number => {
  let totalPoints = 0;

  path.branches.forEach(branch => {
    branch.commits.forEach(commit => {
      // Skip commits that don't match the selected track
      if (selectedTrack && commit.metadata?.track) {
        // Special case for management track
        if (selectedTrack === "M") {
          const commitTrack = commit.metadata.track;
          const commitLevel = commit.metadata.level;
          
          // Include technical track for levels up to and including L4
          if (commitTrack === "T" && commitLevel) {
            const levelNumber = parseInt(commitLevel.replace(/\D/g, ""));
            if (levelNumber > 4) return;
          } else if (commitTrack !== "M") {
            return;
          }
        } else if (commit.metadata.track !== selectedTrack) {
          return;
        }
      }

      // Skip commits that don't match the selected level
      if (selectedLevel && commit.metadata?.level && commit.metadata.level !== selectedLevel) {
        return;
      }
      
      if (commit.evaluation === 'sometimes') totalPoints += 1;
      else if (commit.evaluation === 'always') totalPoints += 2;
    });
  });

  return totalPoints;
};

export const getMaxPoints = (path: SkillPath, selectedTrack: string | null = null, selectedLevel: string | null = null): number => {
  let maxPoints = 0;
  
  path.branches.forEach(branch => {
    branch.commits.forEach(commit => {
      // Skip commits that don't match the selected track
      if (selectedTrack && commit.metadata?.track) {
        // Special case for management track
        if (selectedTrack === "M") {
          const commitTrack = commit.metadata.track;
          const commitLevel = commit.metadata.level;
          
          // Include technical track for levels up to and including L4
          if (commitTrack === "T" && commitLevel) {
            const levelNumber = parseInt(commitLevel.replace(/\D/g, ""));
            if (levelNumber > 4) return;
          } else if (commitTrack !== "M") {
            return;
          }
        } else if (commit.metadata.track !== selectedTrack) {
          return;
        }
      }

      // Skip commits that don't match the selected level
      if (selectedLevel && commit.metadata?.level && commit.metadata.level !== selectedLevel) {
        return;
      }
      
      maxPoints += 2;
    });
  });
  
  return maxPoints;
};

export const calculateBranchPoints = (branch: Branch, selectedTrack: string | null = null, selectedLevel: string | null = null): number => {
  let points = 0;
  branch.commits.forEach(commit => {
    // Skip commits that don't match the selected track
    if (selectedTrack && commit.metadata?.track) {
      // Special case for management track
      if (selectedTrack === "M") {
        const commitTrack = commit.metadata.track;
        const commitLevel = commit.metadata.level;
        
        // Include technical track for levels up to and including L4
        if (commitTrack === "T" && commitLevel) {
          const levelNumber = parseInt(commitLevel.replace(/\D/g, ""));
          if (levelNumber > 4) return;
        } else if (commitTrack !== "M") {
          return;
        }
      } else if (commit.metadata.track !== selectedTrack) {
        return;
      }
    }

    // Skip commits that don't match the selected level
    if (selectedLevel && commit.metadata?.level && commit.metadata.level !== selectedLevel) {
      return;
    }
    
    if (commit.evaluation === 'sometimes') points += 1;
    else if (commit.evaluation === 'always') points += 2;
  });
  return points;
};

export const getBranchCurrentLevel = (branch: Branch, tags: Tag[], selectedTrack: string | null = null, selectedLevel: string | null = null): Tag | null => {
  const points = calculateBranchPoints(branch, selectedTrack, selectedLevel);
  
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

export const getBranchNextLevel = (branch: Branch, tags: Tag[], selectedTrack: string | null = null, selectedLevel: string | null = null): Tag | null => {
  const points = calculateBranchPoints(branch, selectedTrack, selectedLevel);
  
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

export const getCurrentLevel = (path: SkillPath, selectedTrack: string | null = null, selectedLevel: string | null = null): Tag | null => {
  const points = calculatePoints(path, selectedTrack, selectedLevel);
  const sortedTags = [...path.tags].sort((a, b) => b.pointsRequired - a.pointsRequired);
  
  for (const tag of sortedTags) {
    if (points >= tag.pointsRequired) {
      return tag;
    }
  }
  
  return null;
};

export const getNextLevel = (path: SkillPath, selectedTrack: string | null = null, selectedLevel: string | null = null): Tag | null => {
  const points = calculatePoints(path, selectedTrack, selectedLevel);
  const sortedTags = [...path.tags].sort((a, b) => a.pointsRequired - b.pointsRequired);
  
  for (const tag of sortedTags) {
    if (points < tag.pointsRequired) {
      return tag;
    }
  }
  
  return null;
};
