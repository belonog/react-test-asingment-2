import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Home.css';

import Header from '../Header';
import Footer from '../../components/Footer';
import Loading from '../../components/loading/Loading';
import TaskList from '../task-list/TaskList';
import TaskItem from '../task-item/TaskItem';

function mapStateToProps({loggedCustomerState: {pending}}) {
    return {
        pending
    };
}

class Home extends Component {
    render() {
        const {pending} = this.props;
        return (
            <>
                <Header/>
                <div className="container main-content">
                    <Switch>
                        <Route path="/" exact component={TaskList} />
                        <Route path="/task/:mode(edit||view)/:id(\d+)" component={TaskItem} />
                        <Route path="/task/:mode(create)" component={TaskItem} />
                        <Redirect to="/" />
                    </Switch>
                </div>
                <Footer/>
                <ToastContainer autoClose={2000} />
                {pending && <Loading dark={true}/>}
            </>
        );
    }
}

export default connect(
    mapStateToProps,
)(Home);
