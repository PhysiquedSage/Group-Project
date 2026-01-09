const btn = document.getElementById('btn');
const back = document.getElementById('back');
const log = document.getElementById('log');

btn.addEventListener('click', () => {
    back.classList.toggle('invisible');
    log.classList.toggle('invisible');
});

back.addEventListener('click', () => {
    back.classList.toggle('invisible');
    log.classList.toggle('invisible');
});

