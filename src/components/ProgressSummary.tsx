import React from 'react';
import { SkillPath, calculatePoints, getMaxPoints, getCurrentLevel, getNextLevel } from '@/data/skillData';
import { Progress } from '@/components/ui/progress';
import { Tag as TagIcon } from 'lucide-react';
interface ProgressSummaryProps {
  skillPath: SkillPath;
}
const ProgressSummary: React.FC<ProgressSummaryProps> = ({
  skillPath
}) => {
  const points = calculatePoints(skillPath);
  const maxPoints = getMaxPoints(skillPath);
  const percentage = Math.round(points / maxPoints * 100);
  const currentLevel = getCurrentLevel(skillPath);
  const nextLevel = getNextLevel(skillPath);
  return <div className="sticky top-0 z-40 bg-white mb-6 transition-colors duration-300 border-b border-gray-200" style={{
    // Remove shadows on right, left, and top. Add a larger white shadow (glow) to bottom.
    boxShadow: '0 8px 12px -4px rgba(255,255,255,0.9)',
    borderBottom: '1.5px solid rgba(180,180,180,0.15)'
  }}>
      <div className="p-4 border-none shadow-[0_4px_0_0_white]">
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

        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-md p-3 bg-gray-50">
            <div className="text-sm font-medium mb-1 text-gray-500">
              Nível Atual
            </div>
            {currentLevel ? <div className="flex items-center">
                <TagIcon className="h-4 w-4 mr-1 text-green-600" />
                <span className="font-bold">{currentLevel.name}</span>
                <span className="text-xs ml-2 text-gray-600">
                  ({currentLevel.level})
                </span>
              </div> : <div className="text-sm text-gray-500">Não avaliado</div>}
          </div>

          <div className="border rounded-md p-3 bg-gray-50">
            <div className="text-sm font-medium mb-1 text-gray-500">
              Próximo Nível
            </div>
            {nextLevel ? <div className="flex items-center">
                <TagIcon className="h-4 w-4 mr-1 text-blue-600" />
                <span className="font-bold">{nextLevel.name}</span>
                <span className="text-xs ml-2 text-gray-600">
                  Faltam {nextLevel.pointsRequired - points} pontos
                </span>
              </div> : <div className="text-sm text-green-600 font-medium">
                Nível máximo alcançado!
              </div>}
          </div>
        </div>
      </div>
    </div>;
};
export default ProgressSummary;