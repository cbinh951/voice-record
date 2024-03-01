import { Box, Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const AddUser = () => {
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
        />
      </Box>
      <Link to="/voice-record">
        <Button variant="contained" size="large" sx={{ marginTop: '20px' }}>
          Save
        </Button>
      </Link>
    </Box>
  );
};

export default AddUser;
