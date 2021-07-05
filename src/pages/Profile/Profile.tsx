import { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import api from "../../services/api";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  ListGroup,
  ListGroupItem,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
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

type EpisodeType = {
  id: number;
  name: string;
};

type paramType = {
  charId: string;
};

export function Profile() {
  const { setListFollows, listFollows } = useContext(listContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [episode, setEpisode] = useState<EpisodeType>({
    id: 0,
    name: "",
  });
  const { charId }: paramType = useParams();
  const [character, setCharacter] = useState<CharacterType>({
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
    async function getCharacters() {
      try {
        const response = await api.get(`/${charId}`);
        const res = response.data;
        setCharacter({
          id: res.id,
          name: res.name,
          avatar: res.image,
          status: res.status,
          gender: res.gender,
          specie: res.species,
          location: res.location.name,
          origin: res.origin.name,
          episode: res.episode,
        });
        setLoading(true);
      } catch (error) {
        console.error();
      }
    }
    getCharacters();
  }, [charId]);

  useEffect(() => {
    async function getEpisode() {
      try {
        const response = await axios.get(character.episode[1]);
        setEpisode({
          id: response.data.id,
          name: response.data.name,
        });
      } catch (error) {
        console.log(error);
      }
    }
    getEpisode();
  }, [character]);

  function addFollow() {
    if (!listFollows.includes(character)) {
      const arrayTemp: CharacterType[] = listFollows.slice();
      arrayTemp.push(character);
      setListFollows(arrayTemp);
    }
  }

  return (
    <div className={styles.profilePage}>
      {loading ? (
        <Card style={{ width: "25rem", border: "2px solid #000" }}>
          <Card.Img variant="top" src={character.avatar} />
          <Card.Body>
            <Card.Title>
              <h2>{character.name}</h2>
            </Card.Title>
            <Card.Text>
              First appearance in: {`${episode.name}`} <br />
              Last seen in: {`${character.location}`} <br />
              Original from: {`${character.origin}`}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <strong>Specie: </strong>
              {`${character.specie}`}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Status: </strong>
              {`${character.status}`}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Gender: </strong> {`${character.gender}`}
            </ListGroupItem>
          </ListGroup>
          <Card.Body>
            <div className={styles.returnDiv}>
              <Link to={"/"}>Return</Link>
              <div className={styles.buttonDiv}>
                <Button size="lg" onClick={() => addFollow()}>
                  <FaPlus />
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <Spinner animation="border" />
      )}
    </div>
  );
}
