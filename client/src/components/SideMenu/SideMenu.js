import React, {Component} from 'react';
import { slide as Menu } from 'react-burger-menu'
import './SideMenu.css';
import {logUserOut} from "../../actions";
import {connect} from "react-redux";

class SideMenu extends Component {
    logUserOut = () => {
    this.props.logUserOut()
    };
    render() {
        return (
            <Menu right>
                {/*<a id="home" className="menu-item" href="/">Home</a>*/}
                <button onClick={this.logUserOut}>Log Out</button>
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