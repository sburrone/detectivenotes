import { versionNumber } from './strings-en.js'

export const boardsIT = [
    {
        id: 0,
        name: "Classico",
        minPlayers: 3,
        //maxPlayers: 6 sempre
        characters: ["Professor Plum", "Signora Pavone", "Signor Verde", "Colonel Mustard", "Signora Bianchi"],
        weapons: ["Candeliere", "Pugnale", "Tubo di piombo", "Pistola", "Corda", "Chiave inglese"],
        rooms: ["Cucina", "Sala da ballo", "Veranda", "Sala da pranzo", "Sala da biliardo", "Biblioteca", "Salotto", "Ingresso", "Studio"]
    },
    {
        id: 1,
        name: "Meereen",
        minPlayers: 2,
        //maxPlayers: 6 sempre
        characters: ["Daenerys", "Daario", "Missandei", "Grey Worm", "Loraq", "Jorah"],
        weapons: ["Fiala di veleno", "Ascia da guerra", "Arokh", "Uomo senza volto", "Balestra", "Daga dell'Assassino"],
        rooms: ["Bordello", "Piramide", "Quartiere degli schiavi", "Tempio delle grazie", "Catacombe del drago", "Tunnel", "Gran Bazaar", "Porte della città", "Fossa di Daznak"]
    },
    {
        id: 2,
        name: "La Fortezza Rossa",
        minPlayers: 2,
        //maxPlayers: 6 sempre
        characters: ["Cersei", "Tyrion", "Jaime", "Margaery", "Petyr", "Sansa"],
        weapons: ["Fiala di veleno", "Ascia da guerra", "Arokh", "Uomo senza volto", "Balestra", "Daga dell'Assassino"],
        rooms: ["Sala del Concilio Ristretto", "Laboratorio di Qyburn", "Torre del Primo Cavaliere", "Stanze della Guardia Reale", "Celle della prigione", "Giardini", "Chiostro", "Stanze di Re Tommen", "Laboratorio del Gran Maestro Pycelle", "Stanze di Cersei", "Cortile di allenamento"]
    },
    {
        id: 3,
        name: "Zelda",
        minPlayers: 2,
        //maxPlayers: 6 sempre
        characters: ["Nabooru", "Darunia", "Zelda", "Link", "Rauru", "Impa"],
        weapons: ["Master Sword", "Fairy Bow", "Megaton Hammer", "Boomerang", "Hookshot", "Bombuchu"],
        rooms: ["Death Mountain", "Kakariko Village", "Lake Hylia", "Lost Woods", "Zora's Domain", "Gerudo Valley", "Kokiri Forest", "Gerudo Fortress", "Sacred Forest Meadow"]
    },
    {
        id: 4,
        name: "Star Wars",
        minPlayers: 2,
        //maxPlayers: 6 sempre
        characters: ["Alderaan", "Bespin", "Dagobah", "Endor", "Tatooine", "Yavin 4"],
        weapons: ["X-Wing", "Y-Wing", "TIE Fighter", "TIE Bomber", "Millenium Falcon", "Escape Pod"],
        rooms: ["War Room", "Throne Room", "Trash Compactor", "Laser Control Room", "Docking Bay", "Red Control Room", "Overbridge", "Detention Block", "Tractor Beam Generator"]
    },
    {
        id: 5,
        name: "Harry Potter",
        minPlayers: 3,
        //maxPlayers: 6 sempre
        characters: ["Draco Malfoy", "Fenrir Greyback", "Lucius Malfoy", "Ghermidore", "Peter Minus", "Bellatrix Lastrange"],
        weapons: ["Scopa Maledetta", "Collana Maledetta", "Pozione d'Amore", "Idromele Avvelenato", "Incendio", "Stupeficium"],
        rooms: ["Villa Malfoy", "Testa di Porco", "Stamberga Strillante", "Castello di Hogwarts", "Foresta Proibita", "Gringot", "Negozio Tiri Vispi dei Weasley", "Ministero della Magia", "12 Grimmauld Place"]
    },
];


