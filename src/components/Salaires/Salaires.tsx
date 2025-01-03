import React, { useState } from "react";
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
import Calendar from "../Presentation/Calendar";
import EditPaySlip from "./EditPayslip1";
import EditPaySlip2 from "./EditPaySlip2";
import EditPaySlip3 from "./EditPaySlip3";
import EditPaySlip4 from "./EditPaySlip4";
import EditPaySlip5 from "./EditPaySlip5";
import EditPaySlip6 from "./EditPaySlip6";
import EditPaySlip7 from "./EditPaySlip7";
import EditPaySlip8 from "./EditPaySlip8";
import EditPaySlip9 from "./EditPaySlip9";
import EditPaySlip10 from "./EditPaySlip10";
import EditPaySlip11 from "./EditPaySlip11";

// Define data structure
type Salaires = {
  employe: string;
  mois: string;
};

const salaires: Salaires[] = [
  {
    employe: "Aymerdine Henry",
    mois: "15:30 min",
  },
  {
    employe: "Noëlle Gautier",
    mois: "20:45 min",
  },
  {
    employe: "Yselline Masson",
    mois: "08:00 min",
  },
  {
    employe: "Angiran Lopez",
    mois: "11:15 min",
  },
  {
    employe: "Trajan Gerard",
    mois: "07:50 min",
  },
  {
    employe: "Cyprien Lemoine",
    mois: "10:10 min",
  },
  {
    employe: "Trajan Simon",
    mois: "17:30 min",
  },
];

export default function Salaires() {
  const [selectedRow, setSelectedRow] = useState<Salaires | null>(null);

  const [state, setState] = useState(0)

  const handleOpenModal= (row: Salaires) => {
    setSelectedRow(row);
    setState(1); 
  }
  

  const handleCloseModal = () => {
    setSelectedRow(null);
    setState(0);
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#F6F7F9", minHeight: "100vh" }}>
      
      <Box sx={{ flex: 1 }}>
        <NavBar />
        <Box 
        sx={{ 
          position:'relative',
         p: 3,
         backgroundColor: "white",
         flex: 1,
         height: "calc(100vh - 80px)", }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 , mt:-1}}>
              Gestion des salaires
            </Typography>
            <Typography variant="body2" sx={{ color: "#818EA0", mb: 3 }}>
              Veuillez retrouver ici l’ensemble des comptes administrateurs
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{ height: 40, fontSize:'14px',textTransform: 'none'  }}
            // onClick={() => setHandleOpenModal(true)}
          >
            Éditer une fiche de paie
          </Button>
          </Box>

          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            {/* Search Bar */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "284px",
                height: "40px",
                border: "1px solid #E2E8F0",
                borderRadius: 2,
                p: 2,
              }}
            >
              <Search sx={{ color: "text.secondary" }} />
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Rechercher un employé ..."
              />
            </Box>

            {/* Calendar */}
            <Box
              sx={{
                width: "284px",
                height: "30px",
              }}
            >
              <Calendar />
            </Box>
          </Box>

          <TableContainer component={Paper} elevation={0}>
            <Table size="medium">
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
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Mois <PiSortAscendingLight size={18} />
                    </Box>
                  </TableCell>
                  <TableCell width={100}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {salaires.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{row.employe}</TableCell>
                    <TableCell>{row.mois}</TableCell>
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

          {/* Modal for EditPaySlip */}
          {state===1 && (
            <EditPaySlip setState={setState}  row={selectedRow} onClose={handleCloseModal} />
          )}

          {/* Modal for Second Component */}
          {state===2 && 
          (<EditPaySlip2 setState={setState} row={selectedRow} onClose={() => setState(0)} />)}

          {/* Modal for Third Component */}
          {state===3 && 
          (<EditPaySlip3 setState={setState} row={selectedRow} onClose={() => setState(0)} />)}

          {/* Modal for Fourth Component */}
          {state===4 && 
          (<EditPaySlip4 setState={setState} row={selectedRow} onClose={() => setState(0)} />)}

          {/* Modal for Fifth Component */}
          {state===4 && 
          (<EditPaySlip4 setState={setState} row={selectedRow} onClose={() => setState(0)} />)}

          {state===5 && 
          (<EditPaySlip5 setState={setState} row={selectedRow} onClose={() => setState(0)} />)}

          {state===6 && 
          (<EditPaySlip6 setState={setState} row={selectedRow} onClose={() => setState(0)} />)}

          {state===7 && 
          (<EditPaySlip7 setState={setState} row={selectedRow} onClose={() => setState(0)} />)}

          {state===8 && 
          (<EditPaySlip8 setState={setState} row={selectedRow} onClose={() => setState(0)} />)}

          {state===9 && 
          (<EditPaySlip9 setState={setState} row={selectedRow} onClose={() => setState(0)} />)}

          {state===10 && 
          (<EditPaySlip10 setState={setState} row={selectedRow} onClose={() => setState(0)} />)} 

{state===11 && 
          (<EditPaySlip11 setState={setState} row={selectedRow} onClose={() => setState(0)} />)} 



          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt:'auto',
              p: 2,
              borderTop:'1px solid #E9EEF6'
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

     

    </Box>
  );
}
