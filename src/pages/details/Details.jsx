import { useParams } from "react-router-dom";
import "./style.scss";
import ApiFeach from "../../hooks/ApiFeach";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "../../components/Cast/Cast";
import VideosSection from "./VideoSection/VideoSection";
import Similar from "../Similar&Recommedation/Similar";
import Recommendation from "../Similar&Recommedation/Recommendation";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = ApiFeach(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = ApiFeach(
    `/${mediaType}/${id}/credits`
  );
  // console.log(credits);
  const a = data?.results.filter(
    (result) => result.name === "Official Trailer"
  )[0];

  // console.log(a, "wefe");
  return (
    <div>
      <DetailsBanner video={a} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
