

/* 
const addToCartButton = document.getElementById("add_to_cart_button");

addToCartButton.addEventListener('click', () => {
    console.log("Added to cart.")
}) */


var listOfProducts;
console.log(listOfProducts)


function loadProducts() {
    fetch("./products.json")
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (products) {
            listOfProducts = products;
            addProductsToWebpage();
        });
}

function initSite() {
    loadProducts();
/*     updateCartCount();
 */}

function addProductsToWebpage() {
    let container = document.getElementById("productList")
    /* container.style.display = "flex"
    container.style.justifyContent = "center"
    container.style.flexDirection = "column" */

    for (let i = 0; i < listOfProducts.length; i++) {
        const product = listOfProducts[i];


        let displayPhone = document.createElement("div")
        displayPhone.classList.add("products", "gallery")

        let itemTitle = document.createElement("h1")
        itemTitle.classList.add("itemTitle")
        itemTitle.textContent = product.title
        displayPhone.appendChild(itemTitle)


        let itemBeskrivning = document.createElement("h4")
        itemBeskrivning.classList.add("itemBeskrivning")
        itemBeskrivning.textContent = product.description
        displayPhone.appendChild(itemBeskrivning)

        let itemPhoto = document.createElement("img")
        itemPhoto.src = "/assets/" + product.image
        itemPhoto.classList.add("itemPhoto")
        displayPhone.appendChild(itemPhoto)


        let itemPrice = document.createElement("h3")
        itemPrice.classList.add("itemPrice")
        itemPrice.textContent = `${product.price} kr`

        displayPhone.appendChild(itemPrice)


        let itemButton = document.createElement("button")
        itemButton.classList.add("itemButton")

        itemButton.addEventListener("click", e => {
            var cart

            if (localStorage.cart == undefined) {
                cart = []
            } else {
                cart = JSON.parse(localStorage.cart)
            }

            cart.push(product)
            localStorage.cart = JSON.stringify(cart)
            updateCartCount()

        })
        displayPhone.appendChild(itemButton)

        let itemSpan = document.createElement("span")
        itemSpan.textContent = "Lägg till i kundvagn"

        itemButton.appendChild(itemSpan)


        container.appendChild(displayPhone)
    }

    document.body.appendChild(container)
}


function updateCartCount() {
    var count = 0

    if (localStorage.cart !== undefined) {

        count = JSON.parse(localStorage.cart).length
    }

    document.getElementById("cartNumber").textContent = count
}