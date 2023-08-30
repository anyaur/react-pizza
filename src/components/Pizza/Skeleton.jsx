import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="130" cy="130" r="130" />
    <rect x="0" y="277" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="317" rx="10" ry="10" width="280" height="88" />
    <rect x="2" y="428" rx="10" ry="10" width="90" height="27" />
    <rect x="128" y="419" rx="30" ry="30" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
