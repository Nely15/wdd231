const memberList = document.querySelector('#member-list');
const memberList = document.querySelector('#grid');
const memberList = document.querySelector('#list');

async function getMembers() {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displayMembers(members);
}

function displayMembers(members) {
    members.forEach((member) => {
        const card = document.createElement('article');
        card.classList.add('member-card');

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" width="120" height="120" loading="lazy"
            <div>
                <h2>${member.name}</h2>
                <p>${member.category}</p>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p>Membership: ${member.membership === 3 ? 'Gold' : member.membership === 2 ? 'Silver' : 'Member'} </p >
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
});

listButton.addEventListener('click', () => {
    memberList.classList.add('member-list');
    memberList.classList.remove('member-grid');
    listButton.classList.add('active');
    gridButton.classList.remove('active');
});

getMembers();