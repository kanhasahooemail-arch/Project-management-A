import React, { useState, useEffect } from 'react';
import { HabitItem } from '../types';
import { sound } from '../utils/audio';
import { 
  Activity, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Plus, 
  Play, 
  Pause, 
  RotateCcw, 
  Sun, 
  Droplets, 
  Zap, 
  BrainCircuit, 
  ShieldCheck,
  Check
} from 'lucide-react';

interface Props {
  habits: HabitItem[];
  onUpdateHabits: (habits: HabitItem[]) => void;
  isHighContrast: boolean;
}

export const DayToDayProductivity: React.FC<Props> = ({
  habits,
  onUpdateHabits,
  isHighContrast,
}) => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'vitality' | 'focus' | 'mobility' | 'civic'>('focus');
  const [newTarget, setNewTarget] = useState<string>('45 min focus');
  const [newMax, setNewMax] = useState<number>(45);
  const [newUnit, setNewUnit] = useState<string>('min');

  // Deep Spatial Focus Timer State
  const [focusSecondsRemaining, setFocusSecondsRemaining] = useState<number>(25 * 60);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && focusSecondsRemaining > 0) {
      interval = setInterval(() => {
        setFocusSecondsRemaining(prev => prev - 1);
      }, 1000);
    } else if (focusSecondsRemaining === 0 && timerRunning) {
      setTimerRunning(false);
      sound.playLockSuccess();
    }
    return () => clearInterval(interval);
  }, [timerRunning, focusSecondsRemaining]);

  const toggleTimer = () => {
    sound.playHologramTap();
    setTimerRunning(!timerRunning);
  };

  const resetTimer = () => {
    sound.playChirp(440, 0.05);
    setTimerRunning(false);
    setFocusSecondsRemaining(25 * 60);
  };

  const handleToggleHabit = (id: string) => {
    sound.playLockSuccess();
    const updated = habits.map(h => {
      if (h.id === id) {
        const nextCompleted = !h.completed;
        return {
          ...h,
          completed: nextCompleted,
          current: nextCompleted ? h.max : Math.max(0, h.current - 1),
          streakDays: nextCompleted ? h.streakDays + 1 : Math.max(0, h.streakDays - 1),
        };
      }
      return h;
    });
    onUpdateHabits(updated);
  };

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    sound.playHologramTap();
    const newHabit: HabitItem = {
      id: `h-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      target: newTarget,
      current: 0,
      max: Number(newMax) || 1,
      unit: newUnit,
      completed: false,
      streakDays: 1,
    };

    onUpdateHabits([newHabit, ...habits]);
    setShowAddModal(false);
    setNewTitle('');
  };

  const completedCount = habits.filter(h => h.completed).length;
  const overallScore = Math.round((completedCount / (habits.length || 1)) * 100);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'vitality':
        return <Sun className="w-4 h-4 text-emerald-400" />;
      case 'focus':
        return <BrainCircuit className="w-4 h-4 text-cyan-400" />;
      case 'mobility':
        return <Zap className="w-4 h-4 text-amber-400" />;
      case 'civic':
        return <ShieldCheck className="w-4 h-4 text-purple-400" />;
      default:
        return <Activity className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Productivity Overview Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white tracking-wide">
                Day-to-Day Life, Activity, Habit & Productivity Engine
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Synchronized circadian rhythm, deep focus blocks, and mobility metrics available offline and continuously synced.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 block">DAILY ATTAINMENT</span>
              <span className="text-xl font-bold font-mono text-cyan-400">{overallScore}%</span>
            </div>
            <button
              onClick={() => {
                setShowAddModal(true);
                sound.playHologramTap();
              }}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,240,255,0.25)]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Routine Habit</span>
            </button>
          </div>
        </div>

        {/* Quick Progress Bar */}
        <div className="mt-4 pt-4 border-t border-slate-800/80">
          <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 flex">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-purple-500 transition-all duration-500"
              style={{ width: `${overallScore}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2">
            <span>{completedCount} of {habits.length} daily habits completed</span>
            <span>All entries stored locally in encrypted offline cache</span>
          </div>
        </div>
      </div>

      {/* Grid: Focus Timer + Habit Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Deep Spatial Focus Timer */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-purple-400" />
                Deep Spatial Focus Chamber
              </h3>
              <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                ALPHA WAVE 10 HZ
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              High-cognition work block with synthesized binaural acoustic guidance.
            </p>

            {/* Glowing Digital Clock */}
            <div className="my-8 text-center">
              <div className="inline-block p-6 rounded-3xl bg-slate-950 border border-cyan-500/30 shadow-[0_0_30px_rgba(0,240,255,0.15)]">
                <span className="text-5xl font-mono font-bold text-white tracking-widest">
                  {formatTimer(focusSecondsRemaining)}
                </span>
                <span className="block text-[10px] font-mono text-cyan-400 mt-2">
                  {timerRunning ? 'FOCUS INTERVAL IN PROGRESS' : 'READY TO ENGAGE'}
                </span>
              </div>
            </div>
          </div>

          {/* Timer Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTimer}
              className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all ${
                timerRunning
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
              }`}
            >
              {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{timerRunning ? 'Pause Flow Block' : 'Start Spatial Focus'}</span>
            </button>

            <button
              onClick={resetTimer}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors border border-slate-700"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Habit Matrix List */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>ACTIVE DAILY ROUTINES</span>
            <span>SORT: BY SPATIAL PRIORITY</span>
          </div>

          <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
            {habits.map(habit => (
              <div
                key={habit.id}
                onClick={() => handleToggleHabit(habit.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  habit.completed
                    ? 'bg-slate-950/60 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                      habit.completed
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-500 border border-slate-700'
                    }`}
                  >
                    {habit.completed ? <Check className="w-4 h-4" /> : getCategoryIcon(habit.category)}
                  </div>

                  <div>
                    <h4
                      className={`text-sm font-semibold transition-colors ${
                        habit.completed ? 'text-slate-300 line-through' : 'text-white'
                      }`}
                    >
                      {habit.title}
                    </h4>
                    <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>Target: {habit.target}</span>
                      <span>·</span>
                      <span className="capitalize">{habit.category}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <div className="flex items-center gap-1 text-xs font-mono text-amber-400">
                    <Flame className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{habit.streakDays}d</span>
                  </div>

                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                      habit.completed
                        ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    {habit.completed ? 'DONE' : `${habit.current}/${habit.max} ${habit.unit}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal: Add New Habit Routine */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-cyan-400" />
              Add Daily Routine Habit
            </h3>

            <form onSubmit={handleAddHabit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Habit Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Cold Shower Reset or Night Reading"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Category Sphere</label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="vitality">Vitality & Health</option>
                  <option value="focus">Neural Flow Focus</option>
                  <option value="mobility">Clean Mobility & Automobile</option>
                  <option value="civic">Civic Duty & Security</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Target Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 30 min session or 2000 ml"
                  value={newTarget}
                  onChange={e => setNewTarget(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Max Value</label>
                  <input
                    type="number"
                    value={newMax}
                    onChange={e => setNewMax(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Unit</label>
                  <input
                    type="text"
                    value={newUnit}
                    onChange={e => setNewUnit(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                >
                  Save Habit Routine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
