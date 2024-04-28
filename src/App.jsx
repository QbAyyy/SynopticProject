import { React, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopBar from './Components/TopBar';
import Reports from './Components/Reports';
import NewReport from './Components/NewReport'; 
import MainPage from './Components/MainPage';

const App = () => {

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };


 const [colorBlindMode, setColorBlindMode] = useState('normal'); 

  return (
    <Router>
      <div className={darkMode ? 'dark-mode' : ''}>
        <TopBar darkMode={darkMode} onToggleDarkMode={toggleDarkMode} setColorBlindMode={setColorBlindMode} colorBlindMode={colorBlindMode}/> 
        <Routes>
          <Route path="/reports" element={<Reports darkMode={darkMode} colorBlindMode={colorBlindMode}/>} />
          <Route path="/newReport" element={<NewReport darkMode={darkMode} colorBlindMode={colorBlindMode} />} />
          <Route path="/" element={<MainPage darkMode={darkMode} colorBlindMode={colorBlindMode}/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
