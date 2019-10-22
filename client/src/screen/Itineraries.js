import React, {Component} from 'react';
import {connect} from "react-redux";
import AppLogo from "../components/AppLogo/AppLogo";
import Footer from "../components/Footer/Footer";
import ItineraryCard from '../components/ItineraryCard/ItineraryCard';

import {getItineraries} from "../actions";

class Itineraries extends Component {
    componentDidMount() {
        const id = this.props.match.params.cityId;
        this.props.fetchItineraries(id);
    }

    render() {
        const itineraries = this.props.itineraries;
        const isLoading = this.props.isLoading;

        if (isLoading) {
            return (
                <div className='loader'></div>
            )
        }

        if (itineraries === null) {
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

        if (itineraries.length === 0) {
            return (
                <div>
                    <div className='error-message'>Looks like no Itinerary has been made yet.</div>
                </div>
            )
        }

        return (
            <div>
                <AppLogo/>
                {itineraries.map((itinerary) => {
                    return (
                        <ItineraryCard key={itinerary._id} itinerary={itinerary} cityName={this.props.cityName}/>
                    )
                })}
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        itineraries: state.itineraries.itineraries,
        cityName: state.itineraries.cityName,
        isLoading: state.itineraries.isLoading
    }
};

const mapDispatchToProps = dispatch => ({
    fetchItineraries: (cityId) => dispatch(getItineraries(cityId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Itineraries);
