import { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";

import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaMinus } from "react-icons/fa";
import listContext from "../../contexts/listContext";

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

type FollowCardProps = {
  characterInfo: CharacterType;
};

export function FollowCard({ characterInfo }: FollowCardProps) {
  const { listFollows, setListFollows } = useContext(listContext);
  const [charInfo, setCharInfo] = useState<CharacterType>({
    id: 0,
    name: "",
    avatar: "",
    status: "",
    gender: "",
    specie: "",
    location: "",
    origin: "",
    episode: [],
  });

  useEffect(() => {
    setCharInfo({
      id: characterInfo.id,
      name: characterInfo.name,
      avatar: characterInfo.avatar,
      status: characterInfo.status,
      gender: characterInfo.gender,
      specie: characterInfo.specie,
      location: characterInfo.location,
      origin: characterInfo.origin,
      episode: characterInfo.episode,
    });
  }, [characterInfo, listFollows]);

  function removeFollow(id: number) {
    const arrayTemp: CharacterType[] = listFollows.slice();
    for (let i = 0; i < arrayTemp.length; i++) {
      if (arrayTemp[i].id === id) {
        arrayTemp.splice(i, 1);
      }
    }
    setListFollows(arrayTemp);
    console.log(listFollows);
  }

  return (
    <div className={styles.followCard}>
      <>
        <Link to={`/character/${charInfo.id}`} className={styles.linkDiv}>
          <img
            src={charInfo.avatar}
            className={styles.avatarCircle}
            alt="Avatar"
          />
          <h1>{charInfo.name}</h1>
        </Link>
        <div className={styles.buttonDiv}>
          <Button variant="danger" onClick={() => removeFollow(charInfo.id)}>
            <FaMinus />
          </Button>
        </div>
      </>
    </div>
  );
}
