import { FormEvent, useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import api from "../../services/api";
import portal from "../../assets/portal.png";
import { Link, useHistory } from "react-router-dom";

import listContext from "../../contexts/listContext";
import { Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

export function SearchBar() {
  const history = useHistory();
  const [character, setCharacter] = useState<string>("");
  const [listChar, setListchar] = useState<number>(0);
  const { setSearchName, setError404, error404 } = useContext(listContext);

  useEffect(() => {
    async function getCharacters() {
      try {
        setError404(false);
        const response = await api.get(`/?name=${character}`);
        const res = response.data;
        setListchar(res.results[0].id);
        setSearchName("?name=" + character);
      } catch (error) {
        setError404(true);
      }
    }

    getCharacters();
  }, [character, setError404, setSearchName]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    history.push(`/character/${listChar}`);
    if (!error404) {
      console.log("errado");
    } else {
      console.log("errado");
    }
  }

  return (
    <div className={styles.bodyDiv}>
      <div className={styles.navDiv}>
        <Link to={"/"} href="/">
          <img src={portal} alt="Logo" />
          <h1>Dimesionbook</h1>
        </Link>
        <div className={styles.inputDiv}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="character"
              onChange={(event) => setCharacter(event.target.value)}
              placeholder="search for a character..."
            />
            <Button type="onSubmit" size="sm">
              <FaSearch />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
