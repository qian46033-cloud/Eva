import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Check, Copy, Disc, Music } from 'lucide-react';

export interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  label: string;
  shortLabel: string;
  queryParam: string;
}

export const musicTracks: Track[] = [
  {
    id: 'one_of_the_girls',
    title: 'One Of The Girls',
    artist: 'The Weeknd / JENNIE / Lily-Rose Depp',
    src: 'one_of_the_girls.mp3',
    label: 'The Weeknd & JENNIE - One Of The Girls',
    shortLabel: 'One Of The Girls',
    queryParam: 'girls',
  },
  {
    id: 'birthday_sex',
    title: 'Birthday Sex (Album Version)',
    artist: 'Jeremih',
    src: 'birthday_sex.mp3',
    label: 'Jeremih - Birthday Sex',
    shortLabel: 'Birthday Sex',
    queryParam: 'bday',
  },
];

/**
 * Resolves the audio URL correctly across:
 * - Local Vite dev server
 * - AI Studio preview iframe
 * - GitHub Pages under repository subpath (e.g. /Eva/ or /eva/)
 */
export function resolveAudioUrl(filename: string): string {
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename;
  }
  const clean = filename.replace(/^\/+/, '');

  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    // Extract base directory path, ensuring trailing slash
    const baseDir = pathname.endsWith('/')
      ? pathname
      : pathname.slice(0, pathname.lastIndexOf('/') + 1);

    return `${window.location.origin}${baseDir}${clean}`;
  }

  return `./${clean}`;
}

const getInitialTrack = (): Track => {
  if (typeof window === 'undefined') return musicTracks[0];
  try {
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash.toLowerCase();
    const version =
      params.get('v') ||
      params.get('version') ||
      params.get('music') ||
      params.get('bgm');

    if (
      version === '2' ||
      version === 'bday' ||
      version === 'birthday_sex' ||
      hash === '#v2' ||
      hash === '#bday'
    ) {
      return musicTracks[1];
    }
    if (
      version === '1' ||
      version === 'girls' ||
      version === 'one_of_the_girls' ||
      hash === '#v1' ||
      hash === '#girls'
    ) {
      return musicTracks[0];
    }
  } catch {
    // ignore
  }
  return musicTracks[0];
};

