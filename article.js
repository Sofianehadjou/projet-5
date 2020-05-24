//créer la variable pour l' Url d'api
let requestURL = 'http://localhost:3000/api/cameras';

var products = document.getElementById('products');


//recuperer les données de l'API:
var request = new XMLHttpRequest();   //Lig on crée un nouvel objet qui correspond à notre objet AJAX. C'est grâce à lui qu'on va créer et envoyer notre requête ;
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response =JSON.parse(this.responseText);
       for( let i = 0; i < response.length; i++) {
           let article = response[i]; 
           
// Ajouter le contenu au DOM:
 

console.log(article);
           products.innerHTML += `<article>
                <div id="productInfos">
                    <div id="bloc-produit">
                        <p class="productId"></p>
                        <h2 id="productName"><strong>Nom: </strong>${response[i].name}</h2>
                        <p id="productPrice"><strong>Prix: </strong> ${response[i].price/100} €</p>
                        <p id="productDescription"><strong>Description: </strong> ${response[i].description}</p>
                        <p id="productLenses"><strong>Lenses: </strong> ${response[i].lenses}</p>
                    </div>
                    <div> 
                        <img id="ProductImg" src="${response[i].imageUrl}" alt="">
                    </div>
                </div>
                <a class="btn btn-shopping" href="produit.html?id=${response[i]._id}" aria-label="Sélectionner un article ${response[i].name}">Sélectionner</a>
            </article>
            `;
       }
    } 
}

request.open("GET", requestURL);
request.send();
