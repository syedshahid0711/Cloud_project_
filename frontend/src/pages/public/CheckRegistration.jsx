import { useState } from 'react';
import axios from '../../api/axios';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';

const CheckRegistration = () => {
  const [email, setEmail] = useState('');
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const res = await axios.get(`/register/check/${email}`);
      setRegistrations(res.data.registrations);
    } catch (err) {
      setError(err.response?.data?.message || 'No registrations found');
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="max-w-3xl mx-auto w-full px-6 py-12 flex-1">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🔍 Check My Registrations</h1>
        <p className="text-gray-500 mb-8">Enter your email to view all your event registrations</p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex gap-3 mb-8">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email address"
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Error */}
        {error && searched && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Results */}
        {registrations.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">{registrations.length} registration(s) found</p>
            {registrations.map((reg) => (
              <div key={reg._id} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{reg.eventName}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Registered on {new Date(reg.registeredAt).toDateString()}
                    </p>
                  </div>
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                    {reg.registrationId}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CheckRegistration;