import {getRequest} from '../js/main.js'  //import de la function pour appeler l'api
// Ajouter le contenu au DOM:
let apiResponse =  getRequest(); //appeler la promesse(requete)
apiResponse.then(function (articles) {
    for(let i = 0; i < articles.length; i++) {
        let article = articles[i]; 
        let products = document.getElementById('products');
        products.innerHTML += `
        <article class="article">
            <div id="productInfos">
                <div id="bloc-produit">
                    <h2 class="productName"><strong>Nom: </strong>${article.name}</h2>
                    <p class="productPrice"><strong>Prix: </strong> ${article.price/100} €</p>
                    <p class="productDescription"><strong>Description: </strong> ${article.description}</p>
                    <p classd="productLenses"><strong>Lenses: </strong> ${article.lenses}</p>
                    <a class="btn btn-accueil" href="produit.html?id=${article._id}" aria-label="">Sélectionner</a>
                </div>
                <div> 
                    <img id="ProductImg" src="${article.imageUrl}" alt="">
                </div>
            </div>       
        </article>`;
    }     
}).catch(function(request){
    console.log("erreur")
});