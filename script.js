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
