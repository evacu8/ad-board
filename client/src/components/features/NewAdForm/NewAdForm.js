import { Form } from "react-bootstrap";
import React, { useState } from "react";
import PropTypes from "prop-types";

const NewAdForm = (props) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState("");
  const [seller, setSeller] = useState("");

  const payload = {
    title: title,
    text: text,
    photo: photo,
    price: price,
    location: location,
    published: Date.now(),
    seller: seller,
  };

  const handleSubmit = () => {
    props.action(payload);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="col-sm-8 col-md-6">
        <h2>Create New Ad {props.id}</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="newAdForm.Title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the title"
              aria-describedby="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newAdForm.Location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your location"
              aria-describedby="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newAdForm.Price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the price"
              aria-describedby="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newAdForm.Price">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              className="me-2"
              aria-label="Image"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newAdForm.Description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Describe the item"
              aria-describedby="description"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
            />
          </Form.Group>
        </Form>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          {props.actionText}
        </button>
      </div>
    </div>
  );
};

NewAdForm.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  photo: PropTypes.string,
  price: PropTypes.string,
  location: PropTypes.string,
};

export default NewAdForm;
