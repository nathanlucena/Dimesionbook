import "./app.css";
import { useState } from "react";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Home } from "./pages/Home/Home";
import { Profile } from "./pages/Profile/Profile";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Folows } from "./components/Folows/Folows";

// type ObgType = {
//   name: string;
//   url: string;
// };

// type Character = {
//   id: number;
//   name: string;
//   avatar: string;
//   status: string;
//   gender: string;
//   specie: string;
//   location: ObgType;
//   origin: ObgType;
//   episode: string[];
// };

function App() {
  const [searchName, setSearchName] = useState<string>("teste");

  return (
    <div>
      <SearchBar />
      <div className="a">
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route exact path="/:character" component={Profile} />
          </Switch>
        </BrowserRouter>
        <Folows />
      </div>
    </div>
  );
}

export default App;
