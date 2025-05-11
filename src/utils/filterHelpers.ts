import { Branch, Commit } from "@/types/skill";

export const filterCommitsByLevelAndTrack = (
  branches: Branch[],
  selectedLevel: string | null,
  selectedTrack: string | null
): Branch[] => {
  if (!selectedLevel && !selectedTrack) {
    return branches;
  }

  return branches.map((branch) => {
    const filteredCommits = branch.commits.filter((commit) => {
      // If no filters are active, include all commits
      if (!selectedLevel && !selectedTrack) return true;

      const commitLevel = commit.metadata?.level;
      const commitTrack = commit.metadata?.track;

      // Match by level if selected
      const levelMatches = !selectedLevel || commitLevel === selectedLevel;

      // Match by track if selected
      // Special case: If management track ("M") is selected, show all technical commits from lower levels
      let trackMatches = !selectedTrack || !commitTrack;

      if (selectedTrack) {
        if (selectedTrack === "M") {
          // For management track: match if commit is management OR if it's technical track from levels before "L5"
          if (commitTrack === "M") {
            trackMatches = true;
          } else if (commitTrack === "T" && commitLevel) {
            const levelNumber = parseInt(commitLevel.replace(/\D/g, ""));
            // Include technical track commits for levels before L5
            trackMatches = levelNumber < 5;
          }
        } else {
          // For technical track: only match technical track
          trackMatches = commitTrack === selectedTrack;
        }
      }

      // When filtering by track, we want to include all levels
      // When filtering by level, we may also filter by track if specified
      if (selectedTrack && !selectedLevel) {
        return trackMatches;
      }

      return levelMatches && trackMatches;
    });

    return {
      ...branch,
      commits: filteredCommits,
    };
  });
};

// Helper function to count commits and evaluations with track filtering
export const getCommitCounts = (
  branches: Branch[],
  selectedTrack: string | null
) => {
  const counts = {
    notEvaluated: 0,
    never: 0,
    sometimes: 0,
    always: 0,
    total: 0,
  };

  branches.forEach((branch) => {
    branch.commits.forEach((commit) => {
      // Skip commits that don't match the selected track
      if (selectedTrack && commit.metadata?.track) {
        // Special case for management track
        if (selectedTrack === "M") {
          const commitTrack = commit.metadata.track;
          const commitLevel = commit.metadata.level;

          // Skip if it's technical track at higher levels (L5+)
          if (commitTrack === "T" && commitLevel) {
            const levelNumber = parseInt(commitLevel.replace(/\D/g, ""));
            if (levelNumber >= 5) return;
          } else if (commitTrack !== "M") {
            return;
          }
        } else if (commit.metadata.track !== selectedTrack) {
          return;
        }
      }

      counts.total++;
      if (commit.evaluation === null) counts.notEvaluated++;
      else if (commit.evaluation === "never") counts.never++;
      else if (commit.evaluation === "sometimes") counts.sometimes++;
      else if (commit.evaluation === "always") counts.always++;
    });
  });

  return counts;
};

// Helper function to get all available levels from commits
export const getAvailableLevels = (branches: Branch[]): string[] => {
  const levels = new Set<string>();

  branches.forEach((branch) => {
    branch.commits.forEach((commit) => {
      if (commit.metadata?.level) {
        levels.add(commit.metadata.level);
      }
    });
  });

  return Array.from(levels).sort((a, b) => {
    const levelA = parseInt(a.replace(/\D/g, ""));
    const levelB = parseInt(b.replace(/\D/g, ""));
    return levelA - levelB;
  });
};

// Define a mapping for level titles
export const getCodeTitle = (code: string): string => {
  const levelMap: Record<string, string> = {
    "L0-T": "Estagiário",
    "L1-T": "Assistente",
    "L2-T": "Júnior",
    "L3-T": "Pleno",
    "L4-T": "Sênior",
    "L5-T": "Staff",
    "L5-M": "Coordenador",
    "L6-T": "Principal",
    "L6-M": "Gerente",
    "L7-M": "Diretor",
  };

  const title = levelMap[code];
  return title;
};
