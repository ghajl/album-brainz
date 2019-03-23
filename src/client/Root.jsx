import React from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

export default withRouter(props => <Switch>{renderRoutes(props.route.routes)}</Switch>);
