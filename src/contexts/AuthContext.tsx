
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
      console.log('Auth state changed:', user?.uid);
      if (user) {
        try {
          console.log('Fetching user data for:', user.uid);
          const userDoc = await getDoc(doc(db, 'utenti', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            console.log('User data found:', data);
            setUserData({
              id: user.uid,
              ...data
            } as UserData);
          } else {
            console.log('User document does not exist in Firestore');
            setUserData(null);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUserData(null);
        }
      } else {
        console.log('User logged out');
        setUserData(null);
      }
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    console.log('Attempting login for:', email);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Login successful, checking user data...');
    
    const userDoc = await getDoc(doc(db, 'utenti', user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log('User data found during login:', userData);
      
      if (userData.ruolo === 'staff' && !userData.approvato) {
        console.log('Staff user not approved');
        await signOut(auth);
        throw new Error('Account staff in attesa di approvazione');
      }
    } else {
      console.log('No user document found during login');
      await signOut(auth);
      throw new Error('Dati utente non trovati');
    }
  };

  const register = async (email: string, password: string, nome: string, cognome: string, ruolo: string) => {
    console.log('Starting registration for:', email, 'with role:', ruolo);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User created in Firebase Auth:', user.uid);
      
      const userData = {
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
      };

      console.log('Creating user document in Firestore...');
      await setDoc(doc(db, 'utenti', user.uid), userData);
      console.log('User document created successfully in Firestore');
      
      // Verifica che il documento sia stato creato
      const createdDoc = await getDoc(doc(db, 'utenti', user.uid));
      if (createdDoc.exists()) {
        console.log('Verification: User document exists in Firestore');
      } else {
        console.error('Verification failed: User document not found in Firestore');
        throw new Error('Errore durante la creazione del profilo utente');
      }
      
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  };

  const logout = async () => {
    console.log('Logging out user');
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
