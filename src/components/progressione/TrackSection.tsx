
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Track } from '@/data/progressioneChallenges';
import { ProgressioneData } from '@/types/progressione';
import ChallengeItem from './ChallengeItem';

interface TrackSectionProps {
  track: Track;
  data: ProgressioneData;
  isEditing: boolean;
  updateData: (path: string, value: any) => void;
}

const TrackSection: React.FC<TrackSectionProps> = ({
  track,
  data,
  isEditing,
  updateData
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h4 className="font-medium text-gray-900 mb-6">{track.number}ª Traccia</h4>
      
      {/* Direzioni */}
      {Object.entries(track.directions).map(([directionKey, direction]) => (
        <div key={directionKey} className="mb-6">
          <h5 className="font-medium text-gray-800 mb-4 text-blue-600">
            {direction.name}
          </h5>
          
          {/* Sfide per direzione */}
          <div className="space-y-4 ml-4">
            {direction.challenges.map((challenge) => {
              const challengePath = `tracce.${track.number}.sfide.${challenge.id}`;
              const challengeData = data.tracce?.[track.number]?.sfide?.[challenge.id] || { completata: false, data: '' };
              
              return (
                <ChallengeItem
                  key={challenge.id}
                  challenge={challenge}
                  challengeData={challengeData}
                  isEditing={isEditing}
                  onCompletedChange={(completed) => 
                    updateData(`${challengePath}.completata`, completed)
                  }
                  onDateChange={(date) => 
                    updateData(`${challengePath}.data`, date)
                  }
                />
              );
            })}
          </div>
        </div>
      ))}
      
      {/* Note per traccia */}
      <div className="mt-4">
        <Label className="block text-sm font-medium text-gray-700 mb-2">
          Note per la {track.number}ª Traccia
        </Label>
        <Textarea
          value={data.tracce?.[track.number]?.note || ''}
          disabled={!isEditing}
          onChange={(e) => updateData(`tracce.${track.number}.note`, e.target.value)}
          placeholder="Note specifiche per questa traccia..."
          rows={3}
        />
      </div>
    </div>
  );
};

export default TrackSection;
