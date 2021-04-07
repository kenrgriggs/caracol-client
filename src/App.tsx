import React from 'react';
// import LoginPage from './components/Login/Login'
// import Projects from './components/Project/ProjectTable'
import LandingPage from './components/LandingPage'

// import './App.css';

function App() {

  return (
    <div>
      {/* I would like for the login page to be the first thing that appears when you navigate to it, showing no other information. I need to figure out how to set it up so that upon authentication (and authorization, based on user role) you are directed to the LandingPage where you can view user, project, and asset tables. */}
      {/* <LoginPage />
      <Projects /> */}
      <LandingPage />
    </div>
  );
}

export default App;
