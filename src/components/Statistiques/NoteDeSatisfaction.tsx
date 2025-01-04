import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  IconButton,
  Table,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import { AiFillStar } from "react-icons/ai";
import NavBar from "../NavBar";
import SideBar from "../SideBar";
import Calendar from "./Calendar";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { PiSortAscendingLight } from "react-icons/pi";
import { ChevronLeft, ChevronRight } from "lucide-react";

const demoData = [
  {
    id: 1,
    nurse: "Delphin Dupuy",
    comment: "Service pas top, j'ai besoin d'aide",
    location: "Dunkerque",
    date: "12/05/2024",
    profession: "Salarié",
    rating: 3,
  },
  {
    id: 2,
    nurse: "Delphin Dupuy",
    comment: "Service excellent",
    location: "Le Tampon",
    date: "05/09/2024",
    profession: "Libéral",
    rating: 5,
  },
  {
    id: 3,
    nurse: "Agilbert Laurent",
    comment: "Très satisfait",
    location: "Amiens",
    date: "30/04/2024",
    profession: "Salarié",
    rating: 4,
  },
  {
    id: 4,
    nurse: "Rita Da Silva",
    comment: "Service moyen",
    location: "Vénissieux",
    date: "20/03/2024",
    profession: "Libéral",
    rating: 3,
  },
  {
    id: 5,
    nurse: "Agilberte Martin",
    comment: "Besoin d'amélioration",
    location: "Mulhouse",
    date: "12/05/2024",
    profession: "Libéral",
    rating: 2,
  },
  {
    id: 6,
    nurse: "Agilberte Martin",
    comment: "Besoin d'amélioration",
    location: "Mulhouse",
    date: "12/05/2024",
    profession: "Libéral",
    rating: 2,
  },
  {
    id: 7,
    nurse: "Agilberte Martin",
    comment: "Besoin d'amélioration",
    location: "Mulhouse",
    date: "12/05/2024",
    profession: "Libéral",
    rating: 2,
  },
  {
    id: 8,
    nurse: "Agilberte Martin",
    comment: "Besoin d'amélioration",
    location: "Mulhouse",
    date: "12/05/2024",
    profession: "Libéral",
    rating: 2,
  },
  {
    id: 9,
    nurse: "Agilberte Martin",
    comment: "Besoin d'amélioration",
    location: "Mulhouse",
    date: "12/05/2024",
    profession: "Libéral",
    rating: 2,
  },
  {
    id: 10,
    nurse: "Agilberte Martin",
    comment: "Besoin d'amélioration",
    location: "Mulhouse",
    date: "12/05/2024",
    profession: "Libéral",
    rating: 2,
  },
  {
    id: 11,
    nurse: "Agilberte Martin",
    comment: "Besoin d'amélioration",
    location: "Mulhouse",
    date: "12/05/2024",
    profession: "Libéral",
    rating: 2,
  },
  {
    id: 12,
    nurse: "Agilberte Martin",
    comment: "Besoin d'amélioration",
    location: "Mulhouse",
    date: "12/05/2024",
    profession: "Libéral",
    rating: 2,
  },
];

const RatingStars = ({ rating }) => {
  return (
    <Box sx={{ display: "flex", gap: 0.5 }}>
      {[1, 2, 3, 4, 5].map((num) => (
        <AiFillStar
          key={num}
          size={20}
          color={num <= rating ? "#FFD700" : "#E0E0E0"}
        />
      ))}
    </Box>
  );
};

