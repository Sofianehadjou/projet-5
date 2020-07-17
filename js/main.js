// REQUETTE APPEL API Tous produits, la requête contenant une promesse
let requestURL = 'http://localhost:3000/api/cAmeras';
export const getRequest = function (url) {
    return new Promise(function (resolve, reject) { // Cette fonction retournera une promesse qui fera :
        var request = new XMLHttpRequest();  //créer un nouvel objet qui correspond à notre objet AJAX. C'est grâce à lui qu'on va créer et envoyer notre requête ;
        request.onreadystatechange =  function() {
            if (this.readyState === 4){
                if (this.status == 200) {
                    let articles = JSON.parse(this.responseText);
                    console.log(articles)
                    if (articles.length > 0){
                        resolve(articles);
                        console.log("resolve")
                    } else {
                        reject("l'api ne retourne aucun produit");
                        console.log("reject")

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

//fonction pour calculer le total du panier.
export const totalCart = () => {
    let totalCount = 0; // je crée une variable initialiser à zéro
    let myArticleJSON = localStorage.getItem("panier");   // je récupère le local storage
    let myArticle = JSON.parse(myArticleJSON); // je le transforme en nombre
    for (let i in myArticle) { // pour chaque produit présent dans le panier
        totalCount += myArticle[i].price * myArticle[i].quantity /100; //je rajoute chaque produit à la variable totalCount
    }
    return totalCount; // totalCount me retourne la Somme de tous les prix des produits
};
