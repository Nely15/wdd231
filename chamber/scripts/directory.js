const memberList = document.querySelector("#member-list");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`Unable to load member data: ${response.status}`);
        }  

        const members = await response.json();

        displayMembers(members);

    } catch (error) {
        console.error("Error loading members:", error);
        memberList.innerHTML = "<p>Sorry, the member directory could not be loaded.</p>";
    }
}

function getMembershipName(level) {
    if (level === 3) {
        return "Gold";

    } else if (level === 2) {
        return "Silver";

    } else {
    return "Member";

    }
}

function displayMembers(members) {
    memberList.innerHTML = "";

    members.forEach((member, index) => {
        const card = document.createElement("article");
        card.className = "member-card";

        const imageLoading = index === 0
            ? 'fetchpriority="high"'
            : 'loading="lazy"';

        card.innerHTML = `
            <img src="images/${member.image}" 
            alt="${member.name} logo" 
            width="180" 
            height="120" 
            ${imageLoading}
            >

            <div class="member-info">
                <h2>${member.name}</h2>
                <p class="category">${member.category}</p>
                <p class="description">${member.description}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Membership:</strong> ${getMembershipName(member.membership)}</p>
                <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
            </div>
        `;

        memberList.appendChild(card);
    });
}
function setView(view) {
    const isGrid = view === "grid";
    
    memberList.classList.toggle('member-grid', isGrid);
    memberList.classList.toggle('member-list', !isGrid);

    gridButton.classList.toggle('active', isGrid);
    listButton.classList.toggle('active', !isGrid);

    gridButton.setAttribute("aria-pressed", isGrid);
    listButton.setAttribute("aria-pressed", !isGrid);
}
    
gridButton.addEventListener("click", () => setView("grid")); 
   
listButton.addEventListener("click", () => setView("list"));  

getMembers();