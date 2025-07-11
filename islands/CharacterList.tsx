import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Characters } from "../types.ts";

const CharactersList: FunctionComponent = () => {
  const [characters, setCharacters] = useState<Characters>();
  const [name, setName] = useState<string>("");
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character`,
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json: Characters = await response.json();
      setCharacters(json);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchCharactersByName = async (name: string) => {
    if (name !== "") {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?name=${name}`,
        );
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json: Characters = await response.json();
        setCharacters(json);
      } catch (error) {
        console.error(error.message);
      }
    } else {
      fetchCharacters();
    }
  };

  const fetchCharactersByPageNext = async (page: number) => {
    if (
      characters?.info.next !== null ||
      characters?.info.next <= characters.info.pages
    ) {
      setPage(page + 1);
    }
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${page}`,
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json: Characters = await response.json();
      setCharacters(json);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchCharactersByPagePrev = async (page: number) => {
    if (characters?.info.prev !== null || characters?.info.prev > 0) {
      setPage(page - 1);
    }

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${page}`,
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json: Characters = await response.json();
      setCharacters(json);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div class="container">
      <h1 class="title">
        Rick and Morty Characters
      </h1>
      <div class="search-form">
        <input
          class="search-input"
          type="text"
          placeholder="Nombre del personaje"
          value={name}
          onInput={(e) => {
            const newValue = e.currentTarget.value;
            setName(newValue);
          }}
        />

        <button type="button" onClick={() => fetchCharactersByName(name)}>
          Buscar
        </button>
      </div>
      <div class="characters">
        {characters?.results.map((c) => (
          <div key={c.id}>
            <a class="character-card" href={`character/${c.id}`}>
              <img src={c.image} alt={c.name} />
              <p>{c.name}</p>
            </a>
          </div>
        ))}
      </div>
      <div class="pagination">
        <button type="button" onClick={() => fetchCharactersByPagePrev(page)}>
          Anterior
        </button>
        <p>{page} / {characters?.info.pages}</p>
        <button type="button" onClick={() => fetchCharactersByPageNext(page)}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default CharactersList;
