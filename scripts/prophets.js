const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {

    const response = await fetch(url);
    const data = await response.json();

    // console.table(data.prophets);
    displayProphets(data.prophets);

}

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {

        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let portrait = document.createElement('img');
        let birthdate = document.createElement('p');
        let death = document.createElement('p');
        let birthplace = document.createElement('p');
        let children = document.createElement('p');
        let years = document.createElement('p');


        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        birthdate.textContent = `Birthdate: ${prophet.birthdate}`;
        death.textContent = `Death: ${prophet.death || "Present"}`;
        birthplace.textContent = `Birthplace: ${prophet.birthplace}`;
        children.textContent = `Children: ${prophet.numofchildren}`;
        years.textContent = `Years as Prophet: ${prophet.length}`;

        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');
        
        card.appendChild(fullName);
        card.appendChild(portrait);
        card.appendChild(birthdate);
        card.appendChild(death);
        card.appendChild(birthplace);
        card.appendChild(children);
        card.appendChild(years);

        cards.appendChild(card);
                 

    });

};

getProphetData();