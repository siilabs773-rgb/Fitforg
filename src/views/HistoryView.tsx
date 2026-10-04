import React, { useState } from 'react';
import { Calendar, Clock, Trophy, Dumbbell, Trash2, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { WorkoutHistoryEntry } from '../types/fitness';

interface HistoryViewProps {
  history: WorkoutHistoryEntry[];
  onClearHistory: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ history, onClearHistory }) => {
  const [expandedEntryId, setExpandedEntryId] = useState<string | null>(null);

  const totalMinutes = history.reduce((acc, curr) => acc + curr.durationMinutes, 0);
  const totalVolume = history.reduce((acc, curr) => acc + curr.totalVolumeKg, 0);
  const totalReps = history.reduce((acc, curr) => acc + curr.totalReps, 0);

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('fr-FR', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="space-y-5">
      {/* View Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-orange-400 uppercase tracking-wider">
            Suivi & Progrès Hors-Ligne
          </span>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Historique des Séances
          </h1>
        </div>

        {history.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Voulez-vous réinitialiser l’historique des séances ?')) {
                onClearHistory();
              }
            }}
            className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded-xl"
            title="Effacer l'historique"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Aggregate Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3.5 text-center">
          <div className="text-[11px] text-slate-400 font-medium">Séances totales</div>
          <div className="text-2xl font-bold font-mono text-white mt-1">
            {history.length}
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3.5 text-center">
          <div className="text-[11px] text-slate-400 font-medium">Temps d'effort</div>
          <div className="text-2xl font-bold font-mono text-orange-400 mt-1">
            {totalMinutes} <span className="text-xs font-normal">min</span>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3.5 text-center">
          <div className="text-[11px] text-slate-400 font-medium">Volume total</div>
          <div className="text-2xl font-bold font-mono text-amber-400 mt-1">
            {totalVolume} <span className="text-xs font-normal">kg</span>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3.5 text-center">
          <div className="text-[11px] text-slate-400 font-medium">Répétitions</div>
          <div className="text-2xl font-bold font-mono text-white mt-1">
            {totalReps}
          </div>
        </div>
      </div>

      {/* History Log List */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-300">
          Journal des entraînements passés ({history.length})
        </h2>

        {history.length === 0 ? (
          <div className="p-8 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-2">
            <Trophy className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-white">Aucune séance enregistrée</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Lancez votre premier entraînement depuis l’onglet « Séances » ! Vos résultats seront sauvegardés automatiquement ici.
            </p>
          </div>
        ) : (
          history.map((entry) => {
            const isExpanded = expandedEntryId === entry.id;

            return (
              <div
                key={entry.id}
                className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {formatDate(entry.date)}
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      {entry.routineName}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-orange-400 px-2.5 py-1 rounded-xl bg-orange-500/10 border border-orange-500/20">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{entry.durationMinutes} min</span>
                  </div>
                </div>

                {/* Metrics Summary */}
                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                  <span>{entry.exercisesCompleted.length} exercices</span>
                  <span>·</span>
                  <span>{entry.totalReps} répétitions</span>
                  {entry.totalVolumeKg > 0 && (
                    <>
                      <span>·</span>
                      <span className="text-amber-400 font-medium">{entry.totalVolumeKg} kg soulevés</span>
                    </>
                  )}
                </div>

                {/* Details Button */}
                <button
                  onClick={() =>
                    setExpandedEntryId(isExpanded ? null : entry.id)
                  }
                  className="w-full pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 hover:text-white"
                >
                  <span>Détail des exercices & séries</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {isExpanded && (
                  <div className="pt-2 space-y-2 text-xs">
                    {entry.exercisesCompleted.map((ex, exIdx) => (
                      <div
                        key={exIdx}
                        className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5"
                      >
                        <div className="font-semibold text-white">
                          {ex.exerciseName}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {ex.sets.map((s, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
                            >
                              S{s.setNumber}: {s.reps} reps {s.weightKg > 0 ? `(${s.weightKg}kg)` : ''}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
