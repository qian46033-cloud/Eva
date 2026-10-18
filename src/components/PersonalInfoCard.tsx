import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Coins,
  Shirt,
  Sparkles,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { profileData } from '../data';

interface PersonalInfoCardProps {
  onNext: () => void;
  onPrev: () => void;
  onImageClick: (url: string, caption?: string) => void;
}

export const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({
  onNext,
  onPrev,
  onImageClick,
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
          <span>BACK / 返回欢迎页</span>
        </button>
        <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 font-light">
          STEP 02 / 04 · PERSONAL INFO
        </span>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-[#121316] rounded-xl border border-neutral-300/70 dark:border-neutral-800 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden transition-colors duration-200 p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200/80 dark:border-neutral-800/80">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
              PAGE 02 · PROFILE
            </span>
            <h1 className="text-lg sm:text-xl font-normal text-neutral-900 dark:text-white tracking-wider uppercase font-serif">
              PERSONAL INFORMATION
            </h1>
          </div>
        </div>

        {/* Content Grid */}
        <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Left Column */}
          <div className="md:col-span-4 p-5 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-700/60 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              {/* Original Full Photo */}
              <div className="relative group">
                <div
                  className="w-full aspect-square rounded-lg overflow-hidden border border-neutral-300/80 dark:border-neutral-700/80 shadow-xs cursor-pointer bg-neutral-900"
                  onClick={() =>
                    onImageClick(data.avatarUrl, `${data.nickname} 原图`)
                  }
                  title="点击查看高清原图"
                >
                  <img
                    src={data.avatarUrl}
                    alt={data.nickname}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-neutral-900/85 text-white text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-xs border border-white/10">
                      点击查看原图
                    </span>
                  </div>
                </div>
                <div className="mt-1.5 flex items-center justify-between px-0.5 text-[9px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                  <span>PHOTO / 原图</span>
                  <span>1024 × 1024</span>
                </div>
              </div>

              {/* Profile Identity */}
              <div className="flex items-center justify-between border-t border-neutral-200/70 dark:border-neutral-800/80 pt-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span
                      style={{
                        fontFamily:
                          '"SimSun", "Songti SC", "STSong", "Noto Serif SC", serif',
                      }}
                      className="font-normal text-neutral-900 dark:text-white text-base tracking-wide"
                    >
                      {data.nickname}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                    {data.handle}
                  </span>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  AVAILABLE
                </span>
              </div>

              <div className="p-3 rounded bg-white/80 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800 text-[11px] font-mono text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {data.welcomeIntro}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-8 flex flex-col justify-center space-y-3">
            <div className="space-y-3 text-left">
              {/* Pricing Notice */}
              <div className="py-2.5 px-3 rounded-lg border border-neutral-200/70 dark:border-neutral-800/80 bg-neutral-50/40 dark:bg-neutral-800/20 text-xs">
                <div className="flex items-center justify-between font-mono text-[10px] text-neutral-500 dark:text-neutral-400 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Coins className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                    <span className="tracking-wider uppercase">
                      PRICING / 资费明细
                    </span>
                  </div>
                  <span className="text-[9px] text-neutral-400 font-mono">
                    RATES
                  </span>
                </div>
                <p className="font-mono text-[11px] text-neutral-800 dark:text-neutral-200 pl-5 leading-relaxed">
                  {data.pricingRateText}
                </p>
              </div>

              {/* Style Overview */}
              <div className="p-3.5 sm:p-4 rounded-lg bg-neutral-50/60 dark:bg-neutral-800/30 border border-neutral-200/70 dark:border-neutral-800/80 space-y-2 text-xs">
                <div className="flex items-center justify-between font-mono text-[10px] text-neutral-500 dark:text-neutral-400 mb-1">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                    <span className="tracking-wider uppercase">
                      STYLE / 风格定位
                    </span>
                  </div>
                  <span className="text-[9px] text-neutral-400 font-mono">
                    PROFILE
                  </span>
                </div>
                <div className="space-y-2 font-mono text-[11px] sm:text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed pl-5">
                  <div>
                    <span className="font-medium text-neutral-900 dark:text-white">
                      主：
                    </span>
                    <div className="mt-0.5 space-y-0.5 text-neutral-800 dark:text-neutral-200">
                      {data.styleDetail.primary.map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-1.5 border-t border-neutral-200/60 dark:border-neutral-700/60">
                    <span className="font-medium text-neutral-900 dark:text-white">
                      副：
                    </span>
                    <div className="mt-0.5 text-neutral-700 dark:text-neutral-300">
                      {data.styleDetail.secondary.map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Outfits */}
              <div className="py-2.5 px-3 rounded-lg border border-neutral-200/70 dark:border-neutral-800/80 bg-neutral-50/40 dark:bg-neutral-800/20 text-xs">
                <div className="flex items-center justify-between font-mono text-[10px] text-neutral-500 dark:text-neutral-400 mb-1">
                  <div className="flex items-center gap-1.5">
                    <Shirt className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                    <span className="tracking-wider uppercase">
                      OUTFITS / 常驻装扮
                    </span>
                  </div>
                  <span className="text-[9px] text-neutral-400 font-mono">
                    ICONIC
                  </span>
                </div>
                <p className="text-neutral-800 dark:text-neutral-200 font-mono pl-5 text-xs font-medium">
                  {data.skyStats.usualOutfits}
                </p>
                {data.skyStats.outfitsNote && (
                  <p className="text-neutral-600 dark:text-neutral-300 font-mono pl-5 text-[11px] mt-1 leading-relaxed">
                    {data.skyStats.outfitsNote}
                  </p>
                )}
              </div>

              {/* Available Hours */}
              <div className="py-2.5 px-3 rounded-lg border border-neutral-200/70 dark:border-neutral-800/80 bg-neutral-50/40 dark:bg-neutral-800/20 text-xs">
                <div className="flex items-center justify-between font-mono text-[10px] text-neutral-500 dark:text-neutral-400 mb-1">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                    <span className="tracking-wider uppercase">
                      SCHEDULE / 可取时段
                    </span>
                  </div>
                  <span className="text-[9px] text-neutral-400 font-mono">
                    HOURS
                  </span>
                </div>
                <div className="space-y-0.5 font-mono text-[11px] text-neutral-800 dark:text-neutral-200 pl-5 leading-relaxed">
                  {data.availableHours.map((h, i) => (
                    <div key={i}>{h}</div>
                  ))}
                </div>
              </div>

              {/* Assurance / Notice */}
              <div className="py-2.5 px-3 rounded-lg border border-neutral-200/70 dark:border-neutral-800/80 bg-neutral-50/40 dark:bg-neutral-800/20 text-xs">
                <div className="flex items-center justify-between font-mono text-[10px] text-neutral-500 dark:text-neutral-400 mb-1">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                    <span className="tracking-wider uppercase">
                      ASSURANCE / 相处约定
                    </span>
                  </div>
                  <span className="text-[9px] text-neutral-400 font-mono">
                    STABLE
                  </span>
                </div>
                <p className="text-neutral-800 dark:text-neutral-200 font-mono pl-5 text-[11px] leading-relaxed">
                  {data.compatibilityNotice}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="py-3 sm:py-4 text-center">
          <p
            style={{
              fontFamily: '"Noto Serif SC", "Songti SC", "SimSun", serif',
            }}
            className="text-xs sm:text-[13px] leading-relaxed text-neutral-400 dark:text-neutral-500 italic tracking-wider"
          >
            “{data.step2Quote[0]}”
          </p>
        </div>

        {/* Separator */}
        <div className="my-4 relative flex items-center justify-center">
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
              PROCEED / 须知
            </span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
