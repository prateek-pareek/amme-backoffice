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
  // {
  //   employe: "Trajan Gerard",
  //   mois: "07:50 min",
  // },
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
          px: "1.5rem",
          py: "1rem",
          backgroundColor: "white",
          height: "calc(100vh - 4.375rem)",
          display: "flex",
          flexDirection: "column", }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", }}>
          <Box>
            <Typography variant="h5" sx={{ fontSize: "1.5rem", fontWeight: "600", mb: "0.5rem" }}>
              Gestion des salaires
            </Typography>
            <Typography variant="body2" sx={{ color: "#818EA0", fontSize: "0.875rem", fontWeight: "400", mb: "2rem" }}>
              Veuillez retrouver ici l’ensemble des comptes administrateurs
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{ height: '2.5rem', fontSize:'0.875rem',fontWeight:'500', textTransform: 'none', backgroundColor:'#0C66E6'  }}
            // onClick={() => setHandleOpenModal(true)}
          >
            Éditer une fiche de paie
          </Button>
          </Box>

          <Box sx={{ display: "flex",  gap: '1rem', mb: '1rem' }}>
            {/* Search Bar */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "20.8rem",
                height: "2.5rem",
                border: "1px solid #E2E8F0",
                borderRadius: '0.375rem',
                padding:'0.75rem'
              }}
            >
              <Search sx={{ color: "#818EA0" }} />
              <InputBase
                sx={{ml: 1, flex: 1 , fontSize:'0.875rem', fontWeight:'500', }}
                placeholder="Rechercher un employé ..."
              />
            </Box>

            {/* Calendar */}
            <Box
              sx={{
                width: "20.8rem",
                height: "2.5rem",
              }}
            >
              <Calendar />
            </Box>
          </Box>

          <TableContainer component={Paper} elevation={0} sx={{boxShadow: "none"}}>
            <Table size="small">
              <TableHead sx={{ bgcolor: "#F6F7F9" }}>
                <TableRow>
                  <TableCell sx={{ width: "15%" ,color: "#818EA0", fontSize: "0.875rem" ,fontWeight:'500', borderBottom: "none", }}>
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
                  
                  
                  <TableCell sx={{ width: "15%",color: "#818EA0", fontSize: "0.875rem" ,fontWeight:'500',borderBottom: "none", }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      Mois <PiSortAscendingLight size={18} />
                    </Box>
                  </TableCell>
                  {/* space */}
                  <TableCell sx={{ width: "55%", bgcolor: "transparent",borderBottom: "none",}}></TableCell>
                  <TableCell sx={{ width: "15%", bgcolor: "transparent",borderBottom: "none", }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{py:'4px'}}>
                {salaires.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ width: "15%%", fontSize: "0.875rem",fontWeight:'500',  p: "1.2rem",borderBottom:'1px solid #F6F7F9' }}>{row.employe}</TableCell>
                    <TableCell sx={{ width: "15%%", fontSize: "0.875rem",fontWeight:'500',  p: "1.2rem",borderBottom:'1px solid #F6F7F9' }}>{row.mois}</TableCell>
                    <TableCell sx={{width:'55%', borderBottom:'none'}}></TableCell>
                    <TableCell
                      sx={{ position: "relative", // Ensure the button can be positioned absolutely
                        width: "15%",
                        borderBottom: "1px solid #F6F7F9",
                        p: "1.2rem", }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          position: "absolute", // Absolutely position the button
                          right: "1.25rem", // Adjust spacing from the right
                          top: "50%", // Position the button at 50% height of the parent
                          transform: "translateY(-50%)", // Center the button vertically
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


          {/* footer */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 'auto', // Pushes the box to the bottom
              py: '1rem', // Add vertical padding //20px
              px: '1.25rem', // Add horizontal padding //20px
              borderTop: '1px solid #E9EEF6', 
            }}
          >
            <Typography variant="body2" sx={{ color: "#818EA0" }}>
              1-10 sur 240
            </Typography>
            <Box sx={{ display: "flex", gap: 1, height: "1rem", width: "6.75rem",alignItems:'center'}}>
              <IconButton size="small">
                <ChevronLeft sx={{border:'1px solid #E2E8F0', borderRadius:'0.25rem'}}/>
              </IconButton>
              <Typography>1/27</Typography>
              <IconButton size="small">
                <ChevronRight sx={{border:'1px solid #E2E8F0', borderRadius:'0.25rem'}}/>
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

     

    </Box>
  );
}
