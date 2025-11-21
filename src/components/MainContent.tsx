import { useState } from 'react';
import { useMusic } from '../context/MusicContext';
import { SongList } from './SongList';
import { UploadButton } from './UploadButton';
import type { Song } from '../types';

interface MainContentProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const MainContent = ({ currentView, setCurrentView }: MainContentProps) => {
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
    currentSong,
    isPlaying,
    duration,
    togglePlay,
  } = useMusic();


  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim());
      setNewPlaylistName('');
      setShowCreatePlaylist(false);
    }
  };

  

  const renderContent = () => {
    if (currentView === 'browse') {
      const topArtists = Array.from(new Set(songs.map(s => s.artist))).slice(0, 6);
      
      return (
        <div className="flex flex-col gap-6">

          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors flex-shrink-0">
              New Releases
            </button>
            
          </div>

          <div className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search for songs by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-[#1a1a1a] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              {/* Playlists chips next to artists/header */}
              <div className="flex items-center gap-3 mt-3 sm:mt-0 sm:ml-auto overflow-x-auto">
                {playlists.length === 0 ? (
                  <button onClick={() => setShowCreatePlaylist(true)} className="px-3 py-1 bg-yellow-500 text-black rounded-full text-sm">+ New Playlist</button>
                ) : (
                  <>
                    {playlists.map(p => (
                      <button
                        key={p.id}
                        onClick={() => setCurrentView(`playlist-${p.id}`)}
                        className="px-3 py-1 bg-gray-800 text-white rounded-full text-sm whitespace-nowrap"
                      >
                        {p.name}
                      </button>
                    ))}
                    <button onClick={() => setShowCreatePlaylist(true)} className="px-3 py-1 bg-yellow-500 text-black rounded-full text-sm">+ New</button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Search results (by title) */}
          {searchQuery.trim() !== '' && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-white mb-4">Search results for "{searchQuery}"</h3>
              <SongList songs={songs.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()))} />
            </div>
          )}

          {songs.length > 0 && (
              <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center gap-6 shadow-lg">
                <div className="w-28 h-28 md:w-36 md:h-36 bg-[#111] rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                {currentSong ? (
                  currentSong.coverArt ? (
                    // show coverArt image when available
                    <img src={currentSong.coverArt} alt={currentSong.title} className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-20 h-20 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  )
                ) : (
                  <svg className="w-20 h-20 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                )}
              </div>

                <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold mb-2 uppercase tracking-wider">Now Playing</div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 truncate">{currentSong?.title || 'Nothing playing'}</h2>
                <p className="text-white/90 mb-4 truncate">{currentSong ? `${currentSong.artist}${currentSong.album ? ` • ${currentSong.album}` : ''}` : 'Your collection is ready — play a song to see details here.'}</p>
                <p className="text-white/90 mb-6 max-w-lg truncate">{currentSong?.file?.name || 'Enjoy your personal collection. Each track tells a story.'}</p>

                <div className="flex items-center space-x-4">
                  <button onClick={togglePlay} className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors">
                    {isPlaying ? (
                      <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v4a1 1 0 11-2 0V8z"/></svg>
                    ) : (
                      <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/></svg>
                    )}
                  </button>

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
                      <span>{duration ? `${Math.floor(duration/60)}:${String(Math.floor(duration%60)).padStart(2,'0')}` : '0:00'}</span>
                    </div>
                  </div>
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {albums.map(album => {
              const albumSongs = songs.filter(s => album.songs.includes(s.id));
              return (
                <div
                  key={album.id}
                  className="bg-[#111] rounded-lg p-4 hover:bg-[#1b1b1b] transition-colors cursor-pointer group relative"
                  onClick={() => setCurrentView(`album-${album.id}`)}
                >
                  <div className="w-full aspect-square bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                    <svg className="w-16 h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <button
                      onClick={(e) => { e.stopPropagation(); playSong(songs.find(s => album.songs.includes(s.id))!); }}
                      className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      title="Play album"
                    >
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {Array.from(artistMap.entries()).map(([artist, artistSongs]) => (
              <div
                key={artist}
                className="text-center group cursor-pointer relative"
                onClick={() => setCurrentView(`artist-${encodeURIComponent(artist)}`)}
              >
                <div className="w-full aspect-square bg-gradient-to-br from-pink-500 to-orange-500 rounded-full mb-4 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <button
                    onClick={(e) => { e.stopPropagation(); const toPlay = artistSongs[0]; if (toPlay) playSong(toPlay); }}
                    className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    title="Play top artist song"
                  >
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-black ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </button>
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

    if (currentView.startsWith('album-')) {
      const albumId = currentView.replace('album-', '');
      const album = albums.find(a => a.id === albumId);
      if (!album) return <div className="text-white">Album not found</div>;
      const albumSongs = songs.filter(s => album.songs.includes(s.id));

      return (
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">{album.name}</h2>
            <button className="text-sm text-gray-400 hover:text-white transition-colors">Back</button>
          </div>
          <div className="mb-8">
            <div className="w-full md:w-1/3 bg-[#1a1a1a] rounded-lg p-6">
              <h3 className="text-white font-semibold">{album.artist}</h3>
              <p className="text-gray-400 text-sm mt-2">{albumSongs.length} songs</p>
            </div>
          </div>
          <SongList songs={albumSongs} />
        </div>
      );
    }

    if (currentView.startsWith('artist-')) {
      const artistName = decodeURIComponent(currentView.replace('artist-', ''));
      const artistSongs = songs.filter(s => s.artist === artistName);

      return (
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">{artistName}</h2>
            <button className="text-sm text-gray-400 hover:text-white transition-colors">See all</button>
          </div>
          <SongList songs={artistSongs} />
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
    <div className="flex-1 bg-[#0f0f0f] text-white px-6 py-8 overflow-y-auto overflow-x-hidden min-w-0">
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
