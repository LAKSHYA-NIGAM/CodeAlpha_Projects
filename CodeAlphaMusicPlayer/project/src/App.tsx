import React, { useState } from 'react';
import { Music } from 'lucide-react';
import MusicPlayer from './components/MusicPlayer';
import PlaylistPanel from './components/PlaylistPanel';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { sampleSongs } from './data/sampleSongs';

function App() {
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const {
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
  } = useAudioPlayer(sampleSongs);

  const togglePlaylist = () => {
    setIsPlaylistOpen(!isPlaylistOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Header */}
      <header className="p-6 border-b border-gray-700 bg-gray-900 bg-opacity-50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center">
            <Music size={32} className="mr-3 text-blue-400" />
            Music Player
          </h1>
          <p className="text-gray-400 mt-2">Experience your music like never before</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 pb-40">
        <div className="max-w-6xl mx-auto">
          {currentSong ? (
            <div className="text-center">
              <div className="mb-8">
                <img
                  src={currentSong.artwork}
                  alt={currentSong.title}
                  className="w-80 h-80 mx-auto rounded-2xl shadow-2xl object-cover"
                />
              </div>
              <div className="mb-8">
                <h2 className="text-4xl font-bold mb-2">{currentSong.title}</h2>
                <p className="text-xl text-gray-300 mb-1">{currentSong.artist}</p>
                <p className="text-lg text-gray-400">{currentSong.album}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <Music size={64} className="mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-bold mb-2">No Song Selected</h2>
              <p className="text-gray-400">Choose a song from the playlist to start listening</p>
            </div>
          )}

          {/* Keyboard Shortcuts Info */}
          <div className="mt-12 bg-gray-800 bg-opacity-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Keyboard Shortcuts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Play/Pause</span>
                <span className="text-gray-300">Space</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Seek Forward</span>
                <span className="text-gray-300">Right Arrow</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Seek Backward</span>
                <span className="text-gray-300">Left Arrow</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Volume Up</span>
                <span className="text-gray-300">Up Arrow</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Volume Down</span>
                <span className="text-gray-300">Down Arrow</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Music Player */}
      <MusicPlayer
        currentSong={currentSong}
        playbackState={playbackState}
        onTogglePlay={togglePlay}
        onNextSong={nextSong}
        onPreviousSong={previousSong}
        onSeek={seekTo}
        onVolumeChange={setVolume}
        onToggleMute={toggleMute}
        onToggleShuffle={toggleShuffle}
        onToggleRepeat={toggleRepeat}
        onTogglePlaylist={togglePlaylist}
      />

      {/* Playlist Panel */}
      <PlaylistPanel
        playlist={playlist}
        currentSong={currentSong}
        currentIndex={currentIndex}
        onSongSelect={playSong}
        isOpen={isPlaylistOpen}
        onToggle={togglePlaylist}
      />

      {/* Overlay */}
      {isPlaylistOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={togglePlaylist}
        />
      )}
    </div>
  );
}

export default App;