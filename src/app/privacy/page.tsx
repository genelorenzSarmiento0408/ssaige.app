export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>

        <p className="text-gray-700 mb-6">
          SSAIGE is committed to protecting your privacy. This Privacy Policy
          outlines how we collect, use, and safeguard your information.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            1. Information We Collect
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>Personal Information:</strong> Name, email address, and
              other details provided during registration.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you use SSAIGE,
              including interactions and preferences.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>To provide and improve our platform.</li>
            <li>To communicate with you about updates and features.</li>
            <li>To ensure the security and integrity of SSAIGE.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            3. Data Protection Measures
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>All data is de-identified using unique participant codes.</li>
            <li>Digital data is secured with password protection.</li>
            <li>
              Hard copies of data are stored in locked locations with restricted
              access.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            4. Rights of Users
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              You have the right to access, modify, or delete your personal
              information.
            </li>
            <li>You may withdraw consent at any time without penalty.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            5. Data Sharing
          </h2>
          <p className="text-gray-700">
            We do not share your personal information with third parties without
            your consent, except as required by law.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            6. Retention of Data
          </h2>
          <p className="text-gray-700">
            Data is retained only for as long as necessary to fulfill the
            purposes outlined in this policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            7. Changes to Privacy Policy
          </h2>
          <p className="text-gray-700">
            We may update this Privacy Policy periodically. Continued use of
            SSAIGE constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            8. Contact Information
          </h2>
          <p className="text-gray-700">
            For privacy-related inquiries, please contact us at
            privacy@ssaige.app.
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
