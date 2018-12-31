// @flow
import * as React from 'react';
import { Route, Switch } from 'react-router';
import App from '../App';
import Dashboard from '../Dashboard';
import Login from '../Login';
const Main = () => (
    <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={App} />
    </Switch>
);

export default Main;
