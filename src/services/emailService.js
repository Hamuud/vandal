import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMPT_HOST,
  port: process.env.SMPT_PORT,
  secure: true,
  auth: {
    user: process.env.SMPT_USER,
    pass: process.env.SMPT_PASSWORD
  }
});

export function send({ email, subject, html }) {
  return transporter.sendMail({
    from: 'Auth API For Vandal',
    to: email,
    subject,
    text: '',
    html,
  });
}

export function sendActivationLink(email, token) {
  const link = `${process.env.CLIENT_URL}/activate/${token}`;
  
  return send({
    email,
    subject: 'Account activation For Vandal Test',
    html: `
      <h1>Account activation</h1>
      <a href="${link}">${link}</a>
    `
  });
}

export const emailService = {send, sendActivationLink };