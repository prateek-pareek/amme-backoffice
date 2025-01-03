import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  Add as Plus,
  Edit as Pen,
  MoreHoriz,
  Delete,
} from "@mui/icons-material";
import SideBar from "../SideBar";
import NavBar from "../NavBar";
import { IoMdArrowDown } from "react-icons/io";
import { PiSortAscendingLight } from "react-icons/pi";

type User = {
  lastName: string;
  firstName: string;
  email: string;
  status: "Actif" | "Inactif";
};

const users: User[] = [
  {
    lastName: "Blanchard",
    firstName: "Mathurin",
    email: "balthazar.charles@example.org",
    status: "Actif",
  },
  {
    lastName: "Blanchard",
    firstName: "Mathurin",
    email: "balthazar.charles@example.org",
    status: "Actif",
  },
  {
    lastName: "Nguyen",
    firstName: "Reine",
    email: "capucine.henry@example.com",
    status: "Inactif",
  },
  {
    lastName: "Deschamps",
    firstName: "Balthazar",
    email: "aristide.berger@example.net",
    status: "Inactif",
  },
  {
    lastName: "Marty",
    firstName: "Serge",
    email: "gilbert.laurent@example.com",
    status: "Actif",
  },
  {
    lastName: "Leclerc",
    firstName: "Yvonne",
    email: "vianney45@example.net",
    status: "Inactif",
  },
  {
    lastName: "Leclerc",
    firstName: "Yvonne",
    email: "vianney45@example.net",
    status: "Inactif",
  },
];

// First define the permission keys type
type PermissionKey =
  | "statistics"
  | "planning"
  | "services"
  | "salaries"
  | "invoices"
  | "paidLeave";

// Define the interface for each permission item
interface PermissionItem {
  label: string;
  key: PermissionKey;
}

