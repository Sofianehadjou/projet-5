const confirmation = document.getElementById('confirmation');
const confirmationError = document.getElementById('error');
const table = document.getElementById('tableConfirmation');
//récuperation du local storage Panier
const myArticleJSON = localStorage.getItem("panier");
const myArticle = JSON.parse(myArticleJSON);

//récuperation du local storage ID
const myOrder = localStorage.getItem("productsID");

//récuperation du local storage informations formulaire
const infosJS = localStorage.getItem("order");
const infos = JSON.parse(infosJS)

if (infosJS != null) {
    for (let i = 0; i < infos.products.length; i++) {
        const element = infos.products[i];

        confirmation.innerHTML = `<div>
        <p>Merci <strong>${infos.contact.firstName} ${infos.contact.lastName}</strong>. Votre commande a été passée avec succès.</p>
        <p><strong>Adresse:</strong> ${infos.contact.address}, ${infos.contact.city}. </p>

        </div>`;

        table.innerHTML += `<article>
        <table id="tableConfirmation">
            <caption>Résumé de votre panier</caption>
            <thead>
                <tr>
                    <th>ID: </th>
                    <th>ARTICLE:</th>
                    <th>PRIX UNITAIRE: </th>
                    <th>QUANTITE</th>
                </tr>
                <tr>
                <td><strong></strong> ${infos.orderId}</td>
                <td><img class="imagesPanier" src="${element.imageUrl}"> ${element.name}</th>
                <td> ${element.price/100} €</th> 
                <td></th>                
            </tr>
            </thead>
        </table>
    </article>`;
    }
} else{
    confirmationError.innerHTML = `<div id="error">
    <p>Votre panier est vide, merci de repasser votre commande</p>
    </div>`;
}

  // fonction pour calculer la somme du total du panier
  const totalCart = () => {
    let totalCount = 0; // je crée une variable initialiser à zéro
    let myArticleJSON = localStorage.getItem("panier");   // je récupère le local storage
    let myArticle = JSON.parse(myArticleJSON); // je le transforme en nombre
    for (let i in myArticle) { // pour chaque produit présent dans le panier
        totalCount += myArticle[i].price * myArticle[i].quantity /100; //je rajoute chaque produit à la variable totalCount
    }
    return totalCount; // totalCount me retourne la Somme de tous les price des produits
    };
const resultTotalCart = totalCart();

//fonction pour ajouter la somme total du panier au DOM.
const total = document.getElementById('total')

    const showTotalCart = () => {
        if (infosJS != null){
            total.innerHTML = `<div>
            <table id="totalPrice">
                <tr>
                    <th>Total du panier : ${resultTotalCart} € </th>
                </tr>
            </table>  
        </div>`} else {
        confirmationError.innerHTML = `<div id="error">
        <p>Votre panier est vide, merci de repasser votre commande</p>
        </div>`;}
};
showTotalCart();

localStorage.removeItem("panier"); 
localStorage.removeItem("order");    
localStorage.removeItem('productsID');