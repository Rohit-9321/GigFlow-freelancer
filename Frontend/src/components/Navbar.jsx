import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { logout } from '../store/authSlice';
import { disconnectSocket } from '../utils/socket';
// `fetchMyBids` removed from navbar; use full page route instead
import toast from 'react-hot-toast';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menuRef = useRef(null);
  

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showMenu]);

  // Note: live search moved to main content (GigFeed)

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      disconnectSocket();
      toast.success('Logged out successfully');
      setShowMenu(false);
      navigate('/login');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo + primary links */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-3 group flex-shrink-0" onClick={() => setShowMobileMenu(false)}>
              <img src="/logo.jpeg" alt="GigFlow Logo" className="h-10 sm:h-12 w-auto" />
              <span className="text-xl sm:text-2xl font-bold text-gray-900 hidden sm:inline">
                GigFlow
              </span>
            </Link>

            {isAuthenticated && (
              <div className="hidden md:flex items-center space-x-6">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                >
                  Browse Gigs
                </Link>
                <Link
                  to="/my-gigs"
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                >
                  My Gigs
                </Link>
                <Link
                  to="/my-bids"
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                >
                  My Bids
                </Link>
              </div>
            )}
          </div>

          {/* Navigation - Right */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/post-gig"
                  className="hidden sm:inline-block px-4 sm:px-6 py-2.5 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow text-sm"
                >
                  Post Gig
                </Link>
                
                {/* Settings Menu */}
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="hidden sm:inline-flex items-center justify-center w-10 h-10 bg-gray-300 text-gray-600 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200"
                    title="Profile"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-40">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm text-gray-500">Signed in as</p>
                        <p className="font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
                      </div>

                      {/* Profile dropdown kept minimal (no nav links) */}

                      {/* Divider */}
                      <div className="border-t border-gray-200 my-2"></div>

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-3 text-red-600 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="sm:hidden p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 sm:px-6 py-2.5 bg-gray-800 text-white font-semibold rounded-xl border-2 border-gray-900 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 text-sm sm:text-base"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 sm:px-6 py-2.5 bg-gray-800 text-white font-semibold rounded-xl border-2 border-gray-900 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 text-sm sm:text-base"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isAuthenticated && showMobileMenu && (
          <div className="sm:hidden border-t border-gray-200 py-4 space-y-3">
            <Link
              to="/post-gig"
              className="block px-4 py-2.5 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-all duration-200 text-center"
              onClick={() => setShowMobileMenu(false)}
            >
              Post Gig
            </Link>
            <Link
              to="/"
              className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium"
              onClick={() => setShowMobileMenu(false)}
            >
              Browse Gigs
            </Link>
            <Link
              to="/my-gigs"
              className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium"
              onClick={() => setShowMobileMenu(false)}
            >
              My Gigs
            </Link>
            <Link
              to="/my-bids"
              className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium"
              onClick={() => setShowMobileMenu(false)}
            >
              My Bids
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
