
import React, { useState, useEffect } from "react";
import { Branch, Commit, SkillPath, Tag } from "@/types/skill";
import LevelSection from "./LevelSection";
import BranchStatusCounts from "./BranchStatusCounts";
import { getLevelCommits } from "@/utils/branchUtils";

interface BranchViewProps {
  branch: Branch;
  skillPath: SkillPath;
  selectedLevel: string | null;
  selectedTrack: string | null;
  onEvaluateCommit: (
    branchId: string,
    commitId: string,
    evaluation: "never" | "sometimes" | "always"
  ) => void;
}

const BranchView: React.FC<BranchViewProps> = ({
  branch,
  skillPath,
  selectedLevel,
  selectedTrack,
  onEvaluateCommit,
}) => {
  const [expandedLevels, setExpandedLevels] = useState<Record<string, boolean>>(
    {}
  );
  const imageSrc = "/placeholder.svg"; // Use a placeholder image for now

  // Toggle level expansion
  const toggleLevelExpansion = (level: string) => {
    setExpandedLevels((prev) => ({
      ...prev,
      [level]: !prev[level],
    }));
  };

  // Group commits by level
  const commitsByLevel: Record<string, Commit[]> = {};
  
  // Get all available levels for this branch
  const availableLevels: string[] = [];
  
  branch.commits.forEach((commit) => {
    const level = commit.metadata?.level?.substring(1) || "0"; // Remove the 'L' prefix
    
    if (!availableLevels.includes(level)) {
      availableLevels.push(level);
    }
    
    if (!commitsByLevel[level]) {
      commitsByLevel[level] = [];
    }
    
    commitsByLevel[level].push(commit);
  });
  
  // Sort levels numerically
  availableLevels.sort((a, b) => parseInt(a) - parseInt(b));
  
  // Handle commit evaluation
  const handleEvaluateCommit = (
    commitId: string,
    evaluation: "never" | "sometimes" | "always"
  ) => {
    onEvaluateCommit(branch.id, commitId, evaluation);
  };
  
  // Check if a level is the current level
  const isCurrentLevel = (level: string) => {
    return selectedLevel === level;
  };
  
  // Get current level as a number for comparison
  const currentLevelNumber = selectedLevel ? parseInt(selectedLevel) : null;
  
  // Determine if a level should be locked based on selected level
  const isLevelLocked = (level: string) => {
    if (!currentLevelNumber) return false;
    
    const levelNumber = parseInt(level);
    return levelNumber > currentLevelNumber;
  };

  // Get filtered commits for the current level (if any)
  const currentLevelCommits = selectedLevel
    ? getLevelCommits(branch, selectedLevel, selectedTrack)
    : null;

  // Filter branch commits by selectedLevel if it exists
  const filteredCommits = selectedLevel
    ? currentLevelCommits || []
    : branch.commits;
  
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center">
          <div
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: branch.color }}
          ></div>
          {branch.name}
        </h3>
        
        <BranchStatusCounts 
          branch={branch} 
          selectedLevel={selectedLevel}
          selectedTrack={selectedTrack}
        />
      </div>
      
      <div className="space-y-6">
        {availableLevels.map((level) => {
          const levelCommits = getLevelCommits(branch, level, selectedTrack);
          
          if (levelCommits.length === 0) {
            return null;
          }
          
          const tag = skillPath.tags.find(
            (t) => t.level === level && (!selectedTrack || t.track === selectedTrack)
          );
          
          return (
            <LevelSection
              key={`level-${level}`}
              level={level}
              commits={levelCommits}
              tag={tag}
              branchColor={branch.color}
              skillPath={skillPath}
              isCurrentLevel={isCurrentLevel(level)}
              imageSrc={imageSrc}
              onEvaluateCommit={handleEvaluateCommit}
              selectedTrack={selectedTrack}
              isExpanded={!!expandedLevels[level]}
              onToggleExpansion={() => toggleLevelExpansion(level)}
              isLocked={isLevelLocked(level)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BranchView;
