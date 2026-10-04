import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Play,
  Pause,
  SkipForward,
  CheckCircle2,
  Volume2,
  VolumeX,
  X,
  ChevronRight,
  Clock,
  Dumbbell,
  Sparkles,
  Trophy,
  RotateCcw
} from 'lucide-react';
import { WorkoutRoutine, Exercise, SetLog, ExerciseSessionLog, WorkoutHistoryEntry } from '../types/fitness';
import { EXERCISES, MUSCLE_LABELS } from '../data/exercises';
import { ExerciseAnimation } from './ExerciseAnimation';
import { playCountdownTick, playCountdownGo, playRestComplete, playSetComplete } from '../utils/audio';
import { saveWorkoutHistoryEntry } from '../utils/storage';

interface WorkoutPlayerProps {
  routine: WorkoutRoutine;
  onClose: () => void;
  onFinish?: (historyEntry: WorkoutHistoryEntry) => void;
}

export const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({ routine, onClose, onFinish }) => {
  // Find all exercises in this routine
  const routineExercises: { exercise: Exercise; sets: number; reps: number; restSec: number; targetWeightKg?: number }[] =
    routine.exercises
      .map((item) => {
        const found = EXERCISES.find((e) => e.id === item.exerciseId);
        if (!found) return null;
        return {
          exercise: found,
          sets: item.sets,
          reps: item.reps,
          restSec: item.restSec,
          targetWeightKg: item.targetWeightKg || 0,
        };
      })
      .filter(Boolean) as any[];

  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [restSecondsLeft, setRestSecondsLeft] = useState(60);
  const [initialRestSeconds, setInitialRestSeconds] = useState(60);

  // Active workout timer
  const [elapsedWorkoutSeconds, setElapsedWorkoutSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Set Inputs
  const currentItem = routineExercises[currentExIndex];
  const [loggedReps, setLoggedReps] = useState<number>(currentItem?.reps || 10);
  const [loggedWeight, setLoggedWeight] = useState<number>(currentItem?.targetWeightKg || 0);

  // Tracking log for the entire workout
  const sessionLogsRef = useRef<Map<string, SetLog[]>>(new Map());

  // Completion state
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedSummary, setCompletedSummary] = useState<{
    durationMinutes: number;
    totalVolumeKg: number;
    totalReps: number;
  } | null>(null);

  // Sync inputs when exercise changes
  useEffect(() => {
    if (currentItem) {
      setLoggedReps(currentItem.reps);
      setLoggedWeight(currentItem.targetWeightKg || 0);
    }
  }, [currentExIndex]);

  // Overall workout stopwatch
  useEffect(() => {
    if (isCompleted || isPaused) return;
    const timer = setInterval(() => {
      setElapsedWorkoutSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isCompleted, isPaused]);

  // Rest countdown timer
  useEffect(() => {
    if (!isResting || isPaused) return;

    if (restSecondsLeft <= 0) {
      setIsResting(false);
      if (soundEnabled) playRestComplete();
      return;
    }

    const restTimer = setInterval(() => {
      setRestSecondsLeft((prev) => {
        if (prev <= 4 && prev > 1 && soundEnabled) {
          playCountdownTick();
        } else if (prev === 1 && soundEnabled) {
          playCountdownGo();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(restTimer);
  }, [isResting, restSecondsLeft, isPaused, soundEnabled]);

  const handleValidateSet = () => {
    if (!currentItem) return;

    // Record log
    const prevLogs = sessionLogsRef.current.get(currentItem.exercise.id) || [];
    prevLogs.push({
      setNumber: currentSetIndex,
      reps: loggedReps,
      weightKg: loggedWeight,
      completed: true,
    });
    sessionLogsRef.current.set(currentItem.exercise.id, prevLogs);

    if (soundEnabled) {
      playSetComplete();
    }

    // Check if more sets remain for this exercise
    if (currentSetIndex < currentItem.sets) {
      setCurrentSetIndex((s) => s + 1);
      // Start rest timer
      setInitialRestSeconds(currentItem.restSec);
      setRestSecondsLeft(currentItem.restSec);
      setIsResting(true);
    } else {
      // Exercise is finished!
      if (currentExIndex < routineExercises.length - 1) {
        // Next exercise
        setCurrentExIndex((prev) => prev + 1);
        setCurrentSetIndex(1);
        // Inter-exercise rest (e.g. 75s)
        const transitionRest = Math.max(60, currentItem.restSec);
        setInitialRestSeconds(transitionRest);
        setRestSecondsLeft(transitionRest);
        setIsResting(true);
      } else {
        // Complete the entire routine!
        finishWorkout();
      }
    }
  };

  const finishWorkout = () => {
    setIsCompleted(true);
    setIsResting(false);

    // Calculate metrics
    let totalVolume = 0;
    let totalRepsCount = 0;
    const exercisesCompleted: ExerciseSessionLog[] = [];

    sessionLogsRef.current.forEach((sets, exId) => {
      const ex = EXERCISES.find((e) => e.id === exId);
      sets.forEach((s) => {
        totalVolume += s.weightKg * s.reps;
        totalRepsCount += s.reps;
      });
      exercisesCompleted.push({
        exerciseId: exId,
        exerciseName: ex ? ex.name : exId,
        sets,
      });
    });

    const durationMin = Math.max(1, Math.round(elapsedWorkoutSeconds / 60));

    const entry: WorkoutHistoryEntry = {
      id: `history-${Date.now()}`,
      routineId: routine.id,
      routineName: routine.name,
      date: new Date().toISOString(),
      durationMinutes: durationMin,
      exercisesCompleted,
      totalVolumeKg: totalVolume,
      totalReps: totalRepsCount,
    };

    saveWorkoutHistoryEntry(entry);
    setCompletedSummary({
      durationMinutes: durationMin,
      totalVolumeKg: totalVolume,
      totalReps: totalRepsCount,
    });

    // Fire confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f97316', '#ea580c', '#38bdf8', '#e2e8f0'],
      });
    } catch {}

    if (onFinish) {
      onFinish(entry);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!currentItem) {
    return null;
  }

  // Next up exercise
  const nextItem =
    currentSetIndex < currentItem.sets
      ? currentItem
      : routineExercises[currentExIndex + 1];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-white select-none overflow-y-auto">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="p-2 -ml-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 active:scale-95"
            title="Quitter la séance"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-sm font-bold text-white truncate max-w-[200px]">
              {routine.name}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Clock className="w-3 h-3 text-orange-400" />
              <span>{formatTime(elapsedWorkoutSeconds)}</span>
              <span>·</span>
              <span>
                Ex. {currentExIndex + 1}/{routineExercises.length}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl transition-colors ${
              soundEnabled
                ? 'text-orange-400 bg-orange-500/10'
                : 'text-slate-500 bg-slate-900'
            }`}
            title="Activer/désactiver les bips"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isPaused ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            <span>{isPaused ? 'Reprendre' : 'Pause'}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col max-w-lg w-full mx-auto p-4 pb-28 space-y-4">
        {/* Routine Global Progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Progression séance</span>
            <span>
              {Math.round(
                ((currentExIndex * 10 + currentSetIndex) /
                  (routineExercises.length * 10)) *
                  100
              )}
              %
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-600 to-amber-500 transition-all duration-300"
              style={{
                width: `${
                  ((currentExIndex + (currentSetIndex - 1) / currentItem.sets) /
                    routineExercises.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        {/* Current Exercise Title & Muscle Tag */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              {currentItem.exercise.name}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Cible principale :{' '}
              <strong className="text-orange-400 font-medium">
                {MUSCLE_LABELS[currentItem.exercise.category] || currentItem.exercise.category}
              </strong>
            </p>
          </div>
          <div className="px-3 py-1 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-bold">
            Série {currentSetIndex} / {currentItem.sets}
          </div>
        </div>

        {/* Animated Exercise Visualizer */}
        <ExerciseAnimation exercise={currentItem.exercise} />

        {/* Quick Instructions & Form Cues Accordion */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800/80 p-3.5 space-y-2 text-xs">
          <div className="font-semibold text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Consignes techniques & Respiration</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            {currentItem.exercise.instructions.execution}
          </p>
          <p className="text-slate-400 italic">
            🌬️ {currentItem.exercise.instructions.breathing}
          </p>
        </div>

        {/* Set Tracker Input Card */}
        {!isResting && (
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {/* Reps selector */}
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-3 text-center">
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Répétitions
                </span>
                <div className="flex items-center justify-center gap-3 mt-1.5">
                  <button
                    onClick={() => setLoggedReps(Math.max(1, loggedReps - 1))}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg active:scale-90"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold font-mono text-white tabular-nums min-w-[36px]">
                    {loggedReps}
                  </span>
                  <button
                    onClick={() => setLoggedReps(loggedReps + 1)}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg active:scale-90"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Weight selector (if applicable) */}
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-3 text-center">
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Charge (kg)
                </span>
                <div className="flex items-center justify-center gap-2 mt-1.5">
                  <button
                    onClick={() => setLoggedWeight(Math.max(0, loggedWeight - 2))}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg active:scale-90"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold font-mono text-white tabular-nums min-w-[36px]">
                    {loggedWeight}
                  </span>
                  <button
                    onClick={() => setLoggedWeight(loggedWeight + 2)}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg active:scale-90"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Validate Set CTA */}
            <button
              onClick={handleValidateSet}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-lg shadow-orange-950/40 active:scale-98 transition-all"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Valider la série {currentSetIndex}</span>
            </button>
          </div>
        )}

        {/* REST OVERLAY / CARD */}
        {isResting && (
          <div className="rounded-3xl bg-slate-900 border border-orange-500/30 p-5 text-center space-y-4 shadow-xl shadow-orange-950/20 animate-in fade-in">
            <div className="flex items-center justify-between text-xs text-orange-400 font-medium">
              <span>Repos entre séries</span>
              <span className="font-mono">Préparez-vous</span>
            </div>

            {/* Circular / Big Timer Display */}
            <div className="flex flex-col items-center justify-center py-2">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    stroke="#1e293b"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    stroke="#f97316"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 60}
                    strokeDashoffset={
                      2 * Math.PI * 60 * (1 - restSecondsLeft / initialRestSeconds)
                    }
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold font-mono text-white tabular-nums">
                    {restSecondsLeft}s
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400">
                    Restant
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Rest Adjust Buttons */}
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setRestSecondsLeft((s) => Math.max(5, s - 15))}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-slate-300 active:scale-95"
              >
                -15s
              </button>
              <button
                onClick={() => setRestSecondsLeft((s) => s + 15)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-slate-300 active:scale-95"
              >
                +15s
              </button>
              <button
                onClick={() => setIsResting(false)}
                className="px-4 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-xs font-semibold text-white active:scale-95 transition-colors"
              >
                Passer le repos
              </button>
            </div>

            {/* Next Set / Exercise Preview */}
            <div className="pt-3 border-t border-slate-800 text-left text-xs">
              <span className="text-slate-400">À suivre :</span>
              <div className="text-sm font-semibold text-white mt-0.5">
                {nextItem?.exercise.name} (Série {currentSetIndex} / {nextItem?.sets})
              </div>
            </div>
          </div>
        )}
      </div>

      {/* WORKOUT FINISHED MODAL */}
      {isCompleted && completedSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 p-6 text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center mx-auto text-slate-950 shadow-lg shadow-orange-500/30">
              <Trophy className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Séance Terminée !
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Félicitations ! Vos progrès ont été enregistrés localement sur votre téléphone.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-2.5 py-2">
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-3">
                <span className="text-[11px] text-slate-400">Durée</span>
                <div className="text-lg font-bold text-white mt-0.5">
                  {completedSummary.durationMinutes} min
                </div>
              </div>
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-3">
                <span className="text-[11px] text-slate-400">Volume</span>
                <div className="text-lg font-bold text-orange-400 mt-0.5">
                  {completedSummary.totalVolumeKg} kg
                </div>
              </div>
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-3">
                <span className="text-[11px] text-slate-400">Répétitions</span>
                <div className="text-lg font-bold text-white mt-0.5">
                  {completedSummary.totalReps}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full h-12 rounded-2xl bg-orange-600 hover:bg-orange-500 font-bold text-sm text-white shadow-lg shadow-orange-950/40 active:scale-98 transition-all"
            >
              Retour à l’accueil
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
