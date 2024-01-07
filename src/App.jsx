import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import PokeCard from "./components/PokeCard.jsx";

function App() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetchPokeData();
  }, []);
  const url = "https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0"; //0~1008개

  const fetchPokeData = async () => {
    try {
      const response = await axios.get(url);
      setPokemon(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article className="pt-6">
      <header className="flex flex-col gap-2 w-full px-4 z-50">
        input Form
      </header>
      <section className="pt-6 flex flex-col justify-center items-center overflow-auto z-0">
        <div
          className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2
         max-w-4xl"
        >
          {pokemon.length > 0 ? (
            pokemon.map(({ url, name }) => (
              <PokeCard key={url} url={url} name={name} />
            ))
          ) : (
            <h2 className="font-medium text-lg text-slate-900 mb-1">
              포켓몬이 없어요
            </h2>
          )}
        </div>
      </section>
    </article>
  );
}

export default App;