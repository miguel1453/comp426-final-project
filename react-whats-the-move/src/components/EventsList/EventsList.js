import React, { useEffect, useState } from 'react';
import { getEvents } from '../api/ticketmaster';
import './EventList.css';


const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('Chapel Hill'); // Default location set
  const [type, setType] = useState(''); // Default type, empty means all types

  // Function to fetch events based on current state
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const fetchedEvents = await getEvents({ city: location, classificationName: type });
      setEvents(fetchedEvents);
      setError(null);
    } catch (err) {
      setError('Error fetching events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to load Chapel Hill events on component mount
  useEffect(() => {
    fetchEvents();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <h1>Events in {location}</h1>
      <div>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
        />
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Enter event type"
        />
        <button onClick={fetchEvents}>Update Events</button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="event-cards">
          {events.length > 0 ? events.map((event) => (
            <div className="event-card" key={event.id}>
              <img src={event.images[0].url} alt={event.name} className="event-image" />
              <h2>{event.name}</h2>
              <p>{event.dates.start.localDate} at {event._embedded?.venues[0].name}</p>
              <a href={event.url} target="_blank" rel="noopener noreferrer">More Details</a>
            </div>
          )) : <p>No events found!</p>}
        </div>
      )}
    </div>
  );
};

export default EventList;
