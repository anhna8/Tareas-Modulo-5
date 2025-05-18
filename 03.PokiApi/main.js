const BASE_URL = "https://pokeapi.co/api/v2/";

const container = document.getElementById("characters-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentPage = 1;
let totalPages = 1;

async function getCharacters(page = 1){
    try{
        const response = await fetch(`${BASE_URL}pokemon?offset=${(page-1)*20}&limit=20`);
        if(!response.ok) throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        
        const data = await response.json();
        totalPages = Math.ceil(data.count / 20);

        renderCharacters(data.results);

        updateButtons();
    }catch(error){
        container.innerHTML = `<p>Error we could not find character: ${error.message}</p>`;
    }
}

async function renderCharacters(characters) {
    container.innerHTML = "";

    for (const p of characters) {
        try {
            const response = await fetch(p.url);
            if (!response.ok) throw new Error("Error , we did not get that data");

            const details = await response.json();
            
            const speciesResponse = await fetch(details.species.url);
            const speciesDetails = await speciesResponse.json();

        
            const types = details.types.map(typeInfo => typeInfo.type.name).join(", ");

            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <img class="character-image" src="${details.sprites.front_default}" alt="${details.name}"/>
                <p style="font-size: 1.2rem;"> Name: ${details.name}</p>
                <p style="font-size: 1.2rem;"> Type: ${types}</p>
                <p style="font-size: 1.2rem;"> Habitat: ${speciesDetails.habitat ? speciesDetails.habitat.name : "Unknown"}</p>
            `;

            container.appendChild(card);
        } catch (error) {
            console.error("We couldn't retrieve the Pokemon", error);
        }
    }
}


function updateButtons(){
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

prevBtn.addEventListener('click', () => {
    if(currentPage > 1){
        currentPage--;
        getCharacters(currentPage);
    }
})

nextBtn.addEventListener('click', () => {
    if(currentPage < totalPages){
        currentPage++;
        getCharacters(currentPage);

        }
})

getCharacters();

