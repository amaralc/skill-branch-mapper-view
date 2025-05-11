
import React from "react";
import { Branch, SkillPath, Tag } from "@/types/skill";
import LevelSection from "./LevelSection";
import BranchStatusCounts from "./BranchStatusCounts";
import { useBranchUtils } from "@/hooks/useBranchUtils";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react";

interface BranchViewProps {
  branch: Branch;
  onEvaluateCommit: (
    branchId: string,
    commitId: string,
    evaluation: "never" | "sometimes" | "always"
  ) => void;
  isCurrentBranch: boolean;
  skillPath: SkillPath;
  selectedLevel: string | null;
  selectedTrack: string | null;
}

// Array of sample images for level illustrations
const images = [
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=160&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=160&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=160&q=80",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=160&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=160&q=80",
  "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=160&q=80",
  "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=160&q=80",
  "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=160&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=160&q=80",
];

const BranchView: React.FC<BranchViewProps> = ({
  branch,
  onEvaluateCommit,
  isCurrentBranch,
  skillPath,
  selectedLevel,
  selectedTrack,
}) => {
  const {
    availableLevels,
    commitsByLevel,
    counts,
    isLevelExpanded,
    isLevelVisible,
    toggleLevelExpansion,
    showNextLevel,
    showPreviousLevel,
    hideAllExceptSelected,
    getLevelDisplay,
    additionalVisibleLevelsCount,
  } = useBranchUtils(branch, selectedLevel, selectedTrack);

  // Handle commit evaluation with branch ID
  const handleEvaluateCommit = (
    commitId: string,
    evaluation: "never" | "sometimes" | "always"
  ) => {
    onEvaluateCommit(branch.id, commitId, evaluation);
  };

  // Create a map of levels to tags
  const levelTags: Record<string, Tag> = {};
  skillPath.tags.forEach((tag) => {
    const levelMatch = tag.level.match(/Level (\d+)/);
    if (levelMatch) {
      const levelNumber = levelMatch[1];
      levelTags[levelNumber] = tag;
    }
  });

  // Check if we have a selected level to determine if we should show toggle buttons
  const hasSelectedLevel = !!selectedLevel;

  // Get the selected level number without the "L" prefix
  const selectedLevelNumber = selectedLevel
    ? selectedLevel.replace(/\D/g, "")
    : null;

  // Check if there are other levels besides the selected level
  const hasOtherLevels =
    availableLevels.length > 1 && selectedLevelNumber !== null;

  // Calculate if we have next or previous levels relative to the selected one
  const selectedLevelIndex = selectedLevelNumber
    ? availableLevels.indexOf(selectedLevelNumber)
    : -1;

  const hasNextLevel =
    selectedLevelIndex !== -1 &&
    selectedLevelIndex > 0;
    
  const hasPreviousLevel = 
    selectedLevelIndex !== -1 && 
    selectedLevelIndex < availableLevels.length - 1;

  return (
    <div className={`mb-8 ${isCurrentBranch ? "opacity-100" : "opacity-60"}`}>
      <div className="flex items-center gap-2 mb-4">
        <div
          className="px-3 py-1 rounded text-white font-mono text-sm font-bold inline-flex items-center"
          style={{ backgroundColor: branch.color }}
        >
          {branch.name}
        </div>

        <BranchStatusCounts counts={counts} />
      </div>

      {hasSelectedLevel && hasOtherLevels && (
        <div className="mb-4 flex flex-wrap gap-2">
          {/* Sempre mostramos o botão de "Ver próximo nível" se houver um */}
          {hasNextLevel && (
            <Button
              variant="outline"
              size="sm"
              onClick={showNextLevel}
              className="flex items-center gap-2"
            >
              <ChevronUp size={16} />
              <span>Ver próximo nível</span>
            </Button>
          )}

          {/* Sempre mostramos o botão de "Ver nível anterior" se houver um */}
          {hasPreviousLevel && (
            <Button
              variant="outline"
              size="sm"
              onClick={showPreviousLevel}
              className="flex items-center gap-2"
            >
              <ChevronDown size={16} />
              <span>Ver nível anterior</span>
            </Button>
          )}

          {/* Mostramos o botão de "Mostrar apenas o nível selecionado" se houver níveis adicionais visíveis */}
          {additionalVisibleLevelsCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={hideAllExceptSelected}
              className="flex items-center gap-2"
            >
              <EyeOff size={16} />
              <span>Mostrar apenas o nível selecionado</span>
            </Button>
          )}
        </div>
      )}

      <div className="relative">
        <div
          className="absolute left-4 top-4 h-[calc(100%-8px)] w-1 z-0"
          style={{ backgroundColor: branch.color }}
        ></div>
        <div className="relative z-10">
          {availableLevels.length > 0 ? (
            availableLevels
              .map((level) => {
                // Only render the level if it's visible or if there's no selected level
                if (!selectedLevel || isLevelVisible(level)) {
                  const tag = levelTags[level];
                  const commitsForLevel = commitsByLevel[level] || [];
                  const isCurrentLevelSelected = selectedLevelNumber === level;

                  return (
                    <LevelSection
                      key={`level-${level}`}
                      level={level}
                      commits={commitsForLevel}
                      tag={tag}
                      branchColor={branch.color}
                      skillPath={skillPath}
                      isCurrentLevel={isCurrentLevelSelected}
                      imageSrc={images[parseInt(level) % images.length]}
                      onEvaluateCommit={handleEvaluateCommit}
                      selectedTrack={selectedTrack}
                      isExpanded={isLevelExpanded(level)}
                      onToggleExpansion={() => toggleLevelExpansion(level)}
                    />
                  );
                }
                return null;
              })
              .filter(Boolean)
          ) : (
            <div className="text-center py-8 text-gray-500">
              Nenhum comportamento disponível para esta competência com os
              filtros atuais.
            </div>
          )}
        </div>
      </div>

      {hasSelectedLevel && hasOtherLevels && availableLevels.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {/* Repetimos os mesmos botões no final da seção para facilitar o uso */}
          {hasNextLevel && (
            <Button
              variant="outline"
              size="sm"
              onClick={showNextLevel}
              className="flex items-center gap-2"
            >
              <ChevronUp size={16} />
              <span>Ver próximo nível</span>
            </Button>
          )}

          {hasPreviousLevel && (
            <Button
              variant="outline"
              size="sm"
              onClick={showPreviousLevel}
              className="flex items-center gap-2"
            >
              <ChevronDown size={16} />
              <span>Ver nível anterior</span>
            </Button>
          )}

          {additionalVisibleLevelsCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={hideAllExceptSelected}
              className="flex items-center gap-2"
            >
              <EyeOff size={16} />
              <span>Mostrar apenas o nível selecionado</span>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default BranchView;
