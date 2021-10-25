// Creation d'une <div class="carousel-item"> pour chaque articles JSON et injection d'HTML+ ajout de classe active sur la premiere div
function toogle(article) {
	let caroussel = document.getElementById('carouselmain');
	let carousselItem = document.createElement("div");
	carousselItem.classList.add('carousel-item');
	article.price = convertisseurEuro(article.price);
	carousselItem.innerHTML +=
		` 
		<div class="container">
			<a class="text-dark text-decoration-none" href="./product.html?mon-produit=${article._id} ">
				<div class="card bg-primary" style="width: 40vw">
					<img class="  card-img-top" src="${article.imageUrl}" alt="${article.name}">
					<div class="card-body">
						<h2 class="card-title">${article.name}</h2>
						<h3 class="card-text">${article.price}</h3>
					</div>
				</div>
			</a>
		</div>  
		`;
	caroussel.prepend(carousselItem)
}
// Interroger l'API pour recuperer les donnés des produits, recupérer format JSON
fetch("http://localhost:3000/api/furniture")
	.then((res) => {
		if (res.ok) {
			return res.json();
		}
	})
	.then(function (listArticle) {
		article = new Article;
		for (article of listArticle) {
			toogle(article)
		}
		document.getElementsByClassName('carousel-item')[0].classList.add('active')
	})

	.catch(function (err) {
		console.error(err)
	})
onLoadCartCounter();