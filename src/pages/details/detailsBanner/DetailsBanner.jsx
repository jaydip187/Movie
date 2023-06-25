import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";
import { PlayIcon } from "./PlayIcon";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import ApiFeach from "../../../hooks/ApiFeach";
import Genres from "../../../components/Genres/Genres";
import Rating from "../../../components/Rating/Rating";
import LazyImg from "../../../components/lazyLoadImage/LazyImg";
import PosterFallback from "../../../assets/no-poster.png";
import VideoPopup from "../../../components/Video/VideoPop";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType, id } = useParams();
  const { data, loading } = ApiFeach(`/${mediaType}/${id}`);
  const director = crew?.filter((role) => role.job === "Director");
  const writer = crew?.filter(
    (role) =>
      role.job === "Writer" || role.job === "Story" || role.job === "Screenplay"
  );
  //   console.log(data);
  //   console.log(director);
  //   console.log(director?.length);
  //   console.log(video.map((a)=>   ));

  const { url } = useSelector((state) => state.home);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <LazyImg
                  src={url?.images?.base_url + "original" + data.backdrop_path}
                />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  {/* ======================================================================= */}
                  <div className="left">
                    {data.poster_path ? (
                      <LazyImg
                        className="posterImg"
                        src={
                          url?.images?.base_url + "original" + data.poster_path
                        }
                      />
                    ) : (
                      <LazyImg className="posterImg" src={PosterFallback} />
                    )}
                  </div>

                  {/* ==================================================================== */}
                  <div className="right">
                    <div className="title">{`${
                      data.name || data.title
                    } (${dayjs(data.release_date).format("YYYY")})`}</div>
                    <div className="subtitle">{data.tagline}</div>
                    <div>
                      <Genres data={data?.genres.map((item) => item.id)} />
                    </div>

                    <div className="row">
                      <Rating rating={data.vote_average.toFixed(1)} />{" "}
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}
                      >
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>

                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>

                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Sataus : </span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release date: </span>
                          <span className="text">
                            {dayjs(data.release_date).format("MMM D ,YYYY")}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime : </span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director : </span>
                        <span className="text">
                          {director?.map((d, i) => (
                            <span key={i}>
                              {d.name} {director?.length - 1 !== i && " , "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer : </span>
                        <span className="text">
                          {writer?.map((d, i) => (
                            <span key={i}>
                              {d.name} {director?.length - 1 !== i && " , "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Created by : </span>
                        <span className="text">
                          {data?.created_by?.map((d, i) => (
                            <span key={i}>
                              {d.name}{" "}
                              {data?.created_by?.length - 1 !== i && " , "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {/* =============================================================================== */}
                  </div>
                </div>
              </ContentWrapper>
              <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
              />
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
