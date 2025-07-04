// wwwroot/js/scoreboard.js

document.addEventListener("DOMContentLoaded", function () {
    const app = document.getElementById("scoreboard-app");

    // Example: create number-of-players selector
    const playerSelect = document.createElement("select");
    playerSelect.id = "numPlayers";
    for (let i = 1; i <= 4; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = `Player ${i}`;
        playerSelect.appendChild(option);
    }
    app.appendChild(playerSelect);

    // TODO: Add input fields, tables, and score logic
    // TODO: Use localStorage to save/load state
});
