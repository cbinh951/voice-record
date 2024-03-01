// App.jsx
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header'; // Assuming you have a Header component
import ListUser from './pages/ListUser/ListUser';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './pages/AddUser/AddUser';
import VoiceRecord from './pages/VoiceRecord/VoiceRecord1';

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
