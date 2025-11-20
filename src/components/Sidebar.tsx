import { useMusic } from '../context/MusicContext';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const Sidebar = ({ currentView, setCurrentView }: SidebarProps) => {
  const { playlists } = useMusic();

  return (
    <div className="w-56 bg-[#0a0a0a] text-white px-3 py-6 flex flex-col h-screen border-r border-gray-800">
      <div className="mb-8 px-3">
        <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span className="text-sm font-medium">Upload</span>
        </button>
      </div>

      <nav className="flex-1">
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 mb-3 px-3 uppercase tracking-wider">Library</h3>
          <div className="space-y-1">
            <button
              onClick={() => setCurrentView('browse')}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center space-x-3 ${
                currentView === 'browse' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-sm font-medium">Browse</span>
            </button>
            <button
              onClick={() => setCurrentView('all-songs')}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center space-x-3 ${
                currentView === 'all-songs' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              <span className="text-sm font-medium">Songs</span>
            </button>
            <button
              onClick={() => setCurrentView('albums')}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center space-x-3 ${
                currentView === 'albums' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="text-sm font-medium">Albums</span>
            </button>
            <button
              onClick={() => setCurrentView('artists')}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center space-x-3 ${
                currentView === 'artists' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm font-medium">Artists</span>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 mb-3 px-3 uppercase tracking-wider">My Music</h3>
          <div className="space-y-1">
            <button
              onClick={() => setCurrentView('recent')}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center space-x-3 ${
                currentView === 'recent' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">Recently Played</span>
            </button>
            <button
              onClick={() => setCurrentView('favorites')}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center space-x-3 ${
                currentView === 'favorites' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm font-medium">Favorite Songs</span>
            </button>
          </div>
        </div>

        {playlists.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 mb-3 px-3 uppercase tracking-wider">Playlists</h3>
            <div className="space-y-1">
              {playlists.map(playlist => (
                <button
                  key={playlist.id}
                  onClick={() => setCurrentView(`playlist-${playlist.id}`)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center space-x-3 ${
                    currentView === `playlist-${playlist.id}` ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  <span className="text-sm font-medium truncate">{playlist.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};
