import React from 'react';
import { Song } from '../types/music';
import { Play, Music } from 'lucide-react';

interface PlaylistPanelProps {
  playlist: Song[];
  currentSong: Song | null;
  currentIndex: number;
  onSongSelect: (song: Song, index: number) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const PlaylistPanel: React.FC<PlaylistPanelProps> = ({
  playlist,
  currentSong,
  currentIndex,
  onSongSelect,
  isOpen,
  onToggle
}) => {
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`fixed right-0 top-0 h-full w-80 bg-gray-900 bg-opacity-95 backdrop-blur-xl border-l border-gray-700 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}>
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Music size={24} className="mr-2" />
            Playlist
          </h2>
          <button
            onClick={onToggle}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            ×
          </button>
        </div>
      </div>

      <div className="overflow-y-auto h-full pb-32">
        {playlist.map((song, index) => (
          <div
            key={song.id}
            className={`p-4 border-b border-gray-800 cursor-pointer hover:bg-gray-800 transition-colors duration-200 ${
              currentIndex === index ? 'bg-gray-800 border-l-4 border-blue-500' : ''
            }`}
            onClick={() => onSongSelect(song, index)}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={song.artwork}
                  alt={song.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                {currentIndex === index && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                    <Play size={16} className="text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-medium truncate ${
                  currentIndex === index ? 'text-blue-400' : 'text-white'
                }`}>
                  {song.title}
                </h3>
                <p className="text-sm text-gray-400 truncate">{song.artist}</p>
              </div>
              <span className="text-xs text-gray-500">{formatDuration(song.duration)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900 border-t border-gray-700">
        <p className="text-sm text-gray-400 text-center">
          {playlist.length} songs • {formatDuration(playlist.reduce((acc, song) => acc + song.duration, 0))}
        </p>
      </div>
    </div>
  );
};

export default PlaylistPanel;