// ================= LOGIN / REGISTER =================
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

// ================= APPLY JOB =================
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

// ================= SLIDER =================
const images = [
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200",
    "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1200",
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200"
];

let i = 0;
function slide(){
    if(!slider) return;
    slider.src = images[i];
    i = (i + 1) % images.length;
}

setInterval(slide, 2500);
slide();

// ================= JOB MANAGEMENT =================

// get jobs from localStorage
let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

let jobContainer = document.getElementById("jobContainer");

// DISPLAY JOBS ON INDEX PAGE
function displayJobs() {

    if (!jobContainer) return;

    jobContainer.innerHTML = "";

    jobs.forEach(job => {

        jobContainer.innerHTML += `
            <div class="job-card">
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600">
                <h3>${job.title}</h3>
                <p>Salary: ₹${job.salary}</p>
                <p>Duration: ${job.duration}</p>

                <button onclick="applyJob('${job.title}')" class="btn glow">
                    Apply
                </button>

                <button onclick="viewJobDetails('${job.title}','${job.salary}','${job.duration}')"
                    class="btn mt-2">
                    View Details
                </button>
            </div>
        `;
    });
}

// VIEW DETAILS (INDEX PAGE)
function viewJobDetails(title, salary, duration) {
    alert(
`Job Title: ${title}
Salary: ₹${salary}
Duration: ${duration}`
    );
}

// ================= ADMIN SIDE FUNCTIONS =================

// ADD JOB (used in admin.html)
function addJob() {

    let titleInput = document.getElementById("jobTitle");
    let salaryInput = document.getElementById("jobSalary");
    let durationInput = document.getElementById("jobDuration");

    if (!titleInput || !salaryInput || !durationInput) return;

    let title = titleInput.value;
    let salary = salaryInput.value;
    let duration = durationInput.value;

    // VALIDATION
    if (title === "" || salary === "" || duration === "") {
        alert("Please fill all fields");
        return;
    }

    let job = {
        id: Date.now(),
        title,
        salary,
        duration
    };

    jobs.push(job);

    localStorage.setItem("jobs", JSON.stringify(jobs));

    // clear inputs
    titleInput.value = "";
    salaryInput.value = "";
    durationInput.value = "";

    displayJobsAdmin();
}

// SHOW JOBS IN ADMIN PAGE
function displayJobsAdmin() {

    let container = document.getElementById("jobList");
    if (!container) return;

    container.innerHTML = "";

    jobs.forEach(job => {

        let card = document.createElement("div");

        card.className = "bg-white rounded-2xl shadow-lg p-5";

        card.innerHTML = `
            <h2 class="text-xl font-bold">${job.title}</h2>
            <p>Salary: ₹${job.salary}</p>
            <p>Duration: ${job.duration}</p>

            <button onclick="viewJob(${job.id})"
                class="bg-green-500 text-white w-full py-2 rounded mt-3">
                View Details
            </button>

            <button onclick="deleteJob(${job.id})"
                class="bg-red-500 text-white w-full py-2 rounded mt-2">
                Delete
            </button>
        `;

        container.appendChild(card);
    });
}

// DELETE JOB
function deleteJob(id) {
    jobs = jobs.filter(job => job.id !== id);
    localStorage.setItem("jobs", JSON.stringify(jobs));

    displayJobsAdmin();
}

// VIEW JOB (ADMIN)
function viewJob(id) {
    let job = jobs.find(j => j.id === id);

    alert(
`Job Title: ${job.title}
Salary: ₹${job.salary}
Duration: ${job.duration}`
    );
}

// ================= INITIAL LOAD =================
displayJobs();
displayJobsAdmin();
