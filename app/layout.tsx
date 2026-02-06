import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DeployBeep - Instant Deploy Notifications",
  description: "Get instant Slack/Discord/email notifications for your Vercel, Netlify, and Railway deployments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#0a0a0a] min-h-screen">
        <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <a href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-accent-400 to-accent-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">🔔</span>
                </div>
                <span className="text-xl font-bold text-white">DeployBeep</span>
              </a>
              <div className="flex space-x-6">
                <a href="/setup" className="text-gray-300 hover:text-accent-400 transition">Setup</a>
                <a href="/pricing" className="text-gray-300 hover:text-accent-400 transition">Pricing</a>
                <a href="https://github.com" className="text-gray-300 hover:text-accent-400 transition">GitHub</a>
              </div>
            </div>
          </div>
        </nav>
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
