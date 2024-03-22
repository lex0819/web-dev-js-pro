'use strict';

// Задание 1 (тайминг 20 минут)
// Создать механизм для безопасного добавления метаданных к объектам книг с использованием Symbol.
// 1. Создать уникальные символы для метаданных: отзывы, рейтинг, теги.
// 2. Реализовать функции addMetadata (добавление метаданных) и getMetadata (получение метаданных).
// 3. Создать объект книги, добавить метаданные и вывести их на консоль.

const reviewSymbol = Symbol('review');
const rateSymbol = Symbol('rate');
const tagSymbol = Symbol('tag');

const addMetadata = (book, metadataType, payload) => {
    if (book[metadataType]) {
        book[metadataType].push(payload);
    } else {
        book[metadataType] = [payload];
    }
};

const getMetadata = (book, metadataType) => {
    return book[metadataType];
};

const book01 = { title: '1984', author: 'George Orwell' };

addMetadata(book01, reviewSymbol, 'The best!!');
addMetadata(book01, rateSymbol, '5');
addMetadata(book01, tagSymbol, 'space');
addMetadata(book01, reviewSymbol, 'Very good!!');
addMetadata(book01, reviewSymbol, 'I like it!!');
addMetadata(book01, reviewSymbol, 'Excelent!!');
addMetadata(book01, tagSymbol, 'drama');
console.log(book01);

console.log(getMetadata(book01, reviewSymbol));
console.log(getMetadata(book01, rateSymbol));
console.log(getMetadata(book01, tagSymbol));

//  Задание 2 (тайминг 20 минут)
// Используя Symbol.iterator, создайте объект "Библиотека", который можно итерировать. Каждая итерация должна возвращать следующую книгу из библиотеки.
// 1. Создайте объект library, который содержит массив книг и имеет свойство- символ Symbol.iterator.
// 2. Реализуйте кастомный итератор для объекта library. Итератор должен перебирать книги по порядку.
// 3. Используйте цикл for...of для перебора книг в библиотеке и вывода их на консоль.
// Массив книг:
// const books = [
// { title: "1984", author: "George Orwell" },
// { title: "Brave New World", author: "Aldous Huxley" },
// { title: "Fahrenheit 451", author: "Ray Bradbury" }
// ];

const books = [
    { title: '1984', author: 'George Orwell' },
    { title: 'Brave New World', author: 'Aldous Huxley' },
    { title: 'Fahrenheit 451', author: 'Ray Bradbury' },
];

books[Symbol.iterator] = function () {
    return {
        current: 0,
        last: this.length,
        next() {
            return this.current < this.last
                ? { done: false, value: books[this.current++] }
                : { done: true };
        },
    };
};

for (const book of books) {
    console.log(`Book ${book.title} by ${book.author}`);
}

// Задание 3 (тайминг 15 минут)
// Часто при работе с DOM мы сталкиваемся с коллекциями элементов, которые не являются стандартными массивами, но похожи на них. Однако у таких коллекций нет методов массива, и здесь на помощь приходит Array.from. В этом задании вы научитесь конвертировать коллекции DOM-элементов в массивы и работать с ними.
// Дан код html:
//      <div>Element 1</div>
//      <div data-active="true">Element 2</div>
//      <div>Element 3</div>
//      <div data-active="true">Element 4</div>
// Напишите функцию, которая собирает все элементы <div> на странице, преобразует их в массив и фильтрует только те из них, у которых есть атрибут data-active.
// Выведите результат на консоль.

console.log(document.querySelectorAll("div[data-active='true']"));

const findDivDataActive = (selector) => {
    const collection = document.querySelectorAll(selector);

    const array = Array.from(collection);

    // const result = array.filter((item) => item.hasAttribute('data-active'));
    // return result;
    const result01 = array.filter((item) => item.dataset.active);
    return result01;
};

console.log(findDivDataActive('div'));

// Задание 4 (тайминг 20 минут)
// Представьте себе ситуацию: у нас есть группа студентов, и мы хотим отследить, кто из них посетил какие уроки и кто из преподавателей вёл данные уроки.
// 1. Map будет использоваться для хранения соответствия между уроком и преподавателем.
// 2. Set будет использоваться для хранения уникальных уроков, которые посетил каждый студент.

// // 1. Map: урок => преподаватель
// let lessons = new Map();
// "Математика", "Смирнов"
// "История", "Иванова"

// // 2. Map: студент => Set уроков

// // Проверка:
// console.log(`Преподаватель по Математике: ${lessons.get("Математика")}`); // Смирнов
// console.log(`Уроки Ивана: тут вывод уроков Ивана`); // Математика, История

let lessons = new Map();
lessons.set('Математика', 'Смирнов');
lessons.set('История', 'Иванова');
lessons.set('Английский', 'Доценко');

console.log(`Преподаватель по Математике: ${lessons.get('Математика')}`);

let student = new Map();

// let lessonsOfStudent = new Set();
// lessonsOfStudent.add('Математика');
// lessonsOfStudent.add('Математика');
// lessonsOfStudent.add('История');
// lessonsOfStudent.add('История');
// lessonsOfStudent.add('История');
// student.set('Иван', lessonsOfStudent);

student.set('Иван', [
    'Математика',
    'Математика',
    'История',
    'Математика',
    'История',
    'Математика',
    'История',
]);

console.log(`Уроки Ивана: ${Array.from(new Set(student.get('Иван')))}`);
