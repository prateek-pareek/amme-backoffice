import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Rating,
  IconButton,
} from "@mui/material";
import prescription from "../../assets/Prescription.png";
import { Close } from "@mui/icons-material";

// Define the type for Prestation
type Prestation = {
  employe: string;
  patient: string;
  date: string;
  heure: string;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

type BenifitsProps = {
  row: Prestation;
  onClose: () => void;
};

const Benifits: React.FC<BenifitsProps> = ({ row, onClose }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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
          Prestation
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
        

        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mt: 3, height:'20px', backgroundColor:'#F6F7F9' , padding:'4px'}}>
          <Tab label="Informations" sx={{ 
            width:'50%',
            bgcolor: tabValue === 0 ? '#FFFFFF' : '#F6F7F9', // Change background based on selection
            color: tabValue === 0 ? '#0C66E6' : '#151515', // Change text color based on selection
          }} />
          <Tab label="Retour" sx={{ 
             width:'50%',
            bgcolor: tabValue === 1 ? '#FFFFFF' : '#F6F7F9', // Change background based on selection
            color: tabValue === 1 ? '#0C66E6' : '#151515', // Change text color based on selection
          }} />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", fontSize: "18px" }}>
            Informations
          </Typography>
          <Box sx={{ mt: 2, }}>
            <Typography sx={{display:'flex', justifyContent:'space-between'}}>
              <strong style={{ fontSize: "14px", fontWeight: "500", color: "#818EA0" }}>Prénom:</strong>
               {/* {row.employe} */}
               Patrick
            </Typography>
            <Typography sx={{display:'flex', justifyContent:'space-between'}}>
              <strong style={{ fontSize: "14px", fontWeight: "500", color: "#818EA0" }}>Nom:</strong> 
              {/* {row.patient} */}Lebord
            </Typography>
            <Typography sx={{display:'flex', justifyContent:'space-between'}}>
              <strong style={{ fontSize: "14px", fontWeight: "500", color: "#818EA0" }}>Adresse mail:</strong>
               {/* {row.date} */}lebord.p@yahoo.fr
            </Typography>
            <Typography sx={{display:'flex', justifyContent:'space-between'}}>
              <strong style={{ fontSize: "14px", fontWeight: "500", color: "#818EA0" }}>Téléphone portable:</strong>
               {/* {row.heure} */}+33 7 09 23 12 00
            </Typography>
            <Typography sx={{display:'flex', justifyContent:'space-between'}}>
              <strong style={{ fontSize: "14px", fontWeight: "500", color: "#818EA0" }}>Numéro de sécurité sociale:</strong> {/* {row.heure} */}1 97 00 98 238 923 09
            </Typography>
          </Box>
        {/* </TabPanel> */}

        {/* <TabPanel value={tabValue} index={1}> */}
          <Typography variant="subtitle1" sx={{mt:3, fontWeight: "600", fontSize: "18px" }}>
            Retour
          </Typography>
          <Box sx={{ display: "flex", justifyContent:'space-between' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "400", fontSize: "14px", color: "#818EA0" }}>
              Retour client(e):
            </Typography>
            <Rating value={4} readOnly />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "400", fontSize: "14px", color: "#818EA0" }}>
              Commentaire client(e):
            </Typography>
            <Typography  sx={{ mt: 1, bgcolor:'#F6F7F9' ,borderRadius:'6px', padding:'6px', fontWeight: "400", fontSize: "14px"}}>
              Lorem ipsum dolor sit amet consectetur. Ipsum mauris senectus arcu ipsum aliquam elit. Ullamcorper lorem ac aliquam egestas ipsum diam quisque. Sapien tristique lobortis diam integer.
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: "flex" , justifyContent:'space-between'}}>
              <Typography variant="subtitle1" sx={{ fontWeight: "400", fontSize: "14px", color: "#818EA0" }}>
                Retour Infirmier
              </Typography>
              <Rating value={5} readOnly />
            </Box>
            <Typography variant="body2" sx={{ mt: 1 ,bgcolor:'#F6F7F9', borderRadius:'6px',  fontWeight: "400", fontSize: "14px"}}>
              Lorem ipsum dolor sit amet consectetur. Ipsum mauris senectus arcu ipsum aliquam elit.
            </Typography>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{padding:'35px'}}>
          <img 
            src={prescription} 
            alt="" 
            style={{
              width: '431.06px',
              height: '50%',
              top: '214px',
              left: '66px',
              gap: '0px',
              
              borderRadius: '16px',
              border: '0.72px solid transparent',
            }} 
          />
          </Box>
        
          <Box sx={{ mb:1, display: "flex", justifyContent: "flex-end" }}>
            
            <Button  sx={{ backgroundColor:'#0C66E6', color:'white', padding:'10px' , fontSize:'14px', fontWeight:'400'}}>
              Télécharger
            </Button>
          </Box>
        </TabPanel>

        
      </Box>
    </Modal>
  );
};

export default Benifits;
