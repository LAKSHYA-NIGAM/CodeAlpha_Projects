import React from 'react';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentTime, duration, onSeek }) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    onSeek(percentage * duration);
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex items-center space-x-3 text-sm text-gray-300">
      <span className="w-12 text-right">{formatTime(currentTime)}</span>
      <div
        className="flex-1 h-2 bg-gray-700 rounded-full cursor-pointer group"
        onClick={handleClick}
      >
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative transition-all duration-150 group-hover:from-blue-400 group-hover:to-purple-400"
          style={{ width: `${progressPercentage}%` }}
        >
          <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>
        </div>
      </div>
      <span className="w-12">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;