import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Song, Playlist, Album } from '../types';

interface MusicContextType {
  songs: Song[];
  playlists: Playlist[];
  albums: Album[];
  favorites: string[];
  queue: string[];
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  shuffle: boolean;
  toggleShuffle: () => void;
  addSongs: (files: FileList) => Promise<void>;
  removeSong: (id: string) => void;
  createPlaylist: (name: string) => void;
  addToPlaylist: (playlistId: string, songId: string) => void;
  removeFromPlaylist: (playlistId: string, songId: string) => void;
  deletePlaylist: (id: string) => void;
  toggleFavorite: (songId: string) => void;
  addToQueue: (songId: string) => void;
  removeFromQueue: (songId: string) => void;
  clearQueue: () => void;
  playSong: (song: Song) => void;
  playNext: () => void;
  playPrevious: () => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  getRecentPlays: () => Song[];
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [queue, setQueue] = useState<string[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audio] = useState(new Audio());
  const [shuffle, setShuffle] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('harmonyhub-data');
    if (data) {
      const parsed = JSON.parse(data);
      setPlaylists(parsed.playlists || []);
      setFavorites(parsed.favorites || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('harmonyhub-data', JSON.stringify({ playlists, favorites }));
  }, [playlists, favorites]);

  useEffect(() => {
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => playNext();

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audio, queue]);

  const addSongs = async (files: FileList) => {
    const toAdd: Song[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('audio/')) continue;

      // detect duplicates by filename + size + lastModified
      const alreadyInState = songs.some(s =>
        s.file && s.file.name === file.name && s.file.size === file.size && (s.file as any).lastModified === (file as any).lastModified
      );
      const alreadyInBatch = toAdd.some(s => s.file.name === file.name && s.file.size === file.size && (s.file as any).lastModified === (file as any).lastModified);

      if (alreadyInState || alreadyInBatch) {
        console.info(`Skipped duplicate upload: ${file.name}`);
        continue;
      }

      const url = URL.createObjectURL(file);
      const song: Song = {
        id: `${Date.now()}-${i}`,
        title: file.name.replace(/\.[^/.]+$/, ''),
        artist: 'Unknown Artist',
        album: 'Unknown Album',
        duration: 0,
        file,
        url,
        addedAt: new Date(),
        playCount: 0,
      };
      toAdd.push(song);
    }

    const totalAudio = (() => {
      let count = 0;
      for (let i = 0; i < files.length; i++) if (files[i].type.startsWith('audio/')) count++;
      return count;
    })();

    const added = toAdd.length;
    const skipped = totalAudio - added;

    if (added > 0) {
      setSongs(prev => {
        const merged = [...prev, ...toAdd];
        updateAlbums(merged);
        return merged;
      });
    }

    // Show a simple alert to the user reporting duplicates / adds
    if (totalAudio === 0) {
      alert('No audio files selected.');
    } else if (added === 0 && skipped > 0) {
      alert(`${skipped} duplicate file(s) were skipped; no new files were added.`);
    } else if (added > 0 && skipped > 0) {
      alert(`${added} file(s) added. ${skipped} duplicate file(s) were skipped.`);
    } else if (added > 0 && skipped === 0) {
      alert(`${added} file(s) added.`);
    }
  };

  const updateAlbums = (allSongs: Song[]) => {
    const albumMap = new Map<string, Album>();
    
    allSongs.forEach(song => {
      const key = `${song.album}-${song.artist}`;
      if (!albumMap.has(key)) {
        albumMap.set(key, {
          id: key,
          name: song.album,
          artist: song.artist,
          songs: [],
          coverArt: song.coverArt,
        });
      }
      albumMap.get(key)!.songs.push(song.id);
    });

    setAlbums(Array.from(albumMap.values()));
  };

  const removeSong = (id: string) => {
    setSongs(prev => prev.filter(s => s.id !== id));
    setQueue(prev => prev.filter(sid => sid !== id));
  };

  const createPlaylist = (name: string) => {
    const playlist: Playlist = {
      id: Date.now().toString(),
      name,
      songs: [],
      createdAt: new Date(),
    };
    setPlaylists(prev => [...prev, playlist]);
  };

  const addToPlaylist = (playlistId: string, songId: string) => {
    setPlaylists(prev => prev.map(p => 
      p.id === playlistId ? { ...p, songs: [...p.songs, songId] } : p
    ));
  };

  const removeFromPlaylist = (playlistId: string, songId: string) => {
    setPlaylists(prev => prev.map(p =>
      p.id === playlistId ? { ...p, songs: p.songs.filter(id => id !== songId) } : p
    ));
  };

  const deletePlaylist = (id: string) => {
    setPlaylists(prev => prev.filter(p => p.id !== id));
  };

  const toggleFavorite = (songId: string) => {
    setFavorites(prev =>
      prev.includes(songId) ? prev.filter(id => id !== songId) : [...prev, songId]
    );
  };

  const addToQueue = (songId: string) => {
    setQueue(prev => [...prev, songId]);
  };

  const removeFromQueue = (songId: string) => {
    setQueue(prev => prev.filter(id => id !== songId));
  };

  const clearQueue = () => setQueue([]);

  const playSong = (song: Song) => {
    setCurrentSong(song);
    audio.src = song.url;
    audio.play();
    setIsPlaying(true);
    
    setSongs(prev => prev.map(s =>
      s.id === song.id ? { ...s, lastPlayed: new Date(), playCount: s.playCount + 1 } : s
    ));
  };

  const playNext = () => {
    if (queue.length > 0) {
      const nextSongId = queue[0];
      const nextSong = songs.find(s => s.id === nextSongId);
      if (nextSong) {
        playSong(nextSong);
        setQueue(prev => prev.slice(1));
      }
    } else if (songs.length > 0) {
      if (shuffle && songs.length > 1) {
        // pick a random song
        const currentId = currentSong?.id;
        let nextIndex = Math.floor(Math.random() * songs.length);
        // avoid picking the same song if possible
        if (currentId) {
          const tries = 5;
          let attempt = 0;
          while (songs[nextIndex].id === currentId && attempt < tries) {
            nextIndex = Math.floor(Math.random() * songs.length);
            attempt++;
          }
        }
        playSong(songs[nextIndex]);
      } else if (currentSong) {
        const currentIndex = songs.findIndex(s => s.id === currentSong.id);
        if (currentIndex < songs.length - 1) {
          playSong(songs[currentIndex + 1]);
        }
      } else {
        // no current song, play first
        playSong(songs[0]);
      }
    }
  };

  const playPrevious = () => {
    if (songs.length === 0) return;
    if (shuffle) {
      // pick a random song
      const currentId = currentSong?.id;
      let prevIndex = Math.floor(Math.random() * songs.length);
      if (currentId) {
        const tries = 5;
        let attempt = 0;
        while (songs[prevIndex].id === currentId && attempt < tries) {
          prevIndex = Math.floor(Math.random() * songs.length);
          attempt++;
        }
      }
      playSong(songs[prevIndex]);
      return;
    }

    if (currentSong) {
      const currentIndex = songs.findIndex(s => s.id === currentSong.id);
      if (currentIndex > 0) {
        playSong(songs[currentIndex - 1]);
      }
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (time: number) => {
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const getRecentPlays = () => {
    return songs
      .filter(s => s.lastPlayed)
      .sort((a, b) => (b.lastPlayed?.getTime() || 0) - (a.lastPlayed?.getTime() || 0))
      .slice(0, 20);
  };

  return (
    <MusicContext.Provider value={{
      shuffle,
      toggleShuffle: () => setShuffle(s => !s),
      songs,
      playlists,
      albums,
      favorites,
      queue,
      currentSong,
      isPlaying,
      currentTime,
      duration,
      addSongs,
      removeSong,
      createPlaylist,
      addToPlaylist,
      removeFromPlaylist,
      deletePlaylist,
      toggleFavorite,
      addToQueue,
      removeFromQueue,
      clearQueue,
      playSong,
      playNext,
      playPrevious,
      togglePlay,
      seek,
      getRecentPlays,
    }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) throw new Error('useMusic must be used within MusicProvider');
  return context;
};
