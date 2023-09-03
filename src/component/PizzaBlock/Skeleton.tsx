import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="1" y="244" rx="10" ry="10" width="280" height="21" />
    <circle cx="140" cy="113" r="113" />
    <rect x="0" y="294" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="404" rx="10" ry="10" width="95" height="30" />
    <rect x="126" y="396" rx="20" ry="20" width="152" height="45" />
  </ContentLoader>
);
