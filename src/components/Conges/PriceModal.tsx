import React, { useState } from "react";
import { Box, Button, InputAdornment, Modal, TextField, Typography } from "@mui/material";

type Conges = {
  employe: string;
  dateDebut: string;
  dateFin: string;
  status: string;
};

type PriceModalProps = {
  row: Conges; // Change row to Conges type
  onClose: () => void;
  onApprove: () => void;
};

export default function PriceModal({ row, onClose, onApprove }: PriceModalProps) {
    const [price, setPrice] = useState('1.70');

  return (
 
      <Box
        sx={{
          position: 'fixed',
          bottom: '5%',
          right: '5%',
          
          width: '464px',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 2,
        }}
      >
        {/* Header */}
        <Typography
          variant="h6"
          sx={{
            fontSize: '18px',
            fontWeight: 600,
            mb: 2
          }}
        >
          Prix au km remboursé
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            fontSize: '14px',
            color: 'text.secondary',
            mb: 3
          }}
        >
          Vous pouvez modifier le prix au kilomètre remboursé à partir d'ici.
        </Typography>

        {/* Price Input */}
        <Box sx={{ mb: 4 }}>
          <Typography
            component="label"
            sx={{
              fontSize: '14px',
              fontWeight: 500,
              mb: 1,
              display: 'block'
            }}
          >
            Prix
          </Typography>
          <TextField
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            inputProps={{
              step: '0.01',
              min: '0',
            }}
            sx={{
              width: '150px',
              '& .MuiOutlinedInput-root': {
                borderRadius: 1.5,
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography sx={{ fontSize: '14px', color: 'text.secondary' }}>
                    par km remboursé
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              textTransform: 'none',
              borderRadius: 1.5,
              color: '#151515',
              borderColor: '#151515',
              '&:hover': {
                borderColor: '#151515',
                backgroundColor: 'rgba(21, 21, 21, 0.04)'
              }
            }}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            // onClick={onclose}
            sx={{
              textTransform: 'none',
              borderRadius: 1.5,
              bgcolor: '#0C66E6',
              '&:hover': {
                bgcolor: '#0952B9'
              }
            }}
          >
            Appliquer
          </Button>
        </Box>
      </Box>
  );
}
