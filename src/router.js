import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Home from './containers/Home';

const router = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={Home} />
                    <Redirect to="/"/>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
};

export default router;
