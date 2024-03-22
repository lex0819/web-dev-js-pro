'use strict';

//Task01

const musicCollection = [
    {
        title: 'Arrival',
        artist: 'ABBA',
        year: '1976',
    },
    {
        title: 'Voulez-Vous',
        artist: 'ABBA',
        year: '1979',
    },
    {
        title: 'The Visitors',
        artist: 'ABBA',
        year: '1981',
    },
];

musicCollection[Symbol.iterator] = function () {
    return {
        current: 0,
        last: this.length,
        next() {
            return this.current < this.last
                ? { done: false, value: musicCollection[this.current++] }
                : { done: true };
        },
    };
};

for (const album of musicCollection) {
    console.log(`${album.title} -  ${album.artist} (${album.year})`);
}

// Task02

const cooks = new Map();
cooks.set('Виктор', 'Пицца');
cooks.set('Ольга', 'Суши');
cooks.set('Дмитрий', 'Десерты');

const dishesOfCook = new Map();
dishesOfCook.set('Виктор', 'Пицца "Маргарита"');
dishesOfCook.set('Виктор', 'Пицца "Пепперони"');
dishesOfCook.set('Ольга', 'Суши "Филадельфия"');
dishesOfCook.set('Ольга', 'Суши "Калифорния"');
dishesOfCook.set('Дмитрий', 'Тирамису');
dishesOfCook.set('Дмитрий', 'Чизкейк');

const customers = new Map();
customers.set('Алексей', [
    'Пицца "Пепперони"',
    'Тирамису',
    'Тирамису',
    'Пицца "Пепперони"',
]);
customers.set('Мария', [
    'Суши "Калифорния"',
    'Суши "Калифорния"',
    'Пицца "Маргарита"',
]);
customers.set('Ирина', ['Чизкейк', 'Чизкейк']);

for (let [key, value] of customers) {
    // console.log(key, value);
    const order = Array.from(new Set(value));
    console.log(`Клиент ${key} заказал: ${order.toString()}`);
}
