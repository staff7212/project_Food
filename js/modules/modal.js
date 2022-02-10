//функция для показа модального окна
function openModal(modalSelector, modalTimer) {
    const modal = document.querySelector(modalSelector);
    // 1 вариант
        // modal.style.display = 'block';
        // 2 вариант
        modal.classList.add('show');
        modal.classList.remove('hide');
        // 3 вариант
        // modal.classList.toggle('show');
        // блокировка прокрутки страницы
        document.body.style.overflow = 'hidden';
        
        if (modalTimer) { //если есть что-то то будет очистка
            clearTimeout(modalTimer);
        }    
}

//функция создана для предотвращения повторения кода
//и она отвечает за закрытие модального окна
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    // 1 вариант
    // modal.style.display = 'none';
    // 2 вариант
    modal.classList.add('hide');
    modal.classList.remove('show');
    // 3 вариант
    // modal.classList.toggle('show');
    // разблокирует прокрутку
    document.body.style.overflow = '';
}




function modal(btnSelector, modalSelector, modalTimer) {
    ////////////////////////Modal/////////

    const modal = document.querySelector(modalSelector),
    btnModal = document.querySelectorAll(btnSelector);
    //   closeModalBtn = document.querySelector('[data-close]');
    // удаление переменной, чтоб навесить обработчик на динамич объекты

  //функция для показа модального окна
 
  
  //показ модального окна
  btnModal.forEach(btn => {
      btn.addEventListener('click', () => openModal(modalSelector, modalTimer));
  });


  // закрытие нажатием на крестик
  // closeModalBtn.addEventListener('click', closeModal);
  //удаление этого обработчика, чтоб навесить обработчик на динамич объекты
  //закрытие нажанием на фон
  modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
      }
  });

  //44 урок модификация Модального окна
  //закрытие нажантием на escape
  document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
          closeModal(modalSelector);
      }
  });

  function showModalEndScrolling() {
      if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
          openModal(modalSelector, modalTimer);
          window.removeEventListener('scroll', showModalEndScrolling);
      }    
  }

  window.addEventListener('scroll', showModalEndScrolling) ;
  //всплывает когда домотал до конца страницы
}

export default modal;
export {closeModal};
export {openModal};