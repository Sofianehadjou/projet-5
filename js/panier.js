

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

 //création d'une classe qui repésente une ligne de panier 
class lineCart {                             
    constructor(Id, Name, Lense, Price, Qte) {
        this.id = Id;
        this.name = Name;
        this.lense = Lense;
        this.qte = Qte;
        this.price = Price;
        this.subtotal = parseInt(this.qte) * parseInt(this.price)
    }
}

//recuperer les données de:

const tableau = document.getElementById('table');

let myArticleJSON = localStorage.getItem("panier");
let myArticle = JSON.parse(myArticleJSON);
console.log(myArticle)



if(myArticleJSON != null){
    for( let i = 0; i < myArticle.length; i++) {
        let article = myArticle[i]; 
        

        tableau.innerHTML += `<div id="productUnit" class="product">
    <article id="articlebasket">
        <table id="table">
            <thead>
                <tr>
                    <th><img class="imagesPanier" src="${article.imageUrl}"> Article: ${article.name}</th>
                    <th>Lentille: ${article.lenses}</th>
                    <th>Prix: ${article.price/100} €</th>
                    <th class="productQte">Quantité: 1</th>
                </tr>
            </thead>

            <tbody id="cart-tablebody">
            
            </tbody>
        </table>

    </article>
    </div>`;
    

    
// fonction pour calculer la somme du total du panier
    const totalCart = () => {
    let totalCount = 0; // je crée une variable initialiser à zéro
    for (let i in myArticle) { // pour chaque produit présent dans le panier
        
    let myArticleJSON = localStorage.getItem("panier");   // je récupère le price depuis le local storage
    let myArticle = JSON.parse(myArticleJSON); // je le transforme en nombre

    totalCount += myArticle[i].price/100; //je rajoute chaque produit à la variable totalCount
  }
  return totalCount; // totalCount me retourne la Somme de tous les price des produits

};
const resultTotalCart = totalCart();

//fonction pour ajouter la somme total du panier au DOM.
const showTotalCart = () => {
    const total = document.getElementById('total');
    total.innerHTML = `<table id="totalPrice">
    <tr>
        <th>Total du panier : ${resultTotalCart} € </th>
        <a id="removeBtn" class="btn btn-shopping" href="" aria-label="">Vider le panier</a>
    </tr>
</table>`};
showTotalCart();



// fonction pour calculer la somme  total d'un article
   const totalArticle = (myArticle, list) => {
    let articleCount = 0;                         // création de variable initialiser à 0.
    for (let i in myArticle) { // pour chaque produit présent dans le panier

        let myArticleJSON = localStorage.getItem("panier");   // je récupère depuis le local storage
        let myArticle = JSON.parse(myArticleJSON); // je le transforme en nombre
        
        if (article._id === (list.split("_")[0]) ) { // On cherche une correspondance de l'id
        articleCount += parseInt(myArticle._id) // A chaque correspondance trouvée, on ajout au compteur la quantitée trouvée
    }
  }
  return articleCount; // totalCount me retourne la Somme de tous les price des produits
};

console.log(article._id)
const resultTotalArticle = totalArticle();
console.log(resultTotalArticle)


const showTotalArticleQte = () => {
    const totalArticle = document.getElementsByClassName('productQte');
    totalArticle += `<table id="totalPrice">
    <tr>
        <th class="productQte">Quantité: ${resultTotalArticle}</th>
    </tr>
</table>`;
  };
  showTotalCart();

  //Vider le panier 
  const removeBtn = document.getElementById('removeBtn'); 
  removeBtn.addEventListener('click', function (event) {
      localStorage.removeItem("panier"); 
  })
  
    }
}


