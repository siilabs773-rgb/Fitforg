import { Exercise } from '../types/fitness';
import { asset } from '../utils/asset';

export const EXERCISES: Exercise[] = [
  // --- PECTORAUX (CHEST) ---
  {
    id: 'pushup-classic',
    name: 'Pompes classiques',
    category: 'chest',
    secondaryMuscles: ['triceps', 'shoulders', 'abs'],
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    instructions: {
      setup: 'Mains posées au sol légèrement plus larges que les épaules, corps gainé en ligne droite de la tête aux talons.',
      execution: 'Fléchissez les coudes à 45° du buste jusqu’à frôler le sol avec la poitrine, puis poussez fermement pour remonter.',
      breathing: 'Inspirez à la descente, expirez puissamment en poussant.',
      mistakes: ['Creuser le bas du dos', 'Écarter les coudes à 90°', 'Ne pas descendre assez bas']
    },
    animationType: 'pushup',
    freeExerciseDbId: 'Pushups',
    anatomyImage: asset('images/pushup_anatomy_guide_1790866412729.jpg'),
    poseStartImage: asset('images/pushup_pose_start_1791128155877.jpg'),
    poseEndImage: asset('images/pushup_pose_end_1791128165671.jpg'),
    keyCue: 'Coudes à 45° du buste, corps rigide en planche gainée, poitrine frôle le sol',
    anatomyMuscles: ['Grand pectoral', 'Triceps brachial', 'Deltoïde antérieur', 'Gainage abdos'],
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 60
  },
  {
    id: 'pushup-decline',
    name: 'Pompes pieds surélevés',
    category: 'chest',
    secondaryMuscles: ['shoulders', 'triceps'],
    equipment: ['bodyweight'],
    difficulty: 'intermediate',
    instructions: {
      setup: 'Pieds surélevés sur une chaise ou un banc, mains au sol à la largeur des épaules.',
      execution: 'Descendez le buste vers le sol en ciblant le haut des pectoraux et l’avant des épaules.',
      breathing: 'Inspirez en descendant, expirez en remontant.',
      mistakes: ['Cambrer la colonne lombaire', 'Regarder vers le haut']
    },
    animationType: 'pushup',
    freeExerciseDbId: 'Decline_Push-Up',
    anatomyImage: asset('images/pushup_anatomy_guide_1790866412729.jpg'),
    poseStartImage: asset('images/pushup_pose_start_1791128155877.jpg'),
    poseEndImage: asset('images/pushup_pose_end_1791128165671.jpg'),
    keyCue: 'Angle de déclinaison vers l’avant, torse gainé, focus haut des pectoraux',
    anatomyMuscles: ['Haut des pectoraux (claviculaire)', 'Deltoïde antérieur', 'Triceps'],
    defaultSets: 3,
    defaultReps: 10,
    defaultRestSec: 75
  },
  {
    id: 'dumbbell-bench-press',
    name: 'Développé couché avec haltères',
    category: 'chest',
    secondaryMuscles: ['triceps', 'shoulders'],
    equipment: ['dumbbells', 'bench'],
    difficulty: 'intermediate',
    instructions: {
      setup: 'Allongez-vous sur le banc, les pieds ancrés au sol, haltères tenus au niveau de la poitrine.',
      execution: 'Poussez les haltères verticalement sans claquer au sommet, puis descendez sous contrôle en ouvrant la cage thoracique.',
      breathing: 'Inspirez à la descente contrôlée, expirez lors de la poussée.',
      mistakes: ['Décoller les fessiers du banc', 'Descendre trop brusquement', 'Verrouiller violemment les coudes']
    },
    animationType: 'dumbbell_press',
    freeExerciseDbId: 'Barbell_Bench_Press_-_Medium_Grip',
    anatomyImage: asset('images/bench_press_anatomy_guide_1790865408172.jpg'),
    poseStartImage: asset('images/bench_pose_start_1791128201547.jpg'),
    poseEndImage: asset('images/bench_pose_end_1791128213912.jpg'),
    keyCue: 'Omoplates rétractées, trajectoire verticale fluide, contraction des pectoraux',
    anatomyMuscles: ['Grand pectoral', 'Triceps brachial', 'Deltoïde antérieur'],
    defaultSets: 4,
    defaultReps: 10,
    defaultRestSec: 90
  },
  {
    id: 'dumbbell-floor-press',
    name: 'Développé au sol avec haltères (Floor Press)',
    category: 'chest',
    secondaryMuscles: ['triceps'],
    equipment: ['dumbbells', 'mat'],
    difficulty: 'beginner',
    instructions: {
      setup: 'Allongé sur le dos au sol, genoux pliés, haltères dans chaque main au niveau des côtes.',
      execution: 'Poussez vers le plafond jusqu’à extension des bras, puis redescendez jusqu’à ce que les triceps touchent doucement le sol.',
      breathing: 'Inspirez en descendant, expirez en développant.',
      mistakes: ['Frapper les coudes violemment au sol', 'Perdre l’ancrage des pieds']
    },
    animationType: 'dumbbell_press',
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 75
  },
  {
    id: 'pushup-diamond',
    name: 'Pompes diamant (Triceps & Pectoraux)',
    category: 'triceps',
    secondaryMuscles: ['chest', 'shoulders'],
    equipment: ['bodyweight'],
    difficulty: 'intermediate',
    instructions: {
      setup: 'Mains rapprochées sous la poitrine, pouces et index formant un triangle/diamant.',
      execution: 'Descendez le buste vers vos mains en gardant les coudes près du corps, puis repoussez.',
      breathing: 'Inspirez à la descente, expirez à la montée.',
      mistakes: ['Écarter les coudes vers l’extérieur', 'Relâcher la sangle abdominale']
    },
    animationType: 'pushup',
    defaultSets: 3,
    defaultReps: 10,
    defaultRestSec: 60
  },

  // --- DOS (BACK) ---
  {
    id: 'pullup-standard',
    name: 'Tractions en pronation (Pull-ups)',
    category: 'back',
    secondaryMuscles: ['biceps', 'shoulders'],
    equipment: ['pullup_bar'],
    difficulty: 'intermediate',
    instructions: {
      setup: 'Saisissez la barre paumes vers l’avant (pronation), mains plus larges que les épaules.',
      execution: 'Tirez avec les dorsaux en amenant la poitrine vers la barre jusqu’à ce que le menton la dépasse.',
      breathing: 'Expirez à la montée, inspirez en redescendant lentement.',
      mistakes: ['Balancer le corps / Kipping', 'Ne pas descendre en extension complète']
    },
    animationType: 'pullup',
    freeExerciseDbId: 'Pullups',
    anatomyImage: asset('images/pullup_anatomy_guide_1790866423796.jpg'),
    anatomyMuscles: ['Grand dorsal', 'Grand rond', 'Biceps brachial', 'Trapèzes'],
    defaultSets: 4,
    defaultReps: 8,
    defaultRestSec: 90
  },
  {
    id: 'chinup-biceps',
    name: 'Tractions en supination (Chin-ups)',
    category: 'back',
    secondaryMuscles: ['biceps'],
    equipment: ['pullup_bar'],
    difficulty: 'intermediate',
    instructions: {
      setup: 'Paumes tournées vers vous (supination), largeur des épaules.',
      execution: 'Tractez le corps verticalement en contractant fortement le dos et les biceps.',
      breathing: 'Expirez en montant, inspirez en redescendant sous contrôle.',
      mistakes: ['Arrêter le mouvement à mi-chemin', 'Tendre le cou en avant']
    },
    animationType: 'pullup',
    freeExerciseDbId: 'Chin-Up',
    anatomyImage: asset('images/pullup_anatomy_guide_1790866423796.jpg'),
    anatomyMuscles: ['Biceps brachial', 'Grand dorsal', 'Brachial'],
    defaultSets: 3,
    defaultReps: 8,
    defaultRestSec: 90
  },
  {
    id: 'dumbbell-row-single',
    name: 'Rowing unilatéral avec haltère',
    category: 'back',
    secondaryMuscles: ['biceps', 'shoulders'],
    equipment: ['dumbbells', 'bench'],
    difficulty: 'beginner',
    instructions: {
      setup: 'Un genou et une main en appui sur un banc, dos plat et parallèle au sol, haltère dans l’autre main.',
      execution: 'Tirez le coude vers l’arrière et le haut le long des côtes en serrant l’omoplate.',
      breathing: 'Expirez en tirant, inspirez en descendant lentement l’haltère.',
      mistakes: ['Faire pivoter excessivement le torse', 'Arrondir le dos']
    },
    animationType: 'dumbbell_row',
    freeExerciseDbId: 'Bent_Over_Barbell_Row',
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 60
  },
  {
    id: 'barbell-row',
    name: 'Rowing barre buste penché',
    category: 'back',
    secondaryMuscles: ['biceps', 'shoulders'],
    equipment: ['barbell'],
    difficulty: 'intermediate',
    instructions: {
      setup: 'Debout pieds largeur d’épaules, buste penché à 45° dos plat, barre tenue en pronation bras tendus.',
      execution: 'Tirez la barre vers le nombril en serrant puissamment les dorsaux et les omoplates vers l’arrière.',
      breathing: 'Expirez lors du tirage, inspirez en redescendant la barre sous contrôle.',
      mistakes: ['Arrondir le bas du dos', 'Prendre un excès d’élan avec les jambes']
    },
    animationType: 'dumbbell_row',
    freeExerciseDbId: 'Bent_Over_Barbell_Row',
    anatomyImage: asset('images/barbell_row_anatomy_guide_1790865419009.jpg'),
    anatomyMuscles: ['Grand dorsal', 'Trapèzes moyens & inférieurs', 'Rhomboïdes', 'Biceps'],
    defaultSets: 4,
    defaultReps: 10,
    defaultRestSec: 75
  },
  {
    id: 'band-row',
    name: 'Tirage horizontal avec élastique',
    category: 'back',
    secondaryMuscles: ['biceps', 'shoulders'],
    equipment: ['resistance_bands'],
    difficulty: 'beginner',
    instructions: {
      setup: 'Assis au sol jambes tendues, élastique enroulé autour des pieds, ou debout attaché à un point fixe.',
      execution: 'Tirez les poignées vers le nombril en resserrant les omoplates l’une vers l’autre.',
      breathing: 'Expirez lors du tirage, inspirez en revenant.',
      mistakes: ['Hausser les épaules', 'Relâcher la tension brusquement']
    },
    animationType: 'band_pull',
    defaultSets: 3,
    defaultReps: 15,
    defaultRestSec: 45
  },
  {
    id: 'superman-back',
    name: 'Extensions lombaires au sol (Superman)',
    category: 'back',
    secondaryMuscles: ['glutes'],
    equipment: ['bodyweight', 'mat'],
    difficulty: 'beginner',
    instructions: {
      setup: 'Allongé sur le ventre, bras tendus devant vous et jambes tendues.',
      execution: 'Décollez simultanément la poitrine, les bras et les cuisses du sol en contractant les lombaires et fessiers. Maintenez 2 secondes.',
      breathing: 'Expirez en décollant, inspirez en redescendant.',
      mistakes: ['Casser la nuque en arrière', 'Mouvements par à-coups']
    },
    animationType: 'plank',
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 45
  },

  // --- JAMBES & FESSIERS (LEGS & GLUTES) ---
  {
    id: 'bodyweight-squat',
    name: 'Squats au poids du corps',
    category: 'legs',
    secondaryMuscles: ['glutes', 'abs'],
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    instructions: {
      setup: 'Pieds écartés de la largeur des épaules, pointes légèrement ouvertes vers l’extérieur, regard droit devant.',
      execution: 'Fléchissez les genoux et poussez les fessiers vers l’arrière comme pour vous asseoir, jusqu’à cuisses parallèles au sol.',
      breathing: 'Inspirez à la descente, expirez en poussant sur les talons.',
      mistakes: ['Genoux qui rentrent vers l’intérieur', 'Décoller les talons', 'Arrondir le dos']
    },
    animationType: 'squat',
    freeExerciseDbId: 'Barbell_Full_Squat',
    anatomyImage: asset('images/squat_anatomy_guide_1790865396626.jpg'),
    poseStartImage: asset('images/squat_pose_start_1791128129739.jpg'),
    poseEndImage: asset('images/squat_pose_end_1791128144460.jpg'),
    keyCue: 'Genoux dans l’axe des pointes de pieds, cuisses parallèles au sol, buste fier',
    anatomyMuscles: ['Quadriceps', 'Grand fessier', 'Ischio-jambiers', 'Mollets'],
    defaultSets: 4,
    defaultReps: 15,
    defaultRestSec: 60
  },
  {
    id: 'goblet-squat',
    name: 'Goblet Squat avec haltère ou kettlebell',
    category: 'legs',
    secondaryMuscles: ['glutes', 'abs'],
    equipment: ['dumbbells'],
    difficulty: 'beginner',
    instructions: {
      setup: 'Tenez un haltère ou kettlebell verticalement contre votre poitrine avec les deux mains.',
      execution: 'Descendez en squat profond en gardant le torse bien droit et les coudes à l’intérieur des genoux.',
      breathing: 'Inspirez en descendant, expirez puissamment en remontant.',
      mistakes: ['Pencher le buste trop en avant', 'Laisser la charge s’éloigner du torse']
    },
    animationType: 'squat',
    freeExerciseDbId: 'Barbell_Full_Squat',
    anatomyImage: asset('images/squat_anatomy_guide_1790865396626.jpg'),
    poseStartImage: asset('images/squat_pose_start_1791128129739.jpg'),
    poseEndImage: asset('images/squat_pose_end_1791128144460.jpg'),
    keyCue: 'Charge plaquée contre le sternum, coudes entre les genoux, amplitude complète',
    anatomyMuscles: ['Quadriceps', 'Grand fessier', 'Ischio-jambiers', 'Core'],
    defaultSets: 4,
    defaultReps: 10,
    defaultRestSec: 75
  },
  {
    id: 'walking-lunges',
    name: 'Fentes avant dynamiques',
    category: 'legs',
    secondaryMuscles: ['glutes', 'calves'],
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    instructions: {
      setup: 'Debout, pieds largeur de hanches, mains sur les hanches ou le long du corps.',
      execution: 'Faites un grand pas vers l’avant et descendez jusqu’à ce que le genou arrière frôle le sol à 90°, puis revenez.',
      breathing: 'Inspirez en avançant, expirez en poussant pour revenir.',
      mistakes: ['Le genou avant dépasse trop les orteils', 'Buste penché vers l’avant']
    },
    animationType: 'lunge',
    freeExerciseDbId: 'Dumbbell_Lunges',
    anatomyImage: asset('images/lunge_anatomy_guide_1790866434614.jpg'),
    anatomyMuscles: ['Quadriceps', 'Grand fessier', 'Ischio-jambiers', 'Mollets'],
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 60
  },
  {
    id: 'bulgarian-split-squat',
    name: 'Fentes bulgares (pied surélevé)',
    category: 'legs',
    secondaryMuscles: ['glutes'],
    equipment: ['bodyweight', 'bench'],
    difficulty: 'intermediate',
    instructions: {
      setup: 'Debout dos à un banc ou une chaise, posez le dessus d’un pied sur le banc, l’autre pied bien en avant.',
      execution: 'Descendez verticalement en fléchissant la jambe avant jusqu’à ce que la cuisse soit parallèle au sol.',
      breathing: 'Inspirez à la descente, expirez en repoussant par le talon avant.',
      mistakes: ['Pied avant trop proche du banc', 'Perte d’équilibre par manque de gainage']
    },
    animationType: 'lunge',
    defaultSets: 3,
    defaultReps: 10,
    defaultRestSec: 60
  },
  {
    id: 'glute-bridge',
    name: 'Pont fessier au sol (Glute Bridge)',
    category: 'glutes',
    secondaryMuscles: ['legs', 'abs'],
    equipment: ['bodyweight', 'mat'],
    difficulty: 'beginner',
    instructions: {
      setup: 'Allongé sur le dos, genoux pliés, pieds à plat sur le sol écartés de la largeur du bassin.',
      execution: 'Poussez sur les talons pour monter le bassin jusqu’à aligner genoux, hanches et épaules. Contractez fort 2 secondes.',
      breathing: 'Expirez en montant, inspirez en redescendant sans poser complètement.',
      mistakes: ['Hyperextension du bas du dos', 'Pieds trop éloignés des fessiers']
    },
    animationType: 'glute_bridge',
    defaultSets: 3,
    defaultReps: 15,
    defaultRestSec: 45
  },
  {
    id: 'romanian-deadlift-dumbbells',
    name: 'Soulevé de terre jambes tendues (RDL)',
    category: 'legs',
    secondaryMuscles: ['glutes', 'back'],
    equipment: ['dumbbells'],
    difficulty: 'intermediate',
    instructions: {
      setup: 'Debout pieds largeur d’épaules, haltères tenus devant les cuisses, genoux très légèrement déverrouillés.',
      execution: 'Poussez les fessiers vers l’arrière en inclinant le buste dos parfaitement plat jusqu’à sentir l’étirement des ischios.',
      breathing: 'Inspirez à la descente, serrez les fessiers et expirez pour vous redresser.',
      mistakes: ['Arrondir le dos', 'Fléchir trop les genoux comme un squat']
    },
    animationType: 'deadlift',
    defaultSets: 4,
    defaultReps: 10,
    defaultRestSec: 75
  },
  {
    id: 'calf-raises-standing',
    name: 'Élévations des mollets debout',
    category: 'calves',
    secondaryMuscles: ['legs'],
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    instructions: {
      setup: 'Debout sur le bord d’une marche ou au sol, pieds parallèles.',
      execution: 'Montez le plus haut possible sur la pointe des pieds, contractez une seconde au sommet, puis redescendez lentement.',
      breathing: 'Expirez en montant, inspirez en descendant.',
      mistakes: ['Rebondir rapidement sans marquer la contraction']
    },
    animationType: 'squat',
    defaultSets: 3,
    defaultReps: 20,
    defaultRestSec: 45
  },

  // --- ÉPAULES (SHOULDERS) ---
  {
    id: 'dumbbell-shoulder-press',
    name: 'Développé militaire avec haltères',
    category: 'shoulders',
    secondaryMuscles: ['triceps', 'chest'],
    equipment: ['dumbbells'],
    difficulty: 'beginner',
    instructions: {
      setup: 'Debout ou assis le dos droit, haltères au niveau des oreilles, coudes sous les poignets.',
      execution: 'Développez les haltères au-dessus de la tête sans claquer les poids, puis redescendez sous contrôle.',
      breathing: 'Expirez en développant vers le haut, inspirez à la descente.',
      mistakes: ['Cambrer exagérément les lombaires', 'Pousser vers l’avant au lieu de verticalement']
    },
    animationType: 'shoulder_press',
    defaultSets: 3,
    defaultReps: 10,
    defaultRestSec: 75
  },
  {
    id: 'lateral-raises-dumbbells',
    name: 'Élévations latérales avec haltères',
    category: 'shoulders',
    secondaryMuscles: [],
    equipment: ['dumbbells'],
    difficulty: 'beginner',
    instructions: {
      setup: 'Debout, bras le long du corps, coudes légèrement fléchis, haltères légers.',
      execution: 'Montez les bras sur les côtés jusqu’à l’horizontale (hauteur des épaules) en guidant avec les coudes.',
      breathing: 'Expirez en montant, inspirez en retenant la descente.',
      mistakes: ['Utiliser l’élan du corps', 'Monter les mains plus haut que les coudes']
    },
    animationType: 'lateral_raise',
    defaultSets: 3,
    defaultReps: 15,
    defaultRestSec: 60
  },
  {
    id: 'band-face-pull',
    name: 'Face Pull avec élastique (Posture & Arrière d’épaule)',
    category: 'shoulders',
    secondaryMuscles: ['back'],
    equipment: ['resistance_bands'],
    difficulty: 'beginner',
    instructions: {
      setup: 'Élastique fixé à hauteur des yeux, tenez les deux extrémités paumes vers le bas.',
      execution: 'Tirez l’élastique vers votre front en écartant les coudes et en faisant une rotation externe des mains.',
      breathing: 'Expirez en tirant, inspirez en contrôlant le retour.',
      mistakes: ['Avancer la tête pour rencontrer l’élastique']
    },
    animationType: 'band_pull',
    defaultSets: 3,
    defaultReps: 15,
    defaultRestSec: 45
  },
  {
    id: 'pike-pushup',
    name: 'Pompes en pique (Pike Push-ups)',
    category: 'shoulders',
    secondaryMuscles: ['triceps', 'chest'],
    equipment: ['bodyweight'],
    difficulty: 'intermediate',
    instructions: {
      setup: 'Position de pompe avec le bassin monté vers le plafond, formant un V inversé.',
      execution: 'Fléchissez les bras pour amener le sommet de la tête vers le sol entre vos mains, puis repoussez.',
      breathing: 'Inspirez à la descente, expirez en repoussant.',
      mistakes: ['Garder les jambes trop fléchies', 'Perdre l’alignement des épaules']
    },
    animationType: 'pushup',
    defaultSets: 3,
    defaultReps: 8,
    defaultRestSec: 75
  },

  // --- BRAS (BICEPS & TRICEPS) ---
  {
    id: 'dumbbell-bicep-curl',
    name: 'Curl biceps avec haltères',
    category: 'biceps',
    secondaryMuscles: [],
    equipment: ['dumbbells'],
    difficulty: 'beginner',
    instructions: {
      setup: 'Debout, pieds largeur d’épaules, un haltère dans chaque main, coudes collés aux flancs.',
      execution: 'Fléchissez les avant-bras vers le haut en effectuant une rotation des poignets (supination). Contractez fort au sommet.',
      breathing: 'Expirez à la montée, inspirez en retenant la charge.',
      mistakes: ['Balancer le dos pour tricher', 'Décoller les coudes vers l’avant']
    },
    animationType: 'bicep_curl',
    freeExerciseDbId: 'Dumbbell_Bicep_Curl',
    anatomyImage: asset('images/bicep_curl_anatomy_guide_1790865430861.jpg'),
    poseStartImage: asset('images/bicep_curl_start_1791128177808.jpg'),
    poseEndImage: asset('images/bicep_curl_end_1791128187956.jpg'),
    keyCue: 'Coudes verrouillés aux flancs, supination en montée, contraction maximale au sommet',
    anatomyMuscles: ['Biceps brachial (chef court & long)', 'Brachial antérieur', 'Avant-bras'],
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 60
  },
  {
    id: 'hammer-curl',
    name: 'Curl marteau (Biceps & Avant-bras)',
    category: 'biceps',
    secondaryMuscles: [],
    equipment: ['dumbbells'],
    difficulty: 'beginner',
    instructions: {
      setup: 'Debout, haltères tenus en prise neutre (paumes face à face).',
      execution: 'Montez les haltères sans tourner les poignets, en gardant la prise neutre tout au long de la répétition.',
      breathing: 'Expirez en levant, inspirez en descendant.',
      mistakes: ['Prendre de l’élan avec les genoux']
    },
    animationType: 'bicep_curl',
    freeExerciseDbId: 'Dumbbell_Bicep_Curl',
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 60
  },
  {
    id: 'band-bicep-curl',
    name: 'Curl biceps avec élastique',
    category: 'biceps',
    secondaryMuscles: [],
    equipment: ['resistance_bands'],
    difficulty: 'beginner',
    instructions: {
      setup: 'Pieds calés au milieu de l’élastique, tenez les poignées paumes tournées vers l’avant.',
      execution: 'Tirez les poignées vers les épaules en résistant à la tension croissante de l’élastique.',
      breathing: 'Expirez à la flexion, inspirez au retour.',
      mistakes: ['Relâcher l’élastique d’un coup sec']
    },
    animationType: 'bicep_curl',
    freeExerciseDbId: 'Dumbbell_Bicep_Curl',
    defaultSets: 3,
    defaultReps: 15,
    defaultRestSec: 45
  },
  {
    id: 'bench-dips',
    name: 'Dips sur chaise ou banc',
    category: 'triceps',
    secondaryMuscles: ['chest', 'shoulders'],
    equipment: ['bench'],
    difficulty: 'beginner',
    instructions: {
      setup: 'Mains appuyées sur le rebord d’un banc ou d’une chaise solide, fessiers dans le vide, jambes tendues ou fléchies.',
      execution: 'Descendez le bassin verticalement jusqu’à ce que les coudes soient pliés à 90°, puis remontez en tendant les bras.',
      breathing: 'Inspirez en descendant, expirez en repoussant.',
      mistakes: ['Éloigner le dos trop loin du banc', 'Descendre trop bas sous les 90°']
    },
    animationType: 'tricep_dip',
    freeExerciseDbId: 'Bench_Dips',
    anatomyImage: asset('images/dips_anatomy_guide_1790866445944.jpg'),
    anatomyMuscles: ['Triceps brachial', 'Pectoraux inférieurs', 'Deltoïde antérieur'],
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 60
  },
  {
    id: 'overhead-tricep-extension',
    name: 'Extension triceps au-dessus de la tête',
    category: 'triceps',
    secondaryMuscles: [],
    equipment: ['dumbbells'],
    difficulty: 'beginner',
    instructions: {
      setup: 'Assis ou debout, tenez un haltère à deux mains verticalement au-dessus de la tête, bras tendus.',
      execution: 'Fléchissez les coudes pour descendre l’haltère derrière la nuque, puis retendez les bras vers le haut.',
      breathing: 'Inspirez en descendant la charge, expirez en tendant les bras.',
      mistakes: ['Écarter les coudes sur les côtés']
    },
    animationType: 'dumbbell_press',
    freeExerciseDbId: 'Standing_Dumbbell_Triceps_Extension',
    anatomyImage: asset('images/tricep_extension_anatomy_guide_1790865442793.jpg'),
    anatomyMuscles: ['Triceps brachial (longue portion)', 'Triceps vaste externe', 'Triceps vaste interne'],
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 60
  },

  // --- ABDOMINAUX & CORE (ABS) ---
  {
    id: 'plank-classic',
    name: 'Gainage planche sur les avant-bras',
    category: 'abs',
    secondaryMuscles: ['shoulders', 'glutes'],
    equipment: ['bodyweight', 'mat'],
    difficulty: 'beginner',
    instructions: {
      setup: 'En appui sur les avant-bras et la pointe des pieds, coudes sous les épaules.',
      execution: 'Maintenez le corps droit comme une planche rigide, rétroversion du bassin, abdominaux et fessiers verrouillés.',
      breathing: 'Respirez calmement et profondément sans bloquer votre respiration.',
      mistakes: ['Fesses trop hautes en pyramide', 'Creuser les lombaires']
    },
    animationType: 'plank',
    freeExerciseDbId: 'Plank',
    defaultSets: 3,
    defaultReps: 45, // secondes
    defaultRestSec: 45
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers (Gainage dynamique)',
    category: 'abs',
    secondaryMuscles: ['cardio', 'shoulders'],
    equipment: ['bodyweight', 'mat'],
    difficulty: 'beginner',
    instructions: {
      setup: 'Position haute de pompe, mains sous les épaules, corps aligné.',
      execution: 'Ramenez alternativement les genoux vers la poitrine à un rythme soutenu tout en restant parfaitement gainé.',
      breathing: 'Rythmez l’expiration sur chaque coup de genou.',
      mistakes: ['Rebondir avec les fesses en l’air', 'Relâcher la nuque']
    },
    animationType: 'mountain_climber',
    freeExerciseDbId: 'Plank',
    defaultSets: 3,
    defaultReps: 30, // répétitions ou secondes
    defaultRestSec: 45
  },
  {
    id: 'crunch-classic',
    name: 'Crunchs abdominaux au sol',
    category: 'abs',
    secondaryMuscles: [],
    equipment: ['bodyweight', 'mat'],
    difficulty: 'beginner',
    instructions: {
      setup: 'Allongé sur le dos, genoux pliés à 90°, bouts des doigts effleurant les tempes (ne tirez pas sur la nuque).',
      execution: 'Enroulez le haut du buste vers le bassin en écrasant les lombaires dans le sol.',
      breathing: 'Expirez à la contraction, inspirez en déroulant doucement.',
      mistakes: ['Tirer sur la tête avec les mains', 'Décoller tout le bas du dos']
    },
    animationType: 'crunch',
    freeExerciseDbId: 'Crunches',
    defaultSets: 3,
    defaultReps: 20,
    defaultRestSec: 45
  },
  {
    id: 'leg-raises',
    name: 'Relevés de jambes au sol (Bas du ventre)',
    category: 'abs',
    secondaryMuscles: ['legs'],
    equipment: ['bodyweight', 'mat'],
    difficulty: 'intermediate',
    instructions: {
      setup: 'Allongé sur le dos, mains calées sous les fessiers pour protéger les lombaires, jambes tendues.',
      execution: 'Montez les deux jambes tendues vers la verticale puis redescendez-les doucement sans toucher le sol.',
      breathing: 'Expirez en levant les jambes, inspirez en descendant.',
      mistakes: ['Cambrer le bas du dos', 'Utiliser trop d’élan']
    },
    animationType: 'crunch',
    defaultSets: 3,
    defaultReps: 12,
    defaultRestSec: 60
  },

  // --- CARDIO & HIIT FITNESS ---
  {
    id: 'burpees-classic',
    name: 'Burpees complets',
    category: 'cardio',
    secondaryMuscles: ['legs', 'chest', 'abs'],
    equipment: ['bodyweight'],
    difficulty: 'advanced',
    instructions: {
      setup: 'Debout pieds largeur d’épaules.',
      execution: 'Descendez en squat, posez les mains au sol, jetez les pieds en arrière en planche, faites une pompe, ramenez les pieds et sautez vers le haut.',
      breathing: 'Inspirez à la descente, expirez puissamment sur le saut.',
      mistakes: ['Laisser le bassin s’effondrer au sol', 'Sauter sans amorti']
    },
    animationType: 'burpee',
    defaultSets: 3,
    defaultReps: 10,
    defaultRestSec: 60
  },
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks (Cardio échauffement)',
    category: 'cardio',
    secondaryMuscles: ['calves', 'shoulders'],
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    instructions: {
      setup: 'Debout pieds joints, bras le long du corps.',
      execution: 'Sautez en écartant simultanément les jambes et en touchant les mains au-dessus de la tête, puis revenez.',
      breathing: 'Respiration continue et fluide.',
      mistakes: ['Atterrir lourdement sur les talons']
    },
    animationType: 'jumping_jack',
    defaultSets: 3,
    defaultReps: 30,
    defaultRestSec: 30
  },
  {
    id: 'kettlebell-swing',
    name: 'Kettlebell Swing (Puissance de hanche & Cardio)',
    category: 'glutes',
    secondaryMuscles: ['back', 'legs', 'cardio'],
    equipment: ['kettlebell'],
    difficulty: 'intermediate',
    instructions: {
      setup: 'Debout pieds plus larges que les épaules, kettlebell tenu à deux mains entre les jambes.',
      execution: 'Inclinez le buste en poussant les fesses vers l’arrière, puis projetez violemment les hanches vers l’avant pour propulser le kettlebell à hauteur de poitrine.',
      breathing: 'Inspirez au balancier arrière, expirez explosivement au verrouillage des hanches.',
      mistakes: ['Accroupir les jambes au lieu de basculer le bassin (Hinge)', 'Tirer avec les bras']
    },
    animationType: 'kettlebell_swing',
    defaultSets: 4,
    defaultReps: 15,
    defaultRestSec: 60
  }
];

