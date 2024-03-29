import React, {Component} from 'react';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import AppLogo from "../components/AppLogo/AppLogo";
import SideMenu from "../components/SideMenu/SideMenu";
import Footer from '../components/Footer/Footer';
import {getCities} from '../actions';

import './Cities.css';

class Cities extends Component {
    state = {
        searchTerm: '',
    };

    componentDidMount() {
        this.props.fetchCities().then(() => {
            if (this.props.location.state) {
                const item = document.querySelector(
                    ".restore-" + this.props.location.state.restorePoint
                );

                if (item) {
                    item.scrollIntoView();
                }
            }
        })

    }

    doSearchFilter = () => {
        const convertedSearchTerm = this.state.searchTerm.toLowerCase().replace(/\s/g, "");
        return this.props.cities.filter(city => city.name.toLowerCase().startsWith(convertedSearchTerm));
    };

    getStyles(city) {
        return {
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage: `url(${city.img})`,
        };
    }

    updateSearchTerm = (e) => {
        this.setState({
            searchTerm: e.target.value,
        })
    };

    render() {
        const cities = this.doSearchFilter();
        const isLoading = this.props.isLoading;

        if (isLoading) {
            return (
                <div className='loader'></div>
            )
        }

        if (cities === null) {
            return (
                <div className='error-bg'>
                    <div className='error-image-container'>
                        <img className='error-image' src="https://media.giphy.com/media/iic43bLPYAAtbnb6hP/giphy.gif"
                             alt="it be broke yo"/>
                    </div>
                    <div className='error-message'>Uh oh... there was an error. Please try again later.</div>
                </div>
            )
        }

        return (
            <div className='cities-wrapper'>
                <AppLogo/>
                {
                    this.props.loggedInUser &&
                        <SideMenu/>
                }
                <div className='input-container'>
                    <input className="cities-input"
                           type="text"
                           placeholder="Search by City..."
                           value={this.state.searchTerm}
                           onChange={this.updateSearchTerm}
                    />
                </div>
                <div className='city-list-container'>
                    {
                        cities.map(city =>
                            <NavLink to={`/cities/${city._id}/itineraries`} key={city._id}>
                                <div className={`image-container restore-${city._id}`} style={this.getStyles(city)}>
                                    <div className='city-name'>{city.name}</div>
                                </div>
                            </NavLink>
                        )
                    }
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {cities: state.cities.cities, isLoading: state.cities.isLoading, loggedInUser: state.users.loggedInUser};
};

const mapDispatchToProps = dispatch => ({
    fetchCities: () => dispatch(getCities())
});

export default connect(mapStateToProps, mapDispatchToProps)(Cities);
