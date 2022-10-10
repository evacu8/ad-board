import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [phrase, setPhrase] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/ads/search/${phrase}`);
  };

  return (
    <Form
      className="mb-4 d-flex flex-row justify-content-center"
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3 me-1" controlId="formSearch">
        <Form.Control
          type="text"
          placeholder="Search in title..."
          onChange={(e) => setPhrase(e.target.value)}
          style={{ width: "200px", height: "40px" }}
        />
      </Form.Group>
      <Button variant="primary" type="submit" style={{ height: "40px" }}>
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
