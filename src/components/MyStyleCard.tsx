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
                有雷点必须提前告知，如若未提前告知则踩到暗雷的情况下概不负责
              </p>

              <p className="tracking-wide">
                如下指定单我会尽可能的让你不虚此行，但单内单后不满意仅接受退款不接受差评客诉，感谢理解
              </p>

              <p className="tracking-wide">
                请不要将单外的负面情绪带入单内，如果非要我做受气包的话烦请单价*10
              </p>

              <p className="tracking-wide">
                如果你在单内出现任何恶搞行为即默认我下线你送单，后续将不提供售后并永拒
              </p>

              <p className="tracking-wide">
                不会讲话没关系，请在我引导的情况下努力尝试回复，婉拒单口半单口
              </p>

              <p className="tracking-wide">
                打字速度适中，微文白话互助，如需很快的打字速度、极致的白话或文艺，请寻找其他的老师
              </p>

              <div className="tracking-wide space-y-0.5">
                <p>既不是绝对上位也不做绝对下位，彼此怎么舒服怎么来</p>
                <p>除自带硬性要求外，下单默认接受恋感、位次和风格走向由你带给我的感受来决定</p>
              </div>

              <div className="tracking-wide space-y-0.5">
                <p>于我而言，恋为主，逻辑为辅</p>
                <p>婉拒任何以辩论争执为目的或抱有攻击、审视意味的人</p>
              </div>

              <p className="tracking-wide">
                回合制交流，不打断彼此讲话是一种相互的尊重，打断三次默认送单
              </p>

              <p className="tracking-wide">
                SM恶趣味等风格的施展程度因人而异，无论接受与否，我都会在单前额外为你准备一份表格，请如实填写
              </p>

              <p className="tracking-wide">
                如果你自身代入感很低，那么我给出的方案是单内走低无恋聊聊天谈谈心，也许我们会在某个方面很投缘
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
