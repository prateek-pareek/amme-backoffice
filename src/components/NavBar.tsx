// import React from 'react'
import { Notifications, Search } from "@mui/icons-material"
import { AppBar, Badge, Box, IconButton, InputBase, Toolbar } from "@mui/material"
import profile from '../assets/profile.png';

function NavBar() {
  return (
    <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar sx={{ gap: 2,
              minHeight: "80px",
              boxSizing: "border-box",
              borderBottom: "1px solid #E2E8F0", }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: 400,
                border: '1px solid #E2E8F0',
                borderRadius: 2,
                px: 2,
              }}
            >
              <Search sx={{ color: 'text.secondary' }} />
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Rechercher un nom, prénom, adresse mail..." 
              />
            </Box>
            <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton>
                <Badge badgeContent={1} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
              <img
                src={profile}
                alt="Profile"
                style={{ width: 40, height: 40, borderRadius: '50%' }}
              />
            </Box>
          </Toolbar>
        </AppBar>
  )
}

export default NavBar
