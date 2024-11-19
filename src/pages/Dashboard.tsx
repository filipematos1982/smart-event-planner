import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [events, setEvents] = useState<{ name: string; date: string }[]>([]);
  const [filterDate, setFilterDate] = useState<string>('');
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    setEvents(savedEvents);
    setFilteredEvents(savedEvents); // Inicializa com todos os eventos.
  }, []);

  useEffect(() => {
    if (filterDate) {
      const filtered = events.filter((event) => event.date >= filterDate);
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [filterDate, events]);

  const deleteEvent = (index: number) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  return (
    <div className="dashboard">
      <h1>Upcoming Events</h1>
      <div className="filter-section">
        <label htmlFor="filterDate">Filter by Date:</label>
        <input
          type="date"
          id="filterDate"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>
      {filteredEvents.length > 0 ? (
        <ul>
          {filteredEvents.map((event, index) => (
            <li key={index} className="event-item">
              <strong>{event.name}</strong> - {event.date}
              <button onClick={() => deleteEvent(index)} className="delete-button">Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
};

export default Dashboard;
