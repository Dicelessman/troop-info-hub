
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { ProgressioneData } from '@/types/progressione';

interface NoteGeneraliSectionProps {
  data: ProgressioneData;
  isEditing: boolean;
  updateData: (path: string, value: any) => void;
}

const NoteGeneraliSection: React.FC<NoteGeneraliSectionProps> = ({
  data,
  isEditing,
  updateData
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h4 className="font-medium text-gray-900 mb-4">Note Generali</h4>
      <Textarea
        value={data.noteGenerali || ''}
        disabled={!isEditing}
        onChange={(e) => updateData('noteGenerali', e.target.value)}
        placeholder="Note generali sulla progressione..."
        rows={4}
      />
    </div>
  );
};

export default NoteGeneraliSection;