export const idStringsIT = {
    mainTitle: "detective<br>notes",
    beginButton: "Inizia",
    beginButtonSubtitle: "La partita salvata verrà eliminata",
    continueButton: "Continua",
    genericYes: "Sì",
    genericNo: "No",
    newGame: "Nuova partita",
    boardQuestion: "Quale tavolo stai usando?",
    playerNumQuestion: "In quanti giocano?",
    playerNameQuestion: "Come si chiamano?",
    playerNumTooltip: "3",
    playerNameTooltip: "Cerca di usare nomi corti, e scrivili in ordine.",
    readyText: "Prontə?",
    startGame: "Inizia partita",
    instructionsModalText1: "All'inizio della partita ti verranno date delle carte.",
    instructionsModalText2: "Spunta la casella di fianco a queste carte per bloccarle.",
    instructionsModalText3: "Dopo averle bloccate tutte, tocca il lucchetto nella barra degli strumenti.",
    instructionsModalText4: "La partita viene salvata automaticamente.",
    instructionsModalText6: "Sul tavolo di Harry Potter, tieni traccia delle tue polveri con questo pulsante. Toccalo per aumentare e diminuire le tue polveri.",
    //autocompleteStatusContainer: "Autocompletamento ",
    //autocompleteStatus: "ON",
    tableHeaderPlayers: "Giocatori",
    tableHeaderCharacters: "Sospettati",
    tableHeaderWeapons: "Armi",
    tableHeaderRooms: "Stanze",
    showLessSymbolsText: "Mostra meno",
    resetText: "Reset",
    checkFullText: "Sì",
    checkMaybeText: "Forse",
    crossFullText: "No",
    crossMaybeText: "Forse no",
    starText: "Stella",
    questionText: "Domanda",
    exclamationText: "Attento",
    flagText: "Segnaposto",
    skipText: "Salta",
    dustCounter: "Contatore polveri",
    playerOrderModalLink: "Quale ordine?",
    orderModalText: "Il gioco si muove in senso orario.<br>Scrivi i nomi dei giocatori in senso orario, partendo da chi si siede alla tua sinistra.",
    creditsModalText: "Detective Notes<br>Versione " + versionNumber + "<br>fatto con 🩷 da Nicholas<br><br>Questo progetto utilizza il modello <a href=\"https://sketchfab.com/3d-models/clue-board-game-843af04381cc495ca5f0a4bebadb1752\" target=\"_blank\">\"Clue (Board Game)\"</a> di <a href=\"https://sketchfab.com/paulyanez\" target=\"_blank\">Anthony Yanez</a>, utilizzato sotto licenza <a href=\"http://creativecommons.org/licenses/by/4.0/\" target=\"_blank\">CC-BY-4.0</a>.",
    advancedSettingsTitle: "Impostazioni",
    longNamesCompatibilityModeLabel: "Modalità di compatibilità per nomi lunghi",
    longNamesCompatibilityModeText: "Attivalo per mostrare i nomi dei giocatori in verticale, evitando di stringere troppo la tabella. (Consigliato)<br>Disattivalo per mostrare i nomi normalmente.",
    hideDustCounterLabel: "Nascondi contatore polveri",
    hideDustCounterText: "Nascondi il contatore delle polveri per il tavolo di Harry Potter",
    hideDustCounterDisabled: "Questa opzione è disponibile solo per il tavolo di Harry Potter",
    instructionsModalTitle: "Istruzioni",
    skipLoading: "Salta",
    alternateInGameToolbarLabel: "Barra degli strumenti in basso",
    alternateInGameToolbarText: "Sposta la barra degli strumenti in fondo allo schermo.",
    customizeBoardButtonText: "Tavolo personalizzato",
    saveBoardButton: "Salva tavolo",
    customBoardHeaderName: "Nome tavolo",
    customBoardHeaderCharacters: "Sospetti",
    customBoardHeaderWeapons: "Armi",
    customBoardHeaderRooms: "Stanze",
    importBoardButton: "Importa tavoli",
    exportAllBoardsButton: "Esporta tavoli",
    customBoardQuestion: "Quale tavolo personalizzato stai usando?",
    customBoardSavedQuestion: "Oppure usa uno dei tavoli salvati",
    newBoardButton: "Nuovo tavolo",
    importBoardTitle: "Importa tavoli",
    chooseBoardsToImportTitle: "Scegli i tavoli da importare",
    fileValidationFailed: "Il file che hai scelto non è valido. Riprova.",
    finalizeImportButton: "Importa selezionati",
    fileInputButton: "Scegli il file",
    assistantModalTitle: "Assistente",
    assistantWhoAskedQuestion: "Chi ha fatto la domanda?",
    assistantWhatAskedQuestion: "Qual era la sua ipotesi?",
    assistantWhoAnsweredQuestion: "Chi ha mostrato una carta?",
    assistantConfirmButton: "Conferma",
    assistantWhichCharacterLabel: "Sospettato",
    assistantWhichWeaponLabel: "Arma",
    assistantWhichRoomLabel: "Stanza",
    assistantConfirmError: "Il giocatore che ha fatto la domanda non può essere lo stesso che ha mostrato la carta.",
    forceAssistantUpdateLabel: "Forza aggiornamento da assistente",
    forceAssistantUpdateText: "Attivalo per permettere all'assistente di sovrascrivere tutti i riquadri nella tabella.<br>Disattivalo per far sovrascrivere solo i riquadri vuoti. (Consigliato)",
    customBoardMaxPlayers: "Max giocatori",
    instructionsModalText7: "Con Assistente puoi tenere traccia delle ipotesi degli altri giocatori automaticamente.",
    autocompleteLabel: "Autocompletamento",
    autocompleteText: "Attivalo per inserire le croci<span class=\"material-symbols-outlined\">close</span> automaticamente ogni volta che metti una spunta<span class=\"material-symbols-outlined\">done</span> su una carta. (Consigliato)<br>Disattivalo per inserire le croci manualmente.",
    instructionsModalText8: "Se sbagli, puoi annullare e ripetere ogni azione.<br>Lo storico delle azioni viene salvato con la partita.<br>Accedi allo storico delle azioni tenendo premuto (o cliccando col tasto destro) su uno dei pulsanti.",
    darkModeLabel: "Modalità scura",
    darkModeText: "Usa uno schema di colori scuro per non affaticare la vista.",
    actionHistoryModalTitle: "Cronologia",
    actionHistoryModalSubtitle: "Scegli il punto a cui vuoi tornare dalla lista.",
    actionHistorySectionEmpty: "La tua cronologia è vuota.",
    actionConfirmButton: "Conferma",
    introMessage: "da Nicholas<br>con 🩷"
}

