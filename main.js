import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader';
import { OrbitControls } from 'OrbitControls';


let _APP = null;

let locked = false;

$(document).ready(function () {
    'use strict';

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
            this._Initialize();
        }

        _Initialize() {
            this._threejs = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
            });
            this._threejs.shadowMap.enabled = true;
            this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
            this._threejs.physicallyCorrectLights = true;
            this._threejs.toneMapping = THREE.ACESFilmicToneMapping;
            this._threejs.outputEncoding = THREE.sRGBEncoding;

            const modelDiv = document.getElementById('model');
            modelDiv.appendChild(this._threejs.domElement);

            this._threejs.setSize(modelDiv.offsetWidth, modelDiv.offsetHeight);

            window.addEventListener('resize', () => {
                this._OnWindowResize();
            }, false);

            const fov = 60;
            const aspect = modelDiv.offsetWidth / modelDiv.offsetHeight;
            const near = 1.0;
            const far = 1000.0;
            this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
            const chosenPosition = getCameraPosition();
            this._camera.position.set(chosenPosition[0], chosenPosition[1], chosenPosition[2]);

            this._scene = new THREE.Scene();

            let light = new THREE.DirectionalLight(0xFFFFFF);
            light.position.set(20, 100, 10);
            light.target.position.set(0, 0, 0);
            light.castShadow = true;
            light.intensity = 5;
            light.shadow.bias = -0.001;
            light.shadow.mapSize.width = 2048;
            light.shadow.mapSize.height = 2048;
            light.shadow.camera.near = 0.1;
            light.shadow.camera.far = 500.0;
            light.shadow.camera.near = 0.5;
            light.shadow.camera.far = 500.0;
            light.shadow.camera.left = 100;
            light.shadow.camera.right = -100;
            light.shadow.camera.top = 100;
            light.shadow.camera.bottom = -100;
            this._scene.add(light);

            light = new THREE.AmbientLight(0xFFFFFF);
            this._scene.add(light);

            this._controls = new OrbitControls(this._camera, this._threejs.domElement);
            this._controls.target.set(0, 10, 0);
            this._controls.maxDistance = 80;
            this._controls.minDistance = 1;
            this._controls.autoRotate = true;
            this._controls.autoRotateSpeed = 2;
            this._controls.enableDamping = true;
            this._controls.update();

            this._camera.lookAt(this._scene.position);

            const loadingManager = new THREE.LoadingManager();

            loadingManager.onLoad = function () {
                doneLoading();
            };

            $("#skipLoading").on("click", doneLoading);

            loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
                $("#progressBar").val(itemsLoaded / itemsTotal * 100);
            };

            loadingManager.onError = function (url) {
                console.log('There was an error loading ' + url);
                doneLoading();
            };

            const loader = new GLTFLoader(loadingManager);
            loader.setPath('./3d/');
            loader.load('scene.gltf', (gltf) => {
                //gltf.scale.setScalar(0.1);
                gltf.scene.scale.set(0.05, 0.05, 0.05);
                gltf.scene.traverse(c => {
                    c.castShadow = true;
                });
                this._scene.add(gltf.scene);
            });

            function doneLoading() {
                $("#loadingScreen").fadeOut(1000);
            }

            this._RAF();
        }
        _OnWindowResize() {
            this._camera.aspect = window.innerWidth / window.innerHeight;
            this._camera.updateProjectionMatrix();
            this._threejs.setSize(window.innerWidth, window.innerHeight);
        }

        _Step(timeElapsed) {
            const timeElapsedS = timeElapsed * 0.001;
            if (this._mixers) {
                this._mixers.map(m => m.update(timeElapsedS));
            }
        }

        _RAF() {
            requestAnimationFrame((t) => {
                if (this._previousRAF === null) {
                    this._previousRAF = t;
                }

                this._controls.update();

                this._RAF();

                this._threejs.render(this._scene, this._camera);
                this._Step(t - this._previousRAF);
                this._previousRAF = t;
            });
        }
    }

    _APP = new AnimatedBoard();

    let darkMode = false;

    //Dark mode

    const darkModeEnabledElements = [{
        element: ["html", ".content", ".modal-wrapper", ".modal"],
        props: ["background-color", "color"]
    }, {
        element: [".reset", ".skip", ".setup-image", ".invertible"],
        props: ["filter"]
    }, {
        element: [".locked", ".upperbar", ".dust-counter-box", ".small-button",
            ".small-button .material-symbols-outlined", ".counterbutton", ".begin-button", ".main-menu-small-button", ".main-table-row>*", ".language-link"],
        props: ["background-color"]
    }, {
        element: ["input[type=\"range\"]"],
        props: ["accent-color"]
    }, {
        element: [".modal a", "#instructionsModalImage1", "#instructionsModalImage2B"],
        props: ["color"]
    }, {
        element: [".setup-tooltip-modal-link"],
        props: ["color", "text-decoration"]
    }];


    //Language
    let userLang = navigator.language || navigator.userLanguage;
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    let forcedLang = params.lang;
    if (forcedLang && forcedLang.toLowerCase() == "it") {
        userLang = "it-IT";
    } else if (forcedLang && forcedLang.toLowerCase() == "en") {
        userLang = "en-US";
    }
    let strings, boards, letsPlay, longNamesCompatibilityMode = false, hideDustCounter = false;
    let selectedBoard = 0, players = [];
    let itemsArray;
    const imageData = {
        "check": "assets/check.svg",
        "maybe": "assets/check.svg",
        "cross": "assets/cross.svg",
        "maybeNot": "assets/cross.svg",
        "reset": "assets/reset.svg",
        "star": "assets/star.svg",
        "question": "assets/question.svg",
        "exclamation": "assets/exclamation.svg",
        "flag": "assets/flag.svg",
        "skip": "assets/skip.svg"
    }

    switch (userLang) {
        case "it-IT": {
            strings = stringsIT;
            boards = boardsIT;
            letsPlay = letsPlayIT;
            break;
        }
        default: {
            strings = stringsEN;
            boards = boardsEN;
            letsPlay = letsPlayEN;
            break;
        }
    }
    if (localStorage.getItem("date") != undefined) {
        $("#continueGameButton").toggle();
        $("#beginButtonSubtitle").toggle();
        let recPlayers = localStorage.getItem("players").replaceAll(',', ', ');
        let recBoard = boards[parseInt(localStorage.getItem("board"))];
        let recDate = new Date(localStorage.getItem("date"));
        let formattedDate = recDate.getFullYear() + "-" + ((recDate.getMonth() + 1) >= 10 ? (recDate.getMonth() + 1) : ("0" + (recDate.getMonth() + 1))) + "-" + (recDate.getDate() >= 10 ? recDate.getDate() : ("0" + recDate.getDate())) + " " + recDate.getHours() + ":" + (recDate.getMinutes() >= 10 ? recDate.getMinutes() : ("0" + recDate.getMinutes()));
        $("#continueButtonSubtitle").html(formattedDate + "<br>" + recBoard.name + "<br>" + recPlayers);

        $("#continueGameButton").on("click", function () {
            //Recover data
            selectedBoard = recBoard.id;
            players = recPlayers.split(",");
            itemsArray = boards[selectedBoard]["characters"].concat(boards[selectedBoard]["weapons"]).concat(boards[selectedBoard]["rooms"]);
            localStorage.setItem("date", new Date());
            longNamesCompatibilityMode = localStorage.getItem("longNamesCompatibilityMode");

            //Fill
            $("#mainMenu").css("display", "none");
            clearInterval(languageInterval);
            $("#mainGame").css("display", "block");
            fillTable();
            updateTable();
            if (selectedBoard == 5) {
                hideDustCounter = localStorage.getItem("hideDustCounter");
                $("#dustCounterValue").text(localStorage.getItem("dust"));
                if (hideDustCounter == false) {
                    $(".dust-counter-box").css("display", "flex");
                }
            }
        })
    }

    //Detect language, load strings
    let stringKeys = Object.keys(strings);
    stringKeys.forEach((key) => document.getElementById(key).innerHTML = strings[key]);
    $("#startGame").attr("value", letsPlay);

    $("#newGameButton").on("click", function () {
        $("#mainMenu").css("display", "none");
        clearInterval(languageInterval);
        $("#setup").css("display", "block");
        selectedBoard = 0;
        itemsArray = boards[selectedBoard]["characters"].concat(boards[selectedBoard]["weapons"]).concat(boards[selectedBoard]["rooms"]);
        localStorage.clear();

        //Populate Setup
        boards.forEach(board => {
            let button = $("<button>").attr("class", "small-button board-button");
            button.text(board.name);
            button.on("click", function (event) {
                //Cambio colori
                $("#boardButtonContainer").find("*").css("background-color", "var(--dark-blue)");
                $(event.target).css("background-color", "var(--light-blue)");

                selectedBoard = board.id;
                if (selectedBoard == 5) {
                    $("#hideDustCounterText, #hideDustCounterDisabled").toggle();
                }
                $("#hideDustCounter").prop("disabled", (selectedBoard != 5));
                itemsArray = boards[selectedBoard]["characters"].concat(boards[selectedBoard]["weapons"]).concat(boards[selectedBoard]["rooms"]);
                $("#playerNum").attr("min", board.minPlayers);
                $("#playerNum").val(3);
                updateRangeTooltip();
                updateFields();
            });
            $("#boardButtonContainer").append(button);
        });

        updateFields();
    });

    $("#playerOrderModalLink, #orderModalBackButton").on("click", function () {
        $("#orderModal").toggle();
    });

    $("#mainMenuLanguageButton, #languageModalBackButton").on("click", function () {
        $("#languageModal").toggle();
    })

    function updateRangeTooltip() {
        $("#playerNumTooltip").text($("#playerNum").val())
    }

    function updateFields() {
        const val = $("#playerNum").val();
        $("#playerNumTooltip").text(val);

        //Get current name of fields, then populate
        let currentFields = $("#playerNameContainer input").length;

        if (val <= currentFields) {
            //Remove fields
            for (let i = currentFields; i >= val; i--) {
                $("#playerNameContainer").children().last().remove();
            }
        } else {
            //Add fields
            for (let i = currentFields; i < val - 1; i++) {
                let fieldSection = $("<section>");
                let field = $("<input>").attr("class", "setup-name");
                field.attr("type", "text");
                field.attr("required", "required");
                field.attr("name", "player" + i);
                field.attr("pattern", "[A-Za-z0-9]+");
                fieldSection.append(field, $("<br>"));
                $("#playerNameContainer").append(fieldSection);
            }
        }
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleDarkMode(false);
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        toggleDarkMode(darkMode);
    });

    $("#darkModeToggle, #mainMenuDarkModeButton").on("click", function () {
        toggleDarkMode(darkMode);
    });

    function toggleDarkMode(current) {
        $(".dark-mode-label").text(current ? "dark_mode" : "light_mode");
        darkModeEnabledElements.forEach(obj => {
            //{element,prop}
            obj.element.forEach(element => {
                //iterate props
                obj.props.forEach(prop => {
                    //change each prop
                    const value = $(element).css("--" + (current ? "light" : "dark") + "-" + prop);
                    $(element).css(prop, value);
                });
            })
        });
        //If cards are locked, button should change correctly.
        if (locked) {
            $("#lockPersonalCards, #lockPersonalCardsLabel").css("background-color", (current ? "var(--red)" : "var(--dark-red)"));
        }
        darkMode = !current;
    }

    const languageLabels = ["Switch language", "Cambia lingua"];
    let languageIndex = 0;
    let languageInterval = window.setInterval(function () {
        if (languageIndex == languageLabels.length) {
            languageIndex = 0;
        }
        $(".language-label").text(languageLabels[languageIndex]);
        languageIndex++;
    }, 2000);

    $("#advancedSettingsModalBackButton, #advancedSettingsToggle").on("click", function () {
        $("#advancedSettingsModal").toggle();
    });

    //Main menu buttons
    $("#mainMenuCreditsButton, #creditsModalBackButton").on("click", function () {
        //Open credits modal
        $("#creditsModal").toggle();
    });

    $("#playerNum").on("input", function () {
        updateFields();
    });

    $("#longNamesCompatibilityMode").on("change", function () {
        longNamesCompatibilityMode = $(this).is(":checked");
    });

    $("#hideDustCounter").on("change", function () {
        hideDustCounter = $(this).is(":checked");
    });

    $("#playerNameForm").on("submit", function (event) {
        event.preventDefault();
        $("#setup").css("display", "none");
        $("#mainGame").css("display", "block");
        $('#playerNameContainer input').each(function () {
            players.push(this.value); // "this" is the current element in the loop
        });

        //Save data
        localStorage.setItem("board", selectedBoard);
        localStorage.setItem("players", players);
        localStorage.setItem("date", new Date());
        localStorage.setItem("longNamesCompatibilityMode", longNamesCompatibilityMode);
        for (let i = 0; i < itemsArray.length; i++) {
            for (let j = 0; j < players.length; j++) {
                localStorage.setItem(("" + i + "," + j), "reset");
            }
        }
        if (selectedBoard == 5) {
            localStorage.setItem("hideDustCounter", hideDustCounter);
            localStorage.setItem("dust", 12);
            $("#dustCounterValue").text(12);
            if (hideDustCounter == false) {
                $(".dust-counter-box").css("display", "flex");
            }
        }

        fillTable();
    });

    $("#dustCounterDown").on("click", function () {
        let old = parseInt($("#dustCounterValue").text());
        $("#dustCounterValue").text(old - 1);
        localStorage.setItem("dust", old - 1);
    })

    $("#dustCounterUp").on("click", function () {
        let old = parseInt($("#dustCounterValue").text());
        $("#dustCounterValue").text(old + 1);
        localStorage.setItem("dust", old + 1);
    });

    function fillTable() {
        //TABLE SECTION PLAYERS
        for (let i = 0; i < players.length; i++) {
            let cell = $("<th>").attr("class", "name-holder");
            cell.attr("scope", "col");
            if (longNamesCompatibilityMode && longNamesCompatibilityMode != 'false') {
                const sideways = $("<span>").addClass("sideways").text(players[i]);
                const initial = $("<span>").text(players[i].trim().charAt(0));
                cell.append(sideways, $("<br>"), initial);
            } else {
                cell.text(players[i]);
            }
            let color = $("#tableHeaderPlayers").css("background-color");
            cell.css("background-color", color);
            $("#tableRowPlayers").append(cell);
        }

        //TABLE SECTION CHARACTERS
        const characterArray = boards[selectedBoard]["characters"];
        $("#tableHeaderCharacters").attr("colspan", players.length + 2);

        for (let c = 0; c < characterArray.length; c++) {
            let currentRow = $("<tr>").attr("class", "table-row");

            currentRow.append(getCheckboxCell(characterArray[c]));

            let header = $("<td>").attr("class", "table-header");
            header.attr("scope", "row");
            header.text(characterArray[c]);
            currentRow.append(header);

            for (let i = 0; i < players.length; i++) {
                currentRow.append(getCellLink(i, characterArray[c]));
            }
            $("#tableSectionCharacters").append(currentRow);
        }

        //TABLE SECTION WEAPONS
        const weaponArray = boards[selectedBoard]["weapons"];
        $("#tableHeaderWeapons").attr("colspan", players.length + 2);

        for (let w = 0; w < weaponArray.length; w++) {
            let currentRow = $("<tr>").attr("class", "table-row");

            currentRow.append(getCheckboxCell(weaponArray[w]));

            let header = $("<td>").attr("class", "table-header");
            header.attr("scope", "row");
            header.text(weaponArray[w]);
            currentRow.append(header);

            for (let i = 0; i < players.length; i++) {
                currentRow.append(getCellLink(i, weaponArray[w]));
            }
            $("#tableSectionWeapons").append(currentRow);
        }

        //TABLE SECTION ROOMS
        const roomArray = boards[selectedBoard]["rooms"];
        $("#tableHeaderRooms").attr("colspan", players.length + 2);

        for (let r = 0; r < roomArray.length; r++) {
            let currentRow = $("<tr>").attr("class", "table-row");

            currentRow.append(getCheckboxCell(roomArray[r]));

            let header = $("<td>").attr("class", "table-header");
            header.attr("scope", "row");
            header.text(roomArray[r]);
            currentRow.append(header);

            for (let i = 0; i < players.length; i++) {
                currentRow.append(getCellLink(i, roomArray[r]));
            }
            $("#tableSectionRooms").append(currentRow);
        }
    }

    function updateTable() {
        $(".cell-image-link").find("img").each(function () {
            let id = localStorage.getItem($(this).data("key"));
            $(this).attr("src", imageData[id]).attr("class", id);
        })
        $("tr").find(".table-header-checkbox-cell").each(function () {
            let item = $(this).find("input").data("item");
            let index = itemsArray.indexOf(item);
            if (localStorage.getItem("check" + index)) {
                $(this).find("input").prop("checked", true);
                $(this).closest(".table-row").find("td > a").data("locked", "true");
                $(this).closest(".table-row").addClass("locked");
                toggleDarkMode(!darkMode);
            }
        })
    }

    let toUpdate = undefined, oldID = undefined;

    function getCellLink(number, item) {
        let cell = $("<td>");
        let cellLink = $("<a>").attr("class", "cell-image-link");
        cellLink.attr("id", "cellLink");
        cellLink.data("locked", "false");
        cellLink.data("player", number.toString());
        cellLink.data("item", item);
        cellLink.on("click", function () {
            //Only if data-locked: false
            if ($(this).data("locked") == "false") {
                //Call selection modal
                oldID = $(this).find("img").attr("class");
                $("#selectionModal").toggle();
                toUpdate = $(this);
            }
        });
        let cellImage = $("<img>");
        cellImage.attr("src", "assets/reset.svg");
        cellImage.attr("class", "reset");
        cellImage.data("key", "" + itemsArray.indexOf(item) + "," + number);
        cellLink.append(cellImage);
        cell.append(cellLink);
        return cell;
    }

    const checkboxSvg = "<svg viewBox=\"0 0 35.6 35.6\"><circle class=\"background\" cx=\"17.8\" cy=\"17.8\" r=\"17.8\"></circle><circle class=\"stroke\" cx=\"17.8\" cy=\"17.8\" r=\"14.37\"></circle><polyline class=\"checked\" points=\"11.78 18.12 15.55 22.23 25.17 12.87\"></polyline></svg>";

    function getCheckboxCell(item) {
        let checkboxDiv = $("<div>").addClass("checkbox-wrapper-31 checkbox-wrapper-32");

        let checkbox = $("<input>").attr("type", "checkbox");
        checkbox.attr("id", "rowCheckbox");
        checkbox.data("item", item);
        checkbox.attr("class", "table-header-checkbox");
        checkbox.on("change", function () {
            if ($(this).is(":checked")) {
                $(this).closest(".table-row").find("td > a").data("locked", "true");
                $(this).closest(".table-row").addClass("locked");
                if (darkMode) {
                    $(this).closest(".table-row").css("background-color", "var(--dark-red");
                }
                //Update symbols
                toUpdate = $(this);
                updateWholeRow("cross");
                //Save checked status in LocalData
                localStorage.setItem("check" + itemsArray.indexOf(item), true);

            } else {
                $(this).closest(".table-row").find("td > a").data("locked", "false");
                $(this).closest(".table-row").removeClass("locked");
                $(this).closest(".table-row").css("background-color", "");
                //Update symbols
                toUpdate = $(this);
                updateWholeRow("reset");
                localStorage.removeItem("check" + itemsArray.indexOf(item));
            }
        });

        let checkboxCell = $("<th>").attr("class", "table-header-checkbox-cell");
        checkboxCell.attr("scope", "row");
        checkboxDiv.append(checkbox, checkboxSvg);
        checkboxCell.append(checkboxDiv);
        return checkboxCell;
    }

    $("#showInstructionsModal, #instructionsModalBackButton").on("click", function () {
        $("#instructionsModal").toggle();
    });

    $("#autocompleteInput").on("input", function () {
        $("#autocompleteStatus").text((document.getElementById("autocompleteInput").checked) ? "ON" : "OFF");
    });

    $("#lockPersonalCards").on("click", function () {
        if (!locked) {   //if currently unlocked, locks cards
            $(".table-header-checkbox").each(function () {
                $(this).attr("disabled", "disabled");
            });
            $("#lockPersonalCards, #lockPersonalCardsLabel").css("background-color", (darkMode ? "var(--dark-red)" : "var(--red)"));
            $("#lockPersonalCardsLabel").text("lock");
            locked = true;
        } else {        //if currently locked, unlocks cards
            $(".table-header-checkbox").each(function () {
                $(this).removeAttr("disabled");
            });
            $("#lockPersonalCards, #lockPersonalCardsLabel").css("background-color", (darkMode ? "var(--light-blue)" : "var(--dark-blue)"));
            $("#lockPersonalCardsLabel").text("lock_open_right");
            locked = false;
        }
    });

    $("#showLessSymbolsCheckbox").on("change", function () {
        $("#selectionModalExtended").toggle();
    })

    function updateWholeRow(id) {
        toUpdate.closest(".table-row").find("img").attr("src", imageData[id]).attr("class", id);
        let rowName = itemsArray.indexOf(toUpdate.data("item"));
        for (let i = 0; i < players.length; i++) {
            localStorage.setItem(("" + rowName + "," + i), id);
        }
    }

    $("#modalBackButton").on("click", function () {
        $("#selectionModal").toggle();
    });

    $(".selection-modal-image").on("click", function () {
        const newID = $(this).attr("id");

        $("#selectionModal").toggle();

        //Se spunto e autocompl. ON, metti croci sulla riga
        if (newID == "check" && document.getElementById("autocompleteInput").checked) {
            updateWholeRow("cross");
        } else if (oldID == "check" && newID != "check" && document.getElementById("autocompleteInput").checked) {
            //Se tolgo spunta, metti reset
            updateWholeRow("reset");
        }

        //Aggiorna la casella vera
        const img = $(toUpdate.find("img"));
        $(img).removeClass($(img).attr("class"));
        $(img).addClass(newID);
        $(img).attr("src", imageData[newID]);

        //Aggiorna LocalData
        let rowName = itemsArray.indexOf(toUpdate.data("item"));
        let columnName = parseInt(toUpdate.data("player"));
        localStorage.setItem(("" + rowName + "," + columnName), newID);
        localStorage.setItem("date", new Date());
    })

    //INSTRUCTIONS MODAL IMAGE

    //Image 1: Cards given
    const instructionsModalImage1 = ["shelves", "kitchen", "candle", "person", "dinner_dining", "chair"];
    let im1Index = 0;
    let im1Interval = window.setInterval(function () {
        if (im1Index == instructionsModalImage1.length) {
            im1Index = 0;
        }
        $("#instructionsModalImage1, #instructionsModalImage2B").text(instructionsModalImage1[im1Index]);
        im1Index++;
    }, 2000);

    //Image 2: Check box
    let im2Interval = window.setInterval(function () {
        $("#fakeCheckbox").click();
        $(".fake-table").css("background-color", ($("#fakeCheckbox").prop("checked") ?
            (darkMode ? "var(--dark-red)" : "var(--red)")
            : ""))
    }, 2000);

    //Image 3: Lock cards
    let im3Locked = false;
    let im3Interval = window.setInterval(function () {
        im3Locked = !im3Locked;
        //Change bg
        $("#fakeButton").css("background-color", im3Locked ?
            (darkMode ? "var(--dark-red)" : "var(--red)") :
            (darkMode ? "var(--light-blue)" : "var(--dark-blue)"));
        //Change label
        $("#fakeButtonLabel").text(im3Locked ? "lock" : "lock_open_right");
    }, 2000);
})