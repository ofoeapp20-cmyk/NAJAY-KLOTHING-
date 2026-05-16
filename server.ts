import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { Resend } from 'resend';

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Resend client
let resend: Resend | null = null;
const getResend = () => {
  if (!resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      console.warn('RESEND_API_KEY missing. Email sending will be simulated.');
    }
    resend = new Resend(key || 're_mock_123');
  }
  return resend;
};

// API: Send Order Confirmation
app.post('/api/order-confirmation', async (req, res) => {
  const { email, orderId, customerName, total, items } = req.body;

  if (!email || !orderId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
       console.log(`[SIMULATED EMAIL] To: ${email}, Subject: Order Confirmation ${orderId}`);
       return res.json({ 
         success: true, 
         simulated: true, 
         message: 'Email confirmation simulated. Add RESEND_API_KEY for real delivery.' 
       });
    }

    const resendClient = getResend();
    const { data, error } = await resendClient.emails.send({
      from: 'Sincerely <orders@resend.dev>',
      to: [email],
      subject: `Order Confirmed: ${orderId}`,
      html: `
        <div style="font-family: serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <h1 style="font-weight: normal; font-style: italic;">Thank you for your order, ${customerName}.</h1>
          <p>Your order <strong>${orderId}</strong> has been received and is being prepared with care.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <h3>Investment Summary:</h3>
          <ul style="list-style: none; padding: 0;">
            ${items.map((item: any) => `
              <li style="margin-bottom: 10px; display: flex; justify-content: space-between;">
                <span>${item.name} (x${item.quantity})</span>
                <span>$${item.price * item.quantity}</span>
              </li>
            `).join('')}
          </ul>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <div style="text-align: right; font-size: 1.25em;">
            <strong>Total: $${total}</strong>
          </div>
          <p style="font-size: 0.8em; color: #888; font-style: italic; margin-top: 40px;">
            A refined aesthetic journey awaits.
          </p>
        </div>
      `,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true, id: data?.id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
