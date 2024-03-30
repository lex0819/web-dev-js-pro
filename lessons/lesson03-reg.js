'use strict';

// Задание 5* (тайминг 55 минут)
// Создать интерактивную веб-страницу, которая позволяет пользователям регистрироваться и входить в систему, используя данные, сохраненные в LocalStorage.
// Приложение будет состоять из трёх основных страниц:
// 1. Страница регистрации:
// ○ Предлагает пользователю ввести логин и пароль.
// ○ После ввода данных, они сохраняются в LocalStorage.
// ○ Пользователь перенаправляется на страницу входа.
// 2. Страница входа:
// ○ Предлагает пользователю ввести логин и пароль.
// ○ Если введенные данные совпадают с данными из LocalStorage, пользователь перенаправляется
// на страницу приветствия.
// ○ Если данные не совпадают, выводится сообщение об ошибке.
// 3. Страница приветствия:
// ○ Простое приветственное сообщение для авторизованного пользователя.
// ○ Кнопка "Выйти", при нажатии на которую пользователь возвращается на страницу входа.

const usrReg = document.getElementById('reg-usr');
const pasReg = document.getElementById('reg-pas');
const okReg = document.getElementById('reg-ok');
const error = document.getElementById('err');

let userReg = {};

function setRegistration() {
    if (usrReg.value !== '' && pasReg.value !== '') {
        userReg.name = usrReg.value;
        userReg.pass = pasReg.value;
        localStorage.setItem('auth', JSON.stringify(userReg));
        return true;
    } else {
        error.textContent = 'Please, enter right information!';
        return false;
    }
}

function getRegistration() {
    userReg = JSON.parse(localStorage.getItem('userReg')) || {};
    return userReg;
}

function checkRegistration() {
    const user = getRegistration();
    if (usrReg.value === user.name && pasReg.value === user.pass) {
        return true;
    } else {
        return false;
    }
}

okReg.addEventListener('click', () => {
    if (setRegistration()) {
        window.location.href = './index03-enter.html';
    }
});
