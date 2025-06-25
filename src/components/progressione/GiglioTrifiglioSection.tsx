
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ProgressioneData } from '@/types/progressione';

interface GiglioTrifiglioSectionProps {
  data: ProgressioneData;
  isEditing: boolean;
  updateData: (path: string, value: any) => void;
}

const GiglioTrifiglioSection: React.FC<GiglioTrifiglioSectionProps> = ({
  data,
  isEditing,
  updateData
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h4 className="font-medium text-gray-900 mb-4">Giglio e Trifoglio</h4>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={data.giglieTrifoglio?.completato || false}
              disabled={!isEditing}
              onCheckedChange={(checked) => 
                updateData('giglieTrifoglio.completato', checked)
              }
            />
            <Label>Completato</Label>
          </div>
          <div className="flex-1">
            <Input
              type="date"
              value={data.giglieTrifoglio?.data || ''}
              disabled={!isEditing}
              onChange={(e) => updateData('giglieTrifoglio.data', e.target.value)}
              placeholder="Data conseguimento"
            />
          </div>
        </div>
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Motivo</Label>
          <Textarea
            value={data.giglieTrifoglio?.motivo || ''}
            disabled={!isEditing}
            onChange={(e) => updateData('giglieTrifoglio.motivo', e.target.value)}
            placeholder="Motivo del riconoscimento..."
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};

export default GiglioTrifiglioSection;
