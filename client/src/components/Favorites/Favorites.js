import React, {Component} from 'react';
import {connect} from "react-redux";
import ItineraryCard from "../ItineraryCard/ItineraryCard";
import {Redirect} from "react-router-dom";

class Favorites extends Component {
    render() {
        if(!this.props.loggedInUser) {
            return (
                <Redirect to='/login' />
            )
        }
        const favoriteItineraries = this.props.loggedInUser.favoriteItineraries;
        if(!favoriteItineraries || favoriteItineraries.length === 0) {
            return (
                <div>No favorites :(</div>
            )
        }
        return (
            <div>
                {
                    favoriteItineraries.map(itinerary => {
                        return (
                            <ItineraryCard key={itinerary._id} itinerary={itinerary} />
                        )
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.users.isLoading,
        loggedInUser: state.users.loggedInUser,
    };
};

export default connect(mapStateToProps, null)(Favorites);