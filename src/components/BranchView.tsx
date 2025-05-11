import React, { useState } from 'react';
import { Branch, SkillPath, Tag, Commit } from '@/types/skill';
import CommitNode from './CommitNode';
import TagIllustratedNode from './TagIllustratedNode';
import { Badge } from '@/components/ui/badge';
import { calculateBranchPoints } from '@/utils/skillCalculations';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

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
  // Track which levels are expanded (all others are collapsed)
  const [expandedLevels, setExpandedLevels] = useState<string[]>(
    // If a level is selected, it starts expanded
    selectedLevel ? [selectedLevel] : []
  );

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

  // Get all unique levels available in this branch's commits
  const availableLevels = Array.from(new Set(
    sortedCommits
      .map(commit => commit.metadata?.level?.replace(/\D/g, ''))
      .filter(level => level !== undefined)
  )).sort((a, b) => Number(b) - Number(a)); // Sort in descending order
  
  // Create a map of levels to tags
  const levelTags: Record<string, Tag> = {};
  tags.forEach(tag => {
    const levelMatch = tag.level.match(/Level (\d+)/);
    if (levelMatch) {
      const levelNumber = levelMatch[1];
      levelTags[levelNumber] = tag;
    }
  });
  
  // Group commits by level
  const commitsByLevel: Record<string, Array<Commit>> = {};
  sortedCommits.forEach(commit => {
    const commitLevel = commit.metadata?.level?.replace(/\D/g, '') || '0';
    if (!commitsByLevel[commitLevel]) {
      commitsByLevel[commitLevel] = [];
    }
    commitsByLevel[commitLevel].push(commit);
  });

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
          {availableLevels.length > 0 ? (
            availableLevels.map((level, levelIndex) => {
              const tag = levelTags[level];
              const commitsForLevel = commitsByLevel[level] || [];
              const isExpanded = isLevelExpanded(level);
              const isCurrentLevel = selectedLevel ? level === selectedLevel.replace(/\D/g, '') : false;
              
              return (
                <div key={`level-${level}`} className="mb-4">
                  {/* Level Tag */}
                  {tag && (
                    <TagIllustratedNode
                      key={`tag-${tag.id}-${level}`}
                      tag={tag}
                      skillPath={skillPath}
                      imageSrc={images[parseInt(level) % images.length]}
                    />
                  )}
                  
                  {/* Level Header */}
                  <Collapsible
                    open={isExpanded}
                    onOpenChange={() => toggleLevelExpansion(level)}
                    className="w-full"
                  >
                    <div className="flex items-center justify-between mb-2 p-2 bg-gray-50 rounded">
                      <h3 className="text-sm font-medium">
                        Nível {level} 
                        {isCurrentLevel && (
                          <span className="ml-2 text-xs text-blue-500">(Nível Selecionado)</span>
                        )}
                      </h3>
                      <CollapsibleTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                        >
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    
                    {/* Level Content */}
                    <CollapsibleContent>
                      {commitsForLevel.length > 0 ? (
                        <div className="space-y-2 pl-1">
                          {commitsForLevel.map((commit, commitIndex) => (
                            <CommitNode
                              key={`commit-${commit.id}`}
                              commit={commit}
                              branchColor={branch.color}
                              isLast={commitIndex === commitsForLevel.length - 1}
                              onEvaluate={evaluation => onEvaluateCommit(branch.id, commit.id, evaluation)}
                              dimmed={false}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-500">
                          Nenhum comportamento disponível para este nível com os filtros atuais.
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-gray-500">
              Nenhum comportamento disponível para esta competência com os filtros atuais.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BranchView;
