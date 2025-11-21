import { useMusic } from '../context/MusicContext';
import { UploadButton } from './UploadButton';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const Sidebar = ({ currentView, setCurrentView }: SidebarProps) => {
  const { playlists } = useMusic();

  const isActive = (view: string) => currentView === view;

  const navItems = [
    { view: 'browse', icon: '🏠', label: 'Browse' },
    { view: 'all-songs', icon: '🎵', label: 'Songs' },
    { view: 'albums', icon: '💿', label: 'Albums' },
    { view: 'artists', icon: '🎤', label: 'Artists' },
    { view: 'recent', icon: '🕒', label: 'Recently Played' },
    { view: 'favorites', icon: '❤️', label: 'Favorite Songs' },
  ];

  return (
    <div className="w-64 bg-[#0F172A] text-gray-300 flex flex-col h-full">
      {/* Upload Button - Highlighted like in your reference */}
      <div className="px-6 py-5 border-b border-gray-800">
        <UploadButton compact />
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 overflow-y-auto">
        {/* Library */}
        <div className="px-6 mb-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Library
          </h3>
          <ul className="space-y-1">
            {navItems.slice(0, 4).map((item) => (
              <li key={item.view}>
                <button
                  onClick={() => setCurrentView(item.view)}
                  className={`w-full flex items-center gap-4 px-4 py-3 text-left transition-all ${
                    isActive(item.view)
                      ? 'text-white font-medium border-l-4 border-yellow-400 pl-3 bg-gray-900/50'
                      : 'hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* My Music */}
        <div className="px-6 mb-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            My Music
          </h3>
          <ul className="space-y-1">
            {navItems.slice(4).map((item) => (
              <li key={item.view}>
                <button
                  onClick={() => setCurrentView(item.view)}
                  className={`w-full flex items-center gap-4 px-4 py-3 text-left transition-all ${
                    isActive(item.view)
                      ? 'text-white font-medium border-l-4 border-yellow-400 pl-3 bg-gray-900/50'
                      : 'hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Playlists */}
        <div className="px-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Playlists
            </h3>
            <button
              onClick={() => setCurrentView('create-playlist')}
              className="text-yellow-400 hover:text-yellow-300 text-xl font-bold"
              title="Create playlist"
            >
              +
            </button>
          </div>

          {playlists.length === 0 ? (
            <p className="text-sm text-gray-500 px-4 py-2">No playlists yet</p>
          ) : (
            <ul className="space-y-1">
              {playlists.map((playlist) => (
                <li key={playlist.id}>
                  <button
                    onClick={() => setCurrentView(`playlist-${playlist.id}`)}
                    className={`w-full flex items-center gap-4 px-4 py-3 text-left transition-all ${
                      isActive(`playlist-${playlist.id}`)
                        ? 'text-white font-medium border-l-4 border-yellow-400 pl-3 bg-gray-900/50'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl">♪</span>
                    </div>
                    <span className="text-sm truncate">
                      {playlist.name || 'Untitled Playlist'}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};