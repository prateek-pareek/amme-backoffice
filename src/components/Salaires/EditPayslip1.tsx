import React, { Dispatch, SetStateAction } from "react";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Close, SettingsApplications } from "@mui/icons-material";

type Salaires = {
  employe: string;
  mois: string;
};

type EditPaySlipProps = {
  setState: Dispatch<SetStateAction<number>>; // This is the function to update the state of the parent component.
  row: Salaires | null;
  onClose: () => void;
};

export default function EditPaySlip1({
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

  const handleSecondModal = () => {
    setState(2);
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
        mb: "0.0625rem", // 1px
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontSize: "1.5rem", fontWeight: "600" }} // 24px
      >
        Édition fiche de paie
      </Typography>
      <IconButton onClick={handleFirstModalClose}>
        <Close />
      </IconButton>
    </Box>

    <Typography
      sx={{
        fontSize: "0.875rem", // 14px
        fontWeight: "400",
        color: "#818EA0",
        mb: "0.125rem", // 2px
      }}
    >
      Veuillez compléter les informations ci-dessous afin de créer un
      <br />
      nouveau compte
    </Typography>

    <Typography
      sx={{
        fontSize: "1rem", // 16px
        fontWeight: "500",
        color: "#818EA0",
        mb: "0.1875rem", // 3px
      }}
    >
      Informations de l’employé
    </Typography>

    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}> {/* 12px */}
      <Box>
        <Typography variant="body2" sx={{ mb: "0.25rem" }}> {/* 4px */}
          Nom de l’employeur*
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
        <Typography variant="body2" sx={{ mb: "0.25rem" }}> {/* 4px */}
          Adresse*
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
        <Typography variant="body2" sx={{ mb: "0.25rem" }}> {/* 4px */}
          Code APE/NAF
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
        <Typography variant="body2" sx={{ mb: "0.25rem" }}> {/* 4px */}
          Numéro SIRET*
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
        bottom: "1.25rem", // 20px
        right: "1.25rem", // 20px
      }}
    >
      <Button
        variant="contained"
        sx={{
          bgcolor: "#0C66E6",
          borderRadius: "0.5rem", // 8px
          textTransform: "none",
        }}
        onClick={handleSecondModal}
      >
        Suivant
      </Button>
    </Box>
  </Box>
</Modal>

    </>
  );
}
