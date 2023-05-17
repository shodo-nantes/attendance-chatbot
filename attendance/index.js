/**
 * Google Cloud Function that responds to messages sent in
 * Google Chat.
 *
 * @param {Object} req Request sent from Google Chat.
 * @param {Object} res Response to send back.
 */
exports.attendance = function attendance(req, res) {
  if (req.method === 'GET' || !req.body.message) {
    res.send('Hello! This function is meant to be used in a Google Chat ' +
      'Space.');
  }

  const message = req.body.message.text;
  const sender = req.body.message.sender.displayName;
  console.log("message : " + message)
  console.log("sender : " + sender)
  const data = createMessage(message, sender);

  res.send(data);
};

/**
 * Creates a card with two widgets.
 * @param {string} message the sender's display name.
 * @return {Object} a card with the user's avatar.
 */
function createMessage(message, sender) {
  let user = sender + " : "
    let result = user + compute(message);

  console.log("result : " + result)
    return { 'text' : result };
}

function compute(infoAttendance) {
    let attendance = infoAttendance.replace("@attendance-chatbot ", "")
        .replace("/attendance ", "")
    let pos = 0;
    let s = toto(attendance.charAt(pos++))
    let s1 = toto(attendance.charAt(pos++));
    let s2 = toto(attendance.charAt(pos++));
    let s3 = toto(attendance.charAt(pos++));
    let s4 = toto(attendance.charAt(pos++));
    return s + " | " + s1 + " | " + s2 + " | " + s3 + " | " + s4;
}


function isPresent(attendanceElement) {
    return attendanceElement === 'o' ||
                attendanceElement === 'O' ||
                attendanceElement === '0' ||
                attendanceElement === 'v' ||
                attendanceElement === 'V';
}

function toto(attendanceElement) {

  console.log("element : " + attendanceElement)
    return isPresent(attendanceElement) ? "✅" :
        attendanceElement === '?' ? "❓" : "❌";
}
