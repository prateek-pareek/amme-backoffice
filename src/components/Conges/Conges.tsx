import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Modal,
} from "@mui/material";
import { PiSortAscendingLight } from "react-icons/pi";
import SideBar from "../SideBar";
import NavBar from "../NavBar";
import { Check, Close } from "@mui/icons-material";
import PriceModal from "./PriceModal"; // Import the modal component

// Define data structure
type Conges = {
  employe: string;
  dateDebut: string;
  dateFin: string;
  status: string;
};

const congesData: Conges[] = [
  {
    employe: "Blanchard Mathurin",
    dateDebut: "14 Décembre 2024",
    dateFin: "1 Janvier 2025",
    status: "En attente",
  },
  {
    employe: "Blanchard Mathurin",
    dateDebut: "14 Décembre 2024",
    dateFin: "1 Janvier 2025",
    status: "Approuvé",
  },
  {
    employe: "Blanchard Mathurin",
    dateDebut: "14 Décembre 2024",
    dateFin: "1 Janvier 2025",
    status: "Rejeté",
  },
  {
    employe: "Blanchard Mathurin",
    dateDebut: "14 Décembre 2024",
    dateFin: "1 Janvier 2025",
    status: "Approuvé",
  },
];

export default function Conges() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Conges | null>(null);

  const handleApproveClick = (employee: Conges) => {
    setSelectedEmployee(employee);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleApprove = () => {
    if (selectedEmployee) {
      // Update the status to 'Approuvé' or perform any other logic here
      console.log(`Approving leave for ${selectedEmployee.employe}`);
    }
    handleCloseModal(); // Close the modal after approval
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#F6F7F9", minHeight: "100vh" }}>
      <SideBar  />
      <Box sx={{ flex: 1 }}>
        <NavBar />
        <Box
          sx={{
            p: 4,
            backgroundColor: "white",
            flex: 1,
            height: "calc(100vh - 80px)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, mt: -1 }}>
                Gestion des congés
              </Typography>
              <Typography variant="body2" sx={{ color: "#818EA0", mb: 3 }}>
                Veuillez retrouver ici l’ensemble des comptes administrateurs
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={3}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "white",
                  border: "1px solid #E2E8F0",
                  borderRadius: 1,
                  height: "142px",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#818EA0", fontWeight: 500 }}
                >
                  Total requête
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, mt: 1 }}>
                  4
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "white",
                  border: "1px solid #E2E8F0",
                  borderRadius: 1,
                  height: "142px",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#818EA0", fontWeight: 500 }}
                >
                  En attente
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, mt: 1 }}>
                  1
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "white",
                  border: "1px solid #E2E8F0",
                  borderRadius: 1,
                  height: "142px",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#818EA0", fontWeight: 500 }}
                >
                  Approuvé
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, mt: 1 }}>
                  2
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "white",
                  border: "1px solid #E2E8F0",
                  borderRadius: 1,
                  height: "142px",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#818EA0", fontWeight: 500 }}
                >
                  Rejeté
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, mt: 1 }}>
                  1
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Typography
            sx={{ fontSize: "18px", fontWeight: "600", mb: 2, mt: 4 }}
          >
            Demandes
          </Typography>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead sx={{ bgcolor: "#F6F7F9" }}>
                <TableRow>
                  <TableCell>Nom de l’employé</TableCell>
                  <TableCell>Date de début</TableCell>
                  <TableCell>Date de fin</TableCell>
                  <TableCell>Statut</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {congesData.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{row.employe}</TableCell>
                    <TableCell>{row.dateDebut}</TableCell>
                    <TableCell>{row.dateFin}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                      {row.status === "En attente" ? (
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{
                              borderColor: "#0C66E6",
                              color: "#0C66E6",
                              textTransform: "none",
                            }}
                            startIcon={<Close sx={{ fontSize: "16px" }} />}
                          >
                            Rejeter
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              bgcolor: "#0C66E6",
                              textTransform: "none",
                            }}
                            startIcon={<Check sx={{ fontSize: "16px" }} />}
                            onClick={() => handleApproveClick(row)}
                          >
                            Approuver
                          </Button>
                        </Box>
                      ) : (
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#818EA0",
                          }}
                        >
                          Pas d'actions disponible
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Modal */}
      {isModalOpen && selectedEmployee && (
        <Modal
          open={true}
          BackdropProps={{
            style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          }}
        >
          <PriceModal
            row={selectedEmployee} // Pass the selected employee data
            onClose={handleCloseModal}
            onApprove={handleApprove} // Pass approve handler
          />
        </Modal>
      )}
    </Box>
  );
}
