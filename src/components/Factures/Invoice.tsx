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
      height: "96%",
      top: "50%",
      right: "5%",
      transform: "translate(10%, -50%)",
      width: "37.5rem", // 600px
      bgcolor: "background.paper",
      boxShadow: 24,
      borderRadius: "1rem", // 16px
      p: "1.5625rem", // 25px
    }}
  >
    <Typography variant="h6" sx={{ fontSize: "1.5rem", fontWeight: "600" }}> {/* 24px */}
      Facture n°
    </Typography>
    <Typography
      sx={{
        fontSize: "0.875rem", // 14px
        fontWeight: "400",
        color: "#818EA0",
      }}
    >
      Veuillez complétez les informations ci-dessous afin de créer un nouveau compte
    </Typography>
    <IconButton
      onClick={onClose}
      sx={{ position: "absolute", top: "0.625rem", right: "0.625rem" }} // 10px
    >
      <Close />
    </IconButton>

    <Box
      sx={{
        position: "absolute",
        bottom: "1.25rem", // 20px
        right: "1.25rem", // 20px
        display: "flex",
        gap: "0.625rem", // 10px
      }}
    >
      {/* Précédent Button */}
      <Button
        variant="contained"
        sx={{
          bgcolor: "#0C66E6",
          borderRadius: "0.5rem", // 8px
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
          bgcolor: "#0C66E6",
          borderRadius: "0.5rem", // 8px
          textTransform: "none",
        }}
      >
        Télécharger
      </Button>
    </Box>
  </Box>
</Modal>

  );
};

export default Invoices;
