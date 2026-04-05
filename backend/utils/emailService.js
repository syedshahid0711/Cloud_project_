const sendConfirmationEmail = async (studentEmail, studentName, eventName, registrationId, eventDate, eventVenue) => {
  console.log(`✅ Registration confirmed for ${studentName} - ${eventName} - ID: ${registrationId}`);
  return true;
};

module.exports = sendConfirmationEmail;