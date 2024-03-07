import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tour from 'reactour';

const tourConfig = [
  {
    selector: '[data-tut="reactour__add-input"]',
    content: `Please enter your name.`,
  },
  {
    selector: '[data-tut="reactour__btn-add"]',
    content: `Click this button to save a new user.`,
  },
];

const AddUser = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const [isTourOpen, setIsTourOpen] = useState(false);
  const accentColor = '#5cb7b7';

  useEffect(() => {
    const addUser = localStorage.getItem('addUser');
    console.log(('addUser', addUser));
    setIsTourOpen(addUser === 'true');
  }, []);
  const handleAddUser = () => {
    localStorage.setItem('userName', userName);
    navigate('/voice-record');
  };

  const closeTour = () => {
    setIsTourOpen(false);
    localStorage.setItem('addUser', false);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection={'column'}
      height="500px"
      width="500px"
      bgcolor="rgb(81 65 65 / 50%)"
    >
      <Box data-tut="reactour__add-input">
        <Typography variant="h6" gutterBottom color={'white'}>
          Please enter username
        </Typography>
        <Box sx={{ backgroundColor: 'white', width: '215px' }}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="User name"
            variant="filled"
            backgroundColor="white"
            onChange={(e) => setUserName(e.target.value)}
          />
        </Box>
      </Box>
      <Button
        variant="contained"
        size="large"
        sx={{ marginTop: '20px' }}
        onClick={handleAddUser}
        data-tut="reactour__btn-add"
      >
        Save
      </Button>
      <Tour
        onRequestClose={closeTour}
        steps={tourConfig}
        isOpen={isTourOpen}
        maskClassName="mask"
        className="helper"
        rounded={5}
        accentColor={accentColor}
      />
    </Box>
  );
};

export default AddUser;
