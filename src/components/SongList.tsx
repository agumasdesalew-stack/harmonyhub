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
      <table className="w-full table-auto">
        <thead className="bg-[#D3D3D3] sticky top-0">
          <tr className="text-left text-gray-400 text-sm">
            <th className="px-4 py-3 w-12">#</th>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3 hidden md:table-cell">Artist</th>
            <th className="px-4 py-3 hidden lg:table-cell">Album</th>
            <th className="px-4 py-3 w-28">Actions</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr
              key={song.id}
              className={`border-b border-gray-900 hover:bg-[#D3D3D3] transition-colors ${
                currentSong?.id === song.id ? 'bg-[#D3D3D3]' : ''
              }`}
            >
              <td className="px-4 py-3 text-gray-400">{index + 1}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => playSong(song)}
                    className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 hover:scale-105 transition-transform"
                    title={currentSong?.id === song.id ? 'Playing' : 'Play'}
                  >
                    {currentSong?.id === song.id ? (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                    ) : (
                      <svg className="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    )}
                  </button>
                  <div className="min-w-0">
                    <button onClick={() => playSong(song)} className="text-white hover:text-yellow-400 transition-colors text-left font-medium truncate">
                      {song.title}
                    </button>
                    <div className="text-xs text-gray-400 truncate">{song.file?.name || `${song.artist} • ${song.album || ''}`}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{song.artist}</td>
              <td className="px-4 py-3 text-gray-400 hidden lg:table-cell">{song.album}</td>
              <td className="px-4 py-3">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleFavorite(song.id)}
                    className="opacity-80 hover:opacity-100 transition-opacity"
                    title={favorites.includes(song.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {favorites.includes(song.id) ? '❤️' : '🤍'}
                  </button>
                  <button
                    onClick={() => addToQueue(song.id)}
                    className="opacity-80 hover:opacity-100 transition-opacity"
                    title="Add to queue"
                  >
                    ➕
                  </button>
                  {showAddToPlaylist && (
                    <div className="relative">
                      <button
                        onClick={() => setShowPlaylistMenu(showPlaylistMenu === song.id ? null : song.id)}
                        className="opacity-80 hover:opacity-100 transition-opacity"
                        title="Add to playlist"
                      >
                        📁
                      </button>
                      {showPlaylistMenu === song.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-[#111] rounded-lg shadow-xl border border-gray-800 z-10 max-h-48 overflow-auto">
                          {playlists.length === 0 ? (
                            <div className="p-4 text-gray-400 text-sm">No playlists</div>
                          ) : (
                            playlists.map(playlist => (
                              <button
                                key={playlist.id}
                                onClick={() => {
                                  addToPlaylist(playlist.id, song.id);
                                  setShowPlaylistMenu(null);
                                }}
                                className="w-full text-left px-4 py-3 hover:bg-[#252525] text-white text-sm"
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
                    className="opacity-80 hover:opacity-100 transition-opacity"
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
        <div className="text-center py-12 text-gray-400">No songs found</div>
      )}
    </div>
  );
};
