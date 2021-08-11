import { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import api from "../../services/api";
import listContext from "../../contexts/listContext";
import { CardHome } from "../../components/Card/CardHome";
import { Alert, Button } from "react-bootstrap";

type infoType = {
  count: number;
  pages: number;
  next: string;
  prev: string;
};

export function Home() {
  const { searchName, error404 } = useContext(listContext);
  const [listId, setListId] = useState<number[]>([]);

  const [nextButton, setNextButton] = useState<boolean>(false);
  const [prevButton, setPrevButton] = useState<boolean>(false);
  const [searchURL, setSearchURL] = useState<string>("1");
  const [info, setInfo] = useState<infoType>({
    count: 0,
    pages: 0,
    next: "",
    prev: "",
  });

  useEffect(() => {
    setSearchURL(searchName);
  }, [searchName]);

  async function nextPage() {
    if (info.pages > 1) {
      try {
        const responseNext = await api.get(`/${searchURL}`);
        setSearchURL(responseNext.data.info.next.split("character/")[1]);
        console.log(responseNext.data.info.next.split("character/")[1]);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function prevPage() {
    if (info.pages > 1) {
      try {
        const responseNext = await api.get(`/${searchURL}`);

        setSearchURL(responseNext.data.info.prev.split("character/")[1]);
        console.log(responseNext.data.info.prev.split("character/")[1]);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    async function getCharacters() {
      try {
        if (!error404) {
          const response = await api.get(`/${searchURL}`);
          const res = response.data;
          res.info.next !== null ? setNextButton(true) : setNextButton(false);
          res.info.prev !== null ? setPrevButton(true) : setPrevButton(false);
          const tempList: number[] = [];
          setInfo({
            count: res.info.count,
            pages: res.info.pages,
            next: res.info.next,
            prev: res.info.prev,
          });
          for (let i = 0; i < res.results.length; i++) {
            tempList.push(res.results[i].id);
          }
          setListId(tempList);
        }
      } catch (error) {
        //console.log(error);
      }
    }
    getCharacters();
  }, [searchName, error404, searchURL]);

  if (!error404) {
    return (
      <div className={styles.homePage}>
        {prevButton ? (
          <Button onClick={() => prevPage()}>Prev</Button>
        ) : (
          <Button disabled>Prev</Button>
        )}
        <div className={styles.overflow}>
          <div className={styles.cardDiv}>
            {listId.map((id, index) => (
              <div key={index} className={styles.card}>
                <CardHome id={id} />
              </div>
            ))}
          </div>
        </div>
        {nextButton ? (
          <Button onClick={() => nextPage()}>Next</Button>
        ) : (
          <Button disabled>Next</Button>
        )}
      </div>
    );
  } else {
    return (
      <div className={styles.homePage}>
        <div className={styles.errorDiv}>
          <Alert variant="danger">ERROR 404: No character found</Alert>
        </div>
      </div>
    );
  }
}
