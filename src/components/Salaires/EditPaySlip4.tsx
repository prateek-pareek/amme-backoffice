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

export default function EditPaySlip4({
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

  const handleFifthModalOpen = () => {
    setState(5);
  };

  const handleThirdModalOpen = () => {
    setState(3);
  };

  return (
    <>
      {/* First Modal */}
      <Modal open={isFirstModalOpen} onClose={handleFirstModalClose}>
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
      borderRadius: "1rem", // 2px
      p: "1.5625rem", // 25px
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
            Détail du Salaire Brut
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Box>
              <Typography variant="body2" sx={{ mb: "4px" }}>
              Salaire de base
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
              Heures supplémentaires et majorations
              </Typography>
              <TextField
                fullWidth
                name="adresse"
                variant="outlined"
                size="small"
                value={formData.adresse}
                onChange={handleInputChange}
                sx={{ mt: 0 }}
              />
            </Box>

            <Box>
              <Typography variant="body2" sx={{ mb: "4px" }}>
              Primes et Gratifications
              </Typography>
              <TextField
                fullWidth
                name="codeApe"
                variant="outlined"
                size="small"
                value={formData.codeApe}
                onChange={handleInputChange}
                sx={{ mt: 0 }}
              />
            </Box>

            <Box>
              <Typography variant="body2" sx={{ mb: "4px" }}>
              Avantages en Nature
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

            <Box>
              <Typography variant="body2" sx={{ mb: "4px" }}>
              Indemnités Diverses
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
              onClick={handleThirdModalOpen}
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
              onClick={handleFifthModalOpen}
            >
              Suivant
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
