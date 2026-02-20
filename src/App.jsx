import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Layout from './components/Layout';
import CVContent from './components/CVContent';
import { CircularProgress, Box } from '@mui/material';
import { Email } from '@mui/icons-material';

const companyThemes = {
  default: {
    name: 'Default',
    palette: {
      mode: 'light',
      primary: { main: '#1976d2' },
      secondary: { main: '#dc004e' },
      background: { default: '#f5f5f5', paper: '#ffffff' },
      text: { primary: 'rgba(0, 0, 0, 0.87)', secondary: 'rgba(0, 0, 0, 0.6)' },
    },
    styles: {
      menuBackground: '#ffffff',
      fontFamily: '"Roboto", "Helvetica Neue", Arial, sans-serif',
      experienceTitleColor: '#1976d2',
      educationTitleColor: '#1976d2',
      skillsTitleColor: '#1976d2',
      image: null,
    },
  },
  google: {
    name: 'Google',
    palette: {
      mode: 'light',
      primary: { main: '#4285F4' },
      secondary: { main: '#DB4437' },
      background: { default: '#ffffff', paper: '#f1f3f4' },
    },
    styles: {
      menuBackground: '#4285F4',
      fontFamily: '"Google Sans", "Product Sans", Roboto, Arial, sans-serif',
      experienceTitleColor: '#4285F4',
      educationTitleColor: '#0F9D58',  // Google Green
      skillsTitleColor: '#FBBC05',     // Google Yellow
      image: `${import.meta.env.BASE_URL}img/google.png`,
    },
  },
  elastic: {
    name: 'Elastic',
    palette: {
      mode: 'light',
      primary: { main: '#008A5E' },
      secondary: { main: '#FEC514' },
      background: { default: '#ffffff', paper: '#F5F7FA' },
      text: { primary: '#343741', secondary: '#BC1E70', third: '#222' },
    },
    styles: {
      menuBackground: '#FACB3D',
      fontFamily: '"Inter", "DM Sans", Arial, sans-serif',
      experienceTitleColor: '#006BB4',
      educationTitleColor: '#008A5E',
      skillsTitleColor: '#BC1E70',
      image: `${import.meta.env.BASE_URL}img/elastic.png`,
    },
  },
  tinybird: {
    name: 'Tinybird',
    palette: {
      mode: 'dark',
      primary: { main: '#27F795' },
      secondary: { main: '#F9F9F9' },
      background: { default: '#25283D', paper: '#1d2033' },
      text: { primary: '#F9F9F9', secondary: '#27F795' },
    },
    styles: {
      menuBackground: '#1d2033',
      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
      experienceTitleColor: '#27F795',
      educationTitleColor: '#27F795',
      skillsTitleColor: '#27F795',
      image: `${import.meta.env.BASE_URL}img/tinybird.png`,
    },
  },
  clickhouse: {
    name: 'ClickHouse',
    palette: {
      mode: 'dark',
      primary: { main: '#FFCC01' },
      secondary: { main: '#000000' },
      background: { default: '#000000', paper: '#1a1a1a' },
      text: { primary: '#FFCC01', secondary: '#ffffff' },

    },
    styles: {
      menuBackground: '#1a1a1a',
      fontFamily: '"Share Tech Mono", "Courier New", monospace',
      experienceTitleColor: '#FFCC01',
      educationTitleColor: '#FFCC01',
      skillsTitleColor: '#FFCC01',
      image: `${import.meta.env.BASE_URL}img/clickhouse.png`,
    },
  },
  revenuecat: {
    name: 'RevenueCat',

    palette: {
      mode: 'light',
      primary: { main: '#F2545B' },
      secondary: { main: '#1F1F47' },
      background: { default: '#fff', paper: '#eeececff' },
      text: { secondary: '#576cdf' }

    },
    styles: {
      menuBackground: '#F2545B',
      fontFamily: '"Nunito", "Outfit", Arial, sans-serif',
      experienceTitleColor: '#F2545B',
      educationTitleColor: '#F2545B',
      skillsTitleColor: '#F2545B',
      image: `${import.meta.env.BASE_URL}img/revenuecat.png`,
    },
  },
  pearson: {
    name: 'Pearson',
    palette: {
      mode: 'dark',
      titleColor: '#007FA3',

      primary: { main: '#86acb5ff' },
      secondary: { main: '#F9F9F9' },
      background: { default: '#ffffff', paper: '#005A70' },
      text: { secondary: '#ffce00' },
    },
    styles: {
      menuBackground: '#1d2033',
      fontFamily: '"Open Sans", sans-serif',
      experienceTitleColor: '#007FA3',
      educationTitleColor: '#007FA3',
      skillsTitleColor: '#007FA3',
      bioColor: { body: '#555555', title: '#007FA3', email: '#ffce00', location: '#005A70', phone: '#157c96ff', redes: '#157c96ff', icon: '#157c96ff' },
      image: `${import.meta.env.BASE_URL}img/pearson-logo.png`,
    },
  },
};



const sections = [
  { id: 'about', label: 'About Me' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
];

function App() {
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getInitialTheme = () => {
    const params = new URLSearchParams(window.location.search);
    const themeParam = params.get('theme');
    return themeParam && companyThemes[themeParam] ? themeParam : 'default';
  };

  const [currentThemeKey, setCurrentThemeKey] = useState(getInitialTheme);

  const theme = useMemo(() => {
    const selectedTheme = companyThemes[currentThemeKey] || companyThemes.default;
    return createTheme({
      palette: selectedTheme.palette,
      typography: {
        fontFamily: selectedTheme.styles.fontFamily,
      },
    });
  }, [currentThemeKey]);

  const themeStyles = (companyThemes[currentThemeKey] || companyThemes.default).styles;

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}cv.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch CV data');
        }
        return response.json();
      })
      .then(data => {
        setCvData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching CV data:', error);
        setLoading(false);
      });
  }, []);

  const handleNavigate = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleThemeChange = (key) => {
    setCurrentThemeKey(key);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Layout
        sections={sections}
        onNavigate={handleNavigate}
        personalInfo={cvData ? cvData.personalInfo : null}
        currentTheme={currentThemeKey}
        onThemeChange={handleThemeChange}
        themes={companyThemes}
        themeStyles={themeStyles}
      >
        {cvData ? (
          <CVContent data={cvData} themeStyles={themeStyles} />
        ) : (
          <div>Error loading data</div>
        )}
      </Layout>
    </ThemeProvider>
  );
}

export default App;
