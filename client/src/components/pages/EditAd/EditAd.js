import AdForm from "../../features/AdForm/AdForm";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import { fetchAds, getAdById } from "../../../redux/adsRedux";

const EditAd = () => {
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const adData = useSelector((state) => getAdById(state, id));
  console.log("adData", adData);

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
      <AdForm actionText="Edit" action={handleSubmit} />
    </div>
  );
};

export default EditAd;
