import styles from "./AdPage.module.scss";
import { getAdById } from "../../../redux/adsRedux";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { IMGS_URL } from "../../../config";
import { getUser } from "../../../redux/usersRedux";
import { removeAdData } from "../../../redux/adsRedux";
import DeleteModal from "../../views/DeleteModal/DeleteModal";
import { dateConverter } from "../../../utils/dateConverter";
import UserCard from "../../features/UserCard/UserCard";

const AdPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const adData = useSelector((state) => getAdById(state, id));
  const user = useSelector((state) => getUser(state));

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const publishedDate = dateConverter(adData.published);

  const handleRemove = (e) => {
    e.preventDefault();
    dispatch(removeAdData(id));
    handleClose();
    navigate("/");
  };

  if (!adData) {
    navigate("/");
  }

  return (
    <div>
      <DeleteModal
        show={showModal}
        handleClose={handleClose}
        handleRemove={handleRemove}
      />
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
              <Card.Text className="mb-1 mt-4">
                <b>Location:</b> {adData.location}
              </Card.Text>
              <Card.Text>
                <b>Published:</b> {publishedDate}
              </Card.Text>
              <div className="d-flex justify-content-center">
                <UserCard
                  name={adData.seller.login}
                  phone={adData.seller.phone}
                  avatar={adData.seller.avatar}
                />
              </div>
            </Card.Body>
            {user !== null && user === adData.seller._id && (
              <div className="d-flex flex-row flex-nowrap justify-content-between p-3">
                <Link to={"/ad/edit/" + id}>
                  <Button variant="outline-info" style={{ width: "80px" }}>
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="outline-danger"
                  style={{ width: "80px" }}
                  onClick={handleShow}
                >
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
