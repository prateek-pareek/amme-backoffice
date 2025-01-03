import React, { useState } from "react";
import {
    Box,
    Button,
    Typography,
    List,
    ListItem,
} from "@mui/material";
import { FaRegCalendarAlt } from "react-icons/fa";
import {
    ComposableMap,
    Geographies,
    Geography,
} from "react-simple-maps";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import NavBar from "../NavBar";
import SideBar from "../SideBar";

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";;

const regionsData = {
    "fr-idf": { name: "Île-de-France", patients: 827, change: 7, id: 1 },
    "fr-ara": { name: "Auvergne-Rhône-Alpes", patients: 700, change: 4, id: 2 },
    "fr-bfc": { name: "Bourgogne-Franche-C.", patients: 500, change: -2, id: 3 },
    "fr-occ": { name: "Occitanie", patients: 400, change: 1, id: 4 },
    "fr-naq": { name: "Nouvelle-Aquitaine", patients: 300, change: 3, id: 5 },
    "fr-bre": { name: "Bretagne", patients: 200, change: 1, id: 6 },
    "fr-cor": { name: "Corse", patients: 100, change: 0, id: 7 },
};

const rankingData = [
    { id: 1, name: "Île-de-France", change: 7 },
    { id: 2, name: "Auvergne-Rhône-Alpes", change: 4 },
    { id: 3, name: "Bourgogne-Franche-C.", change: -2 },
    { id: 4, name: "Occitanie", change: 1 },
    { id: 5, name: "Nouvelle-Aquitaine", change: 3 },
    { id: 6, name: "Bretagne", change: 1 },
    { id: 7, name: "Corse", change: 0 }
];

