import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Home from './containers/home/Home';

const router = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={Home} />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
};

export default router;
