import { useSelector, useDispatch } from "react-redux";
import {
  getSearchResult,
  fetchByPhrase,
} from "../../../redux/searchResultRedux";
import { Container } from "react-bootstrap";
import AdCard from "../AdCard/AdCard";
import Spinner from "react-bootstrap/Spinner";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const SearchResults = () => {
  const { searchPhrase } = useParams();
  const dispatch = useDispatch();
  const ads = useSelector((state) => getSearchResult(state));

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchByPhrase(searchPhrase));
    setLoaded(true);
  }, []);

  return (
    <Container>
      <div className="d-flex justify-content-between mb-4">
        <h2>Search results</h2>
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

export default SearchResults;
