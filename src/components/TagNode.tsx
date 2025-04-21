
import React from 'react';
import { Tag, Branch, SkillPath, calculatePoints } from '@/data/skillData';
import { Tag as TagIcon } from 'lucide-react';

interface TagNodeProps {
  tag: Tag;
  branch: Branch;
  skillPath: SkillPath;
}

const TagNode: React.FC<TagNodeProps> = ({ tag, branch, skillPath }) => {
  const currentPoints = calculatePoints(skillPath);
  const isAchieved = currentPoints >= tag.pointsRequired;
  
  return (
    <div className="flex items-center mb-4">
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
        <TagIcon 
          className={isAchieved ? "text-green-600" : "text-gray-500"} 
          size={16} 
        />
      </div>
      
      <div className={`
        border rounded p-2 
        ${isAchieved 
          ? 'bg-green-50 border-green-300 text-green-800' 
          : 'bg-gray-50 border-gray-300 text-gray-600'}
      `}>
        <div className="flex items-center">
          <span className="font-bold text-sm mr-2">{tag.name}</span>
          <span className="text-xs">
            ({isAchieved ? 'Alcançado' : `Faltam ${tag.pointsRequired - currentPoints} pontos`})
          </span>
        </div>
        <div className="text-xs mt-1">{tag.level}</div>
      </div>
    </div>
  );
};

export default TagNode;
