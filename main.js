import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js'
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js'
import { stringsEN, boardsEN, letsPlayEN, incompatibleTextEN, customBoardButtonsEN, boardValidationErrorsEN } from './strings-en.js'
import { stringsIT, boardsIT, letsPlayIT, incompatibleTextIT, customBoardButtonsIT, boardValidationErrorsIT } from './strings-it.js'


let _APP = null

let locked = false

$(document).ready(function () {
    'use strict'

    const cameraPositions = [
        [0, 60, 0],
        [10, 15, 10],
        [0, 0, 40],
        [40, 15, 40],
        [15, 50, 15],
        [15, 50, 50],
        [30, 30, 30]
    ]

    function getCameraPosition() {
        return cameraPositions[Math.floor(Math.random() * cameraPositions.length)]
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

            const modelDiv = document.getElementById('model')
            modelDiv.appendChild(this._threejs.domElement)

            this._threejs.setSize(modelDiv.offsetWidth, modelDiv.offsetHeight)

            window.addEventListener('resize', () => {
                this._OnWindowResize()
            }, false)

            const fov = 60
            const aspect = modelDiv.offsetWidth / modelDiv.offsetHeight
            const near = 1.0
            const far = 1000.0
            this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
            const chosenPosition = getCameraPosition()
            this._camera.position.set(chosenPosition[0], chosenPosition[1], chosenPosition[2])

            this._scene = new THREE.Scene()

            let light = new THREE.DirectionalLight(0xFFFFFF)
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

            light = new THREE.AmbientLight(0xFFFFFF)
            this._scene.add(light)

            this._controls = new OrbitControls(this._camera, this._threejs.domElement)
            this._controls.target.set(0, 10, 0)
            this._controls.maxDistance = 80
            this._controls.minDistance = 1
            this._controls.autoRotate = true
            this._controls.autoRotateSpeed = 2
            this._controls.enableDamping = true
            this._controls.update()

            this._camera.lookAt(this._scene.position)

            const loadingManager = new THREE.LoadingManager()

            loadingManager.onLoad = function () {
                doneLoading()
            }

            $("#skipLoading").on("click", doneLoading)

            loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
                $("#progressBar").val(itemsLoaded / itemsTotal * 100)
            }

            loadingManager.onError = function (url) {
                console.log('There was an error loading ' + url)
                doneLoading()
            }

            const loader = new GLTFLoader(loadingManager)
            loader.setPath('./3d/')
            loader.load('scene.gltf', (gltf) => {
                //gltf.scale.setScalar(0.1)
                gltf.scene.scale.set(0.05, 0.05, 0.05)
                gltf.scene.traverse(c => {
                    c.castShadow = true
                })
                this._scene.add(gltf.scene)
            })

            function doneLoading() {
                $("#loadingScreen").fadeOut(1000)
                checkIncompatibleSave()
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
                this._mixers.map(m => m.update(timeElapsedS))
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

    //Dark mode

    const colors = {
        darkBlue: "#274161",
        white: "white",
        lightBlue: "#2CB6E3",
        lightRed: "#ff9185",
        darkRed: "#6b2a22",
        black: "black",
        green: "#36a655",
        grey: "#ccc",
        darkGrey: "rgb(25, 25, 25)",
        lightGrey: "rgb(230, 230, 230)",
        lightSemitransparentWhite: "rgba(255, 255, 255, 0.86)",
        darkSemitransparentWhite: "rgba(0, 0, 0, 0.86)",
        darkInvertFilter: "invert(1)",
        lightInvertFilter: "invert(0)"
    }

    const currentColors = {
        darkBlue: {
            current: 'std',
            std: colors.darkBlue,
            alt: colors.lightBlue
        },
        lightBlue: {
            current: 'std',
            std: colors.lightBlue,
            alt: colors.darkBlue
        },
        darkRed: {
            current: 'std',
            std: colors.darkRed,
            alt: colors.lightRed
        },
        lightRed: {
            current: 'std',
            std: colors.lightRed,
            alt: colors.darkRed
        },
        white: {
            current: 'std',
            std: colors.white,
            alt: colors.black
        },
        black: {
            current: 'std',
            std: colors.black,
            alt: colors.white
        },
        darkGrey: {
            current: 'std',
            std: colors.darkGrey,
            alt: colors.lightGrey
        },
        lightGrey: {
            current: 'std',
            std: colors.lightGrey,
            alt: colors.darkGrey
        },
        lightSemitransparentWhite: {
            current: 'std',
            std: colors.lightSemitransparentWhite,
            alt: colors.darkSemitransparentWhite
        },
        darkSemitransparentWhite: {
            current: 'std',
            std: colors.darkSemitransparentWhite,
            alt: colors.lightSemitransparentWhite
        },
        darkInvertFilter: {
            current: 'std',
            std: colors.darkInvertFilter,
            alt: colors.lightInvertFilter
        },
        lightInvertFilter: {
            current: 'std',
            std: colors.lightInvertFilter,
            alt: colors.darkInvertFilter
        }
    }

    //Language
    let userLang = navigator.language || navigator.userLanguage
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    })
    let forcedLang = params.lang
    if (forcedLang && forcedLang.toLowerCase() == "it") {
        $("html").attr("lang", "it")
        userLang = "it-IT"
    } else if (forcedLang && forcedLang.toLowerCase() == "en") {
        userLang = "en-US"
    }
    let strings, boards, letsPlay, incompatibleText, customBoardButtons, boardValidationErrors
    let itemsArray
    const imageData = {
        "check": "assets/icons/check.svg",
        "maybe": "assets/icons/check.svg",
        "cross": "assets/icons/cross.svg",
        "maybeNot": "assets/icons/cross.svg",
        "reset": "assets/icons/reset.svg",
        "star": "assets/icons/star.svg",
        "question": "assets/icons/question.svg",
        "exclamation": "assets/icons/exclamation.svg",
        "flag": "assets/icons/flag.svg",
        "skip": "assets/icons/skip.svg"
    }

    switch (userLang) {
        case "it-IT": {
            strings = stringsIT
            boards = boardsIT
            letsPlay = letsPlayIT
            incompatibleText = incompatibleTextIT
            customBoardButtons = customBoardButtonsIT
            boardValidationErrors = boardValidationErrorsIT
            break
        }
        default: {
            strings = stringsEN
            boards = boardsEN
            letsPlay = letsPlayEN
            incompatibleText = incompatibleTextEN
            customBoardButtons = customBoardButtonsEN
            boardValidationErrors = boardValidationErrorsEN
            break
        }
    }

    let game = {}

    const CUSTOM_BOARD_THRESHOLD = 100 //board.id = 110 diventa customBoards[110-100 = 10]

    let settings = {
        longNamesCompatibilityMode: false,
        alternateInGameToolbar: false,
        hideDustCounter: false,
        autocomplete: true
    }

    function saveGame() {
        game.date = Date.now()
        localStorage.setItem("game", JSON.stringify(game))
    }

    function saveSetting(key, val) {
        settings[key] = val
        saveSettings() //Testato!
    }

    function saveGameSetup(board, players) {
        game.board = board
        game.players = players
        game.locked = false
        saveGame()
    }

    function saveItem(row, player, item) {
        getFilteredTable()[row].items[player] = item
        saveGame()
    }

    function toggleLockRow(row, force) {
        getFilteredTable()[row].locked = force || !getFilteredTable()[row].locked
        saveGame()
    }

    function setupTable() {
        game.table = []
        if (game.board === 5) {
            game.dustCounter = 12
        }
        let board = game.board >= CUSTOM_BOARD_THRESHOLD ? settings.customBoards[game.board - CUSTOM_BOARD_THRESHOLD] : boards[game.board]
        game.table.push({ divider: true, name: 'Characters' })
        board.characters.forEach(character => {
            game.table.push({ row: character, section: 'Characters', locked: false, items: Array(game.players.length).fill('reset') })
        })
        game.table.push({ divider: true, name: 'Weapons' })
        board.weapons.forEach(weapon => {
            game.table.push({ row: weapon, section: 'Weapons', locked: false, items: Array(game.players.length).fill('reset') })
        })
        game.table.push({ divider: true, name: 'Rooms' })
        board.rooms.forEach(room => {
            game.table.push({ row: room, section: 'Rooms', locked: false, items: Array(game.players.length).fill('reset') })
        })
        saveGame()
    }

    const getFilteredTable = function () {
        return game.table.filter(el => !el.divider)
    }

    function toggleLockGlobal(force) {
        game.locked = force || !game.locked
        saveGame()
    }

    const dustCounterIncrease = function () {
        if (game.board === 5) {
            game.dustCounter++
            saveGame()
        }
        return game.dustCounter
    }

    const dustCounterDecrease = function () {
        if (game.board === 5) {
            game.dustCounter--
            saveGame()
        }
        return game.dustCounter
    }

    function saveSettings() {
        localStorage.setItem("settings", JSON.stringify(settings)) //Testato!
    }

    function loadGame() {
        game = JSON.parse(localStorage.getItem("game")) || {}
    }

    function loadSettings() {
        settings = JSON.parse(localStorage.getItem("settings")) || {
            longNamesCompatibilityMode: false,
            alternateInGameToolbar: false,
            hideDustCounter: false,
            autocomplete: true
        }
    }

    //Detect language, load strings
    let stringKeys = Object.keys(strings)
    stringKeys.forEach((key) => {
        //console.log(key)
        document.getElementById(key).innerHTML = strings[key]
    })
    $("#startGame").attr("value", letsPlay)

    const languageLabels = ["Switch language", "Cambia lingua"]
    let languageIndex = 0
    let languageInterval = window.setInterval(function () {
        if (languageIndex == languageLabels.length) {
            languageIndex = 0
        }
        $(".language-label").text(languageLabels[languageIndex])
        languageIndex++
    }, 2000)

    function swapUpperBar() {
        $("#mainGameUB").hide()
        $("#alternateToolbar").show()
        if (game.board === 5 && !settings.hideDustCounter) {
            $("#dustCounterBox").detach().insertBefore("#alternateToolbar")
            $("#dustCounterBox").css("position", "sticky")
            $("#dustCounterBox").css("bottom", "68px")
        }
        $("#autocompleteButton, #autocompleteButtonLabel, #autocompleteButtonAlt, #autocompleteButtonAltLabel").css("background-color", "var(--green)")
    }

    loadSettings()
    loadGame()

    function checkIncompatibleSave() {
        if (localStorage.getItem("date")) {
            //Trovato salvataggio vecchio. Cancella tutto.
            $("#continueGameButton").attr("disabled", "true")
            $("#continueGameButton").css("filter", "grayscale(0.75)")
            $("#continueGameButton").toggle()
            $("#continueButtonSubtitle").text(incompatibleText)
        }
    }

    if (game.date && !localStorage.getItem("date")) {
        $("#continueGameButton").toggle()
        $("#beginButtonSubtitle").toggle()
        let formattedPlayers = game.players.toString().replaceAll(',', ', ')
        let rawDate = new Date(game.date)
        let formattedDate = rawDate.getFullYear() + "-" + ((rawDate.getMonth() + 1) >= 10 ? (rawDate.getMonth() + 1) : ("0" + (rawDate.getMonth() + 1))) + "-" + (rawDate.getDate() >= 10 ? rawDate.getDate() : ("0" + rawDate.getDate())) + " " + rawDate.getHours() + ":" + (rawDate.getMinutes() >= 10 ? rawDate.getMinutes() : ("0" + rawDate.getMinutes()))
        let board = game.board >= CUSTOM_BOARD_THRESHOLD ? settings.customBoards[game.board - CUSTOM_BOARD_THRESHOLD] : boards[game.board]
        $("#continueButtonSubtitle").html(formattedDate + "<br>" + board.name + "<br>" + formattedPlayers)

        $("#continueGameButton").on("click", function () {
            //Valorizza itemsArray
            itemsArray = board["characters"].concat(board["weapons"]).concat(board["rooms"])
            //Fill
            $("#mainMenu").css("display", "none")
            clearInterval(languageInterval)
            if (settings.alternateInGameToolbar) {
                swapUpperBar()
            }
            $("#mainGame").css("display", "block")
            fillTable()
            updateTable()
            if (game.board === 5) {
                $("#dustCounterValue, #dustCounterAltButton, #dustCounterButton").text(game.dustCounter)
                if (!settings.hideDustCounter) {
                    $(".dust-counter-box").css("display", "flex")
                    $("#instructionsModalSection6").show()
                } else {
                    $(".dust-counter-button").hide()
                    $("#instructionsModalSection6").hide()
                }
            }
            if (game.board !== 5 || settings.hideDustCounter) {
                $(".dust-counter-button").hide()
                $("#instructionsModalSection6").hide()
            }
        })
    }

    $(".debugButton").on("click", function () {
        console.log(game, settings)
    })

    //Install button (don't show if already in PWA)
    if (!(params.source == "pwa" || window.matchMedia('(display-mode: standalone)').matches)) {

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
        $("#installButton").hide();
    }

    $("#newGameButton").on("click", function () {
        //Rimuovi salvataggi non compatibili
        if (localStorage.getItem("date")) {
            localStorage.clear()
        }

        $("#mainMenu").css("display", "none")
        clearInterval(languageInterval)
        $("#setup").css("display", "block")
        game.board = 0
        itemsArray = boards[game.board]["characters"].concat(boards[game.board]["weapons"]).concat(boards[game.board]["rooms"])
        localStorage.removeItem("game")

        //Populate Setup
        boards.forEach(board => {
            let button = $("<button>").attr("class", "small-button board-button")
            //button.css("background-color", "var(--current-lightBlue)")
            button.text(board.name)
            button.on("click", function (event) {
                selectBoard(board.id, board.minPlayers, event)
            })
            $("#boardButtonContainer").append(button)
        })

        updateFields()
    })

    $("#playerOrderModalLink, #orderModalBackButton").on("click", function () {
        $("#orderModal").toggle()
    })

    $("#mainMenuLanguageButton, #languageModalBackButton").on("click", function () {
        $("#languageModal").toggle()
    })

    $(".modal-back-button").on("click", function () {
        hideAndShowModal()
    })

    function selectBoard(id, minPlayers, event) {
        //Cambio colori
        $("#boardButtonContainer, #customizeBoardContainer").find("*").css("background-color", "var(--current-lightBlue)")
        $("#boardButtonContainer").find("*").data("selected", "false")
        if (event) {
            $(event.target).data("selected", "true")
            $(event.target).css("background-color", "var(--current-lightRed)")
        }

        game.board = id
        if (game.board == 5) {
            $("#hideDustCounterText, #hideDustCounterDisabled").toggle()
        }
        $("#hideDustCounter").prop("disabled", (game.board != 5))
        if (game.board < CUSTOM_BOARD_THRESHOLD) {
            itemsArray = boards[game.board]["characters"].concat(boards[game.board]["weapons"]).concat(boards[game.board]["rooms"])
        }
        $("#playerNum").attr("min", minPlayers)
        $("#playerNum").val(3)
        updateRangeTooltip()
        updateFields()
    }

    function updateRangeTooltip() {
        $("#playerNumTooltip").text($("#playerNum").val())
    }

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
                let field = $("<input>").attr("class", "setup-name")
                field.attr("type", "text")
                field.attr("required", "required")
                field.attr("name", "player" + i)
                field.attr("pattern", "[A-Za-z0-9]+")
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
        const boardToSave = { name: customBoardName, characters: customCharacters, weapons: customWeapons, rooms: customRooms }
        return boardToSave
    }

    const validateBoard = (board) => {
        let res = undefined
        if (_.find(settings.customBoards, el => _.isEqual(el, board))) {
            res = boardValidationErrors.duplicate
        } else if (!board.name) {
            res = boardValidationErrors.name
        } else if (!(board.characters && board.characters.length > 0)) {
            res = boardValidationErrors.characters
        } else if (!(board.weapons && board.weapons.length > 0)) {
            res = boardValidationErrors.weapons
        } else if (!(board.rooms && board.rooms.length > 0)) {
            res = boardValidationErrors.rooms
        }
        return res
    }

    $("#customizeBoardButton").on("click", function (event) {
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

    const getBoardListElement = (board, index, elementId, addButtons, addCheckbox, expandable) => {

        const tbody = $("<tbody class='custom-board-body' id='" + elementId + "Body'>")
        const spanName = $("<span>").text(board.name)
        const tdName = $("<td colspan='3'>").append($(spanName))
        let trItemsExpanded
        if (expandable) {
            const expandButton = $("<a class='material-symbols-outlined' id='" + elementId + "ExpandButton'>").text("expand_more").on("click", function () {
                const currentButton = $("#" + elementId + "ExpandButton")
                $(currentButton).text($(currentButton).text() == "expand_more" ? "expand_less" : "expand_more")
                $("#" + elementId + 'Items').toggle()
                $("#" + elementId + 'ItemsExpanded').toggle()
            })
            const charactersExpandedHeader = $("<div>").append($(emojiSpan).clone().text("person"), " ", customBoardButtons.characters)
            const charactersExpandedList = $("<div class='items-expanded-div'>").append($(getListFromArray(board.characters)))
            const weaponsExpandedHeader = $("<div>").append($(emojiSpan).clone().text("syringe"), " ", customBoardButtons.weapons)
            const weaponsExpandedList = $("<div class='items-expanded-div'>").append($(getListFromArray(board.weapons)))
            const roomsExpandedHeader = $("<div>").append($(emojiSpan).clone().text("house"), " ", customBoardButtons.rooms)
            const roomsExpandedList = $("<div class='items-expanded-div'>").append($(getListFromArray(board.rooms)))
            const cell = $("<td class='items-expanded-cell' colspan='3' id='" + elementId + "ItemsExpandedList'>").append($(charactersExpandedHeader), $(charactersExpandedList), $(weaponsExpandedHeader), $(weaponsExpandedList), $(roomsExpandedHeader), $(roomsExpandedList))

            trItemsExpanded = $("<tr id='" + elementId + "ItemsExpanded'>").append($(cell))
            $(tdName).append($(expandButton))
        }
        const trName = $("<tr class='custom-board-name-row' id='" + elementId + "Name'>")
        if (addCheckbox) {
            let checkboxDiv = $("<div>").addClass("checkbox-wrapper-31 checkbox-wrapper-32")

            let checkbox = $("<input>").attr("type", "checkbox")
            checkbox.attr("id", elementId + "Checkbox")
            checkbox.attr("class", "table-header-checkbox board-import-checkbox")
            checkbox.on("change", function () {
                if ($(this).is(":checked")) {
                    $("#" + elementId + 'Body td, #' + elementId + 'Body th').css("background-color", "var(--current-lightBlue")
                } else {
                    $("#" + elementId + 'Body td, #' + elementId + 'Body th').css("background-color", "")
                }
            })

            let checkboxCell = $("<th rowspan='2'>").attr("class", "table-header-checkbox-cell")
            checkboxCell.attr("scope", "row")
            checkboxDiv.append(checkbox, checkboxSvg)
            checkboxCell.append(checkboxDiv)
            $(trName).append($(checkboxCell))
        }
        $(trName).append($(tdName))

        const tdCharacters = $("<td id='" + elementId + "Characters'>").append($(emojiSpan).clone().text("person"), " ", board.characters.length)
        const tdWeapons = $("<td id='" + elementId + "Weapons'>").append($(emojiSpan).clone().text("syringe"), " ", board.weapons.length)
        const tdRooms = $("<td id='" + elementId + "Rooms'>").append($(emojiSpan).clone().text("house"), " ", board.rooms.length)
        const trItems = $("<tr id='" + elementId + "Items'>").append($(tdCharacters), $(tdWeapons), $(tdRooms))

        $(tbody).append($(trName), $(trItems))

        if (expandable) {
            $(trItemsExpanded).hide()
            $(tbody).append($(trItemsExpanded))
        }

        if (addButtons) {

            const useButton = $("<button class='small-button material-symbols-outlined' id='" + elementId + "Use'>").text("play_arrow").attr("title", customBoardButtons.play).on("click", function () {
                chooseCustomBoard(index)
            })
            const editButton = $("<button class='small-button material-symbols-outlined' id='" + elementId + "Edit'>").text("edit").attr("title", customBoardButtons.edit).on("click", function () {
                editCustomBoard(index)
            })
            const exportButton = $("<button class='small-button material-symbols-outlined' id='" + elementId + "Export'>").text("download").attr("title", customBoardButtons.export).on("click", function () {
                exportCustomBoard(index)
            })
            const deleteButton = $("<button class='small-button material-symbols-outlined' id='" + elementId + "Delete'>").text("delete").attr("title", customBoardButtons.delete).on("click", function () {
                deleteCustomBoard(index)
            })
            const trButtons = $("<tr id='" + elementId + "Buttons'>").append($("<td class='custom-board-button-cell' colspan='3'>").append($(useButton), $(editButton), $(exportButton), $(deleteButton)))
            $(tbody).append($(trButtons))

        }

        return tbody
    }

    const emojiSpan = $("<span class='material-symbols-outlined'>")

    function updateCustomBoardList() {
        if (settings.customBoards && settings.customBoards.length > 0) {
            $("#customBoardLoadSection").empty()
            settings.customBoards.forEach((customBoard, index) => {
                $("#customBoardLoadSection").append($(getBoardListElement(customBoard, index, "customBoardLoad" + index, true, false, true)))
            })
            $("#customBoardExistingSection").show()
        } else {
            $("#customBoardExistingSection").hide()
        }
    }

    $("#newBoardButton").on("click", function () {
        $("#saveBoardButton").data("editing", "false")
        hideAndShowModal("#newBoardModal")
    })

    function chooseCustomBoard(id) {
        itemsArray = settings.customBoards[id]["characters"].concat(settings.customBoards[id]["weapons"]).concat(settings.customBoards[id]["rooms"])
        selectBoard(CUSTOM_BOARD_THRESHOLD + id, 2)
        $("#customizeBoardButtonSubtitle").show()
        $("#customizeBoardButtonSubtitle").text(settings.customBoards[id].name)
        $("#customizeBoardButton").data("selected", "true")
        $("#customizeBoardButton, #customizeBoardButton > *").css("background-color", "var(--current-lightRed)")
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
        boardToEdit.characters.forEach(character => addFieldToSection('Characters', character))
        boardToEdit.weapons.forEach(weapon => addFieldToSection('Weapons', weapon))
        boardToEdit.rooms.forEach(room => addFieldToSection('Rooms', room))
        $("#saveBoardButton").data("editing", id)
        hideAndShowModal("#newBoardModal")
    }

    $("#exportAllBoardsButton").on("click", function () {
        exportCustomBoard()
    })

    function exportCustomBoard(id) {
        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(id ? settings.customBoards[id] : settings.customBoards)); //todo sistema
        let downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", (id ? settings.customBoards[id].name : "Detective Notes Boards") + ".board");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    function deleteCustomBoard(id) {
        $("#confirmationPromptTitle").text(customBoardButtons.confirmationTitle)
        $("#confirmationPromptSubtitle").text(customBoardButtons.confirmationSubtitle)
        $("#genericYes").on("click", function () {
            id === 0 ? settings.customBoards.shift() : settings.customBoards.splice(id, 1)
            saveSettings()
            updateCustomBoardList()
            hideAndShowModal("#customBoardModal")
            $("#genericYes").off("click")
        })
        $("#genericNo").on("click", function () {
            hideAndShowModal("#customBoardModal")
            $("#genericNo").off("click")
        })
        hideAndShowModal("#confirmationModal")
    }

    $("#addCharacterToCustomBoardButton").on("click", function () {
        addFieldToSection("Characters")
    })

    $("#addWeaponToCustomBoardButton").on("click", function () {
        addFieldToSection("Weapons")
    })

    $("#addRoomToCustomBoardButton").on("click", function () {
        addFieldToSection("Rooms")
    })

    let customBoardSizes = {
        Characters: 0,
        Weapons: 0,
        Rooms: 0
    }

    function addFieldToSection(container, text) {
        const id = "custom" + container + customBoardSizes[container]
        customBoardSizes[container]++

        const row = $("<tr>").attr("id", id + "Row")

        const numberCell = $("<th>").text(customBoardSizes[container]).addClass("custom-table-num")
        const input = $("<input>").attr("class", "setup-name").attr("type", "text").attr("name", id).attr("pattern", "[A-Za-z0-9]+").attr("id", id)
        if (text) {
            $(input).val(text)
        }
        const deleteButton = $("<button>").attr("class", "small-button board-button material-symbols-outlined").text("delete").attr("id", "delete" + id).on("click", function () {
            $("#" + id + "Row").remove()
            customBoardSizes[container]--
            updateCustomBoardNumberCells()
        })
        const inputCell = $("<td>").html(input).addClass("custom-table-input")
        const deleteButtonCell = $("<td>").html(deleteButton).addClass("custom-table-del")

        row.append(numberCell, inputCell, deleteButtonCell)
        $("#customBoard" + container).append(row)
    }

    function updateCustomBoardNumberCells() {
        Object.keys(customBoardSizes).forEach(container => {
            $("#customBoard" + container).find(".custom-table-num").each(function (index) {
                $(this).text(index + 1)
            })
        })
    }

    $("#saveBoardButton").on("click", function () {
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

    $("#newBoardModalBackButton").on("click", function () {
        hideAndShowModal("#customBoardModal")
    })


    $("#customBoardModalBackButton").on("click", function () {
        hideAndShowModal()
    })

    $("#importBoardButton").on("click", function () {
        $("#fileValidationFailed").hide()
        $("#chooseBoardsToImportSection").hide()
        hideAndShowModal("#importBoardModal")
    })

    let parsedFile

    $("#fileInput").on("change", function (e) {
        $("#chooseBoardsToImportTable").empty()
        const reader = new FileReader()
        reader.onload = function (event) {
            parsedFile = JSON.parse(event.target.result)
            if (validateFile(parsedFile)) {
                $("#chooseBoardsToImportSection").show()
                //Popola la sezione di scelta dei tavoli
                parsedFile.forEach((board, index) => {
                    $("#chooseBoardsToImportTable").append($(getBoardListElement(board, index, "customBoardInput" + index, false, true, true)))
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
        file.forEach(board => {
            ret = !!(board.name && board.characters && board.weapons && board.rooms)
            if (!ret) {
                return
            }
        })
        return ret
    }

    $("#finalizeImportButton").on("click", function () {
        if ($(".board-import-checkbox").length !== 0) {
            $(".board-import-checkbox").each(function (index) {
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

    $("#importBoardModalBackButton").on("click", function () {
        hideAndShowModal("#customBoardModal")
    })

    //Dark mode

    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            toggleDarkMode(false)
        }

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            toggleDarkMode(darkMode)
        })

    }

    $("#darkModeToggle, #mainMenuDarkModeButton").on("click", function () {
        toggleDarkMode(darkMode)
    })

    function toggleDarkMode(current) {
        $(".dark-mode-label").text(current ? "dark_mode" : "light_mode")
        // !current is new darkMode
        Object.keys(currentColors).forEach(key => {
            const colorObject = currentColors[key]
            colorObject.current = current ? 'std' : 'alt'
            const string = '--current-' + key
            const newColor = current ? colorObject.std : colorObject.alt
            document.documentElement.style.setProperty(string, newColor)
        })
        darkMode = !current
    }

    $("#advancedSettingsModalBackButton, #advancedSettingsToggle").on("click", function () {
        $("#advancedSettingsModal").toggle()
    })

    //Main menu buttons
    $("#mainMenuCreditsButton, #creditsModalBackButton").on("click", function () {
        //Open credits modal
        $("#creditsModal").toggle()
    })

    $("#playerNum").on("input", function () {
        updateFields()
    })

    $("#longNamesCompatibilityMode").on("change", function () {
        saveSetting("longNamesCompatibilityMode", $(this).is(":checked"))
    })

    $("#hideDustCounter").on("change", function () {
        saveSetting("hideDustCounter", $(this).is(":checked"))
    })

    $("#alternateInGameToolbar").on("change", function () {
        saveSetting("alternateInGameToolbar", $(this).is(":checked"))
    })

    $("#playerNameForm").on("submit", function (event) {
        event.preventDefault()

        //Salva le impostazioni dalla tabella
        saveSetting("longNamesCompatibilityMode", $("#longNamesCompatibilityMode").is(":checked"))
        saveSetting("hideDustCounter", $("#hideDustCounter").is(":checked"))
        saveSetting("alternateInGameToolbar", $("#alternateInGameToolbar").is(":checked"))

        toggleGlobalLockButton(game.locked)
        toggleAutocompleteButton(settings.autocomplete)
        saveGame()

        $("#setup").css("display", "none")
        if (settings.alternateInGameToolbar) {
            swapUpperBar()
        }
        $("#mainGame").css("display", "block")
        const playerArray = []
        $('#playerNameContainer input').each(function () {
            playerArray.push(this.value) // "this" is the current element in the loop
        })

        //Save data
        saveGameSetup(game.board, playerArray)
        setupTable()
        if (game.board === 5 && !settings.hideDustCounter) {
            $(".dust-counter-box").css("display", "flex")
            $("#instructionsModalSection6").show()
        } else {
            $(".dust-counter-button").hide()
            $("#instructionsModalSection6").hide()
        }
        fillTable()
    })

    $("#dustCounterDown, #dustCounterAltDown").on("click", function () {
        $("#dustCounterValue, #dustCounterAltButton, #dustCounterButton").text(dustCounterDecrease())
    })

    $("#dustCounterUp, #dustCounterAltDown").on("click", function () {
        $("#dustCounterValue, #dustCounterAltButton, #dustCounterButton").text(dustCounterIncrease())
    })

    $("#dustCounterButton, #dustCounterAltButton").on("click", function () {
        const cur = $("#dustCounterBox").css("display") == "none"
        $("#dustCounterBox").css("display", cur ? "flex" : "none")
    })

    function fillTable() {
        game.players.forEach(player => {
            let cell = $("<th>").attr("class", "name-holder")
            cell.attr("scope", "col")
            if (settings.longNamesCompatibilityMode) {
                const sideways = $("<span>").addClass("sideways").text(player)
                const initial = $("<span>").text(player.trim().charAt(0))
                cell.append(sideways, $("<br>"), initial)
            } else {
                cell.text(player)
            }
            cell.css("background-color", "var(--current-lightGrey")
            $("#tableRowPlayers").append(cell)
        })

        game.table.forEach((item, itemIndex) => {
            /*
                item (divider) = {divider: true, name: ''}
                item = {row, section, locked, items}
            */
            if (item.divider) {
                $("#tableHeader" + item.name).attr("colspan", game.players.length + 2)
            } else {
                let currentRow = $("<tr>").attr("class", "table-row")

                currentRow.append(getCheckboxCell(item.row))

                let header = $("<td>").attr("class", "table-header")
                header.attr("scope", "row")
                header.text(item.row)
                currentRow.append(header)

                game.players.forEach((player, index) => {
                    currentRow.append(getCellLink(index, item.row))
                })

                $("#tableSection" + item.section).append(currentRow)
            }
        })
        saveGame()
    }

    function updateTable() {
        //aggiorna header
        toggleGlobalLockButton(game.locked)
        toggleAutocompleteButton(settings.autocomplete)
        saveGame()

        let table = getFilteredTable()
        //controlla se la casella è spuntata
        $(".cell-image-link").find("img").each(function () {
            let id = $(this).data("key").split(',') // id: i,j è itemsArray[i] players[j]
            let icon = table[id[0]].items[id[1]]
            $(this).attr("src", imageData[icon]).attr("class", icon)
        })
        //controlla se la riga è spuntata
        $("tr").find(".table-header-checkbox-cell").each(function () {
            let item = $(this).find("input").data("item")
            let index = itemsArray.indexOf(item)
            if (table[index].locked) {
                $(this).find("input").prop("checked", true)
                $(this).closest(".table-row").find("td > a").data("locked", "true")
                $(this).closest(".table-row").addClass("locked")
            }
        })
    }

    //Only show vertical long names at the top
    $("body").on("scroll", function () {
        if (settings.longNamesCompatibilityMode) {
            if ($("body").scrollTop() == 0) {
                $(".sideways").show(300)
            } else {
                $(".sideways").hide(300)
            }
        }
    })

    let toUpdate = undefined, oldID = undefined

    function getCellLink(number, item) {
        let cell = $("<td>")
        let cellLink = $("<a>").attr("class", "cell-image-link")
        cellLink.attr("id", "cellLink")
        cellLink.data("locked", "false")
        cellLink.data("player", number.toString())
        cellLink.data("item", item)
        cellLink.on("click", function () {
            //Only if data-locked: false
            if ($(this).data("locked") == "false") {
                //Call selection modal
                oldID = $(this).find("img").attr("class")
                $("#selectionModal").toggle()
                toUpdate = $(this)
            }
        })
        let cellImage = $("<img>")
        cellImage.attr("src", "assets/icons/reset.svg")
        cellImage.attr("class", "reset")
        cellImage.data("key", "" + itemsArray.indexOf(item) + "," + number)
        cellLink.append(cellImage)
        cell.append(cellLink)
        return cell
    }

    const checkboxSvg = "<svg viewBox=\"0 0 35.6 35.6\"><circle class=\"background\" cx=\"17.8\" cy=\"17.8\" r=\"17.8\"></circle><circle class=\"stroke\" cx=\"17.8\" cy=\"17.8\" r=\"14.37\"></circle><polyline class=\"checked\" points=\"11.78 18.12 15.55 22.23 25.17 12.87\"></polyline></svg>"

    function getCheckboxCell(item) {
        let checkboxDiv = $("<div>").addClass("checkbox-wrapper-31 checkbox-wrapper-32")

        let checkbox = $("<input>").attr("type", "checkbox")
        checkbox.attr("id", "rowCheckbox")
        checkbox.data("item", item)
        checkbox.attr("class", "table-header-checkbox")
        checkbox.on("change", function () {
            toggleLockRow(itemsArray.indexOf(item), $(this).is(":checked"))
            if ($(this).is(":checked")) {
                $(this).closest(".table-row").find("td > a").data("locked", "true")
                $(this).closest(".table-row").addClass("locked")
                $(this).closest(".table-row").css("background-color", "var(--current-lightRed)")
                //Update symbols
                toUpdate = $(this)
                updateWholeRow("cross")

            } else {
                $(this).closest(".table-row").find("td > a").data("locked", "false")
                $(this).closest(".table-row").removeClass("locked")
                $(this).closest(".table-row").css("background-color", "")
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
    $("#showInstructionsModal, #instructionsModalBackButton").on("click", function () {
        $("#instructionsModal").toggle()
    })

    //Change autocomplete button
    $("#autocompleteButton, #autocompleteButtonAlt").on("click", function () {
        toggleAutocompleteButton()
    })

    function toggleAutocompleteButton(force) {
        let shouldTurnOn = (force === undefined) ? !settings.autocomplete : force
        if (shouldTurnOn) {
            $("#autocompleteButton, #autocompleteButtonLabel, #autocompleteButtonAlt, #autocompleteButtonAltLabel").css("background-color", "var(--green)")
        } else {
            $("#autocompleteButton, #autocompleteButtonLabel, #autocompleteButtonAlt, #autocompleteButtonAltLabel").css("background-color", "var(--current-lightRed)")
        }
        saveSetting("autocomplete", shouldTurnOn)
    }


    //Lock cards
    $("#lockPersonalCards, #lockPersonalCardsAlt").on("click", function () {
        toggleGlobalLockButton()
    })

    function toggleGlobalLockButton(force) {
        let shouldLock = (force === undefined) ? !game.locked : force
        if (shouldLock) {   //if currently unlocked, locks cards
            $(".table-header-checkbox").each(function () {
                $(this).attr("disabled", "disabled")
            })
            $("#lockPersonalCards, #lockPersonalCardsAlt, #lockPersonalCardsAltLabel, #lockPersonalCardsLabel").css("background-color", "var(--current-lightRed)")
            $("#lockPersonalCardsLabel, #lockPersonalCardsAltLabel").text("lock")
        } else {        //if currently locked, unlocks cards
            $(".table-header-checkbox").each(function () {
                $(this).removeAttr("disabled")
            })
            $("#lockPersonalCards, #lockPersonalCardsAlt, #lockPersonalCardsAltLabel, #lockPersonalCardsLabel").css("background-color", "var(--current-darkBlue)")
            $("#lockPersonalCardsLabel, #lockPersonalCardsAltLabel").text("lock_open_right")
        }
        toggleLockGlobal(shouldLock)
    }

    //Hide extra symbols
    $("#showLessSymbolsCheckbox").on("change", function () {
        $("#selectionModalExtended").toggle()
    })

    //Autocomplete
    function updateWholeRow(id) {
        toUpdate.closest(".table-row").find("img").attr("src", imageData[id]).attr("class", id)
        let rowName = itemsArray.indexOf(toUpdate.data("item"))
        game.players.forEach((player, i) => {
            saveItem(rowName, i, id)
        })
    }

    //Close back modal
    $("#modalBackButton").on("click", function () {
        $("#selectionModal").toggle()
    })

    //Select image
    $(".selection-modal-image").on("click", function () {
        const newID = $(this).attr("id")

        $("#selectionModal").toggle()

        //Se spunto e autocompl. ON, metti croci sulla riga
        if (newID == "check" && settings.autocomplete) {
            updateWholeRow("cross")
        } else if (oldID == "check" && newID != "check" && settings.autocomplete) {
            //Se tolgo spunta, metti reset
            updateWholeRow("reset")
        }

        //Aggiorna la casella vera
        const img = $(toUpdate.find("img"))
        $(img).removeClass($(img).attr("class"))
        $(img).addClass(newID)
        $(img).attr("src", imageData[newID])

        //Aggiorna LocalData
        let rowName = itemsArray.indexOf(toUpdate.data("item"))
        let columnName = parseInt(toUpdate.data("player"))
        saveItem(rowName, columnName, newID)
    })

    //INSTRUCTIONS MODAL IMAGE

    //Image 1: Cards given
    const instructionsModalImage1 = ["shelves", "kitchen", "candle", "person", "dinner_dining", "chair"]
    let im1Index = 0
    let im1Interval = window.setInterval(function () {
        if (im1Index == instructionsModalImage1.length) {
            im1Index = 0
        }
        $("#instructionsModalImage1, #instructionsModalImage2B").text(instructionsModalImage1[im1Index])
        im1Index++
    }, 2000)

    //Image 2: Check box
    let im2Interval = window.setInterval(function () {
        $("#fakeCheckbox").click()
        $(".fake-table").css("background-color", ($("#fakeCheckbox").prop("checked") ?
            "var(--current-lightRed)"
            : ""))
    }, 2000)

    //Image 3: Lock cards
    let im3Locked = false
    let im3Interval = window.setInterval(function () {
        im3Locked = !im3Locked
        //Change bg
        $("#fakeLockButton").css("background-color", im3Locked ?
            "var(--current-lightRed)" :
            "var(--current-darkBlue)")
        //Change label
        $("#fakeLockButtonLabel").text(im3Locked ? "lock" : "lock_open_right")
    }, 2000)

    //Image 5: Autocomplete
    let im5On = false
    let im5Interval = window.setInterval(function () {
        im5On = !im5On
        //Change bg
        $("#fakeAutocompleteButton").css("background-color", im5On ?
            "var(--current-lightRed)" : "var(--green)")
    }, 2000)
})