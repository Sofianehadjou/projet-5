// variable pour l'Url d'api
let requestURL = 'http://localhost:3000/api/cameras';
var productUnit= document.getElementById('productUnit');

let tableCart = document.getElementById('table');

//recuperer les données de l'API:
var request = new XMLHttpRequest();   //Lig on crée un nouvel objet qui correspond à notre objet AJAX. C'est grâce à lui qu'on va créer et envoyer notre requête ;
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response =JSON.parse(this.responseText);
       for( let i = 0; i < response.length; i++) {
           let article = response[i]; 

        productUnit.innerHTML = `<li class="articles__lists--item cards__item">
            <div class="cards__item__thumb">
                <img class="cards__item__thumb--img" src="${response[i].imageUrl}" alt="Appareil photo vintage ${response[i].imageUrl}}" width="300">
            </div>
            <div class="cards__item__body">
                <h3 class="cards__item__body--title">Appareil photo vintage ${response[i].name}</h3>
                <p class="cards__item__body--name"><strong>Marque : </strong>${response[i].name}</p>
                <p class="cards__item__body--lenses"><strong>Lentilles : </strong>${response[i].lenses}</p>
                <P class="cards__item__body--description"><strong>Description : </strong>${response[i].description}...</P>
                <p class="cards__item__body--price"><strong>Prix : </strong>${response[i].price / 100}€</p>

                <div class="cards__item__form">
                    <a class="btn" href="produit.html?id=${response[i]._id}" aria-label="Sélectionner l’appareil photo vintage ${response[i].name}">Sélectionner</a>
                </div>
            </div>
        </li>`;
        }
    }
}

request.open("GET", requestURL);
request.send();