const express     = require('express');
const nodemailer  = require('nodemailer');
const app         = express();

app.use(express.json());

// ── CORS ──────────────────────────────────────
app.use((req, res, next) => {
  const allowed = [
    'https://syedasif27.github.io',    // GitHub Pages
    'https://syedasif27.duckdns.org',  // your own domain (fallback)
  ];
  const origin = req.headers.origin;
  if (allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204); // preflight
  next();
});

// ── Transporter ───────────────────────────────
const transporter = nodemailer.createTransport({
  host:   'mail.fcoos.net',
  port:   587,
  secure: false,
  auth: {
    user: 'syedasif@fcoos.net',
    pass: process.env.MAIL_PASS
  },
  tls: { rejectUnauthorized: false }
});

// ── Route ─────────────────────────────────────
app.post('/send-mail', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message)
    return res.status(400).json({ error: 'All fields required' });

  try {
    await transporter.sendMail({
      from:    '"Portfolio" <syedasif@fcoos.net>',
      to:      'calltoasif27@gmail.com',
      replyTo: email,
      subject: `[Portfolio] ${subject} — from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px">
          <h2 style="color:#5e81f4">New Portfolio Message</h2>
          <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr/>
          <p style="white-space:pre-line">${message}</p>
        </div>`
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('Mail error:', err.message);
    res.status(500).json({ error: 'Send failed' });
  }
});

app.listen(3000, '0.0.0.0', () => console.log('Mailer on :3000'));
