let history = [];

function rollDice(numDice, diceType, modifier) {
    let results = [];
    let total = 0;
    
    for (let i = 0; i < numDice; i++) {
        let roll = Math.floor(Math.random() * diceType) + 1 + modifier;
        results.push(roll);
        total += roll;
    }
    
    return { rolls: results, total: total };
}

function addDiceRow() {
    const diceList = document.getElementById("diceList");
    const div = document.createElement("div");
    div.classList.add("form-group");
    div.innerHTML = `
        <label>Tipo:</label>
        <select class="diceType">
            <option value="4">D4</option>
            <option value="6">D6</option>
            <option value="8">D8</option>
            <option value="10">D10</option>
            <option value="12">D12</option>
            <option value="20">D20</option>
            <option value="100">D100</option>
        </select>
        <label>Qtd:</label>
        <input type="number" class="diceCount" min="1" value="1" style="width: 50px;" />
        <label>Mod:</label>
        <input type="number" class="modifier" value="0" style="width: 50px;" />
        <button class="remove-dice">X</button>
    `;
    diceList.appendChild(div);
    div.querySelector(".remove-dice").addEventListener("click", () => div.remove());
}

document.getElementById("addDice").addEventListener("click", addDiceRow);

document.getElementById("rollButton").addEventListener("click", () => {
    const diceRows = document.querySelectorAll("#diceList .form-group");
    let totalSum = 0;
    let allRolls = [];
    document.getElementById("diceResults").innerHTML = "";

    diceRows.forEach(row => {
        const diceType = parseInt(row.querySelector(".diceType").value);
        const numDice = parseInt(row.querySelector(".diceCount").value);
        const modifier = parseInt(row.querySelector(".modifier").value);
        
        const result = rollDice(numDice, diceType, modifier);
        totalSum += result.total;
        allRolls.push(`(${numDice}d${diceType} + ${modifier}) ➝ ${result.rolls.join(", ")}`);
    });

    document.getElementById("totalResult").innerText = `Total: ${totalSum}`;
    history.unshift(allRolls.join(" | ") + ` (Total: ${totalSum})`);
    if (history.length > 10) history.pop();
    document.getElementById("history").innerHTML = `<strong>Histórico de Rolagens:</strong><br>${history.join('<br>')}`;
});

addDiceRow();