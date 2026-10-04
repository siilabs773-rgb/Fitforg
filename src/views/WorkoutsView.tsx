import React, { useState } from 'react';
import { Play, Flame, Clock, Dumbbell, Sparkles, ChevronRight, Award, X } from 'lucide-react';
import { TrainingProgram, WorkoutRoutine, UserPreferences, WorkoutHistoryEntry, Exercise } from '../types/fitness';
import { EQUIPMENT_LABELS, EXERCISES } from '../data/exercises';
import { PWAInstallButton } from '../components/PWAInstallButton';
import { ExerciseAnimation } from '../components/ExerciseAnimation';
import { asset } from '../utils/asset';

interface WorkoutsViewProps {
  activeProgram: TrainingProgram;
  preferences: UserPreferences;
  history: WorkoutHistoryEntry[];
  onStartRoutine: (routine: WorkoutRoutine) => void;
  onNavigateToPrograms: () => void;
  onNavigateToEquipment: () => void;
}

export const WorkoutsView: React.FC<WorkoutsViewProps> = ({
  activeProgram,
  preferences,
  history,
  onStartRoutine,
  onNavigateToPrograms,
  onNavigateToEquipment
}) => {
  // Weekly stats
  const totalMinutes = history.reduce((acc, curr) => acc + curr.durationMinutes, 0);
  const totalWorkouts = history.length;

  const [previewExercise, setPreviewExercise] = useState<Exercise | null>(null);

  // The 5 key anatomical guide exercises matching user image
  const anatomicalGuideExercises = [
    { num: 1, id: 'bodyweight-squat', label: 'Squat', muscles: 'Quadriceps & Fessiers' },
    { num: 2, id: 'dumbbell-bench-press', label: 'Développé couché', muscles: 'Pectoraux & Triceps' },
    { num: 3, id: 'barbell-row', label: 'Rowing barre', muscles: 'Grand dorsal & Dos' },
    { num: 4, id: 'dumbbell-bicep-curl', label: 'Curl haltères', muscles: 'Biceps' },
    { num: 5, id: 'overhead-tricep-extension', label: 'Extension triceps', muscles: 'Triceps' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <span className="text-[11px] font-semibold text-orange-400 uppercase tracking-wider">
            Mode Hors-Ligne 100%
          </span>
          <h1 className="text-2xl font-black text-white tracking-tight">
            FitForge
          </h1>
        </div>
        <PWAInstallButton compact />
      </div>

      {/* Hero Visual Card */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="relative h-44 w-full overflow-hidden bg-slate-950">
          <img
            src={asset('images/fitness_hero_banner_1790860263617.jpg')}
            alt="Entraînement fitness & musculation"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        <div className="p-5 -mt-12 relative z-10 space-y-3">
          <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold">
            <Flame className="w-4 h-4" />
            <span>Programme actif : {activeProgram.name}</span>
          </div>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {activeProgram.description}
          </p>

          <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 text-xs text-slate-400">
            <span>{activeProgram.routines.length} séance(s) programmée(s)</span>
            <button
              onClick={onNavigateToPrograms}
              className="text-orange-400 hover:text-orange-300 font-medium flex items-center gap-1"
            >
              <span>Changer</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Anatomical Reference Guides Carousel (Matching user's image) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <h2 className="text-sm font-bold text-white">
              Guides Anatomiques 3D (Muscles en Rouge)
            </h2>
          </div>
          <span className="text-[11px] text-slate-400">5 mouvements clés</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {anatomicalGuideExercises.map((item) => {
            const ex = EXERCISES.find((e) => e.id === item.id);
            return (
              <button
                key={item.id}
                onClick={() => ex && setPreviewExercise(ex)}
                className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 hover:border-red-500/60 p-3 text-left transition-all active:scale-95 group"
              >
                {/* Number Badge like reference image */}
                <div className="w-5 h-5 rounded-lg bg-blue-600 text-white font-bold text-[11px] flex items-center justify-center mb-1.5 shadow-sm">
                  {item.num}
                </div>

                <div className="text-xs font-bold text-white group-hover:text-red-400 transition-colors truncate">
                  {item.label}
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">
                  {item.muscles}
                </div>

                <div className="mt-2 text-[10px] text-red-400 font-semibold flex items-center gap-1">
                  <span>Voir animation ➔</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Equipment Reminder Quick Pill */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <Dumbbell className="w-4 h-4 text-orange-400 shrink-0" />
          <span className="truncate">
            Matériel configuré :{' '}
            <strong className="text-white font-medium">
              {preferences.availableEquipment.length === 1 && preferences.availableEquipment[0] === 'bodyweight'
                ? 'Poids du corps (sans matériel)'
                : `${preferences.availableEquipment.length} équipement(s)`}
            </strong>
          </span>
        </div>
        <button
          onClick={onNavigateToEquipment}
          className="text-orange-400 hover:text-orange-300 font-medium shrink-0 ml-2"
        >
          Modifier
        </button>
      </div>

      {/* Quick Summary Stats */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3 text-center">
          <span className="text-[11px] text-slate-400 font-medium">Séances</span>
          <div className="text-xl font-bold font-mono text-white mt-0.5">
            {totalWorkouts}
          </div>
        </div>
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3 text-center">
          <span className="text-[11px] text-slate-400 font-medium">Temps actif</span>
          <div className="text-xl font-bold font-mono text-orange-400 mt-0.5">
            {totalMinutes} <span className="text-xs font-normal">min</span>
          </div>
        </div>
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3 text-center">
          <span className="text-[11px] text-slate-400 font-medium">Assiduité</span>
          <div className="text-xl font-bold font-mono text-white mt-0.5 flex items-center justify-center gap-1">
            <Award className="w-4 h-4 text-amber-400" />
            <span>{totalWorkouts > 0 ? `${totalWorkouts}j` : '0j'}</span>
          </div>
        </div>
      </div>

      {/* Routines List for Active Program */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">
            Vos Séances d’Entraînement
          </h2>
          <span className="text-xs text-slate-400">Prêt hors-ligne</span>
        </div>

        <div className="space-y-3">
          {activeProgram.routines.map((routine, idx) => {
            return (
              <div
                key={routine.id}
                className="group relative rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 p-4 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-semibold text-orange-400 uppercase tracking-wider">
                      Séance {idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {routine.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {routine.description}
                    </p>
                  </div>
                </div>

                {/* Badges / Info */}
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800/80 font-mono">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>~{routine.estimatedMinutes} min</span>
                  </div>
                  <span>·</span>
                  <div>
                    <span>{routine.exercises.length} exercices</span>
                  </div>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={() => onStartRoutine(routine)}
                  className="mt-3.5 w-full h-11 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-xs uppercase tracking-wider text-white flex items-center justify-center gap-2 shadow-md shadow-orange-950/40 active:scale-98 transition-all"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Démarrer cette séance</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* QUICK PREVIEW MODAL */}
      {previewExercise && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-md p-3 animate-in fade-in">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-950 border border-slate-800 p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-wider">
                  Guide Anatomique 3D
                </span>
                <h2 className="text-lg font-bold text-white">
                  {previewExercise.name}
                </h2>
              </div>
              <button
                onClick={() => setPreviewExercise(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ExerciseAnimation exercise={previewExercise} />

            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="font-semibold text-white">Exécution : </span>
                <span>{previewExercise.instructions.execution}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="font-semibold text-white">Respiration : </span>
                <span>{previewExercise.instructions.breathing}</span>
              </div>
            </div>

            <button
              onClick={() => setPreviewExercise(null)}
              className="w-full h-11 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
