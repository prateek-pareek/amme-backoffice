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
    if (itemText !== "Statistiques" && isSublistOpen) {
      setIsSublistOpen(false);
    }

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
    position: 'absolute',
    bottom: '5rem',
    left: '1rem',
    // transform: 'translate(-50%, -50%)',
    width: '16rem',
    height:'14rem',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    p: 4,
  };

  const sidebarItems: SidebarItem[] = [
    // { text: "Accueil", icon: <GoHome size="20px" /> },
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
    bottom: '5rem',
    left: '1rem',
    // transform: 'translate(-50%, -50%)',
    width: '16rem',
    height:'14rem',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    p: 4,
    boxShadow: 12,
    outline: 'none',
  };


  return (
    <Drawer
      variant="permanent"
      sx={{
        width: "17.5rem",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "17.5rem",
          boxSizing: "border-box",
          borderRight: "1px solid #E2E8F0",
        },
      }}
    >
      <Box sx={{  display: "flex", alignItems: "center", gap: "0.5rem", ml: "1.5rem", marginTop: "2rem" }}>
        <Box
          sx={{
            bgcolor: "#0C66E6",
            borderRadius: "0.25rem",
            width: "2rem",
            height: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={logoIcon} alt="Logo" style={{ width: 24, height: 24 }} />
        </Box>
        <Typography sx={{ fontSize: "0.875rem", fontWeight: "600" }}>AMME</Typography>
      </Box>

      <List sx={{ px: "0.75rem", mt: "4rem", fontSize: "0.875rem", fontWeight: "500", py: '0.25rem' }}>
    {sidebarItems.map((item) => (
        <React.Fragment key={item.text}>
            <ListItem
                sx={{
                    borderRadius: '0.125rem',
                    py: "0.625rem",
                    minHeight: "1.875rem",
                    cursor: 'pointer',
                    color: selectedItem === item.text ? "#0C66E6" : "#151515",
                    "&:hover": { bgcolor: "rgba(12, 102, 230, 0.1)" },
                    position: "relative", // Enable relative positioning for absolute child
                }}
                onClick={(e) => handleItemClick(e, item.text, !!item.hasSublist, item.link, item.sublist)}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: '0.9375rem', flex: 1 }}>
                    {item.icon}
                    {item.link ? (
                        <Link to={item.link} style={{ textDecoration: "none", color: "inherit" }}>
                            <ListItemText
                                primary={item.text}
                                sx={{
                                    m: 0,
                                    "& .MuiTypography-root": { fontSize: "0.875rem", fontWeight: "600" },
                                }}
                            />
                        </Link>
                    ) : (
                        <ListItemText
                            primary={item.text}
                            sx={{
                                m: 0,
                                "& .MuiTypography-root": { fontSize: "0.875rem", fontWeight: "600" },
                            }}
                        />
                    )}
                    {item.hasSublist && (
                       <Box
                       sx={{
                           position: "absolute",
                           right: '1.5rem', // Align to the right
                           top: "50%", // Vertically center
                           transform: "translateY(-50%)", // Adjust for centering
                           px: '0.625rem',
                           py: '0.125rem',
                           width: "1.5rem",
                           height:'1.5rem',
                           fontSize: "0.875rem",
                           fontWeight: "500",
                           textAlign: "right",
                       }}
                   >
                        <IoIosArrowDown
                            size="1rem"
                            style={{
                                transform: isSublistOpen ? "rotate(180deg)" : "rotate(0)",
                                transition: "transform 0.2s ease",
                            }}
                        />
                        </Box>
                    )}
                </Box>
                {item.count && (
                    <Box
                        sx={{
                            position: "absolute",
                            right: '1rem', // Align to the right
                            top: "50%", // Vertically center
                            transform: "translateY(-50%)", // Adjust for centering
                            bgcolor: "#E9EEF6",
                            borderRadius: "1rem",
                            px: '0.625rem',
                            py: '0.125rem',
                            minWidth: "1.25rem",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            textAlign: "right",
                        }}
                    >
                        {item.count}
                    </Box>
                )}
            </ListItem>

            {item.hasSublist && isSublistOpen && (
                <List sx={{ pl: '0.5rem', borderLeft: "2px solid #E9EEF6", ml: '1.875rem', py: 0 }}>
                    {item.sublist?.map((subitem) => (
                        <Link
                            to={subitem.link || ""}
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                                display: 'block',
                                width: '100%',
                            }}
                            key={subitem.text}
                        >
                            <ListItem
                                key={subitem.text}
                                sx={{
                                    borderRadius: '0.125rem',
                                    py: '0.4375rem',
                                    fontSize: "0.875rem",
                                    fontWeight: "500",
                                    gap: "1.25rem",
                                    minHeight: "2rem",
                                    color: selectedSublist === subitem.text ? "#151515" : "#818EA0",
                                    "&:hover": { color: "#151515" },
                                }}
                                onClick={() => handleSublistClick(subitem.text)}
                            >
                                <ListItemText
                                    primary={subitem.text}
                                    sx={{
                                        m: 0,
                                        "& .MuiTypography-root": { fontSize: "0.875rem", fontWeight: "500" },
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
    sx={{ 
        mt: "auto", 
        width:'16.5rem', 
        height:'3.5625rem', 
        p: '0.9375rem', 
        border: "1px solid #E9EEF6", 
        display: "flex", 
        alignItems: "center", 
        gap: '0.9375rem', 
        cursor: "pointer", 
        backgroundColor:'#F6F7F9', 
        ml:'0.5rem', 
        mb:'0.625rem', 
        borderRadius:'0.5rem' 
    }}
    onClick={handleProfileClick}
>
    <img src={profile} alt="Profile" style={{ width: '2.5rem', height: '2.5rem', borderRadius: "50%" }} />
    <Box>
        <Typography sx={{ fontSize: "0.8125rem", fontWeight: "500" }}>Zoubir MOHAMED</Typography>
        <Typography sx={{ fontSize: "0.75rem", color: "#818EA0" }}>Super administrateur</Typography>
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
        <Box sx={{ display: "flex", alignItems: "center", mb: '0.625rem' }}>
            <Typography sx={{ fontSize: "0.875rem", fontWeight: "400", color:'#818EA0' }}>AMME Application 2024</Typography>
            <Typography sx={{ fontSize: "0.75rem", ml: "auto" }}>v1.0.1</Typography>
        </Box>
        <Box sx={{ borderBottom: "1px solid #E2E8F0", mt: '0.625rem', mb: '0.625rem' }} />
        <List sx={{ py: 0 }}>
            <ListItem sx={{ display: "flex", alignItems: "center", gap: '0.625rem', py: '0.625rem' }}>
                <PersonOutline fontSize="small" />
                <ListItemText
                    primary="Mon Compte"
                    sx={{
                        m: 0,
                        "& .MuiTypography-root": { fontSize: "0.875rem", fontWeight: "500" },
                    }}
                />
            </ListItem>
            <ListItem sx={{ display: "flex", alignItems: "center", gap: '0.625rem', py: '0.625rem' }}>
                <Settings fontSize="small" />
                <ListItemText
                    primary="Paramètres"
                    sx={{
                        m: 0,
                        "& .MuiTypography-root": { fontSize: "0.875rem", fontWeight: "500" },
                    }}
                />
            </ListItem>
            <ListItem 
                onClick={handleLogout}
                sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: '0.625rem', 
                    py: '0.625rem',
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
                        "& .MuiTypography-root": { fontSize: "0.875rem", fontWeight: "500" },
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
                width: '3rem', 
                height: '3rem', 
                bgcolor: '#F1F5F9', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                mb: '1.25rem' 
            }}>
                <img src={question} alt="question" />
            </Box>

            <Typography
                id="logout-confirmation-title"
                sx={{ 
                    fontSize: '0.875rem', 
                    fontWeight: '400', 
                    color: '#151515', 
                    textAlign: 'center', 
                    mb: '1.875rem' 
                }}
            >
                Êtes-vous sûr.e de vouloir vous déconnecter ?
            </Typography>

            <Box sx={{ 
                display: 'flex', 
                gap: '1.25rem', 
                width: '100%' 
            }}>
                <Button
                    onClick={handleCancelLogout}
                    fullWidth
                    variant="outlined"
                    sx={{
                        textTransform: 'none',
                        height: '2.5rem',
                        fontSize: '0.75rem',
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
                        height: '2.5rem',
                        fontSize: '0.75rem',
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
