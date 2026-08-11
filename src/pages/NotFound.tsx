import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Page not found</h1>
      <p className="text-gray-400 mb-8">The page you requested does not exist.</p>
      <Link to="/" className="text-[#CFF8FF] underline">Return to homepage</Link>
    </div>
  </div>
);

export default NotFound;
