import React from 'react';

export default ({ src, width, height, alt, ...otherProps }) => (
  <img src={src} width={width} height={height} alt={alt} {...otherProps} />
);
