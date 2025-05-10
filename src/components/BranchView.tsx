
import React from 'react';
import { Branch, SkillPath, Tag } from '@/types/skill';
import CommitNode from './CommitNode';
import TagIllustratedNode from './TagIllustratedNode';
import { Badge } from '@/components/ui/badge';
import { calculateBranchPoints } from '@/utils/skillCalculations';

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
  selectedLevel: string | null;
  selectedTrack: string | null;
}

const BranchView: React.FC<BranchViewProps> = ({ 
  branch, 
  onEvaluateCommit, 
  isCurrentBranch, 
  skillPath, 
  selectedLevel,
  selectedTrack 
}) => {
  // Filter commits by selected track if both levels and track are specified
  const filteredCommits = branch.commits.filter(commit => {
    // If no track selected, show all
    if (!selectedTrack) return true;
    
    // If this commit doesn't specify a track, always show it
    if (!commit.metadata?.track) return true;
    
    // Otherwise, only show commits that match the selected track
    return commit.metadata.track === selectedTrack;
  });
  
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

  const counts = getBranchStatusCounts(filteredCommits);

  // Calculate points only for filtered commits
  const calculateFilteredBranchPoints = (commits: Branch['commits']) => {
    let points = 0;
    commits.forEach(commit => {
      if (commit.evaluation === 'sometimes') points += 1;
      else if (commit.evaluation === 'always') points += 2;
    });
    return points;
  };

  const branchPoints = calculateFilteredBranchPoints(filteredCommits);
  const tags = skillPath.tags;
  
  // Sort commits by level in descending order
  const sortedCommits = [...filteredCommits].sort((a, b) => {
    const levelA = a.metadata?.level ? parseInt(a.metadata.level.replace(/\D/g, '')) : 0;
    const levelB = b.metadata?.level ? parseInt(b.metadata.level.replace(/\D/g, '')) : 0;
    return levelB - levelA; // Descending order
  });
  
  // Create a map of levels to tags
  const levelTags: Record<string, Tag> = {};
  tags.forEach(tag => {
    const levelMatch = tag.level.match(/Level (\d+)/);
    if (levelMatch) {
      const levelNumber = levelMatch[1];
      levelTags[levelNumber] = tag;
    }
  });
  
  // Group commits by level and prepare rendering items with level tags
  const renderItems: Array<{ type: 'commit' | 'tag', item: any, level: string }> = [];
  
  let currentLevel: string | null = null;
  
  // Process each commit and add level tags when level changes
  sortedCommits.forEach(commit => {
    const commitLevel = commit.metadata?.level?.replace(/\D/g, '') || '0';
    
    // If we're at a new level, add the corresponding tag first
    if (commitLevel !== currentLevel) {
      currentLevel = commitLevel;
      
      // Find the tag for this level
      const tagForLevel = levelTags[commitLevel];
      if (tagForLevel) {
        renderItems.push({
          type: 'tag',
          item: tagForLevel,
          level: commitLevel
        });
      }
    }
    
    // Add the commit
    renderItems.push({
      type: 'commit',
      item: commit,
      level: commitLevel
    });
  });
  
  return (
    <div className={`mb-8 ${isCurrentBranch ? 'opacity-100' : 'opacity-60'}`}>
      <div className="flex items-center gap-2 mb-4">
        <div 
          className="px-3 py-1 rounded text-white font-mono text-sm font-bold inline-flex items-center"
          style={{ backgroundColor: branch.color }}
        >
          {branch.name}
        </div>

        <div className="flex gap-1">
          {counts.notEvaluated > 0 && (
            <Badge variant="outline" className="bg-gray-100">
              {counts.notEvaluated}
            </Badge>
          )}
          {counts.never > 0 && (
            <Badge className="bg-red-500 hover:bg-red-500">
              {counts.never}
            </Badge>
          )}
          {counts.sometimes > 0 && (
            <Badge className="bg-yellow-500 hover:bg-yellow-500">
              {counts.sometimes}
            </Badge>
          )}
          {counts.always > 0 && (
            <Badge className="bg-green-500 hover:bg-green-500">
              {counts.always}
            </Badge>
          )}
        </div>
      </div>

      <div className="relative">
        <div 
          className="absolute left-4 top-4 h-[calc(100%-8px)] w-1 z-0" 
          style={{ backgroundColor: branch.color }}
        ></div>
        <div className="relative z-10">
          {renderItems.map((item, idx) => {
            if (item.type === 'commit') {
              const commit = item.item;
              const isCommitInSelectedLevel = 
                !selectedLevel || 
                (commit.metadata?.level === selectedLevel);
              
              return (
                <CommitNode
                  key={`commit-${commit.id}`}
                  commit={commit}
                  branchColor={branch.color}
                  isLast={idx === renderItems.length - 1}
                  onEvaluate={evaluation => onEvaluateCommit(branch.id, commit.id, evaluation)}
                  dimmed={selectedLevel && !isCommitInSelectedLevel}
                />
              );
            } else if (item.type === 'tag') {
              const tag = item.item;
              return (
                <TagIllustratedNode
                  key={`tag-${tag.id}`}
                  tag={tag}
                  skillPath={skillPath}
                  imageSrc={images[parseInt(item.level) % images.length]}
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
