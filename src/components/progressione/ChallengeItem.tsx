
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Challenge } from '@/data/progressioneChallenges';

interface ChallengeItemProps {
  challenge: Challenge;
  challengeData: { completata: boolean; data: string };
  isEditing: boolean;
  onCompletedChange: (completed: boolean) => void;
  onDateChange: (date: string) => void;
}

const ChallengeItem: React.FC<ChallengeItemProps> = ({
  challenge,
  challengeData,
  isEditing,
  onCompletedChange,
  onDateChange
}) => {
  return (
    <div className="border-l-2 border-gray-200 pl-4">
      <div className="flex items-start space-x-3 mb-2">
        <Checkbox
          checked={challengeData.completata || false}
          disabled={!isEditing}
          onCheckedChange={(checked) => onCompletedChange(!!checked)}
          className="mt-1"
        />
        <div className="flex-1">
          <div className="font-medium text-sm text-gray-700 mb-1">
            {challenge.id}
          </div>
          <div className="text-sm text-gray-600 mb-2">
            {challenge.description}
          </div>
          <Input
            type="date"
            value={challengeData.data || ''}
            disabled={!isEditing}
            onChange={(e) => onDateChange(e.target.value)}
            placeholder="Data completamento"
            className="w-40"
          />
        </div>
      </div>
    </div>
  );
};

export default ChallengeItem;
