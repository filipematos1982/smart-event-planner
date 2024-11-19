import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './Dashboard.css';

Modal.setAppElement('#root'); // Garante acessibilidade do modal

const Dashboard: React.FC = () => {
  const [events, setEvents] = useState<{ name: string; date: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editDate, setEditDate] = useState('');

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    setEvents(savedEvents);
  }, []);

  const deleteEvent = (index: number) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  const openEditModal = (index: number) => {
    setEditIndex(index);
    setEditName(events[index].name);
    setEditDate(events[index].date);
    setIsModalOpen(true);
  };

  const handleEditSubmit = () => {
    if (editIndex !== null) {
      const updatedEvents = events.map((event, i) =>
        i === editIndex ? { name: editName, date: editDate } : event
      );
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      setIsModalOpen(false);
    }
  };

  return (
    <div className="dashboard">
      <h1>Upcoming Events</h1>
      {events.length > 0 ? (
        <ul>
          {events.map((event, index) => (
            <li key={index} className="event-item">
              <strong>{event.name}</strong> - {event.date}
              <div>
                <button onClick={() => openEditModal(index)} className="edit-button">Edit</button>
                <button onClick={() => deleteEvent(index)} className="delete-button">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events available.</p>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Event"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Edit Event</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Event Name:
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              required
            />
          </label>
          <label>
            Event Date:
            <input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
              required
            />
          </label>
          <div className="modal-buttons">
            <button onClick={handleEditSubmit} className="save-button">Save</button>
            <button onClick={() => setIsModalOpen(false)} className="cancel-button">Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Dashboard;
