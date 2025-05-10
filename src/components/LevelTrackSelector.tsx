
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Branch } from '@/types/skill';

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
  const tracks = [
    { id: 'T', label: 'Técnica' },
    { id: 'M', label: 'Gestão' }
  ];
  
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
    <div className="flex flex-col gap-4">
      <Select value={selectedLevel || ''} onValueChange={onLevelChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Escolha o nível" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Nível</SelectLabel>
            {levels.map(level => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select value={selectedTrack || ''} onValueChange={onTrackChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Escolha a trilha" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Trilha</SelectLabel>
            {tracks.map(track => (
              <SelectItem 
                key={track.id} 
                value={track.id}
                disabled={!availableTracks.includes(track.id)}
              >
                {track.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LevelTrackSelector;
