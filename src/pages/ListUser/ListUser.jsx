import { Box, Stack } from '@mui/material';
import BasicCard from '../../components/Card';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

// const users = [
//   {
//     id: '1',
//     name: 'binh',
//   },
//   {
//     id: '2',
//     name: 'cong',
//   },
// ];
const ListUser = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      const data = await fetch('https://voice-backend.cyberdino.dev/users');
      const resData = await data.json();
      console.log(resData);
      setUsers(resData);
    };
    getUser();
  }, []);
  return (
    <>
      <Stack
        sx={{ marginBottom: '50px' }}
        spacing={{ xs: 2, sm: 3 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        {users.map((user, idx) => (
          <Link to={`/voice-record?username=${user.username}`} key={idx}>
            <BasicCard name={user.username} />
          </Link>
        ))}
      </Stack>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Link to="/add">
          <BasicCard />
        </Link>
      </Box>
    </>
  );
};

export default ListUser;
