import {getResource} from '../services/services';

function cards() {

    //////////////////////Sample///////////
    /////////классы для карточек
    //добавление rest оператора из урока 49. ...classes


    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 74;
            this.changeToRUB();
        }

        changeToRUB() {
            this.price = this.price * this.transfer;
        }
        
        render() {
            const element = document.createElement('div');
            //проверка if(). если в rest оператор ничего не передали
            //запишется указанный класс
            if (this.classes.length ===0) {
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    // const div = new MenuCard();
    // div.render();
    //альтернатива вызова, если вызвается объект на месте
    //он не сохранится, отработает и исчезнет
    // new MenuCard().render();
    //когда аргументов много, вызов разносят на разные строки и вносятв красивом формате


    // для MenuCard
    //
    //тут сервисная функция
    
    //первый вариант, работает с классом MenuCard{}
    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });


    //второй метод, часто встречается
    //не использует классы, формирует верстку налету
    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         price = price * 74;
    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> руб/день</div>
    //             </div>
    //         `;

    //         document.querySelector('.menu .container').append(element);
    //     });
    // }

    //третий вариант с библиотекой axios
    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //                 data.data.forEach(({img, altimg, title, descr, price}) => {
    //                    new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //                });
    //             });
}

export default cards;