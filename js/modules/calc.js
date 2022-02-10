function calc() {

    ///////66. Создание калькулятора///////////////

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    //проверка хранилища и присвоение значений переменным
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', sex);
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', ratio);
    }

    //функц для подстановики класса элементам из localStorage при запуске страницы
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            //проверка блока gender
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            //проверка блока ratio
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return; //если что-то не будет заполненено, функция остановится
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);

        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    //так как нет делегирования, родительский элемент не нужен
    // function getStaticInformations(parentSelector, activeClass) {
    //     const elements = document.querySelectorAll(`${parentSelector} div`);
    function getStaticInformations(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.addEventListener('click', (event) => {
                const target = event.target;
                if(target.getAttribute('data-ratio')) {
                    ratio = +target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);//сохраниение в хранилище
                } else {
                    sex = target.getAttribute('id');
                    localStorage.setItem('sex', sex);//сохраниение в хранилище
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                target.classList.add(activeClass);
    
                calcTotal();
            });
        });
        
    }
    //и тут добалено уточнение div, т.к обращаемся сразу к элементу, а не кродителю
    getStaticInformations('#gender div', 'calculating__choose-item_active');
    getStaticInformations('.calculating__choose_big div', 'calculating__choose-item_active');
    
    function getDinamicInformation(selector) {
        const input = document.querySelector(selector);
        
        //при клике начинается проверка по id, для сопоставления
        input.addEventListener('input', () => {
            
            if(input.value.match(/\D/g)) { // если не число
                input.style.border = '2px solid red';
            //    input.style.boxShadow = '0 4px 15px red';
            } else {
                input.style.border = 'none';
            //    input.style.boxShadow = '0 4px 15px rgba(0,0,0,.2)';
            }
            
            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
                
            }
            calcTotal();
        });   
    } 

    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');
}

export default calc;