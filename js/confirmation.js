//import de la fonction TotalCart.
import { totalCart } from "./main.js";
//déclarations des variables
const confirmation = document.getElementById('confirmation');
const confirmationError = document.getElementById('error');
const table = document.getElementById('tableConfirmation');
//récuperation du local storage Panier.
const myArticleJSON = localStorage.getItem("panier");
const myArticle = JSON.parse(myArticleJSON);
//récuperation du local storage ID.
const myOrder = localStorage.getItem("productsID");
//récuperation du local storage informations formulaire.
const infosJS = localStorage.getItem("order");
const infos = JSON.parse(infosJS);
//Ajout du contenu au DOM.
if (myArticleJSON !== null) {
    for (let i = 0; i < infos.products.length; i++) {
        const element = infos.products[i];  
        confirmation.innerHTML = `<div>
            <p>Merci <strong>${infos.contact.firstName} ${infos.contact.lastName}</strong>, nous avons bien reçu votre commande.</p>
            <p>Votre commande avec l'ID <strong>${infos.orderId}</strong> sera expédié à</p>
            <p>${infos.contact.address}, ${infos.contact.city}. </p>
            <h2>Résumé de votre commande</h2>
        </div>`;
        table.innerHTML += `<article>
            <table id="table">
                <thead>
                    <tr>
                        <th>ARTICLE:</th>
                        <th>PRIX UNITAIRE: </th>
                        <th>QUANTITE</th>
                    </tr>
                    <tr>
                        <td><img class="imagesPanier" src="${element.imageUrl}"> ${element.name}</th>
                        <td> ${element.price/100} €</th> 
                        <td> ${myArticle[i].quantity}</th>                
                    </tr>
                </thead>
            </table>
        </article>`;
    };  
} else {
    confirmationError.innerHTML = `<div id="error">
        <p>Votre panier est vide, merci de repasser votre commande</p>
    </div>`;
};

//appeler la fonction pour ajouter la somme total du panier.
const resultTotalCart = totalCart();
const total = document.getElementById('total');
const showTotalCart = () => {
    if (myArticleJSON != null){
        total.innerHTML = `<div>
            <tr>
                <th>Total de la commande : ${resultTotalCart} € </th>
            </tr>
    </div>`;
    };
};
showTotalCart();

   // vider le panier et le lcoal storage une fois la commande valider. 
let btnHome = document.getElementById('btnHome');
btnHome.addEventListener('click', function (event) {
    event.preventDefault();
    location.href = "index.html" 
    localStorage.removeItem("panier");  
    localStorage.removeItem("order");
    localStorage.removeItem('productsID');
});
