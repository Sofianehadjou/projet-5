//création de la fonction pour afficher le panier
const showProduct = () => {
const tableau = document.getElementById('table'); 
const myArticleJSON = localStorage.getItem("panier"); //récuperation du localStorage.
const myArticle = JSON.parse(myArticleJSON);  //le transformer en objet Javascript.
    if(myArticleJSON != null){
        for( let i = 0; i < myArticle.length; i++) {
            let article = myArticle[i]; 
            tableau.innerHTML += `
            <div id="productUnit" class="product">
                <article>
                    <table id="table">
                        <tr>
                            <td><img class="imagesPanier" src="${article.imageUrl}"> ${article.name}</th>
                            <td> ${article.lenses[i]}</th>
                            <td> ${article.price/100} €</th> 
                            <td> ${article.price/100 * article.quantity}  €</th>
                            <td class="productQte">${article.quantity}</th>
                            </td>
                        </tr>
                    </table>
                </article>
            </div>`;
        };
    };
};  
showProduct(); //Appeler la fonction pour afficher les produits.

//fonction pour calculer la somme du total du panier
export const totalCart = () => {
    let totalCount = 0; //création d'une variable initialiser à zéro
    let myArticleJSON = localStorage.getItem("panier");   //récuperation du localStorage.
    let myArticle = JSON.parse(myArticleJSON); //le transformer en objet Javascript.
    for (let i in myArticle) {   //pour chaque produit présent dans le panier
        totalCount += myArticle[i].price * myArticle[i].quantity /100; // ajouter chaque produit à la variable totalCount
    }
    return totalCount; // totalCount me retourne la Somme de tous les prix des produits
};
const resultTotalCart = totalCart();

//fonction pour ajouter la somme total du panier au DOM.
const showTotalCart = () => {
    const total = document.getElementById('total');
    total.innerHTML = `<div>
        <table id="totalPrice">
            <tr>
                <th>Total du panier : ${resultTotalCart} € </th>
            </tr>
        </table>  
    </div>`
};
showTotalCart();

//fonction pour tester si le local storage existe ou non.
const testSimpleTotalCart = () => {
    if (localStorage.getItem("panier") !== null) {
        console.log('le localstorage contient un élement!');
    } else{
        console.error('le local storage est vide');
    };
};
testSimpleTotalCart();

//fonction pour Vider le panier
const removeBtn = document.getElementById('removeBtn'); 
const removeCart = () => { 
    removeBtn.addEventListener('click', function (event) {
    localStorage.removeItem("panier");  
    localStorage.removeItem("order");
    localStorage.removeItem('productsID');
    })
}
removeCart();

// Récupérer les informations du formulaire pour requête POST au serveur
const main = document.getElementById("main");
const form = document.getElementById("form");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
const submit = document.getElementById("form");


submit.addEventListener('submit', function (event){
    //Récuperation du localstorage
    const myArticleJSON = localStorage.getItem("panier");
    const myArticle = JSON.parse(myArticleJSON);

    if (localStorage.getItem("panier")) {
        event.preventDefault();        
        //creation de l'objet utilisateur
        const contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value
        }
        //création de l'array produit
        const products = [];

        // si le local storage existe
        if (localStorage.getItem("panier")) {
            for (let i in myArticle){            
                let idProducts = myArticle[i]._id;
                products.push(idProducts);
                localStorage.setItem("productsID", products);        
            }
        }
        //création de l'objet order:
        const order = {
            contact,
            products,
        }
        //creation de la requete POST pour envoyer au serveur.
        const send = () => {
            return new Promise(function (resolve, reject) { // Cette fonction retournera une promesse qui fera :
                let request = new XMLHttpRequest();
                //attente reponse et appel fonction de retour
                request.onreadystatechange = function () {
                    if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
                        let response = JSON.parse(this.responseText);
                        resolve(response);
                        console.log(resolve)
                        localStorage.setItem("order", JSON.stringify(response));
                        location.href = "confirmation.html";
                    } else {
                        reject(Request);
                        console.log("reject");

                    }
                };
            request.open("POST", "http://localhost:3000/api/cameras/order");
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify(order));
            });
        };    
        send(); // appeler la fonction 
    } else {
        event.preventDefault();        
        alert("veuillez ajouter un produit au panier");
    }
});
