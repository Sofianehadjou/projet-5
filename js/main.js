// REQUETTE APPEL API Tous produits, la requête contenant une promesse
let requestURL = 'http://localhost:3000/api/cameras';
export const getRequest = function (url) {
    return new Promise(function (resolve, reject) { // Cette fonction retournera une promesse qui fera :
        var request = new XMLHttpRequest();  //créer un nouvel objet qui correspond à notre objet AJAX. C'est grâce à lui qu'on va créer et envoyer notre requête ;
        request.onreadystatechange =  function() {
            if (this.readyState === 4){
                if (this.status == 200) {
                    let articles = JSON.parse(this.responseText);
                    if (articles.length > 0){
                        resolve(articles);
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

export const totalCart = () => {
    let totalCount = 0; // je crée une variable initialiser à zéro
    let myArticleJSON = localStorage.getItem("panier");   // je récupère le local storage
    let myArticle = JSON.parse(myArticleJSON); // je le transforme en nombre
    for (let i in myArticle) { // pour chaque produit présent dans le panier
        totalCount += myArticle[i].price * myArticle[i].quantity /100; //je rajoute chaque produit à la variable totalCount
    }
    return totalCount; // totalCount me retourne la Somme de tous les prix des produits
};

// REQUETTE APPEL API un produit unique, la requête contenant une promesse
let requestUrlOrder = 'http://localhost:3000/api/cameras/' + window.location.search.substr(1).split("=")[1];
export const getRequestOrder = function (url) {
    return new Promise(function (resolve, reject) { // Cette fonction retournera une promesse qui fera :
        var request = new XMLHttpRequest();  //créer un nouvel objet qui correspond à notre objet AJAX. C'est grâce à lui qu'on va créer et envoyer notre requête ;
        request.onreadystatechange =  function() {
            if (this.readyState === 4){
                if (this.status == 200) {
                    let articles = JSON.parse(this.responseText);
                    if (articles.length > 0){
                        resolve(articles);
                    } else {
                        reject("l'api ne retourne aucun produit");
                    }
                } else {
                    reject(request) // Si une erreur lors de l'accès à l'API a eu lieu, il faut traiter l'erreur
                    console.log("reject")
                }
            } 
        }    
        request.open("GET", requestUrlOrder, true);   //Création et configuration d'une requête HTTP
        request.send(); // Envoi de la requête en y incluant l'objet
    });
};