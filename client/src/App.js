import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import NewAd from "./components/pages/NewAd/NewAd";
import EditAd from "./components/pages/EditAd/EditAd";
import AdPage from "./components/pages/AdPage/AdPage";
import NotFound from "./components/pages/NotFound/NotFound";
import Header from "./components/views/Header/Header";
import Footer from "./components/views/Footer/Footer";
import Register from "./components/features/Register/Register";
import Login from "./components/features/Login/Login";
import Logout from "./components/features/Logout/Logout";
import { fetchAds } from "./redux/adsRedux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchAds()), [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/ad/new" element={<NewAd />} />
        <Route path="/ad/:id" element={<AdPage />} />
        <Route path="/ad/edit/:id" element={<EditAd />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;
