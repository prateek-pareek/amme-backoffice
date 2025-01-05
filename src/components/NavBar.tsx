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
      gap: "1rem",
      minHeight: "5rem", // Using rem for height
      boxSizing: "border-box",
      borderBottom: "1px solid #E2E8F0",
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "32%", // Responsive width
        height: "2.5rem", // Adjusted to rem
        border: "1px solid #E2E8F0",
        borderRadius: "0.375rem", // Responsive border radius
        padding: "0.75rem", // Adjusted padding
      }}
    >
      <Search sx={{ color: "#818EA0" }} />
      <InputBase
        sx={{
          ml: "0.5rem",
          flex: 1,
          fontSize: "0.875rem", // Using rem for font size
          fontWeight: "500",
        }}
        placeholder="Rechercher un nom, prénom, adresse mail..."
      />
    </Box>
    <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: "1rem" }}>
      <IconButton onClick={handleNotificationClick}>
      <Badge 
      overlap="circular" 
      anchorOrigin={{ 
        vertical: 'top', 
        horizontal: 'right' 
      }} 
      badgeContent={<span style={{ backgroundColor: 'red', width: 8, height: 8, borderRadius: '50%' }} />} 
    >
      <Notifications />
    </Badge>
      </IconButton>
      <div style={{ position: 'relative' }}>
      <img
        src={profile}
        alt="Profile"
        style={{
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 2,
          right: 2,
          width: '0.5rem', // Adjust size as needed
          height: '0.5rem',
          borderRadius: '50%',
          backgroundColor: 'green',
        }}
      />
    </div>
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
    sx={{ mt: "0rem" }}
  >
    <Box
      sx={{
        width: "20rem", // Adjusted width
        maxHeight: "18rem", // Adjusted height
        overflow: "auto",
        padding: "1rem", // Adjusted padding
        borderRadius: "0.5rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "0.5rem",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "500", fontSize: "0.875rem" }}
        >
          Notifications
        </Typography>
        <Typography
          variant="body2"
          fontSize="0.75rem"
          color="primary"
          sx={{ cursor: "pointer" }}
          onClick={() => console.log("Mark all as read")}
        >
          Marquer tout comme lu
        </Typography>
      </Box>
      <List>
        {notifications.map((notification, index) => (
          <ListItem key={index} sx={{ padding: "0.4rem" }}>
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor: "#0C66E6",
                  fontSize: "0.875rem", // Using rem for font size
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography fontSize='0.875rem' fontWeight="500">
                    {notification.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      marginLeft: "auto",
                      whiteSpace: "nowrap",
                      fontSize: "0.625rem", // Using rem for font size
                      fontWeight: "400",
                    }}
                  >
                    {notification.timestamp}
                  </Typography>
                </Box>
              }
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                >
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
