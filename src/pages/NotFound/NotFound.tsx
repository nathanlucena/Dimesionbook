import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export function NotFound() {
  return (
    <div className={styles.notFound}>
      <Alert variant="danger">
        <h3>ERROR 404: Page not found</h3>
        <Link to="/">
          <p>click here to return to home page</p>
        </Link>
      </Alert>
    </div>
  );
}
