export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-900/20 via-transparent to-accent-900/20 animate-pulse-slow"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="glass px-4 py-2 rounded-full text-accent-400 text-sm font-medium">
              🚀 Ship faster with instant notifications
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-accent-200 to-accent-400 bg-clip-text text-transparent">
            Never Miss a Deploy
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Get instant <span className="text-accent-400 font-semibold">Slack</span>, <span className="text-accent-400 font-semibold">Discord</span>, 
            and <span className="text-accent-400 font-semibold">Email</span> notifications when your Vercel, Netlify, or Railway deployments succeed or fail.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="/setup" className="px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white rounded-lg font-semibold transition transform hover:scale-105">
              Get Started Free
            </a>
            <a href="#how-it-works" className="px-8 py-4 glass glass-hover text-white rounded-lg font-semibold">
              See How It Works
            </a>
          </div>
          
          {/* Status Cards Preview */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="glass rounded-xl p-6 text-left animate-float">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-semibold">Deploy Successful</span>
              </div>
              <p className="text-gray-300 text-sm mb-2">my-awesome-app</p>
              <p className="text-gray-500 text-xs">Production • main branch • 2m 34s</p>
            </div>
            
            <div className="glass rounded-xl p-6 text-left animate-float" style={{animationDelay: '0.5s'}}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 font-semibold">Deploy Failed</span>
              </div>
              <p className="text-gray-300 text-sm mb-2">api-service</p>
              <p className="text-gray-500 text-xs">Staging • develop branch • Build error</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 bg-gradient-to-b from-transparent to-accent-900/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-white to-accent-400 bg-clip-text text-transparent">
              3 Steps to Setup
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass glass-hover rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-accent-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔗</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-accent-400">1. Add Webhook</h3>
              <p className="text-gray-400">
                Copy your webhook URL and add it to your Vercel, Netlify, or Railway project settings.
              </p>
            </div>
            
            <div className="glass glass-hover rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-accent-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚙️</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-accent-400">2. Configure Channel</h3>
              <p className="text-gray-400">
                Connect your Slack workspace, Discord server, or email to receive notifications.
              </p>
            </div>
            
            <div className="glass glass-hover rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-accent-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔔</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-accent-400">3. Get Notified</h3>
              <p className="text-gray-400">
                Instantly receive beautiful deployment notifications every time you ship.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a href="/setup" className="inline-flex items-center px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white rounded-lg font-semibold transition transform hover:scale-105">
              Start Setup Now →
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-white to-accent-400 bg-clip-text text-transparent">
              Why DeployBeep?
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3 text-accent-400">⚡ Instant Delivery</h3>
              <p className="text-gray-400">Notifications arrive within seconds of deployment completion.</p>
            </div>
            
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3 text-accent-400">🎨 Beautiful Formatting</h3>
              <p className="text-gray-400">Clean, readable messages with status, branch, duration, and more.</p>
            </div>
            
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3 text-accent-400">🔒 Zero Storage</h3>
              <p className="text-gray-400">Stateless architecture means your data never touches our servers.</p>
            </div>
            
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3 text-accent-400">🚀 Multi-Platform</h3>
              <p className="text-gray-400">Works with Vercel, Netlify, Railway, and any webhook-enabled platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-accent-900/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-accent-400 bg-clip-text text-transparent">
              Ready to Ship Faster?
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join developers who never miss a deployment status.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/setup" className="px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white rounded-lg font-semibold transition transform hover:scale-105">
              Get Started Free
            </a>
            <a href="/pricing" className="px-8 py-4 glass glass-hover text-white rounded-lg font-semibold">
              View Pricing
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
