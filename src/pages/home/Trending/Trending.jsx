import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Swicth from "../../../components/Swicth/Swicth";
import { useState } from "react";
import ApiFeach from "../../../hooks/ApiFeach";
import Carousel from "../../../components/Carousel/Carousel";

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");
  const { data, loading } = ApiFeach(`/trending/all/${endpoint}`);
  // console.log(loading);
  // console.log(data);/

  const TabControl = (tab) => {
    // console.log(tab);
    setEndpoint(tab);
  };
  // console.log(data?.results);

  return (
    <div className="CarosulArea">
      <ContentWrapper>
        <span className="CarosulTilte">Trendig</span>
        <Swicth data={["day", "week"]} TabControl={TabControl} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
};

export default Trending;
