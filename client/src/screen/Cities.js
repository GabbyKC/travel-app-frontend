import React, { Component } from 'react';
import { connect } from "react-redux";
import Footer from '../components/Footer/Footer';
import './Cities.css';

import { getCities } from '../actions';

class Cities extends Component {
    componentDidMount() {
        this.props.fetchCities();
    }

    getStyles(city) {
        return {
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage: `url(${city.img})`,
        };
    }

    render() {
        const cities = this.props.cities;
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
                        <img className='error-image' src="https://media.giphy.com/media/iic43bLPYAAtbnb6hP/giphy.gif" alt="image broke yo" />
                    </div>
                    <div className='error-message'>Uh oh... there was an error. Please try again later.</div>
                </div>
            )
        }

        return (
            <div>
                <div>search goes here</div>
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
}

const mapDispatchToProps = dispatch => ({
    fetchCities: () => dispatch(getCities())
});

export default connect(mapStateToProps, mapDispatchToProps)(Cities);
