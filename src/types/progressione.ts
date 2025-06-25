
export interface ProgressioneData {
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

export interface ProgressioneSectionProps {
  data: ProgressioneData;
  isEditing: boolean;
  onSave: (data: ProgressioneData) => void;
}
