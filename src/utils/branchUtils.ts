
import { Branch, Commit } from "@/types/skill";

/**
 * Get commits for a specific level and optionally filtered by track
 */
export function getLevelCommits(
  branch: Branch,
  level: string,
  selectedTrack: string | null
): Commit[] {
  return branch.commits.filter((commit) => {
    // Check if commit belongs to the specified level
    if (commit.metadata?.level !== `L${level}`) return false;
    
    // If no track is selected, include all commits for the level
    if (!selectedTrack) return true;
    
    // If track is selected, only include commits with no track or matching track
    return !commit.metadata?.track || commit.metadata.track === selectedTrack;
  });
}
