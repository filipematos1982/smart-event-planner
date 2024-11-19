import React, { useState } from 'react';
import './CreateEvent.css'; // Estilizar o formulário

const CreateEvent: React.FC = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!eventName.trim()) {
      alert("Event Name is required!");
      return;
    }
  
    if (!eventDate) {
      alert("Event Date is required!");
      return;
    }

    const newEvent = { name: eventName, date: eventDate };
    const existingEvents = JSON.parse(localStorage.getItem('events') || '[]');
    localStorage.setItem('events', JSON.stringify([...existingEvents, newEvent]));

    alert(`Event Created: ${eventName} on ${eventDate}`);
    setEventName('');
    setEventDate('');
  };

  return (
    <div className="create-event">
      <h1>Create a New Event</h1>
      <form onSubmit={handleSubmit}>
        <label>Event Name:</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <label>Event Date:</label>
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
