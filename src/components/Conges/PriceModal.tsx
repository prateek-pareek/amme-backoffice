import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, InputAdornment, Modal, TextField, Typography } from "@mui/material";

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
          height:'34%',
          width: '464px',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: "16px 20px",
          // backdropFilter: 'blur(0)',
        }}
      >
        {/* Header */}
        <Typography
          variant="h6"
          sx={{
            fontSize: '18px',
            fontWeight: 600,
            mb: 1
          }}
        >
          Prix au km remboursé
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            fontSize: '14px',
            color: 'text.secondary',
            mb: 2
          }}
        >
          Vous pouvez modifier le prix au kilomètre remboursé à partir d'ici.
        </Typography>

        {/* Price Input */}
        <FormControl sx={{mb:4}}>
      <FormLabel
        component="legend"
        sx={{
          fontSize: '14px',
          fontWeight: 400,
          mb: 1,
          display: 'block',
          color:'#151515'
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
            width: '96px',
            height: '44px',
            '& .MuiOutlinedInput-root': {
              borderRadius: 1.5,
            },
          }}
        />
        <Typography sx={{ fontSize: '14px', color: '#151515', fontWeight:'400', ml: 1, mt:2 }}>
          par km remboursé
        </Typography>
      </Box>
    </FormControl>

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
              borderColor: '#E2E8F0',
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
              fontSize:'14px',
              fontWeight:'500',
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
