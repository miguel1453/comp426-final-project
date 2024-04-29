import React, { useEffect, useState } from 'react';
import { getEvents } from '../../api/eventbrite';

const EventList = () => {
    const [events, setEvents] = useState([]);
  
    useEffect(() => {
      const fetchEvents = async () => {
        const events = await getEvents('Chapel Hill');
        setEvents(events);
      };
  
      fetchEvents();
    }, []);
  
    return (
      <div>
        <h1>Events in Chapel Hill</h1>
        {events && events.length > 0 ? (
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                <h2>{event.name}</h2>
                <p>{event.dates.start.localDate} at {event._embedded && event._embedded.venues[0].name}</p>
                <a href={event.url} target="_blank" rel="noopener noreferrer">More Details</a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events found!</p>
        )}
      </div>
    );
  };

export default EventList