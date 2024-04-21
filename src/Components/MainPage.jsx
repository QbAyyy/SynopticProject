import '../CSS/mainPage.css'


export const MainPage = ({ darkMode, onToggleDarkMode }) => {


	const handleToggle = () => {
		onToggleDarkMode();
	}

    

    return(
        <div className="mainDiv"> 
        Show my 3 reports here, and add a button to move to newReports but passing the 3-4 reports that I've generated for the smart cameras I assessed

        TODO:
            -Report comparison
            -When low score, show how this may be bad for users
            -
        </div>
    )
}