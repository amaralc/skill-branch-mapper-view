
import React from 'react';
import { Branch, SkillPath, Tag, calculatePoints } from '@/data/skillData';
import CommitNode from './CommitNode';
import TagIllustratedNode from './TagIllustratedNode';

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
  skillPath: SkillPath;
}

interface CommitLock {
  index: number;
  locked: boolean;
}

function calculateBranchPoints(branch: Branch): number {
  let points = 0;
  branch.commits.forEach(commit => {
    if (commit.evaluation === 'never') points += 0;
    else if (commit.evaluation === 'sometimes') points += 1;
    else if (commit.evaluation === 'always') points += 2;
  });
  return points;
}

function getTagsWithPointThresholds(tags: Tag[]): { pointThreshold: number, tag: Tag }[] {
  return [...tags].sort((a, b) => a.pointsRequired - b.pointsRequired)
    .map(tag => ({ pointThreshold: tag.pointsRequired, tag }));
}

function getNextLevelThreshold(currentPoints: number, tags: Tag[]): number | null {
  const sortedTags = [...tags].sort((a, b) => a.pointsRequired - b.pointsRequired);
  for (const tag of sortedTags) {
    if (tag.pointsRequired > currentPoints) {
      return tag.pointsRequired;
    }
  }
  return null;
}

function shouldLockCommitsBasedOnPoints(currentBranchPoints: number, tags: Tag[], index: number): boolean {
  const commitsPerLevel = 5;
  const commitLevel = Math.floor(index / commitsPerLevel);
  if (commitLevel === 0) return false;
  
  const pointsRequiredForCurrentLevel = commitLevel * 10;
  return currentBranchPoints < pointsRequiredForCurrentLevel;
}

const BranchView: React.FC<BranchViewProps> = ({ branch, onEvaluateCommit, isCurrentBranch, skillPath }) => {
  const branchPoints = calculateBranchPoints(branch);
  const tags = skillPath.tags;
  
  const commitLocks: CommitLock[] = branch.commits.map((_, idx) => ({
    index: idx,
    locked: shouldLockCommitsBasedOnPoints(branchPoints, tags, idx)
  }));
  
  const shouldShowTags = branch.id === 'qualidade' || branch.id === 'seguranca';
  const tagsToShow = shouldShowTags ? tags : [];
  
  const commitTagPairs: { commit?: Branch['commits'][0], tag?: Tag, commitIndex: number }[] = [];
  
  branch.commits.forEach((commit, idx) => {
    commitTagPairs.push({ commit, commitIndex: idx });
  });
  
  if (shouldShowTags) {
    tags.forEach((tag, tagIdx) => {
      const position = (tagIdx + 1) * 5 - 1;
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
        <div 
          className="absolute left-4 top-4 h-[calc(100%-8px)] w-1 z-0" 
          style={{ backgroundColor: branch.color }}
        ></div>
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
                    lock ? `Para avaliar este item, alcance o nível anterior com ${(Math.floor(commitIdx / 5) * 10)} pontos nesta trilha.` : undefined
                  }
                />
              );
            } else if (item.tag) {
              return (
                <TagIllustratedNode
                  key={`tag-${item.tag.id}`}
                  tag={item.tag}
                  skillPath={skillPath}
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
