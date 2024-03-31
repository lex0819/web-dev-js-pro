'use strict';

let reviewsList = JSON.parse(localStorage.getItem('reviews')) || [];

const prodList = document.getElementById('prod-list');

function showListOfProducts() {
    prodList.innerHTML = '';

    reviewsList.forEach((elem) => {
        const listItem = document.createElement('details');
        listItem.innerHTML = `
            <summary>${elem.product}</summary>
            <ul>`;
        elem.reviews.forEach((item) => {
            listItem.innerHTML += `<li>${item.text} <button type="button" data-id="${item.text}">del</button></li>`;
        });
        listItem.innerHTML += `</ul>
        </details>`;
        prodList.append(listItem);
    });
}

showListOfProducts();

prodList.addEventListener('click', (ev) => {
    const reviewText = ev.target.getAttribute('data-id');
    let newProdReviews = [];
    if (reviewText !== null) {
        reviewsList.map((item) => {
            const tempRevs = item.reviews.filter((elem) => {
                return elem.text !== reviewText;
            });
            newProdReviews.push({
                product: item.product,
                reviews: [...tempRevs],
            });
        });
        localStorage.setItem('reviews', JSON.stringify(newProdReviews));
        reviewsList = JSON.parse(localStorage.getItem('reviews')) || [];
        showListOfProducts();
    }
});
