
import React from 'react';
import { SkillPath, calculatePoints, getMaxPoints } from '@/data/skillData';
import { Progress } from '@/components/ui/progress';

interface ProgressSummaryProps {
  skillPath: SkillPath;
}

const ProgressSummary: React.FC<ProgressSummaryProps> = ({
  skillPath
}) => {
  const points = calculatePoints(skillPath);
  const maxPoints = getMaxPoints(skillPath);
  const percentage = Math.round(points / maxPoints * 100);

  return (
    <div 
      className="sticky top-0 z-40 bg-white mb-6 transition-colors duration-300 border-b border-gray-200" 
      style={{
        boxShadow: '0 8px 12px -4px rgba(255,255,255,0.9)',
        borderBottom: '1.5px solid rgba(180,180,180,0.15)'
      }}
    >
      <div className="p-4 border-none shadow-[0_20px_20px_white]">
        <h2 className="text-lg font-bold mb-2">Progresso da Avaliação</h2>

        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">
              Pontos: {points}/{maxPoints}
            </span>
            <span className="text-sm font-medium">{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>
      </div>
    </div>
  );
};

export default ProgressSummary;
