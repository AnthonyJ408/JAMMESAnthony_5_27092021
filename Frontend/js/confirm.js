//Récuperation du nom , du prix total et du numero de commande dans l'URL
let getUrl = window.location.search;
let searchParams = new URLSearchParams(getUrl);
let orderName = searchParams.get('orderName');
let orderId = searchParams.get('order');
let totalPrice= searchParams.get('totalPrice') + "€";
let container = document.getElementById('confirm');
//Affichage du message de remerciement avec les données récoltées
container.innerHTML +=
 `
  <div class="card bg-primary" style="width: 50rem;">
    <img class="card-img-top" src="../Images/logo_orinoco.png" alt="Card image cap">
    <div class="card-body">
    <h5 class="card-title">You will  be able to enjoy your furniture soon <strong>${orderName}</strong>!</h5>
    <p class="card-text">
      Orinoco's team thanks you for your order number<strong> ${orderId}</strong> with a total price of<strong> ${totalPrice}</strong>!
    </p>
    </div>
  </div>
`
onLoadCartCounter()