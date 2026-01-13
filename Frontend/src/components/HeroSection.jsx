import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HeroSection = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="bg-gray-900 text-white">
      <div className="px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
            Connecting Talent with Opportunity
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-3xl mx-auto">
            Post gigs, submit bids, and build great projects together.
          </p>
        </div>

        {/* CTA area: show auth-specific buttons */}
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/register"
                className="px-6 sm:px-7 py-3 sm:py-3.5 bg-white text-gray-900 font-semibold rounded-lg shadow-sm hover:bg-gray-100 transition-all"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-6 sm:px-7 py-3 sm:py-3.5 border border-gray-400/60 text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <a
                href="#browse"
                className="px-6 sm:px-7 py-3 sm:py-3.5 bg-white text-gray-900 font-semibold rounded-lg shadow-sm hover:bg-gray-100 transition-all"
              >
                Browse Gigs
              </a>
              <Link
                to="/my-gigs"
                className="px-6 sm:px-7 py-3 sm:py-3.5 border border-gray-400/60 text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
              >
                My Gigs
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
