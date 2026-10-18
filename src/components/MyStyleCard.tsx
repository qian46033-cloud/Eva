import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface MyStyleCardProps {
  onNext: () => void;
  onPrev: () => void;
}

export const MyStyleCard: React.FC<MyStyleCardProps> = ({
  onNext,
  onPrev,
}) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 animate-fade-in space-y-4 font-light">
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrev}
          className="flex items-center gap-1.5 text-xs font-mono font-light text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-300/80 dark:border-neutral-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK / 返回个人信息</span>
        </button>
        <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 font-light">
          STEP 03 / 04 · MUST-READ
        </span>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-[#121316] rounded-xl border border-neutral-300/70 dark:border-neutral-800 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden transition-colors duration-200 p-6 sm:p-8">
        {/* Header */}
        <div className="pb-4 border-b border-neutral-200/80 dark:border-neutral-800/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
              PAGE 03 · GUIDELINES
            </span>
            <h1 className="text-lg sm:text-xl font-normal text-neutral-900 dark:text-white tracking-wider uppercase font-serif">
              须知
            </h1>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 uppercase">
            NOTICE
          </span>
        </div>

        {/* Content Box */}
        <div className="py-6">
          <div className="p-5 sm:p-7 rounded-lg bg-neutral-50/70 dark:bg-neutral-800/30 border border-neutral-200/70 dark:border-neutral-800/80 text-left space-y-4">
            <div className="space-y-4 text-xs sm:text-[13.5px] text-neutral-800 dark:text-neutral-200 leading-relaxed font-light">
              <p className="tracking-wide">
                风格偏向
                <span className="underline underline-offset-4 decoration-neutral-700 dark:decoration-neutral-300 font-normal">
                  常规与非常规之间
                </span>{' '}
                有时厚重有时日常
              </p>

              <p className="tracking-wide">
                高恋中开高走 我们彼此都需要一个
                <span className="underline underline-offset-4 decoration-neutral-700 dark:decoration-neutral-300 font-normal">
                  拉近距离
                </span>
                的过程
              </p>

              <p className="tracking-wide">
                打字速度适中，
                <span className="underline underline-offset-4 decoration-neutral-700 dark:decoration-neutral-300 font-normal">
                  微文白话互助
                </span>
                ，偶尔萎靡走低无
              </p>

              <p className="tracking-wide">
                大多数情况下恋感、位次和走向通常由妳带给我的感受来决定
              </p>

              <p className="tracking-wide">
                于我而言，
                <span className="underline underline-offset-4 decoration-neutral-700 dark:decoration-neutral-300 font-normal">
                  恋为主
                </span>
                ，逻辑为辅
              </p>

              <p className="tracking-wide">
                <span className="underline underline-offset-4 decoration-neutral-700 dark:decoration-neutral-300 font-normal">
                  回合制交流
                </span>{' '}
                不打断彼此讲话是一种
                <span className="underline underline-offset-4 decoration-neutral-700 dark:decoration-neutral-300 font-normal">
                  相互的尊重
                </span>
              </p>
            </div>
          </div>
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
            onClick={onNext}
            className="px-5 py-2.5 rounded-lg bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-light text-xs flex items-center gap-1.5 transition-all cursor-pointer group active:scale-[0.98]"
          >
            <span className="font-mono tracking-widest text-xs">
              PROCEED TO DIRECTORY
            </span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
