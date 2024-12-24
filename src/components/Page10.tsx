import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  Select,
  Typography,
} from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { ResponsiveContainer, XAxis, YAxis, Bar, BarChart } from 'recharts';
import NavBar from './NavBar';
import SideBar from './SideBar';

const lineData = [5000, 7000, 8000, 9500, 9000, 10000, 9500, 11000, 10000, 12000, 11000, 11500];
const months = ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUI', 'JUIL', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC'];

const regions = [
  { name: 'ALPES', value: 12000 },
  { name: 'BFFC', value: 4000 },
  { name: 'BRS', value: 8000 },
  { name: 'CVL', value: 6000 },
  { name: 'COR', value: 9000 },
  { name: 'GES', value: 2000 },
  { name: 'HDF', value: 13000 },
  { name: 'IDF', value: 5000 },
  { name: 'NOR', value: 7000 },
  { name: 'NAQ', value: 4000 },
  { name: 'OCC', value: 6000 },
  { name: 'PDL', value: 11000 },
  { name: 'PACA', value: 12000 }
];

const rankingData = [
  { id: 1, name: 'Île-de-France' },
  { id: 2, name: 'Auvergne-Rhône' },
  { id: 3, name: 'Bourgogne-Fr' },
  { id: 4, name: 'Occitanie' },
  { id: 5, name: 'Nouvelle-Aquitaine' },
  { id: 6, name: 'Bretagne' }
];

