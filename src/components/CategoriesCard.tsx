import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { profileData } from '../data';

interface CategoriesCardProps {
  onPrev: () => void;
  onRestart: () => void;
}

export const CategoriesCard: React.FC<CategoriesCardProps> = ({
  onPrev,
  onRestart,
}) => {
  const data = profileData;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 animate-fade-in space-y-4 font-light">
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrev}
          className="flex items-center gap-1.5 text-xs font-mono font-light text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-300/80 dark:border-neutral-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK / 返回须知</span>
        </button>
        <span className="text-xs font-mono font-light text-neutral-400 dark:text-neutral-500">
          STEP 04 / 04 · DIRECTORY
        </span>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-[#121316] rounded-xl border border-neutral-300/70 dark:border-neutral-800 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden transition-colors duration-200 p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200/80 dark:border-neutral-800/80">
          <div>
            <div className="font-serif italic text-base sm:text-lg text-neutral-400 dark:text-neutral-500">
              Contents & Official Documents
            </div>
            <h1 className="text-lg sm:text-xl font-normal text-neutral-900 dark:text-white tracking-wider uppercase font-serif">
              CATEGORIES
            </h1>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 uppercase">
            {data.categories.length} SECTIONS
          </span>
        </div>

        {/* Directory Links */}
        <div className="py-6 space-y-3">
          {data.categories.map((cat) => (
            <a
              key={cat.number}
              href={cat.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-lg border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-900 dark:hover:border-neutral-500 bg-neutral-50/60 dark:bg-neutral-800/30 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 transition-all flex items-center justify-between text-left cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-6 h-6 rounded bg-neutral-200/70 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 flex items-center justify-center font-mono text-xs shrink-0">
                  {cat.number}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-sm sm:text-base font-normal text-neutral-900 dark:text-white group-hover:underline underline-offset-4 decoration-neutral-400">
                    {cat.titleCn}
                  </span>
                  <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase">
                    / {cat.titleEn}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-mono text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                <span className="hidden sm:inline font-light text-[11px]">
                  {cat.url.includes('qq.com') ? 'QQ DOCS' : 'KDOCS'}
                </span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>

        {/* Quotes */}
        <div className="pt-2.5 pb-2 text-center border-t border-neutral-200/60 dark:border-neutral-800/60 space-y-1">
          {data.step4Quote.map((q, idx) => (
            <p
              key={idx}
              style={{
                fontFamily: '"Noto Serif SC", "Songti SC", "SimSun", serif',
              }}
              className="text-[11px] sm:text-xs font-serif italic text-neutral-500 dark:text-neutral-400 tracking-wider leading-relaxed"
            >
              {idx === 0
                ? `“${q}`
                : idx === data.step4Quote.length - 1
                ? `${q}”`
                : q}
            </p>
          ))}
        </div>

        {/* Separator */}
        <div className="my-5 relative flex items-center justify-center">
          <div className="w-full border-t border-dashed border-neutral-300 dark:border-neutral-700" />
          <div className="absolute w-12 h-1 bg-neutral-900 dark:bg-white rounded-full" />
        </div>

        {/* Navigation Actions */}
        <div className="pt-1 flex items-center justify-between">
          <button
            onClick={onPrev}
            className="flex items-center gap-1 text-xs font-mono font-light text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>PREV</span>
          </button>
          <button
            onClick={onRestart}
            className="px-5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-mono font-light text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RESTART / 返回欢迎页</span>
          </button>
        </div>
      </div>
    </div>
  );
};
