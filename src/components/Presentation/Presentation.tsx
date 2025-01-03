import * as React from "react"
import {  useState } from "react";
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

// Define data structure
type Prestation = {
  employe: string;
  patient: string;
  date: string;
  heure: string;
};

const prestations: Prestation[] = [
  {
    employe: "Aymerdine Henry",
    patient: "Augustine Paris",
    date: "30/06/2024",
    heure: "15:30 min",
  },
  {
    employe: "Noëlle Gautier",
    patient: "Ursule Andre",
    date: "20/05/2024",
    heure: "20:45 min",
  },
  {
    employe: "Yselline Masson",
    patient: "Jacinthe Caron",
    date: "17/11/2024",
    heure: "08:00 min",
  },
  {
    employe: "Angiran Lopez",
    patient: "Maxime Blanchard",
    date: "13/04/2024",
    heure: "11:15 min",
  },
  {
    employe: "Trajan Gerard",
    patient: "Maxime Blanchard",
    date: "30/08/2024",
    heure: "07:50 min",
  },
  {
    employe: "Cyprien Lemoine",
    patient: "Maxime Blanchard",
    date: "09/03/2024",
    heure: "10:10 min",
  },
  {
    employe: "Trajan Simon",
    patient: "Maxime Blanchard",
    date: "10/10/2024",
    heure: "17:30 min",
  },
];

export default function Presentation() {
  const [selectedRow, setSelectedRow] = useState<Prestation | null>(null);
  const [isBenifitsModalOpen, setIsBenifitsModalOpen] = useState(false);

  const handleOpenModal = (row: Prestation) => {
    setSelectedRow(row);
    setIsBenifitsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
    setIsBenifitsModalOpen(false);
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#F6F7F9", minHeight: "100vh" }}>
     
      <Box sx={{ flex: 1 }}>
        <NavBar />
        <Box sx={{ p: 4, backgroundColor: "white", flex: 1 ,height: "calc(100vh - 80px)", }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            Prestations
          </Typography>
          <Typography variant="body2" sx={{ color: "#818EA0", mb: 4 }}>
            Veuillez retrouver ici l'ensemble des comptes administrateurs
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            {/* Search Bar */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "333px",
                height: "40px",
                border: "1px solid #E2E8F0",
                borderRadius: 2,
                p: 2,
              }}
            >
              <Search sx={{ color: "text.secondary" }} />
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Rechercher un infirmier, un patient ..."
              />
            </Box>

            {/* Calendar */}
            <Box
              sx={{
                width: "333px",
                height: "30px",
              }}
            >
              <Calendar />
            </Box>
          </Box>

          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead sx={{ bgcolor: "#F6F7F9" }}>
                <TableRow>
                  <TableCell sx={{ width: "15%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "#818EA0",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Employé <PiSortAscendingLight size={18} />
                    </Box>
                  </TableCell>
                  <TableCell sx={{ width: "15%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "#818EA0",
                      }}
                    >
                      Patient <PiSortAscendingLight size={18} />
                    </Box>
                  </TableCell>
                  <TableCell sx={{ width: "15%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "#818EA0",
                      }}
                    >
                      Date d'intervention <PiSortAscendingLight size={18} />
                    </Box>
                  </TableCell>
                  <TableCell sx={{ width: "15%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "#818EA0",
                      }}
                    >
                      Heure d'intervention <PiSortAscendingLight size={18} />
                    </Box>
                  </TableCell>
                  <TableCell width={100}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prestations.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{row.employe}</TableCell>
                    <TableCell>{row.patient}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.heure}</TableCell>
                    <TableCell
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          textTransform: "none",
                          bgcolor: "#0066FF",
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
              px: 2,
              mt: 2,
            }}
          >
            <Typography variant="body2" sx={{ color: "#818EA0" }}>
              1-10 sur 240
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton size="small">
                <ChevronLeft />
              </IconButton>
              <Typography>1/27</Typography>
              <IconButton size="small">
                <ChevronRight />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Render the modal */}
      {selectedRow && <Benifits row={selectedRow} onClose={handleCloseModal} />}
    </Box>
  );
}
