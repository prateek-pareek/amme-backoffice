import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, InputAdornment, Modal, ModalManager, TextField, Typography } from "@mui/material";

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
      bottom: '1rem', // 736px -> 46rem
      right: '1rem', // 948px -> 59.25rem
      width: '29rem', // 464px -> 29rem
      height: '16.5rem', // 264px -> 16.5rem
      gap: '0.625rem', // 10px -> 0.625rem
      bgcolor: 'background.paper',
      borderRadius: '1rem', // 16px 0px 0px 0px -> 1rem 0 0 0
      boxShadow: 12,
      p: '1.25rem ', // Converted earlier
      
    }}
  >
    {/* Header */}
    <Typography
      variant="h6"
      sx={{
        fontSize: '1.125rem', // 18px -> 1.125rem
        fontWeight: 600,
        mb: '0.5rem', // 1px -> 0.0625rem
      }}
    >
      Prix au km remboursé
    </Typography>
  
    {/* Description */}
    <Typography
      sx={{
        fontSize: '0.8rem', // 14px -> 0.875rem
        color: 'text.secondary',
        mb: '1.5rem', // 2px -> 0.125rem
      }}
    >
      Vous pouvez modifier le prix au kilomètre remboursé à partir d'ici.
    </Typography>
  
    {/* Price Input */}
    <FormControl > {/* 16px -> 1rem */}
      <FormLabel
        component="legend"
        sx={{
          fontSize: '0.875rem', // 14px -> 0.875rem
          fontWeight: 400,
          display: 'block',
          color: '#151515',
        }}
      >
        Prix
      </FormLabel>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          inputProps={{
            step: '0.01',
            min: '0',
          }}
          sx={{
            width: '6rem', // 96px -> 6rem
            height: '2rem', // 44px -> 2.75rem
            '& .MuiOutlinedInput-root': {
              borderRadius: '0.375rem', // 1.5px -> 0.09375rem
            },
          }}
        />
        <Typography
          sx={{
            fontSize: '0.875rem', // 14px -> 0.875rem
            color: '#151515',
            fontWeight: 400,
            ml: '0.625rem', // 1px -> 0.0625rem
            mt: 'auto', // 2px -> 0.125rem
          }}
        >
          par km remboursé
        </Typography>
      </Box>
    </FormControl>
  
    {/* Action Buttons */}
    <Box
      sx={{
        position:'absolute',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '0.625rem', // 10px -> 0.625rem
        right:'1.5rem',
        bottom:'1.5rem'
      }}
    >
      <Button
        variant="outlined"
        onClick={onClose}
        sx={{
          textTransform: 'none',
          borderRadius: '0.5rem', // 1.5px -> 0.09375rem
          color: '#151515',
          borderColor: '#E2E8F0',
          '&:hover': {
            borderColor: '#151515',
            backgroundColor: 'rgba(21, 21, 21, 0.04)',
          },
        }}
      >
        Annuler
      </Button>
      <Button
        variant="contained"
        sx={{
          fontSize: '0.875rem', // 14px -> 0.875rem
          fontWeight: 500,
          textTransform: 'none',
          borderRadius: '0.5rem', // 1.5px -> 0.09375rem
          bgcolor: '#0C66E6',
          '&:hover': {
            bgcolor: '#0952B9',
          },
        }}
      >
        Appliquer
      </Button>
    </Box>
  </Box>
  
  
  
  );
}
