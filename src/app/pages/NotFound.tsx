import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F3F5F7] p-4 text-center font-sans">
      <h1 className="text-6xl font-bold text-[#2D3748] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md" style={{ fontFamily: "'Inter', sans-serif" }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="bg-[#2D3748] hover:bg-[#1a202c] text-white font-medium text-sm px-6 py-3 rounded-lg shadow transition-colors"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Return to Home
      </Link>
    </div>
  );
}
