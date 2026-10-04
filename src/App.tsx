/**
 * FitForge - Guide Musculation & Fitness 100% Hors-Ligne
 */

import React, { useState, useEffect } from 'react';
import { TrainingProgram, WorkoutRoutine, UserPreferences, WorkoutHistoryEntry } from './types/fitness';
import {
  loadUserPreferences,
  saveUserPreferences,
  loadPrograms,
  savePrograms,
  getActiveProgramId,
  setActiveProgramId,
  loadWorkoutHistory,
  saveWorkoutHistoryEntry
} from './utils/storage';
import { Navbar, TabType } from './components/Navbar';
import { OfflineIndicator } from './components/OfflineIndicator';
import { WorkoutPlayer } from './components/WorkoutPlayer';
import { WorkoutsView } from './views/WorkoutsView';
import { ProgramsView } from './views/ProgramsView';
import { ExercisesView } from './views/ExercisesView';
import { HistoryView } from './views/HistoryView';
import { EquipmentProfileView } from './views/EquipmentProfileView';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('workouts');
  const [preferences, setPreferences] = useState<UserPreferences>(() => loadUserPreferences());
  const [programs, setPrograms] = useState<TrainingProgram[]>(() => loadPrograms());
  const [activeProgId, setActiveProgId] = useState<string>(() => getActiveProgramId());
  const [history, setHistory] = useState<WorkoutHistoryEntry[]>(() => loadWorkoutHistory());

  // Active workout session modal
  const [activeWorkoutRoutine, setActiveWorkoutRoutine] = useState<WorkoutRoutine | null>(null);

  // Sync active program object
  const activeProgram =
    programs.find((p) => p.id === activeProgId) || programs[0] || null;

  // Handlers
  const handleUpdatePreferences = (newPrefs: UserPreferences) => {
    setPreferences(newPrefs);
    saveUserPreferences(newPrefs);
  };

  const handleSelectActiveProgram = (programId: string) => {
    setActiveProgId(programId);
    setActiveProgramId(programId);
  };

  const handleSaveNewProgram = (newProgram: TrainingProgram) => {
    const updated = [newProgram, ...programs.filter((p) => p.id !== newProgram.id)];
    setPrograms(updated);
    savePrograms(updated);
  };

  const handleDeleteProgram = (programId: string) => {
    const updated = programs.filter((p) => p.id !== programId);
    setPrograms(updated);
    savePrograms(updated);
    if (activeProgId === programId && updated.length > 0) {
      handleSelectActiveProgram(updated[0].id);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('fitforge_history_v1');
    } catch {}
  };

  const handleFinishWorkout = (entry: WorkoutHistoryEntry) => {
    setHistory((prev) => [entry, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
      {/* Offline Status Pill */}
      <OfflineIndicator />

      {/* Main Container - Mobile Centered Frame */}
      <main className="flex-1 max-w-md w-full mx-auto px-4 pt-3 pb-24">
        {activeTab === 'workouts' && activeProgram && (
          <WorkoutsView
            activeProgram={activeProgram}
            preferences={preferences}
            history={history}
            onStartRoutine={(routine) => setActiveWorkoutRoutine(routine)}
            onNavigateToPrograms={() => setActiveTab('programs')}
            onNavigateToEquipment={() => setActiveTab('equipment')}
          />
        )}

        {activeTab === 'programs' && (
          <ProgramsView
            programs={programs}
            activeProgramId={activeProgId}
            preferences={preferences}
            onSelectActiveProgram={handleSelectActiveProgram}
            onSaveNewProgram={handleSaveNewProgram}
            onDeleteProgram={handleDeleteProgram}
            onStartRoutine={(routine) => setActiveWorkoutRoutine(routine)}
          />
        )}

        {activeTab === 'exercises' && <ExercisesView />}

        {activeTab === 'history' && (
          <HistoryView
            history={history}
            onClearHistory={handleClearHistory}
          />
        )}

        {activeTab === 'equipment' && (
          <EquipmentProfileView
            preferences={preferences}
            onUpdatePreferences={handleUpdatePreferences}
          />
        )}
      </main>

      {/* Active Workout Player Modal */}
      {activeWorkoutRoutine && (
        <WorkoutPlayer
          routine={activeWorkoutRoutine}
          onClose={() => setActiveWorkoutRoutine(null)}
          onFinish={handleFinishWorkout}
        />
      )}

      {/* Bottom Sticky Tab Navigation */}
      <Navbar activeTab={activeTab} onSelectTab={setActiveTab} />
    </div>
  );
}
