import { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import SettingsIcon from '@mui/icons-material/Settings';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import './App.css';
import { Control } from './components/Control.component';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './App.css';
import { CssBaseline } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  const [bottomNavigationValue, setBottomNavigationValue] = useState(0);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Paper square sx={{ pb: '50px', minHeight: '100vh' }}>
        <Router>
          <Routes>
            <Route path="/" element={<Control />} />
          </Routes>
        </Router>
      </Paper>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels={true}
          value={bottomNavigationValue}
          onChange={(_event, newValue) => {
            setBottomNavigationValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Control"
            icon={<ControlCameraIcon />}
          />
          <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
        </BottomNavigation>
      </Paper>
    </ThemeProvider>
  );
}
