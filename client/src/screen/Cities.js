import React, {Component} from 'react';
import {connect} from "react-redux";
import Footer from '../components/Footer/Footer';
import AppLogo from "../components/AppLogo/AppLogo";
import './Cities.css';


import {getCities} from '../actions';

class Cities extends Component {
    state = {
        searchTerm: '',
    };

    componentDidMount() {
        this.props.fetchCities();
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
                        <img className='error-image' src="https://media.giphy.com/media/iic43bLPYAAtbnb6hP/giphy.gif" alt="it be broke yo" />
                    </div>
                    <div className='error-message'>Uh oh... there was an error. Please try again later.</div>
                </div>
            )
        }

        return (
            <div className='cities-wrapper'>
                <AppLogo />
                <div className='input-container'>
                    <input className="cities-input"
                        type="text"
                        placeholder="Search by City..."
                        value={this.state.searchTerm}
                        onChange={this.updateSearchTerm}
                    />
                </div>
                <div className='city-list-container'>
                    {cities.map(city => <div className='image-container' style={this.getStyles(city)} key={city._id}> <div className='city-name'>{city.name}</div></div>)}
                </div>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { cities: state.cities.cities, isLoading: state.cities.isLoading };
};

const mapDispatchToProps = dispatch => ({
    fetchCities: () => dispatch(getCities())
});

export default connect(mapStateToProps, mapDispatchToProps)(Cities);
