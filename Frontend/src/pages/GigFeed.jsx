import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGigs, clearError } from '../store/gigSlice';
import HeroSection from '../components/HeroSection';
import toast from 'react-hot-toast';

const GigFeed = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const { gigs, loading, error } = useSelector((state) => state.gigs);

  const searchDebounce = useRef(null);

  // Debounced live search: dispatch fetchGigs as the user types
  useEffect(() => {
    if (searchDebounce.current) clearTimeout(searchDebounce.current);
    searchDebounce.current = setTimeout(() => {
      dispatch(fetchGigs(search));
    }, 300);

    return () => clearTimeout(searchDebounce.current);
  }, [search, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchGigs(search));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Browse + Search slightly below hero */}
      <div className="bg-white border-b border-gray-200" id="browse">
        <div className="px-4 sm:px-6 lg:px-12 py-10 sm:py-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">Browse Available Gigs</h2>
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-gray-700/30 focus-within:border-gray-300 transition-all duration-200"
            >
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="flex-1 bg-transparent border-none focus:outline-none text-gray-900 placeholder:text-gray-500 px-2 sm:px-3 py-2 text-sm sm:text-base"
              />
              <button
                type="submit"
                className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200 shadow"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m1.18-4.99a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Gigs Section */}
      <div className="px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-gray-800 mb-4"></div>
            <p className="text-gray-600 text-lg">Loading gigs...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && gigs.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No gigs found</h3>
            <p className="text-gray-600">
              Try adjusting your search or check back later for new opportunities!
            </p>
          </div>
        )}

        {/* Gigs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {gigs.map((gig) => (
            <Link
              key={gig._id}
              to={`/gig/${gig._id}`}
              className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>
                    Open
                  </span>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs">Just posted</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors line-clamp-2">
                  {gig.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-5 line-clamp-3 leading-relaxed">
                  {gig.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-5 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Budget</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${gig.budget.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">Client</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {gig.ownerId?.name?.charAt(0).toUpperCase()}
                      </div>
                      <p className="text-sm font-medium text-gray-700">
                        {gig.ownerId?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover CTA */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 group-hover:bg-gray-100 transition-colors">
                <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 flex items-center">
                  View Details & Bid
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GigFeed;
