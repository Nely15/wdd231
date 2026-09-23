const spotlightList = document.querySelector("#spotlight-list");

async function getSpotlight() {
    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {

            throw new Error(`Unable to loaad member data: ${response.status}`);

        }

        const members = await response.json();

        const eligibleMembers = members.filter(member =>
            member.membership === 2 || member.membership === 3
        );

        eligibleMembers.sort(() => 0.5 - Math.random());

        const selectedMembers = eligibleMembers.slice(0,3);

        displaySpotlights(selectedMembers);
        
    } catch (error) {

        console.error("Error loading spotlights:", error);
        spotlightList.innerHTML = "<p>Sorry,the business spotlights could not be loaded.</p>";

    }

}

function displaySpotlights(members)  {
    spotlightList.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("article");

        card.classList.add("spotlight-card");

        card.innerHTML =`
        <img src="images/${member.image}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p>${member.phone}</p>
        <p>Membership: ${getMembershipLevel(member.membership)}</p>
        <a href="${member.website}" target="blank" rel="noopener"> Visit Website </a>
        
        `;
        spotlightList.appendChild(card);

    });

}

function getMembershipLevel(membership) {

        if (membership === 3) {
            return "Gold";
        } else if (membership === 2) {
            return "Silver";
        } else {
            return "Member";
        }
    }

    getSpotlights();
