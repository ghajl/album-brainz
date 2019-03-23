import React from 'react';
import Badge from 'react-bootstrap/Badge';
import { connect } from 'react-redux';

export default connect(({ user }) => ({ albumsCount: user.albumsLocal.length }))(
  ({ albumsCount, ...props }) => (
    <Badge className="ml-1" variant="light" {...props}>
      {albumsCount}
    </Badge>
  )
);
