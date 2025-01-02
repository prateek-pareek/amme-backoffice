import React, { Dispatch, SetStateAction } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";

import { Close } from "@mui/icons-material";

// Define the type for Prestation
type Factures = {
  factureNo: string;
  employe: string;
  mois: string;
  factureType: string;
  status: string;
};

type BenifitsProps = {
  setState: Dispatch<SetStateAction<number>>;  // This is the function to update the state of the parent component.
    row: Factures | null;
    onClose: () => void;
};

const Invoices: React.FC<BenifitsProps> = ({ setState, row, onClose }) => {

  const handleShareModal=() => {
    setState(2);
  }
  

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "82%",
          transform: "translate(-50%, -50%)", 
          width: 500, 
          height: "95%", // Set height to 'full' to take up all available vertical space
          bgcolor: "background.paper",
          boxShadow: 24,
          p: '15px 25px',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontSize: "24px", fontWeight: "600" }}>
        Facture n°
        </Typography>
        <Typography sx={{fontSize:'14px', fontWeight:'400', color:'#818EA0'}}>
        Veuillez complétez les informations ci-dessous afin de créer un nouveau compte
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <Close />
        </IconButton>
       

        
          <Box
                      sx={{
                        position: "absolute",
                        bottom: "20px",
                        right: "20px", // Keep the buttons at the bottom right
                        display: "flex", // Use flexbox to position buttons side by side
                        gap: "10px", // Add some space between the buttons
                      }}
                    >
                      {/* Précédent Button */}
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "#0C66E6", // Color for "Précédent" button
                          borderRadius: "8px",
                          textTransform: "none",
                        }}
                        onClick={handleShareModal}
                      >
                        Partager
                      </Button>
          
                      {/* Suivant Button */}
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "#0C66E6", // Color for "Suivant" button
                          borderRadius: "8px",
                          textTransform: "none",
                        }}
                        // onClick={handleSixthModalOpen}
                      >
                        Télécharger
                      </Button>
                    </Box>
          


          
          
          
       

        
        
      </Box>
    </Modal>
  );
};

export default Invoices;
