
import React from "react";
import { SkillPath } from "@/types/skill";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface ProgressSummaryProps {
  skillPath: SkillPath;
  selectedTrack: string | null;
  selectedLevel?: string | null;
  selectedSpecialties?: string[];
  onResetEvaluations?: () => void; // Nova prop para função de reset
}

const ProgressSummary: React.FC<ProgressSummaryProps> = ({
  skillPath,
  selectedTrack,
  selectedLevel,
  selectedSpecialties = [],
  onResetEvaluations // Recebendo a função de reset
}) => {
  // Define base/common tracks that are always included
  const baseTracks = ['ACCOUNTABILITY', 'ADAPTABILITY', 'COMMUNICATION', 'CONTINUOUS-DEVELOPMENT', 
                      'EMOTIONAL-INTELLIGENCE', 'RESULTS-ORIENTATION', 'QUALITY', 'SECURITY', 
                      'ARCHITECTURE', 'CONTINUOUS-DELIVERY'];

  // Filter branches based on selected specialties
  const filteredBranches = skillPath.branches?.filter(branch => {
    // Always include base branches
    if (baseTracks.includes(branch.id)) {
      return true;
    }
    
    // Include specialty branches only if they're in the selectedSpecialties array
    if (selectedSpecialties.length > 0) {
      const branchLowerCase = branch.id.toLowerCase();
      return selectedSpecialties.some(emphasis => emphasis.toLowerCase() === branchLowerCase);
    }
    
    return false;
  }) || [];

  console.log("ProgressSummary - Filtered branches:", filteredBranches.map(b => b.id));

  // Calculate filtered points based on the selected track and level
  const calculateFilteredPoints = (
    filteredBranches: typeof skillPath.branches,
    selectedTrack: string | null,
    selectedLevel: string | null
  ) => {
    if (!filteredBranches || filteredBranches.length === 0) {
      return 0;
    }

    let totalPoints = 0;

    filteredBranches.forEach((branch) => {
      branch.commits.forEach((commit) => {
        // Skip commits that don't match the selected track (if a track is selected)
        if (
          selectedTrack &&
          commit.metadata?.track &&
          commit.metadata.track !== selectedTrack &&
          ["L5", "L6", "L7"].includes(commit.metadata.level || "")
        ) {
          return;
        }

        // Skip commits that don't match the selected level (if a level is selected)
        if (
          selectedLevel &&
          commit.metadata?.level &&
          commit.metadata.level !== selectedLevel
        ) {
          return;
        }

        if (commit.evaluation === "sometimes") totalPoints += 1;
        else if (commit.evaluation === "always") totalPoints += 2;
      });
    });

    return totalPoints;
  };

  // Calculate maximum points for commits that match the selected track and level
  const getFilteredMaxPoints = (
    filteredBranches: typeof skillPath.branches,
    selectedTrack: string | null,
    selectedLevel: string | null
  ) => {
    if (!filteredBranches || filteredBranches.length === 0) {
      return 0;
    }

    let maxPoints = 0;

    filteredBranches.forEach((branch) => {
      branch.commits.forEach((commit) => {
        // Skip commits that don't match the selected track (if a track is selected)
        if (
          selectedTrack &&
          commit.metadata?.track &&
          commit.metadata.track !== selectedTrack &&
          ["L5", "L6", "L7"].includes(commit.metadata.level || "")
        ) {
          return;
        }

        // Skip commits that don't match the selected level (if a level is selected)
        if (
          selectedLevel &&
          commit.metadata?.level &&
          commit.metadata.level !== selectedLevel
        ) {
          return;
        }

        maxPoints += 2; // Each commit can earn up to 2 points
      });
    });

    return maxPoints;
  };

  const points = calculateFilteredPoints(filteredBranches, selectedTrack, selectedLevel);
  const maxPoints = getFilteredMaxPoints(filteredBranches, selectedTrack, selectedLevel);
  const percentage = maxPoints > 0 ? Math.round((points / maxPoints) * 100) : 0;

  // Calculate total counts of behavior evaluations, filtering by track and level if needed
  const totalCounts = {
    notEvaluated: 0,
    never: 0,
    sometimes: 0,
    always: 0,
  };

  if (filteredBranches && filteredBranches.length > 0) {
    filteredBranches.forEach((branch) => {
      branch.commits.forEach((commit) => {
        // Skip commits that don't match the selected track (if a track is selected)
        if (
          selectedTrack &&
          commit.metadata?.track &&
          commit.metadata.track !== selectedTrack &&
          ["L5", "L6", "L7"].includes(commit.metadata.level || "")
        ) {
          return;
        }

        // Skip commits that don't match the selected level (if a level is selected)
        if (
          selectedLevel &&
          commit.metadata?.level &&
          commit.metadata.level !== selectedLevel
        ) {
          return;
        }

        if (commit.evaluation === null) totalCounts.notEvaluated++;
        else if (commit.evaluation === "never") totalCounts.never++;
        else if (commit.evaluation === "sometimes") totalCounts.sometimes++;
        else if (commit.evaluation === "always") totalCounts.always++;
      });
    });
  }

  return (
    <div
      className="sticky top-0 z-40 bg-white mb-6 transition-colors duration-300 border-b border-gray-200"
      style={{
        boxShadow: "0 8px 12px -4px rgba(255,255,255,0.9)",
        borderBottom: "1.5px solid rgba(180,180,180,0.15)",
      }}
    >
      <div className="p-4 border-none shadow-[0_20px_20px_white]">
        <div className="flex justify-between mb-2">
          <h2 className="text-lg font-bold">Progresso</h2>

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

        {/* Botão de Reiniciar Avaliação */}
        {onResetEvaluations && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onResetEvaluations}
            className="flex items-center gap-2 w-full mt-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reiniciar Avaliação
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProgressSummary;
