import './App.css';
import React from 'react';
import './css/styleguide.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';


function App() {
  return (
    <div className="PC">
      <Header />
      <div className='section'>
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}

export default App;
