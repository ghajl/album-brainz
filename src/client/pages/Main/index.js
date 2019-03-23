import React from 'react';
import withStyles from 'react-jss';
import PageContainer from '../PageContainer';
import { MainContainer as Main } from './components/Main';

const styles = {};

export default withStyles(styles)(() => {
  return (
    <PageContainer>
      <Main />
    </PageContainer>
  );
});
