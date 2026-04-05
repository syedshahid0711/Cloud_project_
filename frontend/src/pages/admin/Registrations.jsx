import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios from '../../api/axios';
import Sidebar from '../../components/admin/Sidebar';

const Registrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [regRes, eventRes] = await Promise.all([
          axios.get('/admin/registrations'),
          axios.get('/events')
        ]);
        setRegistrations(regRes.data.registrations);
        setEvents(eventRes.data.events);
      } catch (err) {
        console.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter registrations based on active tab and search
  const getFilteredRegistrations = () => {
    let filtered = registrations;

    // Filter by event tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(reg => reg.eventName === activeTab);
    }

    // Filter by search
    if (search) {
      filtered = filtered.filter(reg =>
        reg.fullName.toLowerCase().includes(search.toLowerCase()) ||
        reg.email.toLowerCase().includes(search.toLowerCase()) ||
        reg.registrationId.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  };

  // Get registration count for each event
  const getEventCount = (eventName) => {
    return registrations.filter(reg => reg.eventName === eventName).length;
  };

  // Export to Excel
  const exportToExcel = (data, filename) => {
    const exportData = data.map(reg => ({
      'Registration ID': reg.registrationId,
      'Full Name': reg.fullName,
      'Email': reg.email,
      'Phone': reg.phone,
      'Department': reg.department,
      'Year of Study': reg.yearOfStudy,
      'Event Name': reg.eventName,
      'Any Query': reg.specialRequirements || 'N/A',
      'Registered On': new Date(reg.registeredAt).toDateString()
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();

    // Set column widths
    worksheet['!cols'] = [
      { wch: 20 }, // Registration ID
      { wch: 20 }, // Full Name
      { wch: 25 }, // Email
      { wch: 15 }, // Phone
      { wch: 20 }, // Department
      { wch: 12 }, // Year
      { wch: 20 }, // Event
      { wch: 25 }, // Query
      { wch: 20 }, // Date
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${filename}.xlsx`);
  };

  const handleExportAll = () => {
    exportToExcel(registrations, 'All-Registrations');
  };

  const handleExportEvent = (eventName) => {
    const eventRegs = registrations.filter(reg => reg.eventName === eventName);
    exportToExcel(eventRegs, `${eventName}-Registrations`);
  };

  const filteredRegistrations = getFilteredRegistrations();

  // Get unique event names from registrations
  const eventTabs = [...new Set(registrations.map(reg => reg.eventName))];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8 overflow-x-hidden min-w-0 pt-16 md:pt-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">👥 Registrations</h1>
            <p className="text-gray-500 text-sm mt-1">
              Total: {registrations.length} registrations across {eventTabs.length} events
            </p>
          </div>
          <button
            onClick={handleExportAll}
            className="bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition"
          >
            📥 Export All to Excel
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <>
            {/* Event Tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {/* All Tab */}
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition
                  ${activeTab === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
              >
                All ({registrations.length})
              </button>

              {/* One tab per event */}
              {eventTabs.map(eventName => (
                <button
                  key={eventName}
                  onClick={() => setActiveTab(eventName)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition
                    ${activeTab === eventName
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                >
                  {eventName} ({getEventCount(eventName)})
                </button>
              ))}
            </div>

            {/* Search + Event Export */}
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email or registration ID..."
                className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {activeTab !== 'all' && (
                <button
                  onClick={() => handleExportEvent(activeTab)}
                  className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition whitespace-nowrap"
                >
                  📥 Export {activeTab} to Excel
                </button>
              )}
            </div>

            {/* Registrations Table */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              {filteredRegistrations.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <p className="text-4xl mb-3">📭</p>
                  <p>No registrations found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                      <tr className="text-left text-gray-500">
                        <th className="px-6 py-4">Reg ID</th>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Phone</th>
                        <th className="px-6 py-4">Department</th>
                        <th className="px-6 py-4">Year</th>
                        <th className="px-6 py-4">Event</th>
                        <th className="px-6 py-4">Any Query</th>
                        <th className="px-6 py-4">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRegistrations.map(reg => (
                        <tr key={reg._id} className="border-b last:border-0 hover:bg-gray-50">
                          <td className="px-6 py-4 text-blue-600 font-medium whitespace-nowrap">
                            {reg.registrationId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{reg.fullName}</td>
                          <td className="px-6 py-4">{reg.email}</td>
                          <td className="px-6 py-4">{reg.phone}</td>
                          <td className="px-6 py-4">{reg.department}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{reg.yearOfStudy}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs font-semibold">
                              {reg.eventName}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {reg.specialRequirements || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(reg.registeredAt).toDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Summary Cards per Event */}
            {activeTab === 'all' && eventTabs.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold text-gray-800 mb-4">📊 Event Summary</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {eventTabs.map(eventName => (
                    <div key={eventName} className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
                      <h3 className="font-bold text-gray-800">{eventName}</h3>
                      <p className="text-3xl font-bold text-blue-600 mt-2">
                        {getEventCount(eventName)}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">registrations</p>
                      <button
                        onClick={() => {
                          setActiveTab(eventName);
                          window.scrollTo(0, 0);
                        }}
                        className="mt-3 text-blue-600 text-xs font-semibold hover:underline"
                      >
                        View Details →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Registrations;