import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, List } from 'lucide-react';
import { Song, PlaybackState } from '../types/music';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';

interface MusicPlayerProps {
  currentSong: Song | null;
  playbackState: PlaybackState;
  onTogglePlay: () => void;
  onNextSong: () => void;
  onPreviousSong: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
  onTogglePlaylist: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  currentSong,
  playbackState,
  onTogglePlay,
  onNextSong,
  onPreviousSong,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleShuffle,
  onToggleRepeat,
  onTogglePlaylist
}) => {
  if (!currentSong) return null;

  const getRepeatIcon = () => {
    switch (playbackState.repeatMode) {
      case 'one':
        return <Repeat size={20} className="text-blue-400" />;
      case 'all':
        return <Repeat size={20} className="text-purple-400" />;
      default:
        return <Repeat size={20} className="text-gray-400" />;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 bg-opacity-95 backdrop-blur-xl border-t border-gray-700 p-4 z-40">
      <div className="max-w-6xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-4">
          <ProgressBar
            currentTime={playbackState.currentTime}
            duration={playbackState.duration}
            onSeek={onSeek}
          />
        </div>

        <div className="flex items-center justify-between">
          {/* Song Info */}
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            <img
              src={currentSong.artwork}
              alt={currentSong.title}
              className="w-16 h-16 rounded-lg object-cover shadow-lg"
            />
            <div className="min-w-0">
              <h3 className="font-semibold text-white truncate">{currentSong.title}</h3>
              <p className="text-sm text-gray-400 truncate">{currentSong.artist}</p>
              <p className="text-xs text-gray-500 truncate">{currentSong.album}</p>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleShuffle}
              className={`p-2 rounded-full hover:bg-gray-700 transition-colors duration-200 ${
                playbackState.isShuffled ? 'text-green-400' : 'text-gray-400'
              }`}
            >
              <Shuffle size={20} />
            </button>

            <button
              onClick={onPreviousSong}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200 text-gray-300"
            >
              <SkipBack size={24} />
            </button>

            <button
              onClick={onTogglePlay}
              className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 transition-all duration-200 text-white shadow-lg transform hover:scale-105"
            >
              {playbackState.isPlaying ? (
                <Pause size={24} />
              ) : (
                <Play size={24} />
              )}
            </button>

            <button
              onClick={onNextSong}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200 text-gray-300"
            >
              <SkipForward size={24} />
            </button>

            <button
              onClick={onToggleRepeat}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
            >
              {getRepeatIcon()}
            </button>
          </div>

          {/* Volume and Playlist */}
          <div className="flex items-center space-x-4 flex-1 justify-end">
            <VolumeControl
              volume={playbackState.volume}
              isMuted={playbackState.isMuted}
              onVolumeChange={onVolumeChange}
              onToggleMute={onToggleMute}
            />
            <button
              onClick={onTogglePlaylist}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200 text-gray-300"
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;