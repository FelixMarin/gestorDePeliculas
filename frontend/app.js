/* 
instalar webpack como modulos de desarrollo "-D".

npm i webpack webpack-cli html-webpack-plugin css-loader style-loader mini-css-extract-plugin webpack-dev-server timeago.js -D

webpack: un empaquetador de modulos. prepara los paquetes para produccion
webpack-cli: complemento de webpack
html-webpack-plugin: le dice webpack como tratar los archivos html-webpack-plugin
css-loader: para cargar archivos css dentro de javascript
style-loader: otro modulo para gestion de archivos css en javascript
mini-css-estract-plugin: extrae codigo css y minimizarlo
webpack-dev-server: nos permite trabajar con un servidor de desarrollo
timeago.js: atrasar una fecha a partir de la actual
*/
import './styles/app.css';
import UI from './UI';

document.addEventListener('DOMContentLoaded',() => {
    const ui = new UI();
    ui.renderBook();
});

document.getElementById('book-form')
    .addEventListener('submit',e => {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;
        const images = document.getElementById('uploadimg').files;

        const formData = new FormData();
        formData.append('image', images[0]);
        formData.append('author', author);
        formData.append('isbn', isbn);
        formData.append('title', title);
      
        const ui = new UI();
        ui.addEventListener(formData);

        //cancela el reinicio de la pagina
        e.preventDefault();
    });

document.getElementById('book-cards').addEventListener('click', e => {
    if(e.target.classList.contains('delete')) {
        const ui = new UI();
        ui.deleteBook(e.target.getAttribute('_id'));
    }
    e.preventDefault();
});