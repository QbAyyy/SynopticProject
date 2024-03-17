import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/topBar.css'

const TopBar = ({ darkMode, onToggleDarkMode }) => {
	const handleToggle = () => {
		onToggleDarkMode();
	};

	return (
		<div className="top-bar">
			<div className='title'>PrivacyProtect</div>
			
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

