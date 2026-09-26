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

    const formattedDate = date.toLocaleDateString("en-US", {

        year: "numeric",
        month: "long",
        day: "numeric"

    }); 

    const formattedTime = date.toLocaleTimeString("en-US", {

        hour: "numeric",
        minute: "2-digit"

    });

    document.querySelector("#display=timestamp").textContent =
        formattedDate + " at " + formattedTime;

}
