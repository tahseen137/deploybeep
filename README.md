# 🚀 DeployBeep

**Never miss a deploy—instant notifications for Vercel, Netlify, and Railway**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tahseen137/deploybeep)
[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://deploybeep.vercel.app)

---

## 📖 About

**DeployBeep** sends instant notifications to **Slack**, **Discord**, and **Email** when your deployments succeed or fail. Connect your Vercel, Netlify, or Railway account and get real-time alerts in your team's channels.

Perfect for:
- 👥 Teams who deploy frequently
- 🚨 Critical production monitoring
- 📊 DevOps transparency
- 🔔 Remote teams staying in sync

**Live Demo:** [deploybeep.vercel.app](https://deploybeep.vercel.app)

---

## ✨ Features

- 🔔 **Multi-Channel Alerts** — Slack, Discord, Email
- ⚡ **Instant Notifications** — Real-time deploy status (<500ms latency)
- 🎯 **Platform Support** — Vercel, Netlify, Railway (dedicated handlers)
- 🎨 **Beautiful Formatting** — Rich embeds with status, branch, commit info
- 🔒 **Stateless Architecture** — Zero data storage, maximum privacy
- 🆓 **Free & Open Source** — MIT license, self-hostable

---

## 🚀 Quick Start

### 1. Deploy Your Own Instance

Click the button below to deploy to Vercel (free):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tahseen137/deploybeep)

**After deploying, configure environment variables:**

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add the following (see [Configuration](#-configuration) section):
   - `RESEND_API_KEY` (required for email notifications)
   - `FROM_EMAIL` (your notification sender email)

### 2. Configure Platform Webhooks

#### Vercel

1. Open your Vercel project settings
2. Go to **Git** → **Deploy Hooks** (or **Webhooks** section)
3. Add webhook URL:
   ```
   https://your-deploybeep.vercel.app/api/webhook/vercel?slack=YOUR_SLACK_WEBHOOK
   ```
4. Select **Deployment** events
5. Save

#### Netlify

1. Open your Netlify site settings
2. Go to **Build & deploy** → **Deploy notifications**
3. Click **Add notification** → **Outgoing webhook**
4. Select **Deploy succeeded** and **Deploy failed**
5. Paste webhook URL:
   ```
   https://your-deploybeep.vercel.app/api/webhook/netlify?discord=YOUR_DISCORD_WEBHOOK
   ```
6. Save

#### Railway

1. Open your Railway project
2. Go to **Settings** → **Webhooks**
3. Add webhook URL:
   ```
   https://your-deploybeep.vercel.app/api/webhook/railway?email=dev@example.com
   ```
4. Enable deployment events
5. Save

---

## 📋 Configuration

### Environment Variables

Create a `.env.local` file (or add to Vercel environment variables):

```bash
# Email Notifications (using Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx  # Get from https://resend.com
FROM_EMAIL=notifications@deploybeep.app

# Optional: Webhook Security
VERCEL_WEBHOOK_SECRET=your_random_secret
NETLIFY_WEBHOOK_SECRET=your_random_secret

NODE_ENV=production
```

### Notification Targets

Add notification targets via query parameters:

| Parameter | Description | Example |
|-----------|-------------|---------|
| `slack` | Slack incoming webhook URL | `?slack=https://hooks.slack.com/services/...` |
| `discord` | Discord webhook URL | `?discord=https://discord.com/api/webhooks/...` |
| `email` | Email address for notifications | `?email=dev@example.com` |

**You can combine multiple targets:**

```
/api/webhook/vercel?slack=SLACK_URL&discord=DISCORD_URL&email=dev@example.com
```

---

## 🔔 Setting Up Notifications

### Slack

1. Go to your Slack workspace settings
2. Create an **Incoming Webhook** ([guide](https://api.slack.com/messaging/webhooks))
3. Copy the webhook URL (starts with `https://hooks.slack.com/`)
4. Add to your webhook URL as `?slack=YOUR_WEBHOOK_URL`

**Example:**
```
https://deploybeep.vercel.app/api/webhook/vercel?slack=https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX
```

### Discord

1. Open your Discord server settings
2. Go to **Integrations** → **Webhooks**
3. Click **New Webhook**
4. Configure channel and copy webhook URL
5. Add to your webhook URL as `?discord=YOUR_WEBHOOK_URL`

**Example:**
```
https://deploybeep.vercel.app/api/webhook/netlify?discord=https://discord.com/api/webhooks/123456789/XXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### Email

1. Sign up for [Resend](https://resend.com) (free tier: 100 emails/day)
2. Get your API key
3. Add `RESEND_API_KEY` to environment variables
4. Add recipient email to webhook URL as `?email=YOUR_EMAIL`

**Example:**
```
https://deploybeep.vercel.app/api/webhook/railway?email=dev@example.com
```

---

## 🛠️ Local Development

```bash
# Clone the repository
git clone https://github.com/tahseen137/deploybeep.git
cd deploybeep

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your API keys
# (Email notifications won't work without RESEND_API_KEY)

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Testing Webhooks Locally

Use a tool like [ngrok](https://ngrok.com) to expose your local server:

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Expose with ngrok
npx ngrok http 3000
```

Use the ngrok URL (e.g., `https://abc123.ngrok.io/api/webhook/vercel`) in your platform webhook settings.

---

## 📚 API Reference

### Webhook Endpoints

| Endpoint | Platform | Payload Format |
|----------|----------|----------------|
| `/api/webhook/vercel` | Vercel | [Vercel webhook format](https://vercel.com/docs/webhooks) |
| `/api/webhook/netlify` | Netlify | [Netlify webhook format](https://docs.netlify.com/configure-builds/build-hooks/) |
| `/api/webhook/railway` | Railway | [Railway webhook format](https://docs.railway.com/observability/webhooks) |
| `/api/webhook/generic` | Any platform | Generic JSON (auto-detect fields) |

### Response Format

**Success:**
```json
{
  "success": true,
  "message": "Webhook received and notifications sent",
  "notification": { /* formatted notification data */ },
  "deliveryResults": {
    "slack": { "success": true, "deliveryTime": 234 },
    "discord": { "success": true, "deliveryTime": 189 },
    "email": { "success": true, "deliveryTime": 456 },
    "allSucceeded": true,
    "anySucceeded": true
  }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message details"
}
```

---

## 🔒 Security

### Webhook Verification (Coming Soon)

DeployBeep will support webhook signature verification for:
- Vercel (`x-vercel-signature` header)
- Netlify (JWT signature)

Set `VERCEL_WEBHOOK_SECRET` and `NETLIFY_WEBHOOK_SECRET` in environment variables.

### Best Practices

- ✅ Use HTTPS for webhook URLs
- ✅ Keep webhook URLs private (they contain notification targets)
- ✅ Rotate webhook secrets regularly
- ✅ Use environment variables for API keys
- ✅ Monitor for suspicious activity

---

## 🧪 Testing

```bash
# Run type checking
npm run build

# Run linter
npm run lint

# Test webhook locally (example using curl)
curl -X POST http://localhost:3000/api/webhook/vercel?slack=YOUR_SLACK_WEBHOOK \
  -H "Content-Type: application/json" \
  -d '{
    "deployment": {
      "state": "READY",
      "url": "test-deploy.vercel.app",
      "target": "production"
    },
    "project": {
      "name": "test-project"
    }
  }'
```

---

## 🗺️ Roadmap

- [x] Slack notifications
- [x] Discord notifications
- [x] Email notifications
- [x] Vercel webhook handler
- [x] Netlify webhook handler
- [x] Railway webhook handler
- [ ] Webhook signature verification
- [ ] Rate limiting
- [ ] Custom notification templates
- [ ] Deployment history dashboard
- [ ] Analytics & insights
- [ ] Team collaboration features
- [ ] GitHub Actions integration

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Add proper error handling
- Update documentation for new features
- Test webhooks with real platforms
- Keep dependencies minimal

---

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Email powered by [Resend](https://resend.com/)
- Slack integration via [@slack/webhook](https://www.npmjs.com/package/@slack/webhook)
- Deployed on [Vercel](https://vercel.com/)

---

## 💬 Support

- **Issues:** [GitHub Issues](https://github.com/tahseen137/deploybeep/issues)
- **Discussions:** [GitHub Discussions](https://github.com/tahseen137/deploybeep/discussions)
- **Email:** support@deploybeep.app

---

**Ship faster with instant notifications 🚀🔔**

Made with ❤️ by developers, for developers.
