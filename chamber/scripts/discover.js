import { discoverItems } from "../data/discover.mjs";
const discoverGrid = document.querySelector("#discover-grid");
const visitMessage = document.querySelector("#visit-message");

discoverItems.forEach((item) => {

    const card = document.createElement("article");
    card.classList.add("discover-card");

    card.innerHTML = `
        <h2>${item.name}</h2>

        <figure>
            <img
                src="${item.image}"
                alt="${item.alt}"
                width="300"
                height="200"
                loading="lazy">
        </figure>

        <address>${item.address}</address>

        <p>${item.description}</p>

        <a
            class="learn-more"
            href="${item.url}"
            target="_blank"
            rel="noopener">
            Learn More About ${item.name}
        </a>
    `;

    discoverGrid.appendChild(card);
});

/* Visitor Message */

const lastVisit = localStorage.getItem("lastVisit");
const currentVisit = Date.now();

if (!lastVisit) {

    visitMessage.textContent =
        "Welcome! Let us know if you have any questions.";

} else {

    const timeDifference = currentVisit - Number(lastVisit);

    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const daysSinceVisit = Math.floor(timeDifference / millisecondsInDay);

    if (daysSinceVisit < 1) {

        visitMessage.textContent =
            "Back so soon! Awesome!";

    } else {

        const dayWord = daysSinceVisit === 1 ? "day" : "days";

        visitMessage.textContent =
            `You last visited ${daysSinceVisit} ${dayWord} ago.`;
    }
}

localStorage.setItem("lastVisit", currentVisit);