//créer la variable pour l' Url d'api
let requestURL = 'http://localhost:3000/api/cameras/' + window.location.search.substr(1).split("=")[1];
// REQUETTE APPEL API un produit unique, la requête contient une promesse
export const getRequestOrder = function (url) {
    return new Promise(function (resolve, reject) { // Cette fonction retournera une promesse qui fera :
        var request = new XMLHttpRequest();  //créer un nouvel objet qui correspond à notre objet AJAX. C'est grâce à lui qu'on va créer et envoyer notre requête ;
        request.onreadystatechange =  function() {
            if (this.readyState === 4){
                if (this.status == 200) {
                    let article = JSON.parse(this.responseText);
                    if (article){
                        resolve(article);
                        console.log("resolve")
                    } else {
                        reject("l'api ne retourne aucun produit");
                    }
                } else {
                    reject(request) // Si une erreur lors de l'accès à l'API a eu lieu, il faut traiter l'erreur
                    console.log("reject")
                }
            } 
        }    
        request.open("GET", requestURL, true);   //Création et configuration d'une requête HTTP
        request.send(); // Envoi de la requête en y incluant l'objet
    });
};         
// Ajouter le contenu au DOM:
let apiResponse =  getRequestOrder(); //appeler la promesse(requete)
apiResponse.then(function (article) {
    for (let i = 0; i < article.lenses.length; i++) {
        const lenseOption = article.lenses[i];
        const productUnit = document.getElementById('productUnit');
        productUnit.innerHTML = `<article class="article-product">
            <div class="productInfos productUnit">
                <div>
                    <img id="ProductImg" src="${article.imageUrl}" alt="">
                </div>
                <div id="bloc-produit">
                    <h2 class="productName"><strong>Nom: </strong>${article.name}</h2>
                    <p class="productPrice"><strong>Prix: </strong> ${article.price/100} €</p>
                    <p class="productDescription"><strong>Description: </strong> ${article.description}</p>
                    <p class="productLenses"><strong>Lenses: </strong> ${article.lenses}</p>
                        <form id="buttonAchat" class="btn-produit" action="">
                        <label class="card__form--label" for="lenses"><strong>Choisir une lentille : </strong> </label>
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
         
        const submitBtn = document.getElementById('btnBasket'); //Appeler l'element du bouton.
        submitBtn.addEventListener('click', function (event) {    // écoute de l'événement click, notre callback prend un paramètre que nous avons appelé event ici
            event.preventDefault(); // On utilise la fonction preventDefault de notre objet event pour empêcher le comportement par défaut de cet élément lors du clic de la souris
            let addToCart = document.getElementById('addToCart'); //appeler la variable pour popUp une fois ajouter au panier.
            addToCart.style.top = "250px"; // 
            let cart = localStorage.getItem('panier'); // je récupère le local storage
            
            // je crée une fonction pour calculer le nombre de produit
            const CartQuantity = () => {
                if (cart) {
                    cart = JSON.parse(cart); // je transforme le contenu JSON en JS
                } else {
                    cart = [];  //sinon créer un array vide
                }
                var index = cart.findIndex(_article => _article._id === article._id);
                if (index > -1){
                    cart[index].quantity += 1;
                } else {
                    article.quantity = 1;
                    cart.push(article); // je push dedans un nouveau article
                }
            };
            CartQuantity() // j'appelle la fonction.
            localStorage.setItem("panier", JSON.stringify(cart)); // je mets l'array en localStorage            
        });
    };
}).catch(function(request){
    console.log("erreur")
});