import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimer) {

        ////////////////Form/////// отправка данных на сервер

        const forms = document.querySelectorAll(formSelector);

        const messages = {
            loading: 'img/form/spinner.svg',
            success: 'Спасибо! Мы с вами свяжемся',
            failure: 'Что-то пошло не так...',
        };
    
        forms.forEach(item => {
            bindpostData(item);
        });
    
        //POST
        //
        //тут сервисная функция
    
        function bindpostData(form) {
            form.addEventListener('submit', (event) => {
                event.preventDefault();

                const statusMessage = document.createElement('img');
                statusMessage.src = messages.loading;
                statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;            
                `;
                //добавление после элемента
                form.insertAdjacentElement('afterend', statusMessage);
    
                //способ отправки с XMLHttpRequest()
                // const request = new XMLHttpRequest();
                // request.open('POST', 'server.php');
    
                // //для FornData() с XMLHttp заголовок не нужен
                // const formData = new FormData(form);
    
                // request.send(formData);
                
                //это пример как перевести FornData в JSON format
                //тип данных зависит от backend
                /*request.setRequestHeader('Content-Type', 'application/json');
                const formData = new FormData(form);
    
                const obj = {};
                formData.forEach((value, key) => {
                    obj[key] = value;
                });
                const json = JSON.stringify(obj);
                request.send(json);*/
    
                //актуально для XMLHttpRequest()
                // request.addEventListener('load', () => {
                //     if (request.status === 200) {
                //         console.log(request.response);
                //         showThanksModal(messages.success);
                //         updateForm();
                //     } else {
                //         showThanksModal(messages.failure);
                //         updateForm();
                //     }
                // });
    
                //способо отправки с .fetch()
                const formData = new FormData(form);
    
                //для JSON данных
                const json = JSON.stringify(Object.fromEntries(formData.entries()));
                //то же самое но менее современное
                // const obj = {};
                // formData.forEach((value, key) => {
                //     obj[key] = value;
                // });
                
    
                postData ('http://localhost:3000/requests', json)
                    .then(data => {
                        console.log(data);
                        showThanksModal(messages.success);
                    }).catch(() => {
                        showThanksModal(messages.failure);
                    }).finally(() => {
                        updateForm();
                    });
    
                
                function updateForm() {
                    form.reset(); // обновление формы, очищение инпутов
                    statusMessage.remove();
                }
    
            });
        }
    
        ////////Окно с коментарием загрузки//////////////////////

        function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        
        //скрытие контента
        prevModalDialog.classList.add('hide');
        //открытие модалки
        openModal('.modal', modalTimer);

        //создение элемента. все параметры берутся по классам у удаленного элемента
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="menu__title">${message}</div>
            </div>

        `;
        //добавление созданного элемента
        document.querySelector('.modal').append(thanksModal);

        //для возвращения старого вида модального окна
        setTimeout(() => {
            thanksModal.remove(); // удаляем новый контент, он опять создастся при отправке формы
            //возвращение классов для модального окна
            prevModalDialog.classList.add('show'); 
            prevModalDialog.classList.remove('hide');
            closeModal('.modal'); 
        }, 3000);
    }
}

export default forms;