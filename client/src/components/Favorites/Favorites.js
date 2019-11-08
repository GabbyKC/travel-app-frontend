import React, {Component} from 'react';
import {connect} from "react-redux";
import ItineraryCard from "../ItineraryCard/ItineraryCard";
import {Link, Redirect} from "react-router-dom";
import AppLogo from "../AppLogo/AppLogo";
import SideMenu from "../SideMenu/SideMenu";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import Footer from "../Footer/Footer";

class Favorites extends Component {
    render() {
        if (!this.props.loggedInUser) {
            return (
                <Redirect to='/login'/>
            )
        }
        let body;
        let favoriteItineraries = this.props.loggedInUser.favoriteItineraries;
        if (!favoriteItineraries) {
            body = <div>
                {
                    this.props.errorMessages.map((errorMessage, index) => {
                        return (
                            <div key={index}>{errorMessage}</div>
                        )
                    })
                }
            </div>
        }

        if (favoriteItineraries.length === 0) {
            body = (
                <div className='no-favorites'>You have not favorited any Itineraries yet.</div>
            )
        } else {
            body = favoriteItineraries.map(itinerary => {
                return (
                    <ItineraryCard key={itinerary._id} itinerary={itinerary}/>
                )
            })
        }
        return (
            <div className='cities-wrapper'>
                <AppLogo/>
                {
                    this.props.loggedInUser &&
                    <SideMenu/>
                }
                <div className='back-arrow'>
                    <Link to={{pathname: '/cities'}}>
                        <FontAwesomeIcon icon={faChevronLeft}/>
                    </Link>
                </div>
                {body}
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.users.isLoading,
        errorMessages: state.users.errorMessages,
        loggedInUser: state.users.loggedInUser,
    };
};

export default connect(mapStateToProps, null)(Favorites);