const memberList = document.querySelector('#member-list');
const gridButton = document.querySelector('#grid');
const listButton = document.querySelector('#list');

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok)
            throw new Error(`Unable to load member data: ${response.status}`);
        }  

        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        memberList.innerHTML = `<p class="error">Sorry, the member directory could not be loaded.</p>`;
        console.error(error);
    }
}

function getMembershipName(level) {
    if (level === 3) return "Gold";
    if (level === 2) return "Silver";
    return "Member";
}

function displayMembers(members) {
    memberList.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement('article');
        card.className = "member-card";

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" width="180" height="120" loading="lazy">
            <div class="member-info">
                <h2>${member.name}</h2>
                <p class="category">${member.category}</p>
                <p>${member.description}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Membership:</strong> ${getMembershipName(member.membership)}</p >
                <a href="${member.website}" target="_blank" rel="noopener noreferrer"> Visit Website</a>
            </div>
        `;

        memberList.appendChild(card);
    });
}
    
gridButton.addEventListener('click', () => {
    memberList.classList.add('member-grid');
    memberList.classList.remove('member-list');
    gridButton.classList.add('active');
    listButton.classList.remove('active');
    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");
});

listButton.addEventListener('click', () => {
    memberList.classList.add('member-list');
    memberList.classList.remove('member-grid');
    listButton.classList.add('active');
    gridButton.classList.remove('active');
    listButton.setAttribute("aria-pressed", "true");
    gridButton.setAttribute("aria-pressed", "false");
});

getMembers();