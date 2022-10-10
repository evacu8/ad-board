import { Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getUser } from "../../../redux/usersRedux";
import { useForm } from "react-hook-form";

import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

const AdForm = ({ header, action, actionText, ...props }) => {
  const [title, setTitle] = useState(props.title || "");
  const [text, setText] = useState(props.text || "");
  const [price, setPrice] = useState(props.price || "");
  const [location, setLocation] = useState(props.location || "");
  const [photo, setPhoto] = useState(props.photo || "");
  const [seller, setSeller] = useState("");
  const [status, setStatus] = useState(props.status || null);

  const user = useSelector(getUser);
  useEffect(() => {
    setSeller(user);
  }, [user]);

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const handleSubmit = (e) => {
    const fd = new FormData();
    fd.append("title", title);
    fd.append("text", text);
    fd.append("photo", photo);
    fd.append("price", price);
    fd.append("location", location);
    fd.append("seller", seller);

    setStatus("isLoading");
    setTitle("");
    setText("");
    setPrice("");
    setLocation("");
    setPhoto("");
    setSeller("");
    action(fd);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="col-sm-8 col-md-6">
        <h2>{header}</h2>
        <Form onSubmit={handleSubmit}>
          {status === "success" && (
            <Alert variant="success">
              <Alert.Heading>Success!</Alert.Heading>
              <p>Ad created successfully!</p>
            </Alert>
          )}

          {status === "serverError" && (
            <Alert variant="danger">
              <Alert.Heading>Something went wrong...</Alert.Heading>
              <p> Unexpected error... Try again!</p>
            </Alert>
          )}

          {status === "clientError" && (
            <Alert variant="danger">
              <Alert.Heading>Not enough data</Alert.Heading>
              <p> You have to fill all fields!</p>
            </Alert>
          )}

          {status === "isLoading" && (
            <Spinner variant="primary" animation="border" role="status">
              <span className="sr-only"></span>
            </Spinner>
          )}

          <Form.Group className="mb-3" controlId="adForm.Title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              {...register("title", {
                required: true,
                minLength: 5,
                maxLength: 50,
              })}
              type="text"
              placeholder="Enter the title"
              aria-describedby="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && (
              <small className="d-block form-text text-danger mt-2">
                Title is too short (min 5, max 50 signs)
              </small>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="adForm.Location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              {...register("location", {
                required: true,
                minLength: 2,
                maxLength: 30,
              })}
              type="text"
              placeholder="Enter your location"
              aria-describedby="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            {errors.location && (
              <small className="d-block form-text text-danger mt-2">
                Location name is too short (min 2, max 30 signs)
              </small>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="adForm.Price">
            <Form.Label>Price</Form.Label>
            <div className="d-flex flex-row">
              <Form.Control
                {...register("price", { required: true })}
                type="number"
                placeholder="Enter the price"
                aria-describedby="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ width: "100px" }}
              />
              <span className="ms-1 my-auto">$</span>
            </div>
            {errors.price && (
              <small className="d-block form-text text-danger mt-2">
                This field is required and must be a number
              </small>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="adForm.Price">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              className="me-2"
              aria-label="Image"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="adForm.Description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              {...register("description", {
                required: true,
                minLength: 10,
                maxLength: 500,
              })}
              as="textarea"
              placeholder="Describe the item"
              aria-describedby="description"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
            />
            {errors.description && (
              <small className="d-block form-text text-danger mt-2">
                Title is too short (min 10, max 500 signs)
              </small>
            )}
          </Form.Group>
        </Form>
        <button
          type="button"
          className="btn btn-primary"
          onClick={validate(handleSubmit)}
        >
          {actionText}
        </button>
      </div>
    </div>
  );
};

AdForm.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  photo: PropTypes.string,
  price: PropTypes.string,
  location: PropTypes.string,
};

export default AdForm;
