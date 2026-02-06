export default function Pricing() {
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-accent-400 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-400">
            Start free, upgrade when you need more
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="glass rounded-2xl p-8 border-2 border-white/10 hover:border-accent-500/30 transition">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">Free</h2>
              <div className="flex items-baseline">
                <span className="text-5xl font-bold">$0</span>
                <span className="text-gray-400 ml-2">/month</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <Feature>100 notifications per month</Feature>
              <Feature>All deployment platforms</Feature>
              <Feature>Slack, Discord & Email</Feature>
              <Feature>Basic notification templates</Feature>
              <Feature>Community support</Feature>
            </ul>

            <a
              href="/setup"
              className="block w-full text-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition"
            >
              Get Started Free
            </a>

            <p className="text-xs text-gray-500 text-center mt-4">
              No credit card required
            </p>
          </div>

          {/* Pro Tier */}
          <div className="glass rounded-2xl p-8 border-2 border-accent-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-accent-500 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
              POPULAR
            </div>

            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">Pro</h2>
              <div className="flex items-baseline">
                <span className="text-5xl font-bold bg-gradient-to-r from-white to-accent-400 bg-clip-text text-transparent">
                  $12
                </span>
                <span className="text-gray-400 ml-2">/month</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <Feature highlighted>Unlimited notifications</Feature>
              <Feature highlighted>All deployment platforms</Feature>
              <Feature highlighted>Slack, Discord & Email</Feature>
              <Feature highlighted>Custom notification templates</Feature>
              <Feature highlighted>Advanced formatting & filters</Feature>
              <Feature highlighted>Priority support</Feature>
              <Feature highlighted>Analytics dashboard</Feature>
              <Feature highlighted>Team collaboration</Feature>
            </ul>

            <a
              href="/setup"
              className="block w-full text-center px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white rounded-lg font-semibold transition transform hover:scale-105"
            >
              Upgrade to Pro
            </a>

            <p className="text-xs text-gray-500 text-center mt-4">
              14-day free trial • Cancel anytime
            </p>
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-white to-accent-400 bg-clip-text text-transparent">
              Compare Plans
            </span>
          </h2>

          <div className="glass rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-6 text-gray-400 font-semibold">Feature</th>
                  <th className="text-center p-6 text-gray-400 font-semibold">Free</th>
                  <th className="text-center p-6 text-accent-400 font-semibold">Pro</th>
                </tr>
              </thead>
              <tbody>
                <ComparisonRow feature="Notifications per month" free="100" pro="Unlimited" />
                <ComparisonRow feature="Deployment platforms" free="✓" pro="✓" />
                <ComparisonRow feature="Slack integration" free="✓" pro="✓" />
                <ComparisonRow feature="Discord integration" free="✓" pro="✓" />
                <ComparisonRow feature="Email notifications" free="✓" pro="✓" />
                <ComparisonRow feature="Custom templates" free="✗" pro="✓" />
                <ComparisonRow feature="Advanced filters" free="✗" pro="✓" />
                <ComparisonRow feature="Analytics dashboard" free="✗" pro="✓" />
                <ComparisonRow feature="Team collaboration" free="✗" pro="✓" />
                <ComparisonRow feature="Priority support" free="✗" pro="✓" />
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-white to-accent-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>

          <div className="space-y-6">
            <FAQ
              question="Can I switch plans anytime?"
              answer="Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
            />
            <FAQ
              question="What happens if I exceed the free tier limit?"
              answer="We'll notify you when you approach your limit. Excess notifications won't be sent until you upgrade."
            />
            <FAQ
              question="Do you offer refunds?"
              answer="We offer a 14-day free trial for Pro. If you're not satisfied, cancel within the trial period for no charge."
            />
            <FAQ
              question="Can I use DeployBeep for multiple projects?"
              answer="Absolutely! There's no limit on the number of projects you can connect, even on the free tier."
            />
          </div>
        </div>

        <div className="text-center mt-16">
          <a href="/setup" className="text-accent-400 hover:text-accent-300 transition text-lg">
            Ready to get started? → Setup now
          </a>
        </div>
      </div>
    </div>
  );
}

function Feature({ children, highlighted = false }: { children: React.ReactNode; highlighted?: boolean }) {
  return (
    <li className="flex items-center text-gray-300">
      <svg
        className={`w-5 h-5 mr-3 flex-shrink-0 ${highlighted ? 'text-accent-400' : 'text-green-500'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      {children}
    </li>
  );
}

function ComparisonRow({ feature, free, pro }: { feature: string; free: string; pro: string }) {
  return (
    <tr className="border-b border-white/5">
      <td className="p-6 text-gray-300">{feature}</td>
      <td className="p-6 text-center text-gray-400">{free}</td>
      <td className="p-6 text-center text-accent-400 font-semibold">{pro}</td>
    </tr>
  );
}

function FAQ({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="glass rounded-lg p-6">
      <h3 className="text-lg font-bold mb-2 text-accent-400">{question}</h3>
      <p className="text-gray-400">{answer}</p>
    </div>
  );
}
