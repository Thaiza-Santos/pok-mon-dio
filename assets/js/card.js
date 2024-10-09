// Espera 0,5 s para exibir os cards
setTimeout(() => { click() }, 500);

const b = document.querySelector('#loadMoreButton');
b.addEventListener('click', () => {
    setTimeout(() => { click() }, 500);
});

// Adiciona o evento de click nos cards
function click() {
    const card = document.querySelectorAll('li#pokemon');

    for (let i = 0; i < card.length; i++) {
        const li = card[i];
        const span = li.children[0];
        const number = span.textContent.split('#')[1];

        li.addEventListener('click', () => {
            sendpokemon(number);
        });
    }
}

// Envia o número do Pokémon para a função que busca os dados
function sendpokemon(number) {
    const url = `https://pokeapi.co/api/v2/pokemon/${number}`;
    fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => {
            openScrren(jsonBody);
        });
}

// Abre a tela com os dados do Pokémon
function openScrren(data) {
    const screen = document.querySelector('.card');

    function screenpokemon(pokemon) {
        return `
            <div class="cardpokemon">
                <div class="cardpokemonbox ${pokemon.types[0].type.name}">
                    <button class="cardpokemonbutton">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAB9UlEQVR4nLVWTWsVQRAcNNGfoR48eDQHk+j/UBEVjOYsBD8vXnwRPAYC+QExavwXSc7Ge4KiiSBE1OMyVQ0lZVZZX/Lm7eZpwcLuzk73dHV196ZUgKRjAC6SfAZgleSGLwCvSc4DmPY3JRuDDB/POd8BsAvgG4BlAPcj4oYvAA8AvKjXdnLOt72nlfGqqs6QfEdyKyIuSxorHGQsIq6S3Ca5WVXV6aJxAFMAvpJckDTeIeJxkosA9gBMDjy5jQO429ZwPwDM2cmBSMxfTctCGhEkF03XXznJOc+a8y60DKFrO+c805TirhPawcj50roTD+DTLwkDuGS5ldTShKTnkvY3F6IA8N2iSXXBLA/6uAlJ85K+SDqXhgDACsmnvnnjIvqXxg0AD13xjmAjIq6nAiQ9kfRZ0tnUEq54kut2sO6H/+DgJsk1h7Lq3jJsg6ReR4oeA3jZNcm9oyR5GsCPtkWmbjK98LvQdiLiShsHhqSJVEBEXAPw8c8h3M9d3pJOpBEh6STJDznnW/3NbtONalQHJJdIvj0wgNxi634+d1TjAO7ZhqRTpYGz50i60KV9WpaKA6cZSU3Xe3fFkrq85oSa85qWw09+yEYP/Rm33FpuK+4tjaH/yEVkeVstTmjrod/nyBKeItkD8Krx2+J7v5sc9tvyExJMl83mEYQIAAAAAElFTkSuQmCC">
                    </button>
                    <span class="cardnumber">#${pokemon.id}</span>
                    <p class="cardname">${pokemon.name}</p>

                    <div class="carddetail">
                        <img class="carddetailimg" src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
                        <p>Species: ${pokemon.species.name}</p>
                        <p>Height: ${pokemon.height / 10} m</p>
                        <p>Weight: ${pokemon.weight / 10} kg</p>
                        <p>Base Experience: ${pokemon.base_experience}</p>
                        <p id="gender">Gender: Loading...</p>
                    </div>
                </div>
            </div>
        `;
    }

    screen.innerHTML = screenpokemon(data);

    // Fetch species data for additional details like gender and egg groups
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

            // Update the gender on the card
            document.getElementById('gender').innerText = `Gender: ${genderPercentage}`;
        });

    const button = document.querySelector('.cardpokemonbutton');
    button.addEventListener('click', () => {
        const screenpokemon = document.querySelector('.cardpokemon');
        if (screenpokemon.parentNode) {
            screenpokemon.parentNode.removeChild(screenpokemon);
        }
    });
}
