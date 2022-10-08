import styles from "./AdPage.module.scss";
import { getAdById } from "../../../redux/adsRedux";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { IMGS_URL } from "../../../config";
import { getUser } from "../../../redux/usersRedux";
import { removeAd } from "../../../redux/adsRedux";
import DeleteModal from "../../views/DeleteModal/DeleteModal";
import { dateConverter } from "../../../utils/dateConverter";

const AdPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const adData = useSelector((state) => getAdById(state, id));
  const user = useSelector((state) => getUser(state));

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const publishedDate = dateConverter(adData.published);
  console.log(publishedDate);

  const handleRemove = (e) => {
    e.preventDefault();
    dispatch(removeAd(id));
    handleClose();
  };

  if (showModal)
    return (
      <DeleteModal
        showModal={showModal}
        handleClose={handleClose}
        handleRemove={handleRemove}
      />
    );
  if (!adData) return <Navigate to="/" />;

  return (
    <div>
      <Row className="d-flex justify-content-center mt-5">
        <Col xs="12" lg="5">
          <Card className={styles.card_wrapper}>
            <Card.Img
              variant="top"
              className={styles.image_container}
              src={IMGS_URL + adData.photo}
            />

            <Card.Body>
              <div className="d-flex flex-row justify-content-between">
                <Card.Title className="mb-3">
                  <b>{adData.title}</b>
                </Card.Title>
                <Card.Title className="mb-3">
                  <b>{adData.price}$</b>
                </Card.Title>
              </div>
              <Card.Text>{adData.text}</Card.Text>
              <Card.Text className="mb-3">
                <b>Location:</b> {adData.location}
              </Card.Text>
              <Card.Text>Published: {publishedDate}</Card.Text>
              <Card.Text>Seller: {adData.seller.login}</Card.Text>
              <Card.Text>Phone: {adData.seller.phone}</Card.Text>
            </Card.Body>
            {user !== null && user.login === adData.seller.login && (
              <div className="d-flex flex-row flex-nowrap justify-content-between p-3">
                <Link to={"/ad/edit/" + id}>
                  <Button variant="outline-info">Edit</Button>
                </Link>
                <Button variant="outline-danger" onClick={handleShow}>
                  Delete
                </Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdPage;
