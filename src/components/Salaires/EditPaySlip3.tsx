import React, { Dispatch, SetStateAction } from "react";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";

type Salaires = {
  employe: string;
  mois: string;
};

type EditPaySlipProps = {
  setState: Dispatch<SetStateAction<number>>;
  row: Salaires | null;
  onClose: () => void;
};

export default function EditPaySlip3({
  setState,
  row,
  onClose,
}: EditPaySlipProps) {
  const [formData, setFormData] = React.useState({
    employe: row?.employe || "",
    mois: row?.mois || "",
    nomEmployeur: "",
    adresse: "",
    codeApe: "",
    numeroSiret: "",
  });

  const [isFirstModalOpen, setIsFirstModalOpen] = React.useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFirstModalClose = () => {
    setIsFirstModalOpen(false);
    onClose();
  };

  const handleSecondModalOpen = () => {
    setState(2);
  };

  const handleFourthModalOpen = () => {
    setState(4);
  };

  return (
    <>
      {/* First Modal */}
      <Modal open={isFirstModalOpen} onClose={handleFirstModalClose}>
        <Box
          sx={{
            position: "absolute",
            height: "95%",
            top: "50%",
            left: "80%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: "25px 25px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontSize: "24px", fontWeight: "600" }}
            >
              {/* Édition fiche de paie */}
              Édition fiche de paie
            </Typography>
            <IconButton onClick={handleFirstModalClose}>
              <Close />
            </IconButton>
          </Box>

          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#818EA0",
              mb: 2,
            }}
          >
            Veuillez compléter les informations ci-dessous afin de créer un
            <br />
            nouveau compte
          </Typography>

          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#818EA0",
              mb: 3,
            }}
          >
            Période et Date de la paie
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Box>
              <Typography variant="body2" sx={{ mb: "4px" }}>
                Période concernée
              </Typography>
              <TextField
                fullWidth
                name="nomEmployeur"
                variant="outlined"
                size="small"
                value={formData.nomEmployeur}
                onChange={handleInputChange}
                sx={{ mt: 0 }}
              />
            </Box>

            

            

            <Box>
              <Typography variant="body2" sx={{ mb: "4px" }}>
              Date de paiement
              </Typography>
              <TextField
                fullWidth
                name="numeroSiret"
                variant="outlined"
                size="small"
                value={formData.numeroSiret}
                onChange={handleInputChange}
                sx={{ mt: 0 }}
              />
            </Box>
          </Box>

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
              variant="outlined"
              sx={{
                bgcolor: "white", // Color for "Précédent" button
                borderRadius: "8px",
                textTransform: "none",
                color: "#0C66E6",
              }}
              onClick={handleSecondModalOpen}
            >
              Précédent
            </Button>

            {/* Suivant Button */}
            <Button
              variant="contained"
              sx={{
                bgcolor: "#0C66E6", // Color for "Suivant" button
                borderRadius: "8px",
                textTransform: "none",
              }}
              onClick={handleFourthModalOpen}
            >
              Suivant
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}