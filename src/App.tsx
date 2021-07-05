import "./app.css";
import { useState } from "react";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Home } from "./pages/Home/Home";
import { Profile } from "./pages/Profile/Profile";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Follows } from "./components/Folows/Follows";
import listContext from "./contexts/listContext";
import { NotFound } from "./pages/NotFound/NotFound";

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

function App() {
  const [searchName, setSearchName] = useState<string>("");

  const [error404, setError404] = useState<boolean>(false);

  const [listFollows, setListFollows] = useState<CharacterType[]>([]);

  return (
    <div>
      <listContext.Provider
        value={{
          searchName,
          setSearchName,
          error404,
          setError404,
          listFollows,
          setListFollows,
        }}
      >
        <BrowserRouter>
          <SearchBar />
          <div className="a">
            <Switch>
              {/* HEADER FIXO NAS DUAS PAGINAS */}
              <Route path="/" exact component={Home} />
              <Route exact path="/character/:charId" component={Profile} />
              <Route component={NotFound} />
            </Switch>
            <Follows />
          </div>
        </BrowserRouter>
      </listContext.Provider>
    </div>
  );
}

export default App;
