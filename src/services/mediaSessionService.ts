import { Capacitor } from '@capacitor/core';

// Type definitions for the media session plugin
interface MediaSessionMetadata {
  title?: string;
  artist?: string;
  album?: string;
  artwork?: { src: string; sizes?: string; type?: string }[];
}

interface MediaSessionPlugin {
  setMetadata(options: MediaSessionMetadata): Promise<void>;
  setPlaybackState(options: { playbackState: 'playing' | 'paused' | 'none' }): Promise<void>;
  setActionHandler(options: { action: string }, callback: () => void): Promise<void>;
  setPositionState?(options: { duration?: number; playbackRate?: number; position?: number }): Promise<void>;
}

// Dynamic import for the Capacitor plugin
let mediaSessionPlugin: MediaSessionPlugin | null = null;

/**
 * Initialize the media session service
 */
export async function initMediaSession(): Promise<boolean> {
  // Only initialize on native platforms
  if (!Capacitor.isNativePlatform()) {
    console.log('Media Session: Not on native platform, using web API');
    return 'mediaSession' in navigator;
  }

  try {
    const { MediaSession } = await import('@jofr/capacitor-media-session');
    mediaSessionPlugin = MediaSession as MediaSessionPlugin;
    console.log('Media Session: Capacitor plugin initialized');
    return true;
  } catch (error) {
    console.warn('Media Session: Capacitor plugin not available, falling back to web API');
    return 'mediaSession' in navigator;
  }
}

/**
 * Set media metadata (title, artist, album, artwork)
 */
export async function setMediaMetadata(metadata: {
  title: string;
  artist: string;
  album?: string;
  artworkUrl?: string;
}): Promise<void> {
  const { title, artist, album = 'Quran Insight', artworkUrl } = metadata;
  
  // Generate absolute artwork URL for native platforms
  const getAbsoluteArtworkUrl = (url?: string): string | undefined => {
    if (!url) return undefined;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    // For relative URLs, try to construct absolute URL
    if (typeof window !== 'undefined') {
      return new URL(url, window.location.origin).href;
    }
    return url;
  };

  const absoluteArtworkUrl = getAbsoluteArtworkUrl(artworkUrl);

  if (Capacitor.isNativePlatform() && mediaSessionPlugin) {
    // Use Capacitor plugin
    try {
      await mediaSessionPlugin.setMetadata({
        title,
        artist,
        album,
        artwork: absoluteArtworkUrl ? [{ src: absoluteArtworkUrl }] : undefined,
      });
    } catch (error) {
      console.warn('Failed to set media metadata via Capacitor:', error);
    }
  } else if ('mediaSession' in navigator) {
    // Use Web Media Session API
    navigator.mediaSession.metadata = new MediaMetadata({
      title,
      artist,
      album,
      artwork: absoluteArtworkUrl ? [
        { src: absoluteArtworkUrl, sizes: '96x96', type: 'image/png' },
        { src: absoluteArtworkUrl, sizes: '128x128', type: 'image/png' },
        { src: absoluteArtworkUrl, sizes: '256x256', type: 'image/png' },
        { src: absoluteArtworkUrl, sizes: '512x512', type: 'image/png' },
      ] : undefined,
    });
  }
}

/**
 * Set playback state (playing, paused, none)
 */
export async function setPlaybackState(state: 'playing' | 'paused' | 'none'): Promise<void> {
  if (Capacitor.isNativePlatform() && mediaSessionPlugin) {
    try {
      await mediaSessionPlugin.setPlaybackState({ playbackState: state });
    } catch (error) {
      console.warn('Failed to set playback state via Capacitor:', error);
    }
  } else if ('mediaSession' in navigator) {
    navigator.mediaSession.playbackState = state;
  }
}

/**
 * Set position state for seek bar in lock screen
 */
export async function setPositionState(options: {
  duration?: number;
  playbackRate?: number;
  position?: number;
}): Promise<void> {
  if (Capacitor.isNativePlatform() && mediaSessionPlugin?.setPositionState) {
    try {
      await mediaSessionPlugin.setPositionState(options);
    } catch (error) {
      console.warn('Failed to set position state via Capacitor:', error);
    }
  } else if ('mediaSession' in navigator && 'setPositionState' in navigator.mediaSession) {
    try {
      navigator.mediaSession.setPositionState(options);
    } catch (error) {
      console.warn('Failed to set position state via web API:', error);
    }
  }
}

/**
 * Set action handlers for media controls
 */
export async function setActionHandlers(handlers: {
  onPlay?: () => void;
  onPause?: () => void;
  onPreviousTrack?: () => void;
  onNextTrack?: () => void;
  onSeekBackward?: () => void;
  onSeekForward?: () => void;
  onStop?: () => void;
}): Promise<void> {
  const { onPlay, onPause, onPreviousTrack, onNextTrack, onSeekBackward, onSeekForward, onStop } = handlers;

  if (Capacitor.isNativePlatform() && mediaSessionPlugin) {
    // Use Capacitor plugin
    try {
      if (onPlay) {
        await mediaSessionPlugin.setActionHandler({ action: 'play' }, onPlay);
      }
      if (onPause) {
        await mediaSessionPlugin.setActionHandler({ action: 'pause' }, onPause);
      }
      if (onPreviousTrack) {
        await mediaSessionPlugin.setActionHandler({ action: 'previoustrack' }, onPreviousTrack);
      }
      if (onNextTrack) {
        await mediaSessionPlugin.setActionHandler({ action: 'nexttrack' }, onNextTrack);
      }
      if (onSeekBackward) {
        await mediaSessionPlugin.setActionHandler({ action: 'seekbackward' }, onSeekBackward);
      }
      if (onSeekForward) {
        await mediaSessionPlugin.setActionHandler({ action: 'seekforward' }, onSeekForward);
      }
      if (onStop) {
        await mediaSessionPlugin.setActionHandler({ action: 'stop' }, onStop);
      }
    } catch (error) {
      console.warn('Failed to set action handlers via Capacitor:', error);
    }
  } else if ('mediaSession' in navigator) {
    // Use Web Media Session API
    try {
      if (onPlay) navigator.mediaSession.setActionHandler('play', onPlay);
      if (onPause) navigator.mediaSession.setActionHandler('pause', onPause);
      if (onPreviousTrack) navigator.mediaSession.setActionHandler('previoustrack', onPreviousTrack);
      if (onNextTrack) navigator.mediaSession.setActionHandler('nexttrack', onNextTrack);
      if (onSeekBackward) navigator.mediaSession.setActionHandler('seekbackward', onSeekBackward);
      if (onSeekForward) navigator.mediaSession.setActionHandler('seekforward', onSeekForward);
      if (onStop) navigator.mediaSession.setActionHandler('stop', onStop);
    } catch (error) {
      console.warn('Failed to set action handlers via web API:', error);
    }
  }
}

/**
 * Clear media session (when audio stops)
 */
export async function clearMediaSession(): Promise<void> {
  if (Capacitor.isNativePlatform() && mediaSessionPlugin) {
    try {
      await mediaSessionPlugin.setPlaybackState({ playbackState: 'none' });
    } catch (error) {
      console.warn('Failed to clear media session via Capacitor:', error);
    }
  } else if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = null;
    navigator.mediaSession.playbackState = 'none';
  }
}
