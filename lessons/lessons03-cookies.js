'use strict';

// Напишите функцию setCookie(name, value, days), которая устанавливает cookie с указанным именем, значением и сроком действия в днях.
let setCookie = (name, value, days) => {
    let expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    let cookieValue =
        encodeURIComponent(value) + '; expires=' + expirationDate.toUTCString();
    document.cookie = name + '=' + cookieValue;
};
setCookie('username', 'John Doe', 7);
setCookie('userinfo', 'Mister', 5);
setCookie('userinfo2', 'Mister2', 55);

// Напишите функцию getCookie(name), которая возвращает значение сокіе с указанным именем.
let getCookie = (name) => {
    let cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        let [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
};

let username = getCookie('username');
console.log('Value of cookie "username": ', username);
console.log('Value of cookie "userinfo": ', getCookie('userinfo'));
console.log('Value of cookie "userinfo2": ', getCookie('userinfo2'));

// Напишите функцию deleteCookie(name), которая удаляет cookie с указанным именем.

//we have to get current path on our server for path=/${path} like /my-folder/index.html
const getCookiesPath = () => {
    const path = window.location.pathname;
    const pathArray = path.split('/');
    let cookiePath = '/';
    for (let i = 0; i < pathArray.length - 1; i++) {
        cookiePath += `${pathArray[i]}`;
    }
    return cookiePath;
};

// console.log(getCookiesPath());

let deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${getCookiesPath()};`;
};

deleteCookie('userinfo');
console.log('Value of cookie "userinfo": ', getCookie('userinfo'));

//LocalStorage

localStorage.setItem('username', 'John');
console.log(
    'The value from LocalStorage is :',
    localStorage.getItem('username')
);
localStorage.removeItem('username');
console.log(
    'The value from LocalStorage is :',
    localStorage.getItem('username')
);

localStorage.setItem('username', 'Lex');
localStorage.setItem('isLogged', true);

/**
 * ATTENTION!!!!
 * CLEAR() is very dangerous thing!!!
 * It clears all localStorage for the page
 * all that below in the code!!!
 */
// localStorage.clear();

//Check that localStorage is empty
console.log('localStorage is: ', localStorage);
console.log('localStorage length is: ', localStorage.length);

//Task about Counter which contains in the LocalStorage!
class Counter {
    #count = 0;
    constructor() {
        const counter = localStorage.getItem('counter');
        this.#count = Number.parseInt(counter) || 0;
        this.showCounter();
    }
    setCounter() {
        const counter = localStorage.getItem('counter') || '0';
        this.#count = Number.parseInt(counter) + 1;
        localStorage.setItem('counter', this.#count.toString());
    }
    get Counter() {
        return this.#count;
    }
    showCounter() {
        document.querySelector('.count').textContent = this.#count;
    }
}

const counter = new Counter();
document.querySelector('.count-btn').addEventListener('click', () => {
    counter.setCounter();
    counter.showCounter();
});

// Task about Shopping list from LocalStorage

class ShoppingList {
    #shoppingList = [];
    constructor() {
        this.#shoppingList =
            JSON.parse(localStorage.getItem('shoppingList')) || [];
    }

    get ShoppingList() {
        return this.#shoppingList;
    }

    updateShoppingList() {
        itemList.innerHTML = '';

        this.#shoppingList.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = item;
            itemList.append(listItem);
        });

        localStorage.setItem(
            'shoppingList',
            JSON.stringify(this.#shoppingList)
        );
    }

    addNewItem() {
        const item = inputField.value.trim();
        if (item !== '') {
            this.#shoppingList.push(item);
            inputField.value = '';
            this.updateShoppingList();
        }
    }
}

const inputField = document.getElementById('item-input');
const addBtn = document.getElementById('add-btn');
const itemList = document.getElementById('item-list');

const shoppingList = new ShoppingList();
shoppingList.updateShoppingList();

addBtn.addEventListener('click', () => {
    shoppingList.addNewItem();
});

localStorage.setItem('test', 1);
localStorage.test = 2;

// Генератор для генерации последовательности чисел
function* numberGenerator() {
    let number = 1;
    while (true) {
        yield number;
        number++;
    }
}

// Создаем экземпляр генератора
const generator = numberGenerator();

// Генерируем итератор, который будет возвращать следующее число при каждом вызове next()
console.log(generator.next().value); // 1
console.log(generator.next().value); // 2
console.log(generator.next().value); // 3
console.log(generator.next().value); // 4
