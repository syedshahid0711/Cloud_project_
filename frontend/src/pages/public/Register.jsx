import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from '../../api/axios';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    yearOfStudy: '',
    eventId: searchParams.get('eventId') || '',
    specialRequirements: ''
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('/events');
        setEvents(res.data.events);
      } catch (err) {
        setError('Failed to load events');
      }
    };
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/register', form);
      navigate('/success', { state: { registration: res.data.registration } });
    } catch (err) {
      setError(err.response?.data?.message || '❌ Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="max-w-2xl mx-auto w-full px-6 py-12 flex-1">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📝 Event Registration</h1>
        <p className="text-gray-500 mb-8">Fill in your details to register for an event</p>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 space-y-5">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
            <input
              type="text"
              name="department"
              value={form.department}
              onChange={handleChange}
              required
              placeholder="e.g. Computer Science"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Year of Study */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year of Study *</label>
            <select
              name="yearOfStudy"
              value={form.yearOfStudy}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          {/* Event */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Event *</label>
  {searchParams.get('eventId') ? (
    // If coming from event card - show event name as read only
    <div className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2 text-sm text-gray-700 font-medium">
      ✅ {searchParams.get('eventName') ? decodeURIComponent(searchParams.get('eventName')) : 'Selected Event'}
    </div>
  ) : (
    // If coming directly to register page - show dropdown
    <select
      name="eventId"
      value={form.eventId}
      onChange={handleChange}
      required
      className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Choose an event</option>
      {events.map(event => (
        <option key={event._id} value={event._id}>
          {event.name || event.title}
        </option>
      ))}
    </select>
  )}
</div>

          {/* Special Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Any Query (Optional)</label>
            <textarea
              name="specialRequirements"
              value={form.specialRequirements}
              onChange={handleChange}
              placeholder="Any queries or questions about the event"
              rows={3}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register Now 🚀'}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Register;