const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = []; //массив товаров
        this.allProducts = []; //массив объектов

        /* Vers_3 fetch
                this._fetchProducts(); 
            }
        
            */
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }
    /* Vers_3 fetch fetchProducts()
        _fetchProducts() {
            this.goods = [
                { id: 1, title: 'Манометр', price: 1200, img: 'manometr.png' },
                { id: 2, title: 'Термометр', price: 2000, img: 'termometr.png' },
                { id: 3, title: 'Датчик давления', price: 10000, img: 'pressure.png' },
                { id: 4, title: 'Расходомер', price: 50000, img: 'rashodomer.png' },
                { id: 5, title: 'Термометр2', price: 3000, img: 'termometr.png' },
                { id: 6, title: 'Датчик давления2', price: 12000, img: 'pressure.png' },
                { id: 7, title: 'Расходомер2', price: 55000, img: 'rashodomer.png' },
                { id: 8, title: 'Манометр2', price: 2200, img: 'manometr.png' },
            ];
        }
    */
    // Путь к репозиторию с json документами
    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }



    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}

class ProductItem {
    constructor(product, img = 'manometr.png') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

let list = new ProductsList();


class basket {
    constructor(container = '.cart-block') {
        this.container = container;
        this.goods = [];//массив товаров

        this._clickBasket();
        this._getBasketItem()
            .then(data => { //data - объект js
                this.goods = [...data.contents];
                this.render()
            });
    }

    // Путь к репозиторию с json документами

    _getBasketItem() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    // Законнектились ))

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new BasketItem();

            block.insertAdjacentHTML('beforeend', productObj.render(product));
        }

    }

    _clickBasket() {
        document.querySelector(".btn-cart").addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
    }
}

class BasketItem {

    render(product) {
        return `<div class="cart-item" data-id="${product.id_product}">
                <div class="product-bio">
                <img src="${product.img}" alt="Картинка товара">
                <div class="product-desc">
                <p class="product-title">${product.product_name}</p>
                <p class="product-quantity">Quantity: ${product.quantity}</p>
            <p class="product-single-price">$${product.price} each</p>
            </div>
            </div>
            <div class="right-block">
                <p class="product-price">$${product.quantity * product.price}</p>
                <button class="del-btn" data-id="${product.id_product}">&times;</button>
            </div>
            </div>`
    }
}

let bask = new basket();

/*

getSum() {

        let res = this.allProducts.reduce((s, item) => s + item.price, 0);
        alert(res);
    }
}





class ProductItem {
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = product.img;

    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

let list = new ProductsList();
list.render();
list.getSum();

class Basket {
    addGoods() {

    }
    removeGoods() {

    }
    changeGoods() {

    }

    render() {

    }
}

class ElemBasket {
    render() { }

}

*/