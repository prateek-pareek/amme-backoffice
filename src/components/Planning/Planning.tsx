import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
  SelectChangeEvent,
  Typography,
  Button,
} from "@mui/material";
import { Search, ChevronLeft, ChevronRight } from "@mui/icons-material";
import NavBar from "../NavBar";
import SideBar from "../SideBar";
import ScheduleModal from "./Schedule";

// Types
interface Appointment {
  time: string;
  status: "confirmed" | "pending";
  patientName: string;
}

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevWeek: () => void;
  onNextWeek: () => void;
}

interface TimeSlotProps {
  time: string;
  appointments?: Appointment[];
}

interface PlanningProps {
  initialDate?: Date;
}

// Helper functions for date calculations
const getMonday = (date: Date): Date => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
  return new Date(date.setDate(diff));
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
  });
};

const generateWeekDates = (startDate: Date): Date[] => {
  const dates: Date[] = [];
  const monday = getMonday(new Date(startDate));

  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    dates.push(date);
  }

  return dates;
};

const CalendarHeader = ({
  currentDate,
  onPrevWeek,
  onNextWeek,
}: CalendarHeaderProps) => {
  const weekDates = generateWeekDates(currentDate);
  const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2, mt: 4 }}>
      <IconButton onClick={onPrevWeek}>
        <ChevronLeft />
      </IconButton>
      <IconButton onClick={onNextWeek}>
        <ChevronRight />
      </IconButton>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
          px: 2,
        }}
      >
        {weekDates.map((date, index) => (
          <Box
            key={index}
            sx={{
              flex: 1,
              textAlign: "center",
              p: 1,
              bgcolor:
                date.toDateString() === new Date().toDateString()
                  ? "rgba(0, 0, 0, 0.04)"
                  : "transparent",
              borderRadius: 1,
            }}
          >
            <div>{days[index]}</div>
            <div>{formatDate(date)}</div>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const TimeSlot = ({ time, appointments = [] }: TimeSlotProps) => (
  <Box
    sx={{ display: "flex", borderBottom: "1px solid #eee", minHeight: "60px" }}
  >
    <Box sx={{ width: "80px", p: 1, borderRight: "1px solid #eee" }}>
      {time}
    </Box>
    <Box sx={{ display: "flex", flex: 1 }}>
      {[0, 1, 2, 3, 4, 5, 6].map((day) => (
        <Box
          key={day}
          sx={{
            flex: 1,
            p: 1,
            borderRight: "1px solid #eee",
            position: "relative",
          }}
        >
          {appointments.map((apt, index) => (
            <Box
              key={index}
              sx={{
                position: "absolute",
                backgroundColor:
                  apt.status === "confirmed" ? "#E8F5E9" : "#FFEBEE",
                p: 1,
                borderRadius: "4px",
                width: "90%",
                fontSize: "12px",
              }}
            >
              <div>{apt.patientName}</div>
              <div>{apt.time}</div>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  </Box>
);

const Planning = ({ initialDate = new Date() }: PlanningProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const nurses: string[] = [
    "Aphélie Sanchez",
    "Auguste Lacroix",
    "Eugène Morel",
    "Suzanne Carpentier",
    "Timothée Caron",
  ];

  const filteredNurses = nurses.filter((nurse) =>
    nurse.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const timeSlots = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

  const handleNurseChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const sampleAppointments: Record<string, Appointment[]> = {
    "06:00": [
      {
        time: "06:50 - 07:10",
        status: "confirmed",
        patientName: "Céline Bernard",
      },
    ],
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#F6F7F9", minHeight: "100vh" }}>
      <SideBar />
      <Box sx={{ flex: 1 }}>
        <NavBar />
        <Box
          sx={{
            p: "20px",
            backgroundColor: "white",
            flex: 1,
            height: "calc(100vh - 60px)",
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontSize: "24px", fontWeight: "600" }}
              >
                Nombre de prestations
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Veuillez retrouver ici l'ensemble des comptes administrateurs
              </Typography>
            </Box>
            <div>
              {/* Normal Button */}
              <Button
                variant="contained"
                onClick={() => setIsScheduleModalOpen(true)}
                sx={{
                  backgroundColor: "#0C66E6",
                  color: "white",
                  padding: "8px 16px",
                  fontSize: "14px",
                  fontWeight: "500",
                  borderRadius: "4px",
                  textTransform: "none",
                }}
              >
                Modifier les horaires
              </Button>
<ScheduleModal 
  isOpen={isScheduleModalOpen} 
  onClose={() => setIsScheduleModalOpen(false)}
/>
            </div>
          </Box>

          {!selectedValue ? (
            <Box>
              <Box
                sx={{
                  marginTop: "200px",
                  marginX: "auto",
                  display: "flex",
                  height: "40px",
                  width: "436px",
                  color: "#818EA0",
                }}
              >
                Veuillez sélectionner une infirmière parmi la liste ci-dessous.
              </Box>
              <FormControl
                sx={{
                  marginX: "auto",
                  display: "flex",
                  height: "40px",
                  width: "327px",
                  borderRadius: "6px",
                }}
              >
                {!selectedValue && (
                  <InputLabel
                    sx={{ fontSize: "14px", fontWeight: 500, color: "#151515" }}
                  >
                    Sélectionner une infirmière parmi la liste
                  </InputLabel>
                )}
                <Select
                  value={selectedValue}
                  onChange={handleNurseChange}
                  displayEmpty
                  sx={{
                    width: "100%",
                    "& .MuiMenuItem-root": {
                      fontSize: "14px",
                      fontWeight: "500",
                    },
                  }}
                >
                  <MenuItem disableRipple>
                    <TextField
                      placeholder="Rechercher"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        fontSize: "14px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "4px",
                        },
                      }}
                    />
                  </MenuItem>
                  {filteredNurses.map((nurse, index) => (
                    <MenuItem key={index} value={nurse}>
                      {nurse}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ) : (
            <Box>
              <FormControl
                sx={{
                  height: "30px",
                  width: "200px",
                  borderRadius: "6px",
                }}
              >
                <Select
                  value={selectedValue}
                  onChange={handleNurseChange}
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {nurses.map((nurse, index) => (
                    <MenuItem key={index} value={nurse}>
                      {nurse}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <CalendarHeader
                currentDate={currentDate}
                onPrevWeek={handlePrevWeek}
                onNextWeek={handleNextWeek}
              />

              <Box sx={{ overflowY: "auto", maxHeight: "calc(100vh - 250px)" }}>
                {timeSlots.slice(6, 10).map((time) => (
                  <TimeSlot
                    key={time}
                    time={time}
                    appointments={sampleAppointments[time] || []}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Planning;
