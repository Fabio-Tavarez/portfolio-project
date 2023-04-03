/* <figure>
<a href="main.html">
<img>
</a>
</figure>
<div>
    <p></p> id number
    <h5></h5> name
    <div></div> types
    <div></div> types
</div> */

const base_URL = "https://pokeapi.co/api/v2/pokedex/1/";
//const second_URL = "https://pokeapi.co/api/v2/pokemon/";
const main_URL = "https://pokeapi.co/api/v2/pokemon?limit=1010&offset=0";

const form = document.querySelector("form");

fetch(main_URL)
  .then((response) => response.json())
  .then((data) => {
    //console.log(getURL(data));
    getURL(data).forEach((element) => {
      fetch(element)
        .then((result) => result.json())
        .then(
          (result) => pokemonInfo(result)
          //console.log(result.types[1].type.name)
        )
        .catch((error) => console.log(error));
    });
  })
  .catch((error) => console.log(error));

//data.pokemon_entries[0].entry_number
//data.pokemon_entries[0].pokemon_species.name/url
//data.results[0].name 1009

form.addEventListener("submit", (event) => {
   event.preventDefault()
   if (typeof event.target.searchbar.value === "string") {
    //console.log(event.target.searchbar.value);
   console.log(document.querySelector("article`.${event.target.searchbar.value}`"))
    //document.querySelector("article.`${event.target.searchbar.value}`");
   }
})

function getURL(data) {
  return data.results.map((element) => element.url);
}

function pokemonInfo(result) {
  let article = document.createElement("article");
  article.classList.add(`${result.name}`);
  article.classList.add("card");

  let img = document.createElement("img");
  img.setAttribute(
    "src",
    `${result.sprites.other["official-artwork"].front_default}`
  );

  let div = document.createElement("div");
  div.classList.add("info");

  let pTag = document.createElement("p");
  pTag.textContent = `#${result.id}`;

  let h5 = document.createElement("h5");
  h5.textContent = result.name.toUpperCase();

  let spanTag1 = document.createElement("span");
  spanTag1.classList.add(`${result.types[0].type.name}`);
  spanTag1.textContent = result.types[0].type.name.toUpperCase();

  //   let spanTag2 = document.createElement("span");
  //   spanTag2.classList.add(`${result.types[1].type.name}`);
  //   spanTag2.textContent = result.types[1].type.name;

  div.append(img, pTag, h5, spanTag1);

  if (typeof result.types[1].type.name !== "undefined") {
    let spanTag2 = document.createElement("span");
    spanTag2.classList.add(`${result.types[1].type.name}`);
    spanTag2.textContent = result.types[1].type.name.toUpperCase();

    div.append(spanTag2)
  }

  
  article.append(div);

  let container = document.querySelector(".container");
  container.append(article);
}



// function getName(data) {
//   let result = data;
//   //console.log(result.pokemon_entries[0]);

//   result.pokemon_entries.forEach((element) => {
//     return element.pokemon_species.name;
//   });
// }

// function getID(data) {
//   let result = data;

//   result.pokemon_entries.forEach((element) => {
//     return element.entry_number;
//   });
// }
