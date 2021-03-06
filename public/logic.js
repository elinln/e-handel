

var listOfProducts;

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
    updateCartCount();
}

function addProductsToWebpage() {
    let container = document.getElementById("productList")

    for (let i = 0; i < listOfProducts.length; i++) {
        const product = listOfProducts[i];


        let displayProduct = document.createElement("div")
        displayProduct.classList.add("products", "gallery")

        let itemTitle = document.createElement("h1")
        itemTitle.classList.add("itemTitle")
        itemTitle.textContent = product.title
        displayProduct.appendChild(itemTitle)


        let itemBeskrivning = document.createElement("h4")
        itemBeskrivning.classList.add("itemBeskrivning")
        itemBeskrivning.textContent = product.description
        displayProduct.appendChild(itemBeskrivning)

        let itemPhoto = document.createElement("img")
        itemPhoto.src = "/assets/" + product.image
        itemPhoto.classList.add("itemPhoto")
        displayProduct.appendChild(itemPhoto)


        let itemPrice = document.createElement("h3")
        itemPrice.classList.add("itemPrice")
        itemPrice.textContent = `${product.price} kr`
        displayProduct.appendChild(itemPrice)


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
            console.log(product)
            localStorage.setItem('cart', JSON.stringify(cart))
            updateCartCount()

        })
        displayProduct.appendChild(itemButton)

        let itemSpan = document.createElement("span")
        itemSpan.textContent = "L??gg till i kundvagn"

        itemButton.appendChild(itemSpan)


        container.appendChild(displayProduct)
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


