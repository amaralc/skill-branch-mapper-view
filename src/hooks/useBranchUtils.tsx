import { useState, useMemo } from 'react';
import { Branch, Commit, Tag } from '@/types/skill';
import { getLevelTitle } from '@/utils/filterHelpers';

export function useBranchUtils(
  branch: Branch,
  selectedLevel: string | null,
  selectedTrack: string | null
) {
  // Track which levels are expanded (all others are collapsed)
  const [expandedLevels, setExpandedLevels] = useState<string[]>(
    // If a level is selected, it starts expanded
    selectedLevel ? [selectedLevel.replace(/\D/g, '')] : []
  );

  // Filter commits by selected track if both levels and track are specified
  const filteredCommits = useMemo(() => {
    return branch.commits.filter(commit => {
      // If no track selected, show all
      if (!selectedTrack) return true;
      
      // Get track and level info from commit
      const commitTrack = commit.metadata?.track;
      const commitLevel = commit.metadata?.level;
      
      // If this commit doesn't specify a track, always show it
      if (!commitTrack) return true;
      
      // Special case for management track - include all technical commits from levels before L5
      if (selectedTrack === "M") {
        if (commitTrack === "M") {
          return true; // Show all management commits
        } else if (commitTrack === "T" && commitLevel) {
          const levelNumber = parseInt(commitLevel.replace(/\D/g, ''));
          return levelNumber < 5; // Include technical track for levels before L5
        }
        return false;
      }
      
      // Otherwise, only show commits that match the selected track
      return commitTrack === selectedTrack;
    });
  }, [branch.commits, selectedTrack]);

  const getBranchStatusCounts = (commits: Branch['commits']) => {
    const counts = {
      notEvaluated: 0,
      never: 0,
      sometimes: 0,
      always: 0
    };

    commits.forEach(commit => {
      if (commit.evaluation === null) counts.notEvaluated++;
      else if (commit.evaluation === 'never') counts.never++;
      else if (commit.evaluation === 'sometimes') counts.sometimes++;
      else if (commit.evaluation === 'always') counts.always++;
    });

    return counts;
  };

  // Get all unique levels available in this branch's commits
  const availableLevels = useMemo(() => {
    // Sort commits by level in descending order
    const sortedCommits = [...filteredCommits].sort((a, b) => {
      const levelA = a.metadata?.level ? parseInt(a.metadata.level.replace(/\D/g, '')) : 0;
      const levelB = b.metadata?.level ? parseInt(b.metadata.level.replace(/\D/g, '')) : 0;
      return levelB - levelA; // Descending order
    });

    return Array.from(new Set(
      sortedCommits
        .map(commit => commit.metadata?.level?.replace(/\D/g, ''))
        .filter(level => level !== undefined)
    )).sort((a, b) => Number(b) - Number(a)); // Sort in descending order
  }, [filteredCommits]);

  // Group commits by level
  const commitsByLevel = useMemo(() => {
    const sorted = [...filteredCommits].sort((a, b) => {
      const levelA = a.metadata?.level ? parseInt(a.metadata.level.replace(/\D/g, '')) : 0;
      const levelB = b.metadata?.level ? parseInt(b.metadata.level.replace(/\D/g, '')) : 0;
      return levelB - levelA; // Descending order
    });
    
    const result: Record<string, Array<Commit>> = {};
    sorted.forEach(commit => {
      const commitLevel = commit.metadata?.level?.replace(/\D/g, '') || '0';
      if (!result[commitLevel]) {
        result[commitLevel] = [];
      }
      result[commitLevel].push(commit);
    });
    
    return result;
  }, [filteredCommits]);

  // Toggle level expansion
  const toggleLevelExpansion = (level: string) => {
    setExpandedLevels(prev => {
      if (prev.includes(level)) {
        return prev.filter(l => l !== level);
      } else {
        return [...prev, level];
      }
    });
  };

  // Check if a level is expanded
  const isLevelExpanded = (level: string) => {
    return expandedLevels.includes(level);
  };

  // Get the appropriate level code and title based on level and track
  const getLevelDisplay = (level: string) => {
    if (selectedTrack) {
      // For levels where differentiation happens (L5+)
      if (parseInt(level) >= 5) {
        return getLevelTitle(`L${level}-${selectedTrack}`);
      }
      // For lower levels, just get the base title with L code
      return getLevelTitle(`L${level}`);
    }
    return getLevelTitle(`L${level}`);
  };

  // Calculate points for filtered commits
  const calculateFilteredBranchPoints = (commits: Branch['commits']) => {
    let points = 0;
    commits.forEach(commit => {
      if (commit.evaluation === 'sometimes') points += 1;
      else if (commit.evaluation === 'always') points += 2;
    });
    return points;
  };

  const branchPoints = calculateFilteredBranchPoints(filteredCommits);
  const counts = getBranchStatusCounts(filteredCommits);

  return {
    filteredCommits,
    availableLevels,
    commitsByLevel,
    counts,
    branchPoints,
    isLevelExpanded,
    toggleLevelExpansion,
    getLevelDisplay
  };
}
