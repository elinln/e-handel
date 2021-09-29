const purchaseButton = document.getElementById('puchase_button');

let stripe = Stripe('pk_test_51JbgfPCB4BGOldQPscttff0yC0UX2zKEgPJkjLeNu2UyFqO5DtOIHGAK7UE3jHCKUNHxEO8XEVW23uMmFPtRP5P000ZaMfINHj');


var totalAmount = 0

function initSite() {
    ShowProductsInCart()
    updateCartCount()
    getCartProducts()
}


var listOfProducts = getCartProducts()

function ShowProductsInCart() {

    let container = document.getElementById("cartProducts");
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.flexDirection = "column";


    for (let i = 0; i < listOfProducts.length; i++) {
        const product = listOfProducts[i];
        const productIndex = i;

        totalAmount = totalAmount + product.price

        let displayProduct = document.createElement("div")
        displayProduct.classList.add("products", "cart")

        let itemPhoto = document.createElement("img")
        itemPhoto.src = "/assets/" + product.image
        itemPhoto.classList.add("cartPhoto")
        displayProduct.appendChild(itemPhoto)

        let itemTitle = document.createElement("h1")
        itemTitle.classList.add("cartTitle")
        itemTitle.textContent = product.title
        displayProduct.appendChild(itemTitle)

        let itemPrice = document.createElement("h3")
        itemPrice.classList.add("itemPrice")
        itemPrice.textContent = `${product.price} kr`
        displayProduct.appendChild(itemPrice)


        let itemButton = document.createElement("button")
        itemButton.classList.add("itemButton")
        itemButton.dataset.productIndex = productIndex

        itemButton.addEventListener("click", e => {
            var cart = getCartProducts()

            cart = cart.filter(function (_, cartIndex) {
                return cartIndex != productIndex
            })
            localStorage.cart = JSON.stringify(cart)
            container.removeChild(displayProduct)
            return
        })
        displayProduct.appendChild(itemButton)


        let itemSpan = document.createElement("span")
        itemSpan.textContent = "Ta Bort"

        itemButton.appendChild(itemSpan)


        container.appendChild(displayProduct)
    }

    let totalAmountElement = document.getElementById("totalAmount")
    totalAmountElement.textContent = `Totalt pris: ${totalAmount} kr`


}


function getCartProducts() {

    if (localStorage.cart !== undefined) {
        return JSON.parse(localStorage.cart)
    }
    return []
}

function updateCartCount() {
    var count = getCartProducts().length
    document.getElementById("cartNumber").textContent = count

}

purchaseButton.addEventListener('click', async () => {
    let currentCart = localStorage.getItem("cart");

    if (currentCart === undefined) {
        currentCart = []
    } else {
        currentCart = JSON.parse(localStorage.cart)
    }


    console.log(currentCart)

    let respone = await fetch("/api/session/new", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ products: currentCart })
    })
        .then((result) => {
            return result.json();
        })
        .then((session) => {
            console.log(session);
            localStorage.setItem("sessionID", session.id);
            localStorage.setItem("cart", currentCart);
            localStorage.removeItem("cart");
            return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .catch((err) => console.error(err));

});