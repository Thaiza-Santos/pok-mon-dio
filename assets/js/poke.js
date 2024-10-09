// Fetch list of Pokémon and display as cards
function fetchPokemonList() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const pokemonList = document.getElementById('pokemon-list');
            data.results.forEach(pokemon => {
                const pokemonCard = document.createElement('div');
                pokemonCard.classList.add('pokemon-card');
                pokemonCard.innerHTML = `<h3>${pokemon.name}</h3>`;
                pokemonList.appendChild(pokemonCard);
                
                // Add click event to each card to fetch and display details
                pokemonCard.addEventListener('click', () => {
                    fetchPokemonDetails(pokemon.url);
                });
            });
        });
}

// Fetch Pokémon details when a card is clicked
function fetchPokemonDetails(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('pokemon-name').innerText = data.name;
            document.getElementById('pokemon-image').src = data.sprites.other.dream_world.front_default;
            document.getElementById('pokemon-species').innerText = `Species: ${data.species.name}`;
            document.getElementById('pokemon-height').innerText = `Height: ${data.height / 10} m`;
            document.getElementById('pokemon-weight').innerText = `Weight: ${data.weight / 10} kg`;
            document.getElementById('pokemon-abilities').innerText = `Abilities: ${data.abilities.map(ability => ability.ability.name).join(', ')}`;
            
            // Fetch species details for gender and breeding info
            fetch(data.species.url)
                .then(response => response.json())
                .then(speciesData => {
                    const genderRate = speciesData.gender_rate;
                    let genderPercentage;
                    if (genderRate === -1) {
                        genderPercentage = 'Genderless';
                    } else {
                        const femalePercentage = (genderRate / 8) * 100;
                        const malePercentage = 100 - femalePercentage;
                        genderPercentage = `Male: ${malePercentage}%, Female: ${femalePercentage}%`;
                    }
                    document.getElementById('pokemon-gender').innerText = `Gender: ${genderPercentage}`;
                    document.getElementById('pokemon-egg-groups').innerText = `Egg Groups: ${speciesData.egg_groups.map(group => group.name).join(', ')}`;
                    document.getElementById('pokemon-egg-cycles').innerText = `Egg Cycles: ${speciesData.hatch_counter}`;
                });
        });
}

// Initialize app
fetchPokemonList();