export const titleStringsIT = {
    customizeBoardButton: "Personalizza tavolo",
    playerNum: "Numero di giocatori",
    newBoardButton: "Nuovo tavolo personalizzato",
    importBoardButton: "Importa tavoli personalizzati",
    exportAllBoardsButton: "Esporta tutti i tavoli",
    customBoardName: "Nome tavolo",
    addCharacterToCustomBoardButton: "Aggiungi sospetto",
    addWeaponToCustomBoardButton: "Aggiungi arma",
    addRoomToCustomBoardButton: "Aggiungi stanza",
    saveBoardButton: "Salva tavolo",
    fileInputButton: "Scegli file",
    fileInput: "Importa tavoli",
    finalizeImportButton: "Importa tavoli",
    longNamesCompatibilityMode: "Modalità di compatibilità per nomi lunghi",
    hideDustCounter: "Nascondi contatore polveri",
    alternateInGameToolbar: "Barra degli strumenti in basso",
    playerOrder1: "Il primo giocatore alla tua sinistra",
    playerOrder2: "Il secondo giocatore alla tua sinistra",
    playerOrder3: "Il terzo giocatore alla tua sinistra",
    playerOrder4: "Il quarto giocatore alla tua sinistra",
    playerOrder5: "Il quinto giocatore alla tua sinistra",
    dustCounterButton: "Contatore polveri",
    //dustCounterAltButton: "Contatore polveri",
    showLessSymbolsCheckbox: "Mostra meno simboli",
    fakeCheckbox: "Spunta istruzioni",
    assistantConfirmButton: "Conferma",
    actionConfirmButton: "Conferma"
}

export const manualStringsIT = {
    boardValidation: {
        duplicate: "Esiste già un tavolo uguale a questo.",
        name: "Non hai dato un nome.",
        characters: "Mancano i sospetti.",
        weapons: "Mancano le armi.",
        rooms: "Mancano le stanze.",
        generic: "Tavolo non valido"
    },
    customBoardTitles: {
        play: "Usa questo tavolo",
        edit: "Modifica",
        export: "Esporta",
        delete: "Elimina",
        characters: "Sospetti",
        weapons: "Armi",
        rooms: "Stanze",
        maxPlayers: "Max giocatori"
    },
    customBoardDeleteModal: {
        confirmationTitle: "Elimino il tavolo?",
        confirmationSubtitle: "L'azione è irreversibile!"
    },
    incompatibleText: "La partita salvata non è compatibile con questa versione dell'app, non posso continuare la partita.",
    letsPlay: "Giochiamo!",
    me: "Me stessə",
    you: "Tu",
    nobody: "Nessuno",
    actionHistoryModal: {
        updateManual: "Aggiornamento manuale",
        updateManualText: "[ITEM]: Cambiato da [OLDID] a [NEWID] per [PLAYER].",
        updateAssistant: "Aggiornamento assistente",
        updateAssistantText: "[WHOASKED] ha accusato [ITEM0] con [ITEM1] in [ITEM2]. Ha risposto [WHOANSWERED].",
        updateAssistantTextCustom: {
            playerAsked: "Hai accusato [ITEM0] con [ITEM1] in [ITEM2]. Ha risposto [WHOANSWERED].",
            playerAnswered: "[WHOASKED] ha accusato [ITEM0] con [ITEM1] in [ITEM2]. Hai risposto te.",
            nobodyAnswered: "[WHOASKED] ha accusato [ITEM0] con [ITEM1] in [ITEM2]. Non ha risposto nessuno.",
            playerAskedNobodyAnswered: "Hai accusato [ITEM0] con [ITEM1] in [ITEM2]. Non ha risposto nessuno."
        },
        lockItem: "Carta bloccata",
        locked: "Bloccatə [ITEM].",
        unlockItem: "Carta sbloccata",
        unlocked: "Sbloccatə [ITEM].",
        deletePrompt: "Vuoi cancellare questa azione dalla cronologia? È irreversibile.",
        confirmationPrompt: {
            singleRedo: "Stai per ripetere un'azione.",
            singleUndo: "Stai per annullare un'azione.",
            batchRedo: "Stai per ripetere [NUM] azioni.",
            batchUndo: "Stai per annullare [NUM] azioni."
        }
    },
    showMoreSymbols: "Mostra altro"
}