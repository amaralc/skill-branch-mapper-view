
import React, { useState, useEffect } from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import { Commit, Branch } from '@/types/skill';

interface LevelTrackSelectorProps {
  branches: Branch[];
  selectedLevel: string | null;
  selectedTrack: string | null;
  onLevelChange: (level: string) => void;
  onTrackChange: (track: string) => void;
}

const LevelTrackSelector: React.FC<LevelTrackSelectorProps> = ({
  branches,
  selectedLevel,
  selectedTrack,
  onLevelChange,
  onTrackChange
}) => {
  // Available levels from L0 to L7
  const levels = ['L0', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7'];
  
  // Available tracks
  const tracks = ['T', 'M'];
  
  // Get available tracks for the selected level
  const [availableTracks, setAvailableTracks] = useState<string[]>(['T']);

  // Determine which tracks are available for the selected level
  useEffect(() => {
    if (!selectedLevel || !branches.length) {
      setAvailableTracks(['T']);
      return;
    }

    // Check if there are commits with the track 'M' for the selected level
    const hasTrackM = branches.some(branch => 
      branch.commits.some(commit => 
        commit.metadata?.level === selectedLevel && commit.metadata?.track === 'M'
      )
    );

    setAvailableTracks(hasTrackM ? ['T', 'M'] : ['T']);
    
    // If M is not available and it's currently selected, reset to T
    if (!hasTrackM && selectedTrack === 'M') {
      onTrackChange('T');
    }
  }, [selectedLevel, branches, selectedTrack, onTrackChange]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Nível</Label>
        <ToggleGroup type="single" value={selectedLevel || ''} onValueChange={onLevelChange} className="justify-start flex-wrap">
          {levels.map(level => (
            <ToggleGroupItem key={level} value={level} aria-label={`Level ${level}`} className="px-3 py-1">
              {level}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <Label>Trilha</Label>
        <ToggleGroup type="single" value={selectedTrack || ''} onValueChange={onTrackChange} className="justify-start">
          {tracks.map(track => (
            <ToggleGroupItem 
              key={track} 
              value={track} 
              aria-label={`Track ${track}`} 
              disabled={!availableTracks.includes(track)}
              className="px-3 py-1"
            >
              {track === 'T' ? 'Técnica' : 'Gestão'}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
};

export default LevelTrackSelector;
