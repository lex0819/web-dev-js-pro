'use strict';

// Задание 1 (тайминг 30 минут)
// Вы разрабатываете прототип веб-приложения для чтения новостей. Статьи "хранятся" во внутреннем массиве (имитируя базу данных). Когда пользователь нажимает на кнопку "Загрузить новости", ваш код должен имитировать задержку, словно происходит реальная загрузка данных из внешнего источника, а после этой задержки — отображать новости на странице.
// 1. Создайте базовую HTML-структуру с кнопкой для загрузки новостей и контейнером для их отображения.
// 2. Реализуйте функцию fetchNews(), возвращающую промис. Эта функция должна имитировать задержку в 2 секунды перед успешным возвращением данных из "виртуальной" базы данных. Для добавления интереса: с вероятностью 10% она должна возвращать ошибку вместо данных.
// 3. При нажатии на кнопку "Загрузить новости" вызывайте функцию fetchNews(), обрабатывая успешное выполнение и ошибки с использованием then() и catch().
// 4. При успешной загрузке отобразите статьи на странице. При ошибке покажите сообщение об ошибке.
// 5. Добавьте функционал, который отключает кнопку загрузки на время "загрузки" новостей и активирует её снова после завершения операции (будь то успешная загрузка или ошибка).

function fetchNews() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.1) {
                resolve(newsData);
            } else {
                reject('Error during loading the news');
            }
        }, 2000);
    });
}

const loadBtn = document.querySelector('.load-button');
const news = document.querySelector('.news-container');

const newsData = [
    { title: 'header 01', body: '010101010 sfgbsgbsfgb sfg afbafbvabafb' },
    {
        title: 'header 02',
        body: '0202020202020 zthxhxy xgjnxgyjxy xygjnxyjy zxyjxgyhjx',
    },
];

loadBtn.addEventListener('click', () => {
    fetchNews()
        .then((result) => {
            result.forEach((elem) => {
                const newElem = document.createElement('p');
                newElem.textContent = `${elem.title} : ${elem.body}`;
                news.append(newElem);
            });
        })
        .catch((err) => {
            news.textContent = `${err}`;
        });
});

// Задание 2 (тайминг 25 минут)
// Создать интерактивную веб-страницу, где пользователи могут вводить текст, сохранять его в localStorage, а затем загружать или удалять сохраненные данные.
// Разработка Интерфейса:
// Создать HTML-страницу с:
// ● Одним текстовым полем для ввода данных пользователем.
// ● Тремя кнопками: "Сохранить", "Загрузить" и "Очистить".
// ● Местом для отображения сохраненного текста.
// Программирование Логики на JavaScript:
// 1. При нажатии на "Сохранить", введенный текст должен сохраняться в localStorage.
// 2. При нажатии на "Загрузить", текст из localStorage должен отображаться на странице.
// 3. При нажатии на "Очистить", сохраненный текст должен быть удален из localStorage, и соответствующее
// сообщение отображается на странице.

const inpTask02 = document.getElementById('task02');
const saveTask02 = document.getElementById('task02save');
const loadTask02 = document.getElementById('task02load');
const clearTask02 = document.getElementById('task02clear');

saveTask02.addEventListener('click', () => {
    localStorage.setItem('text', inpTask02.value.trim());
});

loadTask02.addEventListener('click', () => {
    inpTask02.value =
        localStorage.getItem('text') || 'there is empty in the localStorage';
});

clearTask02.addEventListener('click', () => {
    localStorage.removeItem('text');
});

// Задание 3 (тайминг 25 минут)
// Дан код, необходимо найти 3 ошибки, исправить их, чтобы был верный функционал
// 1. Пользователи могут выбирать разные элементы и параметры, чтобы составить свой мебельный
// гарнитур.
// 2. После выбора всех желаемых параметров предоставьте кнопку "Сохранить комплект", которая
// сохраняет текущий выбор пользователя в localStorage.
// 3. При следующем посещении сайта автоматически загрузите сохраненные параметры из localStorage и
// отобразите ранее созданный комплект.
// 4. Убедитесь, что у пользователей есть возможность очистить сохраненные настройки.
//  Задание 3 (тайминг 35 минут)
// Создать интерактивную веб-страницу, где пользователи могут выбирать различные элементы мебели (например, столы, стулья, диваны) и их параметры (материал, цвет, стиль). Выбранные параметры должны быть сохранены так, чтобы при повторном посещении сайта пользователь мог видеть свой ранее собранный комплект мебели.
// 1. Пользователи могут выбирать из различных типов мебели (например, столы, стулья, диваны).
// 2. Для каждого типа мебели доступен выбор параметров (цвет, материал, стиль).
// 3. Предусмотреть кнопку "Сохранить комплект", при нажатии на которую текущий выбор пользователя
// сохраняется в localStorage.
// 4. При повторном посещении сайта автоматически загружать сохраненные параметры из localStorage и
// отображать ранее созданный комплект.
// 5. Предусмотреть возможность для пользователя очистить сохраненные настройки через специальную
// кнопку.
// 6. После нажатия на кнопку "Сохранить" на странице должен отображаться выбранный комплект.
// 7. При нажатии на кнопку "Очистить" должно появляться сообщение о том, что выбор не сделан и
// предыдущие настройки удалены.

let furnitureSet = JSON.parse(localStorage.getItem('furnitureSet')) || [];

const result = document.getElementById('result');
const saveBtn = document.getElementById('save');
const clearBtn = document.getElementById('clear');
const selectAll = document.querySelectorAll('select');

clearBtn.addEventListener('click', () => {
    result.textContent = 'выбор не сделан и предыдущие настройки удалены.';
    localStorage.removeItem('furnitureSet');
    selectAll.forEach((html, key) => {
        html.value = '';
    });
});

saveBtn.addEventListener('click', () => {
    result.textContent = '';
    furnitureSet = [];
    setFurniture();
    console.log(furnitureSet);
    localStorage.setItem('furnitureSet', JSON.stringify(furnitureSet));
});

function setFurniture() {
    selectAll.forEach((html, key) => {
        furnitureSet.push({ name: html.id, value: html.value });
    });
}

function loadFurniture() {
    selectAll.forEach((html, key) => {
        const record = furnitureSet.find((item) => item.name === html.id);
        html.value = record?.value;
    });
}

loadFurniture();
