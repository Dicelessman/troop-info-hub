
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface UserData {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  ruolo: 'staff' | 'esploratore';
  approvato: boolean;
  datiScheda?: any;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, nome: string, cognome: string, ruolo: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'utenti', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData({
              id: user.uid,
              ...data
            } as UserData);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUserData(null);
      }
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    const userDoc = await getDoc(doc(db, 'utenti', user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      
      if (userData.ruolo === 'staff' && !userData.approvato) {
        await signOut(auth);
        throw new Error('Account staff in attesa di approvazione');
      }
    } else {
      await signOut(auth);
      throw new Error('Dati utente non trovati');
    }
  };

  const register = async (email: string, password: string, nome: string, cognome: string, ruolo: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    await setDoc(doc(db, 'utenti', user.uid), {
      nome,
      cognome,
      email,
      ruolo,
      staff: ruolo === 'staff',
      approvato: ruolo === 'esploratore',
      dataRegistrazione: new Date(),
      datiScheda: {
        contatti: {
          genitore1: { nome: '', email: '', telefono: '' },
          genitore2: { nome: '', email: '', telefono: '' },
          esploratore: { email: email, telefono: '' }
        },
        sanitarie: {
          gruppoSanguigno: '',
          intolleranze: '',
          certificazioni: '',
          vaccinazioni: '',
          allergie: '',
          farmaci: '',
          note: ''
        },
        progressione: {
          promessa: { data: '' },
          primaTraccia: { data: '', sfida: '' },
          secondaTraccia: { data: '', sfida: '' },
          terzaTraccia: { data: '', sfida: '' },
          vcp: { completato: false, data: '' },
          cp: { completato: false, data: '' },
          giglio: { data: '', motivo: '' },
          trifoglio: { data: '', motivo: '' },
          note: ''
        },
        specialita: [],
        eventi: {
          campiEstivi: [],
          tecnicamp: [],
          jamboree: [],
          altro: []
        },
        presenze: {
          sondaggi: [],
          presenzeAssenze: [],
          quoteEvento: []
        },
        documenti: {
          quotaAnnuale: false,
          moduloIscrizione: false,
          moduloSanitario: false,
          moduloPrivacy: false,
          note: ''
        }
      }
    });
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = {
    user,
    userData,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
