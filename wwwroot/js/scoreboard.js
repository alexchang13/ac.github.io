document.addEventListener("DOMContentLoaded", function () {
    const app = document.getElementById("scoreboard-app");

    let numPlayers = 4;
    let playerNames = Array(numPlayers).fill().map((_, i) => `Player ${i + 1}`);
    let numGames = 10;
    let scores = [];

    // Form Controls
    const form = document.createElement("div");

    const playerLabel = document.createElement("label");
    playerLabel.textContent = "Select Number of Players: ";

    const playerSelect = document.createElement("select");
    for (let i = 1; i <= 4; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        if (i === numPlayers) option.selected = true;
        playerSelect.appendChild(option);
    }

    const gameLabel = document.createElement("label");
    gameLabel.textContent = " Enter Number of Games: ";

    const gameSelect = document.createElement("select");
    for (let i = 1; i <= 20; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        if (i === numGames) option.selected = true;
        gameSelect.appendChild(option);
    }

    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Reset";
    resetBtn.className = "btn btn-secondary mx-3";
    resetBtn.addEventListener("click", () => {
        scores = [];
        renderTable();
    });

    form.appendChild(playerLabel);
    form.appendChild(playerSelect);
    form.appendChild(gameLabel);
    form.appendChild(gameSelect);
    form.appendChild(resetBtn);
    app.appendChild(form);

    const tableContainer = document.createElement("div");
    tableContainer.className = "mt-3";
    app.appendChild(tableContainer);

    function calculateTotals() {
        const totals = Array(numPlayers).fill(0);
        for (let g = 0; g < numGames; g++) {
            for (let p = 0; p < numPlayers; p++) {
                totals[p] += parseInt(scores[g]?.[p] || 0);
            }
        }
        return totals;
    }

    function updateTotals() {
        const totals = calculateTotals();
        const totalRow = tableContainer.querySelector("tbody tr:last-child");
        if (totalRow) {
            const cells = totalRow.querySelectorAll("th, td");
            for (let p = 0; p < numPlayers; p++) {
                if (cells[p + 1]) {
                    cells[p + 1].textContent = totals[p];
                }
            }
        }
    }

    function renderTable() {
        tableContainer.innerHTML = "";
        const table = document.createElement("table");
        table.className = "table table-bordered text-center";
        const thead = document.createElement("thead");
        const headRow = document.createElement("tr");

        headRow.appendChild(createCell("Game #", true));
        playerNames.length = numPlayers;
        for (let p = 0; p < numPlayers; p++) {
            const th = document.createElement("th");
            const input = document.createElement("input");
            input.type = "text";
            input.value = playerNames[p] || `Player ${p + 1}`;
            input.className = "form-control text-center";
            input.addEventListener("input", () => {
                playerNames[p] = input.value;
            });
            th.appendChild(input);
            headRow.appendChild(th);
        }

        thead.appendChild(headRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        for (let g = 0; g < numGames; g++) {
            const row = document.createElement("tr");
            row.appendChild(createCell(`${g + 1}`, false));
            scores[g] = scores[g] || [];

            for (let p = 0; p < numPlayers; p++) {
                const td = document.createElement("td");
                const input = document.createElement("input");
                input.type = "text";
                input.inputMode = "numeric";
                input.value = scores[g][p] || "";
                input.className = "form-control text-center";

                // Allow numeric input including negative numbers
                input.addEventListener("input", (e) => {
                    // Allow numbers, minus sign, but only one minus at the start
                    let value = e.target.value;
                    // Remove any character that's not a digit or minus
                    value = value.replace(/[^0-9-]/g, '');
                    // Ensure minus only appears at the start
                    if (value.indexOf('-') > 0) {
                        value = value.replace(/-/g, '');
                    }
                    // Ensure only one minus sign
                    const minusCount = (value.match(/-/g) || []).length;
                    if (minusCount > 1) {
                        value = '-' + value.replace(/-/g, '');
                    }
                    e.target.value = value;
                });

                // Update scores and totals only when leaving the cell OR pressing Enter
                const saveScore = () => {
                    const value = input.value.trim();
                    scores[g][p] = value ? parseInt(value) : 0;
                    input.value = scores[g][p] || "";
                    updateTotals();
                };

                input.addEventListener("blur", saveScore);

                input.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") {
                        saveScore();
                        // Move to next input
                        const inputs = Array.from(tbody.querySelectorAll('input[type="text"]'));
                        const currentIndex = inputs.indexOf(input);
                        if (currentIndex < inputs.length - 1) {
                            inputs[currentIndex + 1].focus();
                        }
                    }
                });

                td.appendChild(input);
                row.appendChild(td);
            }
            tbody.appendChild(row);
        }

        // Total row
        const totalRow = document.createElement("tr");
        totalRow.appendChild(createCell("Total", true));
        const totals = calculateTotals();
        for (let p = 0; p < numPlayers; p++) {
            totalRow.appendChild(createCell(totals[p], true));
        }
        tbody.appendChild(totalRow);

        table.appendChild(tbody);
        tableContainer.appendChild(table);
    }

    function createCell(content, isHeader = false) {
        const cell = document.createElement(isHeader ? "th" : "td");
        cell.textContent = content;
        cell.className = isHeader ? "fw-bold p-2" : "p-2";
        return cell;
    }

    // Event Listeners
    playerSelect.addEventListener("change", () => {
        numPlayers = parseInt(playerSelect.value);
        scores = [];
        renderTable();
    });

    gameSelect.addEventListener("change", () => {
        numGames = parseInt(gameSelect.value);
        scores = [];
        renderTable();
    });

    renderTable();

    // Calculator
    const calculatorLabel = document.createElement("h5");
    calculatorLabel.className = "fw-bold mt-4";
    calculatorLabel.textContent = "Addition Calculator";
    app.appendChild(calculatorLabel);

    const calculatorDiv = document.createElement("div");
    const num1 = createCalcInput();
    const plus1 = document.createTextNode(" + ");
    const num2 = createCalcInput();
    const plus2 = document.createTextNode(" + ");
    const num3 = createCalcInput();
    const equals = document.createTextNode(" = ");
    const resultSpan = document.createElement("span");
    resultSpan.className = "fw-bold ms-2";
    resultSpan.textContent = "0";

    calculatorDiv.appendChild(num1.input);
    calculatorDiv.appendChild(plus1);
    calculatorDiv.appendChild(num2.input);
    calculatorDiv.appendChild(plus2);
    calculatorDiv.appendChild(num3.input);
    calculatorDiv.appendChild(equals);
    calculatorDiv.appendChild(resultSpan);

    app.appendChild(calculatorDiv);

    // Timer Section
    const timerSection = document.createElement("div");
    timerSection.className = "mt-4";

    const timerLabel = document.createElement("h5");
    timerLabel.className = "fw-bold";
    timerLabel.textContent = "1-Minute Timer";
    timerSection.appendChild(timerLabel);

    const timerDisplay = document.createElement("span");
    timerDisplay.className = "fw-bold ms-2";
    timerDisplay.textContent = "01:00";

    const startBtn = document.createElement("button");
    startBtn.textContent = "Start Timer";
    startBtn.className = "btn btn-primary mx-3";

    const resetTimerBtn = document.createElement("button");
    resetTimerBtn.textContent = "Reset Timer";
    resetTimerBtn.className = "btn btn-danger";

    let countdownInterval;
    let timerCanceled = false;

    startBtn.addEventListener("click", () => {
        timerCanceled = false;
        clearInterval(countdownInterval);
        let timeLeft = 60;

        countdownInterval = setInterval(() => {
            timeLeft--;

            const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
            const seconds = String(timeLeft % 60).padStart(2, '0');
            timerDisplay.textContent = `${minutes}:${seconds}`;

            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                timerDisplay.textContent = "00:00";
            }
        }, 1000);
    });

    resetTimerBtn.addEventListener("click", () => {
        timerCanceled = true;
        clearInterval(countdownInterval);
        timerDisplay.textContent = "01:00";
    });

    timerSection.appendChild(timerDisplay);
    timerSection.appendChild(startBtn);
    timerSection.appendChild(resetTimerBtn);
    app.appendChild(timerSection);

    function createCalcInput() {
        const input = document.createElement("input");
        input.type = "number";
        input.value = 0;
        input.className = "form-control d-inline-block text-center mx-1";
        input.style.width = "70px";

        input.addEventListener("blur", () => {
            resultSpan.textContent =
                parseInt(num1.input.value || 0) +
                parseInt(num2.input.value || 0) +
                parseInt(num3.input.value || 0);
        });

        return { input };
    }
});