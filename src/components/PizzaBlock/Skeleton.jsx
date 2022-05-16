import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle x={15} cx="144" cy="134" r="115" />
    <rect x="-1" y="270" rx="11" ry="11" width="280" height="25" />
    <rect x="0" y="310" rx="10" ry="10" width="280" height="85" />
    <rect x="105" y="347" rx="0" ry="0" width="1" height="0" />
    <rect x="7" y="415" rx="10" ry="10" width="95" height="27" />
    <rect x="22" y="432" rx="0" ry="0" width="9" height="0" />
    <rect x="128" y="407" rx="20" ry="20" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
