import styles from "./AdCard.module.scss";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { IMGS_URL } from "../../../config";

const AdCard = (props) => {
  return (
    <div className="d-flex col col-sm-6 col-md-4 mb-3">
      <Card style={{ width: "18rem" }}>
        <Card.Img
          className={styles.card_image}
          variant="top"
          src={IMGS_URL + props.photo}
        />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            <>{props.location}</>
          </Card.Text>
          <Link to={`/ad/${props.id}`}>
            <button type="button" className="btn btn-primary me-2">
              Details
            </button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

AdCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  location: PropTypes.string,
  photo: PropTypes.string,
};

export default AdCard;
