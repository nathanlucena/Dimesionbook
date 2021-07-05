import React from "react";

type CharacterType = {
  id: number;
  name: string;
  avatar: string;
  status: string;
  gender: string;
  specie: string;
  location: string;
  origin: string;
  episode: string[];
};

interface ContextType {
  searchName: string;
  setSearchName: (e: string) => void;
  error404: boolean;
  setError404: (e: boolean) => void;
  listFollows: CharacterType[];
  setListFollows: (e: CharacterType[]) => void;
}

const listContext = React.createContext({} as ContextType);

export default listContext;
