import React from 'react';
import { PlayCircle, FolderHeart, Dumbbell, History, Sliders } from 'lucide-react';

export type TabType = 'workouts' | 'programs' | 'exercises' | 'history' | 'equipment';

interface NavbarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab }) => {
  const tabs: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'workouts', label: 'Séances', icon: PlayCircle },
    { id: 'programs', label: 'Programmes', icon: FolderHeart },
    { id: 'exercises', label: 'Exercices', icon: Dumbbell },
    { id: 'history', label: 'Historique', icon: History },
    { id: 'equipment', label: 'Mon Matériel', icon: Sliders },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800/80 backdrop-blur-md pb-safe">
      <div className="max-w-md mx-auto grid grid-cols-5 items-center h-16 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-colors relative ${
                isActive ? 'text-orange-500' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[10px] font-medium tracking-tight mt-1 truncate max-w-[62px]">
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-orange-500" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
