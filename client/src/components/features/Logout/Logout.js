import { API_URL } from "../../../config";
import { logOut } from "../../../redux/usersRedux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    const options = {
      method: "DELETE",
    };
    fetch(`${API_URL}auth/logout`, options)
      .then(() => {
        dispatch(logOut());
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  return null;
};

export default Logout;
