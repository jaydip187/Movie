import Carousel from "../../components/Carousel/Carousel";
import ApiFeach from "../../hooks/ApiFeach";

const Recommendation = ({ mediaType, id }) => {
  const { data, loading, error } = ApiFeach(
    `/${mediaType}/${id}/recommendations`
  );
  // console.log(data);
  return (
    <Carousel
      title="Recommendations"
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
  );
};

export default Recommendation;