export default function CarteParRegion() {
    const [selectedDate, setSelectedDate] = useState<string>(
        "Aujourd’hui - 19 Sep 2024"
    );
    const [selectedFilter, setSelectedFilter] = useState<string>("parRegion");
    const [selectedSublist, setSelectedSublist] = useState<string>(
        "Nombre de prestations"
    );
    const [hoveredRegion, setHoveredRegion] = useState(null);


    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    const formatDate = (date: string): string => {
        if (!date) return "";
        const dateObj = new Date(date);
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "short",
            year: "numeric",
        };
        const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
            dateObj
        );
        return formattedDate.replace(/ /g, "-");
    };

    const handleFilterClick = (filter: string) => {
        setSelectedFilter(filter);
    };
    const handleRegionHover = (geo: any) => {
        setHoveredRegion(geo.id);
    };

    const handleRegionLeave = () => {
        setHoveredRegion(null);
    };

    return (
        <Box sx={{ display: "flex", bgcolor: "#F6F7F9", minHeight: "100vh" }}>
            {/* <SideBar
                selectedSublist={selectedSublist}
                setSelectedSublist={setSelectedSublist}
            /> */}
            <Box sx={{ flex: 1 }}>
                <NavBar />
                <Box
                    sx={{
                        p: "20px",
                        backgroundColor: "white",
                        flex: 1,
                        // height: "calc(100vh - 60px)",
                        height:"90vh",
                        overflow: "hidden",
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
                                Nombre de prestations
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Veuillez retrouver ici l'ensemble des comptes administrateurs
                            </Typography>
                            
                        </Box>
                        <div>
                            <div
                                className="relative flex flex-col items-center border border-gray-300 rounded px-2 py-1"
                                style={{ width: "208px", height: "40px" }}
                            >
                                <div
                                    onClick={() => document.getElementById("date-input")?.click()}
                                    className="cursor-pointer pl-8 py-1 w-full text-gray-700"
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        position: "relative",
                                    }}
                                >
                                    {selectedDate ? formatDate(selectedDate) : "Select a date"}
                                    <FaRegCalendarAlt
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                        style={{ fontSize: "16px" }}
                                    />
                                </div>
                                <input
                                    type="date"
                                    id="date-input"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </Box>


                    {/* nav buttons */}
                    <Box
                        sx={{
                            mt: "20px",
                            mb: 1,
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
                                textTransform: "capitalize",
                                typography: "body2",
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
                                textTransform: "capitalize",
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
                                    selectedFilter === "ParPharmacie"
                                        ? "primary.main"
                                        : "text.secondary",
                                borderBottom: selectedFilter === "ParPharmacie" ? 2 : 0,
                                borderColor: "primary.main",
                                textTransform: "capitalize",
                                typography: "body2",
                            }}
                            onClick={() => handleFilterClick("ParPharmacie")}
                        >
                            Par Pharmacie
                        </Button>
                    </Box>


                    {/* selected filter par region */}
                    {selectedFilter === "parRegion" && (
                        <Box sx={{ display: "flex", mt: 3 }}>
                            <Box sx={{ width: "60%", position: "relative" }}>
                                <ComposableMap
                                    projection="geoAlbers"
                                    projectionConfig={{ center: [2.5, 47], scale: 2700 }}
                                >
                                    <Geographies geography={geoUrl}>
                                        {({ geographies }) =>
                                            geographies.map((geo) => {
                                                const regionData = regionsData[geo.id];
                                                return (
                                                    <Geography
                                                        key={geo.rsmKey}
                                                        geography={geo}
                                                        onMouseEnter={() => handleRegionHover(geo)}
                                                        onMouseLeave={handleRegionLeave}
                                                        style={{
                                                            default: {
                                                                fill: hoveredRegion === geo.id ? "#B3D5FF" : "#E0E7F3",
                                                                stroke: "#fff",
                                                                strokeWidth: 0.5,
                                                                outline: 'none',
                                                            },
                                                            hover: {
                                                                fill: "#B3D5FF",
                                                                stroke: "#fff",
                                                                strokeWidth: 0.5,
                                                                outline: 'none',
                                                            },
                                                            pressed: {
                                                                fill: "#B3D5FF",
                                                                stroke: "#fff",
                                                                strokeWidth: 0.5,
                                                                outline: 'none',
                                                            }
                                                        }}
                                                    />
                                                );
                                            })
                                        }
                                    </Geographies>
                                    {hoveredRegion && regionsData[hoveredRegion] && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                padding: '8px',
                                                backgroundColor: 'white',
                                                border: '1px solid #ddd',
                                                borderRadius: '4px',
                                                zIndex: 1000,
                                                boxShadow: "0px 2px 4px rgba(0,0,0,0.1)"
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>{regionsData[hoveredRegion].name}</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>{regionsData[hoveredRegion].patients} patients</Typography>
                                        </Box>
                                    )}
                                </ComposableMap>
                            </Box>
                            <Box sx={{ width: "40%", pl: 3 }}>


                                {/* total patient box */}
                                <Box sx={{ p: 3, border: "1px solid #E2E8F0", borderRadius: "8px", mb: 3 }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "18px" }}>
                                            Total patient
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "green", display: "flex", alignItems: "center", fontWeight: 500 }}>
                                            <IoIosArrowUp style={{ fontSize: "20px" }} />
                                            +12% <span style={{ color: "black", marginLeft: "5px" }}>vs mois dernier</span>
                                        </Typography>
                                    </Box>
                                    <Typography variant="h4" sx={{ fontWeight: 600, fontSize: "32px", mb: 2, color: "#0c66e6" }}>
                                        5000
                                    </Typography>
                                </Box>

                                {/* region box */}
                                <Box sx={{ p: 3, border: "1px solid #E2E8F0", borderRadius: "8px", mb: 3 }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "18px" }}>
                                            Région
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "green", display: "flex", alignItems: "center", fontWeight: 500 }}>
                                            <IoIosArrowUp style={{ fontSize: "20px" }} />
                                            +12% <span style={{ color: "black", marginLeft: "5px" }}>vs mois dernier</span>
                                        </Typography>
                                    </Box>

                                    <Typography variant="h4" sx={{ fontWeight: 600, fontSize: "32px", mb: 2, color: "#0c66e6" }}>
                                        {hoveredRegion ? regionsData[hoveredRegion]?.patients : 827}
                                    </Typography>
                                </Box>






                                {/* patient region data */}
                                <Box sx={{ p: 3, border: "1px solid #E2E8F0", borderRadius: "8px", mb: 3, height: "40%", overflow: "auto" }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "18px", mb: 1 }}>
                                    Classement du nombre de patients par région
                                </Typography>
                                <List sx={{ p: 0 }}>
                                    {rankingData.map((item) => (
                                        <ListItem key={item.id} sx={{ display: "flex", justifyContent: "space-between", p: 0, mb: 1 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 500, display: "flex", alignItems: "center" }}>
                                                {/* Wrap the item.id inside a span with styles */}
                                                <span
                                                    style={{
                                                        display: "inline-block",
                                                        width: "30px",
                                                        height: "30px",
                                                        backgroundColor: "grey",
                                                        color: "white",
                                                        textAlign: "center",
                                                        lineHeight: "30px",
                                                        borderRadius: "4px",
                                                        marginRight: "8px"
                                                    }}>
                                                    {item.id}
                                                </span>
                                                {item.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: item.change > 0 ? "green" : "red", display: "flex", alignItems: "center", fontWeight: 500 }}>
                                                {item.change > 0 ? <IoIosArrowUp style={{ fontSize: "18px" }} /> : <IoIosArrowDown style={{ fontSize: "18px" }} />}
                                                {item.change}%
                                            </Typography>
                                        </ListItem>
                                    ))}
                                </List>
                                    </Box>

                            </Box>
                        </Box>
                    )}









                    {/* selected region parInfirmiere */}
                    {selectedFilter === "parInfirmiere" && (
                        <Box sx={{ display: "flex", mt: 3 }}>
                            <Box sx={{ width: "60%", position: "relative" }}>
                                <ComposableMap
                                    projection="geoAlbers"
                                    projectionConfig={{ center: [2.5, 47], scale: 2700 }}
                                >
                                    <Geographies geography={geoUrl}>
                                        {({ geographies }) =>
                                            geographies.map((geo) => {
                                                const regionData = regionsData[geo.id];
                                                return (
                                                    <Geography
                                                        key={geo.rsmKey}
                                                        geography={geo}
                                                        onMouseEnter={() => handleRegionHover(geo)}
                                                        onMouseLeave={handleRegionLeave}
                                                        style={{
                                                            default: {
                                                                fill: hoveredRegion === geo.id ? "#B3D5FF" : "#E0E7F3",
                                                                stroke: "#fff",
                                                                strokeWidth: 0.5,
                                                                outline: 'none',
                                                            },
                                                            hover: {
                                                                fill: "#B3D5FF",
                                                                stroke: "#fff",
                                                                strokeWidth: 0.5,
                                                                outline: 'none',
                                                            },
                                                            pressed: {
                                                                fill: "#B3D5FF",
                                                                stroke: "#fff",
                                                                strokeWidth: 0.5,
                                                                outline: 'none',
                                                            }
                                                        }}
                                                    />
                                                );
                                            })
                                        }
                                    </Geographies>
                                    {hoveredRegion && regionsData[hoveredRegion] && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                padding: '8px',
                                                backgroundColor: 'white',
                                                border: '1px solid #ddd',
                                                borderRadius: '4px',
                                                zIndex: 1000,
                                                boxShadow: "0px 2px 4px rgba(0,0,0,0.1)"
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>{regionsData[hoveredRegion].name}</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>{regionsData[hoveredRegion].patients} patients</Typography>
                                        </Box>
                                    )}
                                </ComposableMap>
                            </Box>
                            <Box sx={{ width: "40%", pl: 3 }}>


                                {/* total patient box */}
                                <Box sx={{ p: 3, border: "1px solid #E2E8F0", borderRadius: "8px", mb: 3 }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "18px" }}>
                                            Total patient
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "green", display: "flex", alignItems: "center", fontWeight: 500 }}>
                                            <IoIosArrowUp style={{ fontSize: "20px" }} />
                                            +12% <span style={{ color: "black", marginLeft: "5px" }}>vs mois dernier</span>
                                        </Typography>
                                    </Box>
                                    <Typography variant="h4" sx={{ fontWeight: 600, fontSize: "32px", mb: 2, color: "#0c66e6" }}>
                                        5000
                                    </Typography>
                                </Box>

                                {/* region box */}
                                <Box sx={{ p: 3, border: "1px solid #E2E8F0", borderRadius: "8px", mb: 3 }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "18px" }}>
                                            Région
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "green", display: "flex", alignItems: "center", fontWeight: 500 }}>
                                            <IoIosArrowUp style={{ fontSize: "20px" }} />
                                            +12% <span style={{ color: "black", marginLeft: "5px" }}>vs mois dernier</span>
                                        </Typography>
                                    </Box>

                                    <Typography variant="h4" sx={{ fontWeight: 600, fontSize: "32px", mb: 2, color: "#0c66e6" }}>
                                        {hoveredRegion ? regionsData[hoveredRegion]?.patients : 827}
                                    </Typography>
                                </Box>






                                {/* patient region data */}
                                <Box sx={{ p: 3, border: "1px solid #E2E8F0", borderRadius: "8px", mb: 3, height: "40%", overflow: "auto" }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "18px", mb: 1 }}>
                                    Classement du nombre de patients par région
                                </Typography>
                                <List sx={{ p: 0 }}>
                                    {rankingData.map((item) => (
                                        <ListItem key={item.id} sx={{ display: "flex", justifyContent: "space-between", p: 0, mb: 1 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 500, display: "flex", alignItems: "center" }}>
                                                {/* Wrap the item.id inside a span with styles */}
                                                <span
                                                    style={{
                                                        display: "inline-block",
                                                        width: "30px",
                                                        height: "30px",
                                                        backgroundColor: "grey",
                                                        color: "white",
                                                        textAlign: "center",
                                                        lineHeight: "30px",
                                                        borderRadius: "4px",
                                                        marginRight: "8px"
                                                    }}>
                                                    {item.id}
                                                </span>
                                                {item.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: item.change > 0 ? "green" : "red", display: "flex", alignItems: "center", fontWeight: 500 }}>
                                                {item.change > 0 ? <IoIosArrowUp style={{ fontSize: "18px" }} /> : <IoIosArrowDown style={{ fontSize: "18px" }} />}
                                                {item.change}%
                                            </Typography>
                                        </ListItem>
                                    ))}
                                </List>
                                    </Box>

                            </Box>
                        </Box>
                    )}






                    {/* selected region ParPharmacie */}
                    {selectedFilter === "ParPharmacie" && (
                        <Box sx={{ display: "flex", mt: 3 }}>
                            <Box sx={{ width: "60%", position: "relative" }}>
                                <ComposableMap
                                    projection="geoAlbers"
                                    projectionConfig={{ center: [2.5, 47], scale: 2700 }}
                                >
                                    <Geographies geography={geoUrl}>
                                        {({ geographies }) =>
                                            geographies.map((geo) => {
                                                const regionData = regionsData[geo.id];
                                                return (
                                                    <Geography
                                                        key={geo.rsmKey}
                                                        geography={geo}
                                                        onMouseEnter={() => handleRegionHover(geo)}
                                                        onMouseLeave={handleRegionLeave}
                                                        style={{
                                                            default: {
                                                                fill: hoveredRegion === geo.id ? "#B3D5FF" : "#E0E7F3",
                                                                stroke: "#fff",
                                                                strokeWidth: 0.5,
                                                                outline: 'none',
                                                            },
                                                            hover: {
                                                                fill: "#B3D5FF",
                                                                stroke: "#fff",
                                                                strokeWidth: 0.5,
                                                                outline: 'none',
                                                            },
                                                            pressed: {
                                                                fill: "#B3D5FF",
                                                                stroke: "#fff",
                                                                strokeWidth: 0.5,
                                                                outline: 'none',
                                                            }
                                                        }}
                                                    />
                                                );
                                            })
                                        }
                                    </Geographies>
                                    {hoveredRegion && regionsData[hoveredRegion] && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                padding: '8px',
                                                backgroundColor: 'white',
                                                border: '1px solid #ddd',
                                                borderRadius: '4px',
                                                zIndex: 1000,
                                                boxShadow: "0px 2px 4px rgba(0,0,0,0.1)"
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>{regionsData[hoveredRegion].name}</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>{regionsData[hoveredRegion].patients} patients</Typography>
                                        </Box>
                                    )}
                                </ComposableMap>
                            </Box>
                            <Box sx={{ width: "40%", pl: 3 }}>


                                {/* total patient box */}
                                <Box sx={{ p: 3, border: "1px solid #E2E8F0", borderRadius: "8px", mb: 3 }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "18px" }}>
                                            Total patient
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "green", display: "flex", alignItems: "center", fontWeight: 500 }}>
                                            <IoIosArrowUp style={{ fontSize: "20px" }} />
                                            +12% <span style={{ color: "black", marginLeft: "5px" }}>vs mois dernier</span>
                                        </Typography>
                                    </Box>
                                    <Typography variant="h4" sx={{ fontWeight: 600, fontSize: "32px", mb: 2, color: "#0c66e6" }}>
                                        5000
                                    </Typography>
                                </Box>

                                {/* region box */}
                                <Box sx={{ p: 3, border: "1px solid #E2E8F0", borderRadius: "8px", mb: 3 }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "18px" }}>
                                            Région
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "green", display: "flex", alignItems: "center", fontWeight: 500 }}>
                                            <IoIosArrowUp style={{ fontSize: "20px" }} />
                                            +12% <span style={{ color: "black", marginLeft: "5px" }}>vs mois dernier</span>
                                        </Typography>
                                    </Box>

                                    <Typography variant="h4" sx={{ fontWeight: 600, fontSize: "32px", mb: 2, color: "#0c66e6" }}>
                                        {hoveredRegion ? regionsData[hoveredRegion]?.patients : 827}
                                    </Typography>
                                </Box>






                                {/* patient region data */}
                                <Box sx={{ p: 3, border: "1px solid #E2E8F0", borderRadius: "8px", mb: 3, height: "40%", overflow: "auto" }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "18px", mb: 1 }}>
                                    Classement du nombre de patients par région
                                </Typography>
                                <List sx={{ p: 0 }}>
                                    {rankingData.map((item) => (
                                        <ListItem key={item.id} sx={{ display: "flex", justifyContent: "space-between", p: 0, mb: 1 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 500, display: "flex", alignItems: "center" }}>
                                                {/* Wrap the item.id inside a span with styles */}
                                                <span
                                                    style={{
                                                        display: "inline-block",
                                                        width: "30px",
                                                        height: "30px",
                                                        backgroundColor: "grey",
                                                        color: "white",
                                                        textAlign: "center",
                                                        lineHeight: "30px",
                                                        borderRadius: "4px",
                                                        marginRight: "8px"
                                                    }}>
                                                    {item.id}
                                                </span>
                                                {item.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: item.change > 0 ? "green" : "red", display: "flex", alignItems: "center", fontWeight: 500 }}>
                                                {item.change > 0 ? <IoIosArrowUp style={{ fontSize: "18px" }} /> : <IoIosArrowDown style={{ fontSize: "18px" }} />}
                                                {item.change}%
                                            </Typography>
                                        </ListItem>
                                    ))}
                                </List>
                                    </Box>

                            </Box>
                        </Box>
                    )}










                </Box>
            </Box>
        </Box>
    );
}