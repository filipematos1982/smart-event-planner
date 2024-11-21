import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [events, setEvents] = useState<{ name: string; date: string }[]>([]);
  const [filterDate, setFilterDate] = useState<string>('');
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>('');
  const [editDate, setEditDate] = useState<string>('');

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    setEvents(savedEvents);
    setFilteredEvents(savedEvents);
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
    setFilteredEvents(updatedEvents);
  };

  const startEditEvent = (index: number) => {
    setEditIndex(index);
    setEditName(events[index].name);
    setEditDate(events[index].date);
  };

  const saveEditEvent = () => {
    if (editIndex !== null) {
      const updatedEvents = [...events];
      updatedEvents[editIndex] = { name: editName, date: editDate };
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      setFilteredEvents(updatedEvents);
      setEditIndex(null);
      setEditName('');
      setEditDate('');
    }
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

      {editIndex !== null && (
        <div className="edit-section">
          <h2>Edit Event</h2>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Event Name"
          />
          <input
            type="date"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
          />
          <button onClick={saveEditEvent} className="save-button">
            Save
          </button>
          <button onClick={() => setEditIndex(null)} className="cancel-button">
            Cancel
          </button>
        </div>
      )}

      {filteredEvents.length > 0 ? (
        <ul>
          {filteredEvents.map((event, index) => (
            <li key={index} className="event-item">
              <strong>{event.name}</strong> - {event.date}
              <div>
                <button
                  onClick={() => startEditEvent(index)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEvent(index)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events available.</p>
      )}

      <Footer />
    </div>
  );
};

export default Dashboard;
