import { useContext, useEffect } from "react";
import styles from "./styles.module.scss";

import listContext from "../../contexts/listContext";
import { FollowCard } from "../FollowCard/FollowCard";

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

export function Follows() {
  const { listFollows } = useContext(listContext);

  useEffect(() => {}, [listFollows]);

  return (
    <div className={styles.folowsDiv}>
      <h1> Follows</h1>
      {listFollows.map((char: CharacterType, index) => (
        <div key={index} className={styles.card}>
          <FollowCard characterInfo={char} />
        </div>
      ))}
    </div>
  );
}
