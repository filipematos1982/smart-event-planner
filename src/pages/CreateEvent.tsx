import React, { useState } from 'react';
import Footer from '../components/Footer';
import './CreateEvent.css';

const CreateEvent: React.FC = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateEvent = () => {
    if (!eventName || !eventDate) {
      setMessage('Please fill out all fields.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    const newEvent = { name: eventName, date: eventDate };
    const savedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    const updatedEvents = [...savedEvents, newEvent];
    localStorage.setItem('events', JSON.stringify(updatedEvents));

    setEventName('');
    setEventDate('');
    setMessage('Event created successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="create-event">
      <h1>Create a New Event</h1>
      <div className="form">
        <label htmlFor="eventName">Event Name:</label>
        <input
          type="text"
          id="eventName"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />

        <label htmlFor="eventDate">Event Date:</label>
        <input
          type="date"
          id="eventDate"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />

        <button onClick={handleCreateEvent} className="create-button">
          Create Event
        </button>

        {message && <p className="feedback-message">{message}</p>}
      </div>

      <Footer />
    </div>
  );
};

export default CreateEvent;
