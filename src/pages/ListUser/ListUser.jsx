import { Box, Stack, Typography } from '@mui/material';
import BasicCard from '../../components/Card';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Tour from 'reactour';

const tourConfig = [
  {
    selector: '[data-tut="reactour__list-user"]',
    content: `Please select your name.`,
  },
  {
    selector: '[data-tut="reactour__add-user"]',
    content: `Click this button to add a new user.`,
  },
];
const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const accentColor = '#5cb7b7';
  const closeTour = () => {
    setIsTourOpen(false);
    localStorage.setItem('firstList', false);
  };

  useEffect(() => {
    const getUser = async () => {
      const data = await fetch('https://voice-backend.cyberdino.dev/users');
      const resData = await data.json();
      console.log(resData);
      setUsers(resData);
    };
    getUser();
    const firstLogin = localStorage.getItem('firstList');
    console.log(('firstLogin', firstLogin));
    setIsTourOpen(firstLogin === 'true');
  }, []);

  return (
    <>
      <Box data-tut="reactour__list-user">
        <Typography
          variant="h5"
          component="div"
          color={'white'}
          marginBottom={'20px'}
        >
          Please select your name
        </Typography>
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
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        data-tut="reactour__add-user"
      >
        <Link to="/add">
          <BasicCard />
        </Link>
      </Box>
      <Tour
        onRequestClose={closeTour}
        steps={tourConfig}
        isOpen={isTourOpen}
        maskClassName="mask"
        className="helper"
        rounded={5}
        accentColor={accentColor}
        // onAfterOpen={this.disableBody}
        // onBeforeClose={this.enableBody}
      />
    </>
  );
};

export default ListUser;
