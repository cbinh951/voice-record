// App.jsx
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import ListUser from './pages/ListUser/ListUser';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './pages/AddUser/AddUser';
import VoiceRecord from './pages/VoiceRecord/VoiceRecord';
import { useEffect } from 'react';
// import { useState } from 'react';

const MainContent = styled.div`
  /* Add your main content styles here */
  max-width: 720px;
  margin: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function App() {
  useEffect(() => {
    if (localStorage.getItem('firstList') !== 'false') {
      localStorage.setItem('firstList', true);
    }
    if (localStorage.getItem('addUser') !== 'false') {
      localStorage.setItem('addUser', true);
    }
    if (localStorage.getItem('record') !== 'false') {
      localStorage.setItem('record', true);
    }
    // localStorage.setItem('firstList', true);
  }, []);
  return (
    <>
      <Router>
        <GlobalStyles />
        {/* <Header /> */}
        <MainContent>
          <Routes>
            <Route path="/" element={<ListUser />} />
            <Route path="/add" element={<AddUser />} />
            <Route path="/voice-record" element={<VoiceRecord />} />
          </Routes>
        </MainContent>
      </Router>
    </>
  );
}

export default App;
