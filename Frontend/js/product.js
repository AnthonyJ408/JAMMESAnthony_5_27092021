// Récuperation de l'id dans l'url
let getUrl = window.location.search;
let searchParams = new URLSearchParams(getUrl);
let idProduit = searchParams.get('mon-produit')
//Fonction création de fiche produit
function toogle(product) {
	let productCard = document.getElementById('productCard');
	priceEuro = convertisseurEuro(product.price);
	productCard.innerHTML +=
		` 
   			<div class="card row bg-primary">
      			<img src="${product.imageUrl}" class=" px-0"   alt="${product.name}">
      			<div>
					<div class="card-block">
						<h2 class="card-title my-3">${product.name}</h2>
						<p class="card-text">${product.description}</p>
						<div class="dropdown dropend">
							<a class="btn btn-secondary my-3 dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">Varnish</a>  
							<ul class="dropdown-menu " aria-labelledby="dropdownMenuLink"></ul> 
						</div>
						<h3>${priceEuro}</h3>
						<button href="#" class="addCart my-3 btn btn-secondary display-4"><i class="fas fa-shopping-cart"></i></button>
					</div>
      			</div>
    		</div>           
  		`;
}
//Fonction Dropdown-menu
function dropDownMenu(productVarnish) {
	let targetVarnish = document.querySelector(".dropdown-menu")
	for (let varnish of productVarnish) {
		targetVarnish.innerHTML +=
			`<li><a class="dropdown-item" href='#'>${varnish}</a></li>`
	}
}
//Appel de l'api avec le _id
fetch(`http://localhost:3000/api/furniture/${idProduit}`)
	.then((res) => {
		if (res.ok) {
			return res.json();
		}
	})
	.then(function (jsonproduct) {
		let product = new Article;
		product = jsonproduct;
		product.inCart = 0;
		toogle(product);
		dropDownMenu(product.varnish);
		let carts = document.querySelectorAll('.addCart');
		product.price = product.price / 100;
		for (let i = 0; i < carts.length; i++) {
			carts[i].addEventListener('click', () => {
				cartNumbers();
				setItems(product);
				totalCost(product);
			})
		}

		onLoadCartCounter();
	})
	.catch(function (err) {
		console.error(err)
	});