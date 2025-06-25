
# Configurazione Firebase Security Rules

## IMPORTANTE: Devi configurare queste regole nella Console Firebase

### Come accedere:
1. Vai su https://console.firebase.google.com/
2. Seleziona il progetto "appreparto-ce9f3"
3. Nel menu laterale, clicca su "Firestore Database"
4. Clicca sulla tab "Regole" (Rules)

### Regole da inserire:
Sostituisci completamente il contenuto esistente con queste regole:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Regola principale per i documenti utente
    match /utenti/{userId} {
      // Permetti accesso se:
      // 1. L'utente sta accedendo al proprio documento
      // 2. L'utente è uno staff approvato
      allow read, write: if request.auth != null && (
        request.auth.uid == userId || 
        isApprovedStaff()
      );
    }
    
    // Funzione helper per verificare se l'utente è staff approvato
    function isApprovedStaff() {
      return request.auth != null &&
        exists(/databases/$(database)/documents/utenti/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/utenti/$(request.auth.uid)).data.ruolo == 'staff' &&
        get(/databases/$(database)/documents/utenti/$(request.auth.uid)).data.approvato == true;
    }
  }
}
```

### Dopo aver salvato le regole:
1. Clicca su "Pubblica" per attivare le nuove regole
2. Attendi qualche secondo per la propagazione
3. Ricarica la pagina dell'applicazione
4. La sezione "Progressione Personale" dovrebbe ora essere visibile

### Verifica che funzioni:
- Accedi come utente esploratore: dovresti vedere la tua progressione
- Accedi come staff approvato: dovresti vedere tutti i profili
- La console non dovrebbe più mostrare errori di permission-denied

## Troubleshooting
Se continui ad avere problemi:
1. Verifica che le regole siano pubblicate correttamente
2. Controlla che l'utente sia effettivamente autenticato
3. Verifica i dati dell'utente nel database (ruolo e approvato)
4. Controlla la console del browser per eventuali altri errori
