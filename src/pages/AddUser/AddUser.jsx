import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

const AddUser = () => {
  return (
    <div>
      <TextField
        fullWidth
        id="outlined-basic"
        label="User name"
        variant="outlined"
        sx={{ marginBottom: '20px' }}
      />
      <Link to="/voice-record">
        <Button variant="contained" size="large">
          Save
        </Button>
      </Link>
    </div>
  );
};

export default AddUser;
