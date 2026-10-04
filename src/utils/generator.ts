import { EquipmentType, FitnessGoal, FitnessLevel, TrainingProgram, WorkoutRoutine, ProgramExercise, Exercise } from '../types/fitness';
import { EXERCISES } from '../data/exercises';

export function isExerciseCompatible(exercise: Exercise, availableEquipment: EquipmentType[]): boolean {
  // If exercise needs equipment, user must possess all of them
  return exercise.equipment.every((eq) => availableEquipment.includes(eq));
}

export function generateCustomProgram({
  name,
  availableEquipment,
  goal,
  level,
  daysPerWeek = 3,
  durationMinutes = 30
}: {
  name?: string;
  availableEquipment: EquipmentType[];
  goal: FitnessGoal;
  level: FitnessLevel;
  daysPerWeek: number;
  durationMinutes: number;
}): TrainingProgram {
  // Filter all compatible exercises
  const validExercises = EXERCISES.filter((ex) => isExerciseCompatible(ex, availableEquipment));

  // Fallback to bodyweight if none available
  const pool = validExercises.length > 0 ? validExercises : EXERCISES.filter((ex) => ex.equipment.includes('bodyweight'));

  const routines: WorkoutRoutine[] = [];

  // Determine exercises count based on duration
  const exerciseCount = durationMinutes <= 20 ? 4 : durationMinutes <= 35 ? 5 : 6;
  const targetReps = goal === 'strength' ? 6 : goal === 'muscle_gain' ? 10 : 15;
  const targetSets = level === 'beginner' ? 3 : 4;
  const restSec = goal === 'strength' ? 90 : goal === 'fat_loss' ? 45 : 60;

  const getByCategory = (category: string) => pool.filter((e) => e.category === category);

  if (daysPerWeek === 2) {
    // Full Body A & B
    routines.push(
      createRoutine({
        id: `routine-custom-${Date.now()}-1`,
        name: 'Full Body - Séance A',
        description: 'Pectoraux, cuisses, dos et gainage.',
        goal,
        level,
        availableEquipment,
        durationMinutes,
        exercises: selectBalancedExercises(pool, ['chest', 'legs', 'back', 'abs', 'shoulders'], exerciseCount, targetSets, targetReps, restSec)
      }),
      createRoutine({
        id: `routine-custom-${Date.now()}-2`,
        name: 'Full Body - Séance B',
        description: 'Chaîne postérieure, fessiers, tirage et bras.',
        goal,
        level,
        availableEquipment,
        durationMinutes,
        exercises: selectBalancedExercises(pool, ['legs', 'glutes', 'back', 'biceps', 'triceps', 'abs'], exerciseCount, targetSets, targetReps, restSec)
      })
    );
  } else if (daysPerWeek >= 4) {
    // Upper / Lower split
    routines.push(
      createRoutine({
        id: `routine-custom-${Date.now()}-upper-1`,
        name: 'Haut du Corps (Push & Pull)',
        description: 'Développés, tirages et travail des épaules.',
        goal,
        level,
        availableEquipment,
        durationMinutes,
        exercises: selectBalancedExercises(pool, ['chest', 'back', 'shoulders', 'biceps', 'triceps'], exerciseCount, targetSets, targetReps, restSec)
      }),
      createRoutine({
        id: `routine-custom-${Date.now()}-lower-1`,
        name: 'Bas du Corps & Abdos',
        description: 'Quadriceps, fessiers, ischios et sangle abdominale.',
        goal,
        level,
        availableEquipment,
        durationMinutes,
        exercises: selectBalancedExercises(pool, ['legs', 'glutes', 'calves', 'abs'], exerciseCount, targetSets, targetReps, restSec)
      }),
      createRoutine({
        id: `routine-custom-${Date.now()}-upper-2`,
        name: 'Haut du Corps (Intensité & Bras)',
        description: 'Accentuation des bras et dos.',
        goal,
        level,
        availableEquipment,
        durationMinutes,
        exercises: selectBalancedExercises(pool, ['back', 'chest', 'biceps', 'triceps', 'shoulders'], exerciseCount, targetSets, targetReps, restSec)
      }),
      createRoutine({
        id: `routine-custom-${Date.now()}-lower-2`,
        name: 'Bas du Corps (Puissance & Core)',
        description: 'Renforcement explosif et gainage.',
        goal,
        level,
        availableEquipment,
        durationMinutes,
        exercises: selectBalancedExercises(pool, ['legs', 'glutes', 'abs', 'cardio'], exerciseCount, targetSets, targetReps, restSec)
      })
    );
  } else {
    // 3 Days: Push, Pull, Legs or Full Body 3x
    if (availableEquipment.includes('dumbbells') || availableEquipment.includes('bench')) {
      // PPL
      routines.push(
        createRoutine({
          id: `routine-custom-${Date.now()}-push`,
          name: 'Push (Pectoraux & Triceps)',
          description: 'Mouvements de poussée et triceps.',
          goal,
          level,
          availableEquipment,
          durationMinutes,
          exercises: selectBalancedExercises(pool, ['chest', 'shoulders', 'triceps', 'abs'], exerciseCount, targetSets, targetReps, restSec)
        }),
        createRoutine({
          id: `routine-custom-${Date.now()}-pull`,
          name: 'Pull (Dos & Biceps)',
          description: 'Mouvements de tirage et biceps.',
          goal,
          level,
          availableEquipment,
          durationMinutes,
          exercises: selectBalancedExercises(pool, ['back', 'biceps', 'shoulders'], exerciseCount, targetSets, targetReps, restSec)
        }),
        createRoutine({
          id: `routine-custom-${Date.now()}-legs`,
          name: 'Legs & Abdos (Jambes complètes)',
          description: 'Squats, fentes, fessiers et gainage.',
          goal,
          level,
          availableEquipment,
          durationMinutes,
          exercises: selectBalancedExercises(pool, ['legs', 'glutes', 'calves', 'abs'], exerciseCount, targetSets, targetReps, restSec)
        })
      );
    } else {
      // 3x Full Body
      routines.push(
        createRoutine({
          id: `routine-custom-${Date.now()}-fb1`,
          name: 'Full Body 1 (Force)',
          description: 'Renforcement global.',
          goal,
          level,
          availableEquipment,
          durationMinutes,
          exercises: selectBalancedExercises(pool, ['chest', 'legs', 'back', 'abs'], exerciseCount, targetSets, targetReps, restSec)
        }),
        createRoutine({
          id: `routine-custom-${Date.now()}-fb2`,
          name: 'Full Body 2 (Énergie & Cardio)',
          description: 'Volume et travail dynamique.',
          goal,
          level,
          availableEquipment,
          durationMinutes,
          exercises: selectBalancedExercises(pool, ['legs', 'glutes', 'shoulders', 'abs', 'cardio'], exerciseCount, targetSets, targetReps, restSec)
        }),
        createRoutine({
          id: `routine-custom-${Date.now()}-fb3`,
          name: 'Full Body 3 (Posture & Tonus)',
          description: 'Chaîne postérieure et gainage.',
          goal,
          level,
          availableEquipment,
          durationMinutes,
          exercises: selectBalancedExercises(pool, ['back', 'chest', 'legs', 'biceps', 'triceps'], exerciseCount, targetSets, targetReps, restSec)
        })
      );
    }
  }

  const generatedProgram: TrainingProgram = {
    id: `prog-custom-${Date.now()}`,
    name: name || `Programme Sur-Mesure (${daysPerWeek}j/sem)`,
    description: `Généré sur mesure selon votre matériel (${availableEquipment.length} équipement(s)) et votre objectif.`,
    goal,
    level,
    daysPerWeek,
    requiredEquipment: availableEquipment,
    routines,
    isCustom: true
  };

  return generatedProgram;
}

