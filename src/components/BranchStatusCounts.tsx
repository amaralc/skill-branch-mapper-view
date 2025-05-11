
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface BranchStatusCountsProps {
  counts: {
    notEvaluated: number;
    never: number;
    sometimes: number;
    always: number;
  };
}

const BranchStatusCounts: React.FC<BranchStatusCountsProps> = ({ counts }) => {
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
