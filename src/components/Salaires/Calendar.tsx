import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoIosArrowDown } from "react-icons/io";

const MonthPicker: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [currentYear, setCurrentYear] = useState<number>(2024);
  const [tempSelectedMonth, setTempSelectedMonth] = useState<string>("");

  const monthNames: string[] = [
    "Jan",
    "Fév",
    "Mar",
    "Avr",
    "Mai",
    "Jun",
    "Jul",
    "Aoû",
    "Sep",
    "Oct",
    "Nov",
    "Déc",
  ];

  const handleMonthSelect = (monthIndex: number): void => {
    setTempSelectedMonth(`${monthNames[monthIndex]} ${currentYear}`);
  };

  const goToPreviousYear = (): void => {
    setCurrentYear((prev) => prev - 1);
  };

  const goToNextYear = (): void => {
    setCurrentYear((prev) => prev + 1);
  };

  const applySelection = (): void => {
    setSelectedMonth(`Ce mois-ci - ${tempSelectedMonth}`);
    setOpen(false);
  };

  return (
    <div className="relative w-[19rem] max-w-sm h-[2.2rem]">
      {/* Trigger Button */}
      <div
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-gray-50 text-[0.875rem] font-medium ${
          selectedMonth ? "text-[#151515]" : "text-[#818EA0]"
        }`}
        style={{ height: "40px", width: "300px" }}
      >
        <Calendar className="h-4 w-4 text-[#151515]" />
        <Input
          value={selectedMonth || "Veuillez sélectionner un mois"}
          readOnly
          className={`border-0 focus-visible:ring-0 p-0 ${
            selectedMonth ? "text-[#151515]" : "text-[#818EA0]"
          }`}
        />
        <IoIosArrowDown
          size="1.25rem"
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </div>

      {/* Popup Content */}
      {open && (
        <div className="absolute left-0 top-full mt-2 bg-white rounded-lg shadow-lg border z-50 w-[19rem] h-[18rem]">
          <div className="p-4">
            {/* Header with Year Navigation */}
            <div className="flex justify-between items-center mb-4">
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={goToPreviousYear}
              >
                &lt;
              </button>
              <span className="font-medium">{currentYear}</span>
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={goToNextYear}
              >
                &gt;
              </button>
            </div>

            {/* Month Grid */}
            <div className="flex justify-between">
              <div className="grid grid-cols-3 gap-2 mb-2 w-full max-w-[calc(100%-2rem)]">
                {monthNames.map((month, index) => (
                  <button
                    key={month}
                    className={`p-2 text-center text-sm rounded-md font-medium transition-colors ${
                      tempSelectedMonth === `${month} ${currentYear}`
                        ? "bg-[#0C66E6] text-white"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleMonthSelect(index)}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                style={{ fontSize: "0.75rem", fontWeight: "500" }}
                onClick={() => setOpen(false)}
              >
                Annuler
              </Button>
              <Button
                style={{ backgroundColor: "#0C66E6", fontSize: "0.75rem", fontWeight: "500" }}
                onClick={applySelection}
              >
                Appliquer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthPicker;
