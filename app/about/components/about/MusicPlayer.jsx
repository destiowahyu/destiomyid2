import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlay, 
  faPause, 
  faVolumeUp, 
  faVolumeMute,
  faMusic,
  faForward,
  faBackward,
  faListUl
} from "@fortawesome/free-solid-svg-icons";

// Playlist array - mudah untuk menambah/mengurangi lagu
const playlist = [
  {
    id: 1,
    title: "Everything you are",
    artist: "Hindia", 
    src: "/music/everything.mp3"
  },
  {
    id: 2,
    title: "Kita ke Sana",
    artist: "Hindia",
    src: "/music/kitakesana.mp3"
  },
  {
    id: 3,
    title: "Nina", 
    artist: ".Feast",
    src: "/music/nina.mp3"
  },
  {
    id: 4,
    title: "Duka",
    artist: "Last Child", 
    src: "/music/duka.mp3"
  },
  {
    id: 5,
    title: "Tak Ada Ujungnya",
    artist: "Rony Parulian", 
    src: "/music/takadaujungnya.mp3"
  },
  {
    id: 6,
    title: "Cincin",
    artist: "Hindia", 
    src: "/music/cincin.mp3"
  },
  {
    id: 7,
    title: "Serana",
    artist: "For Revenge", 
    src: "/music/serana.mp3"
  }

];

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const currentTrack = playlist[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const handleEnded = () => {
      setIsPlaying(false);
      // Auto play next track
      playNextTrack();
    };
    const handleCanPlay = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const handleLoadedData = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
        setIsLoading(false);
      }
    };
    
    const handleCanPlayThrough = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
        setIsLoading(false);
      }
    };
    
    const handleError = (e) => {
      console.error('Audio error:', e);
      setError('Failed to load audio file');
      setIsLoading(false);
    };
    
    const handleLoadStart = () => {
      setIsLoading(true);
      setError(null);
    };
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadstart', handleLoadStart);
    
    // Force load metadata
    audio.load();
    
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadstart', handleLoadStart);
    };
  }, [currentTrackIndex]);

  const playNextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    setCurrentTime(0);
    if (isPlaying) {
      // If currently playing, continue playing the next track
      setTimeout(() => {
        audioRef.current.play();
      }, 100);
    }
  };

  const playPreviousTrack = () => {
    const prevIndex = currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
    setCurrentTime(0);
    if (isPlaying) {
      // If currently playing, continue playing the previous track
      setTimeout(() => {
        audioRef.current.play();
      }, 100);
    }
  };

  const playTrack = (index) => {
    setCurrentTrackIndex(index);
    setCurrentTime(0);
    setIsPlaying(false);
    // Auto play after track change
    setTimeout(() => {
      audioRef.current.play();
      setIsPlaying(true);
    }, 100);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * duration;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const skipForward = () => {
    audioRef.current.currentTime = Math.min(currentTime + 10, duration);
  };

  const skipBackward = () => {
    audioRef.current.currentTime = Math.max(currentTime - 10, 0);
  };

  return (
    <motion.div 
      className="mt-6 w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-full">
            <FontAwesomeIcon 
              icon={faMusic} 
              className="text-white text-xl"
            />
          </div>
          <h3 className="ml-3 text-lg font-semibold text-gray-800 dark:text-white">
            Now Playing
          </h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPlaylist(!showPlaylist)}
            className="ml-auto p-2 text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
          >
            <FontAwesomeIcon icon={faListUl} className="text-lg" />
          </motion.button>
        </div>

        {/* Song Info */}
        <div className="text-center mb-6">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            {currentTrack.title}
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            {currentTrack.artist}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Track {currentTrackIndex + 1} of {playlist.length}
          </p>
        </div>

        {/* Playlist */}
        {showPlaylist && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 bg-white dark:bg-gray-800 rounded-lg p-3 max-h-32 overflow-y-auto"
          >
            <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Playlist</h5>
            {playlist.map((track, index) => (
              <div
                key={track.id}
                onClick={() => playTrack(index)}
                className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                  index === currentTrackIndex
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-gray-500 dark:text-gray-400 w-6">
                    {index + 1}
                  </span>
                  <div>
                    <p className={`text-sm font-medium ${
                      index === currentTrackIndex 
                        ? 'text-purple-700 dark:text-purple-300' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {track.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {track.artist}
                    </p>
                  </div>
                </div>
                {index === currentTrackIndex && isPlaying && (
                  <div className="flex space-x-1">
                    <div className="w-1 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                    <div className="w-1 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}

        {/* Progress Bar */}
        <div className="mb-6">
          {error ? (
            <div className="text-center py-4">
              <p className="text-red-500 text-sm">{error}</p>
              <button 
                onClick={() => {
                  setError(null);
                  setIsLoading(true);
                  audioRef.current.load();
                }}
                className="mt-2 text-blue-500 hover:text-blue-600 text-sm underline"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <div 
                ref={progressRef}
                className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 cursor-pointer relative"
                onClick={handleProgressClick}
              >
                <motion.div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                  transition={{ duration: 0.1 }}
                />
                <motion.div 
                  className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white dark:bg-gray-300 rounded-full shadow-lg border-2 border-purple-500"
                  style={{ left: `${(currentTime / duration) * 100}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>
                  {isLoading ? (
                    <span className="inline-block w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    formatTime(duration)
                  )}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-6 mb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={playPreviousTrack}
            disabled={isLoading || error}
            className={`p-3 transition-colors ${
              isLoading || error 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400'
            }`}
          >
            <FontAwesomeIcon icon={faBackward} className="text-lg" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            disabled={isLoading || error}
            className={`p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
              isLoading || error 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-500 to-blue-500'
            }`}
          >
            {isLoading ? (
              <span className="inline-block w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <FontAwesomeIcon 
                icon={isPlaying ? faPause : faPlay} 
                className="text-white text-xl"
              />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={playNextTrack}
            disabled={isLoading || error}
            className={`p-3 transition-colors ${
              isLoading || error 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400'
            }`}
          >
            <FontAwesomeIcon icon={faForward} className="text-lg" />
          </motion.button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMute}
            disabled={isLoading || error}
            className={`p-2 transition-colors ${
              isLoading || error 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400'
            }`}
          >
            <FontAwesomeIcon 
              icon={isMuted ? faVolumeMute : faVolumeUp} 
              className="text-lg"
            />
          </motion.button>
          
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              disabled={isLoading || error}
              className={`w-24 h-2 rounded-lg appearance-none slider ${
                isLoading || error 
                  ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' 
                  : 'bg-gray-200 dark:bg-gray-700 cursor-pointer'
              }`}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 min-w-[2rem] text-center">
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </span>
          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src={currentTrack.src}
          preload="metadata"
          crossOrigin="anonymous"
        />
      </div>

      {/* Custom Slider Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8b5cf6, #3b82f6);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8b5cf6, #3b82f6);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </motion.div>
  );
};

export default MusicPlayer;
