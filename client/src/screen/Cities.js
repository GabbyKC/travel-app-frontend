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

        // ToDO: better fall back for error
        if (cities === null) {
            return (
                <div>oopps</div>
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