export default function AccessAdministration() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  // Add this state at the top with other states
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [modifyDialogOpen, setModifyDialogOpen] = React.useState(false);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    user: User
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  // Add new function to handle final deletion
  const handleConfirmDelete = () => {
    console.log("Deleting user:", selectedUser);
    setDeleteDialogOpen(false);
  };

  const handleModify = () => {
    // Handle modify action
    setModifyDialogOpen(true);
    handleClose();
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
    handleClose(); // Close the menu
  };

  // Add these state declarations in your Page6 component
  const [createAccountOpen, setCreateAccountOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    lastName: "",
    firstName: "",
    email: "",
  });
  const [permissions, setPermissions] = React.useState({
    statistics: true,
    planning: false,
    services: false,
    salaries: false,
    invoices: false,
    paidLeave: false,
  });

  // Add these handlers in your Page6 component
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePermissionChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setPermissions((prev) => ({
        ...prev,
        [name]: event.target.checked,
      }));
    };

  return (
    <Box sx={{ display: "flex", bgcolor: "#F6F7F9", minHeight: "100vh" }}>
     

      {/* Main content */}
      <Box sx={{ flex: 1 }}>
        {/* Top bar */}
        <NavBar />

        {/* Page content */}
        <Box
           sx={{
            position: 'relative',
            p: 3,
            backgroundColor: "white",
            height: "calc(100vh - 70px)",
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Box>
              <Typography variant="h5" gutterBottom>
                Gestion administrateur
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Veuillez retrouver ici l'ensemble des comptes administrateurs
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Plus />}
              sx={{ height: 40 }}
              onClick={() => setCreateAccountOpen(true)}
            >
              Créer un compte
            </Button>
          </Box>

          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ boxShadow: "none" }}
          >
            <Table size="small">
              <TableHead sx={{ bgcolor: "#F6F7F9" }}>
                <TableRow >
                  <TableCell sx={{ display: "flex", color: "#818EA0" , fontSize: "14px", ml:'20px' }}>
                    Nom <PiSortAscendingLight size={24} />
                  </TableCell>
                  <TableCell sx={{ color: "#818EA0",  }}>Prénom</TableCell>
                  <TableCell sx={{ color: "#818EA0",  }}>Adresse email</TableCell>
                  <TableCell sx={{ color: "#818EA0" }}>
                    Statut de compte
                  </TableCell>
                  <TableCell width={50}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{py:'4px'}}>
                {users.map((user) => (
                  <TableRow key={user.email}>
                    <TableCell sx={{ display: "flex",  fontSize: "14px", ml:'20px', p:'20px'}}>{user.lastName}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "inline-block",
                          px: "20px",
                          py: "4px",
                          fontSize: "14px",
                          fontWeight: "500",
                          borderRadius: 1,
                          bgcolor:
                            user.status === "Actif" ? "#D1E4FF" : "#FFD0D0",
                          color:
                            user.status === "Actif" ? "#0C66E6" : "#C53434",
                        }}
                      >
                        {user.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={(e) => handleClick(e, user)}>
                        <MoreHoriz />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Action Menu for modifier suprimer*/}
          <Menu
            id="action-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.08))",
                  mt: 1,
                  minWidth: 180,
                  borderRadius: "16px", // Add border radius here
                  "& .MuiMenuItem-root": {
                    px: 2,
                    // py: 1,
                    borderRadius: "2px",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  },
                },
              },
            }}
          >
            <MenuItem onClick={handleModify} sx={{ gap: 1 }}>
              <Pen sx={{ fontSize: "16px" }} />
              Modifier
            </MenuItem>
            <MenuItem onClick={handleDelete} sx={{ color: "#C53434", gap: 1 }}>
              <Delete sx={{ fontSize: "16px" }} />
              Supprimer
            </MenuItem>
          </Menu>

          {/* create account dialog */}
          <Dialog
            open={createAccountOpen}
            onClose={() => setCreateAccountOpen(false)}
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: "16px",
                height: "96%",
                width: 500,
                marginLeft: "1050px",
                overflow: "hidden",
                paddingX: "4px 8px",
              },
            }}
          >
            <DialogTitle
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "24px",
                py: 2,
                px:3,

                pb: "0px",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "600", fontSize: "24px", mb: "0px" }}
              >
                Création de compte
              </Typography>
              <IconButton onClick={() => setCreateAccountOpen(false)}>
                X
              </IconButton>
            </DialogTitle>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ px: 3, mb: 2, mt: 0, fontSize: "14px", fontWeight: "400" }}
            >
              Veuillez compléter les informations ci-dessous afin de créer un
              nouveau compte
            </Typography>

            <DialogContent sx={{ px: 3, py: "4px" }}>
              {/* Input Fields Section */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "5px",
                  gap: "12px", // Reduced gap between input fields and Pages accessibles (Change 1)
                  mb: "8px", // Adjusted bottom margin for the input section
                }}
              >
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "0px" }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Typography variant="body2">Nom</Typography>
                    <Typography variant="body2" sx={{ color: "#818EA0" }}>
                      (obligatoire)
                    </Typography>
                  </Box>
                  <TextField
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    fullWidth
                    // size="small"
                    InputProps={{
                      sx: { height: '35px' }, // Custom height for input
                    }}
                  />
                </Box>

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "0px" }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Typography variant="body2">Prénom</Typography>
                    <Typography variant="body2" sx={{ color: "#818EA0" }}>
                      (obligatoire)
                    </Typography>
                  </Box>
                  <TextField
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    fullWidth
                    // size="small"
                    InputProps={{
                      sx: { height: '35px' }, // Custom height for input
                    }}
                  />
                </Box>

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "0px" }}
                >
                  <Typography variant="body2">Adresse mail</Typography>
                  <TextField
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    fullWidth
                    // size="small"
                    InputProps={{
                      sx: { height: '35px' }, // Custom height for input
                    }}
                  />
                </Box>
              </Box>

              {/* Pages Accessibles Section */}
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "500", fontSize: "18px", mb: "0px" }}
              >
                Pages accessibles
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: "400", fontSize: "14px", mb: "6px" }}
              >
                Vous pouvez activer les différentes fonctionnalités pour
                l'utilisateur ci-dessous
              </Typography>

              {/* Switches Section */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "224px",
                  borderRadius: 2,
                  backgroundColor: "#FFF",
                  px: 2,
                  mb: "8px",
                }}
              >
                {[
                  { label: "Statistiques", key: "statistics" as PermissionKey },
                  { label: "Planning", key: "planning" as PermissionKey },
                  { label: "Prestations", key: "services" as PermissionKey },
                  { label: "Salaires", key: "salaries" as PermissionKey },
                  { label: "Factures", key: "invoices" as PermissionKey },
                  { label: "Congés payés", key: "paidLeave" as PermissionKey },
                ].map((item: PermissionItem) => (
                  <Box
                    key={item.key}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    {/* Label Section */}
                    <Box sx={{ flex: 1, textAlign: "left" }}>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: "14px", fontWeight: 500 }}
                      >
                        {item.label}
                      </Typography>
                    </Box>

                    {/* Switch Section */}
                    <Box sx={{ flexShrink: 0 }}>
                      <Switch
                        checked={permissions[item.key]}
                        onChange={() => handlePermissionChange(item.key)}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  borderTop: "1px solid #E9EEF6",
                  pt: 1,
                  // mt: 1,
                }}
              >
                
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      borderColor: "#E2E8F0",
                      color:'#151515',
                      fontSize:'14px', 
                    }}
                    onClick={() => setCreateAccountOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      borderRadius: "8px",
                      fontWeight: "bold",
                      backgroundColor: "#E2E8F0",
                      ":hover": { backgroundColor: "#E2E8F0" },
                    }}
                  >
                    Créer le compte
                  </Button>
                </Box>
              </Box>
            </DialogContent>
          </Dialog>

          {/* Delete Account Dialog */}
          <Dialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
            PaperProps={{
              sx: {
                borderRadius: 2,
                maxWidth: "400px",
                position: "fixed",
                bottom: 20,
                right: 20,
              },
            }}
            sx={{
              "& .MuiBackdrop-root": {
                backgroundColor: "rgba(0, 0, 0, 0.2)", // Adjust opacity here (default is 0.5)
              },
            }}
          >
            <DialogContent sx={{ pt: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Suppression
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Vous êtes sur le point de supprimer un profil administrateur.
                Confirmez-vous cette action ?
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: 3,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => setDeleteDialogOpen(false)}
                  sx={{ textTransform: "none" }}
                >
                  Annuler
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleConfirmDelete}
                  sx={{ textTransform: "none" }}
                >
                  Supprimer
                </Button>
              </Box>
            </DialogContent>
          </Dialog>

          {/* Modify Account Dialog */}
          <Dialog
            open={modifyDialogOpen}
            onClose={() => setModifyDialogOpen(false)}
            maxWidth="sm"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: "16px",
                height: "98%",
                width: 500,
                marginLeft: "1050px",
                overflow: "hidden",
                paddingX: "4px 8px",
              },
            }}
          >
            <DialogTitle
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "24px",
                py: 2,
                px:3,
                pb: "0px",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "600", fontSize: "24px", mb: "0px" }}
              >
                Gestion de compte
              </Typography>
              <IconButton onClick={() => setModifyDialogOpen(false)}>
                X
              </IconButton>
            </DialogTitle>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ px: 3, mb: 2, mt: 0, fontSize: "14px", fontWeight: "400" }}
            >
              Veuillez compléter les informations ci-dessous afin de créer un
              nouveau compte
            </Typography>

            <DialogContent sx={{ px: 3, py: "4px" }}>
              {/* Input Fields Section */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "5px",
                  gap: "12px", // Reduced gap between input fields and Pages accessibles (Change 1)
                  mb: "4px", // Adjusted bottom margin for the input section
                }}
              >
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "0px" }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Typography variant="body2">Nom</Typography>
                    <Typography variant="body2" sx={{ color: "#818EA0" }}>
                      (obligatoire)
                    </Typography>
                  </Box>
                  <TextField
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    fullWidth
                    // size="small"
                    InputProps={{
                      sx: { height: '35px' }, // Custom height for input
                    }}
                  />
                </Box>

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "0px" }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Typography variant="body2">Prénom</Typography>
                    <Typography variant="body2" sx={{ color: "#818EA0" }}>
                      (obligatoire)
                    </Typography>
                  </Box>
                  <TextField
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    fullWidth
                    // size="small"
                    InputProps={{
                      sx: { height: '35px' }, // Custom height for input
                    }}
                  />
                </Box>

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "0px" }}
                >
                  <Typography variant="body2">Adresse mail</Typography>
                  <TextField
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    fullWidth
                    // size="small"
                    InputProps={{
                      sx: { height: '35px' }, // Custom height for input
                    }}
                  />
                </Box>
              </Box>

              {/* Pages Accessibles Section */}
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "500", fontSize: "18px", mb: "0px" }}
              >
                Pages accessibles
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: "400", fontSize: "14px", mb: "6px" }}
              >
                Vous pouvez activer les différentes fonctionnalités pour
                l'utilisateur ci-dessous
              </Typography>

              {/* Switches Section */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "224px",
                  borderRadius: 2,
                  backgroundColor: "#FFF",
                  px: 2,
                  mb: "8px",
                }}
              >
                {[
                  { label: "Statistiques", key: "statistics" as PermissionKey },
                  { label: "Planning", key: "planning" as PermissionKey },
                  { label: "Prestations", key: "services" as PermissionKey },
                  { label: "Salaires", key: "salaries" as PermissionKey },
                  { label: "Factures", key: "invoices" as PermissionKey },
                  { label: "Congés payés", key: "paidLeave" as PermissionKey },
                ].map((item: PermissionItem) => (
                  <Box
                    key={item.key}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    {/* Label Section */}
                    <Box sx={{ flex: 1, textAlign: "left" }}>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: "14px", fontWeight: 500 }}
                      >
                        {item.label}
                      </Typography>
                    </Box>

                    {/* Switch Section */}
                    <Box sx={{ flexShrink: 0 }}>
                      <Switch
                        checked={permissions[item.key]}
                        onChange={() => handlePermissionChange(item.key)}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  borderTop: "1px solid #E9EEF6",
                  pt: 1,
                  // mt: 1,
                }}
              >
                
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      borderColor: "#E2E8F0",
                      color:'#151515',
                      fontSize:'14px', 
                    }}
                    onClick={() => setCreateAccountOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      borderRadius: "8px",
                      fontWeight: "bold",
                      backgroundColor: "#E2E8F0",
                      ":hover": { backgroundColor: "#E2E8F0" },
                    }}
                  >
                    Créer le compte
                  </Button>
                </Box>
              </Box>
            </DialogContent>
          </Dialog>

          {/* table footer */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 'auto', // Pushes the box to the bottom
              py: 2, // Add vertical padding
              px: 2,
              borderTop: '1px solid #E9EEF6', 
            }}
          >
            <Typography variant="body2" color="text.secondary">
              1-10 sur 240
            </Typography>
            <Box
              sx={{ display: "flex", gap: 1, height: "24px", width: "108px" }}
            >
              <IconButton size="small">
                <ChevronLeft sx={{border:'1px solid #E2E8F0', borderRadius:'4px'}}/>
              </IconButton>
              1/27
              <IconButton size="small">
                <ChevronRight sx={{border:'1px solid #E2E8F0', borderRadius:'4px'}}/>
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
