import React, { useState, useEffect } from 'react';
import { WifiOff, ShieldCheck } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setDismissed(false);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setDismissed(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (dismissed) return null;

  if (!isOnline) {
    return (
      <aside aria-label="Statut réseau" className="fixed top-3 left-4 right-4 z-40 max-w-sm mx-auto flex items-center justify-between gap-2.5 rounded-xl bg-slate-900/95 border border-amber-500/40 px-3.5 py-2 text-xs font-medium text-amber-200 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Mode Hors-Ligne actif · 100% fonctionnel</span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-white px-1.5 py-0.5 rounded"
        >
          ✕
        </button>
      </aside>
    );
  }

  return null;
};
