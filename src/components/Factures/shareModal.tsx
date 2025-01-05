import React, { Dispatch, SetStateAction } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

type Factures = {
  factureNo: string;
  employe: string;
  mois: string;
  factureType: string;
  status: string;
};

type ShareModalProps = {
  setState: Dispatch<SetStateAction<number>>;
  row: Factures | null;
  onClose: () => void;
};

export default function ShareModal({ setState,
  row,
  onClose, }: ShareModalProps) {
  const [email, setEmail] = React.useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSend = () => {
    console.log("Email sent to:", email);
    onClose();
  };

  return (
    <Modal
  open={true}
  onClose={onClose}
  BackdropProps={{
    style: { backgroundColor: "transparent" }, // No blur or color
  }}
>

<Box
  sx={{
    position: "absolute",
    bottom: "2rem",
    right: "2rem",
    width: "29rem", // 464px
    bgcolor: "background.paper",
    borderRadius: "1rem", // 2px
    boxShadow: 24,
    p: "1.875rem", // 30px
  }}
>
  {/* Modal Header */}
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: "1.25rem", // 20px
    }}
  >
    <Typography variant="h6" sx={{ fontSize: "1.125rem", fontWeight: "600" }}> {/* 18px */}
      Partager la facture
    </Typography>
  </Box>

  {/* Modal Content */}
  <Typography
    sx={{
      fontSize: "0.875rem", // 14px
      fontWeight: "400",
      color: "#818EA0",
      mb: "1.25rem", // 20px
    }}
  >
    Vous êtes sur le point de supprimer un profil administrateur.
    Confirmez-vous cette action ?
  </Typography>

  {/* Email Input */}
  <Typography variant="body2" sx={{ mb: "0.25rem" }}> {/* 4px */}
    Adresse mail
  </Typography>
  <TextField
    fullWidth
    placeholder="ex : john.doe@email.com"
    variant="outlined"
    value={email}
    onChange={handleEmailChange}
    sx={{
      mb: "1.875rem", // 30px
      "& .MuiOutlinedInput-root": {
        height: "2.5rem", // 40px
        fontSize: "0.875rem", // 14px
      },
    }}
  />

  {/* Modal Footer */}
  <Box
    sx={{
      display: "flex",
      justifyContent: "flex-end",
      gap: "0.5rem", // 2px
    }}
  >
    <Button
      variant="outlined"
      sx={{
        textTransform: "none",
        borderRadius: "0.5rem", // 2px
        color: "#151515",
        borderColor: "#151515",
      }}
      onClick={onClose}
    >
      Annuler
    </Button>
    <Button
      variant="contained"
      sx={{
        textTransform: "none",
        borderRadius: "0.5rem", // 2px
        bgcolor: "#0C66E6",
      }}
      onClick={handleSend}
    >
      Envoyer
    </Button>
  </Box>
</Box>

    </Modal>
  );
}
