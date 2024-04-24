import axios from 'axios';

const API_KEY = 'VVSxdfHqHqIUXszfDgQEDdOA9J9cLnz7'; // Replace with your actual API key
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

const getEvents = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}events.json`, {
      params: {
        apikey: API_KEY,
        city: city,
        countryCode: 'US'
      }
    });
    return response.data._embedded.events;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export { getEvents };
