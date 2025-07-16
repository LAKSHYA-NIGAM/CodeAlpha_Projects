export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  src: string;
  artwork: string;
}

export interface PlaybackState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isShuffled: boolean;
  repeatMode: 'none' | 'one' | 'all';
}

export interface PlayerContextType {
  currentSong: Song | null;
  playlist: Song[];
  playbackState: PlaybackState;
  currentIndex: number;
  isPlaylistOpen: boolean;
  setIsPlaylistOpen: (open: boolean) => void;
  playSong: (song: Song, index: number) => void;
  togglePlay: () => void;
  nextSong: () => void;
  previousSong: () => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
}