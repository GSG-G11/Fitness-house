import twilio from 'twilio';
// import CustomError from './CustomError';

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_MOBILE_NUMBER } = process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendSMS = (to: string, body: string) => {
  client.messages.create({
    body,
    to,
    from: TWILIO_MOBILE_NUMBER,
  });
};

export default sendSMS;
