import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { API_URL } from "../../../config";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

const Register = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("login", login);
    fd.append("password", password);
    fd.append("phone", phone);
    fd.append("avatar", avatar);

    const options = {
      method: "POST",
      body: fd,
    };

    setStatus("isLoading");
    fetch(`${API_URL}auth/register`, options)
      .then((res) => {
        if (res.status === 201) {
          setStatus("success");
          setLogin("");
          setPassword("");
          setPhone("");
          setAvatar("");
        } else if (res.status === 400) {
          setStatus("clientError");
        } else if (res.status === 409) {
          setStatus("loginError");
        } else {
          setStatus("serverError");
        }
      })
      .catch((err) => {
        setStatus("serverError");
      });
  };

  return (
    <Form className="col-12 col-sm-3 mx-auto" onSubmit={handleSubmit}>
      <h1>Sign Up</h1>

      {status === "success" && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>
            {" "}
            Your account has been created successfully. You can now log in.
          </p>
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

      {status === "loginError" && (
        <Alert variant="warning">
          <Alert.Heading>Login already in use</Alert.Heading>
          <p>You have to use another login!</p>
        </Alert>
      )}

      {status === "isLoading" && (
        <Spinner variant="primary" animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
      )}

      <Form.Group className="mb-3" controlId="formLogin">
        <Form.Label>Login</Form.Label>
        <Form.Control
          type="text"
          placeholder="Login"
          onChange={(e) => setLogin(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAvatar">
        <Form.Label>Avatar</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
};

export default Register;
