//appeler l'élement produit:
let productContent = document.getElementById('productInfos');
let productId =document.querySelector('#productId p')
//appeler le titre du produit:
let productName = document.querySelector('#productName h2')
//appeler la div prix: 
let productPrice = document.querySelector('#productPrice  p');
//appeler la div description:
let productDescription = document.querySelector('#productDescription p');
//Appeler la div Lenses:
let productLenses = document.querySelector('#productLenses p');
//créer la div IMG:
var productImages = document.getElementById('productImages')
var productImg = document.createElement("img");


let products = document.getElementById('products');


//recuperer les données de l'API:
var request = new XMLHttpRequest();

request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE) {
        var response =JSON.parse(this.responseText);
       for( let i = 0; i < response.length; i++){
           let article = response[i];
// Ajouter le contenu au DOM
           products.innerHTML = `<article>
                <div id="productInfos">
                    <div class="bloc-produit">
                        <p id="productId"></p>
                        <h2 id="productName"><strong>Nom: </strong>${article.name}</h2>
                        <p id="productPrice"><strong>Prix: </strong> ${article.price/100} €</p>
                        <p id="productDescription"><strong>Description: </strong> ${article.description}</p>
                        <p id="productLenses"><strong>Lenses: </strong> ${article.lenses}</p>
                    </div>
                    <div> 
                        <img id="ProductImg" src="${article.imageUrl}" alt="">
                    </div>
                </div>
                <a class="btn btn-shopping" href="produit.html?id=${article._id}" aria-label="Sélectionner un article ${article.name}">Sélectionner</a>
            </article>`;
      
       }
    }
}

request.open("GET", "http://localhost:3000/api/cameras");
request.send();


