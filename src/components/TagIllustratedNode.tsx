
import React from 'react';
import { Tag, Branch, SkillPath, calculatePoints } from '@/data/skillData';
import { Tag as TagIcon } from 'lucide-react';

interface TagIllustratedNodeProps {
  tag: Tag;
  branch: Branch;
  skillPath: SkillPath;
  imageSrc: string;
}

const TagIllustratedNode: React.FC<TagIllustratedNodeProps> = ({ tag, branch, skillPath, imageSrc }) => {
  const currentPoints = calculatePoints(skillPath);
  const isAchieved = currentPoints >= tag.pointsRequired;

  return (
    <div className="flex items-center mb-6 ml-8">
      <div className="relative flex items-center">
        <img
          src={imageSrc}
          alt={tag.name}
          className="w-16 h-16 rounded-xl object-cover shadow mr-4 border border-gray-300"
        />
        <span className={`absolute top-0 left-0 bg-white rounded-br px-2 py-0.5 text-xs font-mono border text-gray-700 shadow ${isAchieved ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-white/60'}`}>
          {tag.name}
        </span>
      </div>
      <div
        className={`flex-1 border rounded p-2 transition 
         ${isAchieved
          ? 'bg-green-50 border-green-300 text-green-800'
          : 'bg-gray-50 border-gray-300 text-gray-600'
        }`}
      >
        <div className="flex items-center">
          <TagIcon
            className={isAchieved ? 'text-green-600 mr-2' : 'text-gray-500 mr-2'}
            size={18}
          />
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

export default TagIllustratedNode;
