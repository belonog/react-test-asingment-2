import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from "react-toastify";

import { logoutCustomer, setLoggedCustomer, customerLoginPending } from '../../actions/login';

function mapStateToProps({loggedCustomerState: {customer = null}}) {
    return {
        customer
    };
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: ''
        };
    }

    updateState = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    doLogout = (e) => {
        const {dispatch} = this.props;
        dispatch(logoutCustomer());
        e.preventDefault();
    }

    doLogin = (e) => {
        e.preventDefault();

        const {name, password} = this.state;

        if (name === 'admin' && password === '123') {
            const {dispatch} = this.props;

            dispatch(customerLoginPending());

            setTimeout(() => {
                dispatch(setLoggedCustomer({
                    name: 'Admin',
                    login: 'admin',
                    role: 'admin'
                }));
            }, 3000);
        } else {
            toast.error('Credentials uncorrect');
        }
    }

    render() {
        const {customer} = this.props;
        const {name, password} = this.state;
        return (
            <>
                {customer
                    ? <span className="navbar-text float-right">
                        {customer.name}
                        <a
                            href="/logout"
                            onClick={this.doLogout}> Logout</a>
                    </span>
                    : <form className="form-inline my-2 my-lg-0" onSubmit={this.doLogin}>
                        <input
                            id="name"
                            className="form-control mr-sm-2"
                            type="text"
                            name="name"
                            placeholder="Login"
                            onChange={this.updateState} />
                        <input
                            id="password"
                            className="form-control mr-sm-2"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.updateState} />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" disabled={!(name && password)}>Login</button>
                </form>}
            </>
        );
    }
}

export default connect(
    mapStateToProps,
)(Login);
