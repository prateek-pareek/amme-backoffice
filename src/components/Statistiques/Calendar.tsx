import React, { useState, ChangeEvent } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TimeState {
  hours: string;
  minutes: string;
}

interface DateTimeRange {
  date: Date | null;
  time: TimeState;
}

const DateRangePicker: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDateRange, setSelectedDateRange] = useState<string>("");
  const [startDateTime, setStartDateTime] = useState<DateTimeRange>({
    date: null,
    time: { hours: "00", minutes: "00" },
  });
  const [endDateTime, setEndDateTime] = useState<DateTimeRange>({
    date: null,
    time: { hours: "06", minutes: "00" },
  });

  const [currentMonth, setCurrentMonth] = useState<number>(8); // September (0-indexed)
  const [currentYear, setCurrentYear] = useState<number>(2024);

  const monthNames: string[] = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const getDaysInMonth = (month: number, year: number): number[] => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const leadingDays = (firstDay + 6) % 7; // Adjust for week starting on Monday
    return Array.from({ length: leadingDays + totalDays }, (_, i) => {
      const day = i - leadingDays + 1;
      return day > 0 ? day : 0;
    });
  };

  const calendarDays: number[] = getDaysInMonth(currentMonth, currentYear);

  const handleTimeChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof TimeState,
    type: "start" | "end"
  ): void => {
    const value = e.target.value;
    const maxValue = field === "hours" ? 23 : 59;

    if (/^\d*$/.test(value) && parseInt(value) <= maxValue) {
      const updatedTime = { [field]: value.padStart(2, "0") };
      if (type === "start") {
        setStartDateTime((prev) => ({
          ...prev,
          time: { ...prev.time, ...updatedTime },
        }));
      } else {
        setEndDateTime((prev) => ({
          ...prev,
          time: { ...prev.time, ...updatedTime },
        }));
      }
    }
  };

  const handleDateSelect = (day: number, type: "start" | "end"): void => {
    if (day === 0) return; // Ignore padding days
    const selectedDate = new Date(currentYear, currentMonth, day);

    if (type === "start") {
      setStartDateTime((prev) => ({ ...prev, date: selectedDate }));
    } else {
      setEndDateTime((prev) => ({ ...prev, date: selectedDate }));
    }
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short" };
    return date.toLocaleDateString("fr-FR", options).replace(/\./g, "");
  };

  const handleApply = (): void => {
    if (startDateTime.date && endDateTime.date) {
      const isSameYear =
        startDateTime.date.getFullYear() === endDateTime.date.getFullYear();

      const startFormatted = `${formatDate(startDateTime.date)}`;
      const endFormatted = `${formatDate(endDateTime.date)} ${
        isSameYear ? ` ${endDateTime.date.getFullYear()}` : ""
      } - ${endDateTime.time.hours}:${endDateTime.time.minutes}`;

      setSelectedDateRange(`${startFormatted} au ${endFormatted}`);
    }
    setOpen(false);
  };

  const goToPreviousMonth = (): void => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const goToNextMonth = (): void => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  return (
    <div className="relative w-full max-w-sm h-[40px]">
      {/* Trigger Button */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-gray-50"
        style={{height:'40px', width:'300px'}}
      >
        <Calendar className="h-4 w-4 text-[#151515]" />

        <Input
          value={selectedDateRange || "Veuillez sélectionner une date"}
          readOnly
          className="border-0 focus-visible:ring-0 p-0 text-[#818EA0]"
        />
      </div>

      {/* Popup Content */}
      {open && (
        <div className="absolute left-0 top-full mt-2 bg-white rounded-lg shadow-lg border z-50">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={goToPreviousMonth}
              >
                &lt;
              </button>
              <span className="font-medium">
                {monthNames[currentMonth]} {currentYear}
              </span>
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={goToNextMonth}
              >
                &gt;
              </button>
            </div>

            {/* Calendar */}
            <div className="grid grid-cols-7 gap-1 mb-4">
  {["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"].map((day) => (
    <div key={day} className="text-center text-sm text-gray-500 py-1">
      {day}
    </div>
  ))}
  {calendarDays.map((day, index) => (
    <button
      key={index}
      className={`p-2 text-center rounded hover:bg-blue-100 ${
        day > 0 &&
        (startDateTime.date?.getDate() === day ||
          endDateTime.date?.getDate() === day)
          ? "bg-[#0C66E6] text-white"
          : ""
      }`}
      onClick={() =>
        handleDateSelect(day, !startDateTime.date ? "start" : "end")
      }
    >
      {day > 0 ? day : ""}
    </button>
  ))}
</div>


            {/* <div className="flex items-center justify-between mb-4">
              <span style={{fontSize:'14px', fontWeight:'500', color:'#151515'}}>Heure</span>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={endDateTime.time.hours}
                  onChange={(e) => handleTimeChange(e, "hours", "end")}
                  className="w-16"
                />
                <span>:</span>
                <Input
                  type="number"
                  value={endDateTime.time.minutes}
                  onChange={(e) => handleTimeChange(e, "minutes", "end")}
                  className="w-16"
                />
              </div>
            </div> */}

            {/* Buttons */}
            <div className="flex gap-2 justify-end">
              <Button variant="outline"
              style={{fontSize:'12px', fontWeight:'500'}}
               onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleApply} style={{backgroundColor:'#0C66E6', fontSize:'12px', fontWeight:'500'}}>Appliquer</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
