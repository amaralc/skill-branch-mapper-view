
import React from 'react';
import { Select, SelectGroup, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectLabel } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { careerOptions, emphasisOptions } from '@/types/emphasis';
import { ChevronDown } from 'lucide-react';

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

  // Toggle a specialty in the selected items array
  const toggleSpecialty = (specialtyId: string) => {
    const newSelection = [...selectedItems];
    const index = newSelection.indexOf(specialtyId);
    
    if (index === -1) {
      newSelection.push(specialtyId);
    } else {
      newSelection.splice(index, 1);
    }
    
    handleChange(newSelection);
    console.log(`Toggled specialty ${specialtyId}, new selection:`, newSelection);
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

  // Get the label for selected emphasis
  const getSelectedEmphasisLabel = (): string => {
    if (!selectedItems || selectedItems.length === 0) {
      return "Escolha um cargo";
    }
    
    if (selectedItems.length === 1) {
      const emphasis = emphasisOptions.find(e => e.id === selectedItems[0]);
      return emphasis ? emphasis.label : "Escolha um cargo";
    }
    
    // Check if it matches a career
    const careerId = getSelectedCareerId();
    if (careerId) {
      const career = careerOptions.find(c => c.id === careerId);
      return career ? career.label : `${selectedItems.length} ênfases selecionadas`;
    }
    
    return `${selectedItems.length} ênfases selecionadas`;
  };

  // Log the current state for debugging
  console.log("EmphasisSelector render:", { 
    selectedItems, 
    availableCareerOptions: careerOptions,
    selectedCareerId: getSelectedCareerId()
  });

  return (
    <div className="w-full">
      <div className="flex flex-col gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-between font-normal"
            >
              {getSelectedEmphasisLabel()}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full min-w-[200px]">
          <div className="border-t p-2">
              <p className="font-semibold mb-2">Cargo</p>
              {careerOptions.map((career) => (
                <DropdownMenuCheckboxItem
                  key={career.id}
                  checked={getSelectedCareerId() === career.id}
                  onSelect={(e) => {
                    e.preventDefault();
                    handleCareerChange(career.id);
                  }}
                >
                  {career.label}
                </DropdownMenuCheckboxItem>
              ))}
            </div>
            <div className="p-2">
              <p className="font-semibold mb-2">Especialidades</p>
              {emphasisOptions.map((emphasis) => (
                <DropdownMenuCheckboxItem
                  key={emphasis.id}
                  checked={selectedItems.includes(emphasis.id)}
                  disabled={true}
                  onSelect={(e) => {
                    e.preventDefault();
                    toggleSpecialty(emphasis.id);
                  }}
                >
                  {emphasis.label}
                </DropdownMenuCheckboxItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default EmphasisSelector;
