import React from 'react';
import { Meteors } from './ui/meteors';

export const BackgroundEffects: React.FC = () => {
  return (
    <div className=" relative border border-red-500">
      {/* <div
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-float bg-zinc-200 dark:bg-zinc-800/30"
      />
      <div
        className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-float-delayed bg-gray-200 dark:bg-zinc-800/20"
      />
      <div
        className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-pulse-slow bg-slate-200 dark:bg-zinc-900/40"
      /> */}
    </div>
  );
};

export default BackgroundEffects;