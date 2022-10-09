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

  const handleSubmit = (fd) => {
    const options = {
      method: "PUT",
      credentials: "include",
      body: fd,
    };

    fetch(`${API_URL}api/ads/${id}`, options)
      .then((res) => {
        if (res.status === 200) {
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
        actionText="Save changes"
        action={handleSubmit}
        title={adData.title}
        text={adData.text}
        price={adData.price}
        location={adData.location}
        photo={adData.photo}
        status={status}
      />
    </div>
  );
};

export default EditAd;
