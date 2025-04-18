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
  patient?: string;
  date?: string;
  heure?: string;
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
          right: "5%",
          transform: "translate(10%, -50%)",
          width: "31.25rem", // 500px = 31.25rem
          height: "96%", // Set height to 'full' to take up all available vertical space
          bgcolor: "background.paper",
          boxShadow: 24,
          overflow: "auto",
          p: "0.9375rem 1.5625rem", // 15px 25px = 0.9375rem 1.5625rem
          borderRadius: "1rem", // 2px = 0.125rem
        }}
      >
        <Typography variant="h6" sx={{ fontSize: "1.5rem", fontWeight: "600" }}>
          Prestation
        </Typography>
        <Typography
          sx={{ fontSize: "0.875rem", fontWeight: "400", color: "#818EA0" }}
        >
          Veuillez complétez les informations ci-dessous afin de créer un
          nouveau compte
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: "0.625rem", right: "0.625rem" }} // 10px = 0.625rem
        >
          <Close />
        </IconButton>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            mt: 3,
            height: "1.25rem",
            backgroundColor: "#F6F7F9",
            padding: "0.25rem",
          }} // 20px = 1.25rem, 4px = 0.25rem
        >
          <Tab
            label="Informations"
            sx={{
              width: "50%",
              bgcolor: tabValue === 0 ? "#FFFFFF" : "#F6F7F9",
              color: tabValue === 0 ? "#0C66E6" : "#151515",
            }}
          />
          <Tab
            label="Retour"
            sx={{
              width: "50%",
              bgcolor: tabValue === 1 ? "#FFFFFF" : "#F6F7F9",
              color: tabValue === 1 ? "#0C66E6" : "#151515",
            }}
          />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "600", fontSize: "1.125rem" }}
          >
            {" "}
            {/* 18px = 1.125rem */}
            Informations
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <strong
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#818EA0",
                }}
              >
                Prénom:
              </strong>
              Patrick
            </Typography>
            <Typography
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <strong
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#818EA0",
                }}
              >
                Nom:
              </strong>
              Lebord
            </Typography>
            <Typography
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <strong
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#818EA0",
                }}
              >
                Adresse mail:
              </strong>
              lebord.p@yahoo.fr
            </Typography>
            <Typography
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <strong
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#818EA0",
                }}
              >
                Téléphone portable:
              </strong>
              +33 7 09 23 12 00
            </Typography>
            <Typography
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <strong
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#818EA0",
                }}
              >
                Numéro de sécurité sociale:
              </strong>
              1 97 00 98 238 923 09
            </Typography>
          </Box>

          <Typography
            variant="subtitle1"
            sx={{ mt: 3, fontWeight: "600", fontSize: "1.125rem" }}
          >
            Retour
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "400", fontSize: "0.875rem", color: "#818EA0" }}
            >
              Retour client(e):
            </Typography>
            <Rating value={4} readOnly />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "400", fontSize: "0.875rem", color: "#818EA0" }}
            >
              Commentaire client(e):
            </Typography>
            <Typography
              sx={{
                mt: 1,
                bgcolor: "#F6F7F9",
                borderRadius: "0.375rem",
                padding: "0.375rem",
                fontWeight: "400",
                fontSize: "0.875rem",
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Ipsum mauris senectus arcu
              ipsum aliquam elit. Ullamcorper lorem ac aliquam egestas ipsum
              diam quisque. Sapien tristique lobortis diam integer.
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "400",
                  fontSize: "0.875rem",
                  color: "#818EA0",
                }}
              >
                Retour Infirmier
              </Typography>
              <Rating value={5} readOnly />
            </Box>
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                bgcolor: "#F6F7F9",
                borderRadius: "0.375rem",
                fontWeight: "400",
                fontSize: "0.875rem",
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Ipsum mauris senectus arcu
              ipsum aliquam elit.
            </Typography>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ padding: "2.1875rem" }}>
            {" "}
            {/* 35px = 2.1875rem */}
            <img
              src={prescription}
              alt=""
              style={{
                width: "26.940625rem", // 431.06px = 26.940625rem
                height: "50%",
                top: "13.375rem", // 214px = 13.375rem
                left: "4.125rem", // 66px = 4.125rem
                gap: "0rem",
                borderRadius: "1rem", // 16px = 1rem
                border: "0.045rem solid transparent", // 0.72px = 0.045rem
              }}
            />
          </Box>

          <Box sx={{ mb: 1, display: "flex", justifyContent: "flex-end" }}>
            <Button
              sx={{
                backgroundColor: "#0C66E6",
                color: "white",
                padding: "0.625rem", // 10px = 0.625rem
                fontSize: "0.875rem",
                fontWeight: "400",
              }}
            >
              Télécharger
            </Button>
          </Box>
        </TabPanel>
      </Box>
    </Modal>
  );
};

export default Benifits;