function selectBalancedExercises(
  pool: Exercise[],
  categories: string[],
  count: number,
  sets: number,
  reps: number,
  restSec: number
): ProgramExercise[] {
  const chosen: Exercise[] = [];
  const chosenIds = new Set<string>();

  // Pick 1 exercise per requested category
  for (const cat of categories) {
    if (chosen.length >= count) break;
    const matches = pool.filter((e) => e.category === cat && !chosenIds.has(e.id));
    if (matches.length > 0) {
      const selected = matches[0];
      chosen.push(selected);
      chosenIds.add(selected.id);
    }
  }

  // Fill up if needed
  for (const ex of pool) {
    if (chosen.length >= count) break;
    if (!chosenIds.has(ex.id)) {
      chosen.push(ex);
      chosenIds.add(ex.id);
    }
  }

  return chosen.map((ex) => ({
    exerciseId: ex.id,
    sets,
    reps: ex.category === 'abs' && ex.id.includes('plank') ? 45 : reps,
    restSec
  }));
}

function createRoutine({
  id,
  name,
  description,
  goal,
  level,
  availableEquipment,
  durationMinutes,
  exercises
}: {
  id: string;
  name: string;
  description: string;
  goal: FitnessGoal;
  level: FitnessLevel;
  availableEquipment: EquipmentType[];
  durationMinutes: number;
  exercises: ProgramExercise[];
}): WorkoutRoutine {
  return {
    id,
    name,
    description,
    goal,
    level,
    requiredEquipment: availableEquipment,
    estimatedMinutes: durationMinutes,
    exercises,
    isCustom: true
  };
}
