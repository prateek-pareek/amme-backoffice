import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
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
import Calendar from "../Presentation/Calendar";
import { IoIosArrowDown } from "react-icons/io";
import Invoices from "./Invoice";
import ShareModal from "./shareModal";

// Define data structure
type Factures = {
  factureNo: string;
  employe: string;
  mois: string;
  factureType: string;
  status: string;
};

const factures: Factures[] = [
  {
    factureNo: "#001",
    employe: "Aymerdine Henry",
    mois: "24 Sep 2024",
    factureType: "Abonnement",
    status: "Refusé",
  },
  {
    factureNo: "#001",
    employe: "Noëlle Gautier",
    mois: "24 Sep 2024",
    factureType: "Abonnement",
    status: "Remboursé",
  },
  {
    factureNo: "#001",
    employe: "Yselline Masson",
    mois: "24 Sep 2024",
    factureType: "Abonnement",
    status: "Remboursé",
  },
  {
    factureNo: "#001",
    employe: "Angiran Lopez",
    mois: "24 Sep 2024",
    factureType: "Remboursé",
    status: "En attente",
  },
  {
    factureNo: "#001",
    employe: "Trajan Gerard",
    mois: "24 Sep 2024",
    factureType: "Abonnement",
    status: "Remboursé",
  },
  {
    factureNo: "#001",
    employe: "Cyprien Lemoine",
    mois: "24 Sep 2024",
    factureType: "Abonnement",
    status: "En attente",
  },
  {
    factureNo: "#001",
    employe: "Trajan Simon",
    mois: "24 Sep 2024",
    factureType: "Abonnement",
    status: "Refusé",
  },
];

export default function Factures() {
  const [selectedRow, setSelectedRow] = useState<Factures | null>(null);
  const[state, setState] = useState(0);
  

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // state for anchor element
  const [menuOpen, setMenuOpen] = useState(false);


  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // set the element as anchor
    setMenuOpen(true); // open the menu
  };

  const handleCloseMenu = () => {
    setAnchorEl(null); // close the menu
    setMenuOpen(false);
  };

  const handleOpenModal = (row: Factures) => {
    setSelectedRow(row);
    setState(1);
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
    setState(0);
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#F6F7F9", minHeight: "100vh" }}>
      {/* <SideBar /> */}
      <Box sx={{ flex: 1 }}>
        <NavBar />
        <Box
          sx={{
            p: 2,
            backgroundColor: "white",
            flex: 1,
            height: "calc(100vh - 80px)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb:2 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 0, mt: 1 }}>
              Factures
              </Typography>
              <Typography variant="body2" sx={{ color: "#818EA0", mb: 3 }}>
              Veuillez retrouver ici l’ensemble des comptes administrateurs
              </Typography>
            </Box>
            
          </Box>

          <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
            {/* Search Bar */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "25%",
                height: "40px",
                border: "1px solid #E2E8F0",
                borderRadius: '6px',
                p: 2,
              }}
            >
              <Search sx={{ color: "text.secondary" }} />
              <InputBase
                sx={{ ml: 1, flex: 1, p:'12px 12px' }}
                placeholder="Rechercher un employé "
              />
            </Box>

            {/* Calendar */}
            <Box
              sx={{
                width: "25%",
                height: "40px",
              }}
            >
              <Calendar />
            </Box>

            <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
                alignItems: "center", cursor: "pointer",
                width: "15%",
                height: "40px",
                border: "1px solid #E2E8F0",
                borderRadius: 2,
                p: 2,
                fontSize:'14px', fontWeight:'400',
            }}
            onClick={handleOpenMenu} 
          >
            Type de facture
            <IoIosArrowDown />
            </Box>
          </Box>

          {/* Action Menu of type da facture dropdown*/}
          <Menu
            id="action-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleCloseMenu}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.08))",
                  mt: 1,
                  minWidth: 180,
                  borderRadius: "16px", // Add border radius here
                  "& .MuiMenuItem-root": {
                    px: 2,
                    // py: 1,
                    // borderRadius: "2px",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  },
                },
              },
            }}
          >
            <MenuItem  sx={{ gap: 1, cursor:'pointer' }}>
              Interventions
            </MenuItem>
            <MenuItem  sx={{  gap: 1, cursor:'pointer' }}>
              Abonnement
            </MenuItem>
          </Menu>

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
                      N° facture <PiSortAscendingLight size={18} />
                    </Box>
                  </TableCell>

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
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Mois <PiSortAscendingLight size={18} />
                    </Box>
                  </TableCell>

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
                      Type de facture  
                    </Box>
                  </TableCell>

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
                      Statut 
                    </Box>
                  </TableCell>

                  <TableCell width={100}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {factures.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{row.factureNo}</TableCell>
                    <TableCell>{row.employe}</TableCell>
                    <TableCell>{row.mois}</TableCell>
                    <TableCell>{row.factureType}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "inline-block",
                          px: "20px",
                          py: "4px",
                          fontSize: "14px",
                          fontWeight: "500",
                          borderRadius: 1,
                          bgcolor:
                            row.status === "Refusé"
                              ? "#FCD9D9"
                              : row.status === "Remboursé"
                              ? "#C6F1DA"
                              : row.status === "En attente"
                              ? "#D7E4FF"
                              : "#F0F0F0", // Default color if status is unknown or invalid
                          color:
                            row.status === "Refusé"
                              ? "#C53434"
                              : row.status === "Remboursé"
                              ? "#0BAD38"
                              : row.status === "En attente"
                              ? "#0C66E6"
                              : "#333", // Default color if status is unknown or invalid
                        }}
                      >
                        {row.status}
                      </Box>
                    </TableCell>
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

      {/*render the modal */}
      {state===1 && 
      (<Invoices setState={setState} row={selectedRow} onClose={handleCloseModal}/>)}

      {state===2 && 
      (<ShareModal setState={setState} row={selectedRow} onClose={handleCloseModal}/>)}
    </Box>
  );
}
