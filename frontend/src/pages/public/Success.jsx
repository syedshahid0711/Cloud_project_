import { useLocation, useNavigate } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const registration = location.state?.registration;

  if (!registration) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">

        {/* Success Icon */}
        <div className="text-6xl mb-4">🎉</div>

        <h1 className="text-3xl font-bold text-green-600 mb-2">
          Registration Successful!
        </h1>

        <p className="text-gray-500 mb-8">
          You have successfully registered for the event.
        </p>

        {/* Registration Details */}
        <div className="bg-gray-50 rounded-xl p-6 text-left space-y-3 mb-8">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Registration ID:</span>
            <span className="font-bold text-blue-600">{registration.registrationId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Name:</span>
            <span className="font-semibold">{registration.fullName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Event:</span>
            <span className="font-semibold">{registration.eventName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Date:</span>
            <span className="font-semibold">{new Date(registration.eventDate).toDateString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Venue:</span>
            <span className="font-semibold">{registration.eventVenue}</span>
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-6">
          Please save your Registration ID for future reference.
        </p>

        <button
          onClick={() => navigate('/')}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Back to Home 🏠
        </button>
      </div>
    </div>
  );
};

export default Success;