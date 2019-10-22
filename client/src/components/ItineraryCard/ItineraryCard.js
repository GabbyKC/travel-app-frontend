import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEuroSign, faClock, faLocationArrow} from "@fortawesome/free-solid-svg-icons";

import './ItineraryCard.css';

class ItineraryCard extends Component {
    render() {
        const itinerary = this.props.itinerary;
        return (
            <div className='itinerary-card-container'>
                <div className='itinerary-bg'>
                    <div className='itinerary-title'>{itinerary.title}</div>
                    <div className='hashtag-container'>
                        {itinerary.hashtags.map((hashtag, index) => {
                            return (
                                <div key={index}>#{hashtag}</div>
                            )
                        })}
                    </div>
                </div>

                <div className='itinerary-content'>
                    <div><FontAwesomeIcon icon={faEuroSign}/> {itinerary.price}</div>
                    <div><FontAwesomeIcon icon={faClock}/> {itinerary.duration.$numberDecimal} Hour(s)</div>
                    <div><FontAwesomeIcon icon={faLocationArrow}/> {this.props.cityName}</div>
                </div>
            </div>
        );
    }
}

export default ItineraryCard;