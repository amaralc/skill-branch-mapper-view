
import React from 'react';
import { Commit, SkillPath, Tag } from '@/types/skill';
import CommitNode from './CommitNode';
import TagIllustratedNode from './TagIllustratedNode';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { getLevelTitle } from '@/utils/filterHelpers';

interface LevelSectionProps {
  level: string;
  commits: Commit[];
  tag?: Tag;
  branchColor: string;
  skillPath: SkillPath;
  isCurrentLevel: boolean;
  imageSrc: string;
  onEvaluateCommit: (commitId: string, evaluation: 'never' | 'sometimes' | 'always') => void;
  selectedTrack: string | null;
  isExpanded: boolean;
  onToggleExpansion: () => void;
}

const LevelSection: React.FC<LevelSectionProps> = ({
  level,
  commits,
  tag,
  branchColor,
  skillPath,
  isCurrentLevel,
  imageSrc,
  onEvaluateCommit,
  selectedTrack,
  isExpanded,
  onToggleExpansion
}) => {
  // Get level code based on level and track
  const getLevelCode = () => {
    return selectedTrack && parseInt(level) >= 5 ? `L${level}-${selectedTrack}` : `L${level}-T`;
  };
  
  const levelCode = getLevelCode();
  const levelTitle = getLevelTitle(levelCode);
  
  // Create a tag if not provided
  const levelTag = tag || {
    id: `level-${level}`,
    name: levelCode,
    level: levelTitle,
    pointsRequired: 0,
    description: `Comportamentos esperados para ${levelCode}`
  };
  
  return (
    <div className="mb-4">
      {/* Level Tag */}
      <TagIllustratedNode
        key={`tag-${level}`}
        tag={levelTag}
        skillPath={skillPath}
        imageSrc={imageSrc}
      />
      
      {/* Level Content */}
      <Collapsible
        open={isExpanded}
        onOpenChange={onToggleExpansion}
        className="w-full mt-2"
      >
        <div className="flex items-center justify-between mb-2 p-2 bg-gray-50 rounded">
          <h3 className="text-sm font-medium">
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
        
        <CollapsibleContent>
          {commits.length > 0 ? (
            <div className="space-y-2 pl-1">
              {commits.map((commit, commitIndex) => (
                <CommitNode
                  key={`commit-${commit.id}`}
                  commit={commit}
                  branchColor={branchColor}
                  isLast={commitIndex === commits.length - 1}
                  onEvaluate={evaluation => onEvaluateCommit(commit.id, evaluation)}
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
};

export default LevelSection;
