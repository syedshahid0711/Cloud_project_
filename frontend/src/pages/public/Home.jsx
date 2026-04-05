import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';
import EventCard from '../../components/public/EventCard';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('/events');
        setEvents(res.data.events);
      } catch (err) {
        setError('Failed to load events. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-blue-700 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold">🎓 College Event Registration</h1>
        <p className="mt-3 text-blue-100 text-lg">
          Discover and register for exciting college events
        </p>
      </div>

      {/* Events Section */}
      <div className="max-w-6xl mx-auto px-6 py-12 flex-1">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          📅 Upcoming Events
        </h2>

        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading events...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-red-500">{error}</div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-5xl mb-4">📭</p>
            <p>No events available right now. Check back soon!</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;