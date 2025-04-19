import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ChevronLeft, ChevronRight, Search } from "@mui/icons-material";
import SideBar from "../SideBar";
import NavBar from "../NavBar";
import { PiSortAscendingLight } from "react-icons/pi";
import Benifits from "./Benifits";
import Calendar from "./Calendar";
import axios from "axios";
import { data } from "react-router-dom";

// Define data structure
type Prestation = {
  _id: string;
  userId: string;
  status: string;
  prescriptionUrl?: string;
  slots: any[];
  employe: string; // Keep for UI compatibility or derive from other fields
  patient?: string; // Use userId or another field for display
  date?: string; // Could be derived from slots if filled
  heure?: string; // Could be derived from slots if filled
};

export default function Presentation() {
  const [selectedRow, setSelectedRow] = useState<Prestation | null>(null);
  const [isBenifitsModalOpen, setIsBenifitsModalOpen] = useState(false);
  const [prestations, setPrestations] = useState<Prestation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [congesData, setCongesData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleOpenModal = (row: Prestation) => {
    setSelectedRow(row);
    setIsBenifitsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
    setIsBenifitsModalOpen(false);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "https://amme-api-pied.vercel.app/api/backOffice/appointments"
        );
        console.log(JSON.stringify(response.data));
        if (response.data) {
          const fetchedPrestations = response.data.map((appointment: any) => ({
            _id: appointment._id,
            userId: appointment.userId,
            status: appointment.status,
            prescriptionUrl: appointment.prescriptionUrl,
            slots: appointment.slots,
            employe: appointment.preferredNurseName || "No employee assigned",
            patient: appointment.patientName || appointment.userId,
            date: appointment.date || "No date specified",
            heure: appointment.timeSlot || "No time specified",
            timeSlots: appointment.timeSlots || [],
            preferredNurse: appointment.preferredNurse || "No preferred nurse",
          }));
          setPrestations(fetchedPrestations);
        }
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const token = localStorage.getItem("token") || "";
  console.log("tolen", token);
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://amme-api-pied.vercel.app/api/backOffice/appointments",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    data: data,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://amme-api-pied.vercel.app/api/backOffice/leave-requests"
        );
        if (response.data && response.data.data) {
          setCongesData(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching leave requests:", err);
        setError("Impossible de charger les données de congés");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPrestations = prestations.filter((prestation) => {
    const matchesSearchQuery =
      prestation.employe.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prestation.patient?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDate =
      !selectedDate ||
      (prestation.date &&
        new Date(prestation.date).toDateString() ===
          selectedDate.toDateString());

    return matchesSearchQuery && matchesDate;
  });

  return (
    <Box sx={{ display: "flex", bgcolor: "#F6F7F9", minHeight: "100vh" }}>
      <Box sx={{ flex: 1 }}>
        <NavBar />
        <Box
          sx={{
            position: "relative",
            px: "1.5rem",
            py: "1rem",
            backgroundColor: "white",
            height: "calc(100vh - 4.375rem)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontSize: "1.5rem", fontWeight: "600", mb: "0.5rem" }}
          >
            Prestations
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#818EA0",
              fontSize: "0.875rem",
              fontWeight: "400",
              mb: "2rem",
            }}
          >
            Veuillez retrouver ici l'ensemble des comptes administrateurs
          </Typography>

          <Box sx={{ display: "flex", gap: "1rem", mb: "1rem" }}>
            {/* Search Bar */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "20.8rem",
                height: "2.5rem",
                border: "1px solid #E2E8F0",
                borderRadius: "0.375rem",
                padding: "0.75rem",
              }}
            >
              <Search sx={{ color: "#818EA0" }} />
              <InputBase
                sx={{ ml: 1, flex: 1, fontSize: "0.875rem", fontWeight: "500" }}
                placeholder="Rechercher un infirmier, un patient ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Box>

            {/* Calendar */}
            <Box
              sx={{
                width: "20.8rem",
                height: "2.5rem",
              }}
            >
              <Calendar
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
              />
            </Box>
          </Box>

          {/* table section */}
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ boxShadow: "none" }}
          >
            <Table size="small">
              <TableHead sx={{ bgcolor: "#F6F7F9" }}>
                <TableRow>
                  <TableCell
                    sx={{
                      width: "15%",
                      color: "#818EA0",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      borderBottom: "none",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      Employé <PiSortAscendingLight size={18} />
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "15%",
                      color: "#818EA0",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      borderBottom: "none",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      Patient <PiSortAscendingLight size={18} />
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "20%",
                      color: "#818EA0",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      borderBottom: "none",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      Date d'intervention <PiSortAscendingLight size={18} />
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "20%",
                      color: "#818EA0",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      borderBottom: "none",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      Heure d'intervention <PiSortAscendingLight size={18} />
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "30%",
                      bgcolor: "transparent",
                      borderBottom: "none",
                    }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ py: "4px" }}>
                {filteredPrestations.map((row, index) => (
                  <TableRow key={row._id || index} hover>
                    <TableCell
                      sx={{
                        width: "15%",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        p: "1.2rem",
                        borderBottom: "1px solid #F6F7F9",
                      }}
                    >
                      {row.employe || "No employee assigned"}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "15%",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        p: "1.2rem",
                        borderBottom: "1px solid #F6F7F9",
                      }}
                    >
                      {row.patient || row.userId}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "20%",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        p: "1.2rem",
                        borderBottom: "1px solid #F6F7F9",
                      }}
                    >
                      {row.date || "No date specified"}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "20%",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        p: "1.2rem",
                        borderBottom: "1px solid #F6F7F9",
                      }}
                    >
                      {row.heure || "No time specified"}
                    </TableCell>
                    <TableCell
                      sx={{
                        position: "relative",
                        width: "30%",
                        borderBottom: "1px solid #F6F7F9",
                        p: "1.2rem",
                      }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          position: "absolute",
                          right: "1.25rem",
                          top: "50%",
                          transform: "translateY(-50%)",
                          textTransform: "none",
                          bgcolor: "#0C66E6",
                          "&:hover": { bgcolor: "#0052CC" },
                        }}
                        onClick={() => handleOpenModal(row)}
                      >
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "auto", // Pushes the box to the bottom
              py: "1rem", // Add vertical padding //20px
              px: "1.25rem", // Add horizontal padding //20px
              borderTop: "1px solid #E9EEF6",
            }}
          >
            <Typography variant="body2" sx={{ color: "#818EA0" }}>
              1-10 sur 240
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                height: "1rem",
                width: "6.75rem",
                alignItems: "center",
              }}
            >
              <IconButton size="small">
                <ChevronLeft
                  sx={{ border: "1px solid #E2E8F0", borderRadius: "0.25rem" }}
                />
              </IconButton>
              <Typography>1/27</Typography>
              <IconButton size="small">
                <ChevronRight
                  sx={{ border: "1px solid #E2E8F0", borderRadius: "0.25rem" }}
                />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Render the modal */}
      {selectedRow && (
        <Benifits
          row={{
            employe: selectedRow.employe || "",
            patient: selectedRow.patient || "",
            date: selectedRow.date || "",
            heure: selectedRow.heure || "",
          }}
          onClose={handleCloseModal}
        />
      )}
    </Box>
  );
}
