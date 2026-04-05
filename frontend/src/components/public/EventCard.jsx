import { useNavigate } from 'react-router-dom';

const categoryColors = {
  Technical: 'bg-blue-100 text-blue-700',
  Cultural: 'bg-pink-100 text-pink-700',
  Workshop: 'bg-green-100 text-green-700',
  Sports: 'bg-orange-100 text-orange-700',
  Other: 'bg-gray-100 text-gray-700',
};

const categoryIcons = {
  Technical: '💻',
  Cultural: '🎭',
  Workshop: '🛠️',
  Sports: '⚽',
  Other: '🎯',
};

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const eventName = event.name || event.title || 'Unknown Event';
  const category = event.category || 'Other';
  const seatsLeft = event.seatsLeft !== undefined
    ? event.seatsLeft
    : event.capacity - (event.registrations || 0);
  const isFull = seatsLeft <= 0;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
      {/* Top Color Bar */}
      <div className="h-2 bg-blue-600" />

      <div className="p-6">
        {/* Category Badge */}
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[category]}`}>
          {categoryIcons[category]} {category}
        </span>

        {/* Event Name */}
        <h2 className="text-xl font-bold text-gray-800 mt-3">{eventName}</h2>

        {/* Description */}
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">{event.description}</p>

        {/* Details */}
        <div className="mt-4 space-y-1 text-sm text-gray-600">
          <p>📅 {new Date(event.date).toDateString()}</p>
          <p>📍 {event.venue}</p>
          <p>👥 Capacity: {event.capacity}</p>
          <p className={isFull ? 'text-red-500 font-semibold' : 'text-green-600 font-semibold'}>
            {isFull ? '❌ Event Full' : `✅ ${seatsLeft} seats left`}
          </p>
        </div>

        {/* Register Button */}
        <button
          onClick={() => !isFull && navigate(`/register?eventId=${event._id}&eventName=${eventName}`)}
          disabled={isFull}
          className={`mt-5 w-full py-2 rounded-xl font-semibold text-sm transition
            ${isFull
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
            }`}
        >
          {isFull ? 'Event Full' : 'Register Now →'}
        </button>
      </div>
    </div>
  );
};

export default EventCard;