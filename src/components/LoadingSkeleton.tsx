import React from 'react';

export const LoadingSkeleton: React.FC<{ rows?: number; height?: string }> = ({ rows = 4, height = 'h-8' }) => {
  return (
    <div className="space-y-3 w-full animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={`bg-slate-100 rounded-lg w-full ${height}`} />
      ))}
    </div>
  );
};
