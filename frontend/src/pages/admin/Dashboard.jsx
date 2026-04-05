import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Sidebar from '../../components/admin/Sidebar';

const StatCard = ({ title, value, icon, color }) => (
  <div className={`bg-white rounded-2xl shadow-md p-6 border-l-4 ${color}`}>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
      <span className="text-4xl">{icon}</span>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/admin/stats');
        setStats(res.data.stats);
      } catch (err) {
        console.error('Failed to load stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
  <Sidebar />
  <div className="flex-1 p-4 md:p-8 overflow-x-hidden min-w-0 pt-16 md:pt-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">📊 Dashboard</h1>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <StatCard title="Total Events" value={stats?.totalEvents || 0} icon="📅" color="border-blue-500" />
              <StatCard title="Total Registrations" value={stats?.totalRegistrations || 0} icon="👥" color="border-green-500" />
              <StatCard title="Today's Registrations" value={stats?.todayRegistrations || 0} icon="🆕" color="border-yellow-500" />
              <StatCard title="Most Popular" value={stats?.mostPopularEvent || 'N/A'} icon="🏆" color="border-purple-500" />
            </div>

            {/* Recent Registrations */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">🕐 Recent Registrations</h2>
              {stats?.recentRegistrations?.length === 0 ? (
                <p className="text-gray-400 text-sm">No registrations yet</p>
              ) : (
                <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[600px]">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="pb-3">Reg ID</th>
                      <th className="pb-3">Name</th>
                      <th className="pb-3">Email</th>
                      <th className="pb-3">Event</th>
                      <th className="pb-3">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats?.recentRegistrations?.map(reg => (
                      <tr key={reg._id} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="py-3 text-blue-600 font-medium">{reg.registrationId}</td>
                        <td className="py-3">{reg.fullName}</td>
                        <td className="py-3">{reg.email}</td>
                        <td className="py-3">{reg.eventName}</td>
                        <td className="py-3">{new Date(reg.registeredAt).toDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;