export default function NoteDeSatisfaction() {
    const [selectedFilter, setSelectedFilter] = useState<string>("Infirmier(s)");
  const [selectedNurse, setSelectedNurse] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(demoData.length / rowsPerPage);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  // Calculate average rating
  const averageRating = useMemo(() => {
    const total = demoData.reduce((sum, item) => sum + item.rating, 0);
    return (total / demoData.length).toFixed(1);
  }, []);

  // Filter data based on selections
  const filteredData = useMemo(() => {
    return demoData.filter((row) => {
      return (
        (selectedNurse ? row.nurse === selectedNurse : true) &&
        (selectedRegion ? row.location === selectedRegion : true)
      );
    });
  }, [selectedNurse, selectedRegion]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredData.slice(start, end);
  }, [filteredData, page, rowsPerPage]);

  return (
    <Box sx={{ display: "flex", bgcolor: "white", minHeight: "100vh" }}>
      {/* <SideBar /> */}
      <Box sx={{ flex: 1, }}>
        <NavBar />
        <Box
          sx={{
           position:'relative',
            px: 3, py:2,
            backgroundColor: "white",
            height: "calc(100vh - 70px)",
            display:'flex',
            flexDirection:'column'
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              mb: 3,
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="h5"
                
                sx={{ fontSize: "24px", fontWeight: "600" ,mb:'8px'}}
              >
                Note de satisfaction
              </Typography>
              <Typography
                variant="body2"
                sx={{
                    color: "#818EA0" , fontSize:'14px', fontWeight:'400', mb:1 
                }}
              >
                Veuillez retrouver ici l'ensemble des notes de satisfaction
              </Typography>
            </Box>

            <Card
              sx={{
                minWidth: isMobile ? "100%" : "200px",
                height: "120px",
                boxShadow:'none',
                borderRadius: "8px",
                border: "1px solid #E2E8F0"
                
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "center",
                  p: "16px !important", // Override default padding
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#151515",
                      fontSize: "16px",
                      fontWeight:'500',
                      mb: 1,
                    }}
                  >
                    Note moyenne globale
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "green",
                      display: "flex",
                      alignItems: "center",
                      fontWeight: 500,
                    }}
                  >
                    <IoIosArrowUp style={{ fontSize: "10px" }} />
                    +12%{" "}
                    <span style={{ color: "black", marginLeft: "5px" ,fontWeight:'10px',}}>
                      vs mois dernier
                    </span>
                  </Typography>
                </Box>

                {/* rating card */}
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "#0C66E6",
                      fontSize: "36px",
                      fontWeight:'500'
                    }}
                  >
                    {averageRating}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#0C66E6",
                      fontSize: "36px",
                      fontWeight:'500'
                    }}
                  >
                    /5
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Filters */}
          <Box
  sx={{
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: 2,
  }}
>
  <Select
    value={selectedNurse}
    onChange={(e) => setSelectedNurse(e.target.value)}
    displayEmpty
    fullWidth
    sx={{
      bgcolor: "white",
      height: 40,
      "& .MuiSelect-select": {
        py: 0, // Adjust padding to align text properly
        height: "100%", // Ensures the text aligns within the given height
        display: "flex",
        alignItems: "center",
      },
      flex: isMobile ? "none" : 1,
    }}
  >
    <MenuItem value="">
      Sélectionner une infirmière parmi la liste
    </MenuItem>
    {Array.from(new Set(demoData.map((d) => d.nurse))).map((nurse) => (
      <MenuItem key={nurse} value={nurse}>
        {nurse}
      </MenuItem>
    ))}
  </Select>

  <Select
    value={selectedRegion}
    onChange={(e) => setSelectedRegion(e.target.value)}
    displayEmpty
    fullWidth
    sx={{
      bgcolor: "white",
      height: 40,
      "& .MuiSelect-select": {
        py: 0, // Adjust padding
        height: "100%",
        display: "flex",
        alignItems: "center",
      },
      flex: isMobile ? "none" : 1,
    }}
  >
    <MenuItem value="">
      Sélectionner une région parmi la liste
    </MenuItem>
    {Array.from(new Set(demoData.map((d) => d.location))).map((location) => (
      <MenuItem key={location} value={location}>
        {location}
      </MenuItem>
    ))}
  </Select>

  <Box sx={{ width: isMobile ? "100%" : "auto" }}>
    <Calendar />
  </Box>
