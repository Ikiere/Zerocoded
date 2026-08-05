import nodemailer from 'nodemailer';

const requiredVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
for (const v of requiredVars) {
  if (!process.env[v]) {
    console.warn(`Warning: Missing environment variable ${v}. Email sending will be disabled.`);
  }
}

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const EMAIL_FROM = process.env.EMAIL_FROM || 'Zerocoded <hello@zerocoded.com>';
export const EMAIL_TO = process.env.EMAIL_TO || 'hello@zerocoded.com';

export async function sendContactEmail(data: {
  name: string;
  email: string;
  projectType: string;
  message: string;
}): Promise<void> {
  await transporter.sendMail({
    from: EMAIL_FROM,
    to: EMAIL_TO,
    replyTo: data.email,
    subject: `New Contact Message from ${data.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:600">Name</td><td style="padding:8px;border:1px solid #e5e7eb">${data.name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:600">Email</td><td style="padding:8px;border:1px solid #e5e7eb">${data.email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:600">Project Type</td><td style="padding:8px;border:1px solid #e5e7eb">${data.projectType}</td></tr>
        <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:600">Message</td><td style="padding:8px;border:1px solid #e5e7eb">${data.message}</td></tr>
      </table>
    `,
  });
}

export async function sendQuoteEmail(data: {
  name: string;
  company: string;
  email: string;
  phone: string;
  budget: string;
  projectType: string;
  timeline: string;
  description: string;
}): Promise<void> {
  await transporter.sendMail({
    from: EMAIL_FROM,
    to: EMAIL_TO,
    replyTo: data.email,
    subject: `New Quote Request from ${data.name} — ${data.company}`,
    html: `
      <h2>New Quote Request</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:600">Name</td><td style="padding:8px;border:1px solid #e5e7eb">${data.name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:600">Company</td><td style="padding:8px;border:1px solid #e5e7eb">${data.company}</td></tr>
        <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:600">Email</td><td style="padding:8px;border:1px solid #e5e7eb">${data.email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:600">Phone</td><td style="padding:8px;border:1px solid #e5e7eb">${data.phone}</td></tr>
        <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:600">Budget</td><td style="padding:8px;border:1px solid #e5e7eb">${data.budget}</td></tr>
        <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:600">Project Type</td><td style="padding:8px;border:1px solid #e5e7eb">${data.projectType}</td></tr>
        <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:600">Timeline</td><td style="padding:8px;border:1px solid #e5e7eb">${data.timeline}</td></tr>
        <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:600">Description</td><td style="padding:8px;border:1px solid #e5e7eb">${data.description}</td></tr>
      </table>
    `,
  });
}

export async function sendNewsletterConfirmation(email: string): Promise<void> {
  await transporter.sendMail({
    from: EMAIL_FROM,
    to: email,
    subject: 'Welcome to the Zerocoded Newsletter',
    html: `
      <h2>You're subscribed!</h2>
      <p>Thanks for subscribing to the Zerocoded newsletter. We'll send you the latest insights on design, development, and digital growth.</p>
      <p>— The Zerocoded Team</p>
    `,
  });
}
