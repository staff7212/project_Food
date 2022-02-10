'use strict';

require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import forms from './modules/forms';
import calc from './modules/calc';
import slider from './modules/slider';
import {openModal} from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {
    //44 урок модификация Модального окна
  const modalTimer = setTimeout(() => openModal('.modal', modalTimer), 30000);//всплывает через 30 сек 

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimer);
    timer('.timer', '2022-01-01');
    cards();
    forms('form', modalTimer);
    calc();
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
        
    });


    //Работа с локальной базой данных
    /*fetch('db.json')
        .then(data => data.json());
        //.then(res => console.log(res));

    //работа с Json-server
        // http://localhost:3000/menu
        // http://localhost:3000/requests
      
        // Home
        // http://localhost:3000

    
        fetch('http://localhost:3000/menu')
        .then(data => data.json());
        //.then(res => console.log(res));


    */

});