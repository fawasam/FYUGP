import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.DEV_EMAIL_HOST,
    port: process.env.DEV_EMAIL_PORT,
    auth: {
      user: process.env.DEV_EMAIL_USER,
      pass: process.env.DEV_EMAIL_PASSWORD,
    },
  });

  const emailOptions = {
    from: `Cineflix support<support@cineflix.com>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(emailOptions);
};

export default sendEmail;
