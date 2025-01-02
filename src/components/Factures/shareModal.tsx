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
          top: "80%",
          left: "85%",
          transform: "translate(-50%, -50%)",
          width: '464px',
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
        }}
      >
        {/* Modal Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontSize: "18px", fontWeight: "600" }}
          >
            Partager la facture
          </Typography>
        </Box>

        {/* Modal Content */}
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "400",
            color: "#818EA0",
            mb: 2,
          }}
        >
          Vous êtes sur le point de supprimer un profil administrateur.
          Confirmez-vous cette action ?
        </Typography>

        {/* Email Input */}
        <Typography variant="body2" sx={{ mb: "4px" }}>
          Adresse mail
        </Typography>
        <TextField
  fullWidth
  placeholder="ex : john.doe@email.com"
  variant="outlined"
  value={email}
  onChange={handleEmailChange}
  sx={{
    mb: 3,
    "& .MuiOutlinedInput-root": {
      height: "40px", // Set the desired height
      fontSize: "14px", // Adjust font size if needed
    },
  }}
/>

        {/* Modal Footer */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              borderRadius: 2,
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
              borderRadius: 2,
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
