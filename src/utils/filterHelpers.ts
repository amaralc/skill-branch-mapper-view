
import { Branch, Commit } from '@/types/skill';

export const filterCommitsByLevelAndTrack = (
  branches: Branch[], 
  selectedLevel: string | null, 
  selectedTrack: string | null
): Branch[] => {
  if (!selectedLevel && !selectedTrack) {
    return branches;
  }
  
  return branches.map(branch => {
    const filteredCommits = branch.commits.filter(commit => {
      // If no filters are active, include all commits
      if (!selectedLevel && !selectedTrack) return true;
      
      const commitLevel = commit.metadata?.level;
      const commitTrack = commit.metadata?.track;
      
      // Match by level if selected
      const levelMatches = !selectedLevel || commitLevel === selectedLevel;
      
      // Match by track if selected
      const trackMatches = !selectedTrack || commitTrack === selectedTrack;
      
      return levelMatches && trackMatches;
    });
    
    return {
      ...branch,
      commits: filteredCommits
    };
  });
};
