
import React, { useState } from 'react';
import { Trophy, Calendar, CheckSquare } from 'lucide-react';
import { PROGRESSION_TRACKS } from '@/data/progressioneChallenges';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface ProgressioneData {
  promessa?: {
    completata: boolean;
    data: string;
  };
  vcpCp?: {
    tipo: 'VCP' | 'CP' | '';
    data: string;
  };
  tracce?: {
    [key: string]: {
      sfide: {
        [challengeId: string]: {
          completata: boolean;
          data: string;
        };
      };
      note: string;
    };
  };
  giglieTrifoglio?: {
    completato: boolean;
    data: string;
    motivo: string;
  };
  noteGenerali?: string;
}

interface ProgressioneSectionProps {
  data: ProgressioneData;
  isEditing: boolean;
  onSave: (data: ProgressioneData) => void;
}

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
        {/* Promessa */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-4">Promessa</h4>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={localData.promessa?.completata || false}
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
                value={localData.promessa?.data || ''}
                disabled={!isEditing}
                onChange={(e) => updateData('promessa.data', e.target.value)}
                placeholder="Data promessa"
              />
            </div>
          </div>
        </div>

        {/* VCP o CP */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-4">VCP o CP</h4>
          <div className="space-y-4">
            <RadioGroup
              value={localData.vcpCp?.tipo || ''}
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
              value={localData.vcpCp?.data || ''}
              disabled={!isEditing}
              onChange={(e) => updateData('vcpCp.data', e.target.value)}
              placeholder="Data conseguimento"
            />
          </div>
        </div>

        {/* Tracce */}
        {PROGRESSION_TRACKS.map((track) => (
          <div key={track.number} className="border border-gray-200 rounded-lg p-4">
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
                    const challengeData = localData.tracce?.[track.number]?.sfide?.[challenge.id] || { completata: false, data: '' };
                    
                    return (
                      <div key={challenge.id} className="border-l-2 border-gray-200 pl-4">
                        <div className="flex items-start space-x-3 mb-2">
                          <Checkbox
                            checked={challengeData.completata || false}
                            disabled={!isEditing}
                            onCheckedChange={(checked) => 
                              updateData(`${challengePath}.completata`, checked)
                            }
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
                              onChange={(e) => updateData(`${challengePath}.data`, e.target.value)}
                              placeholder="Data completamento"
                              className="w-40"
                            />
                          </div>
                        </div>
                      </div>
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
                value={localData.tracce?.[track.number]?.note || ''}
                disabled={!isEditing}
                onChange={(e) => updateData(`tracce.${track.number}.note`, e.target.value)}
                placeholder="Note specifiche per questa traccia..."
                rows={3}
              />
            </div>
          </div>
        ))}

        {/* Giglio e Trifoglio */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-4">Giglio e Trifoglio</h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={localData.giglieTrifoglio?.completato || false}
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
                  value={localData.giglieTrifoglio?.data || ''}
                  disabled={!isEditing}
                  onChange={(e) => updateData('giglieTrifoglio.data', e.target.value)}
                  placeholder="Data conseguimento"
                />
              </div>
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">Motivo</Label>
              <Textarea
                value={localData.giglieTrifoglio?.motivo || ''}
                disabled={!isEditing}
                onChange={(e) => updateData('giglieTrifoglio.motivo', e.target.value)}
                placeholder="Motivo del riconoscimento..."
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Note Generali */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-4">Note Generali</h4>
          <Textarea
            value={localData.noteGenerali || ''}
            disabled={!isEditing}
            onChange={(e) => updateData('noteGenerali', e.target.value)}
            placeholder="Note generali sulla progressione..."
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressioneSection;
