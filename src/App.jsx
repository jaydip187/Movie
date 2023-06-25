import { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration, getGenres } from "./Sciles/HomeSlice";
import { fetchDataFromApi } from "./utils/api";
import Home from "./pages/home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./pages/details/Details";
import SearchResult from "./pages/result/SearchResult";
import Explore from "./pages/explore/Explore";
import ErrorPage from "./pages/404/404";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    ApiFeact();
    callGenres();
  }, []);

  const ApiFeact = () => {
    fetchDataFromApi("/configuration").then((res) => {
      // console.log(res);
      dispatch(getApiConfiguration(res));
    });
  };

  const callGenres = async () => {
    let promises = [];
    let endPoint = ["movie", "tv"];
    let allgenres = {};

    endPoint.forEach((item) => {
      promises.push(fetchDataFromApi(`/genre/${item}/list`));
    });

    const data = await Promise.all(promises);
    // console.log(data);

    data.map(({ genres }) => {
      return genres.map((item) => (allgenres[item.id] = item));
    });
    // console.log(allgenres);

    dispatch(getGenres(allgenres));
  };

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResult />} />

          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
