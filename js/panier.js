//créer la variable pour l' Url d'api
let requestURL = 'http://localhost:3000/api/cameras';

let products = document.getElementById('products');

const btnSubmit = document.querySelector('#btnBasket');

var productBasket = document.getElementById('articleBasket');



const storageCart = localStorage.getItem('cart');
const productsLists = JSON.parse(storageCart);
const panierTableau = document.getElementById('panier__body');



