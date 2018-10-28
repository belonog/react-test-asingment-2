import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from './Header';
import Footer from '../components/Footer';

function mapStateToProps({loggedCustomerState: {customer}}) {
    return {
        customer
    };
}

class Home extends Component {
    render() {
        return (
            <>
                <Header/>
                <div className="container">
                </div>
                <Footer/>
                <ToastContainer autoClose={2000} />
            </>
        );
    }
}

export default connect(
    mapStateToProps,
)(Home);
