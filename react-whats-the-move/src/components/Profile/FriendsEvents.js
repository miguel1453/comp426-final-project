import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './FriendsEvents.module.css'; 

const FriendsEvents = ({ user }) => {
    const [friendEvents, setFriendEvents] = useState([]);

    useEffect(() => {
        const fetchFriendEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/getFriendsEvents/${user.id}`);
                setFriendEvents(response.data.events);
            } catch (error) {
                console.error('Failed to get friend events:', error.response ? error.response.data : 'No response');
            }
        }
        fetchFriendEvents();
    }, [user.id]);

    return(
        <div>
            <h2>Friend's Events</h2>
            <ul className={styles.FriendEvents}>
                {friendEvents.map(user => (
                    <li className={styles.FriendCard} key={user.username}>
                        <h2>{user.username}</h2>
                        { user.events.length === 0 ? <p>No events saved yet</p> : 
                            ( user.events.map(event => {
                                
                                return(
                                    <div className={styles.EventBox} key={event.eventId}>
                                        <h3>{event.eventName} - {event.eventDate}</h3>
                                        <a href='#'> Implement link to event </a>
                                    </div>
                                );
                            }))
                        
                         }
                    </li>
                    
                ))}
            </ul>
        </div>
    );
}

export default FriendsEvents;