import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Check, Copy, Disc, Shuffle, Music } from 'lucide-react';

export interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  label: string;
  shortLabel: string;
  mobileLabel: string;
  queryParam: string;
}

export const musicTracks: Track[] = [
  {
    id: 'birthday_sex',
    title: 'Birthday Sex (Album Version)',
    artist: 'Jeremih',
    src: 'birthday_sex.mp3',
    label: 'Jeremih - Birthday Sex',
    shortLabel: 'Birthday Sex',
    mobileLabel: 'Birthday',
    queryParam: 'bday',
  },
  {
    id: 'one_of_the_girls',
    title: 'One Of The Girls',
    artist: 'The Weeknd / JENNIE / Lily-Rose Depp',
    src: 'one_of_the_girls.mp3',
    label: 'The Weeknd & JENNIE - One Of The Girls',
    shortLabel: 'One Of The Girls',
    mobileLabel: 'Girls',
    queryParam: 'girls',
  },
];

/**
 * Resolves the audio URL correctly across:
 * - Local Vite dev server
 * - AI Studio preview iframe
 * - GitHub Pages (https://qian46033-cloud.github.io/Eva/)
 */
export function resolveAudioUrl(filename: string): string {
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename;
  }
  const clean = filename.replace(/^\/+/, '');

  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    // Handle GitHub Pages repo subpath (/Eva or /eva)
    if (pathname.toLowerCase().startsWith('/eva')) {
      return `${window.location.origin}/Eva/${clean}`;
    }

    const baseUrl = (import.meta as any).env?.BASE_URL?.replace(/\/$/, '') || '';
    if (baseUrl) {
      return `${window.location.origin}${baseUrl}/${clean}`;
    }

    const lastSlash = pathname.lastIndexOf('/');
    const dir = lastSlash >= 0 ? pathname.slice(0, lastSlash + 1) : '/';
    return `${window.location.origin}${dir}${clean}`;
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
      version === 'girls' ||
      version === 'one_of_the_girls' ||
      hash === '#v2' ||
      hash === '#girls'
    ) {
      return musicTracks[1];
    }
    if (
      version === '1' ||
      version === 'bday' ||
      version === 'birthday' ||
      version === 'birthday_sex' ||
      hash === '#v1' ||
      hash === '#bday'
    ) {
      return musicTracks[0];
    }
  } catch {
    // fallback
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
  const userInteractedRef = useRef<boolean>(false);

  const displayToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3200);
  }, []);

  // Sync audio source when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const audioUrl = resolveAudioUrl(currentTrack.src);
    audio.src = audioUrl;
    audio.loop = true;
    audio.preload = 'auto';

    const tryPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
        const handleGesture = () => {
          if (!userInteractedRef.current && audio.paused) {
            audio
              .play()
              .then(() => {
                setIsPlaying(true);
                displayToast(`正在播放: ${currentTrack.artist} - 《${currentTrack.title}》`);
              })
              .catch(() => {});
          }
          window.removeEventListener('pointerdown', handleGesture);
          window.removeEventListener('click', handleGesture);
          window.removeEventListener('touchstart', handleGesture);
          window.removeEventListener('keydown', handleGesture);
        };
        window.addEventListener('pointerdown', handleGesture, { once: true });
        window.addEventListener('click', handleGesture, { once: true });
        window.addEventListener('touchstart', handleGesture, { once: true });
        window.addEventListener('keydown', handleGesture, { once: true });
      }
    };

    tryPlay();
  }, [currentTrack.src, displayToast]);

  const togglePlayback = () => {
    userInteractedRef.current = true;
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
    userInteractedRef.current = true;
    if (track.id === currentTrack.id) {
      if (!isPlaying && audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
      return;
    }

    setCurrentTrack(track);

    // Update URL query parameter
    try {
      const url = new URL(window.location.href);
      if (track.id === 'birthday_sex') {
        url.searchParams.delete('v');
      } else {
        url.searchParams.set('v', track.queryParam);
      }
      window.history.replaceState({}, '', url.toString());
    } catch {
      // ignore
    }

    displayToast(`已切换为: ${track.artist} - 《${track.title}》`);
  };

  const switchNextTrack = () => {
    const nextIndex = currentTrack.id === musicTracks[0].id ? 1 : 0;
    handleTrackSelect(musicTracks[nextIndex]);
  };

  const copyTrackLink = () => {
    try {
      const url = new URL(window.location.href);
      if (currentTrack.id === 'birthday_sex') {
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
    <>
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
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

        {/* Track selector buttons: One Of The Girls / Birthday Sex */}
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
                title={`点击切换至: ${t.artist} - 《${t.title}》`}
              >
                <span className="hidden sm:inline">{t.shortLabel}</span>
                <span className="sm:hidden">{t.mobileLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayback}
          className={`group relative flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-full border text-xs font-mono transition-all duration-300 cursor-pointer shadow-xs ${
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
              <span className="hidden md:inline max-w-[80px] truncate text-[11px] font-sans">
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
          title={`复制《${currentTrack.title}》专属链接`}
          aria-label="复制当前版本链接"
        >
          {hasCopied ? (
            <Check className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Floating Bottom Quick Music Switcher Widget */}
      <aside
        aria-label="背景音乐悬浮控制器"
        className="fixed bottom-4 left-4 z-40 flex items-center gap-2 bg-white/95 dark:bg-[#151619]/95 border border-neutral-300/80 dark:border-neutral-700/80 px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md text-xs font-mono select-none transition-all duration-300 hover:shadow-xl"
      >
        <button
          onClick={togglePlayback}
          className="flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white cursor-pointer"
          title={isPlaying ? '点击暂停' : '点击播放'}
        >
          <Music className={`w-3.5 h-3.5 ${isPlaying ? 'text-amber-500 dark:text-amber-400 animate-spin' : 'text-neutral-400'}`} />
          <span className="font-medium text-[11px] max-w-[110px] sm:max-w-[150px] truncate">
            {currentTrack.title}
          </span>
        </button>

        <span className="w-px h-3 bg-neutral-300 dark:bg-neutral-700" />

        <button
          onClick={switchNextTrack}
          className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
          title="点击切换另一首歌曲"
        >
          <Shuffle className="w-3 h-3" />
          <span>切歌</span>
        </button>
      </aside>

      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900/95 dark:bg-white/95 text-white dark:text-neutral-950 px-4 py-2.5 rounded-lg shadow-xl text-xs font-mono backdrop-blur-xs border border-neutral-800 dark:border-neutral-200 animate-fade-in flex items-center gap-2">
          <Disc className="w-4 h-4 animate-spin text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
};
