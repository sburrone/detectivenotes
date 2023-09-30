const boardsIT = [
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
        weapons: ["Fiala di veleno", "Ascia da guerra", "Arokh", "Uomo senza volto", "Balestra", "Daga dell'assassino"],
        rooms: ["Bordello", "Piramide", "Quartiere degli schiavi", "Tempio delle grazie", "Catacombe del drago", "Tunnel", "Gran Bazaar", "Porte della città", "Fossa di Daznak"]
    },
    {
        id: 2,
        name: "Red Keep",
        minPlayers: 2,
        //maxPlayers: 6 sempre
        characters: ["Cersei", "Tyrion", "Jaime", "Margaery", "Petyr", "Sansa"],
        weapons: ["Poison Vial", "Battle Axe", "Arokh", "Faceless Man", "Crossbow", "Assassin Dagger"],
        rooms: ["Council Chamber", "Cyburn's Laboratory", "Tower of the Hand", "Kingsguard Chambers", "Prison Cells", "Gardens", "Pavillion", "Townmen's Bedchambers", "Pycelle's Lab", "Cercei's Bedchambers", "Sparring Yard"]
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


const stringsIT = {
    mainTitle: "detective<br>notes",
    beginButton: "Inizia",
    beginButtonSubtitle: "La partita salvata verrà eliminata",
    continueButton: "Continua",
    resumePromptText: "Ho trovato una partita salvata.<br>Vuoi continuarla?",
    genericYes: "Sì",
    genericNo: "No",
    newGame: "Nuova partita",
    boardQuestion: "Quale tavolo stai usando?",
    playerNumQuestion: "In quanti giocano?",
    playerNameQuestion: "Come si chiamano?",
    playerNumTooltip: "3",
    playerNameTooltip: "Cerca di usare nomi corti, e scrivili in ordine.",
    readyText: "Pronti?",
    startGame: "Inizia partita",
    instructionsModalText: "All'inizio della partita ti verranno date delle carte.<br>Spunta la casella di fianco a queste carte per bloccarle.<br>Dopo averle bloccate tutte, tocca il lucchetto in alto.<br>La partita viene salvata automaticamente.",
    instructionsModalConfirm: "Ho capito",
    autocompleteStatusContainer: "Autocompletamento ",
    autocompleteStatus: "ON",
    tableHeaderPlayers: "Giocatori",
    tableHeaderCharacters: "Sospettati",
    tableHeaderWeapons: "Armi",
    tableHeaderRooms: "Stanze",
    showLessSymbolsText: "Mostra meno simboli",
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
    dustCounter: "Contatore polveri"
}

const letsPlayIT = "Gichiamo!";