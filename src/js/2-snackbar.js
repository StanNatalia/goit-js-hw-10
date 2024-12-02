import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import pathSuccesIcon from "../img/icon-ok.svg";
import pathErrorIcon from "../img/icon-error.svg";

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
                theme: 'dark',
                titleColor: 'white',
                iconURL: pathSuccesIcon,
                iconColor: 'white',
                backgroundColor: '#59a10d',
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
                iconUrl: pathErrorIcon,
                theme: 'dark',
                backgroundColor: '#ef4040',
                messageColor: "white",
                timeout: 10000
            });
        });
        
    form.reset();
});