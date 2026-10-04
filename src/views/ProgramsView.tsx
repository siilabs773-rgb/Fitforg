import React, { useState } from 'react';
import {
  Wand2,
  Check,
  Plus,
  Dumbbell,
  CheckCircle2,
  Trash2,
  Layers,
  Sparkles,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  TrainingProgram,
  WorkoutRoutine,
  EquipmentType,
  FitnessGoal,
  FitnessLevel,
  UserPreferences
} from '../types/fitness';
import { EQUIPMENT_LABELS, EXERCISES, MUSCLE_LABELS } from '../data/exercises';
import { generateCustomProgram } from '../utils/generator';

interface ProgramsViewProps {
  programs: TrainingProgram[];
  activeProgramId: string;
  preferences: UserPreferences;
  onSelectActiveProgram: (programId: string) => void;
  onSaveNewProgram: (program: TrainingProgram) => void;
  onDeleteProgram: (programId: string) => void;
  onStartRoutine: (routine: WorkoutRoutine) => void;
}

export const ProgramsView: React.FC<ProgramsViewProps> = ({
  programs,
  activeProgramId,
  preferences,
  onSelectActiveProgram,
  onSaveNewProgram,
  onDeleteProgram,
  onStartRoutine
}) => {
  const [activeTab, setActiveTab] = useState<'generator' | 'catalog' | 'custom'>('generator');

  // Generator State
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentType[]>(
    preferences.availableEquipment || ['bodyweight']
  );
  const [goal, setGoal] = useState<FitnessGoal>(preferences.goal || 'endurance_tone');
  const [level, setLevel] = useState<FitnessLevel>(preferences.level || 'beginner');
  const [daysPerWeek, setDaysPerWeek] = useState<number>(3);
  const [durationMinutes, setDurationMinutes] = useState<number>(30);
  const [customName, setCustomName] = useState<string>('');
  const [justGeneratedMsg, setJustGeneratedMsg] = useState(false);

  // Expanded routine preview in catalog
  const [expandedProgramId, setExpandedProgramId] = useState<string | null>(activeProgramId);

  // Equipment Toggle Helper
  const toggleEquipment = (eq: EquipmentType) => {
    if (eq === 'bodyweight') return; // Bodyweight is always available
    if (selectedEquipment.includes(eq)) {
      setSelectedEquipment(selectedEquipment.filter((x) => x !== eq));
    } else {
      setSelectedEquipment([...selectedEquipment, eq]);
    }
  };

  const applyPreset = (preset: 'home_none' | 'home_dumbbells' | 'calisthenics' | 'full_gym') => {
    if (preset === 'home_none') {
      setSelectedEquipment(['bodyweight']);
    } else if (preset === 'home_dumbbells') {
      setSelectedEquipment(['bodyweight', 'dumbbells', 'mat']);
    } else if (preset === 'calisthenics') {
      setSelectedEquipment(['bodyweight', 'pullup_bar', 'mat']);
    } else if (preset === 'full_gym') {
      setSelectedEquipment(['bodyweight', 'dumbbells', 'barbell', 'bench', 'pullup_bar', 'resistance_bands', 'kettlebell', 'mat']);
    }
  };

  const handleGenerate = () => {
    const generated = generateCustomProgram({
      name: customName.trim() || undefined,
      availableEquipment: selectedEquipment,
      goal,
      level,
      daysPerWeek,
      durationMinutes,
    });

    onSaveNewProgram(generated);
    onSelectActiveProgram(generated.id);
    setJustGeneratedMsg(true);
    setExpandedProgramId(generated.id);
    setActiveTab('catalog');
    setTimeout(() => setJustGeneratedMsg(false), 5000);
  };

  return (
    <div className="space-y-5">
      {/* View Header */}
      <div>
        <span className="text-[11px] font-semibold text-orange-400 uppercase tracking-wider">
          Personnalisation Hors-Ligne
        </span>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Programmes & Routines
        </h1>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-900 border border-slate-800">
        <button
          onClick={() => setActiveTab('generator')}
          className={`py-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'generator'
              ? 'bg-orange-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>Générateur Sur-Mesure</span>
        </button>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`py-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'catalog'
              ? 'bg-orange-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Mes Programmes ({programs.length})</span>
        </button>
      </div>

      {justGeneratedMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Programme personnalisé généré et activé avec succès !</span>
        </div>
      )}

      {/* TAB 1: GENERATOR */}
      {activeTab === 'generator' && (
        <div className="space-y-5">
          {/* Quick Equipment Presets */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">
              1. Sélectionnez votre matériel disponible
            </label>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => applyPreset('home_none')}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-left text-slate-300 hover:text-white active:scale-98 transition-all"
              >
                🏠 Sans matériel (Maison)
              </button>
              <button
                type="button"
                onClick={() => applyPreset('home_dumbbells')}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-left text-slate-300 hover:text-white active:scale-98 transition-all"
              >
                🏋️ Haltères + Sol
              </button>
              <button
                type="button"
                onClick={() => applyPreset('calisthenics')}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-left text-slate-300 hover:text-white active:scale-98 transition-all"
              >
                🤸 Barre de traction
              </button>
              <button
                type="button"
                onClick={() => applyPreset('full_gym')}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-left text-slate-300 hover:text-white active:scale-98 transition-all"
              >
                ⚡ Matériel complet
              </button>
            </div>

            {/* Equipment Grid Checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {(Object.keys(EQUIPMENT_LABELS) as EquipmentType[]).map((key) => {
                const info = EQUIPMENT_LABELS[key];
                const isSelected = selectedEquipment.includes(key);
                const isBodyweight = key === 'bodyweight';

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleEquipment(key)}
                    className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-orange-500/10 border-orange-500/50 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-orange-600 text-white' : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-medium truncate">{info.label}</span>
                    </div>
                    {isBodyweight && (
                      <span className="text-[10px] text-slate-500 italic shrink-0">Inclus</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Goal Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">
              2. Votre Objectif Principal
            </label>
            <div className="grid grid-cols-1 gap-2 text-xs">
              {[
                { id: 'endurance_tone', title: 'Tonification & Remise en Forme', desc: 'Sculpter le corps, brûler des calories et dynamiser la posture.' },
                { id: 'muscle_gain', title: 'Prise de Masse & Volume Musculaire', desc: 'Développer les pectoraux, le dos, les épaules et les jambes.' },
                { id: 'fat_loss', title: 'Perte de Gras & Définition (HIIT)', desc: 'Intervalles dynamiques pour affiner la silhouette.' },
                { id: 'calisthenics', title: 'Calisthénie & Force au Poids du Corps', desc: 'Contrôle parfait du corps, tractions, pompes et gainage.' },
                { id: 'strength', title: 'Force Athlétique & Puissance', desc: 'Charges progressives et efforts maximaux.' },
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoal(g.id as FitnessGoal)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    goal === g.id
                      ? 'bg-orange-500/15 border-orange-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-semibold text-xs text-white">{g.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{g.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Frequency & Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Séances / semaine
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                {[2, 3, 4].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDaysPerWeek(d)}
                    className={`py-1.5 font-bold rounded-lg ${
                      daysPerWeek === d
                        ? 'bg-orange-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {d}j
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Durée séance
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                {[20, 30, 45].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setDurationMinutes(m)}
                    className={`py-1.5 font-bold rounded-lg ${
                      durationMinutes === m
                        ? 'bg-orange-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Optional Program Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Nom du programme (optionnel)
            </label>
            <input
              type="text"
              placeholder="Ex: Mon Programme Maison Haltères"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            className="w-full h-13 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-950/50 active:scale-98 transition-all"
          >
            <Wand2 className="w-4 h-4" />
            <span>Générer mon programme sur-mesure</span>
          </button>
        </div>
      )}

      {/* TAB 2: CATALOG / MY PROGRAMS */}
      {activeTab === 'catalog' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-400">
            Choisissez votre programme actif ou lancez directement une séance :
          </div>

          <div className="space-y-3.5">
            {programs.map((prog) => {
              const isActive = prog.id === activeProgramId;
              const isExpanded = prog.id === expandedProgramId;

              return (
                <div
                  key={prog.id}
                  className={`rounded-3xl border transition-all ${
                    isActive
                      ? 'bg-slate-900/90 border-orange-500/60 shadow-lg shadow-orange-950/30'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        {isActive && (
                          <span className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-wider">
                            ★ Actif en ce moment
                          </span>
                        )}
                        <h3 className="text-base font-bold text-white mt-0.5">
                          {prog.name}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {prog.description}
                        </p>
                      </div>

                      {prog.isCustom && (
                        <button
                          onClick={() => onDeleteProgram(prog.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
                          title="Supprimer ce programme"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Metadata line */}
                    <div className="flex items-center gap-3 text-xs text-slate-400 pt-2 font-mono">
                      <span>{prog.daysPerWeek} séances/sem</span>
                      <span>·</span>
                      <span>{prog.routines.length} routine(s)</span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 pt-2">
                      {!isActive ? (
                        <button
                          onClick={() => onSelectActiveProgram(prog.id)}
                          className="flex-1 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
                        >
                          Activer ce programme
                        </button>
                      ) : (
                        <div className="flex-1 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Programme principal</span>
                        </div>
                      )}

                      <button
                        onClick={() =>
                          setExpandedProgramId(isExpanded ? null : prog.id)
                        }
                        className="px-3 h-9 rounded-xl border border-slate-800 text-xs text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-1"
                      >
                        <span>Détails</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Routines Detail */}
                  {isExpanded && (
                    <div className="p-4 pt-0 border-t border-slate-800/80 mt-1 space-y-3">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pt-2">
                        Séances du programme :
                      </div>

                      <div className="space-y-2">
                        {prog.routines.map((routine, rIdx) => (
                          <div
                            key={routine.id}
                            className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-2"
                          >
                            <div className="min-w-0">
                              <span className="text-[10px] text-orange-400 font-mono">
                                Séance {rIdx + 1}
                              </span>
                              <div className="text-xs font-bold text-white truncate">
                                {routine.name}
                              </div>
                              <div className="text-[11px] text-slate-400">
                                {routine.exercises.length} exercices · ~{routine.estimatedMinutes} min
                              </div>
                            </div>

                            <button
                              onClick={() => onStartRoutine(routine)}
                              className="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-xs text-white shrink-0 active:scale-95 transition-all"
                            >
                              Lancer
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
