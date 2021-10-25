let cartCost = 0;
//Affichage sous forme de carte miniature  des produits
function displayCart() {
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	let productContainer = document.querySelector(".products-container")
	cartCost = localStorage.getItem("totalCost");
	if (cartItems && productContainer) {
		productContainer.innerHTML = "";
		Object.values(cartItems).map(item => {
			productContainer.innerHTML +=
		`
          <div class="card container bg-primary my-2">
            <div class="row align-items-center justify-content-center  ">
              <div class="col-2 m-0 p-0">
                <img class="img-fluid" src="${item.imageUrl}" alt="${item.name}">  
              </div>           
              <div class="col-3 m-0 p-0">   
                <p>${item.name}</p>
              </div>
              <div class="col-2 m-0 p-0">
                <p>${item.price + "€"}</p>
              </div>
              <div class="col-2 m-0 p-0">
                <p class ="my-0">${item.inCart}</p>
              </div>
              <div class="col-2 m-0 p-0">
                <p>${item.inCart * item.price + "€"}</p>
              </div>
            </div>
          </div>
        `
		});
//Affichage du prix total du panier		
		let productTotalContainer = document.querySelector('.total-container');
		productTotalContainer.innerHTML +=
	`
      <div class="container">
        <div class="row">
          <div class="col-3 ">
            <p class="h3">Total :</p>
          </div>
          <div class="col-6 ">
            <p class="h3">${cartCost + "€"}</p>
          </div>
          <div class="col-3 ">
            <input type="submit" value="Purchase" class="btn btn-sm btn-outline-success me-2" ></input>
          </div>
        </div>
      </div>
    `
	}
}
displayCart();
//Appel des fonction regex avec le parametre recuperé dans l'attribut "name" pour les differencier
let getRegex = (identifier) => {
	if (identifier == "firstName" || identifier == "lastName" || identifier == "firstNameOnCard" || identifier == "lastNameOnCard") {
		return regexName;
	} else if (identifier == "email") {
		return regexEmail;
	} else if (identifier == "phoneNumber") {
		return regexPhone;
	} else if (identifier == "address") {
		return regexAddress;
	} else if (identifier == "postalCode") {
		return regexPostalCode;
	} else if (identifier == "city") {
		return regexTown;
	} else if (identifier == "cardNumberOne" || identifier == "cardNumberTwo" || identifier == "cardNumberThree") {
		return regexCardNumber;
	} else if (identifier == "expiryDate") {
		return regexExpiryDate;
	} else if (identifier == "cvv") {
		return regexCvv;
	}
}
//Verification de la saisie et du regex
function verifyValue(value, regex) {
	return regex.test(value);
}

let contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const contact = {};
	let isFormValid = true;
//Boucle pour récupéré chaque saisie sur chaque champs de saisie, chaque attribut "name" , et le regex concerné. avec  l'appel de la fonction verifyValue
	let allInputs = document.getElementsByClassName("inputControl");
	for (let elem of allInputs) {
		let value = elem.value;
		let field = elem.getAttribute("name");
		let regex = getRegex(field);
		let isValueValid = verifyValue(value, regex);
// Si la saisie respecte les regex => remplissage de la classe contact avec ses attributs
		if (isValueValid == true) {
			contact[field] = value;
		} else {
			isFormValid = false;
			alert("Value invalid: " + field)
		}
	}
//Si l'ensemble du formulaire est correcte recupération des id produits et stockage dans un tableau "products"
	if (isFormValid == true) {
		let products = [];
		let cartItems = localStorage.getItem("productsInCart");
		cartItems = JSON.parse(cartItems);
		for (let id of Object.values(cartItems)) {
			products.push(id._id)
		}
//Appel de l'API pour une méthode "POST" de l'objet contact et du tableau products avec un retour de  ceux-ci + d'un numero de commande qui sera stocké dans l'URL
		fetch("http://localhost:3000/api/furniture/order", {
				method: "POST",
				headers: {
					'content-type': "application/json"
				},
				body: JSON.stringify({
					contact,
					products
				}),
			})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
			})
			.then((result) => {
				openInNewTab(`./confirm.html?order=${result.orderId}&totalPrice=${cartCost}&orderName=${result.contact.firstName}`);
				localStorage.clear();
			})
			.catch((error) => console.log("Error:" + error));		
	}
});
onLoadCartCounter();