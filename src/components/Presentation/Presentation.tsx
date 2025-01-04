import * as React from "react";
import { useState } from "react";
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
  // {
  //   employe: "Trajan Gerard",
  //   patient: "Maxime Blanchard",
  //   date: "30/08/2024",
  //   heure: "07:50 min",
  // },
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
        <Box
          sx={{
            position:'relative',
            px: 3, py:2,
            backgroundColor: "white",
            height: "calc(100vh - 70px)",
            display:'flex',
            flexDirection:'column'
          }}
        >
          <Typography variant="h5" sx={{ fontSize:'24px', fontWeight: '600', mb:'8px'}}>
            Prestations
          </Typography>
          <Typography variant="body2" sx={{ color: "#818EA0" , fontSize:'14px', fontWeight:'400', mb:5}}>
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
                borderRadius: '6px',
                padding:'11px 12px'
              }}
            >
              <Search sx={{ color: "#818EA0" }} />
              <InputBase
                sx={{ ml: 1, flex: 1 , fontSize:'14px', fontWeight:'500',}}
                placeholder="Rechercher un infirmier, un patient ..."
              />
            </Box>

            {/* Calendar */}
            <Box
              sx={{
                width: "333px",
                height: "40px",
              }}
            >
              <Calendar />
            </Box>
          </Box>

            {/* table section */}
          <TableContainer component={Paper} elevation={0}
          sx={{ boxShadow: "none" }}>
            <Table size="small">
              <TableHead sx={{ bgcolor: "#F6F7F9" }}>
                <TableRow>
                  <TableCell sx={{ width: "15%", color: "#818EA0", fontSize: "14px" ,fontWeight:'500', borderBottom: "none", }}>
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
                  <TableCell sx={{ width: "15%",color: "#818EA0", fontSize: "14px" ,fontWeight:'500',borderBottom: "none", }}>
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
                  <TableCell sx={{ width: "20%",color: "#818EA0", fontSize: "14px" ,fontWeight:'500',borderBottom: "none", }}>
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
                  <TableCell sx={{ width: "20%",color: "#818EA0", fontSize: "14px" ,fontWeight:'500',borderBottom: "none", }}>
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
                  <TableCell  sx={{ width: "30%", bgcolor: "transparent",borderBottom: "none", }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{py:'4px'}}>
                {prestations.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ width: "15%%", fontSize: "14px",fontWeight:'500',  p: "20px",borderBottom:'1px solid #F6F7F9'  }}>{row.employe}</TableCell>
                    <TableCell sx={{ width: "15%%", fontSize: "14px",fontWeight:'500',  p: "20px",borderBottom:'1px solid #F6F7F9'  }}>{row.patient}</TableCell>
                    <TableCell sx={{ width: "20%%", fontSize: "14px",fontWeight:'500',  p: "20px",borderBottom:'1px solid #F6F7F9'  }}>{row.date}</TableCell>
                    <TableCell sx={{ width: "20%%", fontSize: "14px",fontWeight:'500',  p: "20px",borderBottom:'1px solid #F6F7F9'  }}>{row.heure}</TableCell>
                    <TableCell
  sx={{
    position: "relative", // Ensure the button can be positioned absolutely
    width: "30%",
    borderBottom: "1px solid #F6F7F9",
    p: "20px",
  }}
>
  <Button
    variant="contained"
    size="small"
    sx={{
      position: "absolute", // Absolutely position the button
      right: "20px", // Adjust spacing from the right
      top: "50%", // Position the button at 50% height of the parent
      transform: "translateY(-50%)", // Center the button vertically
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
              py:1,
              borderTop:'1px solid #E9EEF6',
              mt: 'auto',
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
