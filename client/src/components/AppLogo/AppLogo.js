import React, {Component} from 'react';
import './AppLogo.css';
import UserLogo from "../UserLogo/UserLogo";

class AppLogo extends Component {
    render() {
        return (
            <div>
                <div className='app-logo-header'>
                    <UserLogo/>
                </div>
            </div>
        );
    }
}

export default AppLogo;