import React, { useState } from 'react';
import { X, Trash2 } from 'lucide-react';

// Type definitions remain the same...
type TimeSlot = {
  start: string;
  end: string;
};

type DaySchedule = TimeSlot[];

type WeekSchedule = {
  [key in DayOfWeek]: DaySchedule;
};

type DayOfWeek = 
  | 'Lundi'
  | 'Mardi'
  | 'Mercredi'
  | 'Jeudi'
  | 'Vendredi'
  | 'Samedi'
  | 'Dimanche';

interface TimeSlotEditorProps {
  label: string;
  startTime: string;
  endTime: string;
  onTimeChange: (type: 'start' | 'end', value: string) => void;
  onDelete: () => void;
}

interface DayScheduleProps {
  day: DayOfWeek;
  expanded: boolean;
  onToggle: () => void;
  slots: TimeSlot[];
  onSlotsChange: (newSlots: TimeSlot[]) => void;
}

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (schedule: WeekSchedule) => void;
}

const TimeSlotEditor: React.FC<TimeSlotEditorProps> = ({ 
  label, 
  startTime, 
  endTime, 
  onTimeChange, 
  onDelete 
}) => (
  <div className="flex items-center gap-4 mb-2">
    <span className="w-12 text-sm">{label} :</span>
    <input
      type="time"
      value={startTime}
      onChange={(e) => onTimeChange('start', e.target.value)}
      className="border rounded px-2 py-1 text-sm"
    />
    <span className="text-sm">à</span>
    <input
      type="time"
      value={endTime}
      onChange={(e) => onTimeChange('end', e.target.value)}
      className="border rounded px-2 py-1 text-sm"
    />
    <button onClick={onDelete} className="text-red-500">
      <Trash2 className="w-4 h-4" />
    </button>
  </div>
);

const DaySchedule: React.FC<DayScheduleProps> = ({ 
  day, 
  expanded, 
  onToggle, 
  slots, 
  onSlotsChange 
}) => {
  return (
    <div className="border-b last:border-b-0">
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={slots.length > 0}
              onChange={() => onSlotsChange(slots.length > 0 ? [] : [{ start: '08:00', end: '12:00' }])}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
          <span className="font-medium">{day}</span>
        </div>
        <button
          onClick={onToggle}
          className={`transform transition-transform ${expanded ? 'rotate-180' : ''}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      {expanded && slots.length > 0 && (
        <div className="pb-4">
          {slots.map((slot, index) => (
            <TimeSlotEditor
              key={index}
              label={index === 0 ? 'Matin' : index === 1 ? 'Midi' : 'Soir'}
              startTime={slot.start}
              endTime={slot.end}
              onTimeChange={(type, value) => {
                const newSlots = [...slots];
                newSlots[index] = {
                  ...newSlots[index],
                  [type === 'start' ? 'start' : 'end']: value
                };
                onSlotsChange(newSlots);
              }}
              onDelete={() => {
                const newSlots = slots.filter((_, i) => i !== index);
                onSlotsChange(newSlots);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [expandedDay, setExpandedDay] = useState<DayOfWeek>('Lundi');
  const [schedules, setSchedules] = useState<WeekSchedule>({
    'Lundi': [
      { start: '08:00', end: '12:00' },
      { start: '12:00', end: '14:00' },
      { start: '14:00', end: '20:00' }
    ],
    'Mardi': [
      { start: '08:00', end: '12:00' },
      { start: '12:00', end: '14:00' },
      { start: '14:00', end: '20:00' }
    ],
    'Mercredi': [],
    'Jeudi': [
      { start: '08:00', end: '12:00' },
      { start: '12:00', end: '14:00' },
      { start: '14:00', end: '20:00' }
    ],
    'Vendredi': [
      { start: '08:00', end: '12:00' },
      { start: '12:00', end: '14:00' },
      { start: '14:00', end: '20:00' }
    ],
    'Samedi': [],
    'Dimanche': []
  });

  const handleConfirm = () => {
    onConfirm?.(schedules);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999]">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div
        className="bg-white rounded-lg relative z-[10000]"
        style={{
          width: '667px',
          height: '760px',
          position: 'absolute',
          top: '50%',
          right: '32px',
          transform: 'translateY(-50%)',
          gap: '0px',
          borderRadius: '16px',
          opacity: '1',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 style={{ fontWeight: '600', fontSize: '24px' }}>Modifier les horaires</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 px-6 max-h-[75vh] overflow-y-auto" style={{ fontSize: '14px', fontWeight: '400' }}>
        {(Object.keys(schedules) as DayOfWeek[]).map((day) => (
    <div key={day} className="bg-gray-50 mb-1 p-1 rounded-md shadow-sm border-[#E2E8F0]">
      <DaySchedule
        day={day}
        expanded={expandedDay === day}
        onToggle={() => setExpandedDay(expandedDay === day ? day : day)}
        slots={schedules[day]}
        onSlotsChange={(newSlots) => setSchedules({
          ...schedules,
          [day]: newSlots
        })}
      />
    </div>
  ))}
        </div>

        {/* Button Container */}
        <div className="absolute bottom-4 right-4 p-4">
          <button
            onClick={handleConfirm}
            className="w-[250px] px-[1px] bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Confirmer les modifications
          </button>
        </div>
      </div>
    </div>
  );
};


export default ScheduleModal;