import Carousel from "../../components/Carousel/Carousel";
import ApiFeach from "../../hooks/ApiFeach";

const Similar = ({ mediaType, id }) => {
  const { data, loading, error } = ApiFeach(`/${mediaType}/${id}/similar`);

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";
  // console.log(data?.results);
  return (
    <Carousel
      title={title}
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
  );
};

export default Similar;
