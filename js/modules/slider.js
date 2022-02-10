function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    /////////61 Создание слайдера. Первый Вариант1////////////////

    // const slides = document.querySelectorAll('.offer__slide'),
    //       prevSlide = document.querySelector('.offer__slider-prev'),
    //       nextSlide = document.querySelector('.offer__slider-next'),
    //       current = document.querySelector('#current'),
    //       total = document.querySelector('#total');
    // let slideIndex = 1;
    
    // total.textContent = getZero(slides.length);
    // //или так с чистого листа
    // // if (slides.length<= 10) {
    // //     total.textContent = `0${slides.length}`;
    // // } else {
    // //     total.textContent = slides.length;
    // // }

    // showSlides(slideIndex);

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.classList.add('hide'));

    //     slides[slideIndex - 1].classList.remove('hide');
    //     slides[slideIndex - 1].classList.add('fade');
        
    //     current.textContent = getZero(slideIndex);
    //      //или так с чистого листа
    //     // if (slides.length <= 10) {
    //     //     current.textContent= `0${slideIndex}`;
    //     // } else {
    //     //     current.textContent = slideIndex;
    //     // }
    // }
    
    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }
    
    // prevSlide.addEventListener('click', () => {
    //     plusSlides(-1);
    // });
    
    // nextSlide.addEventListener('click', () => {
    //     plusSlides(1);
    // });

    ///////////61 Создание слайдера. Второй Вариант2////////////////
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prevSlide = document.querySelector(prevArrow),
          nextSlide = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          width = window.getComputedStyle(slidesWrapper).width,//получение примененной ширины 
          slidesField = document.querySelector(field);
    let slideIndex = 1; // для нумерации
    let offset = 0; //отступ для понимания сколько отступили вправо/влево

    function changeCurrentNumber() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }
    
    function changeDotsStyle() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    changeCurrentNumber();

    if (slides.length<= 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    slidesField.style.width = 100 * slides.length + '%'; //ширина всей карусели
    slidesField.style.display = 'flex'; // расположение блоков по горизонтали
    slidesField.style.transition = '0.5s all'; //плавный переход

    slidesWrapper.style.overflow = 'hidden'; // ограничение области видимости

    slides.forEach(slide => {
        slide.style.width = width; //все элементы карусели шириной окна видимости
    });

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    nextSlide.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) { //крайнее положение карусели
            offset = 0;
        } else {
            offset += deleteNotDigits(width); //добавление ширины еще одного слайда
        }

        slidesField.style.transform = `translateX(-${offset}px)`; //смещение элементов
        
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        changeCurrentNumber();
        changeDotsStyle();
    });

    prevSlide.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
       
        changeCurrentNumber();
        changeDotsStyle();
    });

    ////////////////63 Создание навигации для слайдов////////////////////////////
   
    

    slider.style.position = 'relative';//для позиционирования

    //обертка для точек
    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators); //добаление в конец

    //добавление самих точек
    for (let i = 0; i < slides.length; i++) {//кол-во точек = кол-ву слайдов
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1); //присвоен атрибуда равному числу
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {  //для первого точки активность
            dot.style.opacity = 1;
        }
        dots.push(dot);

        indicators.append(dot);
    }
    // в обработчиках событий
    //dots.forEach(dot => dot.style.opacity = '.5');
   // dots[slideIndex - 1].style.opacity = 1;
     
    //для нажатия на сами точки
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            changeCurrentNumber();
            changeDotsStyle();
        });
    });
}

export default slider;