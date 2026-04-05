import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import Sidebar from '../../components/admin/Sidebar';

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('/events');
      setEvents(res.data.events);
    } catch (err) {
      console.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await axios.delete(`/admin/events/${id}`);
      fetchEvents();
    } catch (err) {
      alert('Failed to delete event');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8 overflow-x-hidden min-w-0 pt-16 md:pt-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">📅 Manage Events</h1>
          <button
            onClick={() => navigate('/admin/events/add')}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
          >
            + Add New Event
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
  <div className="overflow-x-auto">
  <table className="w-full text-sm min-w-[700px]">
              <thead className="bg-gray-50 border-b">
                <tr className="text-left text-gray-500">
                  <th className="px-6 py-4">Event Name</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Venue</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Capacity</th>
                  <th className="px-6 py-4">Seats Left</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-gray-400">
                      No events found. Add your first event!
                    </td>
                  </tr>
                ) : (
                  events.map(event => (
                    <tr key={event._id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{event.name || event.title}</td>
                      <td className="px-6 py-4">{new Date(event.date).toDateString()}</td>
                      <td className="px-6 py-4">{event.venue}</td>
                      <td className="px-6 py-4">{event.category || 'Other'}</td>
                      <td className="px-6 py-4">{event.capacity}</td>
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${
                          (event.seatsLeft ?? event.capacity - (event.registrations || 0)) <= 0
                            ? 'text-red-500'
                            : 'text-green-600'
                        }`}>
                          {event.seatsLeft ?? event.capacity - (event.registrations || 0)}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => navigate(`/admin/events/edit/${event._id}`)}
                          className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-yellow-200 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(event._id)}
                          className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-red-200 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;