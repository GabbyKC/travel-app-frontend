import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import './LoginCard.css';
import {connect} from "react-redux";
import {logUserIn} from "../../actions";

class LoginCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
        };
    }

    dismissError = () => {
        this.setState({error: ''});
    };

    handleSubmit = event => {
        event.preventDefault();

        if (!this.state.email) {
            return this.setState({error: "Email is required"});
        }
        if (!this.state.password) {
            return this.setState({error: "Password is required"});
        }
        this.setState({error: ''});

        this.props.login({
            email: this.state.email,
            password: this.state.password
        })
    };

    handleEmailChange = event => {
        this.setState({
            email: event.target.value,
        });
    };

    handlePassChange = event => {
        this.setState({
            password: event.target.value,
        });
    };

    render() {
        return (
            <div className='login-content'>
                <p className='login-intro'>
                    To add Cities, Itineraries and Activities, please Login.
                </p>

                <form className='login-form' onSubmit={this.handleSubmit}>
                    {
                        this.state.error &&
                        <div className='login-required' onClick={this.dismissError}>
                            <button onClick={this.dismissError}>✖</button>
                            {this.state.error}
                        </div>
                    }
                    <input type="email" placeholder='joe@example.com' value={this.state.email}
                           onChange={this.handleEmailChange}/>
                    <input type="password" placeholder='password' value={this.state.password}
                           onChange={this.handlePassChange}/>
                    <input type="submit" value="Login"/>
                </form>

                {
                    this.props.isLoading &&
                    <div className='loader'></div>
                }

                <hr/>
                {
                    !this.props.userCreated &&
                    <div className='create-account'>
                        <p className='account-intro'>Don't have an account yet?</p>
                        <NavLink to="/create">Create Account</NavLink>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {userCreated: state.users.userCreated, isLoading: state.users.isLoading};
};

const mapDispatchToProps = dispatch => ({
    login: (data) => dispatch(logUserIn(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginCard);