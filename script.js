const searchBtn = document.querySelector("#search")
const searchInput = document.querySelector("#pokemonName")
const pokemonBox = document.querySelector(".pokemonBox")
let pokemonType = [] // Stores Pokemon's type(s)

// button event to search PokeAPI
searchBtn.addEventListener("click", getPokemon)

// Allows Enter to be used in search input to trigger button event
searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        document.getElementById("search").click()
    }
})

// Capitalizes first letter of inputted string
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

// Converts string to lower case
function lowerCase(str) {
    return str.toLowerCase()
}

// Pushes the searched Pokemon's type(s) into the pokemonType array
function pushTypes(arr) {
    for (let i = 0; i < arr.types.length; i++) {
        pokemonType.push(arr.types[i].type.name)
    }
}

// Displays each element currently in the pokemonType array as li elements
function displayTypes(arr) {
    if (arr[1]) {
        return `<li class="${arr[0]}">${capitalizeFirstLetter(arr[0])}</li>
                <li class="${arr[1]}">${capitalizeFirstLetter(arr[1])}</li>`
    } else {
        return `<li class="${arr[0]}">${capitalizeFirstLetter(arr[0])}</li>`
    }
}

function getPokemon(e) {
    pokemonType = [] // Clears pokemonType array
    const name = document.getElementById("pokemonName").value
    const pokemonName = lowerCase(name)

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => response.json())
        .then((data) => {
            pushTypes(data)
            pokemonBox.innerHTML = `
                <h1>${capitalizeFirstLetter(data.name)}</h1>
                <div class="pokemon-info">
                    <table>
                        <tr>
                            <th>HP:</th>
                            <th>${data.stats[0].base_stat}</th>
                        </tr>
                        <tr>
                            <th>Attack:</th>
                            <th>${data.stats[1].base_stat}</th>
                        </tr>
                        <tr>
                            <th>Defense:</th>
                            <th>${data.stats[2].base_stat}</th>
                        </tr>
                        <tr>
                            <th>Special Attack:</th>
                            <th>${data.stats[3].base_stat}</th>
                        </tr>
                        <tr>
                            <th>Special Defense:</th>
                            <th>${data.stats[4].base_stat}</th>
                        </tr>
                        <tr>
                            <th>Speed:</th>
                            <th>${data.stats[5].base_stat}</th>
                        </tr>
                        <tr>
                            <th>BST:</th>
                            <th>${data.stats[0].base_stat + data.stats[1].base_stat + data.stats[2].base_stat
                            + data.stats[3].base_stat + data.stats[4].base_stat + data.stats[5].base_stat}</th>
                        </tr>
                    </table>

                    <img 
                    src="${data.sprites.other["official-artwork"].front_default}"
                    alt="Image of ${capitalizeFirstLetter(data.name)}">

                    <div class="num-type">
                        <p><b>Pokédex # ${data.id}</b></p>
                        
                        <ul class="types-list">${displayTypes(pokemonType)}</ul>
                    </div>

                </div>
            `
    })
    .catch((err) => {
        pokemonBox.innerHTML = `<h1>Pokémon Not Found :(</h1>
        <p>Maybe double check spelling?</p>`
        console.log(err)
    })

    e.preventDefault();
}