import AdForm from "../../features/AdForm/AdForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";
import { useDispatch } from "react-redux";
import { fetchAds } from "../../../redux/adsRedux";

const NewAd = () => {
  const [status, setStatus] = useState(null);
  const header = "Create new ad";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (fd) => {
    const options = {
      method: "POST",
      credentials: "include",
      body: fd,
    };

    fetch(`${API_URL}api/ads`, options)
      .then((res) => {
        if (res.status === 201) {
          setStatus("success");
          dispatch(fetchAds());
          navigate("/");
        } else if (res.status === 400) {
          setStatus("clientError");
        } else {
          setStatus("serverError");
        }
      })
      .catch((err) => {
        setStatus("serverError");
      });
  };

  return (
    <div>
      <AdForm
        header={header}
        actionText="Create"
        action={handleSubmit}
        status={status}
      />
    </div>
  );
};

export default NewAd;
