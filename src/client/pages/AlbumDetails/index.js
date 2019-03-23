import React from 'react';
import withStyles from 'react-jss';
import PageContainer from '../PageContainer';
import { AlbumDetailsContainer as AlbumDetails } from './components/AlbumDetails';

const styles = {};

export default withStyles(styles)(() => (
  <PageContainer>
    <AlbumDetails />
  </PageContainer>
));
