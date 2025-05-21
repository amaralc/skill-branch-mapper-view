
import React from 'react';
import { Select, SelectGroup, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectValue } from '@/components/ui/select';
import { careerPaths } from '@/data/skillData';

interface CareerSelectorProps {
  selectedCareerId: string;
  onCareerChange?: (careerId: string) => void; // Original prop
  onChange?: (careerId: string) => void; // Added to support the way it's called in Index.tsx
}

const CareerSelector: React.FC<CareerSelectorProps> = ({
  selectedCareerId,
  onCareerChange,
  onChange
}) => {
  const careerOptions = careerPaths.map(path => ({
    id: path.id,
    label: path.name,
    value: path.id,
    skillPath: path
  }));

  // Use onChange if provided, otherwise fall back to onCareerChange
  const handleChange = (careerId: string) => {
    if (onChange) {
      onChange(careerId);
    } else if (onCareerChange) {
      onCareerChange(careerId);
    }
  };

  return (
    <Select value={selectedCareerId} onValueChange={handleChange}>
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
