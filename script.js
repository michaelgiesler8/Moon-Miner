let cheeseCount = 0;
let clickPower = 0;
let autoCollectionRate = 0;

const clickUpgrades = [
    { name: "Pickaxe", quantity: 0, price: 10, bonus: 1 },
    { name: "Cart", quantity: 0, price: 50, bonus: 4 },
];

const autoUpgrades = [
    { name: "Miner", quantity: 0, price: 100, bonus: 5 },
    { name: "Rover", quantity: 0, price: 500, bonus: 20 },
];

function mine() {
    cheeseCount += clickPower;
    updateCheeseCount();
}

function updateDisplay() {
    document.getElementById("cheese-count").innerText = cheeseCount;
    document.getElementById("click-power").innerText = clickPower;
    document.getElementById("auto-collection").innerText = autoCollectionRate;
}

function buyPickaxe() {
    const pickaxe = clickUpgrades.find(upgrade => upgrade.name === "Pickaxe");
    if (cheeseCount >= pickaxe.price) {
        cheeseCount -= pickaxe.price;
        pickaxe.quantity++;
        clickPower += pickaxe.bonus;
        pickaxe.price = Math.floor(pickaxe.price * 1.2)
        updateDisplay();
    }
}

function buyCart() {
    const cart = clickUpgrades.find(upgrade => upgrade.name === "Cart");
    if (cheeseCount >= cart.price) {
        cheeseCount -= cart.price;
        cart.quantity++;
        clickPower += cart.bonus;
        cart.price = Math.floor(cart.price * 1.2);
        updateDisplay();
    }
}