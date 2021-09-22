const purchaseButton = document.getElementById('puchase_button');

let stripe = Stripe('pk_test_51JbgfPCB4BGOldQPscttff0yC0UX2zKEgPJkjLeNu2UyFqO5DtOIHGAK7UE3jHCKUNHxEO8XEVW23uMmFPtRP5P000ZaMfINHj');


purchaseButton.addEventListener('click', async () => {
    const response = await fetch('/api/session/new', {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    });

    const { id } = await response.json();
    console.log(stripe);
    stripe.redirectToCheckout({ sessionId: id });

});

var totalAmount = 0

function initSite() {
    ShowProductsInCart()
    updateCartCount()
}

function addProductsToWebpage() { }

function ShowProductsInCart() {

    let container = document.getElementById("cartProducts")
    container.style.display = "flex"
    container.style.justifyContent = "center"
    container.style.flexDirection = "row"


    var listOfProducts = getCartProducts()

    for (let i = 0; i < listOfProducts.length; i++) {
        const product = listOfProducts[i];
        const productIndex = i;

        totalAmount = totalAmount + product.price

        let displayPhone = document.createElement("div")
        displayPhone.classList.add("products", "cart")

        let itemPhoto = document.createElement("img")
        itemPhoto.src = "/assets/" + product.image
        itemPhoto.classList.add("cartPhoto")
        displayPhone.appendChild(itemPhoto)

        let itemTitle = document.createElement("h1")
        itemTitle.classList.add("cartTitle")
        itemTitle.textContent = product.title
        displayPhone.appendChild(itemTitle)

        let itemPrice = document.createElement("h3")
        itemPrice.classList.add("itemPrice")
        itemPrice.textContent = `${product.price} kr`

        displayPhone.appendChild(itemPrice)


        let itemButton = document.createElement("button")
        itemButton.classList.add("itemButton")
        itemButton.dataset.productIndex = productIndex

        itemButton.addEventListener("click", e => {
            var cart = getCartProducts()

            cart = cart.filter(function (_, cartIndex) {
                return cartIndex != productIndex
            })
            localStorage.cart = JSON.stringify(cart)
            window.location.reload()
        })
        displayPhone.appendChild(itemButton)


        let itemSpan = document.createElement("span")
        itemSpan.textContent = "Ta Bort"

        itemButton.appendChild(itemSpan)


        container.appendChild(displayPhone)
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