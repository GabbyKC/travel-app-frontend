import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";
import './UserLogo.css';
import {connect} from "react-redux";


class UserLogo extends Component {
    render() {
        return (
            <div className='user-container'>
                {
                    !this.props.loggedInUser &&
                    <NavLink to="/login">
                        <FontAwesomeIcon
                            className="user-icon"
                            icon={faUser}
                        />
                    </NavLink>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {loggedInUser: state.users.loggedInUser};
};
export default connect(mapStateToProps, null)(UserLogo);