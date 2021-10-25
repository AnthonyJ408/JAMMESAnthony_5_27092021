// Creation d'une classe Article pour accueillir les donnés de l'API en ajoutant tout leur attribut JSON
class Article {
	constructor(varnish, _id, name, price, description, imageUrl, inCart) {
		this.varnish = varnish;
		this._id = _id;
		this.name = name;
		this.price = price;
		this.description = description;
		this.imageUrl = imageUrl;
		this.inCart = inCart
	}
}
//Conversion du prix en euro
let convertisseurEuro = (price) => {
	return price / 100 + "€";
}
//mise a jour du compteur de produit au chargement
function onLoadCartCounter() {
	let productNumbers = localStorage.getItem('cartNumbers');
	if (productNumbers) {
		document.querySelector('.count').textContent = productNumbers;
	}
}
//Compteur de produit dans le localstorage
function cartNumbers() {
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);
	if (productNumbers) {
		localStorage.setItem('cartNumbers', productNumbers + 1)
		document.querySelector('.count').textContent = productNumbers + 1;
	} else {
		localStorage.setItem('cartNumbers', 1);
		document.querySelector('.count').textContent = 1;
	}
}
//Ajout d'un produit avec tout ses attributs au localstorage
function setItems(product) {
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);
	// Transforme de string a objet + ajoute a la suite du tableau les produit different avec modif de l'attribut .incart
	if (cartItems != null) {
		if (cartItems[product.name] == undefined) {
			cartItems = {
				...cartItems,
				[product.name]: product
			}
		}
		cartItems[product.name].inCart += 1;
	} else {
		product.inCart = 1;
		cartItems = {
			[product.name]: product
		}
	}
	//Retour en string
	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
//Calcul du prix total du panier sous forme de nombre entier
function totalCost(product) {
	let cartCost = localStorage.getItem('totalCost');
	if (cartCost != null) {
		cartCost = parseInt(cartCost);
		localStorage.setItem("totalCost", cartCost +
			product.price);
	} else {
		localStorage.setItem("totalCost", product.price);
	}

}
// Regex pour le formulaire
let regexName =/^[a-zA-Z]{0,20}$/;

let regexEmail =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

let regexPhone =/\d[0-9]{0,10}$/;

let regexAddress =/[a-z]{0,40}$/;

let regexPostalCode =/\d[0-9]{0,5}$/;

let regexTown = /[a-zA-Z]{0,20}$/;

let regexCardNumber = /\d[0-9]{0,4}$/;

let regexExpiryDate = /((0?[1-9])|(1[0-2]))\/(\d{4})/;

let regexCvv = /\d[0-9]{0,3}$/;

//nouvelle fenêtre
function openInNewTab(url) {
	window.open(url, '_blank');
}