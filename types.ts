export type CharacterListInfo = {
  id: number;
  name: string;
  image: string;
};

export type Characters = {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: number;
  };
  results: CharacterListInfo[];
};

export type Character = {
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  image: string;
};
