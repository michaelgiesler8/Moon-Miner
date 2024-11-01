// app.js
document.addEventListener("DOMContentLoaded", () => {
    let cheeseCount = 0;
    let clickPower = 1;
    let autoCollectionRate = 0;

    const clickUpgrades = [
        { name: "pickaxe", price: 50, quantity: 0, bonus: 1 },
        { name: "cart", price: 250, quantity: 0, bonus: 4 },
    ];

    const autoUpgrades = [
        { name: "miner", price: 1000, quantity: 0, bonus: 10 },
        { name: "rover", price: 50000, quantity: 0, bonus: 100 },
    ];

    // DOM Elements
    const cheeseCountElement = document.getElementById("cheese-count");
    const clickPowerElement = document.getElementById("click-power");
    const autoRateElement = document.getElementById("auto-rate");

    function mine() {
        console.log("Mine function triggered"); // Debugging log
        cheeseCount += clickPower;
        updateDisplay();
    }

    function updateDisplay() {
        cheeseCountElement.innerText = cheeseCount;
        clickPowerElement.innerText = clickPower;
        autoRateElement.innerText = autoCollectionRate;

        // Update upgrade prices
        document.getElementById("pickaxe-price").innerText = clickUpgrades[0].price;
        document.getElementById("cart-price").innerText = clickUpgrades[1].price;
        document.getElementById("miner-price").innerText = autoUpgrades[0].price;
        document.getElementById("rover-price").innerText = autoUpgrades[1].price;

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
        updateDisplay();
    }

    // Event Listeners for mining and purchasing upgrades
    document.getElementById("mine-image").onclick = mine; // Attach click event to image
    document.getElementById("buy-pickaxe").onclick = () => buyUpgrade(clickUpgrades[0], "click");
    document.getElementById("buy-cart").onclick = () => buyUpgrade(clickUpgrades[1], "click");
    document.getElementById("buy-miner").onclick = () => buyUpgrade(autoUpgrades[0], "auto");
    document.getElementById("buy-rover").onclick = () => buyUpgrade(autoUpgrades[1], "auto");

    // Set interval for automatic collection
    setInterval(collectAutoUpgrades, 3000);
    updateDisplay();
});