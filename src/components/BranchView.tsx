import React from 'react';
import { Branch, SkillPath, Tag } from '@/data/skillData';
import CommitNode from './CommitNode';
import TagIllustratedNode from './TagIllustratedNode';
import { dataScientistPath, calculatePoints } from '@/data/skillData';

// Lista de imagens placeholder para as tags
const images = [
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=160&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=160&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=160&q=80",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=160&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=160&q=80",
  "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=160&q=80",
  "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=160&q=80",
  "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=160&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=160&q=80"
];

interface BranchViewProps {
  branch: Branch;
  onEvaluateCommit: (branchId: string, commitId: string, evaluation: 'never' | 'sometimes' | 'always') => void;
  isCurrentBranch: boolean;
}

interface CommitLock {
  index: number;
  locked: boolean;
}

// Helper: Calculate points needed for each tag level
function getTagsWithPointThresholds(tags: Tag[]): { pointThreshold: number, tag: Tag }[] {
  // Sort tags by pointsRequired in ascending order
  return [...tags].sort((a, b) => a.pointsRequired - b.pointsRequired)
    .map(tag => ({ pointThreshold: tag.pointsRequired, tag }));
}

// Helper: Calculate points needed for next level
function getNextLevelThreshold(currentPoints: number, tags: Tag[]): number | null {
  const sortedTags = [...tags].sort((a, b) => a.pointsRequired - b.pointsRequired);
  for (const tag of sortedTags) {
    if (tag.pointsRequired > currentPoints) {
      return tag.pointsRequired;
    }
  }
  return null; // No next level
}

// Helper: Should commits be locked based on points
function shouldLockCommitsBasedOnPoints(currentPoints: number, tags: Tag[], index: number): boolean {
  // Find which "level range" the current commit is in
  const commitsPerLevel = 5; // Assuming 5 commits per level
  const commitLevel = Math.floor(index / commitsPerLevel);
  // Level 0 (0-4) is always unlocked
  if (commitLevel === 0) return false;
  
  // Otherwise, check if the previous level is achieved
  const previousLevelPoints = commitLevel * 10; // 10 points per level (simplified)
  return currentPoints < previousLevelPoints;
}

const BranchView: React.FC<BranchViewProps> = ({ branch, onEvaluateCommit, isCurrentBranch }) => {
  const currentPoints = calculatePoints(dataScientistPath);
  const tags = dataScientistPath.tags;
  
  // Calculate locks for commits
  const commitLocks: CommitLock[] = branch.commits.map((_, idx) => ({
    index: idx,
    locked: shouldLockCommitsBasedOnPoints(currentPoints, tags, idx)
  }));
  
  // Determine if tags should be shown in this branch
  // For simplicity, we'll show all level tags in the first branch only
  const shouldShowTags = branch.id === 'qualidade';
  const tagsToShow = shouldShowTags ? tags : [];
  
  // Distribute tags visually throughout the branch commits
  const commitTagPairs: { commit?: Branch['commits'][0], tag?: Tag, commitIndex: number }[] = [];
  
  // First add all commits
  branch.commits.forEach((commit, idx) => {
    commitTagPairs.push({ commit, commitIndex: idx });
  });
  
  // Now insert tags at logical positions (e.g., every 5 commits)
  if (shouldShowTags) {
    tags.forEach((tag, tagIdx) => {
      // Position tags every 5 commits
      const position = (tagIdx + 1) * 5 - 1; // Positions 4, 9, 14, 19, 24
      if (position < branch.commits.length) {
        commitTagPairs.splice(position + tagIdx + 1, 0, { tag, commitIndex: position });
      }
    });
  }
  
  return (
    <div className={`mb-8 ${isCurrentBranch ? 'opacity-100' : 'opacity-60'}`}>
      <div className="flex items-center mb-2">
        <div 
          className="px-3 py-1 rounded text-white font-mono text-sm font-bold inline-flex items-center mr-2" 
          style={{ backgroundColor: branch.color }}
        >
          {branch.name}
        </div>
      </div>
      <div className="relative">
        {/* Linha vertical da branch */}
        <div 
          className="absolute left-4 top-4 h-[calc(100%-8px)] w-1 z-0" 
          style={{ backgroundColor: branch.color }}
        ></div>
        {/* Commits e tags ilustradas */}
        <div className="relative z-10">
          {commitTagPairs.map((item, idx) => {
            if (item.commit) {
              const commitIdx = item.commitIndex;
              const lock = commitLocks[commitIdx]?.locked ?? false;
              return (
                <CommitNode
                  key={`commit-${item.commit.id}`}
                  commit={item.commit}
                  branchColor={branch.color}
                  isLast={commitIdx === branch.commits.length - 1}
                  onEvaluate={evaluation => !lock && onEvaluateCommit(branch.id, item.commit.id, evaluation)}
                  disabled={lock}
                  lockReason={
                    lock ? "Para avaliar este item, alcance o nível anterior com pontos suficientes." : undefined
                  }
                />
              );
            } else if (item.tag) {
              return (
                <TagIllustratedNode
                  key={`tag-${item.tag.id}`}
                  tag={item.tag}
                  skillPath={dataScientistPath}
                  imageSrc={images[idx % images.length]}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default BranchView;
