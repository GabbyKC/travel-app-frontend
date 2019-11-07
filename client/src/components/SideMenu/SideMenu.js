import React, {Component} from 'react';
import {slide as Menu} from 'react-burger-menu'
import './SideMenu.css';
import {logUserOut} from "../../actions";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";

class SideMenu extends Component {
    logUserOut = () => {
        this.props.logUserOut()
    };

    render() {
        return (
            <Menu right>
                <p className='hello-user'>Hey {this.props.loggedInUser.username}</p>
                <NavLink to="/favorites">
                    <FontAwesomeIcon
                        className="sidemenu-icon"
                        icon={faHeart}
                    /> Favorites
                </NavLink>
                <div onClick={this.logUserOut} className='log-out-icon'>
                    <FontAwesomeIcon
                        className="sidemenu-icon"
                        icon={faSignOutAlt}
                    /> Log Out
                </div>
            </Menu>
        );
    }
}

const mapStateToProps = state => {
    return {loggedInUser: state.users.loggedInUser};
};

const mapDispatchToProps = dispatch => ({
    logUserOut: () => dispatch(logUserOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);