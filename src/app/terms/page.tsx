export default function TermsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Terms and Conditions
        </h1>

        <p className="text-gray-700 mb-6">
          Welcome to SSAIGE! By accessing or using our platform, you agree to
          comply with and be bound by the following terms and conditions. Please
          read them carefully.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-700">
            By using SSAIGE, you agree to these Terms and Conditions. If you do
            not agree, please refrain from using our platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            2. Purpose of the Platform
          </h2>
          <p className="text-gray-700">
            SSAIGE is a gamified web-based application designed to enhance
            conceptual learning in General Biology for Grade 12 students. The
            platform is intended for educational purposes only.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            3. User Responsibilities
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Users must provide accurate information during registration.
            </li>
            <li>
              Users must not engage in activities that harm the platform or
              other users.
            </li>
            <li>
              Users must respect the intellectual property rights of SSAIGE and
              its content.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            4. Privacy and Data Protection
          </h2>
          <p className="text-gray-700">
            Your privacy is important to us. Please refer to our{" "}
            <a
              href="/privacy"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Privacy Policy
            </a>{" "}
            for details on how we collect, use, and protect your data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            5. Limitation of Liability
          </h2>
          <p className="text-gray-700">
            SSAIGE is provided "as is" without any warranties. We are not liable
            for any damages arising from the use of our platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            6. Modifications to Terms
          </h2>
          <p className="text-gray-700">
            We reserve the right to update these Terms and Conditions at any
            time. Continued use of SSAIGE constitutes acceptance of the updated
            terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            7. Contact Information
          </h2>
          <p className="text-gray-700">
            For questions or concerns, please contact us at support@ssaige.app.
          </p>
        </section>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
