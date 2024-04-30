import React, { useState, useEffect } from "react";
import axios from "axios";


const SavedEvents = ({ user }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/getEvents/${user.id}`);
                setEvents(response.data.events);
            } catch (error) {
                console.error('Failed to get events:', error.response ? error.response.data : 'No response');
            }
        }
        fetchEvents();
    }, [user.id]);

    return(
        <div>
            <h2>Saved Events</h2>
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        {event.eventName} - {event.eventDate}
                        <a href='#'> Implement link to event </a>
                    </li>
                    
                ))}
            </ul>
        </div>
    );
}


export default SavedEvents;