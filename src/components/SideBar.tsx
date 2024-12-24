import React, { useState } from 'react';
import logoIcon from '../assets/logo.svg';
import profile from '../assets/profile.png';
import { Box, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import { PiFiles, PiLockSimpleOpenLight, PiUsersThreeLight } from 'react-icons/pi';
import { GoGraph, GoHome } from 'react-icons/go';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { SlPlane } from 'react-icons/sl';
import { IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-router-dom';

// Define types for the sidebar items
interface SublistItem {
  text: string;
}

interface SidebarItem {
  text: string;
  icon: React.ReactNode;
  link?: string;
  hasSublist?: boolean;
  sublist?: SublistItem[];
  count?: number;
}

const SideBar: React.FC = () => {
  const [isSublistOpen, setIsSublistOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null); // Track the selected item
  const [selectedSublist, setSelectedSublist] = useState<string | null>(null); // Track the selected sublist item

  const toggleSublist = () => {
    setIsSublistOpen(!isSublistOpen);
  };

  const handleItemClick = (itemText: string, hasSublist: boolean, sublist?: SublistItem[]) => {
    setSelectedItem(itemText); // Set the selected item
    if (hasSublist) {
      toggleSublist(); // Toggle sublist if the item has a sublist
      if (sublist && sublist.length > 0) {
        setSelectedSublist(sublist[0].text); // Set the first sublist item as selected
      }
    }
  };

  const handleSublistClick = (subitemText: string) => {
    setSelectedSublist(subitemText); // Set the selected sublist item
  };

  const sidebarItems: SidebarItem[] = [
    { text: 'Accueil', icon: <GoHome size="20px" /> },
    { text: 'Accès administrateur', icon: <PiLockSimpleOpenLight size="20px" />, link: '/page4' },
    {
      text: 'Statistiques',
      icon: <GoGraph size="20px" />,
      link:'/page10',
      hasSublist: true,
      sublist: [
        { text: 'Nombre de prestations' },
        { text: 'Argent généré' },
        { text: 'Carte par région' },
        { text: 'Note de satisfaction' },
      ],
    },
    { text: 'Planning', icon: <FaRegCalendarAlt size="20px" /> },
    { text: 'Prestations', icon: <PiUsersThreeLight size="20px" /> },
    { text: 'Salaires', icon: <PiFiles size="20px" />, count: 10 },
    { text: 'Factures', icon: <PiFiles size="20px" /> },
    { text: 'Congés payés', icon: <SlPlane size="20px" />, count: 4 },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: "280px",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "280px",
          boxSizing: "border-box",
          borderRight: "1px solid #E2E8F0",
        },
      }}
    >
      <Box sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: '8px', ml: '16px', marginTop: '32px' }}>
        <Box sx={{ bgcolor: '#0C66E6', borderRadius: '4px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={logoIcon} alt="Logo" style={{ width: 24, height: 24 }} />
        </Box>
        <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
          AMME
        </Typography>
      </Box>

      <List sx={{ px: '12px', mt: '50px', fontSize: '14px', fontWeight: '500' }}>
        {sidebarItems.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem
              sx={{
                borderRadius: 1,
                py: '12px',
                minHeight: '36px',
                bgcolor: selectedItem === item.text ? 'rgba(12, 102, 230, 0.1)' : 'transparent', // Highlight selected item
                color: selectedItem === item.text ? '#151515' : '#818EA0', // Change text color for selected item
                '&:hover': { bgcolor: 'rgba(12, 102, 230, 0.1)' },
              }}
              onClick={() => handleItemClick(item.text, !!item.hasSublist)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
                {item.icon}
                {item.link ? (
                  <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemText
                      primary={item.text}
                      sx={{
                        m: 0,
                        '& .MuiTypography-root': {
                          fontSize: '14px',
                          fontWeight: '600',
                        },
                      }}
                    />
                  </Link>
                ) : (
                  <ListItemText
                    primary={item.text}
                    sx={{
                      m: 0,
                      '& .MuiTypography-root': {
                        fontSize: '14px',
                        fontWeight: '600',
                      },
                    }}
                  />
                )}
                {item.hasSublist && (
                  <IoIosArrowDown
                    size="16px"
                    style={{
                      transform: isSublistOpen ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.2s ease',
                    }}
                  />
                )}
                {item.count && (
                  <Box
                    sx={{
                      bgcolor: '#E9EEF6',
                      borderRadius: '4px',
                      px: 1,
                      py: 0.25,
                      minWidth: '20px',
                      fontSize: '14px',
                      fontWeight: '500',
                      textAlign: 'center',
                    }}
                  >
                    {item.count}
                  </Box>
                )}
              </Box>
            </ListItem>

            {item.hasSublist && isSublistOpen && (
              <List sx={{ pl: 2, borderLeft: "2px solid #E9EEF6", ml: 3, py: 0 }}>
                {item.sublist?.map((subitem) => (
                  <ListItem
                    key={subitem.text}
                    sx={{
                      borderRadius: 1,
                      py: 0.75,
                      fontSize: '14px',
                      fontWeight: '500',
                      gap: '20px',
                      minHeight: '32px',
                      color: selectedSublist === subitem.text ? '#151515' : '#818EA0', // Highlight selected sublist item
                      '&:hover': { color: '#151515' },
                    }}
                    onClick={() => handleSublistClick(subitem.text)} // Handle sublist item click
                  >
                    <ListItemText
                      primary={subitem.text}
                      sx={{
                        m: 0,
                        '& .MuiTypography-root': {
                          fontSize: '14px',
                          fontWeight: '500',
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </React.Fragment>
        ))}
      </List>

      <Box sx={{ mt: 'auto', p: 1.5, borderTop: '1px solid #E9EEF6' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <img
            src={profile}
            alt="Profile"
            style={{ width: 40, height: 40, borderRadius: '50%' }}
          />
          <Box>
            <Typography sx={{ fontSize: '13px', fontWeight: '500' }}>
              Zoubir MOHAMED
            </Typography>
            <Typography sx={{ fontSize: '12px', color: '#818EA0' }}>
              Super administrateur
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default SideBar;
