import { useSelector } from "react-redux";
import { getAllAds } from "../../../redux/adsRedux";
import { Container } from "react-bootstrap";
import AdCard from "../AdCard/AdCard";
import Spinner from "react-bootstrap/Spinner";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../../redux/usersRedux";

const AllAds = () => {
  const ads = useSelector((state) => getAllAds(state));
  const user = useSelector(getUser);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (ads) {
      setLoaded(true);
    }
  }, [ads]);

  return (
    <Container>
      <div className="d-flex justify-content-between mb-4">
        <h2>All ads</h2>
        {user && (
          <Link to="/ad/new">
            <button type="button" className="btn btn-outline-info">
              New ad
            </button>
          </Link>
        )}
      </div>
      <Spinner
        animation="border"
        role="status"
        className={clsx(loaded && "d-none")}
      ></Spinner>
      <ul className="d-flex flex-wrap row">
        {ads.map((ad) => (
          <AdCard
            key={ad._id}
            id={ad._id}
            title={ad.title}
            location={ad.location}
            photo={ad.photo}
          />
        ))}
      </ul>
    </Container>
  );
};

export default AllAds;
