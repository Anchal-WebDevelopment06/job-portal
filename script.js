const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const applyPopup = document.getElementById("applyPopup");
const jobTitle = document.getElementById("jobTitle");
const slider = document.getElementById("slider");

function showLogin(){
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
}

function showRegister(){
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
}

function applyJob(job){
    applyPopup.classList.remove("hidden");
    jobTitle.innerText = "Apply for " + job;
}

function closePopup(){
    applyPopup.classList.add("hidden");
}

function submitApplication(){
    alert("Application Submitted!");
    closePopup();
}

const images = [
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200",
    "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1200",
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200"
];

let i = 0;
function slide(){
    slider.src = images[i];
    i = (i + 1) % images.length;
}

setInterval(slide, 2500);
slide();

// ================= CART FEATURE =================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(title, salary) {

    let job = {
        id: Date.now(),
        title,
        salary
    };

    cart.push(job);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(title + " added to cart!");
    showCart();
}

function showCart() {

    let container = document.getElementById("cartItems");
    let total = 0;

    if (!container) return;

    container.innerHTML = "";

    cart.forEach(item => {

        total += Number(item.salary);

        let card = document.createElement("div");
        card.className = "job-card";

        card.innerHTML = `
            <h3>${item.title}</h3>
            <p>₹${item.salary}</p>
            <button onclick="removeFromCart(${item.id})" class="btn glow mt-2">
                Remove
            </button>
        `;

        container.appendChild(card);
    });

    document.getElementById("total").innerText = total;
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
}

// LOAD CART
showCart();
