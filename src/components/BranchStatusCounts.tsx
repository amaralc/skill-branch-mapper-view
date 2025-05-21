
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Branch } from '@/types/skill';
import { getLevelCommits } from '@/utils/branchUtils';

interface BranchStatusCountsProps {
  branch: Branch;
  selectedLevel: string | null;
  selectedTrack: string | null;
}

const BranchStatusCounts: React.FC<BranchStatusCountsProps> = ({ 
  branch, 
  selectedLevel, 
  selectedTrack 
}) => {
  // Calculate counts based on evaluation status
  const calculateCounts = () => {
    // Filter commits by level if selected
    const filteredCommits = selectedLevel 
      ? getLevelCommits(branch, selectedLevel, selectedTrack) 
      : branch.commits;
    
    const counts = {
      notEvaluated: 0,
      never: 0,
      sometimes: 0,
      always: 0,
    };

    filteredCommits.forEach(commit => {
      if (commit.evaluation === null || commit.evaluation === undefined) {
        counts.notEvaluated++;
      } else if (commit.evaluation === 'never') {
        counts.never++;
      } else if (commit.evaluation === 'sometimes') {
        counts.sometimes++;
      } else if (commit.evaluation === 'always') {
        counts.always++;
      }
    });

    return counts;
  };

  const counts = calculateCounts();

  return (
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
  );
};

export default BranchStatusCounts;
