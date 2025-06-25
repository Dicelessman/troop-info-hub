
import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import { PROGRESSION_TRACKS } from '@/data/progressioneChallenges';
import { ProgressioneData, ProgressioneSectionProps } from '@/types/progressione';
import PromessaSection from './progressione/PromessaSection';
import VcpCpSection from './progressione/VcpCpSection';
import TrackSection from './progressione/TrackSection';
import GiglioTrifiglioSection from './progressione/GiglioTrifiglioSection';
import NoteGeneraliSection from './progressione/NoteGeneraliSection';

const ProgressioneSection: React.FC<ProgressioneSectionProps> = ({
  data,
  isEditing,
  onSave
}) => {
  const [localData, setLocalData] = useState<ProgressioneData>(data || {});

  const updateData = (path: string, value: any) => {
    const newData = { ...localData };
    const pathParts = path.split('.');
    let current: any = newData;
    
    for (let i = 0; i < pathParts.length - 1; i++) {
      if (!current[pathParts[i]]) {
        current[pathParts[i]] = {};
      }
      current = current[pathParts[i]];
    }
    
    current[pathParts[pathParts.length - 1]] = value;
    setLocalData(newData);
  };

  const handleSave = () => {
    onSave(localData);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
          <h3 className="text-lg font-semibold">Progressione Personale</h3>
        </div>
        {isEditing && (
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Salva Progressione
          </button>
        )}
      </div>

      <div className="space-y-8">
        <PromessaSection
          data={localData}
          isEditing={isEditing}
          updateData={updateData}
        />

        <VcpCpSection
          data={localData}
          isEditing={isEditing}
          updateData={updateData}
        />

        {PROGRESSION_TRACKS.map((track) => (
          <TrackSection
            key={track.number}
            track={track}
            data={localData}
            isEditing={isEditing}
            updateData={updateData}
          />
        ))}

        <GiglioTrifiglioSection
          data={localData}
          isEditing={isEditing}
          updateData={updateData}
        />

        <NoteGeneraliSection
          data={localData}
          isEditing={isEditing}
          updateData={updateData}
        />
      </div>
    </div>
  );
};

export default ProgressioneSection;
