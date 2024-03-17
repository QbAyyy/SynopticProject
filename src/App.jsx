import { React, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopBar from './Components/TopBar';
import Reports from './Components/Reports'; // Assuming you have a Reports component
import NewReport from './Components/NewReport'; // Assuming you have a NewReport component

const App = () => {

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <Router>
      <div className={darkMode ? 'dark-mode' : ''}>
        <TopBar darkMode={darkMode} onToggleDarkMode={toggleDarkMode} /> {/* Place your TopBar component outside the Routes */}
        <Routes>
          <Route path="/reports" element={<Reports darkMode={darkMode} />} />
          <Route path="/newReport" element={<NewReport darkMode={darkMode} />} />
          {/* Add more routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
