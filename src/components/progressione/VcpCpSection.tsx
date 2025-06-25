
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ProgressioneData } from '@/types/progressione';

interface VcpCpSectionProps {
  data: ProgressioneData;
  isEditing: boolean;
  updateData: (path: string, value: any) => void;
}

const VcpCpSection: React.FC<VcpCpSectionProps> = ({
  data,
  isEditing,
  updateData
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h4 className="font-medium text-gray-900 mb-4">VCP o CP</h4>
      <div className="space-y-4">
        <RadioGroup
          value={data.vcpCp?.tipo || ''}
          disabled={!isEditing}
          onValueChange={(value) => updateData('vcpCp.tipo', value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="VCP" id="vcp" />
            <Label htmlFor="vcp">VCP</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="CP" id="cp" />
            <Label htmlFor="cp">CP</Label>
          </div>
        </RadioGroup>
        <Input
          type="date"
          value={data.vcpCp?.data || ''}
          disabled={!isEditing}
          onChange={(e) => updateData('vcpCp.data', e.target.value)}
          placeholder="Data conseguimento"
        />
      </div>
    </div>
  );
};

export default VcpCpSection;
