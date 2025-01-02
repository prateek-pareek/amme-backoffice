import { Notifications, Search } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  Toolbar,
  Typography,
} from "@mui/material";
import profile from "../assets/profile.png";
import { useState } from "react";

function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const notifications = [
    { name: "Aphélie Sanchez", message: "A envoyé un CV", timestamp: "15:29" },
    { name: "Aphélie Sanchez", message: "A envoyé un CV", timestamp: "Hier" },
    { name: "Aphélie Sanchez", message: "A envoyé un CV", timestamp: "Avant-hier" },
  ];

  // Open the popover
  const handleNotificationClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the popover
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "notification-popover" : undefined;

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar
        sx={{
          gap: 2,
          minHeight: "80px",
          boxSizing: "border-box",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: 400,
            border: "1px solid #E2E8F0",
            borderRadius: 2,
            px: 2,
          }}
        >
          <Search sx={{ color: "text.secondary" }} />
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Rechercher un nom, prénom, adresse mail..."
          />
        </Box>
        <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={handleNotificationClick}>
            <Badge badgeContent={1} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <img
            src={profile}
            alt="Profile"
            style={{ width: 40, height: 40, borderRadius: "50%" }}
          />
        </Box>
      </Toolbar>

      {/* Notification Popover */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{ mt: 1}}
      >
        <Box sx={{ width: '327px', maxHeight: '284px', overflow: "auto", p: 2  ,borderRadius:'8px'}}>
        <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 1,
  }}
>
  <Typography variant="h6" sx={{fontWeight:"600" ,fontSize:"16px"}}>
    Notifications
  </Typography>
  <Typography
    variant="body2"
    fontSize="12px"
    color="primary"
    sx={{ cursor: "pointer" }}
    onClick={() => console.log("Mark all as read")}
  >
    Marquer tout comme lu
  </Typography>
</Box>
          <List>
            {notifications.map((notification, index) => (
              <ListItem key={index} sx={{ p: 1 }}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: "#0C66E6",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    {notification.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
  primary={
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Typography variant="body1" fontWeight="500">
        {notification.name}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ marginLeft: "auto", whiteSpace: "nowrap",fontSize:'10px', fontWeight:'400' }}
      >
        {notification.timestamp}
      </Typography>
    </Box>
  }
  secondary={
    <Typography component="span" variant="body2" color="text.secondary">
      {notification.message}
    </Typography>
  }
/>

              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>
    </AppBar>
  );
}

export default NavBar;
