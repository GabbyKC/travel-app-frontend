import React, {Component} from 'react';
import { slide as Menu } from 'react-burger-menu'
import './SideMenu.css';

class SideMenu extends Component {
    render() {
        return (
            <Menu right>
                <a id="home" className="menu-item" href="/">Home</a>
            </Menu>
        );
    }
}

export default SideMenu;