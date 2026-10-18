import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Check, Copy, Disc } from 'lucide-react';

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
    id: 'all_rise',
    title: 'All Rise',
    artist: 'Blue',
    src: '/all_rise.mp3',
    label: 'All Rise',
    shortLabel: 'All Rise',
    queryParam: 'all_rise',
  },
  {
    id: 'hope_torture',
    title: '희망고문',
    artist: '宋枝恩',
    src: '/hope_torture.mp3',
    label: '희망고문 (希望拷问)',
    shortLabel: '希望拷问',
    queryParam: '2',
  },
];

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
      version === 'hope' ||
      version === 'hope_torture' ||
      hash === '#v2' ||
      hash === '#hope'
    ) {
      return musicTracks[1];
    }
    if (
      version === '1' ||
      version === 'all_rise' ||
      version === 'blue' ||
      hash === '#v1' ||
      hash === '#allrise'
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
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [hasCopied, setHasCopied] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const displayToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3200);
  };

  useEffect(() => {
    const audio = new Audio();
    const pathPrefix = window.location.pathname.startsWith('/Eva')
      ? '/Eva'
      : window.location.pathname.startsWith('/eva')
      ? '/eva'
      : window.location.pathname.startsWith('/xuhuanzhi')
      ? '/xuhuanzhi'
      : window.location.pathname.startsWith('/wanai')
      ? '/wanai'
      : (import.meta as any).env?.BASE_URL?.replace(/\/$/, '') || '';
    const cleanSrc = currentTrack.src.startsWith('/')
      ? currentTrack.src.slice(1)
      : currentTrack.src;
    const audioUrl = currentTrack.src.startsWith('http')
      ? currentTrack.src
      : pathPrefix
      ? `${pathPrefix}/${cleanSrc}`
      : `/${cleanSrc}`;
    audio.src = audioUrl;
    audio.loop = true;
    audio.preload = 'auto';
    audioRef.current = audio;

    const tryAutoPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
        const onFirstInteraction = () => {
          if (!hasInteracted && audioRef.current && audioRef.current.paused) {
            audioRef.current
              .play()
              .then(() => {
                setIsPlaying(true);
                displayToast(
                  `正在播放: ${currentTrack.artist} - 《${currentTrack.title}》`
                );
              })
              .catch(() => {});
          }
          window.removeEventListener('click', onFirstInteraction);
          window.removeEventListener('touchstart', onFirstInteraction);
          window.removeEventListener('keydown', onFirstInteraction);
        };
        window.addEventListener('click', onFirstInteraction, { once: true });
        window.addEventListener('touchstart', onFirstInteraction, { once: true });
        window.addEventListener('keydown', onFirstInteraction, { once: true });
      }
    };

    tryAutoPlay();

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [currentTrack.src]);

  const togglePlayback = () => {
    setHasInteracted(true);
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          displayToast(
            `继续播放: ${currentTrack.artist} - 《${currentTrack.title}》`
          );
        })
        .catch((err) => {
          console.warn('Playback error:', err);
        });
    }
  };

  const handleTrackSelect = (track: Track) => {
    if (track.id !== currentTrack.id) {
      setHasInteracted(true);
      setCurrentTrack(track);
      try {
        const url = new URL(window.location.href);
        if (track.id === 'all_rise') {
          url.searchParams.delete('v');
        } else {
          url.searchParams.set('v', track.queryParam);
        }
        window.history.replaceState({}, '', url.toString());
      } catch {
        // ignore
      }
      displayToast(`已切换为: ${track.artist} - 《${track.title}》`);
    }
  };

  const copyTrackLink = () => {
    try {
      const url = new URL(window.location.href);
      if (currentTrack.id === 'all_rise') {
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
    <div className="flex items-center gap-1.5">
      {/* Track tabs */}
      <div className="flex items-center bg-neutral-200/80 dark:bg-neutral-800/80 p-0.5 rounded-full border border-neutral-300/70 dark:border-neutral-700/70 text-[10px] font-mono">
        {musicTracks.map((t) => {
          const active = t.id === currentTrack.id;
          return (
            <button
              key={t.id}
              onClick={() => handleTrackSelect(t)}
              className={`px-2 py-0.5 rounded-full transition-all cursor-pointer font-medium ${
                active
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
              title={`切换至《${t.title}》- ${t.artist}`}
            >
              {t.shortLabel}
            </button>
          );
        })}
      </div>

      {/* Play/Pause button */}
      <button
        onClick={togglePlayback}
        className={`group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-mono transition-all duration-300 cursor-pointer shadow-xs ${
          isPlaying
            ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 border-neutral-900 dark:border-white shadow-neutral-900/10'
            : 'bg-white/80 dark:bg-neutral-900/80 text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600'
        }`}
        title={isPlaying ? '点击暂停音乐' : '点击播放背景音乐'}
        aria-label={isPlaying ? '暂停音乐' : '播放音乐'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-3.5 h-3.5 animate-pulse text-amber-500 dark:text-amber-400" />
            <span className="max-w-[70px] sm:max-w-[100px] truncate text-[11px] font-sans">
              {currentTrack.title}
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
            <VolumeX className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px] font-sans">音乐</span>
          </>
        )}
      </button>

      {/* Copy link button */}
      <button
        onClick={copyTrackLink}
        className="p-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
        title="复制当前版本链接"
        aria-label="复制当前版本链接"
      >
        {hasCopied ? (
          <Check className="w-3.5 h-3.5 text-emerald-500" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Toast popup */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900/95 dark:bg-white/95 text-white dark:text-neutral-950 px-4 py-2.5 rounded-lg shadow-lg text-xs font-mono backdrop-blur-xs border border-neutral-800 dark:border-neutral-200 animate-fade-in flex items-center gap-2">
          <Disc className="w-4 h-4 animate-spin text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
