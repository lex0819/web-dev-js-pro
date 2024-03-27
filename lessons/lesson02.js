'use strict';

// Задание 1 (тайминг 25 минут)
// Давайте создадим класс для управления банковским счетом. В этом классе будет приватное свойство для хранения текущего баланса, а также методы для внесения и снятия денег со счета.
// 1. Класс должен содержать приватное свойство #balance, которое инициализируется значением 0 и представляет собой текущий баланс счета.
// 2. Реализуйте геттер balance, который позволит получить информацию о текущем балансе.
// 3. Реализуйте метод deposit(amount), который позволит вносить средства на счет.
// Убедитесь, что сумма внесения не отрицательная; в противном случае выбрасывайте
// ошибку.
// 4. Реализуйте метод withdraw(amount), который позволит снимать средства со счета.
// Убедитесь, что сумма для снятия неотрицательная и что на счете достаточно средств; в
// противном случае выбрасывайте ошибку.
// 5. Реализуйте конструктор, который принимает начальный баланс в качестве аргумента.
// Убедитесь, что начальный баланс не отрицательный; в противном случае выбрасывайте ошибку.
// class BankAccount {
// // Приватное свойство для хранения баланса
// // Геттер для получения текущего баланса
// // Метод для внесения денег на счет
// // withdraw(amount) Метод для снятия денег со счета
// // constructor(initialBalance) Конструктор для инициализации начального баланса
// ｝
// // Создаем новый банковский счет с начальным балансом 500
// let account = new BankAccount (500);
// console.log(account.balance); // Выводит: 500
// account.deposit(200);
// console.log(account.balance); // Выводит: 700
// account.withdraw(100);
// console.log(account.balance); // Выводит: 600

class BankAccount {
    #balance = 0;
    constructor(initialBalance) {
        if (initialBalance < 0) {
            throw new Error('Balance is not allowed less then 0');
        }
        this.#balance = initialBalance;
    }
    get balance() {
        return this.#balance;
    }
    set balance(balance) {
        this.#balance = balance;
    }
    deposit(cash) {
        if (cash <= 0) {
            throw new Error('Cash is not allowed less then 0');
        }
        this.#balance += cash;
    }
    withdraw(cash) {
        if (cash <= 0) {
            throw new Error('Cash is not allowed less then 0');
        }
        if (this.#balance - cash < 0) {
            throw new Error('Cash is not allowed more then balance');
        }
        this.#balance -= cash;
    }
}

let account = new BankAccount(500);
console.log(account.balance); // Выводит: 500
account.deposit(200);
console.log(account.balance); // Выводит: 700
account.withdraw(700);
console.log(account.balance); // Выводит: 0

// Задание 2 (тайминг 35 минут)
// У вас есть базовый список пользователей. Некоторые из них имеют информацию о своем премиум-аккаунте, а некоторые – нет.
// Ваша задача – создать структуру классов для этих пользователей и функцию для получения информации о наличии премиум-аккаунта, используя Опциональную цепочку вызовов методов, оператор нулевого слияния и instanceof.
// 1. Создайте базовый класс User с базовой информацией (например, имя и фамилия).
// 2. Создайте классы PremiumUser и RegularUser, которые наследуются от User. Класс PremiumUser должен иметь свойство premiumAccount (допустим, дата истечения срока действия), а у RegularUser такого свойства нет.
// 3. Создайте функцию getAccountInfo(user), которая принимает объект класса User и возвращает информацию о наличии и сроке действия премиум-аккаунта, используя Опциональную цепочку вызовов методов и оператор нулевого слияния.
// 4. В функции getAccountInfo используйте instanceof для проверки типа переданного пользователя и дайте соответствующий ответ.
// class User {
// class PremiumUser extends User {
// premiumAccount = new Date().setFullYear(new Date().getFullYear()
// + 1); // Пример: установите срок действия на год вперед
// // создать RegularUser
// function getAccountInfo(user) {
// // Премиум аккаунт действителен до такой-то даты или информация отсутствует
// // пользователь без премиум аккаунта
// // Тип пользователя не определен"
// // Проверка

class User {
    name = '';
    surname = '';
    constructor(name, surname) {
        this.name = name;
        this.surname = surname;
    }
}
class RegularUser extends User {
    constructor(name, surname) {
        super(name, surname);
    }
}

class PremiumUser extends User {
    constructor(name, surname) {
        super(name, surname);
    }
    premiumAccount = new Date().setFullYear(new Date().getFullYear() + 1);
}

function getAccountInfo(user) {
    const text = `${user.name} ${user.surname} - `;
    let result = '';
    if (user instanceof PremiumUser) {
        const date = user?.premiumAccount ?? undefined;
        if (date) {
            result = `Премиум аккаунт действителен до ${new Date(
                date
            ).getFullYear()} года`;
        } else {
            result = 'информация отсутствует';
        }
    } else if (user instanceof RegularUser) {
        result = `пользователь без премиум аккаунта`;
    } else {
        result = 'Тип пользователя не определен';
    }
    return `${text} ${result}`;
}

const user01 = new User('Lex01', '01');
const user02 = new RegularUser('Lex02', '02');
const user03 = new PremiumUser('Lex03', '03');
const user04 = new PremiumUser('Lex04', '04');
user04.premiumAccount = null;

console.log(getAccountInfo(user01));
console.log(getAccountInfo(user02));
console.log(getAccountInfo(user03));
console.log(getAccountInfo(user04));

// Задание 3 (тайминг 15 минут)
// Вы создаете интерфейс, где пользователь вводит число.
// Ваша задача — проверить, является ли введенное значение числом или нет, и дать соответствующий ответ.
// 1. Создайте HTML-структуру: текстовое поле для ввода числа и кнопку "Проверить".
// 2. Добавьте место (например, div) для вывода сообщения пользователю.
// 3. Напишите функцию, которая будет вызвана при нажатии на кнопку. Эта функция
// должна использовать try и catch для проверки вводимого значения.

const inputNumber = document.querySelector('.num');
const checkBtn = document.querySelector('.checkBtn');
const checkMsg = document.querySelector('#check');

checkBtn.addEventListener('click', (e) => {
    try {
        const num = inputNumber.value;
        if (num === '' || isNaN(num)) {
            throw new Error('This is not a Number!');
        }
        checkMsg.textContent = "It's OK! This is a Number!";
    } catch (err) {
        checkMsg.textContent = 'This is not a Number!';
    }
});

// Задание 4 (тайминг 25 минут)
// Пользователи вашего сайта могут добавлять элементы в список. Но есть условие: введенное значение должно содержать от 3 до 10 символов.
// 1. Создайте HTML-структуру с текстовым полем, кнопкой и списком.
// 2. Напишите функцию, которая будет добавлять элементы в список или
// генерировать исключение, если длина введенного значения не соответствует требованиям.

const inputList = document.querySelector('.list');
const listBtn = document.querySelector('.listBtn');
const listMsg = document.querySelector('.check-list');
const listUl = document.querySelector('#list');

listBtn.addEventListener('click', (e) => {
    try {
        const listInput = inputList.value;

        if (listInput.length < 3 || listInput.length > 10) {
            throw new Error(
                'введенное значение должно содержать от 3 до 10 символов'
            );
        }

        const listItem = document.createElement('li');
        listItem.innerHTML = `${listInput}`;
        listUl.append(listItem);

        listMsg.textContent = '';
    } catch (err) {
        listMsg.textContent =
            'введенное значение должно содержать от 3 до 10 символов';
    }
});
