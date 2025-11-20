import type { Song } from '../types';
import { useMusic } from '../context/MusicContext';
import { useState } from 'react';

interface SongListProps {
  songs: Song[];
  showAddToPlaylist?: boolean;
}

export const SongList = ({ songs, showAddToPlaylist = true }: SongListProps) => {
  const {
    playSong,
    toggleFavorite,
    favorites,
    addToQueue,
    playlists,
    addToPlaylist,
    removeSong,
    currentSong,
  } = useMusic();
  
  const [showPlaylistMenu, setShowPlaylistMenu] = useState<string | null>(null);

  return (
    <div className="overflow-auto">
      <table className="w-full">
        <thead className="bg-gray-800 sticky top-0">
          <tr className="text-left text-gray-400 text-sm">
            <th className="p-3 w-12">#</th>
            <th className="p-3">Title</th>
            <th className="p-3">Artist</th>
            <th className="p-3">Album</th>
            <th className="p-3">Plays</th>
            <th className="p-3 w-32">Actions</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr
              key={song.id}
              className={`border-b border-gray-800 hover:bg-gray-800 transition-colors ${
                currentSong?.id === song.id ? 'bg-gray-800' : ''
              }`}
            >
              <td className="p-3 text-gray-400">{index + 1}</td>
              <td className="p-3">
                <button
                  onClick={() => playSong(song)}
                  className="text-white hover:text-purple-400 transition-colors text-left"
                >
                  {song.title}
                </button>
              </td>
              <td className="p-3 text-gray-400">{song.artist}</td>
              <td className="p-3 text-gray-400">{song.album}</td>
              <td className="p-3 text-gray-400">{song.playCount}</td>
              <td className="p-3">
                <div className="flex space-x-2 relative">
                  <button
                    onClick={() => toggleFavorite(song.id)}
                    className="hover:scale-110 transition-transform"
                    title={favorites.includes(song.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {favorites.includes(song.id) ? '❤️' : '🤍'}
                  </button>
                  <button
                    onClick={() => addToQueue(song.id)}
                    className="hover:scale-110 transition-transform"
                    title="Add to queue"
                  >
                    ➕
                  </button>
                  {showAddToPlaylist && (
                    <div className="relative">
                      <button
                        onClick={() => setShowPlaylistMenu(showPlaylistMenu === song.id ? null : song.id)}
                        className="hover:scale-110 transition-transform"
                        title="Add to playlist"
                      >
                        📁
                      </button>
                      {showPlaylistMenu === song.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg z-10 max-h-48 overflow-auto">
                          {playlists.length === 0 ? (
                            <div className="p-3 text-gray-400 text-sm">No playlists</div>
                          ) : (
                            playlists.map(playlist => (
                              <button
                                key={playlist.id}
                                onClick={() => {
                                  addToPlaylist(playlist.id, song.id);
                                  setShowPlaylistMenu(null);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-600 text-white text-sm"
                              >
                                {playlist.name}
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  <button
                    onClick={() => removeSong(song.id)}
                    className="hover:scale-110 transition-transform"
                    title="Remove song"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {songs.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No songs found
        </div>
      )}
    </div>
  );
};
