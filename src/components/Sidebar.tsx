import { useMusic } from '../context/MusicContext';
import { UploadButton } from './UploadButton';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const Sidebar = ({ currentView, setCurrentView }: SidebarProps) => {
  const { playlists } = useMusic();

  return (
    <div className="w-64 bg-[#0a0a0a] text-white flex flex-col h-full min-h-0">
      {/* Top: Upload Button */}
      <div className="p-4">
        <UploadButton compact />
      </div>

      {/* Middle: Navigation (grows to fill space) */}
      <nav className="flex-1 px-4 pb-6 space-y-6 overflow-y-auto">
        {/* Library Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3">Library</h3>
          <div className="space-y-1">
            {[
              { view: 'browse', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Browse' },
              { view: 'all-songs', icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3', label: 'Songs' },
              { view: 'albums', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', label: 'Albums' },
              { view: 'artists', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', label: 'Artists' },
            ].map(({ view, icon, label }) => (
              <button
                key={view}
                onClick={() => setCurrentView(view)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  currentView === view
                    ? 'bg-gray-800 text-white font-medium'
                    : 'text-gray-400 hover:text-white hover:bg-gray-900/70'
                }`}
              >
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                </svg>
                <span className="text-base">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* My Music Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3">My Music</h3>
          <div className="space-y-1">
            {[
              { view: 'recent', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Recently Played' },
              { view: 'favorites', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', label: 'Favorite Songs' },
            ].map(({ view, icon, label }) => (
              <button
                key={view}
                onClick={() => setCurrentView(view)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  currentView === view
                    ? 'bg-gray-800 text-white font-medium'
                    : 'text-gray-400 hover:text-white hover:bg-gray-900/70'
                }`}
              >
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                </svg>
                <span className="text-base">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Playlists Section (moved into main nav for visibility) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Playlists</h3>
            <button
              onClick={() => setCurrentView('create-playlist')}
              title="Create playlist"
              className="text-yellow-400 hover:text-yellow-300 text-sm px-2 py-1 rounded"
            >
              +
            </button>
          </div>
          <div className="space-y-1 max-h-64 overflow-y-auto pr-2">
            {playlists.length === 0 ? (
              <div className="px-4 py-3 text-gray-500 text-sm">No playlists yet</div>
            ) : (
              playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  onClick={() => setCurrentView(`playlist-${playlist.id}`)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group text-left ${
                    currentView === `playlist-${playlist.id}`
                      ? 'bg-gray-800 text-white font-medium'
                      : 'text-gray-400 hover:text-white hover:bg-gray-900/70'
                  }`}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 19V6l12-3v13" />
                    </svg>
                  </div>
                  <span className="text-base truncate">{playlist.name || 'Untitled Playlist'}</span>
                </button>
              ))
            )}
          </div>
        </div>
      </nav>
    
    </div>
  );
};