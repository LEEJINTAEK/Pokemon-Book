import { useEffect, useState } from "react";
import "./App.css";
import axios, { all } from "axios";
import PokeCard from "./components/PokeCard.jsx";
import { useDebounsed } from "./hooks/useDebounsed.js";
import AutoComplete from "./components/AutoComplete.jsx";

function App() {
  //모든 포켓몬 데이터
  const [allPokemon, setAllPokemon] = useState([]);
  //실제 보여주는 포켓몬 데이터
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  //화면에 보여주는 최대 수
  const limitNum = 20;
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=1008&offset=0`;

  // const debounsedSearchTerm = useDebounsed(searchTerm, 500);

  useEffect(() => {
    fetchPokeData();
  }, []);

  // useEffect(() => {
  //   handleSearchInput(debounsedSearchTerm);
  // }, [debounsedSearchTerm]);

  const filterDisplayedPokemonData = (
    allPokemonData,
    displayedPokemonData = []
  ) => {
    const limit = displayedPokemonData.length + limitNum;

    const arr = allPokemonData.filter((_, i) => i + 1 <= limit);
    return arr;
  };

  const fetchPokeData = async () => {
    try {
      const response = await axios.get(url);

      setAllPokemon(response.data.results);

      setDisplayedPokemon(filterDisplayedPokemonData(response.data.results));
    } catch (error) {
      console.error(error);
    }
  };

  // const handleSearchInput = async (searchTerm) => {
  //   if (searchTerm.length > 0) {
  //     try {
  //       const response = await axios.get(
  //         `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
  //       );
  //       const pokemonData = {
  //         url: `https://pokeapi.co/api/v2/pokemon/${response.data.id}`,
  //         name: searchTerm,
  //       };
  //       displayedPokemon([pokemonData]);
  //     } catch (error) {
  //       displayedPokemon([]);
  //       console.error(error);
  //     }
  //   } else {
  //     fetchPokeData(true);
  //   }
  // };

  return (
    <article className="pt-6">
      <header className="flex flex-col gap-2 w-full px-4 z-50">
        <AutoComplete
          allPokemon={allPokemon}
          setDisplayedPokemon={setDisplayedPokemon}
        />
      </header>
      <section className="pt-6 flex flex-col justify-center items-center overflow-auto z-0">
        <div
          className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2
         max-w-4xl"
        >
          {displayedPokemon.length > 0 ? (
            displayedPokemon.map(({ url, name }) => (
              <PokeCard key={url} url={url} name={name} />
            ))
          ) : (
            <h2 className="font-medium text-lg text-slate-900 mb-1">
              포켓몬이 없어요
            </h2>
          )}
        </div>
      </section>
      <div className="text-center">
        {allPokemon.length > displayedPokemon.length &&
          displayedPokemon.length !== -1 && (
            <button
              onClick={() =>
                setDisplayedPokemon(
                  filterDisplayedPokemonData(allPokemon, displayedPokemon)
                )
              }
              className="bg-slate-800 px-6 py-2 my-4 text-base rounded-lg font-bold text-white"
            >
              더보기
            </button>
          )}
      </div>
    </article>
  );
}

export default App;
