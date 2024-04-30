import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './Profile.module.css';


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

            <ul className={styles.SavedEventList}>
                {events.map(event => (
                    <li className={styles.SavedEventItem} key={event.id}>
                        {event.eventName} | {event.eventDate}
                         <a href={event.eventUrl} target="_blank" rel="noopener noreferrer">More Details</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default SavedEvents;