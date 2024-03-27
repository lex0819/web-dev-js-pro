'use strict';

//Task01

class allBooks {
    #books = [];
    constructor(books) {
        const booksSet = new Set(books);
        try {
            if (booksSet.size === 0) {
                throw new Error('The books array is empty');
            } else if (books.length > booksSet.size) {
                this.#books = JSON.parse(JSON.stringify(Array.from(booksSet)));
                throw new Error('The books array contains duplicates!');
            } else {
                this.#books = JSON.parse(JSON.stringify(books));
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    get allBooks() {
        return this.#books;
    }
    addBook(title) {
        try {
            const duplicate = this.#books.find((item) => item === title);
            if (this.#books.length > 0 && duplicate !== undefined) {
                throw new Error(
                    `книга с таким названием ${title} уже существует в списке`
                );
            }
            this.#books.push(title);
        } catch (err) {
            console.log(err.message);
        }
    }
    removeBook(title) {
        try {
            const indexBook = this.#books.indexOf(title);
            if (indexBook === -1) {
                throw new Error(
                    `книги с таким названием ${title} нет в списке`
                );
            }
            this.#books.splice(indexBook, 1);
        } catch (err) {
            console.log(err.message);
        }
    }
    hasBook(title) {
        return this.#books.includes(title);
    }
}

const booksList01 = [
    'Genesis',
    'Exodus',
    'Leviticus',
    'Numbers',
    'Deuteronomy',
    'Joshua',
    'Judges',
];
const books01 = new allBooks(booksList01);
console.log(books01.allBooks);
books01.addBook('Ruth');
console.log(books01.allBooks);
books01.removeBook('Numbers');
console.log(books01.allBooks);
console.log(books01.hasBook('Joshua'));

const booksList02 = [];
const books02 = new allBooks(booksList02);
console.log(books02.allBooks);
books02.addBook('Ruth');
console.log(books02.allBooks);
books02.removeBook('Numbers');
console.log(books02.allBooks);
console.log(books02.hasBook('Joshua'));

const booksList03 = [
    'Genesis',
    'Exodus',
    'Genesis',
    'Exodus',
    'Genesis',
    'Exodus',
];
const books03 = new allBooks(booksList03);
console.log(books03.allBooks);
books03.addBook('Ruth');
console.log(books03.allBooks);
books03.removeBook('Numbers');
console.log(books03.allBooks);
console.log(books03.hasBook('Joshua'));

//Task 02
const initialData = [
    {
        product: 'Apple iPhone 13',
        reviews: [
            {
                id: '1',
                text: 'Отличный телефон! Батарея держится долго.',
            },
            {
                id: '2',
                text: 'Камера супер, фото выглядят просто потрясающе.',
            },
        ],
    },
    {
        product: 'Samsung Galaxy Z Fold 3',
        reviews: [
            {
                id: '3',
                text: 'Интересный дизайн, но дорогой.',
            },
        ],
    },
    {
        product: 'Sony PlayStation 5',
        reviews: [
            {
                id: '4',
                text: 'Люблю играть на PS5, графика на высоте.',
            },
        ],
    },
];

const reviews = document.querySelector('.reviews');
const inputName = document.querySelector('.product');
const inputText = document.querySelector('.review');
const okBtn = document.querySelector('#btn');
const error = document.querySelector('.error');

class Reviews {
    #reviews = [];
    constructor(initialData) {
        try {
            this.#reviews = JSON.parse(JSON.stringify(Array.from(initialData)));
            this.showReviews();
        } catch (err) {
            console.log(err.message);
        }
    }
    get Reviews() {
        return this.#reviews;
    }
    //Only uniq products name in the list
    getProductsList() {
        const productsList = this.#reviews.map((item) => item.product);
        return Array.from(new Set(productsList));
    }

    //Continuous numbering of the reviews
    getIdMax() {
        const productsReviews = [];
        for (const item of this.#reviews) {
            for (const elem in item) {
                if (elem === 'reviews') {
                    let temp = item[elem].map((i) => i.id);
                    productsReviews.push(...temp);
                }
            }
        }
        const productReviewsNumbers = productsReviews.map(Number);
        return Math.max(...productReviewsNumbers);
    }

    hasProduct(product) {
        return this.getProductsList().includes(product);
    }

    //What is index of product which we want to add?
    indexOfProduct(product) {
        let i = 0;
        for (const item of this.#reviews) {
            if (product === item.product) {
                return i;
            }
            i++;
        }
    }

    addReview(product, text) {
        const idMax = (this.getIdMax() + 1).toString();

        if (this.hasProduct(product)) {
            this.#reviews[this.indexOfProduct(product)].reviews.push({
                id: idMax,
                text: text,
            });
        } else {
            this.#reviews.push({
                product: product,
                reviews: [
                    {
                        id: idMax,
                        text: text,
                    },
                ],
            });
        }
    }

    //Output to HTML
    showReviews() {
        reviews.innerHTML = '';
        this.#reviews.forEach((element) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<h3>${element.product}</h3>`;

            const reviewsList = element.reviews;
            reviewsList.forEach((item) => {
                listItem.innerHTML += `<p>${item.text}</p>`;
            });

            reviews.append(listItem);
        });
    }
}

const myReviews = new Reviews(initialData);

okBtn.addEventListener('click', () => {
    const product = inputName.value;
    const text = inputText.value;

    try {
        if (product === '' || text === '') {
            throw new Error('You must fill all fields!');
        }
        if (text.length < 50 || text.length > 500) {
            throw new Error(
                'длина введенного отзыва должна быть НЕ менее 50 и НЕ более 500 символов'
            );
        }
        myReviews.addReview(product, text);
        myReviews.showReviews();

        inputName.value = '';
        inputText.value = '';
        error.innerHTML = '';
        console.log(myReviews.Reviews);
    } catch (err) {
        error.innerHTML = err.message;
    }
});
