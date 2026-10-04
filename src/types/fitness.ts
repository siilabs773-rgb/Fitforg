export type EquipmentType =
  | 'bodyweight'        // Poids du corps
  | 'dumbbells'         // Haltères
  | 'barbell'           // Barre et disques
  | 'bench'             // Banc de musculation
  | 'resistance_bands'  // Élastiques
  | 'pullup_bar'        // Barre de traction
  | 'kettlebell'        // Kettlebell
  | 'mat';              // Tapis de sol

export type MuscleGroup =
  | 'chest'             // Pectoraux
  | 'back'              // Dos
  | 'shoulders'         // Épaules
  | 'biceps'            // Biceps
  | 'triceps'           // Triceps
  | 'legs'              // Jambes / Cuisses
  | 'glutes'            // Fessiers
  | 'calves'            // Mollets
  | 'abs'               // Abdominaux & Gainage
  | 'cardio';           // Cardio / Fitness

export type FitnessGoal =
  | 'muscle_gain'       // Prise de muscle / Hypertrophie
  | 'fat_loss'          // Perte de gras & Définition
  | 'strength'          // Force athlétique
  | 'calisthenics'      // Calisthénie / Maîtrise du corps
  | 'endurance_tone';   // Remise en forme & Tonification

export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Exercise {
  id: string;
  name: string;
  category: MuscleGroup;
  secondaryMuscles?: MuscleGroup[];
  equipment: EquipmentType[];
  difficulty: FitnessLevel;
  instructions: {
    setup: string;
    execution: string;
    breathing: string;
    mistakes: string[];
  };
  animationType:
    | 'pushup'
    | 'squat'
    | 'pullup'
    | 'plank'
    | 'dumbbell_press'
    | 'dumbbell_row'
    | 'bicep_curl'
    | 'tricep_dip'
    | 'lunge'
    | 'shoulder_press'
    | 'lateral_raise'
    | 'deadlift'
    | 'crunch'
    | 'jumping_jack'
    | 'burpee'
    | 'glute_bridge'
    | 'mountain_climber'
    | 'band_pull'
    | 'kettlebell_swing';
  anatomyImage?: string;
  poseStartImage?: string;
  poseEndImage?: string;
  freeExerciseDbId?: string;
  keyCue?: string;
  anatomyMuscles?: string[];
  defaultSets: number;
  defaultReps: number;
  defaultRestSec: number;
}

export interface ProgramExercise {
  exerciseId: string;
  sets: number;
  reps: number;
  restSec: number;
  targetWeightKg?: number;
  notes?: string;
}

export interface WorkoutRoutine {
  id: string;
  name: string;
  description: string;
  goal: FitnessGoal;
  level: FitnessLevel;
  requiredEquipment: EquipmentType[];
  estimatedMinutes: number;
  exercises: ProgramExercise[];
  isCustom?: boolean;
}

export interface TrainingProgram {
  id: string;
  name: string;
  description: string;
  goal: FitnessGoal;
  level: FitnessLevel;
  daysPerWeek: number;
  requiredEquipment: EquipmentType[];
  routines: WorkoutRoutine[];
  isCustom?: boolean;
}

export interface SetLog {
  setNumber: number;
  reps: number;
  weightKg: number;
  completed: boolean;
}

export interface ExerciseSessionLog {
  exerciseId: string;
  exerciseName: string;
  sets: SetLog[];
}

export interface WorkoutHistoryEntry {
  id: string;
  routineId: string;
  routineName: string;
  date: string; // ISO string
  durationMinutes: number;
  exercisesCompleted: ExerciseSessionLog[];
  totalVolumeKg: number;
  totalReps: number;
}

export interface UserPreferences {
  availableEquipment: EquipmentType[];
  goal: FitnessGoal;
  level: FitnessLevel;
  preferredDaysPerWeek: number;
  preferredDurationMinutes: number;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  installedOffline: boolean;
}
