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
} from "@mui/material";
import { AiFillStar } from "react-icons/ai";
import NavBar from "../NavBar";
import SideBar from "../SideBar";
import Calendar from "./Calendar";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import {
    KeyboardArrowLeft,
    KeyboardArrowRight,
} from '@mui/icons-material';

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
    }
];

const RatingStars = ({ rating }) => {
    return (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
            {[1, 2, 3, 4, 5].map((num) => (
                <AiFillStar
                    key={num}
                    size={20}
                    color={num <= rating ? '#FFD700' : '#E0E0E0'}
                />
            ))}
        </Box>
    );
};

export default function NoteDeSatisfaction() {
    const [selectedNurse, setSelectedNurse] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;
    const totalPages = Math.ceil(demoData.length / rowsPerPage);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    const handleChangePage = (newPage: number) => {
        setPage(newPage);
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
            <SideBar />
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <NavBar />
                <Box sx={{ p: 2, flex: 1, overflowY: 'auto',  [theme.breakpoints.up('md')]: {p:4} }}>
                    {/* Header */}
                    <Box sx={{ display: 'flex', flexDirection:  isMobile ? 'column' : 'row', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3, gap: 2 }}>
                        <Box>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 600,
                                    mb: 1,
                                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                                    color: '#151515'
                                }}
                            >
                                Note de satisfaction
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#818EA0',
                                    fontSize: 'clamp(0.875rem, 1.5vw, 1rem)'
                                }}
                            >
                                Veuillez retrouver ici l'ensemble des notes de satisfaction
                            </Typography>
                        </Box>

                        <Card
                            sx={{
                                minWidth:  isMobile ? '100%' : '200px',
                                height: '88px',
                                boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
                                borderRadius: '8px'
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    justifyContent: 'center',
                                    p: '16px !important'  // Override default padding
                                }}
                            >
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#818EA0',
                                            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                                            mb: 1
                                        }}
                                    >
                                        Note moyenne globale
                                    </Typography>

                                    <Typography variant="body2" sx={{ color: "green", display: "flex", alignItems: "center", fontWeight: 500 }}>
                                        <IoIosArrowUp style={{ fontSize: "20px" }} />
                                        +12% <span style={{ color: "black", marginLeft: "5px" }}>vs mois dernier</span>
                                    </Typography>
                                </Box>


                                {/* rating card */}
                                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            color: '#0c66e6',
                                            fontSize: 'clamp(1.7rem, 4vw, 2.25rem)',
                                            lineHeight: '32px'
                                        }}
                                    >
                                        {averageRating}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: '#0c66e6',
                                            fontSize: 'clamp(1.7rem, 4vw, 2.25rem)',
                                        }}
                                    >
                                        /5
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>


                    {/* Filters */}
                    <Box sx={{ display: "flex", flexDirection: isMobile ? 'column' : 'row', gap: 2, mb: 3 }}>
                        <Select
                            value={selectedNurse}
                            onChange={(e) => setSelectedNurse(e.target.value)}
                            displayEmpty
                            fullWidth
                            sx={{
                                bgcolor: "white",
                                '& .MuiSelect-select': { py: 1.5 },
                                flex: isMobile ? 'none' : 1
                            }}
                        >
                            <MenuItem value="">Sélectionner une infirmière parmi la liste</MenuItem>
                            {Array.from(new Set(demoData.map(d => d.nurse))).map(nurse => (
                                <MenuItem key={nurse} value={nurse}>{nurse}</MenuItem>
                            ))}
                        </Select>

                        <Select
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            displayEmpty
                            fullWidth
                            sx={{
                                bgcolor: "white",
                                '& .MuiSelect-select': { py: 1.5 },
                                flex: isMobile ? 'none' : 1
                            }}
                        >
                            <MenuItem value="">Sélectionner une région parmi la liste</MenuItem>
                            {Array.from(new Set(demoData.map(d => d.location))).map(location => (
                                <MenuItem key={location} value={location}>{location}</MenuItem>
                            ))}
                        </Select>

                        <Box sx={{ width: isMobile ? '100%' : 'auto' }}>
                          <Calendar />
                        </Box>
                    </Box>


                    {/* Table */}
                    <TableContainer component={Paper} sx={{ mb: 1 }}>
                        <Table size={isMobile ? 'small' : 'medium'}>
                            <TableHead sx={{ backgroundColor: '#f6f7f9' }}>
                                <TableRow>
                                    <TableCell sx={{ color: '#818ea0',  fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>Infirmière</TableCell>
                                    <TableCell sx={{ color: '#818ea0', fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>Commentaire</TableCell>
                                    <TableCell sx={{ color: '#818ea0', fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>Localisation</TableCell>
                                    <TableCell sx={{ color: '#818ea0', fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>Date</TableCell>
                                    <TableCell sx={{ color: '#818ea0', fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>Profession</TableCell>
                                    <TableCell sx={{ color: '#818ea0', fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>Évaluation</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedData.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell sx={{ fontWeight: 500, fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>{row.nurse}</TableCell>
                                        <TableCell sx={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>{row.comment}</TableCell>
                                        <TableCell sx={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>{row.location}</TableCell>
                                        <TableCell sx={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>{row.date}</TableCell>
                                        <TableCell sx={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>{row.profession}</TableCell>
                                        <TableCell>
                                            <RatingStars rating={row.rating} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                {/* Footer */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    position: 'sticky',
                    bottom: 0,
                    backgroundColor: 'white',
                    borderTop: '1px solid #E0E0E0',
                    mt: 2 // Add a top margin to separate it from the content
                }}>
                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>
                        {`${(page - 1) * rowsPerPage + 1}-${Math.min(page * rowsPerPage, filteredData.length)} sur ${filteredData.length}`}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                            onClick={() => handleChangePage(page - 1)}
                            disabled={page === 1}
                            size="small"
                        >
                            <KeyboardArrowLeft />
                        </IconButton>
                        <Typography variant="body2" sx={{ fontWeight: 600 , fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'}}>
                            {page} / {totalPages}
                        </Typography>
                        <IconButton
                            onClick={() => handleChangePage(page + 1)}
                            disabled={page === totalPages}
                            size="small"
                        >
                            <KeyboardArrowRight />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}