const giftGrid = document.querySelector("#gift-grid");
const giftCount = document.querySelector("#gift-count");
const giftMessage = document.querySelector("#gift-message");

const occasionFilter = document.querySelector("#occasion-filter");
const recipientFilter = document.querySelector("#recipient-filter");
const budgetFilter = document.querySelector("#budget-filter");
const clearFilters = document.querySelector("#clear-filters");

let gifts = [];


async function getGifts() {

    try {

        const response = await fetch("data/gifts.json");

        if (!response.ok) {
            throw new Error(`Unable to load gift data: ${response.status}`);
        }

        gifts = await response.json();

        displayGifts(gifts);

    } catch (error) {

        console.error("Gift data error:", error);

        giftCount.textContent = "Gift ideas unavailable";

        giftMessage.textContent =
            "We are unable to load our gift ideas right now. Please try again later.";

    }
}


function displayGifts(giftList) {

    giftGrid.innerHTML = "";

    giftMessage.textContent = "";

    giftCount.textContent =
        `${giftList.length} ${giftList.length === 1 ? "Gift Idea" : "Gift Ideas"}`;

    if (giftList.length === 0) {

        giftMessage.textContent =
            "No gifts match those filters. Try changing your selections.";

        return;
    }

    giftList.forEach((gift) => {

        const card = document.createElement("article");

        card.classList.add("gift-card");

        card.innerHTML = `
            <img
                src="${gift.image}"
                alt="${gift.name}"
                loading="lazy"
            >

            <div class="gift-card-content">

                <h3>${gift.name}</h3>

                <p>${gift.description}</p>

                <p>
                    <strong>For:</strong> ${gift.recipient}
                </p>

                <p>
                    <strong>Occasion:</strong> ${gift.occasion}
                </p>

                <p class="gift-price">
                    $${gift.price}
                </p>

                <button
                    type="button"
                    class="button gift-details"
                    data-id="${gift.id}"
                >
                    View Details
                </button>

            </div>
        `;

        giftGrid.appendChild(card);
    });
}


function filterGifts() {

    const selectedOccasion = occasionFilter.value;
    const selectedRecipient = recipientFilter.value;
    const selectedBudget = budgetFilter.value;

    const filteredGifts = gifts.filter((gift) => {

        const matchesOccasion =
            selectedOccasion === "all" ||
            gift.occasion === selectedOccasion;

        const matchesRecipient =
            selectedRecipient === "all" ||
            gift.recipient === selectedRecipient;

        const matchesBudget =
            selectedBudget === "all" ||
            gift.price <= Number(selectedBudget);

        return matchesOccasion && matchesRecipient && matchesBudget;
    });

    displayGifts(filteredGifts);
}


occasionFilter.addEventListener("change", filterGifts);
recipientFilter.addEventListener("change", filterGifts);
budgetFilter.addEventListener("change", filterGifts);


clearFilters.addEventListener("click", () => {

    occasionFilter.value = "all";
    recipientFilter.value = "all";
    budgetFilter.value = "all";

    displayGifts(gifts);
});


getGifts();