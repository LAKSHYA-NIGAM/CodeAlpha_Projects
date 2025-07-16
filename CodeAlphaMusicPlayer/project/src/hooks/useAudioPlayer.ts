import { useState, useRef, useEffect, useCallback } from 'react';
import { Song, PlaybackState } from '../types/music';

export const useAudioPlayer = (playlist: Song[]) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState<Song | null>(playlist[0] || null);
  const [playbackState, setPlaybackState] = useState<PlaybackState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    isShuffled: false,
    repeatMode: 'none'
  });

  const createAudioElement = useCallback((song: Song) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.removeEventListener('ended', handleSongEnd);
      audioRef.current.removeEventListener('loadedmetadata', handleMetadataLoad);
      audioRef.current.removeEventListener('error', handleError);
    }

    const audio = new Audio(song.src);
    audioRef.current = audio;

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleSongEnd);
    audio.addEventListener('loadedmetadata', handleMetadataLoad);
    audio.addEventListener('error', handleError);

    return audio;
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setPlaybackState(prev => ({
        ...prev,
        currentTime: audioRef.current!.currentTime
      }));
    }
  }, []);

  const handleSongEnd = useCallback(() => {
    if (playbackState.repeatMode === 'one') {
      audioRef.current?.play();
    } else if (playbackState.repeatMode === 'all' || currentIndex < playlist.length - 1) {
      nextSong();
    } else {
      setPlaybackState(prev => ({ ...prev, isPlaying: false }));
    }
  }, [playbackState.repeatMode, currentIndex, playlist.length]);

  const handleMetadataLoad = useCallback(() => {
    if (audioRef.current) {
      setPlaybackState(prev => ({
        ...prev,
        duration: audioRef.current!.duration
      }));
    }
  }, []);

  const handleError = useCallback((e: Event) => {
    console.error('Audio error:', e);
    setPlaybackState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const playSong = useCallback((song: Song, index: number) => {
    setCurrentSong(song);
    setCurrentIndex(index);
    
    const audio = createAudioElement(song);
    audio.volume = playbackState.volume;
    audio.muted = playbackState.isMuted;
    
    audio.play().then(() => {
      setPlaybackState(prev => ({ ...prev, isPlaying: true }));
    }).catch(error => {
      console.error('Play failed:', error);
    });
  }, [createAudioElement, playbackState.volume, playbackState.isMuted]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current || !currentSong) return;

    if (playbackState.isPlaying) {
      audioRef.current.pause();
      setPlaybackState(prev => ({ ...prev, isPlaying: false }));
    } else {
      audioRef.current.play().then(() => {
        setPlaybackState(prev => ({ ...prev, isPlaying: true }));
      }).catch(error => {
        console.error('Play failed:', error);
      });
    }
  }, [playbackState.isPlaying, currentSong]);

  const nextSong = useCallback(() => {
    let nextIndex;
    if (playbackState.isShuffled) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      nextIndex = (currentIndex + 1) % playlist.length;
    }
    playSong(playlist[nextIndex], nextIndex);
  }, [currentIndex, playlist, playbackState.isShuffled, playSong]);

  const previousSong = useCallback(() => {
    let prevIndex;
    if (playbackState.isShuffled) {
      prevIndex = Math.floor(Math.random() * playlist.length);
    } else {
      prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    }
    playSong(playlist[prevIndex], prevIndex);
  }, [currentIndex, playlist, playbackState.isShuffled, playSong]);

  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setPlaybackState(prev => ({ ...prev, currentTime: time }));
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      setPlaybackState(prev => ({ ...prev, volume, isMuted: false }));
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      const newMuted = !playbackState.isMuted;
      audioRef.current.muted = newMuted;
      setPlaybackState(prev => ({ ...prev, isMuted: newMuted }));
    }
  }, [playbackState.isMuted]);

  const toggleShuffle = useCallback(() => {
    setPlaybackState(prev => ({ ...prev, isShuffled: !prev.isShuffled }));
  }, []);

  const toggleRepeat = useCallback(() => {
    setPlaybackState(prev => ({
      ...prev,
      repeatMode: prev.repeatMode === 'none' ? 'all' : prev.repeatMode === 'all' ? 'one' : 'none'
    }));
  }, []);

  // Initialize with first song
  useEffect(() => {
    if (playlist.length > 0 && !currentSong) {
      setCurrentSong(playlist[0]);
      createAudioElement(playlist[0]);
    }
  }, [playlist, currentSong, createAudioElement]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seekTo(Math.max(0, playbackState.currentTime - 10));
          break;
        case 'ArrowRight':
          e.preventDefault();
          seekTo(Math.min(playbackState.duration, playbackState.currentTime + 10));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(Math.min(1, playbackState.volume + 0.1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(Math.max(0, playbackState.volume - 0.1));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, seekTo, setVolume, playbackState.currentTime, playbackState.duration, playbackState.volume]);

  return {
    currentSong,
    playlist,
    playbackState,
    currentIndex,
    playSong,
    togglePlay,
    nextSong,
    previousSong,
    seekTo,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat
  };
};