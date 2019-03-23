import React from 'react';
import Badge from 'react-bootstrap/Badge';

export default ({ albumsCount = 12, ...props }) => (
  <Badge className="ml-1" variant="light" {...props}>
    {albumsCount}
  </Badge>
);
