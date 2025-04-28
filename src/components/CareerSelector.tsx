
import React from 'react';
import { Select, SelectGroup, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectValue } from '@/components/ui/select';
import { careerPaths } from '@/data/skillData';

interface CareerSelectorProps {
  selectedCareerId: string;
  onCareerChange: (careerId: string) => void;
}

const CareerSelector: React.FC<CareerSelectorProps> = ({
  selectedCareerId,
  onCareerChange
}) => {
  const careerOptions = careerPaths.map(path => ({
    id: path.id,
    label: path.name,
    value: path.id,
    skillPath: path
  }));

  return (
    <Select value={selectedCareerId} onValueChange={onCareerChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Escolha a carreira" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Carreira</SelectLabel>
          {careerOptions.map(opt => (
            <SelectItem value={opt.id} key={opt.id}>{opt.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CareerSelector;
