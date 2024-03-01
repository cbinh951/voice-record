import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleAddUser = () => {
    localStorage.setItem('userName', userName);
    navigate('/voice-record');
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
      <Button
        variant="contained"
        size="large"
        sx={{ marginTop: '20px' }}
        onClick={handleAddUser}
      >
        Save
      </Button>
    </Box>
  );
};

export default AddUser;
