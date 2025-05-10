
import React from 'react';
import { SkillPath, calculatePoints, getMaxPoints } from '@/data/skillData';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface ProgressSummaryProps {
  skillPath: SkillPath;
}

const ProgressSummary: React.FC<ProgressSummaryProps> = ({
  skillPath
}) => {
  const points = calculatePoints(skillPath);
  const maxPoints = getMaxPoints(skillPath);
  const percentage = Math.round(points / maxPoints * 100);

  // Calculate total counts of behavior evaluations
  const totalCounts = {
    notEvaluated: 0,
    never: 0,
    sometimes: 0,
    always: 0
  };

  skillPath.branches.forEach(branch => {
    branch.commits.forEach(commit => {
      if (commit.evaluation === null) totalCounts.notEvaluated++;
      else if (commit.evaluation === 'never') totalCounts.never++;
      else if (commit.evaluation === 'sometimes') totalCounts.sometimes++;
      else if (commit.evaluation === 'always') totalCounts.always++;
    });
  });

  return (
    <div 
      className="sticky top-0 z-40 bg-white mb-6 transition-colors duration-300 border-b border-gray-200" 
      style={{
        boxShadow: '0 8px 12px -4px rgba(255,255,255,0.9)',
        borderBottom: '1.5px solid rgba(180,180,180,0.15)'
      }}
    >
      <div className="p-4 border-none shadow-[0_20px_20px_white]">
        <div className="flex justify-between mb-2">
          <h2 className="text-lg font-bold">Progresso da Avaliação</h2>
          
          <div className="flex gap-1 items-center">
            {totalCounts.notEvaluated > 0 && (
              <Badge variant="outline" className="bg-gray-100">
                {totalCounts.notEvaluated}
              </Badge>
            )}
            {totalCounts.never > 0 && (
              <Badge className="bg-red-500 hover:bg-red-500">
                {totalCounts.never}
              </Badge>
            )}
            {totalCounts.sometimes > 0 && (
              <Badge className="bg-yellow-500 hover:bg-yellow-500">
                {totalCounts.sometimes}
              </Badge>
            )}
            {totalCounts.always > 0 && (
              <Badge className="bg-green-500 hover:bg-green-500">
                {totalCounts.always}
              </Badge>
            )}
          </div>
        </div>

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
