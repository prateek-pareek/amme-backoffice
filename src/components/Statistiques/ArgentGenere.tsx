import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputAdornment,
  List,
  ListItem,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { ResponsiveContainer, XAxis, YAxis, Bar, BarChart } from "recharts";
import NavBar from "../NavBar";
import SideBar from "../SideBar";
import { Search } from "@mui/icons-material";
import DateRangePicker from "./Calendar";

const lineData = [
  5000, 7000, 8000, 9500, 9000, 10000, 9500, 11000, 10000, 12000, 11000, 11500,
];
const months = [
  "JAN",
  "FEV",
  "MAR",
  "AVR",
  "MAI",
  "JUI",
  "JUIL",
  "AOU",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const regions = [
  { name: "ALPES", value: 12000 },
  { name: "BFFC", value: 4000 },
  { name: "BRS", value: 8000 },
  { name: "CVL", value: 6000 },
  { name: "COR", value: 9000 },
  { name: "GES", value: 2000 },
  { name: "HDF", value: 13000 },
  { name: "IDF", value: 5000 },
  { name: "NOR", value: 7000 },
  { name: "NAQ", value: 4000 },
  { name: "OCC", value: 6000 },
  { name: "PDL", value: 11000 },
  { name: "PACA", value: 12000 },
];

const rankingData = [
  { id: 1, name: "Île-de-France" },
  { id: 2, name: "Auvergne-Rhône" },
  { id: 3, name: "Bourgogne-Fr" },
  { id: 4, name: "Occitanie" },
  { id: 5, name: "Nouvelle-Aquitaine" },
  { id: 6, name: "Bretagne" },
];

const initialBarData = [
  { day: "LUNDI", prestations: 75 },
  { day: "MARDI", prestations: 50 },
  { day: "MERCREDI", prestations: 60 },
  { day: "JEUDI", prestations: 81 },
  { day: "VENDREDI", prestations: 45 },
  { day: "SAMEDI", prestations: 30 },
  { day: "DIMANCHE", prestations: 75 },
];

export default function ArgentGenere() {
  const [selectedFilter, setSelectedFilter] = useState<string>("parRegion");
  // const [selectedSublist, setSelectedSublist] = useState<string>(
  //     "Nombre de prestations"
  // );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [barData, setBarData] = useState(initialBarData);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const nurses = [
    "Aphélie Sanchez",
    "Auguste Lacroix",
    "Eugène Morel",
    "Suzanne Carpentier",
    "Timothée Caron",
  ];

  const department = [
    "Côte-d’Or (21)",
    "Doubs (25)",
    "Jura (39)",
    "Nièvre (58)",
    "Haute-Saône (70)",
  ];

  const region = [
    "Auvergne-Rhône-Alpes",
    "Bourgogne-Franche-Comté",
    "Bretagne",
    "Centre-Val de Loire",
    "Corse",
  ];

  const service = ["Aphélie Sanchez", "Auguste Lacroix"];

  const filteredServices = service.filter((ser) =>
    ser.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRegions = region.filter((reg) =>
    reg.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDepartments = department.filter((dep) =>
    dep.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredNurses = nurses.filter((nurse) =>
    nurse.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
    setBarData(initialBarData);
  };

  const handleChangeRegion = (event: any) => {
    setSelectedRegion(event.target.value);
    setBarData(initialBarData);
  };

  const handleChangeDept = (event: any) => {
    setSelectedDepartment(event.target.value);
    setBarData(initialBarData);
  };

  const handleServiceChange = (event: any) => {
    setSelectedService(event.target.value);
    setBarData(initialBarData);
  };

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  const renderPriceData = () => {
    if (selectedValue) {
      return (
        <Container maxWidth="xl">
          <Stack
            spacing={2}
            marginTop={4}
            direction="row"
            justifyContent="space-between"
          >
            <Box
              sx={{
                p: 1.5,
                bgcolor: "background.paper",
                borderRadius: 1,
                border: "1px solid #E2E8F0",
                width: "50%",
              }}
            >
              <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                LACROIX Auguste
              </Typography>
              <Typography
                sx={{ fontSize: "36px", fontWeight: "500", color: "#0C66E6" }}
              >
                €150
              </Typography>
            </Box>

            <Box
              sx={{
                p: 1.5,
                bgcolor: "background.paper",
                borderRadius: 1,
                border: "1px solid #E2E8F0",
                width: "16.6%",
              }}
            >
              <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                Région
              </Typography>
              <Typography
                sx={{ fontSize: "36px", fontWeight: "500", color: "#0C66E6" }}
              >
                €634
              </Typography>
            </Box>

            <Box
              sx={{
                p: 1.5,
                bgcolor: "background.paper",
                borderRadius: 1,
                border: "1px solid #E2E8F0",
                width: "16.6%",
              }}
            >
              <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                Département
              </Typography>
              <Typography
                sx={{ fontSize: "36px", fontWeight: "500", color: "#0C66E6" }}
              >
                €1230
              </Typography>
            </Box>

            <Box
              sx={{
                p: 1.5,
                bgcolor: "background.paper",
                borderRadius: 1,
                border: "1px solid #E2E8F0",
                width: "16.6%",
              }}
            >
              <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                Total
              </Typography>
              <Typography
                sx={{ fontSize: "36px", fontWeight: "500", color: "#0C66E6" }}
              >
                €1839
              </Typography>
            </Box>
          </Stack>

          <Box
            sx={{
              mt: 2,
              borderRadius: "8px",
              border: "1px solid #E2E8F0",
              padding: 2,
              height: "350px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography fontWeight="bold" sx={{ fontSize: "16px" }}>
                Prestations par infirmière
              </Typography>
              <Box
                sx={{
                  width: "250px",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap:'20px'
                }}
              >
                <Button
                  sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    textTransform: "none",
                    color: "#0C66E6",
                    padding:'4px 4px'
                  }}
                >
                  Semaine{" "}
                </Button>
                <Button
                  sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    textTransform: "none",
                    color: "#818EA0",
                    padding:'2px 2px'
                  }}
                >
                  30 derniers jours{" "}
                </Button>
              </Box>
            </Box>

            <Box sx={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barData}
                  margin={{ top: 20, right: 0, left: 0 , bottom:5}}
                >
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: '10px', fontWeight: "400", color: "#818EA0" }}
                    axisLine={{ stroke: "none" }}
                  />
                  <YAxis
                    tick={{
                      fontSize: "10px",
                      fontWeight: "400",
                      color: "#818EA0",
                    }}
                    axisLine={{ stroke: "none" }}
                    domain={[0, 175]}
                    ticks={[0, 25, 50, 75, 100, 125, 150, 175]}
                  />
                  <Bar dataKey="prestations" fill="#0066FF" barSize={16} />
                  <Bar dataKey="prestations" fill="#FFA500" barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Container>
      );
    } else {
      return null;
    }
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#F6F7F9", minHeight: "100vh" }}>
      {/* Sidebar */}
      {/* <SideBar /> */}

      {/* Main content */}
      <Box sx={{ flex: 1 }}>
        <NavBar />

        <Box
          sx={{
            position: "relative",
            p: 3,
            backgroundColor: "white",
            height: "calc(100vh - 60px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontSize: "24px", fontWeight: "600" }}
              >
                Argent généré
              </Typography>
              <Typography
                variant="body2"
                color="#818EA0"
                sx={{ fontSize: "16px", fontWeight: "400" }}
              >
                Veuillez retrouver ici l'ensemble des comptes administrateurs
              </Typography>
            </Box>

            {/* calendar */}
            <div>
              {selectedFilter === "parRegion" ? (
                <DateRangePicker />
              ) : selectedFilter === "parInfirmiere" && selectedValue ? (
                <FormControl
                  sx={{
                    width: "327px",
                    height: "40px",
                  }}
                >
                  <Select
                    value={selectedValue}
                    onChange={handleChange}
                    displayEmpty
                    sx={{
                      height: "40px",
                      "& .MuiMenuItem-root": {
                        fontSize: "14px",
                        fontWeight: "500",
                      },
                    }}
                    // displayEmpty
                    renderValue={(selected) =>
                      selected || "Sélectionner une infirmière"
                    }
                  >
                    <MenuItem disableRipple>
                      <TextField
                        placeholder="Rechercher"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Search />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </MenuItem>
                    {filteredNurses.map((nurse, index) => (
                      <MenuItem key={index} value={nurse}>
                        {nurse}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : selectedFilter === "parTypeDePrestation" &&
                selectedService ? (
                <FormControl
                  sx={{
                    width: "327px",
                    height: "40px",
                  }}
                >
                  <Select
                    value={selectedService}
                    onChange={handleServiceChange}
                    displayEmpty
                    sx={{
                      height: "40px",
                      "& .MuiMenuItem-root": {
                        fontSize: "14px",
                        fontWeight: "500",
                      },
                    }}
                    // displayEmpty
                    renderValue={(selected) =>
                      selected || "Sélectionner une infirmière"
                    }
                  >
                    <MenuItem disableRipple>
                      <TextField
                        placeholder="Rechercher"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Search />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </MenuItem>
                    {filteredServices.map((service, index) => (
                      <MenuItem key={index} value={service}>
                        {service}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : null}
            </div>
          </Box>

          {/* Filter Buttons */}
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
                  selectedFilter === "parRegion"
                    ? "primary.main"
                    : "text.secondary",
                borderBottom: selectedFilter === "parRegion" ? 2 : 0,
                borderColor: "primary.main",
                textTransform: "none",
                typography: "body2",
                paddingY: "2px",
              }}
              onClick={() => handleFilterClick("parRegion")}
            >
              Par région
            </Button>
            <Button
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                color:
                  selectedFilter === "parInfirmiere"
                    ? "primary.main"
                    : "text.secondary",
                borderBottom: selectedFilter === "parInfirmiere" ? 2 : 0,
                borderColor: "primary.main",
                textTransform: "none",
                typography: "body2",
              }}
              onClick={() => handleFilterClick("parInfirmiere")}
            >
              Par infirmière
            </Button>
            <Button
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                color:
                  selectedFilter === "parTypeDePrestation"
                    ? "primary.main"
                    : "text.secondary",
                borderBottom: selectedFilter === "parTypeDePrestation" ? 2 : 0,
                borderColor: "primary.main",
                textTransform: "none",
                typography: "body2",
              }}
              onClick={() => handleFilterClick("parTypeDePrestation")}
            >
              Par type de prestation
            </Button>
          </Box>

          {/*parInfirmiere section */}
          {selectedFilter === "parInfirmiere" && !selectedValue && (
            <Box>
              <Box
                sx={{
                  marginTop: "200px",
                  marginX: "auto",
                  display: "flex",
                  height: "40px",
                  width: "436px",
                  color: "#818EA0",
                  justifyContent: "center",
                }}
              >
                Veuillez sélectionner une infirmière parmi la liste ci-dessous.
              </Box>
              <FormControl
                sx={{
                  marginX: "auto",
                  display: "flex",
                  height: "40px",
                  width: "327px",
                  borderRadius: "6px",
                }}
              >
                <Select
                  value={selectedValue}
                  onChange={handleChange}
                  displayEmpty
                  renderValue={(selected) =>
                    selected || "Sélectionner une infirmière"
                  }
                  sx={{
                    width: "100%",
                    "& .MuiMenuItem-root": {
                      fontSize: "14px",
                      fontWeight: "500",
                    },
                  }}
                >
                  <MenuItem disableRipple>
                    <TextField
                      placeholder="Rechercher"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </MenuItem>
                  {filteredNurses.map((nurse, index) => (
                    <MenuItem key={index} value={nurse}>
                      {nurse}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
          {selectedFilter === "parInfirmiere" && renderPriceData()}

          {/*parRegion section */}
          {selectedFilter === "parRegion" && (
            // Main content for 'Par région'
            <Box>
              <Box sx={{ display: "flex", gap: 1, mb: "5px" }}>
                <Box
                  sx={{
                    flex: 2,
                    p: 1.5,
                    bgcolor: "background.paper",
                    width: "520px",
                    height: "250px",
                    top: "273px",
                    left: "336px",
                    borderRadius: "8px 0px 0px 0px",
                    border: "1px solid #E2E8F0",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography fontWeight="bold">Total</Typography>
                    <select
                      style={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        border: "1px solid #E2E8F0",
                        fontSize: "10px",
                        fontWeight: "500",
                        height: "22px",
                      }}
                    >
                      <option value="dernier-mois">Dernier mois</option>
                      <option value="3-derniers-mois">3 Derniers mois</option>
                      <option value="6-derniers-mois">6 Derniers mois</option>
                      <option value="12-derniers-mois">12 Derniers mois</option>
                    </select>
                  </Box>
                  <Box sx={{ height: "20px" }}>
                    <LineChart
                      series={[
                        {
                          data: lineData,
                          color: "#0066FF",
                          showMark: false,
                          curve: "natural",
                        },
                      ]}
                      xAxis={[
                        {
                          data: months,
                          scaleType: "point",
                          tickSize: 0,
                          tickLabelStyle: {
                            fontSize: "10px",
                            color: "#818EA0",
                          },
                        },
                      ]}
                      yAxis={[
                        {
                          min: 0,
                          max: 17000,
                          tickSize: 0,
                          tickLabelStyle: {
                            fontSize: "10px",
                            color: "#818EA0",
                          },
                        },
                      ]}
                      height={180} // Reduced height
                      margin={{ top: 5, bottom: 15, left: 40, right: 10 }}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    p: 1.5,
                    bgcolor: "background.paper",
                    borderRadius: 1,
                    width: "230px",
                    height: "250px",
                    border: "1px solid #E2E8F0",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                      height: "47px",
                    }}
                  >
                    <Typography
                      fontWeight="bold"
                      sx={{ fontSize: "16px", fontWeight: "500" }}
                    >
                      Classement
                    </Typography>
                    <select
                      style={{
                        width: "100px",
                        height: "24px",
                        padding: "4px 4px",
                        borderRadius: "4px",
                        border: "1px solid #E2E8F0",
                        fontSize: "10px",
                        fontWeight: "500",
                      }}
                    >
                      <option>Réservées</option>
                      <option>Réalisées</option>
                      <option>Annulées</option>
                    </select>
                  </Box>
                  <List
                    sx={{
                      p: 0,
                      overflow: "hidden",
                      "& .MuiListItem-root": { minHeight: "32px", py: 0.5 },
                    }}
                  >
                    {rankingData.map((region) => (
                      <ListItem
                        key={region.id}
                        sx={{
                          gap: "10px",
                          padding: "4px 8px",
                          "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" },
                          borderRadius: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            height: "24px",
                            width: "28px",
                            color: "text.secondary",
                            backgroundColor: "#F2F4F7",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          {region.id}
                        </Typography>
                        <Typography
                          sx={{ fontSize: "14px", fontWeight: "500" }}
                        >
                          {region.name}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>

              <Box
                sx={{
                  mb: "4px",
                  width: "100%",
                  height: "250px",
                  borderRadius: "8px",
                  border: "1px solid #E2E8F0",
                  padding: 2,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography fontWeight="bold" sx={{ fontSize: "16px" }}>
                    Prestations par régions
                  </Typography>
                  <Box
                    sx={{ display: "flex", gap: "16px", alignItems: "center" }}
                  >
                    {/* First Select Box */}
                    <Box
                      sx={{
                        width: selectedValue ? "200px" : "250px", // Adjust width conditionally
                        transition: "width 0.3s ease", // Smooth transition
                      }}
                    >
                      <Select
                        value={selectedRegion}
                        onChange={handleChangeRegion}
                        displayEmpty
                        renderValue={(selected) =>
                          selected ? selected : "Sélectionner une région"
                        }
                        fullWidth
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 250,
                              width: 280,
                            },
                          },
                          MenuListProps: {
                            onMouseDown: (e) => e.preventDefault(),
                          },
                        }}
                        sx={{
                          width: "80%",
                          height: "35px",
                          padding: "4px 8px",
                          borderRadius: "6px",
                          border: "1px solid #E2E8F0",
                          fontSize: "12px",
                          fontWeight: "500",
                        }}
                      >
                        {/* Search bar */}
                        <MenuItem disableRipple>
                          <TextField
                            placeholder="Rechercher une région"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{
                              fontSize: "14px",
                              fontWeight: "500",
                              backgroundColor: "transparent",
                              "& .MuiOutlinedInput-root": {
                                backgroundColor: "transparent",
                                borderRadius: "4px",
                                height: "30px",
                              },
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Search />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </MenuItem>

                        {/* Dynamic filtered options */}
                        {filteredRegions.map((region, index) => (
                          <MenuItem key={index} value={region}>
                            {region}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>

                    {/* Second Search Box (Conditionally Rendered) */}
                    {selectedRegion && (
                      <Box sx={{ width: "210px" }}>
                        <Select
                          value={selectedDepartment}
                          onChange={handleChangeDept}
                          displayEmpty
                          renderValue={(selected) =>
                            selected ? selected : "Sélectionner un département"
                          }
                          fullWidth
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 250,
                                width: 250,
                              },
                            },
                            MenuListProps: {
                              onMouseDown: (e) => e.preventDefault(),
                            },
                          }}
                          sx={{
                            width: "100%",
                            height: "35px",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            border: "1px solid #E2E8F0",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          {/* Search bar */}
                          <MenuItem disableRipple>
                            <TextField
                              placeholder="Rechercher un département"
                              variant="outlined"
                              fullWidth
                              size="small"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              sx={{
                                fontSize: "14px",
                                backgroundColor: "transparent",
                                "& .MuiOutlinedInput-root": {
                                  backgroundColor: "transparent",
                                  borderRadius: "4px",
                                  height: "30px",
                                },
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Search />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </MenuItem>

                          {/* Dynamic filtered options */}
                          {filteredDepartments.map((dep, index) => (
                            <MenuItem key={index} value={dep}>
                              {dep}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                    )}
                  </Box>
                </Box>

                <Box sx={{ height: "200px", width: "100%" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={regions}
                      margin={{ top: 20, right: 30, left: 20 }}
                    >
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Bar dataKey="value" fill="#0066FF" barSize={12} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Box>
            </Box>
          )}

          {selectedFilter === "parTypeDePrestation" && !selectedValue && (
            <Box>
              <Box
                sx={{
                  marginTop: "200px",
                  marginX: "auto",
                  display: "flex",
                  height: "40px",
                  width: "436px",
                  color: "#818EA0",
                  justifyContent: "center",
                }}
              >
                Veuillez sélectionner une infirmière parmi la liste ci-dessous.
              </Box>
              <FormControl
                sx={{
                  marginX: "auto",
                  display: "flex",
                  height: "40px",
                  width: "420px",
                  borderRadius: "6px",
                }}
              >
                <Select
                  value={selectedValue}
                  onChange={handleChange}
                  displayEmpty
                  renderValue={(selected) =>
                    selected ||
                    "Sélectionner un type de prestation parmi la liste"
                  }
                  sx={{
                    width: "100%",
                    "& .MuiMenuItem-root": {
                      fontSize: "14px",
                      fontWeight: "500",
                    },
                  }}
                >
                  <MenuItem disableRipple>
                    <TextField
                      placeholder="Rechercher"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </MenuItem>
                  {filteredServices.map((service, index) => (
                    <MenuItem key={index} value={service}>
                      {service}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}

          {selectedFilter === "parTypeDePrestation" && renderPriceData()}
        </Box>
      </Box>
    </Box>
  );
}
