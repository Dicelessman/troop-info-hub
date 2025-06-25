
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ProgressioneData } from '@/types/progressione';

interface PromessaSectionProps {
  data: ProgressioneData;
  isEditing: boolean;
  updateData: (path: string, value: any) => void;
}

const PromessaSection: React.FC<PromessaSectionProps> = ({
  data,
  isEditing,
  updateData
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h4 className="font-medium text-gray-900 mb-4">Promessa</h4>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={data.promessa?.completata || false}
            disabled={!isEditing}
            onCheckedChange={(checked) => 
              updateData('promessa.completata', checked)
            }
          />
          <Label>Completata</Label>
        </div>
        <div className="flex-1">
          <Input
            type="date"
            value={data.promessa?.data || ''}
            disabled={!isEditing}
            onChange={(e) => updateData('promessa.data', e.target.value)}
            placeholder="Data promessa"
          />
        </div>
      </div>
    </div>
  );
};

export default PromessaSection;
