export const boardsEN = [
    {
        id: 0,
        name: "Classic",
        minPlayers: 3,
        //maxPlayers: 6 sempre
        characters: ["Miss Scarlett", "Professor Plum", "Mrs. Peacock", "Reverend Green", "Colonel Mustard", "Mrs. White"],
        weapons: ["Candlestick", "Dagger", "Lead Pipe", "Revolver", "Rope", "Spanner"],
        rooms: ["Kitchen", "Ballroom", "Conservatory", "Dining Room", "Billiard Room", "Library", "Lounge", "Hall", "Study"]
    },
    {
        id: 1,
        name: "Meereen",
        minPlayers: 2,
        //maxPlayers: 6 sempre
        characters: ["Daenerys", "Daario", "Missandei", "Grey Worm", "Loraq", "Jorah"],
        weapons: ["Poison Vial", "Battle Axe", "Arokh", "Faceless Man", "Crossbow", "Assassin Dagger"],
        rooms: ["Brothel", "Pyramid", "Slave Quarters", "Temple", "Dragon Catacombs", "Tunnels", "Grand Bazaar", "City Gates", "Pit of Daznak"]
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
        characters: ["Fenrir Greyback", "Lucius Malfoy", "Peter Pettygrew", "Draco Malfoy", "Snatcher", "Bellatrix Lastrange"],
        weapons: ["Jinxed Broomstick", "Cursed Necklace", "Love Potion", "Poisoned Mead", "Incedio", "Stupefy"],
        rooms: ["Malfoy Manor", "The Hog's Head", "The Shrieking Shack", "Hogwarts Castle", "Forbidden Coast", "Gringotts", "Weasleys' Wizard Wheezes", "Ministry of Magic", "12 Grimmauld Place"]
    },
];

export const stringsEN = {
    mainTitle: "detective<br>notes",
    beginButton: "Start",
    beginButtonSubtitle: "Any saved game will be deleted",
    continueButton: "Continue",
    resumePromptText: "There's a game saved on this device.<br>Would you like to restore it?",
    genericYes: "Yes",
    genericNo: "No",
    newGame: "New Game",
    boardQuestion: "What board are you using?",
    playerNumQuestion: "How many people are playing?",
    playerNameQuestion: "What are their names?",
    playerNumTooltip: "3",
    playerNameTooltip: "Keep your names short, and write them in order.",
    readyText: "Are you ready?",
    startGame: "Start Game",
    instructionsModalText1: "At the beginning of the game, you'll be given some cards.",
    instructionsModalText2: "Tick the box next to their name to lock them in.",
    instructionsModalText3: "Once you've locked in all your cards, tap the lock icon at the top of the screen.",
    instructionsModalText4: "Your game progress is saved automatically.",
    instructionsModalText5: "With Autocomplete, when you set a check <span class=\"material-symbols-outlined\">done</span> on a card, crosses <span class=\"material-symbols-outlined\">close</span> are filled in automatically.<br>This option is ON by default, disable it to add crosses manually.",
    instructionsModalText6: "On the Harry Potter board, keep track of how much dust you have with this counter. Tap it to increase and decrease how much dust you have.",
    //autocompleteStatusContainer: "Autocomplete is ",
    //autocompleteStatus: "ON",
    tableHeaderPlayers: "Players",
    tableHeaderCharacters: "Suspects",
    tableHeaderWeapons: "Weapons",
    tableHeaderRooms: "Rooms",
    showLessSymbolsText: "Show less symbols",
    resetText: "Reset",
    checkFullText: "Yes",
    checkMaybeText: "Maybe",
    crossFullText: "No",
    crossMaybeText: "Maybe not",
    starText: "Star",
    questionText: "Questiom",
    exclamationText: "Caution",
    flagText: "Flag",
    skipText: "Skip",
    dustCounter: "Dust counter",
    playerOrderModalLink: "What order?",
    orderModalText: "The game moves clockwise.<br>Write the player's names clockwise, starting from the player to your left.",
    creditsModalText: "Detective Notes<br>Version 3.1<br>made with 🩷 by Nicholas<br><br>This project uses the <a href=\"https://sketchfab.com/3d-models/clue-board-game-843af04381cc495ca5f0a4bebadb1752\" target=\"_blank\">\"Clue (Board Game)\"</a> model by <a href=\"https://sketchfab.com/paulyanez\" target=\"_blank\">Anthony Yanez</a>, licensed under <a href=\"http://creativecommons.org/licenses/by/4.0/\" target=\"_blank\">CC-BY-4.0</a>.",
    advancedSettingsTitle: "Advanced settings",
    longNamesCompatibilityModeLabel: "Long names compatibility mode",
    longNamesCompatibilityModeText: "Show player names vertically, allowing long names to be displayed without stretching the table.",
    hideDustCounterLabel: "Hide dust counter",
    hideDustCounterText: "Hide dust counter for Harry Potter board",
    hideDustCounterDisabled: "This option is available for the Harry Potter board only.",
    instructionsModalTitle: "Instructions",
    skipLoading: "Skip",
    alternateInGameToolbarLabel: "Alternate ingame toolbar",
    alternateInGameToolbarText: "Move the ingame toolbar to the bottom of the screen.",
    customizeBoardButtonText: "Custom board",
    saveBoardButton: "Save board",
    customBoardHeaderName: "Board name",
    customBoardHeaderCharacters: "Suspects",
    customBoardHeaderWeapons: "Weapons",
    customBoardHeaderRooms: "Rooms",
    exportBoardButton: "Export board"
}

export const incompatibleTextEN = "This saved game is incompatible with this version of the app, cannot resume."

export const letsPlayEN = "Let's play!";