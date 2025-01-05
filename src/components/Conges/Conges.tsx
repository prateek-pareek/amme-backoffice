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
        Gestion des congés
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "#818EA0", fontSize: "0.875rem", fontWeight: "400", mb: "1.5rem" }}
      >
        Veuillez retrouver ici l’ensemble des comptes administrateurs
      </Typography>

      <Grid container spacing={5} sx={{ mb: "0.5rem" }}>
        {[
          { label: "Total requête", value: 4 },
          { label: "En attente", value: 1 },
          { label: "Approuvé", value: 2 },
          { label: "Rejeté", value: 1 },
        ].map((item, index) => (
          <Grid item xs={3} key={index}>
            <Box
              sx={{
                p: "1rem",
                bgcolor: "white",
                border: "1px solid #E2E8F0",
                borderRadius: "0.25rem",
                height: "8.125rem",
                display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between', 
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "#818EA0", fontWeight: 500 }}
              >
                {item.label}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, mt: "0.625rem" }}>
                {item.value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Typography
        sx={{ fontSize: "1.125rem", fontWeight: "600", mb: "0.5rem", mt: "2rem" }}
      >
        Demandes
      </Typography>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ boxShadow: "none" }}
      >
        <Table size="small">
  <TableHead sx={{ bgcolor: "#F6F7F9" }}>
    <TableRow>
      {[
        "Nom de l’employé",
        "Date de début",
        "Date de fin",
        "Statut",
        "", // Spacer column
        "Action",
      ].map((header, index) => (
        <TableCell
          key={index}
          sx={{
            width: `${[20, 17, 17, 17, 9, 20][index]}%`, // Adjust widths to include spacer
            color: header ? "#818EA0" : "transparent", // Hide spacer column header
            fontSize: "0.875rem",
            fontWeight: "500",
            borderBottom: "none",
          }}
        >
          {header && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
              }}
            >
              {header}
              {index < 3 && <PiSortAscendingLight size={18} />}
            </Box>
          )}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
  <TableBody sx={{ py: "0.25rem" }}>
    {congesData.map((row, index) => (
      <TableRow key={index} hover>
        {[
          row.employe,
          row.dateDebut,
          row.dateFin,
          row.status,
          "", // Spacer column content
          row.status === "En attente" ? (
            <Box sx={{ display: "flex", gap: "0.625rem" }}>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderColor: "#0C66E6",
                  color: "#0C66E6",
                  textTransform: "none",
                }}
                startIcon={<Close sx={{ fontSize: "1rem" }} />}
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
                startIcon={<Check sx={{ fontSize: "1rem" }} />}
                onClick={() => handleApproveClick(row)}
              >
                Approuver
              </Button>
            </Box>
          ) : (
            <Typography
              sx={{
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#818EA0",
              }}
            >
              Pas d'actions disponible
            </Typography>
          ),
        ].map((content, colIndex) => (
          <TableCell
            key={colIndex}
            sx={{
              width: `${[20, 17, 17, 17, 5, 24][colIndex]}%`, // Adjust widths
              fontSize: "0.875rem",
              fontWeight: "500",
              p: "1.125rem",
              borderBottom: "1px solid #F6F7F9",
            }}
          >
            {content}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
</Table>

      </TableContainer>
    </Box>
  </Box>

  {isModalOpen && selectedEmployee && (
    <Modal open={true}>
      <PriceModal
        row={selectedEmployee}
        onClose={handleCloseModal}
        onApprove={handleApprove}
      />
    </Modal>
  )}
</Box>

  );
}
