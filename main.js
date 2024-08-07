import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js"
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js"
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js"
import {
    idStringsEN,
    boardsEN,
    titleStringsEN,
    manualStringsEN,
    minVersionNumber,
    versionNumber,
} from "./strings-en.js"
import {
    idStringsIT,
    boardsIT,
    titleStringsIT,
    manualStringsIT,
} from "./strings-it.js"

let _APP = null

let locked = false

$(document).ready(function() {
    "use strict"

    const cameraPositions = [
        [0, 60, 0],
        [10, 15, 10],
        [0, 0, 40],
        [40, 15, 40],
        [15, 50, 15],
        [15, 50, 50],
        [30, 30, 30],
    ]

    function getCameraPosition() {
        return cameraPositions[
            Math.floor(Math.random() * cameraPositions.length)
            ]
    }

    class AnimatedBoard {
        constructor() {
            this._Initialize()
        }

        _Initialize() {
            this._threejs = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
            })
            this._threejs.shadowMap.enabled = true
            this._threejs.shadowMap.type = THREE.PCFSoftShadowMap
            this._threejs.physicallyCorrectLights = true
            this._threejs.toneMapping = THREE.ACESFilmicToneMapping
            this._threejs.outputEncoding = THREE.sRGBEncoding

            const modelDiv = document.getElementById("model")
            modelDiv.appendChild(this._threejs.domElement)

            this._threejs.setSize(modelDiv.offsetWidth, modelDiv.offsetHeight)

            window.addEventListener(
                "resize",
                () => {
                    this._OnWindowResize()
                },
                false,
            )

            const fov = 60
            const aspect = modelDiv.offsetWidth / modelDiv.offsetHeight
            const near = 1.0
            const far = 1000.0
            this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
            const chosenPosition = getCameraPosition()
            this._camera.position.set(
                chosenPosition[0],
                chosenPosition[1],
                chosenPosition[2],
            )

            this._scene = new THREE.Scene()

            let light = new THREE.DirectionalLight(0xffffff)
            light.position.set(20, 100, 10)
            light.target.position.set(0, 0, 0)
            light.castShadow = true
            light.intensity = 5
            light.shadow.bias = -0.001
            light.shadow.mapSize.width = 2048
            light.shadow.mapSize.height = 2048
            light.shadow.camera.near = 0.1
            light.shadow.camera.far = 500.0
            light.shadow.camera.near = 0.5
            light.shadow.camera.far = 500.0
            light.shadow.camera.left = 100
            light.shadow.camera.right = -100
            light.shadow.camera.top = 100
            light.shadow.camera.bottom = -100
            this._scene.add(light)

            light = new THREE.AmbientLight(0xffffff)
            this._scene.add(light)

            this._controls = new OrbitControls(
                this._camera,
                this._threejs.domElement,
            )
            this._controls.target.set(0, 10, 0)
            this._controls.maxDistance = 80
            this._controls.minDistance = 1
            this._controls.autoRotate = true
            this._controls.autoRotateSpeed = 2
            this._controls.enableDamping = true
            this._controls.update()

            this._camera.lookAt(this._scene.position)

            const loadingManager = new THREE.LoadingManager()

            loadingManager.onLoad = function() {
                doneLoading()
            }

            $("#skipLoading").on("click", doneLoading)

            loadingManager.onProgress = function(
                url,
                itemsLoaded,
                itemsTotal,
            ) {
                $("#progressBar").val((itemsLoaded / itemsTotal) * 100)
            }

            loadingManager.onError = function(url) {
                console.log("There was an error loading " + url)
                doneLoading()
            }

            const loader = new GLTFLoader(loadingManager)
            loader.setPath("./3d/")
            loader.load("scene.gltf", (gltf) => {
                //gltf.scale.setScalar(0.1)
                gltf.scene.scale.set(0.05, 0.05, 0.05)
                gltf.scene.traverse((c) => {
                    c.castShadow = true
                })
                this._scene.add(gltf.scene)
            })

            function doneLoading() {
                document.fonts.ready.then(() => {
                    $("#loadingScreen").fadeOut(1000)
                    checkIncompatibleSave()
                })
            }

            this._RAF()
        }

        _OnWindowResize() {
            this._camera.aspect = window.innerWidth / window.innerHeight
            this._camera.updateProjectionMatrix()
            this._threejs.setSize(window.innerWidth, window.innerHeight)
        }

        _Step(timeElapsed) {
            const timeElapsedS = timeElapsed * 0.001
            if (this._mixers) {
                this._mixers.map((m) => m.update(timeElapsedS))
            }
        }

        _RAF() {
            requestAnimationFrame((t) => {
                if (this._previousRAF === null) {
                    this._previousRAF = t
                }

                this._controls.update()

                this._RAF()

                this._threejs.render(this._scene, this._camera)
                this._Step(t - this._previousRAF)
                this._previousRAF = t
            })
        }
    }

    _APP = new AnimatedBoard()

    let darkMode = false

    //Language
    let userLang = navigator.language || navigator.userLanguage
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    })
    let forcedLang = params.lang
    if (
        (forcedLang && forcedLang.toLowerCase() === "it") ||
        (!forcedLang && userLang.includes("it"))
    ) {
        $("html").attr("lang", "it")
        userLang = "it-IT"
    } else if (
        (forcedLang && forcedLang.toLowerCase() === "en") ||
        (!forcedLang && userLang.includes("en"))
    ) {
        userLang = "en-US"
    }
    let idStrings, boards, titleStrings, manualStrings
    let itemsArray
    const imageData = {
        check: "assets/icons/check.svg",
        maybe: "assets/icons/check.svg",
        cross: "assets/icons/cross.svg",
        maybeNot: "assets/icons/cross.svg",
        reset: "assets/icons/reset.svg",
        star: "assets/icons/star.svg",
        question: "assets/icons/question.svg",
        exclamation: "assets/icons/exclamation.svg",
        flag: "assets/icons/flag.svg",
        skip: "assets/icons/skip.svg",
    }

    switch (userLang) {
        case "it-IT": {
            idStrings = idStringsIT
            boards = boardsIT
            titleStrings = titleStringsIT
            manualStrings = manualStringsIT
            break
        }
        default: {
            idStrings = idStringsEN
            boards = boardsEN
            titleStrings = titleStringsEN
            manualStrings = manualStringsEN
            break
        }
    }

    let game = {}

    const CUSTOM_BOARD_THRESHOLD = 100 //board.id = 110 diventa customBoards[110-100 = 10]

    let settings = {
        longNamesCompatibilityMode: false,
        alternateInGameToolbar: false,
        forceAssistantUpdate: false,
        hideDustCounter: false,
        autocomplete: true,
        showLessSymbols: false,
    }

    function saveGame() {
        game.lang = userLang
        game.date = Date.now()
        game.version = versionNumber
        localStorage.setItem("game", JSON.stringify(game))
    }

    function saveSetting(key, val) {
        settings[key] = val
        saveSettings() //Testato!
    }

    let advancedCards = {type: "undefined"}

    function saveGameSetup(board, players) {
        game.board = board
        game.players = players
        game.locked = false
        game.advancedCards = advancedCards
        saveGame()
    }

    function saveItem(row, player, item) {
        getFilteredTable()[row].items[player] = item
        if (item !== "maybe") {
            getFilteredTable()[row].maybeCounter[player] = 0
        }
        saveGame()
    }

    function toggleLockRow(rowNo, force, rowItems, maybeCounter) {
        const action = {
            item: rowNo,
        }
        getFilteredTable()[rowNo].locked =
            force || !getFilteredTable()[rowNo].locked
        if (getFilteredTable()[rowNo].locked) {
            action.type = "lockItem"
            action.oldRow = rowItems
            action.oldMaybeCounter = maybeCounter
        } else {
            action.type = "unlockItem"
        }
        saveAction(action)
        saveGame()
    }

    function setupTable() {
        game.table = []
        if (game.board === 5) {
            game.dustCounter = 12
        }
        let board =
            game.board >= CUSTOM_BOARD_THRESHOLD
                ? settings.customBoards[game.board - CUSTOM_BOARD_THRESHOLD]
                : boards[game.board]
        game.table.push({ divider: true, name: "Characters" })
        board.characters.forEach((character) => {
            game.table.push({
                row: character,
                section: "Characters",
                locked: false,
                items: Array(game.players.length).fill("reset"),
                maybeCounter: Array(game.players.length).fill(0),
            })
        })
        game.table.push({ divider: true, name: "Weapons" })
        board.weapons.forEach((weapon) => {
            game.table.push({
                row: weapon,
                section: "Weapons",
                locked: false,
                items: Array(game.players.length).fill("reset"),
                maybeCounter: Array(game.players.length).fill(0),
            })
        })
        game.table.push({ divider: true, name: "Rooms" })
        board.rooms.forEach((room) => {
            game.table.push({
                row: room,
                section: "Rooms",
                locked: false,
                items: Array(game.players.length).fill("reset"),
                maybeCounter: Array(game.players.length).fill(0),
            })
        })
        saveGame()
    }

    const getFilteredTable = function() {
        return game.table.filter((el) => !el.divider)
    }

    function toggleLockGlobal(force) {
        game.locked = force !== undefined ? force : !game.locked
        saveGame()
    }

    const dustCounterIncrease = function() {
        if (game.board === 5) {
            game.dustCounter++
            saveGame()
        }
        return game.dustCounter
    }

    const dustCounterDecrease = function() {
        if (game.board === 5) {
            game.dustCounter--
            saveGame()
        }
        return game.dustCounter
    }

    function saveSettings() {
        localStorage.setItem("settings", JSON.stringify(settings))
    }

    function loadGame() {
        game = JSON.parse(localStorage.getItem("game")) || {}
    }

    function loadSettings() {
        settings = JSON.parse(localStorage.getItem("settings")) || settings
        _.forEach(settings, (val, key) => {
            if (val === true) {
                //Solo i valori booleani vanno cambiati
                $("#" + key).prop("checked", true)
            }
        })
    }

    //Detect language, load strings
    let stringKeys = Object.keys(idStrings)
    stringKeys.forEach((key) => {
        //console.log('string', key)
        document.getElementById(key).innerHTML = idStrings[key]
    })
    let titleKeys = Object.keys(titleStrings)
    titleKeys.forEach((key) => {
        //console.log('title', key)
        document.getElementById(key).title = titleStrings[key]
    })
    $("#startGame").attr("value", manualStrings.letsPlay)

    const languageLabels = ["Switch language", "Cambia lingua"]
    let languageIndex = 0
    let languageInterval = window.setInterval(function() {
        if (languageIndex === languageLabels.length) {
            languageIndex = 0
        }
        $(".language-label").text(languageLabels[languageIndex])
        languageIndex++
    }, 2000)

    function redrawFromDataForAllPlayers(item) {
        for (let i = 0; i < game.players.length; i++) {
            redrawFromData(item, i)
        }
    }

    function redrawFromData(item, player) {
        const id = getFilteredTable()[item].items[player]
        const maybe = getFilteredTable()[item].maybeCounter[player]

        $("#cellImg" + player + "_" + item).removeClass(
            $("#cellImg" + player + "_" + item).attr("class"),
        ).addClass(id).attr("src", imageData[id]).text(maybe)
        if (id === "maybe" && maybe > 1) {
            $("#cellNumber" + player + "_" + item).show()
        } else {
            $("#cellNumber" + player + "_" + item).hide()
        }
    }

    /*

    ///////////////
    //  ACTIONS  //
    ///////////////

    Sintassi:

    history = [Action]

    action = {
        type: String                        <-- L'unico attributo obbligatorio
    }

    types:
    1. "updateManual": scelta normale dentro selectionModal
        1.1. item = Number                  <-- Indirizzo dentro itemsArray. ereditato dalle subactions
        1.2. subactions = []
            1.2.1. subaction = {            <-- Opzionale, per autocomplete
                type: "updateWholeRow",
                id: String,                 <-- cross, reset, ecc.
                oldRow: [String],
                oldMaybeCounter: [Number],  <-- opzionale, se oldRow contiene maybe
            }
            1.2.2. subaction = {            <-- Obbligatorio per updateGroup
                type: "update",
                player: Number,
                id: String,
                oldId: String,
                oldMaybeCounter: Number     <-- opzionale, se oldId contiene maybe
            }
        1.3. oldId: String
        1.4. newId: String
        1.5. player: Number
    
    2. "updateAssistant": operazione dell'assistente
        2.1. subactions = []
            2.1.1. subaction = {
                type: "assistantCross",
                item: Number,               <-- Item non viene ereditato perché l'azione non viene eseguita in alcuni casi (item bloccato, cella già riempita che non va sovrascritta)
                player: Number,
                oldId: String,
                oldMaybeCounter: Number     <-- opzionale, se oldId contiene maybe
            }
            2.1.2. subaction = {
                type: "assistantMaybe",
                item: Number,
                player: Number,
                maybeCounter: Number,       <-- quello nuovo
                oldId: String
            }
        2.2. items = [Number]
        2.3. whoAsked = Number
        2.4. whoAnswered = Number
    
    3. "lockItem": blocco di una riga
        3.1. item = Number
        3.2. oldRow = [String]              <-- id sostituiti con il blocco
        3.3. oldMaybeCounter = [Number]        <-- opzionale, se oldRow contiene maybe

    4. "unlockItem": sblocco di una riga
        4.1. item = Number


    Gestione storia:

    - historyIndex rimane aggiornato con la lunghezza di history.
    - Ad ogni undo, prende l'azione a history[historyIndex] e historyIndex torna indietro di uno.
    - Ad ogni redo, prende l'azione a history[historyIndex] e historyIndex aumenta di uno.

    */

    const MAX_ACTIONS = 50

    function saveAction(action) {
        if (!game.history) {
            game.history = []
            game.historyIndex = 0
        }
        if (game.historyIndex !== game.history.length) {
            game.history = _.slice(game.history, 0, game.historyIndex)
        }
        if (game.history.length >= MAX_ACTIONS) {
            game.history.shift()
        }
        game.history.push(action)
        game.historyIndex = game.history.length
        saveGame()
    }

    $("#undoButton").on("click", function() {
        undoAction()
    })

    function undoAction() {
        if (game.historyIndex === 0) {
            return
        }
        game.historyIndex--
        const action = game.history[game.historyIndex]
        doUndoAction(action)
        saveGame()
    }

    function doUndoAction(action, item) {
        //Item al momento è usato solo da updateManual, ed è la riga della tabella.
        switch (action.type) {
            case "updateManual":
                if (_.isUndefined(action.item)) {
                    console.error(action, "Item not valid!")
                } else if (_.isUndefined(action.subactions)) {
                    console.error(action, "Subactions not valid!")
                } else {
                    _.forEachRight(action.subactions, (sa) =>
                        doUndoAction(sa, action.item),
                    )
                }
                return

            case "updateWholeRow":
                if (_.isUndefined(action.id)) {
                    console.error(action, "Id not valid!")
                } else if (_.isUndefined(action.oldRow)) {
                    console.error(action, "Row not valid!")
                } else if (_.isUndefined(action.oldMaybeCounter)) {
                    console.error(action, "Maybe counter not valid!")
                } else {
                    getFilteredTable()[item].items = _.cloneDeep(action.oldRow)
                    getFilteredTable()[item].maybeCounter = _.cloneDeep(
                        action.oldMaybeCounter,
                    )
                    redrawFromDataForAllPlayers(item)
                }
                return

            case "update":
                if (_.isUndefined(action.player)) {
                    console.error(action, "Player not valid!")
                } else if (_.isUndefined(action.id)) {
                    console.error(action, "Id not valid!")
                } else if (_.isUndefined(action.oldId)) {
                    console.error(action, "Old id not valid!")
                } else if (_.isUndefined(action.oldMaybeCounter)) {
                    console.error(action, "Old maybe counter not valid!")
                } else {
                    getFilteredTable()[item].items[action.player] = action.oldId
                    getFilteredTable()[item].maybeCounter[action.player] =
                        action.oldMaybeCounter
                    redrawFromData(item, action.player)
                }
                return

            case "updateAssistant":
                if (_.isUndefined(action.subactions)) {
                    console.error(action, "Subactions not valid!")
                } else {
                    _.forEachRight(action.subactions, (sa) => doUndoAction(sa))
                }
                return

            case "assistantCross":
                if (_.isUndefined(action.player)) {
                    console.error(action, "Player not valid!")
                } else if (_.isUndefined(action.oldId)) {
                    console.error(action, "Old id not valid!")
                } else if (_.isUndefined(action.oldMaybeCounter)) {
                    console.error(action, "Old maybe counter not valid!")
                } else if (_.isUndefined(action.item)) {
                    console.error(action, "Item maybe counter not valid!")
                } else {
                    getFilteredTable()[action.item].items[action.player] =
                        action.oldId
                    getFilteredTable()[action.item].maybeCounter[
                        action.player
                        ] = action.oldMaybeCounter
                    redrawFromData(action.item, action.player)
                }
                return

            case "assistantMaybe":
                if (_.isUndefined(action.player)) {
                    console.error(action, "Player not valid!")
                } else if (_.isUndefined(action.oldId)) {
                    console.error(action, "Old id not valid!")
                } else if (_.isUndefined(action.item)) {
                    console.error(action, "Item maybe counter not valid!")
                } else if (_.isUndefined(action.maybeCounter)) {
                    console.error(action, "Maybe counter not valid!")
                } else {
                    getFilteredTable()[action.item].items[action.player] =
                        action.oldId
                    getFilteredTable()[action.item].maybeCounter[
                        action.player
                        ] = _.cloneDeep(action.maybeCounter)
                    redrawFromData(action.item, action.player)
                }
                return

            case "lockItem":
                if (_.isUndefined(action.item)) {
                    console.error(action, "Item not valid!")
                } else if (_.isUndefined(action.oldRow)) {
                    console.error(action, "Old row not valid!")
                } else if (_.isUndefined(action.oldMaybeCounter)) {
                    console.error(action, "Old maybe counter not valid!")
                } else {
                    getFilteredTable()[action.item].items = _.cloneDeep(
                        action.oldRow,
                    )
                    getFilteredTable()[action.item].maybeCounter = _.cloneDeep(
                        action.oldMaybeCounter,
                    )
                    redrawFromDataForAllPlayers(action.item)
                    $("#rowCheckbox" + action.item).prop("checked", false)
                    $("#rowCheckbox" + action.item)
                        .closest(".table-row")
                        .find("td > a")
                        .data("locked", "false")
                    $("#rowCheckbox" + action.item)
                        .closest(".table-row")
                        .removeClass("locked")
                    $("#rowCheckbox" + action.item)
                        .closest(".table-row")
                        .css("background-color", "")
                    $("#rowCheckbox" + action.item)
                        .closest(".table-row")
                        .css("color", "")
                }
                return

            case "unlockItem":
                if (_.isUndefined(action.item)) {
                    console.error(action, "Item not valid")
                } else {
                    game.players.forEach((player, index) => {
                        getFilteredTable()[action.item].items[index] = "cross"
                        getFilteredTable()[action.item].maybeCounter[index] = 0
                        redrawFromData(action.item, index)
                    })
                    $("#rowCheckbox" + action.item).prop("checked", true)
                    $("#rowCheckbox" + action.item)
                        .closest(".table-row")
                        .find("td > a")
                        .data("locked", "true")
                    $("#rowCheckbox" + action.item)
                        .closest(".table-row")
                        .addClass("locked")
                    $("#rowCheckbox" + action.item)
                        .closest(".table-row")
                        .css(
                            "background-color",
                            "var(--md-sys-color-error-container)",
                        )
                    $("#rowCheckbox" + action.item)
                        .closest(".table-row")
                        .css("color", "var(--md-sys-color-on-error-container)")
                }
                return

            default:
                console.error(action, "Type not valid!")
                return
        }
    }

    $("#redoButton").on("click", function() {
        redoAction()
    })

    function redoAction() {
        if (game.historyIndex >= game.history.length) {
            return
        }
        const action = game.history[game.historyIndex]

        //Esegui inverso
        doRedoAction(action)
        game.historyIndex++
        saveGame()
    }

    function doRedoAction(action, item) {
        //Item al momento è usato solo da updateManual, ed è la riga della tabella.
        switch (action.type) {
            case "updateManual":
                if (_.isUndefined(action.item)) {
                    console.error(action, action.item, "Item not valid!")
                } else if (_.isUndefined(action.subactions)) {
                    console.error(action, "Subactions not valid!")
                } else {
                    _.forEach(action.subactions, (sa) =>
                        doRedoAction(sa, action.item),
                    )
                }
                return

            case "updateWholeRow":
                if (_.isUndefined(action.id)) {
                    console.error(action, "Id not valid!")
                } else if (_.isUndefined(action.oldRow)) {
                    console.error(action, "Row not valid!")
                } else if (_.isUndefined(action.oldMaybeCounter)) {
                    console.error(action, "Maybe counter not valid!")
                } else {
                    getFilteredTable()[item].items.forEach((el, player) => {
                        getFilteredTable()[item].items[player] = action.id
                        getFilteredTable()[item].maybeCounter[player] = 0
                        redrawFromData(item, player)
                    })
                }
                return

            case "update":
                if (_.isUndefined(action.player)) {
                    console.error(action, "Player not valid!")
                } else if (_.isUndefined(action.id)) {
                    console.error(action, "Id not valid!")
                } else if (_.isUndefined(action.oldId)) {
                    console.error(action, "Old id not valid!")
                } else if (_.isUndefined(action.oldMaybeCounter)) {
                    console.error(action, "Old maybe counter not valid!")
                } else {
                    getFilteredTable()[item].items[action.player] = action.id
                    getFilteredTable()[item].maybeCounter[action.player] = 0
                    redrawFromData(item, action.player)
                }
                return

            case "updateAssistant":
                if (_.isUndefined(action.subactions)) {
                    console.error(action, "Subactions not valid!")
                } else {
                    _.forEach(action.subactions, (sa) => doRedoAction(sa))
                }
                return

            case "assistantCross":
                if (_.isUndefined(action.player)) {
                    console.error(action, "Player not valid!")
                } else if (_.isUndefined(action.oldId)) {
                    console.error(action, "Old id not valid!")
                } else if (_.isUndefined(action.oldMaybeCounter)) {
                    console.error(action, "Old maybe counter not valid!")
                } else if (_.isUndefined(action.item)) {
                    console.error(action, "Item maybe counter not valid!")
                } else {
                    getFilteredTable()[action.item].items[action.player] =
                        "cross"
                    getFilteredTable()[action.item].maybeCounter[
                        action.player
                        ] = 0
                    redrawFromData(action.item, action.player)
                }
                return

            case "assistantMaybe":
                if (_.isUndefined(action.player)) {
                    console.error(action, "Player not valid!")
                } else if (_.isUndefined(action.oldId)) {
                    console.error(action, "Old id not valid!")
                } else if (_.isUndefined(action.item)) {
                    console.error(action, "Item maybe counter not valid!")
                } else if (_.isUndefined(action.maybeCounter)) {
                    console.error(action, "Maybe counter not valid!")
                } else {
                    getFilteredTable()[action.item].items[action.player] =
                        "maybe"
                    getFilteredTable()[action.item].maybeCounter[
                        action.player
                        ] = _.cloneDeep(action.maybeCounter) + 1
                    redrawFromData(action.item, action.player)
                }
                return

            case "lockItem":
                if (_.isUndefined(action.item)) {
                    console.error(action, "Item not valid!")
                } else if (_.isUndefined(action.oldRow)) {
                    console.error(action, "Old row not valid!")
                } else if (_.isUndefined(action.oldMaybeCounter)) {
                    console.error(action, "Old maybe counter not valid!")
                } else {
                    getFilteredTable()[action.item].items = Array(
                        game.players.length,
                    ).fill("cross")
                    getFilteredTable()[action.item].maybeCounter = Array(
                        game.players.length,
                    ).fill(0)
                    redrawFromDataForAllPlayers(action.item)
                }
                $("#rowCheckbox" + action.item).prop("checked", true)
                $("#rowCheckbox" + action.item)
                    .closest(".table-row")
                    .find("td > a")
                    .data("locked", "true")
                $("#rowCheckbox" + action.item)
                    .closest(".table-row")
                    .addClass("locked")
                $("#rowCheckbox" + action.item)
                    .closest(".table-row")
                    .css(
                        "background-color",
                        "var(--md-sys-color-error-container)",
                    )
                $("#rowCheckbox" + action.item)
                    .closest(".table-row")
                    .css("color", "var(--md-sys-color-on-error-container)")
                return

            case "unlockItem":
                if (_.isUndefined(action.item)) {
                    console.error(action, "Item not valid")
                } else {
                    getFilteredTable()[action.item].items = Array(
                        game.players.length,
                    ).fill("reset")
                    getFilteredTable()[action.item].maybeCounter = Array(
                        game.players.length,
                    ).fill(0)
                    redrawFromDataForAllPlayers(action.item)
                }
                $("#rowCheckbox" + action.item).prop("checked", false)
                $("#rowCheckbox" + action.item)
                    .closest(".table-row")
                    .find("td > a")
                    .data("locked", "false")
                $("#rowCheckbox" + action.item)
                    .closest(".table-row")
                    .removeClass("locked")
                $("#rowCheckbox" + action.item)
                    .closest(".table-row")
                    .css("background-color", "")
                $("#rowCheckbox" + action.item)
                    .closest(".table-row")
                    .css("color", "")
                return

            default:
                console.error(action, "Type not valid!")
                return
        }
    }

    loadSettings()
    loadGame()

    function checkIncompatibleSave() {
        if (validateGame(game) === "INCOMPATIBLE") {
            //Trovato salvataggio vecchio. Cancella tutto.
            $("#continueGameButton").attr("disabled", "true").css("filter", "grayscale(0.75)").toggle()
            $("#continueButtonSubtitle")
                .empty()
                .text(manualStrings.incompatibleText)
        }
    }

    function validateGame(game) {
        let ret = "OK"
        if (!game || _.isEmpty(game)) {
            ret = "EMPTY"
        } else if (
            game.date &&
            game.version &&
            game.version < minVersionNumber
        ) {
            console.info(
                "Game version does not meet requirements. Saved game version is",
                game.version,
                "and required version is",
                minVersionNumber,
            )
            ret = "INCOMPATIBLE"
        }
        return ret
    }

    if (validateGame(game) === "OK") {
        $("#continueGameButton").toggle()
        $("#beginButtonSubtitle").toggle()
        let formattedPlayers = game.players.toString().replaceAll(",", ", ")
        let rawDate = new Date(game.date)
        let formattedDate =
            rawDate.getFullYear() +
            "-" +
            (rawDate.getMonth() + 1 >= 10
                ? rawDate.getMonth() + 1
                : "0" + (rawDate.getMonth() + 1)) +
            "-" +
            (rawDate.getDate() >= 10
                ? rawDate.getDate()
                : "0" + rawDate.getDate()) +
            " " +
            rawDate.getHours() +
            ":" +
            (rawDate.getMinutes() >= 10
                ? rawDate.getMinutes()
                : "0" + rawDate.getMinutes())
        let board =
            game.board >= CUSTOM_BOARD_THRESHOLD
                ? settings.customBoards[game.board - CUSTOM_BOARD_THRESHOLD]
                : boards[game.board]
        $("#continueGameTableCellDateText").text(formattedDate)
        $("#continueGameTableCellBoardText").text(board.name)
        $("#continueGameTableCellPlayersText").text(formattedPlayers)

        $("#continueGameButton").on("click", function() {
            //Valorizza itemsArray
            itemsArray = board["characters"]
                .concat(board["weapons"])
                .concat(board["rooms"])
            if (game.board < CUSTOM_BOARD_THRESHOLD && game.lang !== userLang) {
                //Convert save to current language
                translateSaveGame()
            }
            //Fill
            $("#mainMenu").css("display", "none")
            clearInterval(languageInterval)
            swapUpperBar(settings.alternateInGameToolbar)
            $("#mainGame").css("display", "block")

            if (game.advancedCards.type && game.advancedCards.type !== "undefined") {
                $("#instructionModalSection9").show()
            } else {
                $("#instructionModalSection9").hide()
            }

            fillTable()
            updateTable()
            hideDustCounter(game.board !== 5 || settings.hideDustCounter)
        })
    } else {
        $("#beginButton").css("border-radius", "24px")
        $("#beginButton").css("text-transform", "none")
    }

    function translateSaveGame() {
        getFilteredTable().forEach((tableElement, index) => {
            tableElement.row = itemsArray[index]
        })
    }

    $(".debugButton").on("click", function() {
        console.log(game, settings)
    })

    //Install button (don't show if already in PWA)
    if (
        !(
            params.source === "pwa" ||
            window.matchMedia("(display-mode: standalone)").matches
        )
    ) {
        let deferredPrompt

        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault()
            deferredPrompt = e
        })

        $("#installButton").on("click", async () => {
            deferredPrompt.prompt()
            const { outcome } = await deferredPrompt.userChoice()
            deferredPrompt = null
        })
    } else {
        $("#installButton").hide()
    }

    $("#newGameButton").on("click", function() {
        //Rimuovi salvataggi non compatibili
        if (localStorage.getItem("date")) {
            localStorage.clear()
        }

        $("#mainMenu").css("display", "none")
        clearInterval(languageInterval)
        $("#setup").css("display", "block")
        game = {}
        game.board = 0
        itemsArray = boards[game.board]["characters"]
            .concat(boards[game.board]["weapons"])
            .concat(boards[game.board]["rooms"])
        localStorage.removeItem("game")

        //Populate Setup
        boards.forEach((board) => {
            let button = $("<button>").attr(
                "class",
                "small-button board-button",
            )
            button.text(board.name).attr("type", "button")
            button.on("click", function(event) {
                selectBoard(board.id, board.minPlayers, event)
            })
            $("#boardButtonContainer").append(button)
            if (board.id === 0) $(button).trigger("click")
        })

        updateFields()
    })

    $("#playerOrderModalLink").on("click", function() {
        $("#orderModal").toggle()
    })

    $("#mainMenuLanguageButton").on("click", function() {
        $("#languageModal").toggle()
    })

    $(".modal-back-button").on("click", function() {
        hideAndShowModal()
    })

    function selectBoard(id, minPlayers, event) {
        //Cambio colori
        $("#boardButtonContainer, #customizeBoardContainer")
            .find("*")
            .css("background-color", "var(--md-sys-color-secondary-container)")
            .css("color", "var(--md-sys-color-on-secondary-container)")
        $("#boardButtonContainer").find("*").data("selected", "false")
        if (event) {
            $(event.target).data("selected", "true")
            $(event.target)
                .css(
                    "background-color",
                    "var(--md-sys-color-tertiary-container)",
                )
                .css("color", "var(--md-sys-color-on-tertiary-container)")
        }

        game.board = id
        if (game.board < CUSTOM_BOARD_THRESHOLD) {
            itemsArray = boards[game.board]["characters"]
                .concat(boards[game.board]["weapons"])
                .concat(boards[game.board]["rooms"])
        } else {
            $("#playerNum").attr(
                "max",
                settings.customBoards[id - CUSTOM_BOARD_THRESHOLD].maxPlayers ||
                6,
            )
        }
        $("#playerNum").attr("min", minPlayers)
        $("#playerNum").val(3)
        updateRangeTooltip()
        updateFields()
    }

    function updateRangeTooltip() {
        $("#playerNumTooltip").text($("#playerNum").val())
    }

    const playerFields = {}

    function updateFields() {
        const val = $("#playerNum").val()
        $("#playerNumTooltip").text(val)

        //Get current name of fields, then populate
        let currentFields = $("#playerNameContainer input").length

        if (val <= currentFields) {
            //Remove fields
            for (let i = currentFields; i >= val; i--) {
                $("#playerNameContainer").children().last().remove()
            }
        } else {
            //Add fields
            for (let i = currentFields; i < val - 1; i++) {
                let fieldSection = $("<section>")
                let field = $("<input>").attr(
                    "class",
                    "setup-name setup-player",
                )
                field.attr("type", "search")
                field.attr("required", "required")
                field.attr("name", "player" + i)
                field.attr(
                    "pattern",
                    "[a-zA-Z0-9\u0080-\u024F\u1F300-\u1F5FF]+",
                )
                field.on("input", function() {
                    playerFields[i] = field.val()
                })
                field.val(playerFields[i])
                fieldSection.append(field, $("<br>"))
                $("#playerNameContainer").append(fieldSection)
            }
        }
    }

    function hideAndShowModal(selectorToShow) {
        $(".modal-wrapper").hide()
        selectorToShow && $(selectorToShow).show()
    }

    //Custom Board
    const buildCustomBoard = () => {
        //FIll itemsArray with values from the form
        let customBoardName = $("#customBoardName").val()
        let customBoardMaxPlayers = Number.parseInt(
            $("#customBoardMaxPlayersValue").val(),
        )
        let customCharacters = []
        for (let i = 0; i < customBoardSizes.Characters; i++) {
            customCharacters.push($("#customCharacters" + i).val())
        }
        let customWeapons = []
        for (let i = 0; i < customBoardSizes.Weapons; i++) {
            customWeapons.push($("#customWeapons" + i).val())
        }
        let customRooms = []
        for (let i = 0; i < customBoardSizes.Rooms; i++) {
            customRooms.push($("#customRooms" + i).val())
        }
        if (!settings.customBoards) {
            settings.customBoards = []
        }
        const boardToSave = {
            name: customBoardName,
            characters: customCharacters,
            weapons: customWeapons,
            rooms: customRooms,
            maxPlayers: customBoardMaxPlayers,
        }
        return boardToSave
    }

    const validateBoard = (board) => {
        let res = undefined
        if (_.find(settings.customBoards, (el) => _.isEqual(el, board))) {
            res = manualStrings.boardValidation.duplicate
        } else if (!board.name) {
            res = manualStrings.boardValidation.name
        } else if (!(board.characters && board.characters.length > 0)) {
            res = manualStrings.boardValidation.characters
        } else if (!(board.weapons && board.weapons.length > 0)) {
            res = manualStrings.boardValidation.weapons
        } else if (!(board.rooms && board.rooms.length > 0)) {
            res = manualStrings.boardValidation.rooms
        }
        return res
    }

    $("#customizeBoardButton").on("click", function(event) {
        updateCustomBoardList()
        $("#customBoardModal").show()
    })

    const getListFromArray = (array, id, ulClass, liClass) => {
        const ret = $("<ul>")
        id && $(ret).attr("id", id)
        ulClass && $(ret).attr("class", ulClass)
        array.forEach((item, index) => {
            const li = $("<li>").text(item)
            id && $(li).attr("id", id + "List" + index)
            liClass && $(li).attr("class", liClass)
            $(ret).append($(li))
        })
        return ret
    }

    const getBoardListElement = (
        board,
        index,
        elementId,
        addButtons,
        addCheckbox,
        expandable,
    ) => {
        const tbody = $(
            "<tbody class='custom-board-body' id='" + elementId + "Body'>",
        )
        const spanName = $("<span>").text(board.name)
        const tdName = $("<td colspan='4'>").append($(spanName))
        let trItemsExpanded
        if (expandable) {
            const expandButton = $(
                "<a class='material-symbols-outlined' id='" +
                elementId +
                "ExpandButton'>",
            )
                .text("expand_more")
                .on("click", function() {
                    const currentButton = $("#" + elementId + "ExpandButton")
                    $(currentButton).text(
                        $(currentButton).text() === "expand_more"
                            ? "expand_less"
                            : "expand_more",
                    )
                    $("#" + elementId + "Items").toggle()
                    $("#" + elementId + "ItemsExpanded").toggle()
                })
            const maxPlayersExpandedHeader = $(
                "<div class='items-expanded-div'>",
            ).append(
                $(emojiSpan).clone().text("group"),
                " ",
                manualStrings.customBoardTitles.maxPlayers,
                ": ",
                board.maxPlayers || 6,
            )
            const charactersExpandedHeader = $("<div>").append(
                $(emojiSpan).clone().text("person"),
                " ",
                manualStrings.customBoardTitles.characters,
            )
            const charactersExpandedList = $(
                "<div class='items-expanded-div'>",
            ).append($(getListFromArray(board.characters)))
            const weaponsExpandedHeader = $("<div>").append(
                $(emojiSpan).clone().text("syringe"),
                " ",
                manualStrings.customBoardTitles.weapons,
            )
            const weaponsExpandedList = $(
                "<div class='items-expanded-div'>",
            ).append($(getListFromArray(board.weapons)))
            const roomsExpandedHeader = $("<div>").append(
                $(emojiSpan).clone().text("house"),
                " ",
                manualStrings.customBoardTitles.rooms,
            )
            const roomsExpandedList = $(
                "<div class='items-expanded-div'>",
            ).append($(getListFromArray(board.rooms)))
            const cell = $(
                "<td class='items-expanded-cell' colspan='4' id='" +
                elementId +
                "ItemsExpandedList'>",
            ).append(
                $(maxPlayersExpandedHeader),
                $(charactersExpandedHeader),
                $(charactersExpandedList),
                $(weaponsExpandedHeader),
                $(weaponsExpandedList),
                $(roomsExpandedHeader),
                $(roomsExpandedList),
            )

            trItemsExpanded = $(
                "<tr id='" + elementId + "ItemsExpanded'>",
            ).append($(cell))
            $(tdName).append($(expandButton))
        }
        const trName = $(
            "<tr class='custom-board-name-row' id='" + elementId + "Name'>",
        )
        if (addCheckbox) {
            let checkboxDiv = $("<div>").addClass(
                "checkbox-wrapper-31 checkbox-wrapper-32",
            )

            let checkbox = $("<input>").attr("type", "checkbox")
            checkbox.attr("id", elementId + "Checkbox")
            checkbox.attr(
                "class",
                "table-header-checkbox board-import-checkbox",
            )
            checkbox.on("change", function() {
                if ($(this).is(":checked")) {
                    $("#" + elementId + "Body td, #" + elementId + "Body th")
                        .css(
                            "background-color",
                            "var(--md-sys-color-secondary-container",
                        )
                        .css(
                            "color",
                            "var(--md-sys-color-on-secondary-container",
                        )
                } else {
                    $("#" + elementId + "Body td, #" + elementId + "Body th")
                        .css("background-color", "")
                        .css("color", "")
                }
            })

            let checkboxCell = $("<th rowspan='2'>").attr(
                "class",
                "table-header-checkbox-cell",
            )
            checkboxCell.attr("scope", "row")
            checkboxDiv.append(checkbox, checkboxSvg)
            checkboxCell.append(checkboxDiv)
            $(trName).append($(checkboxCell))
        }
        $(trName).append($(tdName))

        const tdMaxPlayers = $("<td id='" + elementId + "MaxPlayers'>").append(
            $(emojiSpan).clone().text("group"),
            " ",
            board.maxPlayers || 6,
        )
        const tdCharacters = $("<td id='" + elementId + "Characters'>").append(
            $(emojiSpan).clone().text("person"),
            " ",
            board.characters.length,
        )
        const tdWeapons = $("<td id='" + elementId + "Weapons'>").append(
            $(emojiSpan).clone().text("syringe"),
            " ",
            board.weapons.length,
        )
        const tdRooms = $("<td id='" + elementId + "Rooms'>").append(
            $(emojiSpan).clone().text("house"),
            " ",
            board.rooms.length,
        )
        const trItems = $("<tr id='" + elementId + "Items'>").append(
            $(tdMaxPlayers),
            $(tdCharacters),
            $(tdWeapons),
            $(tdRooms),
        )

        $(tbody).append($(trName), $(trItems))

        if (expandable) {
            $(trItemsExpanded).hide()
            $(tbody).append($(trItemsExpanded))
        }

        if (addButtons) {
            const useButton = $(
                "<button class='small-button material-symbols-outlined' id='" +
                elementId +
                "Use'>",
            )
                .text("play_arrow")
                .attr("title", manualStrings.customBoardTitles.play)
                .on("click", function() {
                    chooseCustomBoard(index)
                })
            const editButton = $(
                "<button class='small-button material-symbols-outlined' id='" +
                elementId +
                "Edit'>",
            )
                .text("edit")
                .attr("title", manualStrings.customBoardTitles.edit)
                .on("click", function() {
                    editCustomBoard(index)
                })
            const exportButton = $(
                "<button class='small-button material-symbols-outlined' id='" +
                elementId +
                "Export'>",
            )
                .text("download")
                .attr("title", manualStrings.customBoardTitles.export)
                .on("click", function() {
                    exportCustomBoard(index)
                })
            const deleteButton = $(
                "<button class='small-button material-symbols-outlined' id='" +
                elementId +
                "Delete'>",
            )
                .text("delete")
                .attr("title", manualStrings.customBoardTitles.delete)
                .on("click", function() {
                    deleteCustomBoard(index)
                })
            const trButtons = $("<tr id='" + elementId + "Buttons'>").append(
                $("<td class='custom-board-button-cell' colspan='4'>").append(
                    $(useButton),
                    $(editButton),
                    $(exportButton),
                    $(deleteButton),
                ),
            )
            $(tbody).append($(trButtons))
        }

        return tbody
    }

    const emojiSpan = $("<span class='material-symbols-outlined'>")

    function updateCustomBoardList() {
        if (settings.customBoards && settings.customBoards.length > 0) {
            $("#exportAllBoardsButton").show()
            $("#customBoardLoadSection").empty()
            settings.customBoards.forEach((customBoard, index) => {
                $("#customBoardLoadSection").append(
                    $(
                        getBoardListElement(
                            customBoard,
                            index,
                            "customBoardLoad" + index,
                            true,
                            false,
                            true,
                        ),
                    ),
                )
            })
            $("#customBoardExistingSection").show()
        } else {
            $("#customBoardExistingSection").hide()
            $("#exportAllBoardsButton").hide()
        }
    }

    $("#newBoardButton").on("click", function() {
        $("#saveBoardButton").data("editing", "false")
        hideAndShowModal("#newBoardModal")
    })

    function chooseCustomBoard(id) {
        itemsArray = settings.customBoards[id]["characters"]
            .concat(settings.customBoards[id]["weapons"])
            .concat(settings.customBoards[id]["rooms"])
        selectBoard(CUSTOM_BOARD_THRESHOLD + id, 2)
        $("#customizeBoardButtonSubtitle").show()
        $("#customizeBoardButtonSubtitle").text(settings.customBoards[id].name)
        $("#customizeBoardButton").data("selected", "true")
        $("#customizeBoardButton, #customizeBoardButton > *")
            .css("background-color", "var(--md-sys-color-tertiary-container)")
            .css("color", "var(--md-sys-color-on-tertiary-container)")
        hideAndShowModal("#customizeBoardButtonSubtitle")
    }

    function editCustomBoard(id) {
        const boardToEdit = settings.customBoards[id]
        customBoardSizes.Characters = 0
        customBoardSizes.Weapons = 0
        customBoardSizes.Rooms = 0
        $("#customBoardName").val(boardToEdit.name)
        $("#customBoardCharacters").empty()
        $("#customBoardWeapons").empty()
        $("#customBoardRooms").empty()
        boardToEdit.characters.forEach((character) =>
            addFieldToSection("Characters", character),
        )
        boardToEdit.weapons.forEach((weapon) =>
            addFieldToSection("Weapons", weapon),
        )
        boardToEdit.rooms.forEach((room) => addFieldToSection("Rooms", room))
        $("#saveBoardButton").data("editing", id)
        hideAndShowModal("#newBoardModal")
    }

    $("#exportAllBoardsButton").on("click", function() {
        exportCustomBoard()
    })

    function exportCustomBoard(id) {
        let dataStr =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(
                JSON.stringify(
                    !_.isUndefined(id)
                        ? settings.customBoards[id]
                        : settings.customBoards,
                ),
            )
        let downloadAnchorNode = document.createElement("a")
        downloadAnchorNode.setAttribute("href", dataStr)
        downloadAnchorNode.setAttribute(
            "download",
            "Detective Notes Board" +
            (!_.isUndefined(id)
                ? " - " + settings.customBoards[id].name
                : "s") +
            ".board",
        )
        document.body.appendChild(downloadAnchorNode) // required for firefox
        downloadAnchorNode.click()
        downloadAnchorNode.remove()
    }

    function deleteCustomBoard(id) {
        $("#confirmationPromptTitle").text(
            manualStrings.customBoardDeleteModal.confirmationTitle,
        )
        $("#confirmationPromptSubtitle").text(
            manualStrings.customBoardDeleteModal.confirmationSubtitle,
        )
        $("#genericYes").on("click", function() {
            id === 0
                ? settings.customBoards.shift()
                : settings.customBoards.splice(id, 1)
            saveSettings()
            updateCustomBoardList()
            hideAndShowModal("#customBoardModal")
            $("#genericYes").off("click")
        })
        $("#genericNo").on("click", function() {
            hideAndShowModal("#customBoardModal")
            $("#genericNo").off("click")
        })
        hideAndShowModal("#confirmationModal")
    }

    $("#addCharacterToCustomBoardButton").on("click", function() {
        addFieldToSection("Characters")
    })

    $("#addWeaponToCustomBoardButton").on("click", function() {
        addFieldToSection("Weapons")
    })

    $("#addRoomToCustomBoardButton").on("click", function() {
        addFieldToSection("Rooms")
    })

    let customBoardSizes = {
        Characters: 0,
        Weapons: 0,
        Rooms: 0,
    }

    function addFieldToSection(container, text) {
        const id = "custom" + container + customBoardSizes[container]
        customBoardSizes[container]++

        const row = $("<tr>").attr("id", id + "Row")

        const numberCell = $("<th>")
            .text(customBoardSizes[container])
            .addClass("custom-table-num")
        const input = $("<input>")
            .attr("class", "setup-name")
            .attr("type", "text")
            .attr("name", id)
            .attr("pattern", "[a-zA-Z0-9\u0080-\u024F\u1F300-\u1F5FF]+")
            .attr("id", id)
        if (text) {
            $(input).val(text)
        }
        const deleteButton = $("<button>")
            .attr(
                "class",
                "small-button board-button material-symbols-outlined",
            )
            .text("delete")
            .attr("id", "delete" + id)
            .on("click", function() {
                $("#" + id + "Row").remove()
                customBoardSizes[container]--
                updateCustomBoardNumberCells()
            })
        const inputCell = $("<td>").html(input).addClass("custom-table-input")
        const deleteButtonCell = $("<td>")
            .html(deleteButton)
            .addClass("custom-table-del")

        row.append(numberCell, inputCell, deleteButtonCell)
        $("#customBoard" + container).append(row)
    }

    function updateCustomBoardNumberCells() {
        Object.keys(customBoardSizes).forEach((container) => {
            $("#customBoard" + container)
                .find(".custom-table-num")
                .each(function(index) {
                    $(this).text(index + 1)
                })
        })
    }

    $("#saveBoardButton").on("click", function() {
        const boardToSave = buildCustomBoard()
        const validation = validateBoard(boardToSave)
        if (!validation) {
            $("#boardValidationFailedMessage").hide()
            if ($("#saveBoardButton").data("editing") === "false") {
                settings.customBoards.push(boardToSave)
            } else {
                const id = $("#saveBoardButton").data("editing")
                settings.customBoards[id] = boardToSave
            }
            saveSettings()
            updateCustomBoardList()
            hideAndShowModal("#customBoardModal")
        } else {
            $("#boardValidationFailedMessage").text(validation)
            $("#boardValidationFailedMessage").show()
        }
    })

    $("#newBoardModalBackButton").on("click", function() {
        hideAndShowModal("#customBoardModal")
    })

    $("#customBoardModalBackButton").on("click", function() {
        hideAndShowModal()
    })

    $("#importBoardButton").on("click", function() {
        $("#fileValidationFailed").hide()
        $("#chooseBoardsToImportSection").hide()
        hideAndShowModal("#importBoardModal")
    })

    let parsedFile

    $("#fileInput").on("change", function(e) {
        $("#chooseBoardsToImportTable").empty()
        const reader = new FileReader()
        reader.onload = function(event) {
            parsedFile = JSON.parse(event.target.result)
            if (validateFile(parsedFile)) {
                $("#chooseBoardsToImportSection").show()
                //Popola la sezione di scelta dei tavoli
                parsedFile.forEach((board, index) => {
                    $("#chooseBoardsToImportTable").append(
                        $(
                            getBoardListElement(
                                board,
                                index,
                                "customBoardInput" + index,
                                false,
                                true,
                                true,
                            ),
                        ),
                    )
                })
            } else {
                $("#chooseBoardsToImportSection").hide()
                $("#fileValidationFailed").show()
            }
        }
        reader.readAsText(e.target.files[0])
    })

    const validateFile = (file) => {
        let ret = true
        file.forEach((board) => {
            ret = !!(
                board.name &&
                board.characters &&
                board.weapons &&
                board.rooms
            )
            if (!ret) {
                return
            }
        })
        return ret
    }

    $("#finalizeImportButton").on("click", function() {
        if ($(".board-import-checkbox").length !== 0) {
            $(".board-import-checkbox").each(function(index) {
                if ($(this).is(":checked")) {
                    settings.customBoards.push(parsedFile[index])
                }
            })
            $("#fileInput").val(null)
            saveSettings()
            updateCustomBoardList()
            hideAndShowModal("#customBoardModal")
        }
    })

    $("#importBoardModalBackButton").on("click", function() {
        hideAndShowModal("#customBoardModal")
    })

    //Dark mode

    if (window.matchMedia("(prefers-color-scheme)").media !== "not all") {
        if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            toggleDarkMode(false)
        }

        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", (event) => {
                toggleDarkMode(darkMode)
            })
    }

    $("#darkModeToggle, #darkModeToggleSetup, #mainMenuDarkModeButton").on(
        "click",
        function() {
            toggleDarkMode(darkMode)
        },
    )

    $("#darkMode").on("change", function() {
        toggleDarkMode(darkMode)
    })

    function toggleDarkMode(current) {
        $(".dark-mode-label").text(current ? "dark_mode" : "light_mode")
        // !current is new darkMode
        if (current) {
            //Set to light
            $(":root").removeClass("dark")
        } else {
            $(":root").addClass("dark")
        }
        darkMode = !current
        $("#darkMode").prop("checked", darkMode)
    }

    $("#advancedSettingsToggle, #advancedSettingsInGameToggle").on(
        "click",
        function() {
            if (game.board === 5) {
                $("#hideDustCounterSection").removeClass(
                    "advanced-settings-disabled",
                )
                $("#hideDustCounterText, #hideDustCounterDisabled").toggle()
            } else {
                $("#hideDustCounterSection").addClass(
                    "advanced-settings-disabled",
                )
            }
            $("#hideDustCounter").prop("disabled", game.board !== 5)
            $("#advancedSettingsModal").toggle()
        },
    )

    //Main menu buttons
    $("#mainMenuCreditsButton").on("click", function() {
        //Open credits modal
        $("#creditsModal").toggle()
    })

    $("#playerNum").on("input", function() {
        updateFields()
    })

    $("#longNamesCompatibilityMode").on("change", function() {
        saveSetting("longNamesCompatibilityMode", $(this).is(":checked"))
        changeLongNamesMode($(this).is(":checked"))
    })

    $("#autocomplete").on("change", function() {
        saveSetting("autocomplete", $(this).is(":checked"))
    })

    function changeLongNamesMode(shouldShowLongNames) {
        if (shouldShowLongNames) {
            $(".long-names-cell").show()
            $(".normal-names-cell").hide()
        } else {
            $(".long-names-cell").hide()
            $(".normal-names-cell").show()
        }
    }

    $("#hideDustCounter").on("change", function() {
        saveSetting("hideDustCounter", $(this).is(":checked"))
        hideDustCounter($(this).is(":checked"))
    })

    $("#alternateInGameToolbar").on("change", function() {
        saveSetting("alternateInGameToolbar", $(this).is(":checked"))
        swapUpperBar($(this).is(":checked"))
    })

    function hideDustCounter(shouldHide) {
        if (shouldHide) {
            $(
                ".dust-counter-box, .dust-counter-button, #instructionsModalSection6",
            ).hide()
        } else {
            $(".dust-counter-box").css("display", "flex")
            $(".dust-counter-button").show()
            $("#instructionsModalSection6").show()
            $(
                "#dustCounterValue, #dustCounterAltButton, #dustCounterButton",
            ).text(game.dustCounter)
        }
    }

    function swapUpperBar(shouldSwap) {
        if (shouldSwap) {
            $("#mainGameTableWrapper").addClass("alt-table")
            $("#mainGameUB")
                .detach()
                .insertAfter("#mainGameTableWrapper")
                .addClass("alt-toolbar")
            $("#dustCounterBox")
                .detach()
                .insertAfter("#mainGameTableWrapper")
                .addClass("alt-dust-counter")
        } else {
            $("#mainGameTableWrapper").removeClass("alt-table")
            $("#mainGameUB")
                .detach()
                .insertBefore("#mainGameTableWrapper")
                .removeClass("alt-toolbar")
            $("#dustCounterBox")
                .detach()
                .insertBefore("#mainGameTableWrapper")
                .removeClass("alt-dust-counter")
        }
    }

    $("#forceAssistantUpdate").on("change", function() {
        saveSetting("forceAssistantUpdate", $(this).is(":checked"))
    })

    $("#playerNameForm").on("submit", function(event) {
        event.preventDefault()

        //Salva le impostazioni dalla tabella
        saveSetting(
            "longNamesCompatibilityMode",
            $("#longNamesCompatibilityMode").is(":checked"),
        )
        saveSetting("hideDustCounter", $("#hideDustCounter").is(":checked"))
        saveSetting(
            "alternateInGameToolbar",
            $("#alternateInGameToolbar").is(":checked"),
        )
        saveSetting(
            "forceAssistantUpdate",
            $("#forceAssistantUpdate").is(":checked"),
        )
        saveSetting("autocomplete", $("#autocomplete").is(":checked"))

        toggleGlobalLockButton(false)
        saveGame()

        $("#setup").css("display", "none")
        swapUpperBar(settings.alternateInGameToolbar)
        $("#mainGame").css("display", "block")

        const playerArray = []
        $("#playerNameContainer input").each(function() {
            playerArray.push(this.value) // "this" is the current element in the loop
        })

        if (advancedCards.type && advancedCards.type !== "undefined") {
            $("#instructionModalSection9").show()
        } else {
            $("#instructionModalSection9").hide()
        }

        //Save data
        saveGameSetup(game.board, playerArray)
        setupTable()
        hideDustCounter(game.board !== 5 || settings.hideDustCounter)
        fillTable()
    })

    $("#dustCounterDown, #dustCounterAltDown").on("click", function() {
        $("#dustCounterValue, #dustCounterAltButton, #dustCounterButton").text(
            dustCounterDecrease(),
        )
    })

    $("#dustCounterUp, #dustCounterAltDown").on("click", function() {
        $("#dustCounterValue, #dustCounterAltButton, #dustCounterButton").text(
            dustCounterIncrease(),
        )
    })

    $("#dustCounterButton, #dustCounterAltButton").on("click", function() {
        const cur = $("#dustCounterBox").css("display") === "none"
        $("#dustCounterBox").css("display", cur ? "flex" : "none")
    })

    function showPlayerInfo(index) {
        const table = getFilteredTable()
        const playerItems = table.map(item => item.items[index])

        $("#playerInfoModalTitle").text(game.players[index])

        let total = Math.floor(table.length / game.players.length)
        if (game.advancedCards && game.advancedCards.type === "assign") total += game.advancedCards.players[index]
        $("#playerInfoTotalCounter").text(total)

        const yes = playerItems.filter(item => item === "check").length
        const maybe = playerItems.filter(item => item === "check" || item === "maybe").length

        const no = playerItems.filter(item => item === "cross").length
        const maybeNot = playerItems.filter(item => item === "cross" || item === "maybeNot").length

        $("#playerInfoYesCounter").text(yes)
        $("#playerInfoMaybeCounter").text(maybe)

        $("#playerInfoRemainingYesCounter").text(total-yes)
        $("#playerInfoRemainingMaybeCounter").text(total-maybe)

        $("#playerInfoNoCounter").text(no);
        $("#playerInfoMaybeNotCounter").text(maybeNot);

        hideAndShowModal("#playerInfoModal")
    }

    function fillTable() {
        if (game.players.length > 6) {
            $("html, body").css("overflow-x", "auto")
        }

        game.players.forEach((player, index) => {
            let cell = $("<th>").attr("class", "name-holder")
            cell.attr("scope", "col")
            const sideways = $("<span>").addClass("sideways").text(player)
            const initial = $("<span>").text(player.trim().charAt(0))
            const longDiv = $("<div class='long-names-cell'>").append(
                $(sideways),
                $("<br>"),
                $(initial),
            )
            const normalDiv = $("<div class='normal-names-cell'>").text(player)
            cell.append($(longDiv), $(normalDiv))
            game.advancedCards && game.advancedCards.type !== "undefined" && cell.on("click", () => showPlayerInfo(index))
            cell.css(
                "background-color",
                "var(--md-sys-color-secondary-container",
            )
            $("#tableRowPlayers").append(cell)
        })
        changeLongNamesMode(settings.longNamesCompatibilityMode)

        game.table.forEach((item, itemIndex) => {
            /*
                item (divider) = {divider: true, name: ''}
                item = {row, section, locked, items}
            */
            if (item.divider) {
                $("#tableHeader" + item.name).attr(
                    "colspan",
                    game.players.length + 2,
                )
            } else {
                let currentRow = $("<tr>").attr("class", "table-row")

                currentRow.append(getCheckboxCell(item.row))

                let header = $("<td>").attr("class", "table-header")
                header.attr("scope", "row")
                header.text(item.row)
                currentRow.append(header)

                game.players.forEach((player, index) => {
                    currentRow.append(
                        getCellLink(index, item.row, item.maybeCounter[index]),
                    )
                })

                $("#tableSection" + item.section).append(currentRow)
            }
        })
        saveGame()

        if (settings.showLessSymbols) {
            $("#selectionModalExtended").hide()
            $(".expand").text("expand_more")
            $("#showLessSymbolsText").text(manualStrings.showMoreSymbols)
        }
    }

    function updateTable() {
        //aggiorna header
        toggleGlobalLockButton(game.locked)
        saveGame()

        let table = getFilteredTable()
        //controlla se la casella è spuntata
        $(".cell-image-link").each(function() {
            let id = $(this).find("img").data("key").split(",") // id: i,j è itemsArray[i] players[j]
            let icon = table[id[0]].items[id[1]]
            $(this).find("img").attr("src", imageData[icon]).attr("class", icon)
            let counter = table[id[0]].maybeCounter[id[1]]
            $(this).find("span").text(counter)
            if (counter > 1 && icon === "maybe") {
                $(this).find("span").css("display", "block")
            }
        })
        //controlla se la riga è spuntata
        $("tr")
            .find(".table-header-checkbox-cell")
            .each(function() {
                let item = $(this).find("input").data("item")
                let index = itemsArray.indexOf(item)
                if (table[index].locked) {
                    $(this).find("input").prop("checked", true)
                    $(this)
                        .closest(".table-row")
                        .find("td > a")
                        .data("locked", "true")
                    $(this).closest(".table-row").addClass("locked")
                    $(this)
                        .closest(".table-row")
                        .css(
                            "background-color",
                            "var(--md-sys-color-error-container)",
                        )
                    $(this)
                        .closest(".table-row")
                        .css("color", "var(--md-sys-color-on-error-container)")
                }
            })
    }

    //Only show vertical long names at the top
    $("body").on("scroll", function() {
        if (settings.longNamesCompatibilityMode) {
            if ($("body").scrollTop() === 0) {
                $(".sideways").show(300)
            } else {
                $(".sideways").hide(300)
            }
        }
    })

    let toUpdate = undefined,
        oldID = undefined

    function getCellLink(playerNumber, item, maybeCounter) {
        let cell = $("<td>")
        let cellLink = $("<a>").attr("class", "cell-image-link")
        cellLink.attr("id", "cellLink")
        cellLink.data("locked", "false")
        cellLink.data("player", playerNumber.toString())
        cellLink.data("item", item)
        cellLink.on("click", function() {
            //Only if data-locked: false
            if ($(this).data("locked") === "false") {
                //Call selection modal
                oldID = $(this).find("img").attr("class")
                $("#selectionModal").toggle()
                toUpdate = $(this)
            }
        })
        let cellImage = $("<img>")
        cellImage.attr("src", "assets/icons/reset.svg")
        cellImage.attr("class", "reset")
        cellImage.data(
            "key",
            "" + itemsArray.indexOf(item) + "," + playerNumber,
        )
        cellImage.attr(
            "id",
            "cellImg" + playerNumber + "_" + itemsArray.indexOf(item),
        )
        let cellNumber = $(
            "<span id='cellNumber" +
            playerNumber +
            "_" +
            itemsArray.indexOf(item) +
            "' class='cell-number'>",
        )
            .data("player", playerNumber.toString())
            .data("item", itemsArray.indexOf(item))
            .text(maybeCounter)
            .css("display", "none")
        cellLink.append(cellImage, cellNumber)
        cell.append(cellLink)
        return cell
    }

    const checkboxSvg =
        "<svg viewBox=\"0 0 35.6 35.6\"><circle class=\"background\" cx=\"17.8\" cy=\"17.8\" r=\"17.8\"></circle><circle class=\"stroke\" cx=\"17.8\" cy=\"17.8\" r=\"14.37\"></circle><polyline class=\"checked\" points=\"11.78 18.12 15.55 22.23 25.17 12.87\"></polyline></svg>"

    function getCheckboxCell(item) {
        let checkboxDiv = $("<div>").addClass(
            "checkbox-wrapper-31 checkbox-wrapper-32",
        )

        let checkbox = $("<input>").attr("type", "checkbox")
        checkbox.attr("id", "rowCheckbox" + itemsArray.indexOf(item))
        checkbox.data("item", item)
        checkbox.attr("class", "table-header-checkbox")
        checkbox.on("change", function() {
            const oldRow = _.cloneDeep(
                getFilteredTable()[itemsArray.indexOf(item)].items,
            )
            const oldMaybeCounter = _.cloneDeep(
                getFilteredTable()[itemsArray.indexOf(item)].maybeCounter,
            )
            toggleLockRow(
                itemsArray.indexOf(item),
                $(this).is(":checked"),
                oldRow,
                oldMaybeCounter,
            )
            if ($(this).is(":checked")) {
                $(this)
                    .closest(".table-row")
                    .find("td > a")
                    .data("locked", "true")
                $(this).closest(".table-row").addClass("locked")
                $(this)
                    .closest(".table-row")
                    .css(
                        "background-color",
                        "var(--md-sys-color-error-container)",
                    )
                $(this)
                    .closest(".table-row")
                    .css("color", "var(--md-sys-color-on-error-container)")
                //Update symbols
                toUpdate = $(this)
                updateWholeRow("cross")
            } else {
                $(this)
                    .closest(".table-row")
                    .find("td > a")
                    .data("locked", "false")
                $(this).closest(".table-row").removeClass("locked")
                $(this).closest(".table-row").css("background-color", "")
                $(this).closest(".table-row").css("color", "")
                //Update symbols
                toUpdate = $(this)
                updateWholeRow("reset")
            }
        })

        let checkboxCell = $("<th>").attr("class", "table-header-checkbox-cell")
        checkboxCell.attr("scope", "row")
        checkboxDiv.append(checkbox, checkboxSvg)
        checkboxCell.append(checkboxDiv)
        return checkboxCell
    }

    //Toggle instructions modal
    $("#showInstructionsModal").on("click", function() {
        $("#instructionsModal").toggle()
    })

    //Lock cards
    $("#lockPersonalCards, #lockPersonalCardsAlt").on("click", function() {
        toggleGlobalLockButton()
    })

    function toggleGlobalLockButton(force) {
        let shouldLock = force !== undefined ? force : !game.locked
        toggleLockGlobal(shouldLock)
        if (shouldLock) {
            //if currently unlocked, locks cards
            $(".table-header-checkbox").each(function() {
                $(this).attr("disabled", "disabled")
            })
            $(
                "#lockPersonalCards, #lockPersonalCardsAlt, #lockPersonalCardsAltLabel, #lockPersonalCardsLabel",
            )
                .css("background-color", "var(--md-sys-color-error-container)")
                .css("color", "var(--md-sys-color-on-error-container)")
            $("#lockPersonalCardsLabel, #lockPersonalCardsAltLabel").text(
                "lock",
            )
        } else {
            //if currently locked, unlocks cards
            $(".table-header-checkbox").each(function() {
                $(this).removeAttr("disabled")
            })
            $(
                "#lockPersonalCards, #lockPersonalCardsAlt, #lockPersonalCardsAltLabel, #lockPersonalCardsLabel",
            )
                .css("background-color", "var(--md-sys-color-on-secondary)")
                .css("color", "var(--md-sys-color-secondary)")
            $("#lockPersonalCardsLabel, #lockPersonalCardsAltLabel").text(
                "lock_open_right",
            )
        }
    }

    //Hide extra symbols
    $("#showLessSymbolsCheckbox").on("change", function() {
        $("#selectionModalExtended").toggle()
        saveSetting("showLessSymbols", !settings.showLessSymbols)
        if (settings.showLessSymbols) {
            $(".expand").text("expand_more")
            $("#showLessSymbolsText").text(manualStrings.showMoreSymbols)
        } else {
            $(".expand").text("expand_less")
            $("#showLessSymbolsText").text(idStrings.showLessSymbolsText)
        }
    })

    //Autocomplete
    function updateWholeRow(id) {
        let rowName = itemsArray.indexOf(toUpdate.data("item"))
        game.players.forEach((player, i) => {
            saveItem(rowName, i, id)
            redrawFromData(rowName, i)
        })
    }

    //Select image
    $(".selection-modal-image").on("click", function() {
        const newID = $(this).attr("id")

        $("#selectionModal").toggle()

        //Aggiorna LocalData
        let rowName = itemsArray.indexOf(toUpdate.data("item"))
        let columnName = parseInt(toUpdate.data("player"))
        const oldRow = _.cloneDeep(getFilteredTable()[rowName].items)
        const oldMaybeCounter = _.cloneDeep(
            getFilteredTable()[rowName].maybeCounter,
        )

        //Crea azione
        const action = {
            type: "updateManual",
            subactions: [],
            newId: newID,
            oldId: oldRow[columnName],
            item: rowName,
            player: columnName,
        }

        //Se spunto e autocompl. ON, metti croci sulla riga
        if (newID === "check" && settings.autocomplete) {
            updateWholeRow("cross")
            action.subactions.push({
                type: "updateWholeRow",
                id: "cross",
                oldRow: oldRow,
                oldMaybeCounter: oldMaybeCounter,
            })
        } else if (
            oldID === "check" &&
            newID !== "check" &&
            settings.autocomplete
        ) {
            //Se tolgo spunta, metti reset
            updateWholeRow("reset")
            action.subactions.push({
                type: "updateWholeRow",
                id: "reset",
                oldRow: oldRow,
                oldMaybeCounter: oldMaybeCounter,
            })
        }

        action.subactions.push({
            type: "update",
            player: columnName,
            id: newID,
            oldId: getFilteredTable()[rowName].items[columnName],
            oldMaybeCounter: _.cloneDeep(
                getFilteredTable()[rowName].maybeCounter[columnName],
            ),
        })

        saveAction(action)

        saveItem(rowName, columnName, newID)
        redrawFromData(rowName, columnName)
    })

    // INSTRUCTIONS MODAL TOOLTIP
    $("#tooltipDebugButton").on("click", function() {
        generateTooltip()
    })

    function generateTooltip() {
        const tooltip = $("<div class='tooltip-wrapper'>").text("Tooltip text")
    }

    //INSTRUCTIONS MODAL IMAGE
    const instructionsUpdateTime = 2000

    //Image 1: Cards given
    const instructionsModalImage1 = [
        "shelves",
        "kitchen",
        "candle",
        "person",
        "dinner_dining",
        "chair",
    ]
    let im1Index = 0
    let im1Interval = window.setInterval(function() {
        if (im1Index === instructionsModalImage1.length) {
            im1Index = 0
        }
        $("#instructionsModalImage1, #instructionsModalImage2B").text(
            instructionsModalImage1[im1Index],
        )
        im1Index++
    }, instructionsUpdateTime)

    //Image 2: Check box
    let im2Interval = window.setInterval(function() {
        let isChecked = $("#fakeCheckbox").is(":checked")
        $("#fakeCheckbox").prop("checked", !isChecked)
        $(".fake-table")
            .css(
                "background-color",
                !isChecked ? "var(--md-sys-color-error-container)" : "",
            )
            .css(
                "color",
                !isChecked ? "var(--md-sys-color-on-error-container)" : "",
            )
    }, instructionsUpdateTime)

    //Image 3: Lock cards
    let im3Locked = false
    let im3Interval = window.setInterval(function() {
        im3Locked = !im3Locked
        //Change bg
        $("#fakeLockButton")
            .css(
                "background-color",
                im3Locked
                    ? "var(--md-sys-color-error-container)"
                    : "var(--md-sys-color-secondary-container)",
            )
            .css(
                "color",
                im3Locked
                    ? "var(--md-sys-color-on-error-container)"
                    : "var(--md-sys-color-on-secondary-container)",
            )
        //Change label
        $("#fakeLockButton").text(im3Locked ? "lock" : "lock_open_right")
    }, instructionsUpdateTime)

    // Assistant

    $("#assistantButton, #assistantAltButton").on("click", function() {
        hideAndShowModal("#assistantModal")
        clearAssistantForm()
        populateAssistantForm()
    })

    const assistantFormPlayersIDs = ["WhoAsked", "WhoAnswered"]
    const assistantFormItemsIDs = ["WhichCharacter", "WhichWeapon", "WhichRoom"]

    function clearAssistantForm() {
        assistantFormPlayersIDs.forEach((id) =>
            $("#assistant" + id + "Select").empty(),
        )
        assistantFormItemsIDs.forEach((id) =>
            $("#assistant" + id + "Select").empty(),
        )
        $("#assistantWhatAskedSelect").empty()
        $("#assistantConfirmError").hide()
    }

    function populateAssistantForm() {
        assistantFormPlayersIDs.forEach((id) => {
            $("#assistant" + id + "Select").append(
                $("<option value='player" + id + "Myself'>").text(
                    manualStrings.me,
                ),
            )
            game.players.forEach((player, index) => {
                const option = $(
                    "<option value='player" + id + index + "'>",
                ).text(player)
                $("#assistant" + id + "Select").append($(option))
            })
        })
        $(
            "#assistantWhoAnsweredSelect option[value='playerWhoAnsweredMyself']",
        ).attr("disabled", "disabled")
        getFilteredTable().forEach((tableElement, tableIndex) => {
            $(
                "#assistantWhich" + tableElement.section.slice(0, -1) + "Select",
            ).append(
                $("<option value='item" + tableIndex + "'>").text(
                    tableElement.row,
                ),
            )
        })
        $("#assistantWhoAnsweredSelect").append(
            $("<option value='playerWhoAnsweredNobody'>").text(
                manualStrings.nobody,
            ),
        )
    }

    $("#assistantWhoAskedSelect").on("change", function() {
        const selectedId = $("#assistantWhoAskedSelect").find(":selected").val()
        $("#assistantWhoAnsweredSelect").find("*").removeAttr("disabled")
        $(
            "#assistantWhoAnsweredSelect option[value='" +
            selectedId.replace("WhoAsked", "WhoAnswered") +
            "']",
        ).attr("disabled", "disabled")
    })

    $("#assistantForm").on("submit", function(e) {
        e.preventDefault()
        /*
            Valida:
            WhoAsked e WhoAnswered non possono essere uguali.

            Elabora:
            Sovrascrivi i reset e i forse no con croci per i giocatori tra WhoAsked e WhoAnswered.
            Sovrascrivi i reset con forse sì per WhoAnswered.
            Aumenta di uno i forse sì per WhoAnsered.
            Memorizza i WhoAnswered.
            
            In futuro:
            Tieni traccia di quante carte ogni giocatore ha e segna la spunta se è l'unica opzione.
        */
        let whoAsked = $("#assistantWhoAskedSelect")
            .find(":selected")
            .val()
            .replace("playerWhoAsked", "")
        whoAsked = whoAsked !== "Myself" ? Number.parseInt(whoAsked) : -1
        const whichCharacter = Number.parseInt(
            $("#assistantWhichCharacterSelect")
                .find(":selected")
                .val()
                .replace("item", ""),
        )
        const whichWeapon = Number.parseInt(
            $("#assistantWhichWeaponSelect")
                .find(":selected")
                .val()
                .replace("item", ""),
        )
        const whichRoom = Number.parseInt(
            $("#assistantWhichRoomSelect")
                .find(":selected")
                .val()
                .replace("item", ""),
        )
        const whichItems = [whichCharacter, whichWeapon, whichRoom]
        let whoAnswered = $("#assistantWhoAnsweredSelect")
            .find(":selected")
            .val()
            .replace("playerWhoAnswered", "")
        if (whoAnswered === "Myself") {
            whoAnswered = -1
        } else if (whoAnswered === "Nobody") {
            whoAnswered = game.players.length
        } else {
            whoAnswered = Number.parseInt(whoAnswered)
        }

        //Valida
        if (whoAsked === whoAnswered) {
            $("#assistantConfirmError").show()
            return
        }
        $("#assistantConfirmError").hide()

        //Crea azione
        const action = {
            type: "updateAssistant",
            subactions: [],
            items: whichItems,
            whoAsked: whoAsked,
            whoAnswered: whoAnswered,
        }

        //Elabora
        whichItems.forEach((item) => {
            if (!getFilteredTable()[item].locked) {
                if (whoAsked < whoAnswered) {
                    for (let i = whoAsked + 1; i < whoAnswered; i++) {
                        if (
                            getFilteredTable()[item].items[i] === "reset" ||
                            settings.forceAssistantUpdate
                        ) {
                            action.subactions.push({
                                type: "assistantCross",
                                item: item,
                                player: i,
                                oldId: getFilteredTable()[item].items[i],
                                oldMaybeCounter:
                                    getFilteredTable()[item].maybeCounter[i],
                            })
                            assistantCross(i, item)
                        }
                    }
                } else {
                    for (let i = whoAsked + 1; i < game.players.length; i++) {
                        if (
                            getFilteredTable()[item].items[i] === "reset" ||
                            settings.forceAssistantUpdate
                        ) {
                            action.subactions.push({
                                type: "assistantCross",
                                item: item,
                                player: i,
                                oldId: getFilteredTable()[item].items[i],
                                oldMaybeCounter:
                                    getFilteredTable()[item].maybeCounter[i],
                            })
                            assistantCross(i, item)
                        }
                    }
                    for (let i = 0; i < whoAnswered; i++) {
                        if (
                            getFilteredTable()[item].items[i] === "reset" ||
                            settings.forceAssistantUpdate
                        ) {
                            action.subactions.push({
                                type: "assistantCross",
                                item: item,
                                player: i,
                                oldId: getFilteredTable()[item].items[i],
                            })
                            assistantCross(i, item)
                        }
                    }
                }

                if (
                    whoAnswered !== -1 &&
                    whoAnswered < game.players.length &&
                    (getFilteredTable()[item].items[whoAnswered] === "reset" ||
                        getFilteredTable()[item].items[whoAnswered] ===
                        "maybe" ||
                        settings.forceAssistantUpdate)
                ) {
                    action.subactions.push({
                        type: "assistantMaybe",
                        item: item,
                        player: whoAnswered,
                        maybeCounter:
                            getFilteredTable()[item].maybeCounter[whoAnswered],
                        oldId: getFilteredTable()[item].items[whoAnswered],
                    })
                    if (
                        getFilteredTable()[item].items[whoAnswered] === "maybe"
                    ) {
                        getFilteredTable()[item].maybeCounter[whoAnswered]++
                    } else {
                        getFilteredTable()[item].items[whoAnswered] = "maybe"
                        getFilteredTable()[item].maybeCounter[whoAnswered] = 1
                    }
                    redrawFromData(item, whoAnswered)
                }
            }
        })

        saveAction(action)

        saveGame()
        hideAndShowModal()
    })

    function assistantCross(i, item) {
        getFilteredTable()[item].items[i] = "cross"
        getFilteredTable()[item].maybeCounter[i] = 0
        redrawFromData(item, i)
    }

    // HISTORY

    $("#undoButton, #redoButton").on("contextmenu", function(e) {
        e.preventDefault()
        fillHistoryModal()
        hideAndShowModal("#actionHistoryModal")
    })

    function fillHistoryModal() {
        $("#actionHistorySection").empty()
        $("#actionConfirmSection").hide()
        if (!game.history || game.history.length === 0) {
            $("#actionHistorySectionEmpty").show()
        } else {
            $("#actionHistorySectionEmpty").hide()
            _.forEachRight(game.history, (action, index) => {
                $("#actionHistorySection").append(drawAction(index, action))
            })
        }
    }

    function onActionHover(index) {
        // Mouse enter
        if (game.historyIndex <= index) {
            // Redo
            for (let i = 0; i < game.historyIndex; i++) {
                $("#actionContainer" + i).removeClass(
                    "action-hovering-undo action-hovering-redo",
                )
            }
            for (let i = game.historyIndex; i <= index; i++) {
                $("#actionContainer" + i).addClass("action-hovering-redo")
            }
            for (let i = index + 1; i < game.history.length; i++) {
                $("#actionContainer" + i).removeClass(
                    "action-hovering-undo action-hovering-redo",
                )
            }
        } else {
            // Undo
            for (let i = 0; i < index; i++) {
                $("#actionContainer" + i).removeClass(
                    "action-hovering-undo action-hovering-redo",
                )
            }
            for (let i = index; i < game.historyIndex; i++) {
                $("#actionContainer" + i).addClass("action-hovering-undo")
            }
            for (let i = game.historyIndex; i < game.history.length; i++) {
                $("#actionContainer" + i).removeClass(
                    "action-hovering-undo action-hovering-redo",
                )
            }
        }
    }

    function batchUndoRedo(index) {
        if (game.historyIndex <= index) {
            for (let i = game.historyIndex; i <= index; i++) {
                redoAction(game.history[i])
            }
        } else {
            for (let i = game.historyIndex - 1; i >= index; i--) {
                undoAction(game.history[i])
            }
        }
        hideAndShowModal()
    }

    function getActionConfirmPrompt(index) {
        let ret
        if (game.historyIndex <= index) {
            ret = manualStrings.actionHistoryModal.confirmationPrompt[
                $(".action-hovering-redo").length === 1
                    ? "singleRedo"
                    : "batchRedo"
                ].replace("[NUM]", $(".action-hovering-redo").length)
        } else {
            ret = manualStrings.actionHistoryModal.confirmationPrompt[
                $(".action-hovering-undo").length === 1
                    ? "singleUndo"
                    : "batchUndo"
                ].replace("[NUM]", $(".action-hovering-undo").length)
        }
        return ret
    }

    function drawAction(index, action) {
        const container = $("<div class='action-container'>")
            .on("mouseenter", function() {
                onActionHover(index)
            })
            .on("mouseleave", function() {
                // Mouse leave
                game.history.forEach((action, i) => {
                    $("#actionContainer" + i).removeClass(
                        "action-hovering-undo action-hovering-redo",
                    )
                })
            })
            .on("click", function() {
                $("#actionConfirmText").text(getActionConfirmPrompt(index))
                $("#actionConfirmSection").show()
                $("#actionConfirmButton").on("click", function() {
                    batchUndoRedo(index)
                })
            })
            .on("contextmenu", function(e) {
                //Confirmation, then delete
                e.preventDefault()
                $(container).prop("onclick", null)
                $(subtitleContainer).hide()
                $(deletePromptContainer).show()
            })
            .attr("id", "actionContainer" + index)

        if (index >= game.historyIndex) {
            $(container).addClass("undone")
        }

        const titleContainer = $("<div class='setup-text action-title'>")
        const iconContainer = $("<span class='small-button action-title-icon'>")
        const icon = $("<span class='material-icons-outlined'>")
        const title = $("<span>")
        const subtitleContainer = $(
            "<div class='setup-tooltip action-subtitle'>",
        )
        const deletePromptContainer = getActionDeletePrompt(index)

        switch (action.type) {
            case "updateManual":
                $(icon).text("add_circle_outline")
                $(title).text(manualStrings.actionHistoryModal.updateManual)
                const oldId =
                    "<img src='" +
                    imageData[action.oldId] +
                    "' class='action-icon " +
                    action.oldId +
                    "'>"
                const newId =
                    "<img src='" +
                    imageData[action.newId] +
                    "' class='action-icon " +
                    action.newId +
                    "'>"
                $(subtitleContainer).html(
                    manualStrings.actionHistoryModal.updateManualText
                        .replace("[ITEM]", getFilteredTable()[action.item].row)
                        .replace("[OLDID]", oldId)
                        .replace("[NEWID]", newId)
                        .replace("[PLAYER]", game.players[action.player]),
                )
                break
            case "updateAssistant":
                $(icon).text("auto_awesome")
                $(title).text(manualStrings.actionHistoryModal.updateAssistant)
                $(subtitleContainer).html(getFormattedUpdateAssistant(action))
                break
            case "lockItem":
                $(icon).text("lock")
                $(title).text(manualStrings.actionHistoryModal.lockItem)
                $(subtitleContainer).html(
                    manualStrings.actionHistoryModal.locked.replace(
                        "[ITEM]",
                        getFilteredTable()[action.item].row,
                    ),
                )
                break
            case "unlockItem":
                $(icon).text("lock_open")
                $(title).text(manualStrings.actionHistoryModal.unlockItem)
                $(subtitleContainer).html(
                    manualStrings.actionHistoryModal.unlocked.replace(
                        "[ITEM]",
                        getFilteredTable()[action.item].row,
                    ),
                )
                break
        }

        $(iconContainer).append(index, $(icon))
        $(titleContainer).append($(iconContainer), $(title))
        $(deletePromptContainer).hide()
        $(container).append(
            $(titleContainer),
            $(subtitleContainer),
            $(deletePromptContainer),
        )

        return container
    }

    function getActionDeletePrompt(index) {
        const ret = $("<div class='setup-tooltip action-subtitle'>")
        const text = $("<span>").text(
            manualStrings.actionHistoryModal.deletePrompt,
        )
        const yesButton = $(
            "<button class='small-button material-icons-outlined board-button action-title-icon'>",
        )
            .text("done")
            .on("click", function() {
                game.history.splice(index, 1)
                if (index < game.historyIndex) {
                    game.historyIndex--
                }
                saveGame()
                fillHistoryModal()
            })
        const noButton = $(
            "<button class='small-button material-icons-outlined board-button action-title-icon'>",
        )
            .text("close")
            .on("click", function() {
                fillHistoryModal()
            })

        $(ret).append($(text), $(yesButton), $(noButton))
        return ret
    }

    function getFormattedUpdateAssistant(action) {
        let ret

        if (manualStrings.actionHistoryModal.updateAssistantTextCustom) {
            //Usa formattazione personalizzata
            if (
                action.whoAsked === -1 &&
                action.whoAnswered >= game.players.length
            ) {
                //Il giocatore ha chiesto, nessuno ha risposto
                ret =
                    manualStrings.actionHistoryModal.updateAssistantTextCustom
                        .playerAskedNobodyAnswered
            } else if (action.whoAsked === -1) {
                //Il giocatore ha chiesto
                ret =
                    manualStrings.actionHistoryModal.updateAssistantTextCustom
                        .playerAsked
                ret = ret.replace(
                    "[WHOANSWERED]",
                    game.players[action.whoAnswered],
                )
            } else if (action.whoAnswered === -1) {
                //Il giocatore ha risposto
                ret =
                    manualStrings.actionHistoryModal.updateAssistantTextCustom
                        .playerAnswered
                ret = ret.replace("[WHOASKED]", game.players[action.whoAsked])
                ret = ret.replace("[WHOANSWERED]", manualStrings.you)
            } else if (action.whoAnswered >= game.players.length) {
                // Nessuno ha risposto
                ret =
                    manualStrings.actionHistoryModal.updateAssistantTextCustom
                        .nobodyAnswered
                ret = ret.replace("[WHOASKED]", game.players[action.whoAsked])
                ret = ret.replace("[WHOANSWERED]", manualStrings.nobody)
            } else {
                // Predefinito
                ret = manualStrings.actionHistoryModal.updateAssistantText
                ret = ret.replace("[WHOASKED]", game.players[action.whoAsked])
                ret = ret.replace(
                    "[WHOANSWERED]",
                    game.players[action.whoAnswered],
                )
            }
        } else {
            //Usa formattazione normale.
            ret = manualStrings.actionHistoryModal.updateAssistantText
            ret = ret.replace(
                "[WHOASKED]",
                action.whoAsked === -1
                    ? manualStrings.you
                    : game.players[action.whoAsked],
            )
            if (action.whoAnswered === -1) {
                ret = ret.replace("[WHOANSWERED]", manualStrings.you)
            } else if (action.whoAnswered >= game.players.length) {
                ret = ret.replace("[WHOANSWERED]", manualStrings.nobody)
            } else {
                ret = ret.replace(
                    "[WHOANSWERED]",
                    game.players[action.whoAnswered],
                )
            }
        }

        action.items.forEach((item, index) => {
            ret = ret.replace(
                "[ITEM" + index + "]",
                getFilteredTable()[item].row,
            )
        })

        return ret
    }

    $("#continueToAdvancedSetup").on("click", function() {
        // [NUMCARDS] carte.<br>Con [NUMPLAYERS] giocatori, ognunə riceverà [NUMCARDS] carte.<br>Cosa facciamo con le [NUMLEFTOVER]
        const oldText = idStrings.cardConfigurationDescription
        const board = boards[game.board]
        const numCards =
            board.characters.length + board.weapons.length + board.rooms.length
        const numPlayers = $("#playerNum").val()
        const numEach = Math.floor(numCards / numPlayers)
        const numLeftover = numCards % numPlayers
        leftoverCards = numLeftover
        leftoverCardsToAssign = numLeftover

        const newText = oldText
            .replace("[NUMCARDS]", numCards)
            .replace("[NUMPLAYERS]", numPlayers)
            .replace("[NUMEACH]", numEach)
        $("#cardConfigurationDescription").html(newText)

        const oldEnabledText = idStrings.cardConfigurationEnabledDescription
        $("#cardConfigurationEnabledDescription").html(
            oldEnabledText.replace("[NUMLEFTOVER]", numLeftover),
        )
        if (numLeftover) {
            $("#cardConfigurationDisabled").hide()
            $("#cardConfigurationEnabled").show()
            $(
                "#cardConfigurationCommonText, #cardConfigurationAssignText",
            ).hide()
        } else {
            $("#cardConfigurationDisabled").show()
            $("#cardConfigurationEnabled").hide()
        }
        advancedCards &&
        advancedCards.type === "assign" &&
        updateLeftoverCardsAssign()
        hideAndShowModal("#advancedSetupModal")
    })

    $("#cardConfigurationCommon").on("click", function() {
        $("#cardConfigurationAssignText").hide()
        $("#cardConfigurationCommonText").show()
        $("#cardConfigurationAssign")
            .css("background-color", "var(--md-sys-color-secondary-container)")
            .css("color", "var(--md-sys-color-on-secondary-container)")
        $("#cardConfigurationCommon")
            .css("background-color", "var(--md-sys-color-tertiary-container)")
            .css("color", "var(--md-sys-color-on-tertiary-container)")
        advancedCards = { type: "common" }
    })

    let leftoverCards
    let leftoverCardsToAssign

    $("#cardConfigurationAssign").on("click", function() {
        $("#cardConfigurationAssignText").show()
        $("#cardConfigurationCommonText").hide()
        $("#cardConfigurationCommon")
            .css("background-color", "var(--md-sys-color-secondary-container)")
            .css("color", "var(--md-sys-color-on-secondary-container)")
        $("#cardConfigurationAssign")
            .css("background-color", "var(--md-sys-color-tertiary-container)")
            .css("color", "var(--md-sys-color-on-tertiary-container)")
        advancedCards = { type: "assign", players: [] }
        updateLeftoverCardsAssign()
    })

    function updateLeftoverCardsAssign() {
        $("#cardConfigurationCommonSection").empty()
        $(".setup-player").each((index, el) => {
            const value = $(el).val()
            advancedCards.players[index] = 0
            const wrapper = $("<div>").addClass("setup-text")
            const player = $("<span>").text(
                value.length ? value : manualStrings.player + " " + (index + 1),
            )
            const minusButton = $("<button>")
                .addClass("small-button material-symbols-outlined")
                .on("click", () => {
                    if (advancedCards.players[index]) {
                        advancedCards.players[index]--
                        leftoverCardsToAssign++
                    }
                    $("#leftoverCards" + index).text(
                        advancedCards.players[index],
                    )
                })
                .text("remove_circle")
            const plusButton = $("<button>")
                .addClass("small-button material-symbols-outlined")
                .on("click", () => {
                    if (leftoverCardsToAssign) {
                        advancedCards.players[index]++
                        leftoverCardsToAssign--
                    }
                    $("#leftoverCards" + index).text(
                        advancedCards.players[index],
                    )
                })
                .text("add_circle")
            const number = $("<span id='leftoverCards" + index + "'>").text(
                advancedCards.players[index],
            )
            $(wrapper).append(
                $(player),
                $(minusButton),
                $(number),
                $(plusButton),
            )
            $("#cardConfigurationCommonSection").append($(wrapper))
        })
    }

    $("#closeAdvancedSetupButton").on("click", function () {
        hideAndShowModal()
    })
})
