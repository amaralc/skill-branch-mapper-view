
import React from 'react';
import { Select, SelectGroup, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectLabel } from '@/components/ui/select';
import { careerOptions } from '@/types/emphasis';

interface EmphasisSelectorProps {
  // Make the original props optional since we have alternative props now
  selectedEmphasis?: string[];
  onEmphasisChange?: (emphasis: string[]) => void;
  // Alternative prop names used in Index.tsx
  selectedSpecialties?: string[];
  onChange?: (emphasis: string[]) => void;
}

const EmphasisSelector: React.FC<EmphasisSelectorProps> = ({
  selectedEmphasis = [],
  onEmphasisChange,
  selectedSpecialties,
  onChange
}) => {
  // Use either selectedSpecialties or selectedEmphasis with a default empty array
  const selectedItems = selectedSpecialties || selectedEmphasis || [];
  
  // Use either onChange or onEmphasisChange
  const handleChange = (emphasis: string[]) => {
    if (onChange) {
      onChange(emphasis);
    } else if (onEmphasisChange) {
      onEmphasisChange(emphasis);
    }
  };

  // Convert career selection to specialty selections
  const handleCareerChange = (careerId: string) => {
    const selectedCareer = careerOptions.find(career => career.id === careerId);
    if (selectedCareer) {
      console.log(`Selected career: ${selectedCareer.label}, specialties: ${selectedCareer.specialties.join(', ')}`);
      handleChange(selectedCareer.specialties);
    }
  };

  // Find the selected career based on current specialties
  const getSelectedCareerId = (): string => {
    if (!selectedItems || selectedItems.length === 0) {
      return "";
    }
    
    for (const career of careerOptions) {
      // Check if selected specialties exactly match a career's specialties
      if (
        career.specialties.length === selectedItems.length && 
        career.specialties.every(spec => selectedItems.includes(spec)) &&
        selectedItems.every(spec => career.specialties.includes(spec))
      ) {
        return career.id;
      }
    }
    return "";
  };

  return (
    <div className="w-full">
      <Select 
        value={getSelectedCareerId()} 
        onValueChange={handleCareerChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Escolha uma ênfase" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="font-bold">Ênfase</SelectLabel>
            {careerOptions.map(career => (
              <SelectItem key={career.id} value={career.id}>
                {career.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default EmphasisSelector;
