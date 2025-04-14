import React, { useState, useEffect } from "react";
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
import axios from "axios";

// Define data structure to match API response
type Conges = {
  _id: string;
  userId: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
};

// Map API status to French UI status
const mapStatus = (status: string): string => {
  switch (status) {
    case "pending":
      return "En attente";
    case "approved":
      return "Approuvé";
    case "rejected":
      return "Rejeté";
    default:
      return status;
  }
};

// Format date from various formats to readable French format
const formatDate = (dateString: string): string => {
  try {
    // Handle different date formats from API
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);
    }

    // If it's already in DD/MM/YYYY format, just return it
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
      const [day, month, year] = dateString.split("/");
      return `${day} ${getMonthName(parseInt(month))} ${year}`;
    }

    return dateString;
  } catch (error) {
    return dateString;
  }
};

// Helper function to get month name
const getMonthName = (month: number): string => {
  const months = [
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
  return months[month - 1] || "";
};

export default function Conges() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Conges | null>(null);
  const [congesData, setCongesData] = useState<Conges[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch leave request data from API
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

  // Calculate stats for cards
  const totalRequests = congesData.length;
  const pendingRequests = congesData.filter(
    (r) => r.status === "pending"
  ).length;
  const approvedRequests = congesData.filter(
    (r) => r.status === "approved"
  ).length;
  const rejectedRequests = congesData.filter(
    (r) => r.status === "rejected"
  ).length;

  const handleApproveClick = (employee: Conges) => {
    setSelectedEmployee(employee);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleApprove = async () => {
    if (selectedEmployee) {
      try {
        // Call API to update status to approved
        const data = JSON.stringify({
          status: "approved",
        });

        const config = {
          method: "patch",
          url: `https://amme-api-pied.vercel.app/api/backOffice/leave/${selectedEmployee._id}`,
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };

        const response = await axios.request(config);
        console.log("Leave request approved:", response.data);

        // Update local state to reflect the change
        setCongesData((prevData) =>
          prevData.map((item) =>
            item._id === selectedEmployee._id
              ? { ...item, status: "approved" }
              : item
          )
        );
      } catch (error) {
        console.error("Error approving leave request:", error);
      }
      handleCloseModal();
    }
  };

  const handleReject = async (employee: Conges) => {
    try {
      // Call API to update status to rejected
      const data = JSON.stringify({
        status: "rejected",
      });

      const config = {
        method: "patch",
        url: `https://amme-api-pied.vercel.app/api/backOffice/leave/${employee._id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log("Leave request rejected:", response.data);

      // Update local state to reflect the change
      setCongesData((prevData) =>
        prevData.map((item) =>
          item._id === employee._id ? { ...item, status: "rejected" } : item
        )
      );
    } catch (error) {
      console.error("Error rejecting leave request:", error);
    }
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
            sx={{
              color: "#818EA0",
              fontSize: "0.875rem",
              fontWeight: "400",
              mb: "1.5rem",
            }}
          >
            Veuillez retrouver ici l'ensemble des demandes de congés
          </Typography>

          <Grid container spacing={5} sx={{ mb: "0.5rem" }}>
            {[
              { label: "Total requête", value: totalRequests },
              { label: "En attente", value: pendingRequests },
              { label: "Approuvé", value: approvedRequests },
              { label: "Rejeté", value: rejectedRequests },
            ].map((item, index) => (
              <Grid item xs={3} key={index}>
                <Box
                  sx={{
                    p: "1rem",
                    bgcolor: "white",
                    border: "1px solid #E2E8F0",
                    borderRadius: "0.25rem",
                    height: "8.125rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "#818EA0", fontWeight: 500 }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 600, mt: "0.625rem" }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Typography
            sx={{
              fontSize: "1.125rem",
              fontWeight: "600",
              mb: "0.5rem",
              mt: "2rem",
            }}
          >
            Demandes
          </Typography>
          {loading ? (
            <Typography>Chargement des données...</Typography>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{ boxShadow: "none" }}
            >
              <Table size="small">
                <TableHead sx={{ bgcolor: "#F6F7F9" }}>
                  <TableRow>
                    {[
                      "Nom de l'employé",
                      "Date de début",
                      "Date de fin",
                      "Raison",
                      "Statut",
                      "", // Spacer column
                      "Action",
                    ].map((header, index) => (
                      <TableCell
                        key={index}
                        sx={{
                          width: `${[18, 17, 17, 13, 10, 5, 20][index]}%`,
                          color: header ? "#818EA0" : "transparent",
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
                  {congesData.map((row, index) => {
                    const status = mapStatus(row.status);
                    return (
                      <TableRow key={row._id} hover>
                        {[
                          row.userId,
                          formatDate(row.startDate),
                          formatDate(row.endDate),
                          row.reason,
                          status,
                          "", // Spacer column content
                          status === "En attente" ? (
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
                                onClick={() => handleReject(row)}
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
                              width: `${
                                [18, 17, 17, 13, 10, 5, 20][colIndex]
                              }%`,
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
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>

      {isModalOpen && selectedEmployee && (
        <Modal open={true}>
          <PriceModal
            row={{
              employe: selectedEmployee.userId,
              dateDebut: formatDate(selectedEmployee.startDate),
              dateFin: formatDate(selectedEmployee.endDate),
              status: mapStatus(selectedEmployee.status),
            }}
            onClose={handleCloseModal}
            onApprove={handleApprove}
          />
        </Modal>
      )}
    </Box>
  );
}
