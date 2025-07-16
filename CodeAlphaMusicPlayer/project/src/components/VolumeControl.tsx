import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute
}) => {
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(parseFloat(e.target.value));
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onToggleMute}
        className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
      >
        {isMuted ? (
          <VolumeX size={20} className="text-gray-400" />
        ) : (
          <Volume2 size={20} className="text-gray-300" />
        )}
      </button>
      <div className="w-20 relative">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            width: 16px;
            height: 16px;
            background: linear-gradient(45deg, #3b82f6, #8b5cf6);
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
          .slider::-moz-range-thumb {
            width: 16px;
            height: 16px;
            background: linear-gradient(45deg, #3b82f6, #8b5cf6);
            border-radius: 50%;
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
        `}</style>
      </div>
    </div>
  );
};

export default VolumeControl;