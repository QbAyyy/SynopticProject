import { React, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopBar from './Components/TopBar';
import Reports from './Components/Reports'; // Assuming you have a Reports component
import NewReport from './Components/NewReport'; // Assuming you have a NewReport component
import { MainPage } from './Components/MainPage';

const App = () => {

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };


 const [colorBlindMode, setColorBlindMode] = useState('normal'); 

  return (
    <Router>
      <div className={darkMode ? 'dark-mode' : ''}>
        <TopBar darkMode={darkMode} onToggleDarkMode={toggleDarkMode} setColorBlindMode={setColorBlindMode} colorBlindMode={colorBlindMode}/> {/* Place your TopBar component outside the Routes */}
        <Routes>
          <Route path="/reports" element={<Reports darkMode={darkMode} colorBlindMode={colorBlindMode}/>} />
          <Route path="/newReport" element={<NewReport darkMode={darkMode} colorBlindMode={colorBlindMode} />} />
          <Route path="/" element={<MainPage darkMode={darkMode} colorBlindMode={colorBlindMode}/>} />
          {/* Add more routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
