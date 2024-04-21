import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/topBar.css'

const TopBar = ({ darkMode, onToggleDarkMode,colorBlindMode, setColorBlindMode }) => {
	const handleToggle = () => {
		onToggleDarkMode();
	};

	const colorBlindModes = ['normal', 'protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia'];


	return (
		<div className={darkMode ? "top-bar-dark":"top-bar"}>
			<div className={darkMode ? "title-dark" : 'title'}>PrivacyProtect</div>
			
			<div className='toggle-container'>
				<input
					type="checkbox"
					id="darkModeToggle"
					checked={darkMode}
					onChange={handleToggle}
					className="toggle-input"
				/>
				<label htmlFor="darkModeToggle" className="toggle-label"/>
			</div>
			<select value={colorBlindMode} onChange={(e) => setColorBlindMode(e.target.value)}>
				{colorBlindModes.map((mode, index) => (
					<option key={index} value={mode}>{mode.charAt(0).toUpperCase() + mode.slice(1)}</option>
				))}
			</select>
			<div className='top-bar-controls'> 
				<Link to="/reports">
					<button>Reports</button>
				</Link>
				<Link to="/newReport">
					<button>New Report</button>
				</Link>
			</div>
		</div>
	);
};

export default TopBar;

