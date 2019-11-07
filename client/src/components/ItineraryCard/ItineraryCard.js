import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEuroSign, faClock, faLocationArrow, faChevronDown, faHeart} from "@fortawesome/free-solid-svg-icons";
import Activities from "../Activities/Activities";
import './ItineraryCard.css';
import {connect} from "react-redux";
import {favoriteItinerary, unfavoriteItinerary} from "../../actions";

class ItineraryCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showActivities: false
        };
    }

    toggleActivities = () => {
        const {showActivities} = this.state;
        this.setState({
            showActivities: !showActivities
        });
    };

    favoriteItinerary = itineraryId => {
        this.props.favoriteItinerary(itineraryId, this.props.loggedInUser.token);
    };

    unfavoriteItinerary = itineraryId => {
        this.props.unfavoriteItinerary(itineraryId, this.props.loggedInUser.token);
    };

    render() {
        const itinerary = this.props.itinerary;
        const loggedInUser = this.props.loggedInUser;
        const isFavorited = loggedInUser ? this.props.loggedInUser.favoriteItineraries.find(favoritedItinerary => {
            return favoritedItinerary._id === itinerary._id
        }) : false;
        return (
            <div className='itinerary-card-container'>
                <div className='itinerary-bg'>
                    <div className='itinerary-title'>
                        <div className='itinerary-title-child'>{itinerary.title}</div>
                        {
                            this.props.loggedInUser &&
                            <div className='itinerary-title-favorite'>
                                {
                                    isFavorited ? (
                                        <FontAwesomeIcon
                                            className="itinerary-icon favorited"
                                            icon={faHeart}
                                            onClick={() => this.unfavoriteItinerary(itinerary._id)}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            className="itinerary-icon"
                                            icon={faHeart}
                                            onClick={() => this.favoriteItinerary(itinerary._id)}
                                        />
                                    )
                                }
                            </div>
                        }
                    </div>
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
                    <div><FontAwesomeIcon icon={faLocationArrow}/> {itinerary.city.name}</div>
                </div>

                <div className='activities-wrapper'>
                    <button className='activities-button' onClick={this.toggleActivities}>See Details <FontAwesomeIcon
                        icon={faChevronDown}/></button>
                    {this.state.showActivities ? <Activities activities={itinerary.activities}/> : null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {loggedInUser: state.users.loggedInUser};
};

const mapDispatchToProps = dispatch => ({
    favoriteItinerary: (itineraryId, token) => dispatch(favoriteItinerary(itineraryId, token)),
    unfavoriteItinerary: (itineraryId, token) => dispatch(unfavoriteItinerary(itineraryId, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryCard);