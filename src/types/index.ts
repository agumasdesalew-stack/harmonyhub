export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  file: File;
  url: string;
  coverArt?: string;
  addedAt: Date;
  lastPlayed?: Date;
  playCount: number;
}

export interface Playlist {
  id: string;
  name: string;
  songs: string[];
  createdAt: Date;
  coverArt?: string;
}

export interface Album {
  id: string;
  name: string;
  artist: string;
  songs: string[];
  coverArt?: string;
}
