
import React from 'react';
import { 
  DropdownMenu, 
  DropdownMenuCheckboxItem, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown } from 'lucide-react';
import { Emphasis } from '@/types/skill';

interface EmphasisSelectorProps {
  selectedEmphasis: string[];
  onEmphasisChange: (emphasisIds: string[]) => void;
  emphasisOptions: Emphasis[];
}

const EmphasisSelector: React.FC<EmphasisSelectorProps> = ({
  selectedEmphasis,
  onEmphasisChange,
  emphasisOptions
}) => {
  const handleToggleEmphasis = (emphasisId: string) => {
    const newSelection = selectedEmphasis.includes(emphasisId)
      ? selectedEmphasis.filter(id => id !== emphasisId)
      : [...selectedEmphasis, emphasisId];
    
    onEmphasisChange(newSelection);
  };

  const getSelectedText = () => {
    if (selectedEmphasis.length === 0) {
      return "Escolha suas especialidades";
    }
    
    if (selectedEmphasis.length === 1) {
      const selected = emphasisOptions.find(e => e.id === selectedEmphasis[0]);
      return selected ? selected.label : "1 especialidade selecionada";
    }
    
    return `${selectedEmphasis.length} especialidades selecionadas`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span className="truncate">{getSelectedText()}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full bg-white">
        <DropdownMenuLabel>Especialidades</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {emphasisOptions.map(emphasis => (
          <DropdownMenuCheckboxItem
            key={emphasis.id}
            checked={selectedEmphasis.includes(emphasis.id)}
            onSelect={(e) => {
              e.preventDefault();
              handleToggleEmphasis(emphasis.id);
            }}
          >
            <span className="flex items-center">
              {emphasis.label}
            </span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EmphasisSelector;
