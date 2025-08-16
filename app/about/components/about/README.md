# Music Player Component

## Overview
The `MusicPlayer` component is a modern, custom-built music player that replaces the previous Spotify integration. It provides a sleek, responsive interface for playing local audio files.

## Features
- **Custom Design**: Modern gradient-based UI with smooth animations
- **Playback Controls**: Play/pause, skip forward/backward (10 seconds)
- **Progress Bar**: Interactive progress bar with click-to-seek functionality
- **Volume Control**: Mute/unmute with volume slider
- **Responsive**: Works on both desktop and mobile devices
- **Dark Mode Support**: Automatically adapts to light/dark themes

## Audio File
- **Source**: `/public/music/hindia.mp3`
- **Format**: MP3
- **Size**: ~6.2MB

## Technical Details
- Built with React hooks (useState, useRef, useEffect)
- Uses Framer Motion for smooth animations
- FontAwesome icons for UI elements
- Tailwind CSS for styling
- Custom CSS for slider thumb styling

## Usage
The component is automatically imported and used in the About page, replacing the previous Spotify card component.

## Browser Compatibility
- Modern browsers with HTML5 audio support
- Requires JavaScript enabled
- Responsive design for all screen sizes
