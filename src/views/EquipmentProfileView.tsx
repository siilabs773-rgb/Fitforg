import React from 'react';
import { Check, Dumbbell, Volume2, Smartphone, ShieldCheck, RefreshCw } from 'lucide-react';
import { UserPreferences, EquipmentType, FitnessGoal, FitnessLevel } from '../types/fitness';
import { EQUIPMENT_LABELS } from '../data/exercises';
import { PWAInstallButton } from '../components/PWAInstallButton';

interface EquipmentProfileViewProps {
  preferences: UserPreferences;
  onUpdatePreferences: (newPrefs: UserPreferences) => void;
}

export const EquipmentProfileView: React.FC<EquipmentProfileViewProps> = ({
  preferences,
  onUpdatePreferences
}) => {
  const toggleEquipment = (eq: EquipmentType) => {
    if (eq === 'bodyweight') return; // Bodyweight cannot be removed
    const exists = preferences.availableEquipment.includes(eq);
    const updated = exists
      ? preferences.availableEquipment.filter((x) => x !== eq)
      : [...preferences.availableEquipment, eq];

    onUpdatePreferences({
      ...preferences,
      availableEquipment: updated,
    });
  };

  const handleSelectAllEquipment = () => {
    onUpdatePreferences({
      ...preferences,
      availableEquipment: [
        'bodyweight',
        'dumbbells',
        'barbell',
        'bench',
        'pullup_bar',
        'resistance_bands',
        'kettlebell',
        'mat',
      ],
    });
  };

  const handleResetToBodyweight = () => {
    onUpdatePreferences({
      ...preferences,
      availableEquipment: ['bodyweight'],
    });
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div>
        <span className="text-[11px] font-semibold text-orange-400 uppercase tracking-wider">
          Configuration Personnelle
        </span>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Mon Matériel & Préférences
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Tous vos réglages sont stockés sur votre téléphone et restent accessibles sans connexion Internet.
        </p>
      </div>

      {/* Equipment Checklist Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Dumbbell className="w-4 h-4 text-orange-400" />
            <span>Matériel disponible chez vous</span>
          </h2>
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={handleResetToBodyweight}
              className="text-slate-400 hover:text-white"
            >
              Aucun
            </button>
            <span>·</span>
            <button
              onClick={handleSelectAllEquipment}
              className="text-orange-400 hover:text-orange-300 font-medium"
            >
              Tout cocher
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {(Object.keys(EQUIPMENT_LABELS) as EquipmentType[]).map((key) => {
            const item = EQUIPMENT_LABELS[key];
            const isSelected = preferences.availableEquipment.includes(key);
            const isBodyweight = key === 'bodyweight';

            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleEquipment(key)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-orange-500/10 border-orange-500/50 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-orange-600 text-white' : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{item.label}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                  </div>
                </div>

                {isBodyweight && (
                  <span className="text-[10px] text-slate-500 italic shrink-0">Toujours actif</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fitness Profile Level & Goal */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-white">Niveau de condition physique</h2>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'beginner', label: 'Débutant' },
            { id: 'intermediate', label: 'Intermédiaire' },
            { id: 'advanced', label: 'Avancé' },
          ].map((lvl) => (
            <button
              key={lvl.id}
              onClick={() =>
                onUpdatePreferences({ ...preferences, level: lvl.id as FitnessLevel })
              }
              className={`py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                preferences.level === lvl.id
                  ? 'bg-orange-600 border-orange-500 text-white shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sound & Vibration Settings */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-orange-400" />
          <span>Retours sonores & vibrations (Chronomètre)</span>
        </h2>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-white">Bips du chronomètre</div>
            <div className="text-[11px] text-slate-400">
              Sons synthétisés hors-ligne sans réseau
            </div>
          </div>
          <button
            onClick={() =>
              onUpdatePreferences({ ...preferences, soundEnabled: !preferences.soundEnabled })
            }
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              preferences.soundEnabled ? 'bg-orange-600' : 'bg-slate-800'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                preferences.soundEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <div>
            <div className="text-xs font-semibold text-white">Vibration tactile</div>
            <div className="text-[11px] text-slate-400">
              Vibration à la fin des temps de repos
            </div>
          </div>
          <button
            onClick={() =>
              onUpdatePreferences({ ...preferences, vibrationEnabled: !preferences.vibrationEnabled })
            }
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              preferences.vibrationEnabled ? 'bg-orange-600' : 'bg-slate-800'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                preferences.vibrationEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* PWA / Offline App Info Card */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-3">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <Smartphone className="w-4 h-4 text-orange-400" />
          <span>Application Mobile Hors-Ligne (PWA)</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          FitForge est une Progressive Web App certifiée : tout le contenu, les exercices, les animations et le moteur de calcul sont mis en cache sur votre appareil. Vous pouvez l’utiliser à la salle, en sous-sol ou en voyage sans aucune connexion Internet.
        </p>

        <div className="pt-2">
          <PWAInstallButton />
        </div>
      </div>
    </div>
  );
};
