import React, { useEffect, useState } from 'react';
import { getEvents } from '../../api/ticketmaster';
import './EventList.css';
import Cookies from 'js-cookie';


// Helper function to check if a user is logged in
const isLoggedIn = () => {
  const loggedIn = Cookies.get('userId'); // Check for the cookie named 'loggedIn' and its value
  return loggedIn;
};

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('Chapel Hill'); // Default location set
  const [type, setType] = useState(''); // Default type, empty means all types
  const loggedIn = isLoggedIn(); // Check login status once on component mount

  if (loggedIn != null) {
    console.log("logged in");
    console.log(loggedIn)
  } else {
    console.log("not logged in")
  }

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

    // Function to handle adding an event to saved events
    const addToSavedEvents = (event) => {
      // Logic for adding event to saved events (e.g., API call or local storage update)
      console.log('Adding to saved events:', event.name);
    };

  return (
    <div >
        <div className="event-header-container">
      <h1>Events in {location}</h1>
    </div>
      <div className="event-search-container">
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
              {/* Add button to save event if the user is logged in */}
              {loggedIn && (
                <button className="add-to-saved-button" onClick={() => addToSavedEvents(event)}>Add to Saved Events</button>
              )}
            </div>
          )) : <p>No events found!</p>}
        </div>
      )}
    </div>
  );
};

export default EventList;
