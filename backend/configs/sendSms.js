const sendSmsForVerification = (userMobile, otp) => {
  return new Promise((resolve, reject) => {
    try {
      const accountSid = process.env.TWILIO_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const senderMobile = process.env.TWILIO_MOBILE_NUMBER;
      const client = require("twilio")(accountSid, authToken);
      //   client.lookups.v1
      // .phoneNumbers("+919599137085")
      //     .fetch({ type: ["carrier"] })
      //     .then((phone_number) => console.log(phone_number.carrier));

      client.messages
        .create({
          body: `Your otp is ${otp}`,
          // to: userMobile, // Text your number
          to: "+919599137085", // Text your number
          from: senderMobile, // From a valid Twilio number
        })
        .then((message) => {
          console.log(message.sid);
          resolve(message.sid); // Resolve the promise if message sent successfully
        })
        .catch((error) => {
          console.error("Error sending SMS:", error);
          reject(error); // Reject the promise if there's an error
        });
    } catch (error) {
      console.error("Error sending SMS:", error);
      reject(error); // Reject the promise if there's an error
    }
  });
};

module.exports = {
  sendSmsForVerification,
};
