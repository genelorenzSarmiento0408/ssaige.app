import Link from "next/link";
import { Mail, Facebook, Users, Sparkles } from "lucide-react";

export default function ContactPage() {
  // Research team members array
  const researchMembers = [
    { name: "Kent Jose Matteo M. Calong", role: "Researcher" },
    { name: "Marc Erwin R. Fernandez", role: "Researcher" },
    { name: "Zyrole John F. Gonzales", role: "Researcher" },
    { name: "Achilles P. Magculang", role: "Researcher" },
    { name: "Trisha Kate P. Osea", role: "Researcher" },
    { name: "Maia Santine F. Reyes", role: "Researcher" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-${colors.primary}-600 via-${colors.secondary}-600 to-${colors.accent}-500 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-gray-600 text-lg">Get in touch with our team</p>
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-${colors.primary}-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Support Group
              </h2>
            </div>
          </div>
          <div className="ml-15 pl-3">
            <p className="text-gray-600 mb-3">
              For technical support, inquiries, or feedback:
            </p>
            <a
              href="mailto:support@ssaige.app"
              className="inline-flex items-center gap-2 text-${colors.primary}-600 hover:text-${colors.primary}-700 font-semibold text-lg"
            >
              <Mail className="w-5 h-5" />
              support@ssaige.app
            </a>
          </div>
        </div>

        {/* Research Leader Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-pink-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-${colors.accent}-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Research Leader
              </h2>
            </div>
          </div>
          <div className="ml-15 pl-3">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Gene Lorenz Sarmiento
              </h3>
              <p className="text-gray-600 mb-3">
                Lead Researcher and App Developer
              </p>
              <a
                href="https://www.facebook.com/genelorenz.sarmientoii/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
              >
                <Facebook className="w-5 h-5" />
                Connect on Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Research Team Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-${colors.secondary}-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Research Team Members
              </h2>
            </div>
          </div>
          <div className="ml-15 pl-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {researchMembers.map((member, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {/* {index + 1} */}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Have questions or want to learn more about SSAIGE?
          </p>
          <p className="text-gray-600">
            We&apos;re here to help! Feel free to reach out to us.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">
              © 2026 SSAIGE. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-600 hover:text-${colors.primary}-600"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-600 hover:text-${colors.primary}-600"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


