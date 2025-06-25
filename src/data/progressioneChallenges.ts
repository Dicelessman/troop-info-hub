
export interface Challenge {
  id: string;
  description: string;
}

export interface Direction {
  name: string;
  challenges: Challenge[];
}

export interface Track {
  number: number;
  directions: {
    io: Direction;
    re: Direction;
    im: Direction;
  };
}

export const PROGRESSION_TRACKS: Track[] = [
  {
    number: 1,
    directions: {
      io: {
        name: "Io",
        challenges: [
          {
            id: "IO-1.1",
            description: "Conosco il mio corpo: Scelgo un'attività fisica che non pratico già e mi impegno per tre mesi a svolgerla in autonomia (...) e sulla base di questa propongo un'attività di esercizi per un'uscita di Reparto."
          },
          {
            id: "IO-1.2",
            description: "Sono consapevole delle azioni e dei comportamenti che metto in atto: Per tre mesi mi impegno a tenere traccia dei momenti significativi delle mie giornate che associo ai valori di Legge e Promessa, condividendoli in Ptg/Eqp."
          },
          {
            id: "IO-1.3",
            description: "Riconosco le emozioni: Supporto il CP/CE o una Terza Traccia nell'organizzazione di due momenti di verifica di Ptg/Eqp. Mi impegno a esprimere le mie opinioni nei momenti di verifica di Reparto."
          },
          {
            id: "IO-1.4",
            description: "Esprimo liberamente la mia creatività: Trovo, o costruisco, un oggetto insolito ma utile al mio equipaggiamento per la vita di Reparto, hike o campi, e dopo averlo testato più volte lo presento e ne spiego il funzionamento in un momento di Reparto."
          }
        ]
      },
      re: {
        name: "Le mie relazioni",
        challenges: [
          {
            id: "RE-1.1",
            description: "Riconosco il valore delle regole: Scelgo 3 articoli della Legge Scout e, durante una riunione di Reparto, porto per ognuno un esempio della vita di tutti i giorni in cui viene rispettato e uno in cui no."
          },
          {
            id: "RE-1.2",
            description: "Comunico il mio punto di vista: Mi occupo insieme alla mia Ptg/Eqp di organizzare un momento di animazione per il Reparto, collaborando attivamente con tutti, e lo uso come spunto per migliorare la proposta di una seconda attività."
          },
          {
            id: "RE-1.3",
            description: "Partecipo attivamente alla vita del gruppo: Sperimento almeno 3 Posti d'Azione e 2 Incarichi diversi, seguendo l'esempio di chi li ha tenuti prima di me."
          },
          {
            id: "RE-1.4",
            description: "Riconosco l'unicita e la peculiarità degli altri: Per tre mesi mi occupo di raccontare le personalità dei membri della mia Ptg/Eqp attraverso racconti/immagini/video (...)."
          }
        ]
      },
      im: {
        name: "Il mio impatto",
        challenges: [
          {
            id: "IM-1.1",
            description: "Identifico dei progetti personali che voglio portare avanti: Propongo un gioco nuovo al mio Reparto o Ptg/Eqp, spiegando il regolamento ed aiutando i capi nel gestirlo."
          },
          {
            id: "IM-1.2",
            description: "Scopro quali sono le mie competenze: Conquisto almeno 3 specialità di mio interesse. (Nota: Le specialità fanno parte della Progressione Orizzontale, come discusso in precedenza e mostrato in-, ma la loro conquista è un'attività specifica della Traccia 1)."
          },
          {
            id: "IM-1.3",
            description: "Osservo criticamente il contesto in cui opero: In Ptg/Eqp propongo, disegno e realizzo (in collaborazione con gli altri, se ho bisogno) almeno due migliorie utili alla vita di Ptg/Eqp/ al campo/ all'angolo in sede."
          },
          {
            id: "IM-1.4",
            description: "Mi approccio con curiosità alle novità: Dopo aver vissuto un'esperienza scout con o senza il mio Rep/Ptg/Eqp, documento e racconto come l'ho vissuta."
          }
        ]
      }
    }
  },
  {
    number: 2,
    directions: {
      io: {
        name: "Io",
        challenges: [
          {
            id: "IO-2.1",
            description: "Esploro i limiti del mio corpo confrontandomi con me stesso e con gli altri: Collaboro (con un capo/senior) nell'ideare un menù bilanciato e salutare per due uscite/campi di Reparto, ampliando poi il ricettario della mia Ptg/Eqp."
          },
          {
            id: "IO-2.2",
            description: "Identifico le motivazioni dietro le mie azioni: Contribuisco all'organizzazione di un'attività del percorso Promessa o CdL ideata dallo Staff, portando un contributo basato sulle esperienze che mi toccano da vicino o ho letto/visto."
          },
          {
            id: "IO-2.3",
            description: "Esploro con curiosità le esperienze che vivo: Partecipo ad un evento al di fuori del Reparto (...) e al mio ritorno porto al Reparto il racconto dell'esperienza (...) evidenziando \"Lo consiglierei ad altri Esplo? perchè?\"."
          },
          {
            id: "IO-2.4",
            description: "Sono aperto a mettere in discussione le mie idee ed opinioni: Propongo per una riunione di Ptg/Eqp un'esperienza che riguardi un tema per me importante (...), al termine del quale aiuto a condurre un confronto su come io e gli altri lo abbiamo vissuto."
          }
        ]
      },
      re: {
        name: "Le mie relazioni",
        challenges: [
          {
            id: "RE-2.1",
            description: "Mi chiedo il perché delle regole: Aiuto nel definire e far rispettare un patto scritto di regole interno alla Ptg/Eqp o Reparto per almeno un evento (...)."
          },
          {
            id: "RE-2.2",
            description: "Utilizzo con consapevolezza le varie modalità di comunicazione: Partecipo attivamente alla progettazione e realizzazione dell'animazione di un fuoco di bivacco, prima di Ptg/Eqp e poi di Reparto/Gruppo, curandone tema e messaggi."
          },
          {
            id: "RE-2.3",
            description: "Vivo serenamente il confronto con l'altro: Propongo un'uscita di Ptg/Eqp di conoscenza fuori dal Reparto (...) e collaboro attivamente alla sua riuscita."
          },
          {
            id: "RE-2.4",
            description: "Conosco e rispetto i bisogni e le necessità di chi mi sta intorno: Mi impegno a conquistare due specialità di Impegno Civile facendo squadra ogni volta con un altro/a Esplo con cui ho legato meno del Reparto."
          }
        ]
      },
      im: {
        name: "Il mio impatto",
        challenges: [
          {
            id: "IM-2.1",
            description: "Contribuisco attivamente ai progetti di gruppo: Porto una mia idea motivata in consiglio di Ptg/Eqp per un progetto o attività da fare insieme e contribuisco alla sua realizzazione (...)."
          },
          {
            id: "IM-2.2",
            description: "Sono parte attiva nel gruppo: Organizzo un momento per gli altri, da solo o con l'aiuto della Ptg/Eqp, in cui porto e condivido le mie competenze in un ambito che mi piace (...)."
          },
          {
            id: "IM-2.3",
            description: "Partecipo alle decisioni strategiche del gruppo: Contribuisco a identificare aspetti da poter migliorare nella vita di Ptg/Eqp durante almeno due CdP e mi propongo nei ruoli che li risolvano, verificando poi com'è andata."
          },
          {
            id: "IM-2.4",
            description: "Confronto più punti di vista per strutturare la mia opinione: Svolgo una ricerca utile alla mia Ptg/Eqp oppure Reparto organizzando e conducendo diverse interviste (...) mettendo insieme il risultato per presentarlo in una riunione."
          }
        ]
      }
    }
  },
  {
    number: 3,
    directions: {
      io: {
        name: "Io",
        challenges: [
          {
            id: "IO-3.1",
            description: "Affronto le sfide che incontro con serenità: Partecipo ad un'occasione al di fuori del Reparto (...), riportando qualcosa della mia esperienza con un'attività in Ptg/Eqp/Reparto."
          },
          {
            id: "IO-3.2",
            description: "Sono coerente e d'esempio in tutti gli ambienti in cui vivo: Faccio da tutor ad un nuovo/a Esplo della mia Ptg/Eqp per 6 mesi nella conquista della specialità e/o nell'affrontare le sue sfide per il raggiungimento della Traccia."
          },
          {
            id: "IO-3.3",
            description: "Riconosco l'importanza del mio benessere: Preparo un momento a tema benessere e dipendenze da poter inserire in un'attività di CdR/Alta Pattuglia/gruppo delle III tracce, confrontandomi con lo staff e portando il mio punto di vista ed esperienza."
          },
          {
            id: "IO-3.4",
            description: "Interagisco con gli altri per risolvere le sfide comuni: Organizzo almeno tre momenti di verifica con la mia Ptg/Eqp riportando o facendo riportare sul verbale le soluzioni alternative ai problemi che abbiamo identificato, riferendo poi tutto al CR."
          }
        ]
      },
      re: {
        name: "Le mie relazioni",
        challenges: [
          {
            id: "RE-3.1",
            description: "Sono d'esempio e promuovo occasioni di coinvolgimento nel gruppo: Organizzo e conduco 2 momenti o attività di confronto e discussione di cui uno di Ptg/Eqp e dopo uno con tutto il Reparto."
          },
          {
            id: "RE-3.2",
            description: "Trasmetto e riconosco le mie emozioni: Con l'aiuto dello staff, organizzo e poi gestisco un'attività sulla sessualità ed affettività da proporre durante un'uscita in Reparto."
          },
          {
            id: "RE-3.3",
            description: "Creo un ambiente sicuro, accogliente e pacifico per tutti: Coordino gli altri CP/VCP per organizzare e gestire, con l'aiuto dello Staff, un'attività di accoglienza o conoscenza (...)."
          },
          {
            id: "RE-3.4",
            description: "Valorizzo le idee e le caratteristiche dei miei compagni: Per tre mesi mi occupo di raccontare le esperienze vissute in Ptg/Eqp/Reparto (...), ricordando le gesta e caratteristiche dei miei compagni."
          }
        ]
      },
      im: {
        name: "Il mio impatto",
        challenges: [
          {
            id: "IM-3.1",
            description: "Coordino i progetti di gruppo, valorizzando i miei collaboratori: Propongo e guido la mia Ptg/Eqp nella conquista di una specialità di Ptg/Eqp."
          },
          {
            id: "IM-3.2",
            description: "Condivido competenze ed esperienze con il resto del gruppo: Organizzo un momento di trapasso nozioni in Ptg/Eqp/Reparto su un aspetto specifico o innovativo per una tecnica (anche non scout) in cui sono competente."
          },
          {
            id: "IM-3.3",
            description: "Porto avanti le mie idee democraticamente e nel rispetto dell'opinione altrui: Propongo, progetto e conduco un confronto o dibattito in cui coinvolgo Ptg/Eqp/III tracce/CdR/Alta ptg, su un tema a me caro."
          },
          {
            id: "IM-3.4",
            description: "Immagino, pianifico e realizzo i miei obiettivi e quelli del gruppo: Pianifico e gestisco la partecipazione di Ptg/Eqp/CdR/Alta ptg ad un evento legato ad un tema che a me interessa, proponendoci per svolgere per l'occasione un servizio."
          }
        ]
      }
    }
  }
];
