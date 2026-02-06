export default function Setup() {
  const webhookBaseUrl = "https://deploybeep.vercel.app/api/webhook";
  
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-accent-400 bg-clip-text text-transparent">
            Setup Guide
          </h1>
          <p className="text-xl text-gray-400">
            Get your deployment notifications in minutes
          </p>
        </div>

        {/* Webhook URLs */}
        <div className="glass rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-accent-400">📋 Your Webhook URLs</h2>
          <div className="space-y-4">
            <WebhookUrl platform="Vercel" url={`${webhookBaseUrl}/vercel`} />
            <WebhookUrl platform="Netlify" url={`${webhookBaseUrl}/netlify`} />
            <WebhookUrl platform="Railway" url={`${webhookBaseUrl}/generic`} />
            <WebhookUrl platform="Generic" url={`${webhookBaseUrl}/generic`} />
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="space-y-8">
          <SetupCard
            platform="Vercel"
            icon="▲"
            steps={[
              "Go to your project settings on Vercel",
              "Navigate to the 'Git' or 'Webhooks' section",
              "Add a new webhook",
              "Paste the Vercel webhook URL above",
              "Select 'Deployment' events",
              "Save and you're done! 🎉"
            ]}
          />

          <SetupCard
            platform="Netlify"
            icon="◆"
            steps={[
              "Open your site settings on Netlify",
              "Go to 'Build & deploy' → 'Deploy notifications'",
              "Click 'Add notification' → 'Outgoing webhook'",
              "Select 'Deploy succeeded' and 'Deploy failed'",
              "Paste the Netlify webhook URL",
              "Save to start receiving notifications! 🚀"
            ]}
          />

          <SetupCard
            platform="Railway"
            icon="🚂"
            steps={[
              "Open your project on Railway",
              "Go to project settings",
              "Find 'Webhooks' section",
              "Add the generic webhook URL",
              "Enable deployment events",
              "All set! Notifications incoming! ⚡"
            ]}
          />
        </div>

        {/* Notification Channels */}
        <div className="glass rounded-xl p-8 mt-12">
          <h2 className="text-2xl font-bold mb-6 text-accent-400">🔔 Configure Notifications</h2>
          <div className="space-y-6">
            <div className="border border-accent-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <span className="text-2xl mr-3">💬</span> Slack
              </h3>
              <p className="text-gray-400 mb-4">
                Add <code className="px-2 py-1 bg-accent-500/20 rounded text-accent-300">?slack=YOUR_WEBHOOK_URL</code> to any webhook URL
              </p>
              <code className="block p-3 bg-black/50 rounded text-sm text-gray-300 overflow-x-auto">
                {webhookBaseUrl}/vercel?slack=https://hooks.slack.com/services/YOUR/WEBHOOK/HERE
              </code>
            </div>

            <div className="border border-accent-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <span className="text-2xl mr-3">🎮</span> Discord
              </h3>
              <p className="text-gray-400 mb-4">
                Add <code className="px-2 py-1 bg-accent-500/20 rounded text-accent-300">?discord=YOUR_WEBHOOK_URL</code> to any webhook URL
              </p>
              <code className="block p-3 bg-black/50 rounded text-sm text-gray-300 overflow-x-auto">
                {webhookBaseUrl}/vercel?discord=https://discord.com/api/webhooks/YOUR/WEBHOOK
              </code>
            </div>

            <div className="border border-accent-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <span className="text-2xl mr-3">📧</span> Email
              </h3>
              <p className="text-gray-400 mb-4">
                Add <code className="px-2 py-1 bg-accent-500/20 rounded text-accent-300">?email=YOUR_EMAIL</code> to any webhook URL
              </p>
              <code className="block p-3 bg-black/50 rounded text-sm text-gray-300 overflow-x-auto">
                {webhookBaseUrl}/vercel?email=dev@example.com
              </code>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a href="/" className="text-accent-400 hover:text-accent-300 transition">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

function WebhookUrl({ platform, url }: { platform: string; url: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-accent-500/20">
      <div>
        <span className="text-sm text-gray-400">{platform}</span>
        <code className="block text-accent-300 font-mono text-sm mt-1">{url}</code>
      </div>
      <button
        onClick={() => navigator.clipboard.writeText(url)}
        className="px-4 py-2 bg-accent-500 hover:bg-accent-600 rounded transition text-sm font-semibold"
      >
        Copy
      </button>
    </div>
  );
}

function SetupCard({ platform, icon, steps }: { platform: string; icon: string; steps: string[] }) {
  return (
    <div className="glass glass-hover rounded-xl p-8">
      <h3 className="text-2xl font-bold mb-6 flex items-center">
        <span className="text-3xl mr-3">{icon}</span>
        {platform} Setup
      </h3>
      <ol className="space-y-3">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-accent-500/20 rounded-full flex items-center justify-center text-accent-400 font-bold mr-3">
              {i + 1}
            </span>
            <span className="text-gray-300 pt-1">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
