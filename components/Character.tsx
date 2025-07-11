import { FunctionComponent } from "preact";
import { Character } from "../types.ts";

const CharacterInd: FunctionComponent<Character> = (props) => {
  return (
    <div class="container">
      <a href="/">Volver</a>
      <div class="character-detail">
        <img width="200" src={props.image} alt={props.name} />

        <div class="character-info">
          <h1 class="title">{props.name}</h1>

          <ul>
            <li>
              <strong>Status</strong>:{props.status}
            </li>
            <li>
              <strong>Species</strong>:{props.species}
            </li>
            <li>
              <strong>Gender</strong>:{props.gender}
            </li>
            <li>
              <strong>Origin</strong>:{props.origin.name}
            </li>
            <li>
              <strong>Location</strong>:{props.location.name}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharacterInd;
