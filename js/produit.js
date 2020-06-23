//créer la variable pour l' Url d'api
let requestURL = 'http://localhost:3000/api/cameras/' + window.location.search.substr(1).split("=")[1];
//récupération des éléments du DOM.
const productUnit = document.getElementById('productUnit');

var article = undefined;

//recuperer les données de l'API:
var request = new XMLHttpRequest();   //Lig on crée un nouvel objet qui correspond à notre objet AJAX. C'est grâce à lui qu'on va créer et envoyer notre requête ;
request.open("GET", requestURL, true);
request.send();

request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        article =JSON.parse(this.responseText);
        console.log(article)
        for (let i = 0; i < article.lenses.length; i++) {
            const lenseOption = article.lenses[i];
            console.log(article.lenses[i])
               
// Ajouter le contenu au DOM:
        productUnit.innerHTML = `<article class="article-product">
            <div class="productInfos productUnit">
                <div>
                    <img id="ProductImg" src="${article.imageUrl}" alt="">
                </div>
                <div id="bloc-produit">
                    <p class="productId"></p>
                    <h2 class="productName"><strong>Nom: </strong>${article.name}</h2>
                    <p class="productPrice"><strong>Prix: </strong> ${article.price/100} €</p>
                    <p class="productDescription"><strong>Description: </strong> ${article.description}</p>
                    <p class="productLenses"><strong>Lenses: </strong> ${article.lenses}</p>
                        <form id="buttonAchat" class="btn-produit" action="">
                        <label class="card__form--label" for="lenses"><strong>Choisir une lentilles : </strong> </label>
                        <select id="lenses"  aria-label="Sélectionner la lentille de votre choix">
                            <option class="lenseSelect" value="">${article.lenses[i]}</option>
                            <option class="lenseSelect" value="">${article.lenses[++i]}</option>
                            <option class="lenseSelect" value="">${article.lenses[++i]}</option>

                        </select>
                        </form>
                        <a id="btnBasket" class="btn btn-accueil" href="" aria-label=""> Ajouter au panier </a>
                </div>
            </div>
        </article>`;
         

        const submitBtn = document.getElementById('btnBasket');
        const id = document.getElementById('productId');
        const lense = document.getElementsByClassName('productLenses');
        const Qte = document.getElementById('productQte');

        submitBtn.addEventListener('click', function (event) {    // écoute de l'événement click, notre callback prend un paramètre que nous avons appelé event ici
            event.preventDefault(); // On utilise la fonction preventDefault de notre objet event pour empêcher le comportement par défaut de cet élément lors du clic de la souris
            alert('votre article a été bien ajouter au panier ')

            let cart = localStorage.getItem('panier'); // je récupère le local storage
            if (cart) {
                cart = JSON.parse(cart); // je transforme le contenu JSON en JS
            } else {
                cart = [];  //sinon créer un array vide
            }

            var index = cart.findIndex(_article => _article._id === article._id);
            if (index > -1){
    
            /*    if (!cart[index].quantity){      
                    cart[index].quantity = 0;
                }
            */
                cart[index].quantity += 1;
            } else {
                article.quantity = 1;
                cart.push(article); // je push dedans un nouveau article
            }

            localStorage.setItem("panier", JSON.stringify(cart)); // je mets l'array en localStorage
            
            }) 
        };
    };  
};

