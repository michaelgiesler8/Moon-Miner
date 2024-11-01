// app.js
document.addEventListener("DOMContentLoaded", () => {
    // Initialize variables for resource collection
    let cheeseCount = 0;
    let totalResourcesCollected = 0;
    let clickPower = 1;
    let autoCollectionRate = 0;

    // Upgrades
    const clickUpgrades = [
        { name: "pickaxe", price: 50, quantity: 0, bonus: 1 },
        { name: "cart", price: 250, quantity: 0, bonus: 4 },
    ];
    const autoUpgrades = [
        { name: "miner", price: 1000, quantity: 0, bonus: 10 },
        { name: "rover", price: 50000, quantity: 0, bonus: 100 },
    ];

    // DOM elements
    const cheeseCountElement = document.getElementById("cheese-count");
    const currentResourcesElement = document.getElementById("current-resources");
    const totalResourcesElement = document.getElementById("total-resources");
    const clickPowerElement = document.getElementById("click-power");
    const autoRateElement = document.getElementById("auto-rate");

    function mine() {
        cheeseCount += clickPower;
        totalResourcesCollected += clickPower;
        updateDisplay();
    }

    function updateDisplay() {
        // Update game display
        cheeseCountElement.innerText = cheeseCount;
        clickPowerElement.innerText = clickPower;
        autoRateElement.innerText = autoCollectionRate;

        // Update stats display
        currentResourcesElement.innerText = cheeseCount;
        totalResourcesElement.innerText = totalResourcesCollected;

        // Update button states
        updateButtons();
    }

    function updateButtons() {
        document.getElementById("buy-pickaxe").disabled = cheeseCount < clickUpgrades[0].price;
        document.getElementById("buy-cart").disabled = cheeseCount < clickUpgrades[1].price;
        document.getElementById("buy-miner").disabled = cheeseCount < autoUpgrades[0].price;
        document.getElementById("buy-rover").disabled = cheeseCount < autoUpgrades[1].price;
    }

    function buyUpgrade(upgrade, type) {
        if (cheeseCount >= upgrade.price) {
            cheeseCount -= upgrade.price;
            upgrade.quantity++;
            upgrade.price = Math.floor(upgrade.price * 1.2);
            if (type === "click") {
                clickPower += upgrade.bonus;
            } else {
                autoCollectionRate += upgrade.bonus;
            }
            updateDisplay();
        }
    }

    function collectAutoUpgrades() {
        cheeseCount += autoCollectionRate;
        totalResourcesCollected += autoCollectionRate;
        updateDisplay();
    }

    // Tab switching functionality
    document.getElementById("tab-game").addEventListener("click", () => {
        document.getElementById("game-content").classList.add("active");
        document.getElementById("stats-content").classList.remove("active");
        document.getElementById("tab-game").classList.add("active");
        document.getElementById("tab-stats").classList.remove("active");
    });

    document.getElementById("tab-stats").addEventListener("click", () => {
        document.getElementById("game-content").classList.remove("active");
        document.getElementById("stats-content").classList.add("active");
        document.getElementById("tab-game").classList.remove("active");
        document.getElementById("tab-stats").classList.add("active");
    });

    // Event listeners for mining and purchasing upgrades
    document.getElementById("mine-image").onclick = mine;
    document.getElementById("buy-pickaxe").onclick = () => buyUpgrade(clickUpgrades[0], "click");
    document.getElementById("buy-cart").onclick = () => buyUpgrade(clickUpgrades[1], "click");
    document.getElementById("buy-miner").onclick = () => buyUpgrade(autoUpgrades[0], "auto");
    document.getElementById("buy-rover").onclick = () => buyUpgrade(autoUpgrades[1], "auto");

    // Set interval for automatic collection every 3 seconds
    setInterval(collectAutoUpgrades, 3000);
    updateDisplay();
});