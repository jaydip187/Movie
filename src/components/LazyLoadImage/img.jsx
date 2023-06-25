import { LazyLoadImage } from "react-lazy-load-image-component";

const Img = ({ src, className }) => {
  // console.log(src);
  return (
    <div>
      <LazyLoadImage
        className={className || ""}
        alt=""
        effect="opacity"
        src={src}
      />
      ;
    </div>
  );
};

export default Img;
