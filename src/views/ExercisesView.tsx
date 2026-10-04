import React, { useState, useMemo } from 'react';
import { Search, Flame, X, Dumbbell, Sparkles, Eye, Trophy } from 'lucide-react';
import { Exercise, MuscleGroup, EquipmentType } from '../types/fitness';
import { EXERCISES, EQUIPMENT_LABELS, MUSCLE_LABELS } from '../data/exercises';
import { ExerciseAnimation } from '../components/ExerciseAnimation';

export const ExercisesView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | 'all'>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentType | 'all'>('all');
  const [onlyAnatomyGuides, setOnlyAnatomyGuides] = useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  // Filter exercises
  const filteredExercises = useMemo(() => {
    return EXERCISES.filter((ex) => {
      // Anatomy only toggle
      if (onlyAnatomyGuides && !ex.anatomyImage) {
        return false;
      }

      // Search
      const matchSearch =
        !searchQuery ||
        ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.instructions.execution.toLowerCase().includes(searchQuery.toLowerCase());

      // Muscle
      const matchMuscle =
        selectedMuscle === 'all' ||
        ex.category === selectedMuscle ||
        ex.secondaryMuscles?.includes(selectedMuscle as MuscleGroup);

      // Equipment
      const matchEquipment =
        selectedEquipment === 'all' ||
        ex.equipment.includes(selectedEquipment as EquipmentType);

      return matchSearch && matchMuscle && matchEquipment;
    });
  }, [searchQuery, selectedMuscle, selectedEquipment, onlyAnatomyGuides]);

  const muscleList: { id: MuscleGroup | 'all'; label: string }[] = [
    { id: 'all', label: 'Tous' },
    { id: 'chest', label: 'Pectoraux' },
    { id: 'back', label: 'Dos' },
    { id: 'legs', label: 'Jambes' },
    { id: 'shoulders', label: 'Épaules' },
    { id: 'biceps', label: 'Biceps' },
    { id: 'triceps', label: 'Triceps' },
    { id: 'abs', label: 'Abdos' },
    { id: 'cardio', label: 'Cardio' },
  ];

  return (
    <div className="space-y-4">
      {/* View Header */}
      <div>
        <span className="text-[11px] font-semibold text-orange-400 uppercase tracking-wider">
          Bibliothèque & Démonstrations
        </span>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Exercices & Guides Animés
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Démonstrations complètes avec modèles anatomiques 3D, muscles en rouge et animations 2 temps.
        </p>
      </div>

      {/* Featured Anatomical Model Spotlight Banner */}
      <div
        onClick={() => setOnlyAnatomyGuides(!onlyAnatomyGuides)}
        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
          onlyAnatomyGuides
            ? 'bg-gradient-to-r from-red-950/70 via-slate-900 to-slate-900 border-red-500/60 shadow-lg shadow-red-950/30'
            : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center shrink-0">
            <span className="w-3.5 h-3.5 rounded-full bg-red-500 animate-ping" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Guides Anatomiques 3D (Muscles en Rouge)</span>
              <span className="px-1.5 py-0.2 rounded bg-red-600 text-white text-[9px] font-mono font-bold">
                5 MAJEURS
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Squat, Développé couché, Rowing barre, Curl, Extension triceps
            </div>
          </div>
        </div>

        <button
          className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-colors ${
            onlyAnatomyGuides
              ? 'bg-red-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          {onlyAnatomyGuides ? 'Filtre actif ✓' : 'Filtrer'}
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Rechercher un exercice (ex: squat, rowing, curl...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      {/* Muscle Filter Horizontal Carousel */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        {muscleList.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelectedMuscle(m.id)}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all ${
              selectedMuscle === m.id
                ? 'bg-orange-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800/80'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Equipment Filter Bar */}
      <div className="flex items-center gap-2 text-xs text-slate-400 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-[11px] text-slate-500 shrink-0">Matériel :</span>
        <button
          onClick={() => setSelectedEquipment('all')}
          className={`px-2.5 py-1 rounded-lg shrink-0 ${
            selectedEquipment === 'all'
              ? 'bg-slate-800 text-white font-medium'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Tous
        </button>
        {(['bodyweight', 'dumbbells', 'barbell', 'pullup_bar', 'resistance_bands', 'bench'] as EquipmentType[]).map(
          (eq) => (
            <button
              key={eq}
              onClick={() => setSelectedEquipment(eq)}
              className={`px-2.5 py-1 rounded-lg shrink-0 ${
                selectedEquipment === eq
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30 font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {EQUIPMENT_LABELS[eq]?.label.split('/')[0]}
            </button>
          )
        )}
      </div>

      {/* Exercise Count */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{filteredExercises.length} exercice(s) trouvé(s)</span>
        {onlyAnatomyGuides && (
          <button
            onClick={() => setOnlyAnatomyGuides(false)}
            className="text-orange-400 hover:text-orange-300 underline"
          >
            Afficher tous les exercices
          </button>
        )}
      </div>

      {/* Exercises Grid List */}
      <div className="space-y-3.5">
        {filteredExercises.map((exercise) => {
          const hasAnatomy = Boolean(exercise.anatomyImage);

          return (
            <div
              key={exercise.id}
              onClick={() => setSelectedExercise(exercise)}
              className={`rounded-3xl border transition-all cursor-pointer p-4 space-y-3 active:scale-[0.99] ${
                hasAnatomy
                  ? 'bg-slate-900 border-red-500/40 hover:border-red-500 shadow-md shadow-red-950/20'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-semibold text-orange-400 uppercase tracking-wider">
                      {MUSCLE_LABELS[exercise.category] || exercise.category}
                    </span>
                    {hasAnatomy && (
                      <span className="px-1.5 py-0.5 rounded-md bg-red-600/20 border border-red-500/30 text-red-400 text-[10px] font-bold">
                        Modèle 3D Rouge
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    {exercise.name}
                  </h3>
                </div>

                <div className="text-[11px] font-mono px-2 py-0.5 rounded-lg bg-slate-800 text-slate-400 shrink-0">
                  {exercise.difficulty === 'beginner'
                    ? 'Débutant'
                    : exercise.difficulty === 'intermediate'
                    ? 'Intermédiaire'
                    : 'Avancé'}
                </div>
              </div>

              {/* Preview */}
              <div className="pointer-events-none">
                <ExerciseAnimation exercise={exercise} compact />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/80">
                <div className="truncate">
                  Matériel :{' '}
                  <span className="text-slate-300">
                    {exercise.equipment
                      .map((eq) => EQUIPMENT_LABELS[eq]?.label.split('/')[0])
                      .join(', ')}
                  </span>
                </div>
                <span className="text-orange-400 font-semibold shrink-0">
                  Voir guide & animation ➔
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* DETAILED EXERCISE MODAL */}
      {selectedExercise && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-md p-3 animate-in fade-in">
          <div className="w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-slate-950 border border-slate-800 p-5 space-y-4 shadow-2xl">
            {/* Modal Top */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono font-semibold text-orange-400 uppercase tracking-wider">
                    {MUSCLE_LABELS[selectedExercise.category]}
                  </span>
                  {selectedExercise.anatomyImage && (
                    <span className="px-1.5 py-0.2 rounded bg-red-600 text-white text-[9px] font-bold">
                      Guide 3D Officiel
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-white mt-0.5">
                  {selectedExercise.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedExercise(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Animation / 3D Anatomical Guide */}
            <ExerciseAnimation exercise={selectedExercise} />

            {/* Step by step Instructions */}
            <div className="space-y-3 text-xs text-slate-300">
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3.5 space-y-1.5">
                <div className="font-semibold text-white">Pose 1 : Position de départ & posture</div>
                <p className="text-slate-300 leading-relaxed">
                  {selectedExercise.instructions.setup}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3.5 space-y-1.5">
                <div className="font-semibold text-white">Pose 2 : Exécution & contraction maximale</div>
                <p className="text-slate-300 leading-relaxed">
                  {selectedExercise.instructions.execution}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3.5 space-y-1.5">
                <div className="font-semibold text-white">Respiration recommandée</div>
                <p className="text-slate-300 leading-relaxed">
                  {selectedExercise.instructions.breathing}
                </p>
              </div>

              {selectedExercise.instructions.mistakes.length > 0 && (
                <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-3.5 space-y-1.5">
                  <div className="font-semibold text-amber-300">Erreurs fréquentes à éviter</div>
                  <ul className="list-disc pl-4 space-y-1 text-amber-200/80">
                    {selectedExercise.instructions.mistakes.map((m, idx) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedExercise(null)}
              className="w-full h-11 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
            >
              Fermer la fiche
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