export default function Page10() {
  const [selectedDate, setSelectedDate] = useState<string>("Aujourd’hui - 19 Sep 2024");
  const [selectedFilter, setSelectedFilter] = useState<string>('parRegion'); // State to track selected filter

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
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(dateObj);
    return formattedDate.replace(/ /g, "-"); // Replace spaces with dashes
  };

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter); // Update the filter based on the button clicked
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: '#F6F7F9', minHeight: '100vh' }}>
      {/* Sidebar */}
      <SideBar/>

      {/* Main content */}
      <Box sx={{ flex: 1 }}>
        <NavBar/>
        <Box sx={{ p: '20px', backgroundColor: 'white', flex: 1, height: 'calc(100vh - 60px)', overflow: 'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
            <Box>
              <Typography variant="h5" gutterBottom sx={{fontSize:'24px', fontWeight:'600'}}>Nombre de prestations</Typography>
              <Typography variant="body2" color="text.secondary">
                Veuillez retrouver ici l'ensemble des comptes administrateurs
              </Typography>
            </Box>
            <div>
              {/* Date Picker */}
              <div className="relative flex flex-col items-center border border-gray-300 rounded px-2 py-1" style={{ width: '208px', height: '40px' }}>
                {/* Custom date display */}
                <div
                  onClick={() => document.getElementById("date-input")?.click()} // Trigger the hidden input
                  className="cursor-pointer pl-8 py-1 w-full text-gray-700"
                  style={{ fontSize: '14px', fontWeight: '500', position: 'relative' }}
                >
                  {/* Display formatted date */}
                  {selectedDate ? formatDate(selectedDate) : "Select a date"}

                  {/* Calendar Icon */}
                  <FaRegCalendarAlt
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    style={{ fontSize: '16px' }}
                  />
                </div>

                {/* Hidden input for date selection */}
                <input
                  type="date"
                  id="date-input"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="hidden" // Hide the default input
                />
              </div>
            </div>
          </Box>

          {/* Filter Buttons */}
          <Box sx={{ mt: '20px', mb: 1, display: 'flex', gap: 2, boxSizing: 'border-box', borderBottom: '1px solid #E2E8F0' }}>
            <Button
              sx={{
                fontSize: '14px',
                fontWeight: '500',
                color: selectedFilter === 'parRegion' ? 'primary.main' : 'text.secondary',
                borderBottom: selectedFilter === 'parRegion' ? 2 : 0,
                borderColor: 'primary.main',
                textTransform: 'capitalize',
                typography: 'body2',
              }}
              onClick={() => handleFilterClick('parRegion')}
            >
              Par région
            </Button>
            <Button
              sx={{
                fontSize: '14px',
                fontWeight: '500',
                color: selectedFilter === 'parInfirmiere' ? 'primary.main' : 'text.secondary',
                borderBottom: selectedFilter === 'parInfirmiere' ? 2 : 0,
                borderColor: 'primary.main',
                textTransform: 'capitalize',
                typography: 'body2',
              }}
              onClick={() => handleFilterClick('parInfirmiere')}
            >
              Par infirmière
            </Button>
          </Box>

          {/* Conditional rendering of nurse selection */}
          {selectedFilter === 'parInfirmiere' ? (
            // Show the "Par infirmière" section
            <Box>
              <Box 
            sx={{ marginTop: '200px', marginX: 'auto', display: 'flex', height: '40px', width: '436px', color: '#818EA0' }}>
              Veuillez sélectionner une infirmière parmi la liste ci-dessous.
            </Box>
            <FormControl sx={{ marginX: 'auto', display: 'flex', height: '40px', width: '327px', borderRadius: '6px' }}>
              <InputLabel id="demo-simple-select-label" sx={{ fontSize: '14px', fontWeight: 500, color: '#151515' }}>
                Sélectionner une infirmière parmi la liste
              </InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Infirmière">
                {/* Add your MenuItem options here */}
              </Select>
            </FormControl>
            </Box>
          ) : (
            // Main content for 'Par région'
            <Box>
              <Box sx={{ display: 'flex', gap: 2, mb: '10px' }}>
              <Box sx={{ flex: 2, p: 2, bgcolor: 'background.paper', width: '728px', height: '280px', top: '273px', left: '336px', borderRadius: '8px 0px 0px 0px', border: '1px solid #E2E8F0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography fontWeight="bold">Total</Typography>
                  <select style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #E2E8F0', fontSize: '12px', fontWeight: '500' }}>
                    <option>12 derniers mois</option>
                  </select>
                </Box>
                <Box sx={{ height: '20px' }}>
                  <LineChart
                    series={[{ data: lineData, color: '#0066FF', showMark: false, curve: 'natural' }]}
                    xAxis={[{ data: months, scaleType: 'point', tickSize: 0, tickLabelStyle: { fontSize: 10, color: '#818EA0' }}]}
                    yAxis={[{ min: 0, max: 17000, tickSize: 0, tickLabelStyle: { fontSize: 10 } }]}
                    height={180} // Reduced height
                    margin={{ top: 10, bottom: 20, left: 40, right: 10 }}
                  />
                </Box>
              </Box>

              <Box sx={{ flex: 1, p: 2, bgcolor: 'background.paper', borderRadius: 1, width: '328px', height: '280px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, height: '47px' }}>
                  <Typography fontWeight="bold" sx={{ fontSize: '16px', fontWeight: '500' }}>
                    Classement
                  </Typography>
                  <select style={{ width: '136px', height: '32px', padding: '4px 4px', borderRadius: '4px', border: '1px solid #E2E8F0', fontSize: '12px', fontWeight: '500' }}>
                    <option>Réservées</option>
                    <option>Réalisées</option>
                    <option>Annulées</option>
                  </select>
                </Box>
                <List sx={{ p: 0, overflow: 'hidden', '& .MuiListItem-root': { minHeight: '32px', py: 0.5 } }}>
                  {rankingData.map((region) => (
                    <ListItem key={region.id} sx={{ gap: '10px', padding: '4px 8px', '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }, borderRadius: 1 }}>
                      <Typography sx={{ height: '24px', width: '28px', color: 'text.secondary', backgroundColor: '#F2F4F7', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', fontWeight: '500' }}>
                        {region.id}
                      </Typography>
                      <Typography sx={{ fontSize: '14px' }}>
                        {region.name}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>

            <Box sx={{ mb: '4px', width: '1300px', height: '300px', borderRadius: '8px', border: '1px solid #E2E8F0', padding: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography fontWeight="bold" sx={{ fontSize: '16px' }}>Prestations par régions</Typography>
                <select style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #E2E8F0', fontSize: '12px', fontWeight: '500' }}>
                  <option>Sélectionner une région</option>
                </select>
              </Box>
              <Box sx={{ height: '250px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regions} margin={{ top: 20, right: 30, left: 20 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Bar dataKey="value" fill="#0066FF" barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
