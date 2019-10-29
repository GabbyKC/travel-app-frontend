import React, {Component} from 'react';
import {connect} from "react-redux";
import AppLogo from "../AppLogo/AppLogo";
import Footer from "../Footer/Footer";
import {createAccount} from "../../actions";

class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
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

        if (!this.state.name) {
            return this.setState({error: "Name is required"});
        }
        if (!this.state.email) {
            return this.setState({error: "Email is required"});
        }
        if (!this.state.password) {
            return this.setState({error: "Password is required"});
        }
        this.setState({error: ''});

        this.props.createAccount( {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        })
    };

    handleNameChange = event => {
        this.setState({
            name: event.target.value,
        });
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
            <div>
                <AppLogo/>

                <form className='login-form' onSubmit={this.handleSubmit}>
                    {
                        this.state.error &&
                        <div className='login-required' onClick={this.dismissError}>
                            <button onClick={this.dismissError}>✖</button>
                            {this.state.error}
                        </div>
                    }
                    <input type="text" placeholder='Joe Dude' value={this.state.name}
                           onChange={this.handleNameChange}/>
                    <input type="email" placeholder='joe@example.com' value={this.state.email}
                           onChange={this.handleEmailChange}/>
                    <input type="password" placeholder='password' value={this.state.password}
                           onChange={this.handlePassChange}/>
                    <input type="submit" value="Create Account"/>
                </form>

                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {isLoading: state.users.isLoading};
};

const mapDispatchToProps = dispatch => ({
    createAccount: (data) => dispatch(createAccount(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);