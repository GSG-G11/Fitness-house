import twilio from 'twilio';
import CustomError from './CustomError';

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendSMS = async (to: string, body: string) => {
  try {
    await client.messages.create({
      body,
      to,
      from: '+18645236605',
    });
  } catch (err: any) {
    throw new CustomError('عذرا هناك خطأ', 500);
  }
};

export default sendSMS;
