import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Swicth from "../../../components/Swicth/Swicth";
import { useState } from "react";
import ApiFeach from "../../../hooks/ApiFeach";
import Carousel from "../../../components/Carousel/Carousel";

const TopRated = () => {
  const [endpoint, setEndpoint] = useState("movie");
  const { data, loading } = ApiFeach(`/${endpoint}/top_rated`);
  // console.log(loading);
  // console.log(data?.results);

  const TabControl = (tab) => {
    // console.log(tab);
    setEndpoint(tab);
  };

  return (
    <div className="CarosulArea">
      <ContentWrapper>
        <span className="CarosulTilte">Top Rated</span>
        <Swicth data={["movie", "tv"]} TabControl={TabControl} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default TopRated;
