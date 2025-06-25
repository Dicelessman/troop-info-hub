import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ArrowLeft, User, Heart, Trophy, Calendar, CheckSquare, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProfileData {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  ruolo: string;
  datiScheda: {
    contatti: any;
    sanitarie: any;
    progressione: any;
    specialita: any[];
    eventi: any;
    presenze: any;
    documenti: any;
  };
}

const ProfilePage: React.FC = () => {
  const { userData } = useAuth();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const targetUserId = userId || userData?.id;
  const canEdit = userData?.ruolo === 'staff' && userData?.approvato;
  const isOwnProfile = !userId || userId === userData?.id;

  console.log('ProfilePage debug:', {
    userDataRole: userData?.ruolo,
    userDataApprovato: userData?.approvato,
    canEdit,
    targetUserId,
    isOwnProfile
  });

  useEffect(() => {
    if (targetUserId) {
      loadProfile();
    }
  }, [targetUserId]);

  const loadProfile = async () => {
    try {
      if (!targetUserId) return;
      
      const userDoc = await getDoc(doc(db, 'utenti', targetUserId));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setProfileData({
          id: targetUserId,
          nome: data.nome || '',
          cognome: data.cognome || '',
          email: data.email || '',
          ruolo: data.ruolo || '',
          datiScheda: data.datiScheda || {}
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        title: "Errore",
        description: "Errore nel caricamento del profilo",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (sectionData: any, section: string) => {
    try {
      if (!targetUserId) return;
      
      console.log('Attempting to save:', { targetUserId, section, sectionData });
      console.log('Current user permissions:', { 
        userRole: userData?.ruolo, 
        userApproved: userData?.approvato,
        canEdit 
      });
      
      await updateDoc(doc(db, 'utenti', targetUserId), {
        [`datiScheda.${section}`]: sectionData
      });
      
      console.log('Save successful');
      
      toast({
        title: "Successo",
        description: "Dati salvati con successo",
      });
      
      await loadProfile();
    } catch (error) {
      console.error('Error saving data:', error);
      console.error('Error details:', {
        code: (error as any)?.code,
        message: (error as any)?.message
      });
      
      toast({
        title: "Errore",
        description: `Errore nel salvataggio dei dati: ${(error as any)?.message || 'Errore sconosciuto'}`,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 flex items-center space-x-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="text-lg font-medium">Caricamento...</span>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Profilo non trovato</h2>
          <button
            onClick={() => navigate(-1)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Torna indietro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center">
                <div className="bg-green-800 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {profileData.nome} {profileData.cognome}
                  </h1>
                  <p className="text-sm text-gray-600 capitalize">{profileData.ruolo}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {canEdit && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isEditing 
                      ? 'bg-gray-500 text-white hover:bg-gray-600' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isEditing ? 'Annulla' : 'Modifica'}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="contatti" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="contatti">Contatti</TabsTrigger>
            <TabsTrigger value="sanitarie">Sanitarie</TabsTrigger>
            <TabsTrigger value="progressione">Progressione</TabsTrigger>
            <TabsTrigger value="specialita">Specialità</TabsTrigger>
            <TabsTrigger value="eventi">Eventi</TabsTrigger>
            <TabsTrigger value="documenti">Documenti</TabsTrigger>
          </TabsList>

          <TabsContent value="contatti" className="mt-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <User className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold">Informazioni di Contatto</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Genitore 1</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                      <input
                        type="text"
                        value={profileData.datiScheda.contatti?.genitore1?.nome || ''}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={profileData.datiScheda.contatti?.genitore1?.email || ''}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
                      <input
                        type="tel"
                        value={profileData.datiScheda.contatti?.genitore1?.telefono || ''}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Genitore 2</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                      <input
                        type="text"
                        value={profileData.datiScheda.contatti?.genitore2?.nome || ''}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={profileData.datiScheda.contatti?.genitore2?.email || ''}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
                      <input
                        type="tel"
                        value={profileData.datiScheda.contatti?.genitore2?.telefono || ''}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-4">Esploratore</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
                    <input
                      type="tel"
                      value={profileData.datiScheda.contatti?.esploratore?.telefono || ''}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sanitarie" className="mt-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <Heart className="w-5 h-5 text-red-500 mr-2" />
                <h3 className="text-lg font-semibold">Informazioni Sanitarie</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gruppo Sanguigno</label>
                  <input
                    type="text"
                    value={profileData.datiScheda.sanitarie?.gruppoSanguigno || ''}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Allergie</label>
                  <input
                    type="text"
                    value={profileData.datiScheda.sanitarie?.allergie || ''}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Intolleranze</label>
                  <input
                    type="text"
                    value={profileData.datiScheda.sanitarie?.intolleranze || ''}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Farmaci</label>
                  <input
                    type="text"
                    value={profileData.datiScheda.sanitarie?.farmaci || ''}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vaccinazioni</label>
                  <textarea
                    value={profileData.datiScheda.sanitarie?.vaccinazioni || ''}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Note Mediche</label>
                  <textarea
                    value={profileData.datiScheda.sanitarie?.note || ''}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="progressione" className="mt-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                <h3 className="text-lg font-semibold">Progressione Personale</h3>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data Promessa</label>
                    <input
                      type="date"
                      value={profileData.datiScheda.progressione?.promessa?.data || ''}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">VCP Completato</label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={profileData.datiScheda.progressione?.vcp?.completato || false}
                        disabled={!isEditing}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded disabled:opacity-50"
                      />
                      <span className="ml-2 text-sm text-gray-700">Completato</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Tracce di Competenza</h4>
                  <div className="space-y-4">
                    {['primaTraccia', 'secondaTraccia', 'terzaTraccia'].map((traccia, index) => (
                      <div key={traccia} className="border border-gray-200 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-2">{`${index + 1}ª Traccia`}</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                            <input
                              type="date"
                              value={profileData.datiScheda.progressione?.[traccia]?.data || ''}
                              disabled={!isEditing}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sfida</label>
                            <input
                              type="text"
                              value={profileData.datiScheda.progressione?.[traccia]?.sfida || ''}
                              disabled={!isEditing}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="specialita" className="mt-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <Trophy className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-semibold">Specialità</h3>
              </div>
              
              <div className="text-center py-8 text-gray-500">
                <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Nessuna specialità registrata</p>
                {isEditing && (
                  <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Aggiungi Specialità
                  </button>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="eventi" className="mt-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <Calendar className="w-5 h-5 text-purple-500 mr-2" />
                <h3 className="text-lg font-semibold">Eventi e Attività</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Campi Estivi</h4>
                  <div className="text-center py-4 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                    <p>Nessun campo registrato</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Tecnicamp</h4>
                  <div className="text-center py-4 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                    <p>Nessun tecnicamp registrato</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Jamboree</h4>
                  <div className="text-center py-4 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                    <p>Nessun jamboree registrato</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Altri Eventi</h4>
                  <div className="text-center py-4 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                    <p>Nessun evento registrato</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documenti" className="mt-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <FileText className="w-5 h-5 text-green-500 mr-2" />
                <h3 className="text-lg font-semibold">Documenti</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { key: 'quotaAnnuale', label: 'Quota Annuale' },
                  { key: 'moduloIscrizione', label: 'Modulo Iscrizione' },
                  { key: 'moduloSanitario', label: 'Modulo Sanitario' },
                  { key: 'moduloPrivacy', label: 'Modulo Privacy' }
                ].map((doc) => (
                  <div key={doc.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <span className="font-medium text-gray-900">{doc.label}</span>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={profileData.datiScheda.documenti?.[doc.key] || false}
                        disabled={!isEditing}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded disabled:opacity-50"
                      />
                      <span className={`ml-2 text-sm font-medium ${
                        profileData.datiScheda.documenti?.[doc.key] ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {profileData.datiScheda.documenti?.[doc.key] ? 'Presente' : 'Mancante'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                <textarea
                  value={profileData.datiScheda.documenti?.note || ''}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                  placeholder="Note sui documenti..."
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ProfilePage;
