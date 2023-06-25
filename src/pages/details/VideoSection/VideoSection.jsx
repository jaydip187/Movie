import React, { useState } from "react";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { PlayIcon } from "../detailsBanner/PlayIcon";
import VideoPopup from "../../../components/Video/VideoPop";
import LazyImg from "../../../components/lazyLoadImage/LazyImg";

const VideosSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Official Videos</div>
        {!loading ? (
          <div className="videos">
            {data?.results?.map((vid) => {
              return (
                <div
                  className="videoItem"
                  key={vid.id}
                  onClick={() => {
                    setVideoId(vid.key);
                    setShow(true);
                  }}
                >
                  <div className="videoThumbnail">
                    <LazyImg
                      src={`https://img.youtube.com/vi/${vid.key}/mqdefault.jpg`}
                    />
                    <PlayIcon />
                  </div>

                  <div className="videoTitle">{vid.name}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideosSection;
