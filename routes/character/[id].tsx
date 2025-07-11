import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import CharacterInd from "../../components/Character.tsx";
import { Character } from "../../types.ts";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Character>) => {
    const id = ctx.params.id;

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`,
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();

      const name = json.name;
      const status = json.status;
      const species = json.species;
      const gender = json.gender;
      const origin = json.origin;
      const location = json.location;
      const image = json.image;

      const character: Character = {
        name,
        status,
        species,
        gender,
        origin,
        location,
        image,
      };
      return ctx.render(character);
    } catch (error) {
      console.error(error.message);
    }
  },
};

const Page = (props: PageProps<Character>) => {
  return (
    <CharacterInd
      name={props.data.name}
      status={props.data.status}
      species={props.data.species}
      gender={props.data.gender}
      origin={props.data.origin}
      location={props.data.location}
      image={props.data.image}
    />
  );
};

export default Page;
