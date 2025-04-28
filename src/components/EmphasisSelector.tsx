
import React from 'react';
import { Select, SelectGroup, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectValue } from '@/components/ui/select';
import { emphasisOptions } from '@/types/emphasis';

interface EmphasisSelectorProps {
  selectedEmphasis: string | null;
  onEmphasisChange: (emphasisId: string) => void;
}

const EmphasisSelector: React.FC<EmphasisSelectorProps> = ({
  selectedEmphasis,
  onEmphasisChange
}) => {
  return (
    <Select value={selectedEmphasis || ''} onValueChange={onEmphasisChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Escolha a especialidade" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Especialidade</SelectLabel>
          {emphasisOptions.map(emphasis => (
            <SelectItem value={emphasis.id} key={emphasis.id}>
              {emphasis.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default EmphasisSelector;
