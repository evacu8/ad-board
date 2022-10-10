import styles from "./UserCard.module.scss";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { IMGS_URL } from "../../../config";

const UserCard = (props) => {
  return (
    <div className="">
      <Card style={{ width: "14rem" }}>
        <div className="d-flex flex-row">
          <div className="col">
            <Card.Body>
              <Card.Title>{props.name}</Card.Title>
              <Card.Text>
                <>{props.phone}</>
              </Card.Text>
            </Card.Body>
          </div>
          <div className="col">
            <Card.Img
              className={styles.card_image}
              variant="top"
              src={IMGS_URL + props.avatar}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

UserCard.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  avatar: PropTypes.string,
};

export default UserCard;
