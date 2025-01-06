import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoIosArrowDown } from "react-icons/io";

const DateRangePicker2: React.FC<{ setselectedTimeRange: (range: string) => void, setIsCalendarOpen: (open: boolean) => void }> = ({ setselectedTimeRange, setIsCalendarOpen }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(8); // September (0-indexed)
  const [currentYear, setCurrentYear] = useState<number>(2024);
  const [selectedTimeRange, setSelectedTimeRange] = useState("12-derniers-mois");

  const timeRanges = [
    { value: "dernier-mois", label: "Dernier mois" },
    { value: "3-derniers-mois", label: "3 derniers mois" },
    { value: "6-derniers-mois", label: "6 derniers mois" },
    { value: "12-derniers-mois", label: "12 derniers mois" },
  ];

  const monthNames: string[] = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
  ];

  const getDaysInMonth = (month: number, year: number): number[] => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const leadingDays = (firstDay + 6) % 7;
    return Array.from({ length: leadingDays + totalDays }, (_, i) => {
      const day = i - leadingDays + 1;
      return day > 0 ? day : 0;
    });
  };

  const calendarDays: number[] = getDaysInMonth(currentMonth, currentYear);

  const handleDateSelect = (day: number, type: "start" | "end"): void => {
    if (day === 0) return;
    const selectedDate = new Date(currentYear, currentMonth, day);

    if (type === "start") {
      setStartDate(selectedDate);
    } else {
      setEndDate(selectedDate);
    }
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short" };
    return date.toLocaleDateString("fr-FR", options).replace(/\./g, "");
  };

  const handleApply = (): void => {
    if (startDate && endDate) {
      const isSameYear = startDate.getFullYear() === endDate.getFullYear();
      const startFormatted = `${formatDate(startDate)}`;
      const endFormatted = `${formatDate(endDate)} ${isSameYear ? ` ${endDate.getFullYear()}` : ""}`;
      setSelectedTimeRange(`${startFormatted} au ${endFormatted}`);
    }

    // Trigger the setselectedTimeRange function when an option is selected
    if (selectedTimeRange) {
      setselectedTimeRange(selectedTimeRange); // Set the selected time range in the parent component
    }

    setIsCalendarOpen(false);
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
    <div className="relative w-[19rem] max-w-sm h-[2.2rem]">
      <div className="absolute left-0 top-full mt-2 bg-white rounded-lg shadow-lg border z-50">
        <div className="p-4">
          {/* Time Range Options */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setSelectedTimeRange(range.value)} // Set the time range in local state
                className={`px-3 py-1.5 text-[12px] font-normal rounded-md transition-colors
                  ${selectedTimeRange === range.value 
                    ? 'bg-[#0C66E6] text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {range.label}
              </button>
            ))}
          </div>

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

          <div className="grid grid-cols-7 gap-0 mb-2">
            {["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"].map((day) => (
              <div key={day} className="text-center text-sm text-gray-500 py-1">
                {day}
              </div>
            ))}
            {calendarDays.map((day, index) => {
              const isSelected =
                day > 0 && (startDate?.getDate() === day || endDate?.getDate() === day);

              const isInRange =
                day > 0 &&
                startDate &&
                endDate &&
                new Date(currentYear, currentMonth, day) >= startDate &&
                new Date(currentYear, currentMonth, day) <= endDate;

              return (
                <button
                  key={index}
                  className={`p-2 text-center rounded ${
                    isSelected
                      ? "bg-[#0C66E6] text-white"
                      : isInRange
                      ? "bg-[#F3FBFF]"
                      : ""
                  }`}
                  onClick={() =>
                    handleDateSelect(day, !startDate ? "start" : "end")
                  }
                >
                  {day > 0 ? day : ""}
                </button>
              );
            })}
          </div>

          <div className="flex gap-2 justify-end border-t pt-4">
            <Button
              variant="outline"
              style={{ fontSize: "0.75rem", fontWeight: "500" }}
              onClick={() => setIsCalendarOpen(false)}
            >
              Annuler
            </Button>
            <Button
              onClick={handleApply}
              style={{
                backgroundColor: "#0C66E6",
                fontSize: "0.75rem",
                fontWeight: "500",
              }}
            >
              Appliquer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker2;
