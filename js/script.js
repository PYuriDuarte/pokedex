
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImg = document.querySelector('.pokemon');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.bnt-prev');
const buttonNext = document.querySelector('.bnt-next');
const type1 = document.querySelector('.type1');
const type2 = document.querySelector('.type2');
const pokemonImgStatic = document.querySelector('.pokemon_static');



let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if(APIResponse.status == 200){
    const data = await APIResponse.json();
    return data;
  }   
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Carregando...';
  pokemonNumber.innerHTML = '';
  type1.innerHTML = '';
  type2.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if(data){
    pokemonImg.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    type1.innerHTML = data['types']['0']['type']['name'];
    //type2.innerHTML = data['types']['1']['type']['name'];
    pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pokemonImgStatic.src = data['sprites']['versions']['generation-v']['black-white']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else{
    pokemonImg.style.display = 'none';
    pokemonName.innerHTML = 'Não registrado :c';
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (e) =>{
  e.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () =>{
  if(searchPokemon > 1){
    searchPokemon--
    renderPokemon(searchPokemon);
  }
  
});

buttonNext.addEventListener('click', () =>{
  searchPokemon++
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);












