
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';
import { parseCsv, convertCsvToSkillPath } from '@/utils/csvParser';
import { SkillPath } from '@/types/skill';
import { toast } from 'sonner';

interface CsvUploaderProps {
  onImport: (skillPath: SkillPath) => void;
  onClose?: () => void;
}

const CsvUploader: React.FC<CsvUploaderProps> = ({ onImport, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    setIsLoading(true);
  
    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // Tentar várias codificações diferentes até encontrar uma que funcione bem
      const encodings = ['utf-8', 'windows-1252', 'iso-8859-1', 'latin1'];
      let parsedData;
      let text;
      
      for (const encoding of encodings) {
        try {
          const decoder = new TextDecoder(encoding);
          text = decoder.decode(arrayBuffer);
          
          // Tentar fazer o parse com esta codificação
          const csvData = parseCsv(text);
          
          // Se chegou aqui sem erros e os dados parecem válidos
          if (csvData && csvData.length > 0) {
            parsedData = csvData;
            console.log(`CSV decodificado com sucesso usando codificação: ${encoding}`);
            break;
          }
        } catch (e) {
          console.log(`Falha ao tentar com a codificação ${encoding}:`, e);
          continue;
        }
      }
      
      if (!parsedData || parsedData.length === 0) {
        throw new Error('Não foi possível interpretar o arquivo CSV com nenhuma das codificações tentadas');
      }
  
      const skillPath = convertCsvToSkillPath(parsedData);
      onImport(skillPath);
  
      toast.success('CSV importado com sucesso');
      if (onClose) onClose();
    } catch (error) {
      console.error('CSV import error:', error);
      toast.error('Falha ao processar arquivo CSV. Por favor, verifique o formato e tente novamente.');
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="csv-file">Importar Trilha de Carreira a partir de CSV</Label>
        <div className="flex gap-2">
          <Input
            ref={fileInputRef}
            id="csv-file"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            disabled={isLoading}
            className="flex-1"
          />
        </div>
        <p className="text-sm text-gray-500">
          Faça upload de um arquivo CSV com dados da trilha de carreira. O arquivo deve ter o formato esperado com colunas:
          career, behaviorDifferentiator, baseBehavior, level, track, groupCompetence, groupCompetenceId, groupCompetenceLevelId, id, description, size.
        </p>
      </div>
      
      {isLoading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
        </div>
      )}
      
      <Button
        variant="outline"
        className="w-full bg-white text-black border-black hover:bg-gray-100"
        onClick={() => fileInputRef.current?.click()}
        disabled={isLoading}
      >
        <Upload className="w-4 h-4 mr-2" />
        Selecionar Arquivo CSV
      </Button>
    </div>
  );
};

export default CsvUploader;
