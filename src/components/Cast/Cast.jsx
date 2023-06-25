import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import LazyImg from "../lazyLoadImage/LazyImg";
import avatar from "../../assets/avatar.png";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast</div>
        {!loading ? (
          <div className="listItems">
            {data?.map((index) => {
              const ImgUrl = index.profile_path
                ? url?.images?.base_url + "original" + index.profile_path
                : avatar;

              return (
                <div className="listItem" key={index.id}>
                  <div className="profileImg">
                    <LazyImg src={ImgUrl} />
                  </div>

                  <div className="name">{index.name}</div>

                  <div className="character">{index.character}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
