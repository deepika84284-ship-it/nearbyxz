import React from 'react';

export default function SkeletonLoader({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="bg-slate-900/80 rounded-3xl border border-slate-800 p-5 space-y-4 animate-pulse">
          <div className="w-full h-48 bg-slate-800/80 rounded-2xl"></div>
          <div className="h-4 bg-slate-800/80 rounded w-3/4"></div>
          <div className="h-3 bg-slate-800/60 rounded w-1/2"></div>
          <div className="flex justify-between items-center pt-2">
            <div className="w-20 h-6 bg-slate-800/80 rounded-xl"></div>
            <div className="w-24 h-8 bg-slate-800/80 rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
