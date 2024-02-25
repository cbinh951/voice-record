// Header.js
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: '#333', width: '100%', marginBottom: '100px' }}
    >
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* <Link to="/">Voice</Link> */}
            Voice
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
