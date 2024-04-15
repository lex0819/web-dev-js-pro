'use strict';

class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.topping = [];
    }
    sizeList = [
        {
            name: 'Маленький',
            price: 50,
            calories: 20,
        },
        {
            name: 'Большой',
            price: 100,
            calories: 40,
        },
    ];
    stuffingList = [
        {
            name: 'C сыром',
            price: 10,
            calories: 20,
        },
        {
            name: 'C салатом',
            price: 20,
            calories: 5,
        },
        {
            name: 'C картофелем',
            price: 15,
            calories: 10,
        },
    ];
    toppingList = [
        {
            name: 'приправа',
            price: 15,
            calories: 0,
        },
        {
            name: 'майонез',
            price: 20,
            calories: 5,
        },
    ];
    addTopping(topping) {
        if (topping === '') {
            return;
        }
        if (this.topping.includes(topping)) {
            return;
        }
        this.topping.push(topping);
    } // Добавить добавку
    removeTopping(topping) {
        const index = this.topping.findIndex((it) => it !== topping);
        this.topping.splice(index, 1);
    } // Убрать добавку
    getToppings() {
        return this.topping;
    } // Получить список добавок
    getSize() {
        return this.size;
    } // Узнать размер гамбургера
    getStuffing() {
        return this.stuffing;
    } // Узнать начинку гамбургера

    calculatePrice() {
        let totalCost = +this.sizeList.find((it) => it.name === this.size)
            .price;
        totalCost += +this.stuffingList.find((it) => it.name === this.stuffing)
            .price;
        this.topping.map((it) => {
            totalCost += +this.toppingList.find((el) => el.name === it).price;
        });
        return totalCost;
    } // Узнать цену
    calculateCalories() {
        let totalCalories = +this.sizeList.find((it) => it.name === this.size)
            .calories;
        totalCalories += +this.stuffingList.find(
            (it) => it.name === this.stuffing
        ).calories;
        this.topping.map((it) => {
            totalCalories += +this.toppingList.find((el) => el.name === it)
                .calories;
        });
        return totalCalories;
    } // Узнать калорийность
}

const size = document.getElementById('size');
const stuffing = document.getElementById('stuffing');

const hamburger = new Hamburger(size.value, stuffing.value);

size.addEventListener('change', () => {
    hamburger.size = size.value;
});

stuffing.addEventListener('change', () => {
    hamburger.stuffing = stuffing.value;
});

const printHtml = document.querySelector('.print');

function createHamburgerHtml() {
    printHtml.innerHTML = '<h2>Your hamburger is finished!<h2>';

    let res = document.createElement('div');

    res.innerHTML = `
    <p>size is ${hamburger.size}</p>
    <p>stuffing is ${hamburger.stuffing}</p>
    <p>toppings are ${hamburger.topping.join(',')}</p>
    <p>total price is ${hamburger.calculatePrice()}</p>
    <p>total calories is ${hamburger.calculateCalories()}</p>
    `;

    printHtml.append(res);
}

const toppingList = document.querySelector('.toppings');
toppingList.addEventListener('change', ({ target }) => {
    if (target.checked === true) {
        hamburger.addTopping(target.value);
    } else {
        hamburger.removeTopping(target.value);
    }
});

const calcBtn = document.querySelector('.calc-btn');
calcBtn.addEventListener('click', () => {
    createHamburgerHtml();
});
