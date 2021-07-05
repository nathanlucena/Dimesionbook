import { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import api from "../../services/api";
import listContext from "../../contexts/listContext";
import { Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { BiFemaleSign, BiMaleSign, BiQuestionMark } from "react-icons/bi";
import { FaCircle, FaPlus } from "react-icons/fa";

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

type idChar = {
  id: number;
};

export function CardHome({ id }: idChar) {
  const { setListFollows, listFollows } = useContext(listContext);
  const [loading, setLoading] = useState<boolean>(false);
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

  function handleStatus(status: string) {
    if (status === "Alive") {
      return <FaCircle color="#55CC44" fontSize="1em" />;
    } else if (status === "Dead") {
      return <FaCircle color="#D63D2E" fontSize="1em" />;
    } else {
      return <FaCircle color="#9E9E9E" fontSize="1em" />;
    }
  }

  function handleGender(gender: string) {
    if (gender === "Male") {
      return <BiMaleSign color="#009dff" fontSize="2em" />;
    } else if (gender === "Female") {
      return <BiFemaleSign color="#ff69b4" fontSize="2em" />;
    } else {
      return <BiQuestionMark color="#ffc200" fontSize="2em" />;
    }
  }

  useEffect(() => {
    async function getCharacter() {
      try {
        const response = await api.get(`/${id}`);
        const res = response.data;
        setCharInfo({
          id: res.id,
          name: res.name,
          avatar: res.image,
          status: res.status,
          gender: res.gender,
          specie: res.specie,
          location: res.location,
          origin: res.origin,
          episode: res.epsisode,
        });
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    }
    getCharacter();
  }, [id]);

  function addFollow() {
    if (!listFollows.includes(charInfo)) {
      const arrayTemp: CharacterType[] = listFollows.slice();
      arrayTemp.push(charInfo);
      setListFollows(arrayTemp);
    }
  }

  return (
    <div className={styles.card}>
      {loading ? (
        <>
          <Link to={`/character/${charInfo.id}`} className={styles.linkDiv}>
            <img
              src={charInfo.avatar}
              className={styles.avatarCircle}
              alt="Avatar"
            />
            <div className={styles.infos}>
              <div className={styles.infoSeparator}>
                <h1>{charInfo.name}</h1>
                {handleGender(charInfo.gender)}
              </div>
              <div className={styles.infoSeparator}>
                {handleStatus(charInfo.status)}
                <p>{charInfo.status}</p>
              </div>
            </div>
          </Link>
          <div className={styles.buttonDiv}>
            <Button size="lg" variant="secondary" onClick={() => addFollow()}>
              <FaPlus />
            </Button>
          </div>
        </>
      ) : (
        <Spinner animation="border" />
      )}
    </div>
  );
}
