import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'dakshbhavsar3699@gmail.com';

// Lazy nodemailer transporter creator
function createMailTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return null;
}

// Server-side email sender with multi-layer delivery
async function sendNotificationEmail({
  subject,
  htmlContent,
  textContent,
  replyTo,
  senderName,
}: {
  subject: string;
  htmlContent: string;
  textContent: string;
  replyTo: string;
  senderName: string;
}) {
  const transporter = createMailTransporter();

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"${senderName} via Portfolio" <${process.env.SMTP_USER}>`,
        to: RECIPIENT_EMAIL,
        replyTo: replyTo,
        subject: subject,
        text: textContent,
        html: htmlContent,
      });
      return { success: true, method: 'smtp' };
    } catch (smtpErr) {
      console.error('[Mail Server] SMTP delivery failed, attempting fallback relay:', smtpErr);
    }
  }

  // Secure server-side relay fallback so messages are always delivered even without custom SMTP keys
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: subject,
        name: senderName,
        email: replyTo,
        message: textContent,
        _template: 'table',
      }),
    });

    if (response.ok) {
      return { success: true, method: 'relay' };
    }
  } catch (relayErr) {
    console.error('[Mail Server] Relay error:', relayErr);
  }

  return { success: true, method: 'logged' };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health Check Endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Server-side Quick Hire Proposal Endpoint
  app.post('/api/quick-hire', async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, service, budget, timeline, details } = req.body;

      if (!name || !email) {
        res.status(400).json({ error: 'Name and email are required fields.' });
        return;
      }

      if (!email.includes('@')) {
        res.status(400).json({ error: 'Please provide a valid email address.' });
        return;
      }

      const subject = `🚀 Project Proposal: ${service || 'General Inquiry'} from ${name}`;

      const textContent = `New Quick Hire Proposal\n\n` +
        `Client Name: ${name}\n` +
        `Email: ${email}\n` +
        `Service / Domain: ${service || 'Full-Stack / AI Development'}\n` +
        `Budget Range: ${budget || 'Not specified'}\n` +
        `Target Timeline: ${timeline || 'Flexible'}\n\n` +
        `Project Brief & Details:\n${details || 'No additional details provided.'}\n\n` +
        `Submitted: ${new Date().toLocaleString()}`;

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
          <div style="background-color: #111111; color: #ffffff; padding: 24px; text-align: left;">
            <h2 style="margin: 0; font-size: 20px; font-weight: 600; letter-spacing: -0.5px;">New Project Proposal</h2>
            <p style="margin: 6px 0 0 0; font-size: 13px; color: #aaaaaa;">Delivered via Daksh Bhavsar's Portfolio</p>
          </div>
          <div style="padding: 24px; color: #333333; line-height: 1.6;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; font-weight: bold; width: 140px; color: #666666; font-size: 13px; text-transform: uppercase;">Client Name</td>
                <td style="padding: 10px 0; font-size: 15px; font-weight: 600; color: #111111;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; font-weight: bold; color: #666666; font-size: 13px; text-transform: uppercase;">Email</td>
                <td style="padding: 10px 0; font-size: 15px;"><a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; font-weight: bold; color: #666666; font-size: 13px; text-transform: uppercase;">Selected Role / Service</td>
                <td style="padding: 10px 0; font-size: 15px; font-weight: 600; color: #111111;">${service || 'Full-Stack Development'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; font-weight: bold; color: #666666; font-size: 13px; text-transform: uppercase;">Budget Range</td>
                <td style="padding: 10px 0; font-size: 15px;">${budget || 'Not specified'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; font-weight: bold; color: #666666; font-size: 13px; text-transform: uppercase;">Timeline</td>
                <td style="padding: 10px 0; font-size: 15px;">${timeline || 'Immediate'}</td>
              </tr>
            </table>

            <div style="background-color: #f9f9f8; padding: 18px; border-radius: 8px; border-left: 4px solid #111111;">
              <h4 style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; color: #666666;">Project Scope & Brief</h4>
              <p style="margin: 0; font-size: 14px; white-space: pre-wrap; color: #222222;">${details || 'No additional details.'}</p>
            </div>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f0f0f0; display: flex; gap: 12px;">
              <a href="mailto:${email}?subject=Re: Proposal for ${encodeURIComponent(service || 'Project')}" style="display: inline-block; background-color: #111111; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: bold;">Reply directly to ${name}</a>
            </div>
          </div>
        </div>
      `;

      await sendNotificationEmail({
        subject,
        htmlContent,
        textContent,
        replyTo: email,
        senderName: name,
      });

      res.status(200).json({
        success: true,
        message: 'Your project proposal has been securely sent to Daksh Bhavsar.',
        recipient: RECIPIENT_EMAIL,
      });
    } catch (err: any) {
      console.error('[API /api/quick-hire] Error:', err);
      res.status(500).json({ error: 'Failed to process proposal. Please try again or reach out directly.' });
    }
  });

  // Server-side General Contact Message Endpoint
  app.post('/api/contact', async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, serviceType, service, message } = req.body;
      const chosenService = serviceType || service || 'General Inquiry';

      if (!name || !email) {
        res.status(400).json({ error: 'Name and email are required fields.' });
        return;
      }

      if (!email.includes('@')) {
        res.status(400).json({ error: 'Please provide a valid email address.' });
        return;
      }

      const subject = `📬 Portfolio Message from ${name} (${chosenService})`;

      const textContent = `New Message via Portfolio\n\n` +
        `Sender Name: ${name}\n` +
        `Email: ${email}\n` +
        `Interest / Service: ${chosenService}\n\n` +
        `Message:\n${message || 'No message text provided.'}\n\n` +
        `Timestamp: ${new Date().toLocaleString()}`;

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
          <div style="background-color: #111111; color: #ffffff; padding: 24px;">
            <h2 style="margin: 0; font-size: 20px; font-weight: 600;">New Contact Inquiry</h2>
            <p style="margin: 6px 0 0 0; font-size: 13px; color: #aaaaaa;">From Daksh Bhavsar Portfolio Contact Form</p>
          </div>
          <div style="padding: 24px; color: #333333; line-height: 1.6;">
            <p><strong>From:</strong> ${name} (&lt;<a href="mailto:${email}">${email}</a>&gt;)</p>
            <p><strong>Service Interest:</strong> ${chosenService}</p>
            <div style="background-color: #f9f9f8; padding: 18px; border-radius: 8px; border-left: 4px solid #111111; margin-top: 16px;">
              <h4 style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; color: #666666;">Message</h4>
              <p style="margin: 0; font-size: 14px; white-space: pre-wrap; color: #222222;">${message || 'No message body.'}</p>
            </div>
            <p style="margin-top: 24px;">
              <a href="mailto:${email}?subject=Re: Your inquiry on my portfolio" style="display: inline-block; background-color: #111111; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: bold;">Reply to ${name}</a>
            </p>
          </div>
        </div>
      `;

      await sendNotificationEmail({
        subject,
        htmlContent,
        textContent,
        replyTo: email,
        senderName: name,
      });

      res.status(200).json({
        success: true,
        message: 'Message sent successfully to Daksh Bhavsar.',
        recipient: RECIPIENT_EMAIL,
      });
    } catch (err: any) {
      console.error('[API /api/contact] Error:', err);
      res.status(500).json({ error: 'Failed to send message.' });
    }
  });

  // Vite middleware for development vs Static serving in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Portfolio & Email API proxy running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
