import React from 'react';
import withStyles from 'react-jss';
import PageContainer from '../PageContainer';
import { MyAlbumsContainer as MyAlbums } from './components/MyAlbums';

const styles = {};

export default withStyles(styles)(() => (
  <PageContainer>
    <MyAlbums />
  </PageContainer>
));
