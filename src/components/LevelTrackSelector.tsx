
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Branch } from '@/types/skill';
import { getCodeTitle } from '@/utils/filterHelpers';

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
  // Map of levels with their description
  const levelDescriptions = [
    { id: 'L0', label: 'Estagiário' },
    { id: 'L1', label: 'Assistente' },
    { id: 'L2', label: 'Júnior' },
    { id: 'L3', label: 'Pleno' },
    { id: 'L4', label: 'Sênior' },
    { id: 'L5', label: 'Staff ou Coordenador' },
    { id: 'L6', label: 'Principal ou Gerente' },
    { id: 'L7', label: 'Diretor' }
  ];
  
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
            {levelDescriptions.map(level => (
              <SelectItem key={level.id} value={level.id}>
                {level.id} - {level.label}
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
