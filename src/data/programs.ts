import { TrainingProgram } from '../types/fitness';

export const PRESET_PROGRAMS: TrainingProgram[] = [
  {
    id: 'prog-calisthenics-fullbody',
    name: 'Full Body Débutant au Poids du Corps',
    description: 'Programme complet 100% sans aucun matériel. Idéal pour débuter, brûler des calories et tonifier l’ensemble du corps à la maison.',
    goal: 'endurance_tone',
    level: 'beginner',
    daysPerWeek: 3,
    requiredEquipment: ['bodyweight'],
    routines: [
      {
        id: 'routine-calisthenics-a',
        name: 'Séance A : Force & Mobilité',
        description: 'Pectoraux, jambes et gainage fondamental.',
        goal: 'endurance_tone',
        level: 'beginner',
        requiredEquipment: ['bodyweight'],
        estimatedMinutes: 25,
        exercises: [
          { exerciseId: 'pushup-classic', sets: 3, reps: 10, restSec: 60 },
          { exerciseId: 'bodyweight-squat', sets: 3, reps: 15, restSec: 60 },
          { exerciseId: 'walking-lunges', sets: 3, reps: 10, restSec: 60 },
          { exerciseId: 'plank-classic', sets: 3, reps: 35, restSec: 45 },
          { exerciseId: 'calf-raises-standing', sets: 3, reps: 20, restSec: 45 }
        ]
      },
      {
        id: 'routine-calisthenics-b',
        name: 'Séance B : Posture & Tonicité',
        description: 'Chaîne postérieure, fessiers, épaules et sangle abdominale.',
        goal: 'endurance_tone',
        level: 'beginner',
        requiredEquipment: ['bodyweight'],
        estimatedMinutes: 25,
        exercises: [
          { exerciseId: 'glute-bridge', sets: 3, reps: 15, restSec: 45 },
          { exerciseId: 'superman-back', sets: 3, reps: 12, restSec: 45 },
          { exerciseId: 'pike-pushup', sets: 3, reps: 8, restSec: 60 },
          { exerciseId: 'crunch-classic', sets: 3, reps: 15, restSec: 45 },
          { exerciseId: 'mountain-climbers', sets: 3, reps: 25, restSec: 45 }
        ]
      }
    ]
  },
  {
    id: 'prog-dumbbells-hypertrophy',
    name: 'Prise de Muscle : Haltères & Banc',
    description: 'Split Push-Pull-Legs classique conçu pour maximiser le développement musculaire avec une simple paire d’haltères et un banc.',
    goal: 'muscle_gain',
    level: 'intermediate',
    daysPerWeek: 3,
    requiredEquipment: ['dumbbells', 'bench'],
    routines: [
      {
        id: 'routine-ppl-push',
        name: 'Push (Pectoraux, Épaules, Triceps)',
        description: 'Développés lourds et isolation des triceps et deltoïdes.',
        goal: 'muscle_gain',
        level: 'intermediate',
        requiredEquipment: ['dumbbells', 'bench'],
        estimatedMinutes: 40,
        exercises: [
          { exerciseId: 'dumbbell-bench-press', sets: 4, reps: 10, restSec: 90, targetWeightKg: 16 },
          { exerciseId: 'dumbbell-shoulder-press', sets: 3, reps: 10, restSec: 75, targetWeightKg: 12 },
          { exerciseId: 'lateral-raises-dumbbells', sets: 3, reps: 12, restSec: 60, targetWeightKg: 6 },
          { exerciseId: 'bench-dips', sets: 3, reps: 12, restSec: 60 },
          { exerciseId: 'overhead-tricep-extension', sets: 3, reps: 12, restSec: 60, targetWeightKg: 10 }
        ]
      },
      {
        id: 'routine-ppl-pull',
        name: 'Pull (Dos, Biceps, Arrière Épaule)',
        description: 'Épaississement du dos et travail des biceps.',
        goal: 'muscle_gain',
        level: 'intermediate',
        requiredEquipment: ['dumbbells', 'bench'],
        estimatedMinutes: 38,
        exercises: [
          { exerciseId: 'dumbbell-row-single', sets: 4, reps: 10, restSec: 75, targetWeightKg: 18 },
          { exerciseId: 'dumbbell-bicep-curl', sets: 3, reps: 12, restSec: 60, targetWeightKg: 10 },
          { exerciseId: 'hammer-curl', sets: 3, reps: 12, restSec: 60, targetWeightKg: 10 },
          { exerciseId: 'superman-back', sets: 3, reps: 15, restSec: 45 }
        ]
      },
      {
        id: 'routine-ppl-legs',
        name: 'Legs & Abdos (Cuisses, Ischios, Core)',
        description: 'Développement complet des membres inférieurs et sangle abdominale.',
        goal: 'muscle_gain',
        level: 'intermediate',
        requiredEquipment: ['dumbbells', 'bench'],
        estimatedMinutes: 42,
        exercises: [
          { exerciseId: 'goblet-squat', sets: 4, reps: 12, restSec: 90, targetWeightKg: 20 },
          { exerciseId: 'romanian-deadlift-dumbbells', sets: 4, reps: 10, restSec: 75, targetWeightKg: 16 },
          { exerciseId: 'bulgarian-split-squat', sets: 3, reps: 10, restSec: 75, targetWeightKg: 10 },
          { exerciseId: 'plank-classic', sets: 3, reps: 45, restSec: 45 },
          { exerciseId: 'leg-raises', sets: 3, reps: 12, restSec: 60 }
        ]
      }
    ]
  },
  {
    id: 'prog-calisthenics-mastery',
    name: 'Calisthénie & Barre de Traction',
    description: 'Programme axé sur la force relative au poids du corps avec barre de traction. Idéal pour sculpter un dos en V et des bras puissants.',
    goal: 'calisthenics',
    level: 'intermediate',
    daysPerWeek: 4,
    requiredEquipment: ['bodyweight', 'pullup_bar'],
    routines: [
      {
        id: 'routine-calis-upper',
        name: 'Haut du Corps Puissance',
        description: 'Enchaînement tractions et pompes avancées.',
        goal: 'calisthenics',
        level: 'intermediate',
        requiredEquipment: ['bodyweight', 'pullup_bar'],
        estimatedMinutes: 35,
        exercises: [
          { exerciseId: 'pullup-standard', sets: 4, reps: 6, restSec: 90 },
          { exerciseId: 'chinup-biceps', sets: 3, reps: 6, restSec: 90 },
          { exerciseId: 'pushup-decline', sets: 3, reps: 12, restSec: 60 },
          { exerciseId: 'pushup-diamond', sets: 3, reps: 10, restSec: 60 },
          { exerciseId: 'pike-pushup', sets: 3, reps: 8, restSec: 60 }
        ]
      },
      {
        id: 'routine-calis-lower-core',
        name: 'Bas du corps & Ceinture Abdominale',
        description: 'Explosivité des jambes et renforcement du tronc.',
        goal: 'calisthenics',
        level: 'intermediate',
        requiredEquipment: ['bodyweight'],
        estimatedMinutes: 30,
        exercises: [
          { exerciseId: 'bodyweight-squat', sets: 4, reps: 20, restSec: 60 },
          { exerciseId: 'walking-lunges', sets: 3, reps: 12, restSec: 60 },
          { exerciseId: 'mountain-climbers', sets: 4, reps: 30, restSec: 45 },
          { exerciseId: 'leg-raises', sets: 3, reps: 15, restSec: 45 },
          { exerciseId: 'plank-classic', sets: 3, reps: 50, restSec: 45 }
        ]
      }
    ]
  },
  {
    id: 'prog-hiit-express',
    name: 'HIIT Express : Brûle-Graisse & Cardio (20 min)',
    description: 'Séances courtes et intenses pour booster le métabolisme, perdre du gras et améliorer le souffle sans aucun équipement.',
    goal: 'fat_loss',
    level: 'intermediate',
    daysPerWeek: 3,
    requiredEquipment: ['bodyweight'],
    routines: [
      {
        id: 'routine-hiit-blast',
        name: 'Circuit Haute Intensité',
        description: 'Intervalles cardio et renforcement au poids du corps.',
        goal: 'fat_loss',
        level: 'intermediate',
        requiredEquipment: ['bodyweight'],
        estimatedMinutes: 20,
        exercises: [
          { exerciseId: 'jumping-jacks', sets: 3, reps: 40, restSec: 30 },
          { exerciseId: 'bodyweight-squat', sets: 3, reps: 20, restSec: 30 },
          { exerciseId: 'pushup-classic', sets: 3, reps: 12, restSec: 45 },
          { exerciseId: 'mountain-climbers', sets: 3, reps: 30, restSec: 30 },
          { exerciseId: 'burpees-classic', sets: 3, reps: 8, restSec: 60 }
        ]
      }
    ]
  },
  {
    id: 'prog-bands-home',
    name: 'Tonification avec Élastiques',
    description: 'Entraînement doux pour les articulations mais redoutable pour la définition musculaire avec bandes de résistance.',
    goal: 'endurance_tone',
    level: 'beginner',
    daysPerWeek: 3,
    requiredEquipment: ['resistance_bands'],
    routines: [
      {
        id: 'routine-bands-full',
        name: 'Full Body Élastiques',
        description: 'Tirages, développés et isolation aux bandes élastiques.',
        goal: 'endurance_tone',
        level: 'beginner',
        requiredEquipment: ['resistance_bands'],
        estimatedMinutes: 30,
        exercises: [
          { exerciseId: 'band-row', sets: 3, reps: 15, restSec: 45 },
          { exerciseId: 'band-face-pull', sets: 3, reps: 15, restSec: 45 },
          { exerciseId: 'band-bicep-curl', sets: 3, reps: 15, restSec: 45 },
          { exerciseId: 'glute-bridge', sets: 3, reps: 15, restSec: 45 },
          { exerciseId: 'bodyweight-squat', sets: 3, reps: 15, restSec: 45 }
        ]
      }
    ]
  }
];
