//créer la variable pour l' Url d'api
let requestURL = 'http://localhost:3000/api/cameras';
let products = document.getElementById('products');
const btnSubmit = document.querySelector('#btnBasket');
var productBasket = document.getElementById('articleBasket');

//recuperer les données de l'API:

var request = new XMLHttpRequest();
request.open("GET", "http://localhost:3000/api/cameras/order", true);
request.setRequestHeader("Content-Type", "application/json");
request.send(JSON.stringify());

request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var article =JSON.parse(this.responseText);

        (function () {                                                // La fonction s'exécute dès le chargement de la page
    if (sessionStorage.getItem("newOrder") === null) {        // Elle vérifie qu'il existe bien une nouvelle commande stocké dans le sessionStorage
        console.log("Pas de nouvelle commande à ajouter")               // Si ce n'est pas le  cas, il ne se passe rien, affichage d'un commentaire dans la console
    } else {                                                  // Si elle trouve un objet "newOrder" dans le sessionStorage
        const newNb = localStorage.length                     // Elle créer une clé de valeur = à la taille du localStorage
        const addToCart = sessionStorage.getItem("newOrder")  // Elle créer une constante addToCart, qui est = à la valeur de "neworder"
        localStorage.setItem(newNb, addToCart)                // Elle attribue un nouvel objet dans le localStorage
        sessionStorage.removeItem("newOrder")                 // Elle supprime le "newOrder du sessionStorage" ainsi il ne peut y avoir qu'un seul "newOrder" dans le sessionStorage
            
            }
        })
    }
}   

