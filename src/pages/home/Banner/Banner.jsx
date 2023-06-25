import { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import ApiFeach from "../../../hooks/ApiFeach";
import { useSelector } from "react-redux";
import LazyImg from "../../../components/lazyLoadImage/LazyImg";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const Banner = () => {
  const { url } = useSelector((state) => state.home);

  const [bg, setBg] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data, loading } = ApiFeach("/movie/popular");

  useEffect(() => {
    // original/5i6SjyDbDWqyun8klUuCxrlFbyw.jpg
    const bgdata =
      // url.images?.base_url +
      "http://image.tmdb.org/t/p/" +
      "original" +
      data?.results[Math.floor(Math.random() * 20)].backdrop_path;
    setBg(bgdata);
  }, [data]);

  const QueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      setQuery("");
      navigate(`/search/${query}`);
    }
  };

  // console.log(bg);
  return (
    <div>
      <div className="banner">
        {!loading && (
          <div className="bgclass">
            <LazyImg className="xyz" src={bg} />
          </div>
        )}
        <div className="opacity-layer"></div>

        <div className="wrapper">
          <div className="content">
            <span className="title">
              <div className="container">
                <div className="titlein">
                  <div className="titleinn">
                    <span className="title-word title-word-1">Welcome,</span>
                    <span className="title-word title-word-2">To</span>
                  </div>

                  <div className="titleinn">
                    <span className="title-word title-word-3">Movie</span>
                    <span className="title-word title-word-4">World</span>
                  </div>
                </div>
              </div>
            </span>
            <div className="search">
              {/* <input
                type="text"
                placeholder="Enter a Movie name"
                name=""
                id=""
                onChange={(event) => setQuery(event.target.value)}
                onKeyUp={QueryHandler}
              />
              <button>Search</button> */}
              {/* <LazyImg src={bg} alt="" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
