# 🔔 DeployBeep

**Instant deployment notifications for Vercel, Netlify, and Railway.**

Never miss a deployment again. Get beautiful, instant notifications in Slack, Discord, or Email when your deployments succeed or fail.

## 🚀 Features

- **Multi-Platform Support**: Works with Vercel, Netlify, Railway, and any webhook-enabled platform
- **Multiple Channels**: Send notifications to Slack, Discord, and Email
- **Beautiful Formatting**: Clean, readable messages with status, branch, duration, and more
- **Zero Storage**: Stateless architecture - your data never touches our servers
- **Lightning Fast**: Notifications arrive within seconds of deployment completion

## 📦 Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** (Dark mode + glass morphism design)
- **TypeScript**
- **Vercel** (Hosting)

## 🎯 Quick Start

1. **Get your webhook URL** from [deploybeep.vercel.app/setup](https://deploybeep.vercel.app/setup)
2. **Add webhook** to your deployment platform (Vercel/Netlify/Railway)
3. **Configure notifications** by adding query parameters:
   - Slack: `?slack=YOUR_SLACK_WEBHOOK_URL`
   - Discord: `?discord=YOUR_DISCORD_WEBHOOK_URL`
   - Email: `?email=YOUR_EMAIL`

Example:
```
https://deploybeep.vercel.app/api/webhook/vercel?slack=https://hooks.slack.com/services/YOUR/WEBHOOK/HERE
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📝 API Routes

- `/api/webhook/vercel` - Vercel deployment webhooks
- `/api/webhook/netlify` - Netlify deployment webhooks
- `/api/webhook/generic` - Generic webhook handler for Railway and others

## 🎨 Design

- Clean, modern dark mode interface
- Orange/amber accent colors (alert-themed)
- Glass morphism cards with smooth animations
- Fully responsive design

## 📊 Pricing

- **Free**: 100 notifications/month
- **Pro ($12/mo)**: Unlimited notifications + custom templates + analytics

## 🤝 Contributing

This is a hackathon MVP. Contributions welcome!

## 📄 License

MIT

---

Built with ⚡ by [Tahseen](https://github.com/tahseen137)
