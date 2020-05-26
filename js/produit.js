//créer la variable pour l' Url d'api
let requestURL = 'http://localhost:3000/api/cameras';

var products = document.getElementById('products');

var productUnit= document.getElementById('productUnit');


//recuperer les données de l'API:
var request = new XMLHttpRequest();   //Lig on crée un nouvel objet qui correspond à notre objet AJAX. C'est grâce à lui qu'on va créer et envoyer notre requête ;
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response =JSON.parse(this.responseText);
       for( let i = 0; i < response.length; i++) {
           let article = response[i]; 
           
// Ajouter le contenu au DOM:
            productUnit.innerHTML = `<article class="article-product">
                <div class="productInfos productUnit">
                    <div id="bloc-produit">
                        <p class="productId"></p>
                        <h2 class="productName"><strong>Nom: </strong>${response[i].name}</h2>
                        <p class="productPrice"><strong>Prix: </strong> ${response[i].price/100} €</p>
                        <p class="productDescription"><strong>Description: </strong> ${response[i].description}</p>
                        <p class="productLenses"><strong>Lenses: </strong> ${response[i].lenses}</p>
                         <form class="" action="panier.html?id=${response[i]._id}">
                            <label class="card__form--label" for="lenses"><strong>Choisir une lentilles : </strong> </label>
                            <select id="lenses" class="card__form__select js-lensesSelectAllOption" aria-label="Sélectionner la lentille de votre choix">
                                <option class="card__form__select--option" value="${response[i]}">${article.lenses[0]}</option>
                            </select>
                            <button class="btn" type="submit" aria-label="Valider et accéder au panier">Valider</button>
                          </form>
                    </div>
                    <div> 
                        <img id="ProductImg" src="${response[i].imageUrl}" alt="">
                    </div>
                </div>
               
            </article>`;
       }
    } 
}

request.open("GET", requestURL);
request.send();


function getSelectAllOptionPromise() {
    const lensesSelectAllOption = document.querySelector('.#productLenses');
    console.log(lensesSelectAllOption);
    const data = getAllArticlesPromise(requestURL);
    for (let i = 1; i < data.lenses.length; i++) {
      lensesSelectAllOption.innerHTML += `<option class="card__form__select--option" value="${article.lenses[i]}">${article.lenses[i]}</option>`;
    }
  }