import { useState } from 'react';
import { useMusic } from '../context/MusicContext';
import { SongList } from './SongList';
import { UploadButton } from './UploadButton';
import type { Song } from '../types';

interface MainContentProps {
  currentView: string;
}

export const MainContent = ({ currentView }: MainContentProps) => {
  const {
    songs,
    playlists,
    albums,
    favorites,
    queue,
    getRecentPlays,
    createPlaylist,
    deletePlaylist,
    playSong,
    removeFromQueue,
    clearQueue,
  } = useMusic();

  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim());
      setNewPlaylistName('');
      setShowCreatePlaylist(false);
    }
  };

  const renderContent = () => {
    if (currentView === 'browse') {
      const recentSongs = getRecentPlays().slice(0, 6);
      const topArtists = Array.from(new Set(songs.map(s => s.artist))).slice(0, 6);
      
      return (
        <div className="space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-white">Artists</h2>
              <span className="text-gray-400">/</span>
              <span className="text-gray-400">Top 2023</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </button>
              <button className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex space-x-4">
            <button className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors">
              New Releases
            </button>
            <button className="px-8 py-3 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-700 transition-colors">
              New Feed
            </button>
            <button className="px-8 py-3 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-700 transition-colors">
              Shuffle Play
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search for songs, artists, or moods..."
              className="w-full bg-[#1a1a1a] text-white px-14 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <button 
              onClick={() => setShowCreatePlaylist(true)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Create Playlist
            </button>
          </div>

          {songs.length > 0 && (
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl p-10 text-white">
              <div className="text-xs font-semibold mb-2 uppercase tracking-wider">Curated Playlist</div>
              <h2 className="text-5xl font-bold mb-4">YOUR MUSIC</h2>
              <p className="text-white/90 mb-6 max-w-lg">
                Enjoy your personal collection. Each track tells a story.
              </p>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                  <span>{favorites.length} Likes</span>
                </div>
                <div>{songs.length} Songs</div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>0 min 0 sec</span>
                </div>
              </div>
            </div>
          )}

          {songs.length === 0 && (
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-12 text-white text-center">
              <svg className="w-20 h-20 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              <h3 className="text-2xl font-bold mb-2">No Music Yet</h3>
              <p className="text-white/80 mb-6">Upload your favorite tracks to get started</p>
              <UploadButton />
            </div>
          )}

          {topArtists.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Popular artists</h3>
                <button className="text-sm text-gray-400 hover:text-white transition-colors">See all</button>
              </div>
              <div className="grid grid-cols-6 gap-6">
                {topArtists.map((artist, idx) => (
                  <div key={idx} className="text-center group cursor-pointer">
                    <div className="w-full aspect-square bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4 flex items-center justify-center text-3xl group-hover:scale-105 transition-transform">
                      🎤
                    </div>
                    <p className="text-sm text-white font-medium truncate px-2">{artist}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    if (currentView === 'all-songs') {
      return (
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">All Songs</h2>
            <UploadButton />
          </div>
          <SongList songs={songs} />
        </div>
      );
    }

    if (currentView === 'recent') {
      const recentSongs = getRecentPlays();
      return (
        <div>
          <h2 className="text-3xl font-bold text-white mb-8">Recent Plays</h2>
          <SongList songs={recentSongs} />
        </div>
      );
    }

    if (currentView === 'favorites') {
      const favoriteSongs = songs.filter(s => favorites.includes(s.id));
      return (
        <div>
          <h2 className="text-3xl font-bold text-white mb-8">Favorites</h2>
          <SongList songs={favoriteSongs} />
        </div>
      );
    }

    if (currentView === 'albums') {
      return (
        <div>
          <h2 className="text-3xl font-bold text-white mb-8">Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {albums.map(album => {
              const albumSongs = songs.filter(s => album.songs.includes(s.id));
              return (
                <div
                  key={album.id}
                  className="bg-[#1a1a1a] rounded-lg p-5 hover:bg-[#252525] transition-colors cursor-pointer group"
                >
                  <div className="w-full aspect-square bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                    <svg className="w-16 h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <button className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-black ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </button>
                  </div>
                  <h3 className="text-white font-semibold truncate">{album.name}</h3>
                  <p className="text-gray-400 text-sm truncate">{album.artist}</p>
                  <p className="text-gray-500 text-xs mt-1">{albumSongs.length} songs</p>
                </div>
              );
            })}
          </div>
          {albums.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No albums found
            </div>
          )}
        </div>
      );
    }

    if (currentView === 'artists') {
      const artistMap = new Map<string, Song[]>();
      songs.forEach(song => {
        if (!artistMap.has(song.artist)) {
          artistMap.set(song.artist, []);
        }
        artistMap.get(song.artist)!.push(song);
      });

      return (
        <div>
          <h2 className="text-3xl font-bold text-white mb-8">Artists</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
            {Array.from(artistMap.entries()).map(([artist, artistSongs]) => (
              <div
                key={artist}
                className="text-center group cursor-pointer"
              >
                <div className="w-full aspect-square bg-gradient-to-br from-pink-500 to-orange-500 rounded-full mb-4 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold truncate">{artist}</h3>
                <p className="text-gray-400 text-sm">{artistSongs.length} songs</p>
              </div>
            ))}
          </div>
          {artistMap.size === 0 && (
            <div className="text-center py-12 text-gray-400">
              No artists found
            </div>
          )}
        </div>
      );
    }

    if (currentView === 'queue') {
      const queueSongs = songs.filter(s => queue.includes(s.id));
      return (
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Queue</h2>
            {queue.length > 0 && (
              <button
                onClick={clearQueue}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Clear Queue
              </button>
            )}
          </div>
          <div className="space-y-3">
            {queueSongs.map((song, index) => (
              <div
                key={song.id}
                className="bg-[#1a1a1a] p-5 rounded-lg flex items-center justify-between hover:bg-[#252525] transition-colors"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <span className="text-gray-400 w-8">{index + 1}</span>
                  <button
                    onClick={() => playSong(song)}
                    className="flex-1 text-left"
                  >
                    <h3 className="text-white font-semibold">{song.title}</h3>
                    <p className="text-gray-400 text-sm">{song.artist} • {song.album}</p>
                  </button>
                </div>
                <button
                  onClick={() => removeFromQueue(song.id)}
                  className="text-red-500 hover:text-red-400 transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          {queue.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              Queue is empty
            </div>
          )}
        </div>
      );
    }

    if (currentView.startsWith('playlist-')) {
      const playlistId = currentView.replace('playlist-', '');
      const playlist = playlists.find(p => p.id === playlistId);
      
      if (!playlist) return <div className="text-white">Playlist not found</div>;

      const playlistSongs = songs.filter(s => playlist.songs.includes(s.id));

      return (
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">{playlist.name}</h2>
            <button
              onClick={() => {
                if (confirm(`Delete playlist "${playlist.name}"?`)) {
                  deletePlaylist(playlist.id);
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Delete Playlist
            </button>
          </div>
          <SongList songs={playlistSongs} showAddToPlaylist={false} />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex-1 bg-[#0f0f0f] text-white px-12 py-10 overflow-y-auto overflow-x-hidden">
      <div className="max-w-full pb-8">
        {renderContent()}
      </div>

      {showCreatePlaylist && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowCreatePlaylist(false)}>
          <div className="bg-[#1a1a1a] p-6 rounded-xl max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Create New Playlist</h3>
            <input
              type="text"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder="Playlist name"
              className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onKeyPress={(e) => e.key === 'Enter' && handleCreatePlaylist()}
              autoFocus
            />
            <div className="flex space-x-3">
              <button
                onClick={handleCreatePlaylist}
                className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-3 rounded-lg font-semibold transition-colors"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowCreatePlaylist(false);
                  setNewPlaylistName('');
                }}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
