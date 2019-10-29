import React, {Component} from 'react';
import './LoginCard.css';

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
        return this.setState({error: ''});
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
                    To add Cities, Itineraries and Activities, please Login or Create an Account.
                </p>

                <form className='login-form' action="" onSubmit={this.handleSubmit}>
                    {
                        this.state.error &&
                        <div className='login-required' onClick={this.dismissError}>
                            <button onClick={this.dismissError}>✖</button>
                            {this.state.error}
                        </div>
                    }
                    <input type="email" placeholder='joe@example.com' value={this.state.email}
                           onChange={this.handleEmailChange}/>
                    <input type="text" placeholder='password' value={this.state.password}
                           onChange={this.handlePassChange}/>
                    <input type="submit" value="Login"/>
                </form>

                {/*<p>create account</p>*/}

            </div>
        );
    }
}

export default LoginCard;