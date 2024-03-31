'use strict';

let reviewsList = JSON.parse(localStorage.getItem('reviews')) || [];

let tempReview = {};

const prodName = document.getElementById('prod-name');
const prodDesc = document.getElementById('prod-desc');
const addBtn = document.getElementById('add');
const msg = document.getElementById('msg');

addBtn.addEventListener('click', () => {
    if (prodName.value !== '' && prodDesc.value !== '') {
        tempReview.name = prodName.value;
        tempReview.desc = prodDesc.value;
        msg.textContent = 'Your review is added to LocalStorage';
        prodName.value = '';
        prodDesc.value = '';
        addReview();
    } else {
        msg.textContent = 'You must fill all fields!';
    }
});

function getProductsNameList() {
    const names = reviewsList.map((item) => item.product);
    return Array.from(new Set(names));
}

function addReview() {
    const prods = getProductsNameList();
    if (prods.includes(tempReview.name)) {
        let newProdReviews = [];
        reviewsList.forEach((item) => {
            if (tempReview.name === item.product) {
                const tempRevs = item.reviews.map((elem) => elem);
                tempRevs.push({ text: tempReview.desc });
                newProdReviews.push({
                    product: item.product,
                    reviews: [...tempRevs],
                });
            } else {
                newProdReviews.push(item);
            }
        });
        localStorage.setItem('reviews', JSON.stringify(newProdReviews));
        reviewsList = JSON.parse(localStorage.getItem('reviews')) || [];
    } else {
        reviewsList.push({
            product: tempReview.name,
            reviews: [
                {
                    text: tempReview.desc,
                },
            ],
        });
        localStorage.setItem('reviews', JSON.stringify(reviewsList));
    }
}
