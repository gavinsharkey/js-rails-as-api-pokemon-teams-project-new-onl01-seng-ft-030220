const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector('main')

const makePokemonLi = (pokemonData) => {
  return `<li>${pokemonData.nickname} (${pokemonData.species}) <button class="release" data-pokemon-id="${pokemonData.id}">Release</button></li>`
}

const listPokemon = (trainer) => {
  const pokemonList = trainer.pokemons.map(pokemon => makePokemonLi(pokemon))
  return pokemonList.join('')
}

const addTrainerToPage = (trainerData) => {
  for (let trainer of trainerData) {
    main.innerHTML += `
    <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
      <button class="add-pokemon" data-trainer-id="${trainer.id}">Add Pokemon</button>
      <ul>
        ${listPokemon(trainer)}
      </ul>
    </div>
    `
  }
}

const addPokemonToTrainer = (pokemonData) => {
  const trainerPokemonList = document.querySelector(`div[data-id="${pokemonData.trainer_id}"] ul`)
  trainerPokemonList.innerHTML += makePokemonLi(pokemonData)
}

const addPokemon = (trainerId) => {
  fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      trainer_id: trainerId
    })
  })
  .then(resp => resp.json())
  .then(json => {
    if (json.message) {
      alert(json.message)
    } else {
      addPokemonToTrainer(json)
    }
  })
}

const removePokemon = (pokemonData) => {
  const pokemon = document.querySelector(`button[data-pokemon-id="${pokemonData.id}"]`).parentElement
  pokemon.remove()
}

const deletePokemon = (pokemonId) => {
  fetch(`${POKEMONS_URL}/${pokemonId}`, {
    method: 'DELETE'
  })
  .then(resp => resp.json())
  .then(json => removePokemon(json))
}

main.addEventListener('click', (e) => {
  if (e.target.className === 'add-pokemon') {
    addPokemon(e.target.dataset.trainerId)
  } else if (e.target.className === 'release') {
    deletePokemon(e.target.dataset.pokemonId)
  }
})

fetch(TRAINERS_URL)
.then(resp => resp.json())
.then(json => addTrainerToPage(json))


