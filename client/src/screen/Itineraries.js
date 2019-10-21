import React, {Component} from 'react';

class Itineraries extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.match.params.cityId}</h1>
            </div>
        );
    }
}

export default Itineraries;