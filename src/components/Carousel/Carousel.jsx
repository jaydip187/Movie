// import "./style.scss ";
import "./style.scss";
import { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import LazyImg from "../lazyLoadImage/LazyImg";
import PosterFallback from "../../assets/no-poster.png";
import Rating from "../Rating/Rating";
import Genres from "../Genres/Genres";

const Carousel = ({ data, loading, endpoint, title }) => {
  const carouselRef = useRef(null);
  const { url } = useSelector((state) => state.home);
  // console.log(url);
  const navigate = useNavigate();

  const Loadimg = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton">
          <div className="textBlock">
            <div className="title skeleton"></div>
            <div className="date skeleton"></div>
          </div>
        </div>
      </div>
    );
  };

  const handelnavigate = (type, id) => {
    // navigate(`/${item.media_type}/${item.id}`)
    type ? navigate(`/${type}/${id}`) : navigate(`/${endpoint}/${id}`);

    window.scrollTo(0, 0);
  };

  //   (url.images.base_url, "44444444444");

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}

        {!loading ? (
          <div className="carouselItems">
            {data?.length > 1 ? (
              ""
            ) : (
              <div>
                <span style={{ color: "white", fontWeight: "bold" }}>
                  Data Not Found
                </span>
              </div>
            )}

            {data?.map((item) => {
              const imgUrl = item.poster_path
                ? url?.images?.base_url + "original" + item.poster_path
                : PosterFallback;

              return (
                <div
                  key={item.id}
                  className="carouselItem"
                  onClick={() => handelnavigate(item.media_type, item.id)}
                >
                  <div className="posterBlock">
                    <LazyImg src={imgUrl} />
                    <Rating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {dayjs(item.release_date).format("MMM D ,YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {Loadimg()}
            {Loadimg()}
            {Loadimg()}
            {Loadimg()}
            {Loadimg()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
