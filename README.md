
# Scout App - Gestione Reparto

Un'applicazione web responsive per la gestione completa di un Reparto Scout, ottimizzata per smartphone e progettata per funzionare online e offline (modalità lettura).

## 🚀 Funzionalità Principali

### 👥 Gestione Utenti
- **Staff**: Registrazione con approvazione manuale dell'amministratore
- **Esploratori**: Registrazione libera e automatica
- Dashboard per la visualizzazione e gestione di tutti gli utenti
- Controllo ruoli e permessi

### 🔒 Sicurezza
- Autenticazione tramite Firebase Authentication
- Database centralizzato con Firebase Firestore
- Protezione dei percorsi con verifica dei ruoli
- Logout automatico per accessi non validi

### 📋 Scheda Esploratore Completa
- **Dati Anagrafici**: Nome, cognome, data di nascita, codice fiscale, indirizzo, email
- **Contatti**: Informazioni complete per genitori ed esploratore con bottoni per chiamate e WhatsApp
- **Informazioni Sanitarie**: Gruppo sanguigno, intolleranze, allergie, farmaci, certificazioni
- **Progressione Scout**: Promessa, tracce, VCP/CP, Giglio/Trifoglio
- **Specialità**: Gestione completa delle specialità scout
- **Eventi**: Campi estivi, Tecnicamp, Jamboree
- **Presenze e Materiale**: Tracking completo
- **Documenti**: Gestione moduli e quote

### 📱 Design Responsive
- Ottimizzato per smartphone e tablet
- Interfaccia moderna con animazioni fluide
- Colori tematici scout (verde, blu, arancione)
- Navigazione intuitiva e user-friendly

## 🛠️ Tecnologie Utilizzate

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Authentication + Firestore)
- **Hosting**: Ottimizzato per GitHub Pages
- **Icons**: Lucide React (tramite SVG)

## 📁 Struttura del Progetto

```
scout-app/
├── index.html          # Pagina di benvenuto
├── login.html          # Login utente
├── register.html       # Registrazione utente
├── dashboard.html      # Dashboard principale
├── scheda.html         # Scheda dettagliata esploratore
└── README.md          # Documentazione
```

## ⚙️ Setup e Configurazione

### 1. Configurazione Firebase

1. Crea un nuovo progetto su [Firebase Console](https://console.firebase.google.com/)
2. Abilita Authentication (Email/Password)
3. Crea un database Firestore
4. Ottieni le credenziali di configurazione
5. Sostituisci `firebaseConfig` in tutti i file HTML con le tue credenziali:

```javascript
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};
```

### 2. Regole Firestore

Configura le seguenti regole di sicurezza in Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /utenti/{userId} {
      allow read, write: if request.auth != null && (
        request.auth.uid == userId || 
        (resource.data.ruolo == 'staff' && resource.data.approvato == true)
      );
    }
  }
}
```

### 3. Deploy su GitHub Pages

1. Carica tutti i file nel repository GitHub
2. Vai nelle Settings del repository
3. Nella sezione Pages, seleziona "Deploy from a branch"
4. Seleziona il branch principale (main/master)
5. L'app sarà disponibile su `https://username.github.io/repository-name`

## 👥 Ruoli e Permessi

### Staff (Approvato)
- Visualizza tutti gli utenti nella dashboard
- Modifica tutte le schede esploratori
- Approva nuovi membri dello staff
- Accesso completo a tutte le funzionalità

### Staff (Non Approvato)
- Accesso negato fino all'approvazione
- Deve essere approvato da un admin esistente

### Esploratore
- Visualizza solo la propria scheda
- Non può modificare i dati (solo visualizzazione)
- Accesso limitato alla dashboard

## 🔄 Funzionalità Offline

L'app è progettata per funzionare offline in modalità lettura:
- I dati vengono cachati localmente
- Visualizzazione delle schede anche senza connessione
- Sincronizzazione automatica quando si ritorna online

## 📞 Funzionalità di Contatto

- **Bottoni Telefono**: Click per chiamare direttamente
- **Bottoni WhatsApp**: Apertura chat WhatsApp
- **Copia negli Appunti**: Per intolleranze alimentari e altre note importanti

## 🎨 Personalizzazione

### Colori Tema
I colori possono essere personalizzati modificando la configurazione Tailwind:

```javascript
colors: {
    'scout-green': '#2D5016',  // Verde scout principale
    'scout-blue': '#1E40AF',   // Blu per azioni secondarie  
    'scout-orange': '#EA580C'  // Arancione per evidenziare
}
```

### Aggiungere Nuovi Campi
Per aggiungere nuovi campi alla scheda:

1. Modifica la struttura `datiScheda` in `register.html`
2. Aggiungi i campi HTML in `scheda.html`
3. Aggiorna le funzioni di salvataggio e caricamento

## 🚨 Troubleshooting

### Errori Comuni

**Errore di autenticazione**: Verifica le credenziali Firebase
**Permessi negati**: Controlla le regole Firestore
**Dati non salvati**: Verifica la connessione internet
**Layout mobile**: Controlla il viewport meta tag

### Debug

Utilizza la console del browser (F12) per vedere eventuali errori JavaScript e log di debug.

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT. Libero per uso personale e commerciale.

## 🤝 Contributi

I contributi sono benvenuti! Per modifiche importanti:

1. Fork del repository
2. Crea un branch per le tue modifiche
3. Commit delle modifiche
4. Push al branch
5. Apri una Pull Request

## 📧 Supporto

Per supporto e domande, contatta il team di sviluppo o apri una issue su GitHub.

---

**Buona Strada Scout! 🏕️**
