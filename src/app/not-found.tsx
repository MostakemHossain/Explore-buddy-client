import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="max-w-lg p-8 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-7xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link href="/" legacyBehavior>
          <a className="inline-block px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-full shadow hover:bg-blue-700 transition duration-300">
            Go Back Home
          </a>
        </Link>
      </div>
    </div>
  );
}
