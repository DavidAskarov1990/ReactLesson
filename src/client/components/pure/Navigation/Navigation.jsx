import React, { Component } from 'react';
import { Link } from 'react-router';
import './Navigation.scss';

class Navigation extends Component {
    constructor(props){
        super(props);
    }

    logout = (event) => {
        event.preventDefault();
    };

    render() {
        return(
            <div className="navigation">
                {
                    this.props.user.authenticated
                        ? <button onClick={this.logout} className="nav-btn">Logout</button>
                        : <Link to="/login">Log In</Link>
                }
                {
                    !this.props.user.authenticated
                        ? <span>&nbsp;|&nbsp;<Link to="/register">Register</Link></span>
                        : ""
                }
                &nbsp;|&nbsp;
                <Link to="/myprofile">Profile</Link>
            </div>
        )
    }
}

export default Navigation;