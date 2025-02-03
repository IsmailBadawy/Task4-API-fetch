let cards = document.querySelector(".cards");
let num = document.querySelector(".num");
let search = document.getElementById("search");
let goTop = document.querySelector('.top');
let products = [];
let array = JSON.parse(localStorage.getItem("products")) || [];
num.innerHTML = array.length;

async function getItems() {
    let response = await fetch("products.json");
    let elements = "";
    if (response.ok) {
        products = await response.json();
        products.forEach((element) => {
            elements += `
            <div class="card col-lg-4 col-md-6 col-sm-12 p-4 m-auto " style="width:20rem;">
                <img src="${element.image}" class="card-img-top pb-4" alt="Product" style="width:17rem;aspect-ratio: 2/2;">
                <div class="card-body">
                    <h5 class="card-title text-secondary">${element.title}</h5>
                    <div class="price  py-2">
                        <h6 class="card-subtitle mb-2 text-muted">Category: ${element.category}</h6>
                        <h6 class="card-subtitle mb-2 text-danger">Price: ${element.price}$</h6>
                    </div>
                    <span class="text-info">Description: 
                        <p class="card-text d-inline" style="background: linear-gradient(rgb(89, 180, 223), rgb(0, 123, 194)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                            ${element.description}
                        </p>
                    </span>
                </div>
                <button onclick="addToCart(${element.id}, event)" class="btn btn-danger">
                    Add to Cart <i class="fa-solid fa-cart-plus"></i>
                </button>
            </div>
            `;
        });
    }
    cards.innerHTML = elements;
}

function addToCart(id, event) {
    array.push(id);
    localStorage.setItem("products", JSON.stringify(array));
    num.innerHTML = array.length;
    event.target.disabled = true;
}

search.oninput = () => {
    let value = search.value.toLowerCase();
    let elements = "";
    let found = false;

    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        if (product.title.toLowerCase().includes(value)) {
            found = true;
            elements += `
            <div class="card col-lg-4 col-md-6 col-sm-12 p-4 m-auto" style="width:20rem;">
                <img src="${product.image}" class="card-img-top pb-4" alt="Product" style="width:15rem;aspect-ratio: 2/2;">
                <div class="card-body">
                    <h5 class="card-title text-secondary">${product.title}</h5>
                    <div class="price d-flex justify-content-between py-2">
                        <h6 class="card-subtitle mb-2 text-muted">${product.category}</h6>
                        <h6 class="card-subtitle mb-2 text-danger">${product.price}$</h6>
                    </div>
                    <span class="text-info">Description: 
                        <p class="card-text d-inline" style="background: linear-gradient(rgb(89, 180, 223), rgb(0, 123, 194)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                            ${product.description}
                        </p>
                    </span>
                </div>
                <button onclick="addToCart(${product.id}, event)" class="btn btn-danger">
                    Add to Cart <i class="fa-solid fa-cart-plus"></i>
                </button>
            </div>
            `;
        }
    }

    if (!found) {
        elements = `<p>No results found</p>`;
    }

    cards.innerHTML = elements;
};
goTop.style.display = 'none';
window.addEventListener('scroll', () => {
    if (scrollY === 0) {
        goTop.style.display = 'none';
    } else {
        goTop.style.display = 'block';
    }
});
goTop.addEventListener('click', () => {
    scroll({ top: 0, behavior: 'smooth', })
})

getItems();

