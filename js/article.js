//créer la variable pour l' Url d'api
let requestURL = 'http://localhost:3000/api/cameras'; 
var productUnit= document.getElementById('productUnit');


//recuperer les données de l'API:
var request = new XMLHttpRequest();   //Lig on crée un nouvel objet qui correspond à notre objet AJAX. C'est grâce à lui qu'on va créer et envoyer notre requête ;
//Création et configuration d'une requête HTTP
request.open("GET", requestURL);  
// Envoi de la requête en y incluant l'objet
request.send(); 
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response =JSON.parse(this.responseText);
       for( let i = 0; i < response.length; i++) {
           let article = response[i]; 

           var products = document.getElementById('products');

           // Ajouter le contenu au DOM:
           products.innerHTML += `<article class="article">
           <div id="productInfos">
               <div id="bloc-produit">
                   <p class="productId"></p>
                   <h2 class="productName"><strong>Nom: </strong>${article.name}</h2>
                   <p class="productPrice"><strong>Prix: </strong> ${article.price/100} €</p>
                   <p class="productDescription"><strong>Description: </strong> ${article.description}</p>
                   <p classd="productLenses"><strong>Lenses: </strong> ${article.lenses}</p>
               </div>
               <div> 
                   <img id="ProductImg" src="${article.imageUrl}" alt="">
               </div>
           </div>
           <a class="btn btn-shopping" href="produit.html?id=${article._id}" aria-label="">Sélectionner</a>
       </article>`;
       };
    };
};



export {request}