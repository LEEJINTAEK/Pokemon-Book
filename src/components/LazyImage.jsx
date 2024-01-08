import { useEffect, useState } from "react";

const LazyImage = ({ url, alt }) => {
  const [isLoading, setLoading] = useState(true);
  const [opacity, setOpacity] = useState("opacity-0");

  useEffect(() => {
    isLoading ? setOpacity("opacity-0") : setOpacity("opacity-100");
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div className="absolute h-full z-10 w-full flex items-center justify-center">
          ...Loading
        </div>
      )}
      <img
        src={url}
        alt={alt}
        width="100%"
        height="auto"
        loading="lazy"
        onLoad={() => setLoading(false)}
        className={`object-contain h-full ${opacity}`}
      ></img>
    </>
  );
};

export default LazyImage;