export const MusicPlayer: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<Track>(getInitialTrack);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasUserInteractedRef = useRef<boolean>(false);

  const displayToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }, []);

  // Initialize and handle playback
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const audioUrl = resolveAudioUrl(currentTrack.src);
    audio.src = audioUrl;
    audio.loop = true;

    // Autoplay attempt
    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
        // Browser blocked autoplay without user gesture:
        // listen to first tap/click to start playing
        const handleFirstGesture = () => {
          if (!hasUserInteractedRef.current && audio.paused) {
            audio
              .play()
              .then(() => {
                setIsPlaying(true);
                displayToast(`正在播放: ${currentTrack.artist} - 《${currentTrack.title}》`);
              })
              .catch(() => {});
          }
          window.removeEventListener('pointerdown', handleFirstGesture);
          window.removeEventListener('click', handleFirstGesture);
          window.removeEventListener('touchstart', handleFirstGesture);
          window.removeEventListener('keydown', handleFirstGesture);
        };

        window.addEventListener('pointerdown', handleFirstGesture, { once: true });
        window.addEventListener('click', handleFirstGesture, { once: true });
        window.addEventListener('touchstart', handleFirstGesture, { once: true });
        window.addEventListener('keydown', handleFirstGesture, { once: true });
      }
    };

    tryAutoplay();
  }, [currentTrack, displayToast]);

  const togglePlayback = () => {
    hasUserInteractedRef.current = true;
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          displayToast(`正在播放: ${currentTrack.artist} - 《${currentTrack.title}》`);
        })
        .catch((err) => {
          console.warn('Playback error:', err);
        });
    }
  };

  const handleTrackSelect = (track: Track) => {
    hasUserInteractedRef.current = true;
    if (track.id === currentTrack.id) {
      if (!isPlaying && audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
      return;
    }

    setCurrentTrack(track);

    const audio = audioRef.current;
    if (audio) {
      const nextUrl = resolveAudioUrl(track.src);
      audio.src = nextUrl;
      audio.loop = true;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          displayToast(`已切换至: ${track.artist} - 《${track.title}》`);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }

    try {
      const url = new URL(window.location.href);
      if (track.id === 'one_of_the_girls') {
        url.searchParams.delete('v');
      } else {
        url.searchParams.set('v', track.queryParam);
      }
      window.history.replaceState({}, '', url.toString());
    } catch {
      // ignore
    }
  };

  const copyTrackLink = () => {
    try {
      const url = new URL(window.location.href);
      if (currentTrack.id === 'one_of_the_girls') {
        url.searchParams.delete('v');
      } else {
        url.searchParams.set('v', currentTrack.queryParam);
      }
      navigator.clipboard.writeText(url.toString()).then(() => {
        setHasCopied(true);
        displayToast(`已复制《${currentTrack.title}》专属链接！`);
        setTimeout(() => setHasCopied(false), 2000);
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex items-center gap-1.5 shrink-0">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        preload="auto"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(e) => {
          console.warn('Audio tag load error, attempting fallback', e);
          const audio = audioRef.current;
          if (audio && !audio.src.includes('./')) {
            audio.src = `./${currentTrack.src}`;
            audio.play().catch(() => {});
          }
        }}
      />

      {/* Track selector buttons */}
      <div className="flex items-center bg-neutral-200/80 dark:bg-neutral-800/80 p-0.5 rounded-full border border-neutral-300/70 dark:border-neutral-700/70 text-[10px] font-mono">
        {musicTracks.map((t, idx) => {
          const active = t.id === currentTrack.id;
          return (
            <button
              key={t.id}
              onClick={() => handleTrackSelect(t)}
              className={`px-2 py-0.5 rounded-full transition-all cursor-pointer font-medium flex items-center gap-1 ${
                active
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
              title={`点击切换到第${idx + 1}首: ${t.artist} - 《${t.title}》`}
            >
              <span>{t.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlayback}
        className={`group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-mono transition-all duration-300 cursor-pointer shadow-xs ${
          isPlaying
            ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 border-neutral-900 dark:border-white shadow-neutral-900/10'
            : 'bg-white/80 dark:bg-neutral-900/80 text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600'
        }`}
        title={isPlaying ? '点击暂停播放' : '点击播放音乐'}
        aria-label={isPlaying ? '暂停音乐' : '播放音乐'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-3.5 h-3.5 animate-pulse text-amber-500 dark:text-amber-400 shrink-0" />
            <span className="hidden sm:inline max-w-[80px] truncate text-[11px] font-sans">
              {currentTrack.shortLabel}
            </span>
            <span className="flex items-center gap-0.5 h-3 ml-0.5">
              <span
                className="w-0.5 h-2.5 bg-current animate-bounce"
                style={{ animationDelay: '0ms' }}
              />
              <span
                className="w-0.5 h-3.5 bg-current animate-bounce"
                style={{ animationDelay: '150ms' }}
              />
              <span
                className="w-0.5 h-2 bg-current animate-bounce"
                style={{ animationDelay: '300ms' }}
              />
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline text-[11px] font-sans">播放</span>
          </>
        )}
      </button>

      {/* Copy link button */}
      <button
        onClick={copyTrackLink}
        className="p-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer shrink-0"
        title="复制当前版本链接（包含所选背景音乐）"
        aria-label="复制当前版本链接"
      >
        {hasCopied ? (
          <Check className="w-3.5 h-3.5 text-emerald-500" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900/95 dark:bg-white/95 text-white dark:text-neutral-950 px-4 py-2.5 rounded-lg shadow-xl text-xs font-mono backdrop-blur-xs border border-neutral-800 dark:border-neutral-200 animate-fade-in flex items-center gap-2">
          <Disc className="w-4 h-4 animate-spin text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
