import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  Flame,
  Repeat,
  Sparkles,
  Layers,
  CheckCircle2,
  Dumbbell,
  ShieldCheck,
} from 'lucide-react';
import { Exercise } from '../types/fitness';
import { MUSCLE_LABELS } from '../data/exercises';
import { asset } from '../utils/asset';

interface ExerciseAnimationProps {
  exercise: Exercise;
  compact?: boolean;
}

export interface ExerciseVisualSet {
  freeDbStart?: string;
  freeDbEnd?: string;
  anatomyStart: string;
  anatomyEnd: string;
  chartImage: string;
  muscles: string[];
  keyCue: string;
}

export function getExerciseVisualData(exercise: Exercise): ExerciseVisualSet {
  // Free exercise DB image links (local first, fallback to github raw)
  let freeDbStart: string | undefined;
  let freeDbEnd: string | undefined;

  if (exercise.freeExerciseDbId) {
    freeDbStart = asset(`free-exercise-db/${exercise.freeExerciseDbId}/0.jpg`);
    freeDbEnd = asset(`free-exercise-db/${exercise.freeExerciseDbId}/1.jpg`);
  }

  // 3D Anatomy pose pair
  if (exercise.poseStartImage && exercise.poseEndImage) {
    return {
      freeDbStart,
      freeDbEnd,
      anatomyStart: exercise.poseStartImage,
      anatomyEnd: exercise.poseEndImage,
      chartImage: exercise.anatomyImage || exercise.poseStartImage,
      muscles: exercise.anatomyMuscles || [MUSCLE_LABELS[exercise.category] || exercise.category],
      keyCue: exercise.keyCue || 'Gardez le corps gainé et contrôlez chaque phase du mouvement.',
    };
  }

  // Category fallback with dedicated 3D anatomical poses
  switch (exercise.category) {
    case 'chest':
      return {
        freeDbStart: freeDbStart || asset('free-exercise-db/Pushups/0.jpg'),
        freeDbEnd: freeDbEnd || asset('free-exercise-db/Pushups/1.jpg'),
        anatomyStart: asset('images/pushup_pose_start_1791128155877.jpg'),
        anatomyEnd: asset('images/pushup_pose_end_1791128165671.jpg'),
        chartImage: asset('images/pushup_anatomy_guide_1790866412729.jpg'),
        muscles: ['Grand pectoral', 'Triceps brachial', 'Deltoïde antérieur', 'Gainage abdos'],
        keyCue: 'Coudes à 45° du buste, corps rigide en planche gainée, poitrine frôle le sol',
      };
    case 'back':
      return {
        freeDbStart: freeDbStart || asset('free-exercise-db/Bent_Over_Barbell_Row/0.jpg'),
        freeDbEnd: freeDbEnd || asset('free-exercise-db/Bent_Over_Barbell_Row/1.jpg'),
        anatomyStart: asset('images/barbell_row_anatomy_guide_1790865419009.jpg'),
        anatomyEnd: asset('images/barbell_row_anatomy_guide_1790865419009.jpg'),
        chartImage: asset('images/barbell_row_anatomy_guide_1790865419009.jpg'),
        muscles: ['Grand dorsal', 'Trapèzes', 'Rhomboïdes', 'Biceps'],
        keyCue: 'Buste penché dos plat, tirez les coudes vers le haut en resserrant les omoplates',
      };
    case 'biceps':
      return {
        freeDbStart: freeDbStart || asset('free-exercise-db/Dumbbell_Bicep_Curl/0.jpg'),
        freeDbEnd: freeDbEnd || asset('free-exercise-db/Dumbbell_Bicep_Curl/1.jpg'),
        anatomyStart: asset('images/bicep_curl_start_1791128177808.jpg'),
        anatomyEnd: asset('images/bicep_curl_end_1791128187956.jpg'),
        chartImage: asset('images/bicep_curl_anatomy_guide_1790865430861.jpg'),
        muscles: ['Biceps brachial', 'Brachial antérieur', 'Avant-bras'],
        keyCue: 'Coudes verrouillés aux flancs, supination en montée, contraction maximale au sommet',
      };
    case 'triceps':
      return {
        freeDbStart: freeDbStart || asset('free-exercise-db/Standing_Dumbbell_Triceps_Extension/0.jpg'),
        freeDbEnd: freeDbEnd || asset('free-exercise-db/Standing_Dumbbell_Triceps_Extension/1.jpg'),
        anatomyStart: asset('images/tricep_extension_anatomy_guide_1790865442793.jpg'),
        anatomyEnd: asset('images/tricep_extension_anatomy_guide_1790865442793.jpg'),
        chartImage: asset('images/tricep_extension_anatomy_guide_1790865442793.jpg'),
        muscles: ['Triceps brachial (longue portion)', 'Vaste externe'],
        keyCue: 'Coudes pointés vers le haut, extension contrôlée des bras',
      };
    case 'legs':
    case 'glutes':
    case 'calves':
      return {
        freeDbStart: freeDbStart || asset('free-exercise-db/Barbell_Full_Squat/0.jpg'),
        freeDbEnd: freeDbEnd || asset('free-exercise-db/Barbell_Full_Squat/1.jpg'),
        anatomyStart: asset('images/squat_pose_start_1791128129739.jpg'),
        anatomyEnd: asset('images/squat_pose_end_1791128144460.jpg'),
        chartImage: asset('images/squat_anatomy_guide_1790865396626.jpg'),
        muscles: ['Quadriceps', 'Grand fessier', 'Ischio-jambiers', 'Mollets'],
        keyCue: 'Genoux dans l’axe des orteils, cuisses parallèles au sol, buste fier',
      };
    case 'shoulders':
      return {
        freeDbStart: freeDbStart || asset('free-exercise-db/Side_Lateral_Raise/0.jpg'),
        freeDbEnd: freeDbEnd || asset('free-exercise-db/Side_Lateral_Raise/1.jpg'),
        anatomyStart: asset('images/tricep_extension_anatomy_guide_1790865442793.jpg'),
        anatomyEnd: asset('images/tricep_extension_anatomy_guide_1790865442793.jpg'),
        chartImage: asset('images/tricep_extension_anatomy_guide_1790865442793.jpg'),
        muscles: ['Deltoïdes (faisceaux moyen & antérieur)', 'Trapèzes'],
        keyCue: 'Poussée verticale fluide sans cambrer la colonne lombaire',
      };
    case 'abs':
    case 'cardio':
    default:
      return {
        freeDbStart: freeDbStart || asset('free-exercise-db/Plank/0.jpg'),
        freeDbEnd: freeDbEnd || asset('free-exercise-db/Plank/1.jpg'),
        anatomyStart: asset('images/pushup_pose_start_1791128155877.jpg'),
        anatomyEnd: asset('images/pushup_pose_end_1791128165671.jpg'),
        chartImage: asset('images/pushup_anatomy_guide_1790866412729.jpg'),
        muscles: ['Grand droit de l’abdomen', 'Transverse', 'Ceinture scapulaire'],
        keyCue: 'Bassin en rétroversion, abdominaux contractés, respiration régulière',
      };
  }
}

