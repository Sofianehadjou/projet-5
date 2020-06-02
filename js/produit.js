//créer la variable pour l' Url d'api
let requestURL = 'http://localhost:3000/api/cameras/' + window.location.search.substr(1).split("=")[1];
//récupération des éléments du DOM.
const products = document.getElementById('products');
const productUnit = document.getElementById('productUnit');
const lenseSelect = document.getElementsByClassName('lenseSelect');
const quantite = document.getElementsByClassName('qte');
const name = document.getElementsByClassName('productName');
const price = document.getElementsByClassName('productPrice');
const description = document.getElementsByClassName('productDescription');

var article = undefined;

//recuperer les données de l'API:
var request = new XMLHttpRequest();   //Lig on crée un nouvel objet qui correspond à notre objet AJAX. C'est grâce à lui qu'on va créer et envoyer notre requête ;
request.open("GET", requestURL, true);
request.send();

request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        article =JSON.parse(this.responseText);
               
// Ajouter le contenu au DOM:
        name.innerHTML = ``;
        productUnit.innerHTML = `<article class="article-product">
            <div class="productInfos productUnit">
                <div id="bloc-produit">
                    <p class="productId"></p>
                    <h2 class="productName"><strong>Nom: </strong>${article.name}</h2>
                    <p class="productPrice"><strong>Prix: </strong> ${article.price/100} €</p>
                    <p class="productDescription"><strong>Description: </strong> ${article.description}</p>
                    <p class="productLenses"><strong>Lenses: </strong> ${article.lenses}</p>
                    <p id="productId"><strong>Id: </strong> ${article._id}</p>
                    <p id="productQte"><strong>Quantité: </strong> </p>


                        <form id="buttonAchat" action="">
                        <label class="card__form--label" for="lenses"><strong>Choisir une lentilles : </strong> </label>
                        <select id="lenses" class="card__form__select js-lensesSelectAllOption" aria-label="Sélectionner la lentille de votre choix">
                            <option class="lenseSelect" value="">${article.lenses}</option>
                        </select>
                        </form>
                        <a id="btnBasket" class="btn btn-shopping" href="" aria-label="">Sélectionner</a>
                </div>
                <div>
                    <img id="ProductImg" src="${article.imageUrl}" alt="">
                </div>
            </div>
        </article>`; 

        const submitBtn = document.getElementById('btnBasket');
        const id = document.getElementById('productId');
        const lense = document.getElementsByClassName('productLenses');
        const Qte = document.getElementById('productQte');

        submitBtn.addEventListener('click', function (event) {    // écoute de l'événement click, notre callback prend un paramètre que nous avons appelé event ici
            event.preventDefault(); // On utilise la fonction preventDefault de notre objet event pour empêcher le comportement par défaut de cet élément lors du clic de la souris
            alert('${myArticle.name} a été bien ajouter au panier ')

            let cart = localStorage.getItem('panier');
            if (cart) {
                cart = JSON.parse(cart);
            } else {
                cart = [];
            }
    
            cart.push(article);
            localStorage.setItem("panier", JSON.stringify(cart));
            
            if (cart != null) {
                let myArticleJSON = localStorage.getItem("panier");
                console.log(myArticle);
              }            
        
        }) 
    };  
};
