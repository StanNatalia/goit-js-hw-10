import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const delay = Number(form.delay.value);
    const state = form.state.value;

   
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });

    
    promise
        .then((delay) => {
            iziToast.success({
                
                message: `Fulfilled promise in ${delay}ms`,
                position: 'topRight',
                title: 'OK',
                titleColor: 'white',
                icon: '<span class="my-icon"></span>',
                backgroundColor: "green",
                messageColor: "white",
                timeout: 10000
            });
        })
        .catch((delay) => {
            iziToast.error({
                title: 'Error',
                titleColor: 'white',
                message: `Rejected promise in ${delay}ms`,
                position: 'topRight',
                icon: '<img src="../img/sprite-icons.svg#icon-error" style="width: 24px; height: 24px;">',
                backgroundColor: "red",
                messageColor: "white",
                timeout: 10000
            });
        });
});