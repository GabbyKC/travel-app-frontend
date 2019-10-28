import React, {Component} from 'react';
import './Activities.css';

class Activities extends Component {
    render() {
        const activities = this.props.activities;

        if (!activities || activities.length === 0) {
            return (<p>Nadda for ya bro</p>)
        }

        return (
            <div>
                {activities.map((activity, index) => {
                    return (
                        <div key={index} className='activities-content'>
                            <p className='activities-title'>{activity.title}</p>
                            <p>{activity.description}</p>
                        </div>)
                })}
            </div>
        );
    }
}

export default Activities;