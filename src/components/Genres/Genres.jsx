import { useSelector } from "react-redux";
import "./style.scss";

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);

  return (
    <div className="genres">
      {data?.map((item) => {
        return (
          <div key={item} className="genre">
            {genres[item]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
