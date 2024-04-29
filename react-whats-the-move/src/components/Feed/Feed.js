import React from 'react';
import PropTypes from 'prop-types';
import styles from './Feed.module.css';
import EventsList from '../EventsList/EventsList';

const Feed = () => (
  <div className={styles.Feed}>
    <EventsList />
  </div>
);


export default Feed;
