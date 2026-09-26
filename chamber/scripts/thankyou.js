const params = new URLSearchParams(window.location.search);

document.querySelector("#display-first-name").textContent = 
params.get("firstName") || "";

document.querySelector("#display-last-name").textContent = 
params.get("lastName") || "";

document.querySelector("#display-email").textContent = 
params.get("email") || "";

document.querySelector("#display-phone").textContent = 
params.get("phone") || "";

document.querySelector("#display-organization").textContent = 
params.get("organization") || "";


const timestamp = params.get("timestamp");

if (timestamp) {
    const date = new Date(timestamp);

    document.querySelector("#display-timestamp").textContent = 
    params.get("timestamp");
}
