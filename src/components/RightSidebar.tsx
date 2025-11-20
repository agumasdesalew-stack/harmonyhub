import { useMusic } from '../context/MusicContext';

export const RightSidebar = () => {
  const { currentSong, queue, songs, removeFromQueue, playSong } = useMusic();

  const queueSongs = songs.filter(s => queue.includes(s.id));

  return (
    <div className="w-64 bg-[#0a0a0a] text-white px-4 py-6 flex flex-col h-full min-h-0">
      <div className="mb-10">
        <div className="flex items-center space-x-3 mb-6">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
          <h2 className="text-xl font-bold">Now Playing</h2>
        </div>
        
        {currentSong ? (
          <div className="bg-[#1a1a1a] rounded-xl p-6">
            <div className="w-full aspect-square bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-5 flex items-center justify-center shadow-lg">
              <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <h3 className="font-bold text-white mb-2 truncate text-lg">{currentSong.title}</h3>
            <p className="text-base text-gray-400 truncate">{currentSong.artist}</p>
            <p className="text-sm text-gray-500 mt-2 truncate">{currentSong.album}</p>
          </div>
        ) : (
          <div className="bg-[#1a1a1a] rounded-xl p-12 text-center">
            <svg className="w-20 h-20 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <p className="text-gray-500 text-base">No song playing</p>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-hidden flex flex-col mt-10">
        <h3 className="text-sm font-semibold text-gray-400 mb-6 uppercase tracking-wider">Queue</h3>
        
        {queueSongs.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-gray-500 text-base">No songs in queue</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {queueSongs.map((song, index) => (
              <div
                key={song.id}
                className="bg-[#1a1a1a] hover:bg-[#252525] rounded-xl p-5 transition-colors group cursor-pointer"
                onClick={() => playSong(song)}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-medium text-white truncate mb-1">{song.title}</h4>
                    <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromQueue(song.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white flex-shrink-0"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
