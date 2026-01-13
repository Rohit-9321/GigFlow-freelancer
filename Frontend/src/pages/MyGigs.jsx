import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchGigs, clearError } from '../store/gigSlice';
import toast from 'react-hot-toast';

const MyGigs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gigs, loading, error } = useSelector((state) => state.gigs);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch all gigs
    dispatch(fetchGigs(''));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Filter gigs to show only those posted by current user (guard undefined shapes)
  const myGigs = (gigs || []).filter((gig) => {
    const owner = gig?.ownerId?._id ?? gig?.ownerId;
    return user && owner && String(owner) === String(user._id);
  });

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                My Gigs
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Manage all your posted projects
              </p>
            </div>
            <Link
              to="/post-gig"
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Post New Gig</span>
            </Link>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-gray-800 mb-4"></div>
            <p className="text-gray-600 text-lg">Loading your gigs...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && myGigs.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No gigs posted yet</h3>
            <p className="text-gray-600 mb-6">
              Start by posting your first gig to connect with freelancers
            </p>
            <Link
              to="/post-gig"
              className="inline-block px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-all duration-200"
            >
              Post Your First Gig
            </Link>
          </div>
        )}

        {/* Gigs Grid */}
        {!loading && myGigs.length > 0 && (
          <div>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Open Gigs</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {myGigs.filter((g) => g.status === 'open').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Assigned</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {myGigs.filter((g) => g.status === 'assigned').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Budget</p>
                    <p className="text-3xl font-bold text-gray-900">
                      ${myGigs.reduce((sum, g) => sum + (g.budget || 0), 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gigs List */}
            <div className="space-y-3 sm:space-y-4">
              {myGigs.map((gig) => (
                <div
                  key={gig._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 leading-snug line-clamp-2">
                        {gig.title}
                      </h3>
                    </div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        gig.status === 'open' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-2 ${
                          gig.status === 'open' ? 'bg-emerald-500' : 'bg-gray-500'
                        }`}
                      />
                      {gig.status === 'open' ? 'Open' : 'Assigned'}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-2">
                    {gig.description}
                  </p>

                  {/* Footer */}
                  <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-6 text-sm text-gray-700">
                      <div>
                        <p className="text-gray-500">Budget</p>
                        <p className="font-semibold text-gray-900">${(gig.budget || 0).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Posted</p>
                        <p className="font-semibold text-gray-900">
                          {gig.createdAt
                            ? new Date(gig.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                              })
                            : ''}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <Link
                        to={`/gig/${gig._id}`}
                        className="px-4 py-2 text-sm font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-900 transition-all"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGigs;
