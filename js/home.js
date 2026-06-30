
/* =====================================
   PRINSO MART HOME JS
===================================== */

const productGrid = document.getElementById("productGrid");

const products = [

{
id:1,
name:"Fresh Tomato",
price:35,
oldPrice:45,
weight:"1 KG",
image:"images/product-placeholder.png"
},

{
id:2,
name:"Fresh Potato",
price:28,
oldPrice:35,
weight:"1 KG",
image:"images/product-placeholder.png"
},

{
id:3,
name:"Fresh Onion",
price:32,
oldPrice:40,
weight:"1 KG",
image:"images/product-placeholder.png"
},

{
id:4,
name:"Amul Milk",
price:30,
oldPrice:35,
weight:"500 ML",
image:"images/product-placeholder.png"
}

];

function loadProducts(){

productGrid.innerHTML="";

products.forEach(product=>{

productGrid.innerHTML+=`

<div class="product-card fade-in">

<img src="${product.image}">

<h3>${product.name}</h3>

<p class="weight">${product.weight}</p>

<div class="price-row">

<span class="price">₹${product.price}</span>

<span class="old-price">

₹${product.oldPrice}

</span>

</div>

<button

class="add-btn"

onclick="addToCart(${product.id})">

<i class="fa-solid fa-cart-plus"></i>

Add

</button>

</div>

`;

});

}

loadProducts();
/* =====================================
   CART SYSTEM
===================================== */

let cart = JSON.parse(localStorage.getItem("prinso_cart")) || [];

// Add To Cart

function addToCart(id){

const product = products.find(item=>item.id===id);

if(!product) return;

cart.push(product);

localStorage.setItem(

"prinso_cart",

JSON.stringify(cart)

);

updateCartCount();

showToast(product.name+" Added to Cart");

}

// Update Cart Badge

function updateCartCount(){

const badge=document.getElementById("cartCount");

if(!badge) return;

badge.innerText=cart.length;

}

// Toast Message

function showToast(message){

const toast=document.createElement("div");

toast.className="toast";

toast.innerText=message;

document.body.appendChild(toast);

setTimeout(()=>{

toast.classList.add("show");

},100);

setTimeout(()=>{

toast.classList.remove("show");

setTimeout(()=>{

toast.remove();

},300);

},2000);

}

// Wishlist

let wishlist=JSON.parse(

localStorage.getItem("prinso_wishlist")

)||[];

function toggleWishlist(id){

const index=wishlist.indexOf(id);

if(index===-1){

wishlist.push(id);

showToast("Added to Wishlist");

}else{

wishlist.splice(index,1);

showToast("Removed from Wishlist");

}

localStorage.setItem(

"prinso_wishlist",

JSON.stringify(wishlist)

);

}

// Search

const search=document.getElementById("search");

if(search){

search.addEventListener("keyup",()=>{

const value=search.value.toLowerCase();

const cards=document.querySelectorAll(".product-card");

cards.forEach(card=>{

const name=card.querySelector("h3")

.innerText.toLowerCase();

card.style.display=

name.includes(value)

?"block"

:"none";

});

});

}

updateCartCount();
/* =====================================
   PRINSO MART
   HOME PAGE FEATURES
===================================== */

// Banner Slider

const banners = [
    "images/banner1.jpg",
    "images/banner2.jpg",
    "images/banner3.jpg"
];

let bannerIndex = 0;

function startBannerSlider() {

    const banner = document.querySelector(".banner img");

    if (!banner) return;

    setInterval(() => {

        bannerIndex++;

        if (bannerIndex >= banners.length) {

            bannerIndex = 0;

        }

        banner.src = banners[bannerIndex];

    }, 3000);

}

startBannerSlider();

/* =====================================
   LOCATION
===================================== */

function loadLocation() {

    const location = document.querySelector(".location");

    if (!location) return;

    location.innerHTML =
        '<i class="fa-solid fa-location-dot"></i> Harrwah, Umaria';

}

loadLocation();

/* =====================================
   FEATURED PRODUCTS
===================================== */

const featuredProducts = products.filter(p => p.price < 35);

console.log("Featured Products :", featuredProducts);

/* =====================================
   SPLASH SCREEN
===================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        const splash = document.getElementById("splash");

        if (splash) {

            splash.style.display = "none";

        }

    }, 1800);

});

/* =====================================
   SCROLL TO TOP
===================================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 150) {

        document.body.classList.add("scrolled");

    } else {

        document.body.classList.remove("scrolled");

    }

});
