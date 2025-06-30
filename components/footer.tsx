import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white shadow-md border-t border-gray-200 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-gray-700">
        {/* Resources */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Resources</h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="https://programmablesearchengine.google.com/about/"
                className="hover:underline hover:text-blue-600"
                target="_blank"
              >
                Google Custom API
              </Link>
            </li>
            <li>
              <Link
                href="https://next-auth.js.org/"
                className="hover:underline hover:text-blue-600"
                target="_blank"
              >
                NextAuth
              </Link>
            </li>
            <li>
              <Link
                href="https://nextjs.org/docs"
                className="hover:underline hover:text-blue-600"
                target="_blank"
              >
                Next.js Docs
              </Link>
            </li>
          </ul>
        </div>

        {/* Organization */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Organization</h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="https://www.linkedin.com/in/asok-tamang11"
                className="hover:underline hover:text-blue-600"
                target="_blank"
              >
                LinkedIn
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/AsokTamang"
                className="hover:underline hover:text-blue-600"
                target="_blank"
              >
                GitHub
              </Link>
            </li>
          </ul>
        </div>

        {/* Optional Contact/Note Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-900">About DealHunt</h2>
          <p className="text-sm text-gray-600">
            DealHunt helps you find real-time deals from the web using Google’s Custom Search API. Built with  using Next.js and Tailwind CSS.
          </p>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 py-4 border-t">
        © {new Date().getFullYear()} DealHunt by Asok Tamang. All rights reserved.
      </div>
    </footer>
  );
}
