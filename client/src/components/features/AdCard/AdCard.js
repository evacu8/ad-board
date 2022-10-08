import styles from "./AdCard.module.scss";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeAdData } from "../../../redux/adsRedux";
import DeleteModal from "../../views/DeleteModal/DeleteModal";
import { IMGS_URL } from "../../../config";

const AdCard = (props) => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleRemove = (e) => {
    e.preventDefault();
    setShowModal(false);
    dispatch(removeAdData(props.id));
  };

  return (
    <div className="d-flex col-sm mb-3">
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
      <DeleteModal
        id={props.id}
        show={showModal}
        handleClose={handleClose}
        handleRemove={handleRemove}
      />
    </div>
  );
};

AdCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  location: PropTypes.string,
};

export default AdCard;
