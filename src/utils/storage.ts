import { UserPreferences, TrainingProgram, WorkoutHistoryEntry } from '../types/fitness';
import { PRESET_PROGRAMS } from '../data/programs';

const STORAGE_KEYS = {
  PREFERENCES: 'fitforge_user_prefs_v1',
  PROGRAMS: 'fitforge_programs_v1',
  ACTIVE_PROGRAM_ID: 'fitforge_active_prog_id_v1',
  HISTORY: 'fitforge_history_v1',
};

const DEFAULT_PREFERENCES: UserPreferences = {
  availableEquipment: ['bodyweight'],
  goal: 'endurance_tone',
  level: 'beginner',
  preferredDaysPerWeek: 3,
  preferredDurationMinutes: 30,
  soundEnabled: true,
  vibrationEnabled: true,
  installedOffline: false
};

export function loadUserPreferences(): UserPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    if (raw) {
      return { ...DEFAULT_PREFERENCES, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error('Error loading preferences from localStorage', e);
  }
  return DEFAULT_PREFERENCES;
}

export function saveUserPreferences(prefs: UserPreferences): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
  } catch (e) {
    console.error('Error saving preferences', e);
  }
}

export function loadPrograms(): TrainingProgram[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRAMS);
    if (raw) {
      const stored = JSON.parse(raw) as TrainingProgram[];
      if (Array.isArray(stored) && stored.length > 0) {
        return stored;
      }
    }
  } catch (e) {
    console.error('Error loading programs', e);
  }
  // Initialize with presets if empty
  savePrograms(PRESET_PROGRAMS);
  return PRESET_PROGRAMS;
}

export function savePrograms(programs: TrainingProgram[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(programs));
  } catch (e) {
    console.error('Error saving programs', e);
  }
}

export function getActiveProgramId(): string {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_PROGRAM_ID);
    if (raw) return raw;
  } catch {}
  return PRESET_PROGRAMS[0].id;
}

export function setActiveProgramId(id: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PROGRAM_ID, id);
  } catch {}
}

export function loadWorkoutHistory(): WorkoutHistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {}
  return [];
}

export function saveWorkoutHistoryEntry(entry: WorkoutHistoryEntry): void {
  try {
    const current = loadWorkoutHistory();
    const updated = [entry, ...current];
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving workout history', e);
  }
}
