
var chai = require('chai');
var expect = require('chai').expect;
var should = require('chai').should();
var assert = require('chai').assert;
var chaiAsPromised = require('chai-as-promised');
var totalCart = require('../lib/demo')

describe('testApi', function () {
    it('should have 5 arrays', function () {
        const getRequest = function (url) {
            return new Promise(function (resolve, reject) { // Cette fonction retournera une promesse qui fera :
                var request = new XMLHttpRequest();  //créer un nouvel objet qui correspond à notre objet AJAX. C'est grâce à lui qu'on va créer et envoyer notre requête ;
                request.onreadystatechange =  function() {
                    if (this.readyState === 4){
                        if (this.status == 200) {
                            const articles = JSON.parse(this.responseText);
                            if (articles.length > 0){
                                resolve(articles);
                            } else {
                                reject("l'api ne retourne aucun produit");
                            }
                        } else {
                            reject(request) // Si une erreur lors de l'accès à l'API a eu lieu, il faut traiter l'erreur
                        }
                    }  
                }    
                request.open("GET", requestURL, true);   //Création et configuration d'une requête HTTP
                request.send(); // Envoi de la requête en y incluant l'objet
            });  
        };
        return expect(getRequest).to.have.lengthOf(1);
    });
});