export const ExerciseAnimation: React.FC<ExerciseAnimationProps> = ({
  exercise,
  compact = false,
}) => {
  const visualData = getExerciseVisualData(exercise);

  // Media source: 'free_db' (free-exercise-db real demonstrator) vs 'anatomy_3d' (3D anatomical model)
  const [mediaSource, setMediaSource] = useState<'free_db' | 'anatomy_3d'>(
    visualData.freeDbStart ? 'free_db' : 'anatomy_3d'
  );
  const [isSideBySide, setIsSideBySide] = useState(false);

  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<0.6 | 1 | 1.4>(1);

  // Active pose: 1 (Start/Étirement) or 2 (Contraction)
  const [activePose, setActivePose] = useState<1 | 2>(1);
  const [repCount, setRepCount] = useState(1);

  const primaryMuscleName = MUSCLE_LABELS[exercise.category] || exercise.category;

  // Real-time animation cycle between Pose 1 (1.6s) and Pose 2 (1.4s)
  useEffect(() => {
    if (!isPlaying || isSideBySide) return;

    const intervalTime = (activePose === 1 ? 1600 : 1400) / speed;
    const timer = setTimeout(() => {
      setActivePose((prev) => {
        if (prev === 2) {
          setRepCount((r) => (r >= 99 ? 1 : r + 1));
          return 1;
        }
        return 2;
      });
    }, intervalTime);

    return () => clearTimeout(timer);
  }, [isPlaying, activePose, speed, isSideBySide]);

  // Current image to display based on active source and active pose
  const currentImage =
    mediaSource === 'free_db' && visualData.freeDbStart && visualData.freeDbEnd
      ? activePose === 1
        ? visualData.freeDbStart
        : visualData.freeDbEnd
      : activePose === 1
      ? visualData.anatomyStart
      : visualData.anatomyEnd;

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 ${
        compact ? 'p-2.5' : 'p-4'
      } shadow-2xl space-y-3`}
    >
      {/* Top Header: Target Muscle & Engine Selector */}
      <div className="flex items-center justify-between text-xs px-1">
        <div className="flex items-center gap-1.5 text-orange-400 font-bold truncate">
          <Flame className="w-4 h-4 shrink-0 text-red-500 fill-red-500" />
          <span className="truncate">Cible : {primaryMuscleName}</span>
        </div>

        {/* Engine Switcher (free-exercise-db vs Modèle 3D vs Planche) */}
        {!compact && (
          <div className="flex items-center p-0.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-medium">
            {visualData.freeDbStart && (
              <button
                onClick={() => {
                  setMediaSource('free_db');
                  setIsSideBySide(false);
                  setIsPlaying(true);
                }}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  !isSideBySide && mediaSource === 'free_db'
                    ? 'bg-orange-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Démonstrateur réel de free-exercise-db"
              >
                <Dumbbell className="w-3 h-3" />
                <span>free-exercise-db</span>
              </button>
            )}

            <button
              onClick={() => {
                setMediaSource('anatomy_3d');
                setIsSideBySide(false);
                setIsPlaying(true);
              }}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                !isSideBySide && mediaSource === 'anatomy_3d'
                  ? 'bg-red-600 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Modèle 3D anatomique avec muscles en rouge"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Modèle 3D</span>
            </button>

            <button
              onClick={() => {
                setIsSideBySide(true);
                setIsPlaying(false);
              }}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                isSideBySide
                  ? 'bg-slate-800 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Planche 1 & 2</span>
            </button>
          </div>
        )}
      </div>

      {/* VIEW 1: DYNAMIC ANIMATED GIF (Real-time Looping Movement) */}
      {!isSideBySide ? (
        <div className="relative overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 shadow-inner">
          <div
            className={`relative w-full ${
              compact ? 'h-44' : 'h-64 sm:h-72'
            } flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 select-none`}
          >
            {/* Ambient Red Glow on peak contraction */}
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                activePose === 2 ? 'opacity-20 bg-red-600/20' : 'opacity-0'
              }`}
            />

            {/* High-definition crisp active frame */}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={currentImage}
                alt={`${exercise.name} - Pose ${activePose}`}
                referrerPolicy="no-referrer"
                initial={{ opacity: 0.88, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.88 }}
                transition={{ duration: 0.16, ease: 'easeOut' }}
                className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
              />
            </AnimatePresence>

            {/* Top-Left: Badge with Rep Counter and Engine Tag */}
            <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 text-white text-xs font-mono font-bold shadow-xl flex items-center gap-2 z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {mediaSource === 'free_db' ? 'free-exercise-db' : 'Modèle 3D'} · Rép {repCount}
              </span>
            </div>

            {/* Top-Right: Interactive Pose Selector Toggle ([1 Départ] / [2 Effort]) */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
              <button
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setActivePose(1);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1 shadow-lg ${
                  activePose === 1
                    ? 'bg-blue-600 text-white ring-2 ring-blue-400 scale-105'
                    : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:text-white'
                }`}
                title="Figer sur la position de départ"
              >
                <span>1</span>
                <span className="text-[10px] font-normal hidden sm:inline">Départ</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setActivePose(2);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1 shadow-lg ${
                  activePose === 2
                    ? 'bg-red-600 text-white ring-2 ring-red-400 scale-105'
                    : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:text-white'
                }`}
                title="Figer sur la position d'effort"
              >
                <span>2</span>
                <span className="text-[10px] font-normal hidden sm:inline">Effort</span>
              </button>
            </div>

            {/* Bottom Floating Pill: Biomechanical Phase Indicator */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
              <div
                className={`px-3 py-1.5 rounded-xl backdrop-blur-md text-xs font-bold shadow-xl flex items-center gap-2 border transition-all ${
                  activePose === 1
                    ? 'bg-blue-950/85 text-blue-200 border-blue-500/50'
                    : 'bg-red-950/85 text-red-200 border-red-500/50'
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    activePose === 1 ? 'bg-blue-400 animate-pulse' : 'bg-red-500 animate-ping'
                  }`}
                />
                <span>
                  {activePose === 1
                    ? 'Pose 1 : Position de départ & étirement'
                    : 'Pose 2 : Contraction musculaire maximale'}
                </span>
              </div>

              <div className="px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] font-mono text-slate-400 hidden sm:block">
                Cadence : {activePose === 1 ? 'Phase 1/2' : 'Phase 2/2'}
              </div>
            </div>

            {/* Cadence progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
              <motion.div
                className={`h-full ${
                  activePose === 1 ? 'bg-blue-500' : 'bg-red-600'
                } transition-all duration-300`}
                style={{ width: activePose === 1 ? '50%' : '100%' }}
              />
            </div>
          </div>

          {/* Technical Key Cue Strip */}
          {visualData.keyCue && !compact && (
            <div className="p-3 bg-slate-950 border-t border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="text-white font-semibold">Consigne clé : </strong>
                <span>{visualData.keyCue}</span>
              </div>
            </div>
          )}

          {/* Highlighted Red Muscles Tags */}
          {visualData.muscles.length > 0 && !compact && (
            <div className="p-3 border-t border-slate-800/80 bg-slate-900/60 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] uppercase font-black text-red-400 tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Muscles ciblés en rouge :
              </span>
              {visualData.muscles.map((muscle, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-red-950/60 border border-red-500/30 text-red-200 text-[11px] font-semibold"
                >
                  {muscle}
                </span>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* VIEW 2: SIDE-BY-SIDE HIGH DEFINITION COMPARISON */
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {/* Pose 1 Column */}
            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden p-2 space-y-1.5">
              <div className="flex items-center justify-between text-xs px-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-md bg-blue-600 text-white font-bold text-[11px] flex items-center justify-center">
                    1
                  </span>
                  <span className="font-bold text-white text-[11px]">Départ</span>
                </div>
                <span className="text-[10px] text-blue-400 font-mono">Étirement</span>
              </div>

              <div className="h-44 sm:h-52 w-full flex items-center justify-center overflow-hidden rounded-xl bg-slate-900">
                <img
                  src={
                    visualData.freeDbStart && mediaSource === 'free_db'
                      ? visualData.freeDbStart
                      : visualData.anatomyStart
                  }
                  alt="Pose 1 départ"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Pose 2 Column */}
            <div className="relative rounded-2xl bg-slate-950 border border-red-500/30 overflow-hidden p-2 space-y-1.5 shadow-md shadow-red-950/20">
              <div className="flex items-center justify-between text-xs px-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-md bg-red-600 text-white font-bold text-[11px] flex items-center justify-center">
                    2
                  </span>
                  <span className="font-bold text-white text-[11px]">Contraction</span>
                </div>
                <span className="text-[10px] text-red-400 font-mono">Pic d'effort</span>
              </div>

              <div className="h-44 sm:h-52 w-full flex items-center justify-center overflow-hidden rounded-xl bg-slate-900">
                <img
                  src={
                    visualData.freeDbEnd && mediaSource === 'free_db'
                      ? visualData.freeDbEnd
                      : visualData.anatomyEnd
                  }
                  alt="Pose 2 contraction"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Muscles List */}
          {visualData.muscles.length > 0 && !compact && (
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] uppercase font-black text-red-400 tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Muscles actifs en rouge :
              </span>
              {visualData.muscles.map((muscle, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-red-950/60 border border-red-500/30 text-red-200 text-[11px] font-semibold"
                >
                  {muscle}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Interactive Controls Bar */}
      {!compact && (
        <div className="pt-1 flex items-center justify-between text-xs px-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold transition-all active:scale-95 shadow-sm"
            >
              {isPlaying && !isSideBySide ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Lancer GIF</span>
                </>
              )}
            </button>

            {/* Speed Buttons */}
            <div className="flex items-center p-0.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px]">
              <button
                onClick={() => setSpeed(0.6)}
                className={`px-2 py-1 rounded-lg transition-colors ${
                  speed === 0.6 ? 'bg-red-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="Ralenti pour analyser la technique"
              >
                0.6x
              </button>
              <button
                onClick={() => setSpeed(1)}
                className={`px-2 py-1 rounded-lg transition-colors ${
                  speed === 1 ? 'bg-red-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="Vitesse d'entraînement normale"
              >
                1x
              </button>
              <button
                onClick={() => setSpeed(1.4)}
                className={`px-2 py-1 rounded-lg transition-colors ${
                  speed === 1.4 ? 'bg-red-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="Cadence dynamique"
              >
                1.4x
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>free-exercise-db + 3D</span>
          </div>
        </div>
      )}
    </div>
  );
};