</Box>


          <Box
            sx={{
              mt: "25px",
              mb: 2,
              display: "flex",
              gap: 2,
              boxSizing: "border-box",
              borderBottom: "1px solid #E2E8F0",
            }}
          >
            <Button
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                color:
                  selectedFilter === "Infirmier(s)"
                    ? "primary.main"
                    : "text.secondary",
                borderBottom: selectedFilter === "Infirmier(s)" ? 2 : 0,
                borderColor: "primary.main",
                textTransform: "none",
                typography: "body2",
                paddingY: "1px",
              }}
              onClick={() => handleFilterClick("Infirmier(s)")}
            >
              Infirmier(s)
            </Button>
            <Button
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                color:
                  selectedFilter === "Patient(s)"
                    ? "primary.main"
                    : "text.secondary",
                borderBottom: selectedFilter === "Patient(s)" ? 2 : 0,
                borderColor: "primary.main",
                textTransform: "none",
                typography: "body2",
              }}
              onClick={() => handleFilterClick("Patient(s)")}
            >
              Patient(s)
            </Button>
            
          </Box>

          {/* Table */}
          <TableContainer component={Paper} elevation={0} sx={{ boxShadow: "none" }}>
            <Table size='small'>
              <TableHead sx={{ backgroundColor: "#F6F7F9" }}>
                <TableRow>
                  <TableCell
                    sx={{  color: "#818EA0", fontSize: "14px" ,fontWeight:'500', borderBottom: "none",}}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    Infirmière <PiSortAscendingLight size={18} />
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{  color: "#818EA0", fontSize: "14px" ,fontWeight:'500', borderBottom: "none",}}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    Note <PiSortAscendingLight size={18} />
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{  color: "#818EA0", fontSize: "14px" ,fontWeight:'500', borderBottom: "none",}}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    Commentaire <PiSortAscendingLight size={18} />
                    </Box>
                    
                  </TableCell>
                  <TableCell
                    sx={{  color: "#818EA0", fontSize: "14px" ,fontWeight:'500', borderBottom: "none",}}
                  >
                    Localisation
                  </TableCell>
                  <TableCell
                    sx={{ color: "#818EA0", fontSize: "14px" ,fontWeight:'500', borderBottom: "none",}}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        Date 
                    <PiSortAscendingLight size={18} />
                    </Box>
                    
                  </TableCell>
                  {selectedFilter === "Infirmier(s)" &&
                    (<TableCell
                        sx={{  color: "#818EA0", fontSize: "14px" ,fontWeight:'500', borderBottom: "none",}}
                      >
                        Profession
                      </TableCell>
                    )}
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell
                      sx={{  fontSize: "14px",fontWeight:'500',  p: "20px",borderBottom:'1px solid #F6F7F9'  }}
                    >
                      {row.nurse}
                    </TableCell>
                    <TableCell
                    sx={{ width: "16%", fontSize: "14px",fontWeight:'500',  p: "20px",borderBottom:'1px solid #F6F7F9'  }}>
                      <RatingStars rating={row.rating} />
                    </TableCell>
                    <TableCell
                      sx={{  fontSize: "14px",fontWeight:'500',  p: "20px",borderBottom:'1px solid #F6F7F9'  }}
                    >
                      {row.comment}
                    </TableCell>
                    <TableCell
                      sx={{  fontSize: "14px",fontWeight:'500',  p: "20px",borderBottom:'1px solid #F6F7F9'  }}
                    >
                      {row.location}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: "14px",fontWeight:'500',  p: "20px",borderBottom:'1px solid #F6F7F9'  }}
                    >
                      {row.date}
                    </TableCell>
                    {selectedFilter === "Infirmier(s)" &&
                    (<TableCell
                        sx={{  fontSize: "14px",fontWeight:'500',  p: "20px",borderBottom:'1px solid #F6F7F9'  }}
                      >
                        {row.profession}
                      </TableCell>
                    )}
                    
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {/* Footer */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            position: "sticky",
            bottom: 0,
            backgroundColor: "white",
            borderTop: "1px solid #E0E0E0",
            mt: 2, // Add a top margin to separate it from the content
          }}
        >
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)" }}
          >
            {`${(page - 1) * rowsPerPage + 1}-${Math.min(
              page * rowsPerPage,
              filteredData.length
            )} sur ${filteredData.length}`}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={() => handleChangePage(page - 1)}
              disabled={page === 1}
              size="small"
            >
              <ChevronLeft />
            </IconButton>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)",
              }}
            >
              {page} / {totalPages}
            </Typography>
            <IconButton
              onClick={() => handleChangePage(page + 1)}
              disabled={page === totalPages}
              size="small"
            >
              <ChevronRight/>
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
