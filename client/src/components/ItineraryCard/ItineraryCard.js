import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEuroSign, faClock, faLocationArrow, faChevronDown} from "@fortawesome/free-solid-svg-icons";
import Activities from "../Activities/Activities";

import './ItineraryCard.css';

class ItineraryCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showActivities: false
        };
    }

    toggleActivities = () => {
        const { showActivities } = this.state;
        this.setState({
            showActivities: !showActivities
        });
    };

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

                <div className='itinerary-image'>
                    <img src={itinerary.img} alt="it broke"/>
                </div>

                <div className='itinerary-content'>
                    <div><FontAwesomeIcon icon={faEuroSign}/> {itinerary.price}</div>
                    <div><FontAwesomeIcon icon={faClock}/> {itinerary.duration.$numberDecimal} Hour(s)</div>
                    <div><FontAwesomeIcon icon={faLocationArrow}/> {this.props.cityName}</div>
                </div>

                <div className='activities-wrapper'>
                    <button className='activities-button' onClick={this.toggleActivities}>See Details <FontAwesomeIcon icon={faChevronDown}/></button>
                    {this.state.showActivities ? <Activities activities={itinerary.activities}/> : null}
                </div>
            </div>
        );
    }
}

export default ItineraryCard;