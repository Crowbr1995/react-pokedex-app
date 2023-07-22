import React, { useEffect, useState } from "react";

import { capitalizeLetter, formatIdxNum } from '../../utils';

import Type from '../../components/Type';


export default function Evolution({ pokemonName, pokemon, setPokemonData }) {
  const [evolutionChain, setEvolutionChain] = useState([]);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`);
        const data = await response.json();

        const evolutionUrl = data.evolution_chain.url;
        const evolutionResponse = await fetch(evolutionUrl);
        const evolutionData = await evolutionResponse.json();

        const chain = parseEvolutionChain(evolutionData.chain);
        setEvolutionChain(chain);
      } catch (error) {
        console.log("Error fetching evolution chain:", error);
      }
    };

    fetchEvolutionChain();
  }, [pokemonName]);

  const parseEvolutionChain = (evolutionData) => {
    const chain = [];
    parseEvolutionData(evolutionData, chain);
    return chain;
  };

  const parseEvolutionData = (evolutionData, chain, isFirstEvolution = true) => {
    const name = evolutionData.species.name;
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolutionData.species.url.split("/").slice(-2, -1)}.png`;

    let evolutionMethod = null;
    let evolutionLevel = null;
    let evolutionItem = null;

    evolutionData.evolution_details.forEach((detail) => {
      if (detail.trigger.name === "level-up") {
        if (name === "espeon" || name === "umbreon") {
          evolutionMethod = "Level up with Friendship";
          if (name === "espeon") {
            evolutionMethod += " during Daytime"
          } else if (name === "umbreon") {
            evolutionMethod += " during Nighttime"
          }
        } else {
          evolutionMethod = "Level:";
          evolutionLevel = detail.min_level;
        }
      } else if (detail.trigger.name === "use-item") {
        evolutionMethod = "Use Item:";
        evolutionItem = detail.item.name;
      } else if (detail.trigger.name === "trade") {
        evolutionMethod = "Trade with another Pokémon";
      } else if (detail.trigger.name === "use-item-while-holding") {
        evolutionMethod = "Level up while holding item";
        evolutionItem = detail.item.name;
      } else if (detail.trigger.name === "shed") {
        evolutionMethod = "Shed";
        evolutionLevel = detail.min_level;
      } else {
        evolutionMethod = detail.trigger.name;
      }
    });

    chain.push({ name, imageUrl, evolutionMethod, evolutionLevel, evolutionItem });

    if (evolutionData.evolves_to.length > 0) {
      evolutionData.evolves_to.forEach((evolvesTo) => {
        parseEvolutionData(evolvesTo, chain, false);
      });
    }
  };
 
  return (
    <div>
      <h2 className="title">Evolution Chain for {capitalizeLetter(pokemon.name)}</h2>
      <div className="evolution-container">
        {evolutionChain.map((pokemonData, index) => (
          <div className="evolution-data" key={index} onClick={() => (setPokemonData(pokemonData.name))}>
            {pokemonData.evolutionMethod && (
              <div className="evolution-method">
                {" "}
                {pokemonData.evolutionMethod}
                {pokemonData.evolutionLevel && (
                  <span> {pokemonData.evolutionLevel}</span>
                )}
                {pokemonData.evolutionItem && (
                  <div> {capitalizeLetter(pokemonData.evolutionItem)}</div>
                )}
                <div className="evo-arrow"></div>
              </div>
            )}
            <div className="evolution-pokemon"> 
              <img src={pokemonData.imageUrl} alt={pokemonData.name} />
              <span>{capitalizeLetter(pokemonData.name)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
