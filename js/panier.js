
//créer la variable pour l' Url d'api
const requestURL = 'http://localhost:3000/api/cameras';
const products = document.getElementById('products');
const btnSubmit = document.querySelector('#btnBasket');
const productBasket = document.getElementById('articleBasket');
const nom = document.getElementById('name');
const prix = document.getElementById('price');
const lentille = document.getElementById('lense');
const quantite = document.getElementById('quantity');
const prixTotal = document.getElementById('totalPrice');
const supprimeProduit = document.getElementById('deleteProduct');

//recuperer les données de:

const tableau = document.getElementById('articlebasket');

let myArticleJSON = localStorage.getItem("panier");
let myArticle = JSON.parse(myArticleJSON);
console.log(myArticle);
for( let i = 0; i < myArticle.length; i++) {
    let articleI = myArticle[i]; 

tableau.innerHTML += `<div id="productUnit" class="product">
<article id="articlebasket">
    <div>
        <p > article: ${myArticle[i]} </p>
    </div>
</article>
        
</div>`;
}