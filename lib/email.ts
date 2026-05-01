import nodemailer from 'nodemailer';

function createTransport() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const to = process.env.NOTIFY_EMAIL ?? 'bhurtelumesh2@gmail.com';

  // Skip email sending if credentials are not set up yet
  if (!process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASSWORD === 'your-16-char-app-password-here') {
    console.log('[email] Skipped — GMAIL_APP_PASSWORD not configured. Form was saved to DB.');
    return;
  }

  const transporter = createTransport();

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
    to,
    replyTo: data.email,
    subject: `[Portfolio] New message from ${data.name}: ${data.subject || '(no subject)'}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;background:#f9f9f9;padding:24px;border-radius:8px;">
        <h2 style="color:#0a0a0f;margin-top:0">New Contact Form Submission</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#555;font-size:13px;width:80px;">Name</td><td style="padding:8px 0;font-weight:600;">${data.name}</td></tr>
          <tr><td style="padding:8px 0;color:#555;font-size:13px;">Email</td><td style="padding:8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#555;font-size:13px;">Subject</td><td style="padding:8px 0;">${data.subject || '—'}</td></tr>
        </table>
        <div style="margin-top:16px;background:#fff;padding:16px;border-radius:6px;border:1px solid #e5e7eb;">
          <p style="margin:0;white-space:pre-wrap;font-size:14px;line-height:1.7;">${data.message}</p>
        </div>
        <p style="margin-top:16px;font-size:12px;color:#999;">Sent from umeshbhurtel.com portfolio contact form.</p>
      </div>
    `,
  });
}
