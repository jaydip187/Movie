import { useState, useEffect } from "react";
import "./style.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import noResults from "../../assets/no-results.png";
import Loader from "../../components/Loader/Loader";
import Card from "../../components/Card/Card";
import LazyImg from "../../components/lazyLoadImage/LazyImg";
import resultNotFound from "../../assets/no-results.png";
const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pagenum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const feachDataIntial = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pagenum}`).then(
      (res) => {
        setData(res);
        setPageNum((num) => num + 1);
        setLoading(false);
      }
    );
  };

  const feachNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pagenum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data?.results,
            results: [...data.results, ...res.results],
          });
        } else {
          setData(res);
        }

        setPageNum((num) => num + 1);
      }
    );
  };

  useEffect(() => {
    feachDataIntial();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Loader />}
      {!loading && (
        <ContentWrapper>
          {data?.results.length > 0 ? (
            <>
              <div className="pageTitle">{`Search ${
                data?.total_results > 1 ? "results" : "result"
              } of '${query}'`}</div>

              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length}
                next={feachNextPageData}
                key={new Date().getTime()}
                hasMore={pagenum <= data.total_pages}
                loader={<Loader />}
              >
                {data?.results.map((item) => {
                  return (
                    <>
                      {/* {console.log(new Date().getTime())} */}
                      <Card data={item} key={item.id} fromSearch={true} />;
                    </>
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <>
              <span className="resultNotFound">Sorry , Result Not Found </span>
              <div className="xyz">
                <LazyImg className="img" src={resultNotFound} />
              </div>
            </>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
