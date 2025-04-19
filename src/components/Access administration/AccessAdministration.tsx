import React, { useEffect, useState } from "react";
import axios from "axios";
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
  InputAdornment,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  Add as Plus,
  Edit as Pen,
  MoreHoriz,
  Delete,
  Search,
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
  const [users, setUsers] = useState<User[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [modifyDialogOpen, setModifyDialogOpen] = React.useState(false);
  const [originalEmail, setOriginalEmail] = React.useState<string>("");
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [userToDelete, setUserToDelete] = React.useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://amme-api-pied.vercel.app/api/backOffice/all"
        );
        if (response.data && response.data.data) {
          const fetchedUsers = response.data.data.map((user: any) => ({
            lastName: user.lastName,
            firstName: user.firstName,
            email: user.email,
            status: user.status === "active" ? "Actif" : "Inactif",
          }));
          setUsers(fetchedUsers);
        }
      } catch (err) {
        console.error("Error fetching leave requests:", err);
      }
    };

    fetchData();
  }, []);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    user: User
  ) => {
    console.log("User selected for action:", user);
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleDelete = () => {
    if (!selectedUser) {
      console.log("No user selected when attempting to open delete dialog.");
      return;
    }
    console.log("Opening delete dialog for user:", selectedUser);
    setUserToDelete(selectedUser);
    setDeleteDialogOpen(true);
    handleClose();
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) {
      console.log("No user selected for deletion.");
      return;
    }

    console.log("Attempting to deactivate user:", userToDelete.email);

    try {
      const config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `https://amme-api-pied.vercel.app/api/backOffice/deactivate?email=${userToDelete.email}`,
        headers: {},
      };

      const response = await axios.request(config);
      console.log("Deactivation response:", JSON.stringify(response.data));

      setDeleteDialogOpen(false);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === userToDelete.email
            ? { ...user, status: "Inactif" }
            : user
        )
      );

      setUserToDelete(null);

      console.log("User deactivated and status updated to Inactif.");
    } catch (error) {
      console.log("Error during deactivation:", error);
    }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleModify = () => {
    if (selectedUser) {
      setFormData({
        lastName: selectedUser.lastName,
        firstName: selectedUser.firstName,
        email: selectedUser.email,
      });
      setOriginalEmail(selectedUser.email);
    }
    setModifyDialogOpen(true);
    handleClose();
  };

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

  const handleCreateAccount = async () => {
    try {
      const pages = {
        Statistiques: permissions.statistics,
        Planning: permissions.planning,
        Prestations: permissions.services,
        Salaires: permissions.salaries,
        Factures: permissions.invoices,
        "Congés payées": permissions.paidLeave,
      };

      const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        pages: pages,
      };

      const token = localStorage.getItem("token") || "";
      console.log("token", token);

      // Instead of using Authorization header, add token as query parameter
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://amme-api-pied.vercel.app/api/backOffice/create?token=${token}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));

      // Add the newly created admin to the UI list
      setUsers((prevUsers) => [
        ...prevUsers,
        {
          lastName: formData.lastName,
          firstName: formData.firstName,
          email: formData.email,
          status: "Actif",
        },
      ]);

      setCreateAccountOpen(false);

      setFormData({
        lastName: "",
        firstName: "",
        email: "",
      });

      setPermissions({
        statistics: true,
        planning: false,
        services: false,
        salaries: false,
        invoices: false,
        paidLeave: false,
      });
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleUpdateAccount = async () => {
    try {
      // Only include properties that have values
      const updateData = {
        firstName: formData.firstName || undefined,
        lastName: formData.lastName || undefined,
        email: formData.email !== originalEmail ? formData.email : undefined,
        pages: {
          Statistiques: permissions.statistics,
          Planning: permissions.planning,
          Prestations: permissions.services,
          Salaires: permissions.salaries,
          Factures: permissions.invoices,
          "Congés payées": permissions.paidLeave, // Note: API expects "payées" not "payés"
        },
      };

      // Clean up undefined properties
      Object.keys(updateData).forEach((key) => {
        if (updateData[key] === undefined) {
          delete updateData[key];
        }
      });

      console.log("Sending update data:", updateData);

      const token = localStorage.getItem("token") || "";

      // Use token as query parameter to avoid CORS issues
      const config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `https://amme-api-pied.vercel.app/api/backOffice/update-admin/${originalEmail}?token=${token}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: updateData,
      };

      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));

      // Update the user in the UI with the response data
      if (response.data && response.data.admin) {
        const updatedAdmin = response.data.admin;

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.email === originalEmail
              ? {
                  lastName: updatedAdmin.lastName || user.lastName,
                  firstName: updatedAdmin.firstName || user.firstName,
                  email: updatedAdmin.email || user.email,
                  status: user.status,
                }
              : user
          )
        );
      }

      setModifyDialogOpen(false);

      setFormData({
        lastName: "",
        firstName: "",
        email: "",
      });

      setPermissions({
        statistics: true,
        planning: false,
        services: false,
        salaries: false,
        invoices: false,
        paidLeave: false,
      });
    } catch (error) {
      console.log(error);
      // Display error to user or handle it appropriately
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ display: "flex", bgcolor: "#F6F7F9", height: "100vh" }}>
      <Box sx={{ flex: 1 }}>
        <NavBar />

        <Box
          sx={{
            position: "relative",
            p: 4,
            backgroundColor: "white",
            height: "calc(100vh - 4.375rem)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 5 }}>
            <Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "600" }}>
                Gestion administrateur
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Veuillez retrouver ici l'ensemble des comptes administrateurs
              </Typography>
            </Box>
            <Button
              startIcon={<Plus />}
              sx={{
                color: "white",
                height: "2.5rem",
                backgroundColor: "#0C66E6",
                fontSize: "1rem",
                fontWeight: "500",
                textTransform: "none",
                px: "1.5rem",
                borderRadius: "0.25rem",
              }}
              onClick={() => setCreateAccountOpen(true)}
            >
              Créer un compte
            </Button>
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              placeholder="Rechercher un administrateur..."
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "#818EA0" }} />
                  </InputAdornment>
                ),
                sx: {
                  height: "2.5rem",
                  backgroundColor: "#F6F7F9",
                  borderRadius: "0.25rem",
                  "& fieldset": { border: "none" },
                },
              }}
            />
          </Box>

          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ boxShadow: "none", height: "80%" }}
          >
            <Table size="small">
              <TableHead sx={{ bgcolor: "#F6F7F9" }}>
                <TableRow>
                  <TableCell
                    sx={{
                      width: "16.67%",
                      color: "#818EA0",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      borderBottom: "none",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        ml: "1.25rem",
                      }}
                    >
                      Nom <IoMdArrowDown size={18} />
                    </Box>
                  </TableCell>

                  <TableCell
                    sx={{
                      width: "16.67%",
                      color: "#818EA0",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      borderBottom: "none",
                    }}
                  >
                    Prénom
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "16.67%",
                      color: "#818EA0",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      borderBottom: "none",
                    }}
                  >
                    Adresse email
                  </TableCell>

                  <TableCell
                    sx={{
                      width: "20%",
                      bgcolor: "transparent",
                      borderBottom: "none",
                    }}
                  ></TableCell>

                  <TableCell
                    sx={{
                      width: "15%",
                      color: "#818EA0",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      textAlign: "right",
                      borderBottom: "none",
                    }}
                  >
                    Statut de compte
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "15%",
                      textAlign: "right",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      borderBottom: "none",
                    }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ py: "0.25rem" }}>
                {filteredUsers.map((user) => (
                  <TableRow key={user.email}>
                    <TableCell
                      sx={{
                        width: "16.67%",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        p: "1.2rem",
                        borderBottom: "1px solid #F6F7F9",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          ml: "1.25rem",
                          gap: "0.5rem",
                        }}
                      >
                        {user.lastName}
                      </Box>
                    </TableCell>

                    <TableCell
                      sx={{
                        width: "16.67%",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        borderBottom: "1px solid #F6F7F9",
                      }}
                    >
                      {user.firstName}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "16.67%",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        borderBottom: " 1px solid#F6F7F9",
                      }}
                    >
                      {user.email}
                    </TableCell>

                    <TableCell
                      sx={{
                        width: "20%",
                        bgcolor: "transparent",
                        borderBottom: "1px solid #F6F7F9",
                      }}
                    ></TableCell>

                    <TableCell
                      sx={{
                        width: "15%",
                        textAlign: "center",
                        borderBottom: "1px solid #F6F7F9",
                      }}
                    >
                      <Box
                        sx={{
                          display: "inline-block",
                          px: "1.25rem",
                          py: "0.25rem",
                          fontSize: "0.875rem",
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
                    <TableCell
                      sx={{
                        width: "15%",
                        textAlign: "right",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        borderBottom: "1px solid #F6F7F9",
                      }}
                    >
                      <IconButton onClick={(e) => handleClick(e, user)}>
                        <MoreHoriz />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ textAlign: "center", py: 3 }}>
                      Aucun résultat trouvé pour "{searchTerm}"
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

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
                  mt: 0,
                  width: "10rem",
                  borderRadius: "1rem",
                  "& .MuiMenuItem-root": {
                    px: 2,
                    borderRadius: "0.125rem",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  },
                },
              },
            }}
          >
            <MenuItem
              onClick={handleModify}
              sx={{ gap: 1, fontSize: "0.9rem", fontWeight: "500" }}
            >
              <Pen sx={{ fontSize: "1rem", fontWeight: "500" }} />
              Modifier
            </MenuItem>
            <MenuItem
              onClick={handleDelete}
              sx={{
                color: "#C53434",
                gap: 1,
                fontSize: "0.9rem",
                fontWeight: "500",
              }}
            >
              <Delete sx={{ fontSize: "1rem", fontWeight: "500" }} />
              Supprimer
            </MenuItem>
          </Menu>

          <Dialog
            open={createAccountOpen}
            onClose={() => setCreateAccountOpen(false)}
            fullWidth
            PaperProps={{
              sx: {
                position: "fixed",
                top: "0.5rem",
                right: "0.5rem",
                borderRadius: "1rem",
                height: "95%",
                width: "29rem",
                margin: "15px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
              },
            }}
          >
            <Box sx={{ height: "8rem" }}>
              <DialogTitle
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "1.5rem",
                  px: "1.5rem",
                  pb: "0rem",
                  mb: "0rem",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "600", fontSize: "1.5rem" }}
                >
                  Création de compte
                </Typography>
                <IconButton onClick={() => setCreateAccountOpen(false)}>
                  X
                </IconButton>
              </DialogTitle>
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    px: "1.5rem",
                    mb: "1rem",
                    fontSize: "0.875rem",
                    fontWeight: "400",
                  }}
                >
                  Veuillez compléter les informations ci-dessous afin de créer
                  un nouveau compte
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                overflowY: "auto",
                px: "1.5rem",
                py: "0.25rem",
                gap: "1.5rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "0.3125rem",
                  gap: "0.75rem",
                  mb: "0.5rem",
                }}
              >
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "0rem" }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Typography variant="body2" sx={{ fontWeight: "400" }}>
                      Nom
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#818EA0", fontWeight: "400" }}
                    >
                      (obligatoire)
                    </Typography>
                  </Box>
                  <TextField
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    fullWidth
                    InputProps={{
                      sx: { height: "2.1875rem" },
                    }}
                  />
                </Box>

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "0rem" }}
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
                    InputProps={{
                      sx: { height: "2.1875rem" },
                    }}
                  />
                </Box>

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "0rem" }}
                >
                  <Typography variant="body2">Adresse mail</Typography>
                  <TextField
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    fullWidth
                    InputProps={{
                      sx: { height: "2.1875rem" },
                    }}
                  />
                </Box>
              </Box>

              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "500", fontSize: "1.125rem", mb: "0rem" }}
                >
                  Pages accessibles
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontWeight: "400",
                    fontSize: "0.875rem",
                    mb: "0.375rem",
                  }}
                >
                  Vous pouvez activer les différentes fonctionnalités pour
                  l'utilisateur ci-dessous
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "14rem",
                    borderRadius: 2,
                    backgroundColor: "#FFF",
                    px: "1.25rem",
                    mb: "0.5rem",
                  }}
                >
                  {[
                    {
                      label: "Statistiques",
                      key: "statistics" as PermissionKey,
                    },
                    { label: "Planning", key: "planning" as PermissionKey },
                    { label: "Prestations", key: "services" as PermissionKey },
                    { label: "Salaires", key: "salaries" as PermissionKey },
                    { label: "Factures", key: "invoices" as PermissionKey },
                    {
                      label: "Congés payés",
                      key: "paidLeave" as PermissionKey,
                    },
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
                      <Box sx={{ textAlign: "left" }}>
                        <Typography
                          variant="body2"
                          sx={{ fontSize: "0.875rem", fontWeight: 500 }}
                        >
                          {item.label}
                        </Typography>
                      </Box>

                      <Box sx={{ flexShrink: 0 }}>
                        <Switch
                          checked={permissions[item.key]}
                          onChange={handlePermissionChange(item.key)}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                borderTop: "1px solid #E9EEF6",
                p: "1rem",
                display: "flex",
                justifyContent: "flex-end",
                position: "sticky",
                bottom: 0,
                backgroundColor: "#FFF",
              }}
            >
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    borderRadius: "0.5rem",
                    borderColor: "#E2E8F0",
                    color: "#151515",
                    fontSize: "0.875rem",
                  }}
                  onClick={() => setCreateAccountOpen(false)}
                >
                  Annuler
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    borderRadius: "0.5rem",
                    fontWeight: "bold",
                    backgroundColor: "#0C66E6",
                    ":hover": { backgroundColor: "#E2E8F0" },
                  }}
                  onClick={handleCreateAccount}
                >
                  Créer le compte
                </Button>
              </Box>
            </Box>
          </Dialog>

          <Dialog
            open={deleteDialogOpen}
            onClose={handleCloseDeleteDialog}
            PaperProps={{
              sx: {
                position: "fixed",
                borderRadius: 2,
                height: "12.8rem",
                width: "28rem",
                bottom: "0.1rem",
                right: "0.1rem",
                boxShadow: 1,
              },
            }}
            sx={{
              "& .MuiBackdrop-root": {
                backgroundColor: "rgba(0, 0, 0, 0)",
              },
            }}
          >
            <DialogContent sx={{ pt: "1rem" }}>
              <Typography
                variant="h6"
                sx={{ mb: "0.625rem", fontSize: "1.125rem", fontWeight: "600" }}
              >
                Désactivation
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: "400",
                  color: "#818EA0",
                }}
              >
                Vous êtes sur le point de désactiver un profil administrateur.
                Confirmez-vous cette action ?
              </Typography>

              <Box
                sx={{
                  position: "absolute",
                  bottom: "1rem",
                  right: "1rem",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "0.625rem",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleCloseDeleteDialog}
                  sx={{
                    textTransform: "none",
                    borderRadius: "0.5rem",
                    color: "#151515",
                    border: "1px solid #E2E8F0",
                  }}
                >
                  Annuler
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleConfirmDelete}
                  sx={{
                    textTransform: "none",
                    borderRadius: "0.5rem",
                    backgroundColor: "#C53434",
                  }}
                >
                  Désactiver
                </Button>
              </Box>
            </DialogContent>
          </Dialog>

          <Dialog
            open={modifyDialogOpen}
            onClose={() => setModifyDialogOpen(false)}
            maxWidth="sm"
            fullWidth
            PaperProps={{
              sx: {
                position: "fixed",
                top: "0.5rem",
                right: "0.5rem",
                borderRadius: "1rem",
                height: "95%",
                width: "29rem",
                margin: "15px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
              },
            }}
          >
            <Box sx={{ height: "8rem" }}>
              <DialogTitle
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "1.5rem",
                  px: "1.5rem",
                  pb: "0rem",
                  mb: "0rem",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "600", fontSize: "1.5rem", mb: "0rem" }}
                >
                  Gestion de compte
                </Typography>
                <IconButton onClick={() => setModifyDialogOpen(false)}>
                  X
                </IconButton>
              </DialogTitle>
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    px: "1.5rem",
                    mb: "1.25rem",
                    mt: 0,
                    fontSize: "0.875rem",
                    fontWeight: "400",
                  }}
                >
                  Veuillez compléter les informations ci-dessous afin de créer
                  un nouveau compte
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                overflowY: "auto",
                px: "1.5rem",
                py: "0.25rem",
                gap: "1.5rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "0.3125rem",
                  gap: "0.75rem",
                  mb: "0.5rem",
                }}
              >
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "0rem" }}
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
                    InputProps={{
                      sx: { height: "2.1875rem" },
                    }}
                  />
                </Box>

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "0rem" }}
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
                    InputProps={{
                      sx: { height: "2.1875rem" },
                    }}
                  />
                </Box>

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "0rem" }}
                >
                  <Typography variant="body2">Adresse mail</Typography>
                  <TextField
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    fullWidth
                    InputProps={{
                      sx: { height: "2.1875rem" },
                    }}
                  />
                </Box>
              </Box>

              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "500", fontSize: "1.125rem", mb: "0rem" }}
                >
                  Pages accessibles
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontWeight: "400",
                    fontSize: "0.875rem",
                    mb: "0.375rem",
                  }}
                >
                  Vous pouvez activer les différentes fonctionnalités pour
                  l'utilisateur ci-dessous
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "14rem",
                    borderRadius: 2,
                    backgroundColor: "#FFF",
                    px: "1.25rem",
                    mb: "0.5rem",
                  }}
                >
                  {[
                    {
                      label: "Statistiques",
                      key: "statistics" as PermissionKey,
                    },
                    { label: "Planning", key: "planning" as PermissionKey },
                    { label: "Prestations", key: "services" as PermissionKey },
                    { label: "Salaires", key: "salaries" as PermissionKey },
                    { label: "Factures", key: "invoices" as PermissionKey },
                    {
                      label: "Congés payés",
                      key: "paidLeave" as PermissionKey,
                    },
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
                      <Box sx={{ flex: 1, textAlign: "left" }}>
                        <Typography
                          variant="body2"
                          sx={{ fontSize: "0.875rem", fontWeight: 500 }}
                        >
                          {item.label}
                        </Typography>
                      </Box>

                      <Box sx={{ flexShrink: 0 }}>
                        <Switch
                          checked={permissions[item.key]}
                          onChange={handlePermissionChange(item.key)}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box
                sx={{
                  borderTop: "1px solid #E9EEF6",
                  p: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  position: "sticky",
                  bottom: 0,
                  backgroundColor: "#FFF",
                }}
              >
                <Box>
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      fontWeight: "bold",
                      borderRadius: "0.5rem",
                      borderColor: "#E2E8F0",
                      color: "#C53434",
                      fontSize: "0.875rem",
                    }}
                    onClick={() => setModifyDialogOpen(false)}
                  >
                    Supprimer
                  </Button>
                </Box>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      fontWeight: "bold",
                      borderRadius: "0.5rem",
                      borderColor: "#E2E8F0",
                      color: "#151515",
                      fontSize: "0.875rem",
                    }}
                    onClick={() => setModifyDialogOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      borderRadius: "0.5rem",
                      fontWeight: "bold",
                      backgroundColor: "#E2E8F0",
                      ":hover": { backgroundColor: "#E2E8F0" },
                    }}
                    onClick={handleUpdateAccount}
                  >
                    Confirmer
                  </Button>
                </Box>
              </Box>
            </Box>
          </Dialog>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "auto",
              py: "1rem",
              px: "1.25rem",
              borderTop: "1px solid #E9EEF6",
              height: "7%",
            }}
          >
            <Typography variant="body2" sx={{ color: "#818EA0" }}>
              {filteredUsers.length > 0
                ? `1-${Math.min(filteredUsers.length, 10)} sur ${
                    filteredUsers.length
                  }`
                : "0 résultat"}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                height: "1rem",
                width: "6.75rem",
                alignItems: "center",
              }}
            >
              <IconButton size="small">
                <ChevronLeft
                  sx={{ border: "1px solid #E2E8F0", borderRadius: "0.25rem" }}
                />
              </IconButton>
              1/27
              <IconButton size="small">
                <ChevronRight
                  sx={{ border: "1px solid #E2E8F0", borderRadius: "0.25rem" }}
                />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
