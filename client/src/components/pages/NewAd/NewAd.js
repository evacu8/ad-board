import NewAdForm from "../../features/NewAdForm/NewAdForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAdData } from "../../../redux/adsRedux";

const NewAd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (payload) => {
    dispatch(addAdData(payload));
    navigate("/");
  };

  return (
    <div>
      <NewAdForm actionText="Create" action={handleSubmit} />
    </div>
  );
};

export default NewAd;