export const EQUIPMENT_LABELS: Record<string, { label: string; iconName: string; desc: string }> = {
  bodyweight: {
    label: 'Sans matériel / Poids du corps',
    iconName: 'User',
    desc: 'Calisthénie, squats, pompes, cardio au poids corporel.'
  },
  dumbbells: {
    label: 'Haltères',
    iconName: 'Dumbbell',
    desc: 'Paires d’haltères modulables ou fixes.'
  },
  barbell: {
    label: 'Barre et disques',
    iconName: 'Disc',
    desc: 'Barre droite d’haltérophilie / musculation.'
  },
  bench: {
    label: 'Banc de musculation',
    iconName: 'Square',
    desc: 'Banc plat ou inclinable (ou chaise solide).'
  },
  resistance_bands: {
    label: 'Élastiques de résistance',
    iconName: 'Activity',
    desc: 'Bandes tubulaires ou bandes élastiques fermées.'
  },
  pullup_bar: {
    label: 'Barre de traction',
    iconName: 'Maximize2',
    desc: 'Barre de porte ou barre murale.'
  },
  kettlebell: {
    label: 'Kettlebell',
    iconName: 'CircleDot',
    desc: 'Poids russes pour swings et renforcement.'
  },
  mat: {
    label: 'Tapis de sol',
    iconName: 'Layers',
    desc: 'Tapis fitness pour le confort du gainage et des exercices au sol.'
  }
};

export const MUSCLE_LABELS: Record<string, string> = {
  chest: 'Pectoraux',
  back: 'Dos & Dorsaux',
  shoulders: 'Épaules',
  biceps: 'Biceps',
  triceps: 'Triceps',
  legs: 'Jambes & Cuisses',
  glutes: 'Fessiers',
  calves: 'Mollets',
  abs: 'Abdos & Gainage',
  cardio: 'Cardio & HIIT'
};
