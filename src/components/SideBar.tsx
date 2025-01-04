import React, { useState, useRef, SetStateAction, Dispatch } from "react";
import logoIcon from "../assets/logo.svg";
import profile from "../assets/profile.png";
import question from "../assets/questionMark.svg"
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Modal,
  Button,
} from "@mui/material";
import {
  PiFiles,
  PiLockSimpleOpenLight,
  PiUsersThreeLight,
} from "react-icons/pi";
import { GoGraph, GoHome } from "react-icons/go";
import { FaRegCalendarAlt } from "react-icons/fa";
import { SlPlane } from "react-icons/sl";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { PersonOutline, Settings, Logout } from "@mui/icons-material";

interface SublistItem {
  text: string;
  link?: string;
}

interface SidebarItem {
  text: string;
  icon: React.ReactNode;
  link?: string;
  hasSublist?: boolean;
  sublist?: SublistItem[];
  count?: number;
}

interface SidebarProps {
  selectedSublist?: string | null;
  setSelectedSublist?: Dispatch<SetStateAction<string | null>>
}

const SideBar: React.FC<SidebarProps> = () => {
  const [isSublistOpen, setIsSublistOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [selectedSublist, setSelectedSublist] = useState<string>(
          "Nombre de prestations"
      );
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleSublist = () => {
    setIsSublistOpen(!isSublistOpen);
  };

  const handleItemClick = (
    event: React.MouseEvent, 
    itemText: string,
    hasSublist: boolean,
    link?: string,
    sublist?: SublistItem[]
  ) => {
    event.preventDefault();
  event.stopPropagation();
    // // If clicking on a non-Statistics item, close the sublist
    // if (itemText !== "Statistiques") {
    //   setIsSublistOpen(false);
    // }

    setSelectedItem(itemText);

    if (hasSublist) {
      // Toggle sublist only if clicking on Statistics
      if (itemText === "Statistiques") {
        setIsSublistOpen(!isSublistOpen);
        // if (!isSublistOpen && sublist && sublist.length > 0) {
        //   setSelectedSublist && setSelectedSublist(sublist[0].text);
        // }
      }
    } else if (link) {
      navigate(link);
    }
  };


  const handleProfileClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSublistClick = (subitemText: string) => {
    setSelectedSublist &&
    setSelectedSublist(subitemText);
  };

  const calculateModalPosition = () => {
    if (profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      return {
        top: rect.top - 90, // Adjust height as per modal's content
        left: rect.left + rect.width / 2,
      };
    }
    return { top: "50%", left: "50%" };
  };

  const modalStyle = {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    width: 250,
    bgcolor: "background.paper",
    boxShadow: 12,
    p: 2,
    borderRadius: "8px",
    ...calculateModalPosition(),
  };

  const sidebarItems: SidebarItem[] = [
    { text: "Accueil", icon: <GoHome size="20px" /> },
    {
      text: "Accès administrateur",
      icon: <PiLockSimpleOpenLight size="20px" />,
      link: "/access-administration",
    },
    {
      text: "Statistiques",
      icon: <GoGraph size="20px" />,
      link: "/statistiques/prestations",
      hasSublist: true,
      sublist: [
        { text: "Nombre de prestations", link: "/statistiques/prestations" },
        { text: "Argent généré", link: "/statistiques/argent" },
        { text: "Carte par région", link: "/statistiques/carte" },
        { text: "Note de satisfaction", link: "/statistiques/satisfaction" },
      ],
    },
    { text: "Planning", icon: <FaRegCalendarAlt size="20px" />, link: "/planning" },
    {
      text: "Prestations",
      icon: <PiUsersThreeLight size="20px" />,
      link: "/presentation",
    },
    { text: "Salaires", icon: <PiFiles size="20px" />, count: 10, link: "/salaires" },
    { text: "Factures", icon: <PiFiles size="20px" />, link: "/factures" },
    {
      text: "Congés payés",
      icon: <SlPlane size="20px" />,
      count: 4,
      link: "/conges-payes",
    },
  ];

  const handleLogout = () => {
    setIsModalOpen(false);
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    setIsLogoutModalOpen(false);
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  const logoutModalStyle = {
    position: 'absolute',
    bottom: '-6%',
    left: '8%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: 'background.paper',
    height:'241px',
    borderRadius: '8px',
    p: 4,
    boxShadow: 12,
    outline: 'none',
  };


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
      <Box sx={{  display: "flex", alignItems: "center", gap: "8px", ml: "24px", marginTop: "32px" }}>
        <Box
          sx={{
            bgcolor: "#0C66E6",
            borderRadius: "4px",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={logoIcon} alt="Logo" style={{ width: 24, height: 24 }} />
        </Box>
        <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>AMME</Typography>
      </Box>

      <List sx={{ px: "12px", mt: "50px", fontSize: "14px", fontWeight: "500", py:'4px' }}>
        {sidebarItems.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem
              sx={{
                borderRadius: 1,
                py: "10px",
                minHeight: "30px",
                cursor:'pointer',
                color: selectedItem === item.text ? "#0C66E6" : "#151515",
                "&:hover": { bgcolor: "rgba(12, 102, 230, 0.1)" },
              }}
              onClick={(e) => handleItemClick(e, item.text, !!item.hasSublist, item.link, item.sublist)}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
                {item.icon}
                {item.link ? (
                  <Link to={item.link} style={{ textDecoration: "none", color: "inherit" }}>
                    <ListItemText
                      primary={item.text}
                      sx={{
                        m: 0,
                        "& .MuiTypography-root": { fontSize: "14px", fontWeight: "600" },
                      }}
                    />
                  </Link>
                ) : (
                  <ListItemText
                    primary={item.text}
                    sx={{
                      m: 0,
                      "& .MuiTypography-root": { fontSize: "14px", fontWeight: "600" },
                    }}
                  />
                )}
                {item.hasSublist && (
                  <IoIosArrowDown
                    size="16px"
                    style={{
                      transform: isSublistOpen ? "rotate(180deg)" : "rotate(0)",
                      transition: "transform 0.2s ease",
                    }}
                  />
                )}
                {item.count && (
                  <Box
                    sx={{
                      bgcolor: "#E9EEF6",
                      borderRadius: "4px",
                      px: 1,
                      py: 0.25,
                      minWidth: "20px",
                      fontSize: "14px",
                      fontWeight: "500",
                      textAlign: "right",
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
                   <Link
                   to={subitem.link || ""}
                   style={{
                     textDecoration: "none",
                     color: "inherit",
                     display: 'block',
                     width: '100%'
                    }}
                    key={subitem.text}
                 >
                  <ListItem
                    key={subitem.text}
                    sx={{
                      borderRadius: 1,
                      py: 0.75,
                      fontSize: "14px",
                      fontWeight: "500",
                      gap: "20px",
                      minHeight: "32px",
                      color: selectedSublist === subitem.text ? "#151515" : "#818EA0",
                      "&:hover": { color: "#151515" },
                    }}
                    onClick={() => handleSublistClick(subitem.text)}
                  >
                    <ListItemText
                      primary={subitem.text}
                      sx={{
                        m: 0,
                        "& .MuiTypography-root": { fontSize: "14px", fontWeight: "500" },
                      }}
                    />
                  </ListItem>
                  </Link>
                ))}
              </List>
            )}
          </React.Fragment>
        ))}
      </List>

      <Box
        ref={profileRef}
        sx={{ mt: "auto", width:'264px',height:'57px', p: 1.5, border: "1px solid #E9EEF6", display: "flex", alignItems: "center", gap: 1.5, cursor: "pointer" , backgroundColor:'#F6F7F9', ml:'8px', mb:'10px', borderRadius:'8px'}}
        onClick={handleProfileClick}
      >
        <img src={profile} alt="Profile" style={{ width: 40, height: 40, borderRadius: "50%" }} />
        <Box>
          <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>Zoubir MOHAMED</Typography>
          <Typography sx={{ fontSize: "12px", color: "#818EA0" }}>Super administrateur</Typography>
        </Box>
      </Box>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="profile-modal-title"
        aria-describedby="profile-modal-description"
        BackdropProps={{
          style: { backgroundColor: "transparent" },
        }}
      >
        <Box sx={modalStyle}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography sx={{ fontSize: "14px", fontWeight: "400", color:'#818EA0' }}>AMME Application 2024</Typography>
            <Typography sx={{ fontSize: "12px", ml: "auto" }}>v1.0.1</Typography>
          </Box>
          <Box sx={{ borderBottom: "1px solid #E2E8F0", mt: 1, mb: 1 }} />
          <List sx={{ py: 0 }}>
            <ListItem sx={{ display: "flex", alignItems: "center", gap: 1, py: 1 }}>
              <PersonOutline fontSize="small" />
              <ListItemText
                primary="Mon Compte"
                sx={{
                  m: 0,
                  "& .MuiTypography-root": { fontSize: "14px", fontWeight: "500" },
                }}
              />
            </ListItem>
            <ListItem  sx={{ display: "flex", alignItems: "center", gap: 1, py: 1 }}>
              <Settings fontSize="small" />
              <ListItemText
                primary="Paramètres"
                sx={{
                  m: 0,
                  "& .MuiTypography-root": { fontSize: "14px", fontWeight: "500" },
                }}
              />
            </ListItem>
            <ListItem  onClick={handleLogout}
              sx={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 1, 
                py: 1,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              <Logout fontSize="small" />
              <ListItemText
                primary="Déconnexion"
                sx={{
                  m: 0,
                  "& .MuiTypography-root": { fontSize: "14px", fontWeight: "500" },
                }}
              />
            </ListItem>
          </List>
        </Box>
      </Modal>

      <Modal
        open={isLogoutModalOpen}
        onClose={handleCancelLogout}
        aria-labelledby="logout-confirmation-modal"
        BackdropProps={{
          style: { backgroundColor: "transparent" },
        }}
      >
        <Box sx={logoutModalStyle}>
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <Box sx={{ 
              width: '48px',
              height: '48px',
              bgcolor: '#F1F5F9',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2
            }}>
              <img src={question} alt="question" />
            </Box>

            <Typography
              id="logout-confirmation-title"
              sx={{ 
                fontSize: '14px',
                fontWeight: '400',
                color: '#151515',
                textAlign: 'center',
                mb: 3
              }}
            >
              Êtes-vous sûr.e de vouloir vous déconnecter ?
            </Typography>

            <Box sx={{ 
              display: 'flex',
              gap: 2,
              width: '100%'
            }}>
              <Button
                onClick={handleCancelLogout}
                fullWidth
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  height: '40px',
                  fontSize: '12px',
                  fontWeight: '400',
                  borderColor: '#E2E8F0',
                  color: '#0C66E6',
                  '&:hover': {
                    borderColor: '#CBD5E1',
                    bgcolor: 'transparent'
                  }
                }}
              >
                Annuler
              </Button>
              <Button
                onClick={handleConfirmLogout}
                fullWidth
                variant="contained"
                sx={{
                  textTransform: 'none',
                  height: '40px',
                  fontSize: '12px',
                  fontWeight: '400',
                  bgcolor: '#0C66E6',
                  '&:hover': {
                    bgcolor: '#0C66E6'
                  }
                }}
              >
                Déconnexion
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Drawer>
  );
};

export default SideBar;
