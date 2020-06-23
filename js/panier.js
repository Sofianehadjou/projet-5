

//créer la variable pour l' Url d'api
const requestURL = 'http://localhost:3000/api/cameras';
const btnSubmit = document.querySelector('#btnBasket');
const prixTotal = document.getElementById('totalPrice');

//recuperer les données de:
const afficherProduit = () => {

const tableau = document.getElementById('table');
const myArticleJSON = localStorage.getItem("panier");
const myArticle = JSON.parse(myArticleJSON);

if(myArticleJSON != null){
    for( let i = 0; i < myArticle.length; i++) {
        let article = myArticle[i]; 
        tableau.innerHTML += `<div id="productUnit" class="product">
            <article>
                <table id="table">
                    <tr>
                        <td><img class="imagesPanier" src="${article.imageUrl}"> ${article.name}</th>
                        <td> ${article.lenses[i]}</th>
                        <td> ${article.price/100} €</th> 
                        <td> ${article.price/100 * article.quantity}  €</th>
                        <td class="productQte">${article.quantity}</th>
                        </td>
                    </tr>
                </table>
            </article>
        </div>`;
        };
    };
};  
afficherProduit()

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
const showTotalCart = () => {
    const total = document.getElementById('total');
    total.innerHTML = `<div>
        <table id="totalPrice">
            <tr>
                <th>Total du panier : ${resultTotalCart} € </th>
            </tr>
        </table>  
    </div>`};

showTotalCart();


  //fonction pour Vider le panier
  const removeBtn = document.getElementById('removeBtn'); 

  const removeCart = () => { 
removeBtn.addEventListener('click', function (event) {
    localStorage.removeItem("panier"); 
    localStorage.removeItem("order");
    localStorage.removeItem('productsID');

    })
}
removeCart()

// Récupération des informations du formulaire pour requête POST au serveur
const main = document.getElementById("main")
const form = document.getElementById("form")
const firstName = document.getElementById("firstname")
const lastName = document.getElementById("lastname")
const address = document.getElementById("address")
const city = document.getElementById("city")
const email = document.getElementById("email")
const submit = document.getElementById("form")

submit.addEventListener('submit', function (event){
    event.preventDefault();
    //creation de l'objet utilisateur
    const contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    }
    //création de l'array produit
    const products = [];
    console.log(products)
    // si le local storage existe
        const myArticleJSON = localStorage.getItem("panier");
        const myArticle = JSON.parse(myArticleJSON);
    if (localStorage.getItem("panier")) {
        for (let i in myArticle){            
            let idProducts = myArticle[i]._id;
            products.push(idProducts);
            console.log(idProducts)
            localStorage.setItem("productsID", products);        
            console.log(myArticle);
        }
    }

    const order = {
        contact,
        products,
    }

    const send = (event) => {
        let request = new XMLHttpRequest();
        request.open("POST", "http://localhost:3000/api/cameras/order");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(order));
   
        //attente reponse et appel fonction de retour
        request.onreadystatechange = function () {
          if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
            let response = JSON.parse(this.responseText);
   
            localStorage.setItem("order", JSON.stringify(response));
   
            location.href = "confirmation.html"; 
            console.log(response);
          }
        };
      };
      send(); // appel de la fonction pour l'envoye de la commande
   })


export default {totalCart}
