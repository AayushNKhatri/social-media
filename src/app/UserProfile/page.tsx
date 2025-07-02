'use client'
import { useEffect, useState } from 'react';

type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  bio: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
};

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/userprofile');
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Something went wrong');
        }

        setUser(data.user);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-700">Loading user profile...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">Error: {error}</p>;

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'> {/* Added flexbox for centering */}
        <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 max-w-sm w-full space-y-6"> {/* Improved card styling */}
            <div className="flex flex-col items-center text-center space-y-4"> {/* Centered content */}
                <img
                src={user?.profile_image_url || 'https://via.placeholder.com/128/E0E0E0/808080?text=User'}
                alt={`${user?.first_name || 'User'}'s profile`} 
                className="w-24 h-24 rounded-full object-cover border-4 border-purple-500 shadow-md" // More prominent image
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/128/E0E0E0/808080?text=User'; }} // Fallback image on error
                />
                <div className="text-gray-800"> {/* Adjusted text color */}
                    <h2 className="text-2xl font-bold">{user?.first_name} {user?.last_name}</h2>
                    <p className="text-lg text-gray-600">@{user?.username}</p> {/* Subtler username color */}
                    {user?.is_verified && (
                        <span className="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <svg className="-ml-0.5 mr-1.5 h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Verified
                        </span>
                    )}
                </div>
            </div>

            <div>
                <h3 className="text-md font-semibold text-gray-700 mb-2">Bio</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{user?.bio || 'No bio yet. Tell us something about yourself!'}</p> {/* Adjusted bio text */}
            </div>

            <div className="text-xs text-gray-500 border-t pt-4 text-center"> {/* Footer for joined date */}
                Joined: {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
            </div>
        </div>
    </div>
  );
}