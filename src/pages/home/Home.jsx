import Banner from "./Banner/Banner";
import TopRated from "./TopRated/TopRated";
import Trending from "./Trending/Trending";
import Populor from "./populor/populor";
import "./style.scss";

const Home = () => {
  return (
    <div>
      <Banner />
      <Trending />
      <Populor />
      <TopRated />
    </div>
  );
};

export default Home;
