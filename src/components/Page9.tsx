import React from 'react';
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
  Typography
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Add as Plus,
  Edit as Pen,
  MoreHoriz,
  Delete
} from '@mui/icons-material';
import SideBar from './SideBar';
import NavBar from './NavBar';


type User = {
  lastName: string;
  firstName: string;
  email: string;
  status: 'Actif' | 'Inactif';
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
type PermissionKey = 'statistics' | 'planning' | 'services' | 'salaries' | 'invoices' | 'paidLeave';

// Define the interface for each permission item
interface PermissionItem {
  label: string;
  key: PermissionKey;
}


export default function Page9() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, user: User) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleModify = () => {
    // Handle modify action
    console.log('Modifying user:', selectedUser);
    handleClose();
  };

  const handleDelete = () => {
    // Handle delete action
    console.log('Deleting user:', selectedUser);
    handleClose();
  };

  // Add these state declarations in your Page6 component
const [createAccountOpen, setCreateAccountOpen] = React.useState(false);
const [formData, setFormData] = React.useState({
  lastName: '',
  firstName: '',
  email: ''
});
const [permissions, setPermissions] = React.useState({
  statistics: true,
  planning: false,
  services: false,
  salaries: false,
  invoices: false,
  paidLeave: false
});

// Add these handlers in your Page6 component
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

const handlePermissionChange = (name:string) => (event: React.ChangeEvent<HTMLInputElement>) => {
  setPermissions(prev => ({
    ...prev,
    [name]: event.target.checked
  }));
};


  return (
    <Box sx={{ display: 'flex', bgcolor: '#F6F7F9', minHeight: '100vh' }}>
      {/* Sidebar */}
     <SideBar/>

      {/* Main content */}
      <Box sx={{ flex: 1 }}>
        {/* Top bar */}
        <NavBar/>

        {/* Page content */}
        <Box sx={{ p: 4  , backgroundColor:'white', flex: 1, height: 'calc(100vh - 80px)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
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

          <TableContainer component={Paper} elevation={0}  sx={{ boxShadow: 'none' }}>
            <Table>
              <TableHead sx={{ bgcolor: '#F6F7F9' }}>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Prénom</TableCell>
                  <TableCell>Adresse email</TableCell>
                  <TableCell>Statut de compte</TableCell>
                  <TableCell width={50}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.email}>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'inline-block',
                          px: 2,
                          py: 0.5,
                          borderRadius: 1,
                          bgcolor: user.status === 'Actif' ? '#E5F2FF' : '#FFE5E5',
                          color: user.status === 'Actif' ? '#0C66E6' : '#FF4D4D',
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

          {/* Action Menu */}
          <Menu
            id="action-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.08))',
                  mt: 1,
                  minWidth: 180,
                  borderRadius: '16px', // Add border radius here
                  '& .MuiMenuItem-root': {
                    px: 2,
                    // py: 1,
                    borderRadius: '2px',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  },
                },
              },
            }}
          >
            <MenuItem onClick={handleModify} sx={{ gap: 1 }}>
              <Pen sx={{ fontSize: '16px' }} />
              Modifier
            </MenuItem>
            <MenuItem onClick={handleDelete} sx={{ color:'#FF4D4D' ,gap: 1 }}>
              <Delete sx={{ fontSize: '16px' }} />
              Supprimer
            </MenuItem>
            
          </Menu>

           {/* Add this JSX in your return statement */}
           <Dialog
  open={createAccountOpen}
  onClose={() => setCreateAccountOpen(false)}
  // maxWidth="sm"
  fullWidth
  PaperProps={{
    sx: {
      borderRadius: '16px',
      height: '1100px', // Ensures the dialog fits within the viewport
      width: '464px',
      marginLeft: '1180px',
      overflow: 'hidden', // Prevents outer scrollbars
    }
  }}
>
  <DialogTitle
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '24px',
      p: 3, // Padding for the DialogTitle
      pb: '0px' // Reduce padding-bottom specifically
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
    Création de compte
    </Typography>
    <IconButton onClick={() => setCreateAccountOpen(false)} size="small">
      X
    </IconButton>
  </DialogTitle>
  <Typography variant="body2" color="text.secondary" sx={{ px: 3, py: 1, mb: 1, mt: 0 }}>
  Veuillez complétez les informations ci-dessous afin de créer un nouveau compte
    </Typography>

  <DialogContent sx={{ px: 3, py: 1 , height: 'calc(100% - 80px)', overflowY: 'auto'}}>
    
    {/* Input Fields */}
    <Box sx={{ display: 'flex', flexDirection: 'column', height:'240px',gap: '12px', mb: '8px' }}>
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
    <Typography variant="body2" >
      Nom (obligatoire)
    </Typography>
    <TextField
      name="lastName"
      value={formData.lastName}
      onChange={handleInputChange}
      fullWidth
      size="small"
    />
  </Box>

  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
    <Typography variant="body2" >
      Prénom (obligatoire)
    </Typography>
    <TextField
      name="firstName"
      value={formData.firstName}
      onChange={handleInputChange}
      fullWidth
      size="small"
    />
  </Box>

  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
    <Typography variant="body2" >
      Adresse mail
    </Typography>
    <TextField
      name="email"
      value={formData.email}
      onChange={handleInputChange}
      fullWidth
      size="small"
    />
  </Box>
</Box>


    {/* Pages Accessibles Section */}
    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: '1px' }}>
      Pages accessibles
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
      Vous pouvez activer les différentes fonctionnalités pour l'utilisateur ci-dessous
    </Typography>

    {/* Switches Section */}
<Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    height: '224px',
    borderRadius: 2,
    backgroundColor: '#FFF',
    mb: 2,
    px: 2, // Add padding inside the box
  }}
>
  {[
    { label: 'Statistiques', key: 'statistics' as PermissionKey },
    { label: 'Planning', key: 'planning' as PermissionKey },
    { label: 'Prestations', key: 'services' as PermissionKey },
    { label: 'Salaires', key: 'salaries' as PermissionKey },
    { label: 'Factures', key: 'invoices' as PermissionKey },
    { label: 'Congés payés', key: 'paidLeave' as PermissionKey },
  ].map((item: PermissionItem) => (
    <Box
      key={item.key}
      sx={{
        display: 'flex',
        justifyContent: 'space-between', // Space out the label and switch
        alignItems: 'center', // Center content vertically
        // Add vertical padding for each row
        width: '100%',
      }}
    >
      {/* Label Section */}
      <Box sx={{ flex: 1, textAlign: 'left' }}>
        <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 500 }}>
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
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 2,
        // Add padding to the right side of the box
        borderTop: '1px solid #E9EEF6',
        // pt: 3,
        // mt: 2,
      }}
    >
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          sx={{ textTransform: 'none', color:'#151515', borderRadius:'8px', borderColor: '#E2E8F0' }}
          onClick={() => setCreateAccountOpen(false)}
        >
          Annuler
        </Button>
        <Button
          variant="contained"
          sx={{
            textTransform: 'none', borderRadius:'8px',
            backgroundColor: '#E2E8F0',
          }}
        >
          Créer le compte
        </Button>
      </Box>
    </Box>
  </DialogContent>
</Dialog>




          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, px: 2 }}>
            <Typography variant="body2" color="text.secondary">
              1-10 sur 240
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, height:'24px', width:'108px' }}>
              <IconButton size="small">
                <ChevronLeft />
              </IconButton>
              1/27
              <IconButton size="small">
                <ChevronRight />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}