import * as nodemailer from 'nodemailer';

async function sendEmail(to: string, subject: string, html: string) {
  try {
    const { MAIL_HOST, MAIL_USER, MAIL_PASS } = process.env;

    const transport = nodemailer.createTransport({
      host: MAIL_HOST,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    });

    await transport.sendMail({
      from: MAIL_USER,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.log(error);
  }
}

export default sendEmail;
