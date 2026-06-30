document.addEventListener("DOMContentLoaded", initApp);

function initApp() {

    console.log("Soni Mart Started");

    hideSplash();

    updateCartCount();

    initBannerSlider();

    initSearch();

    initScrollButton();

    initBottomNavigation();

    loadProducts();

}

/* ===========================
Splash
=========================== */

function hideSplash() {

    const splash = document.getElementById("splash");

    if (!splash) return;

    setTimeout(() => {

        splash.style.opacity = "0";

        setTimeout(() => {

            splash.remove();

        }, 500);

    }, 1800);

}

/* ===========================
Bottom Navigation
=========================== */

function initBottomNavigation() {

    const links = document.querySelectorAll(".bottom-nav a");

    links.forEach(link => {

        link.addEventListener("click", () => {

            links.forEach(item => {

                item.classList.remove("active");

            });

            link.classList.add("active");

        });

    });

}

/* ===========================
Scroll Button
=========================== */

function initScrollButton() {

    const btn = document.getElementById("scrollTop");

    if (!btn) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            btn.style.display = "flex";

        } else {

            btn.style.display = "none";

        }

    });

    btn.onclick = () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

}

/* ===========================
Search
=========================== */

function initSearch() {

    const search = document.getElementById("search");

    if (!search) return;

    search.addEventListener("keyup", () => {

        const value = search.value.toLowerCase();

        document.querySelectorAll(".product-card").forEach(card => {

            const title = card.querySelector("h3").innerText.toLowerCase();

            card.style.display =

                title.includes(value)

                ? "block"

                : "none";

        });

    });

}

/* ===========================
Banner Slider
=========================== */

function initBannerSlider(){

    console.log("Banner Ready");

}
