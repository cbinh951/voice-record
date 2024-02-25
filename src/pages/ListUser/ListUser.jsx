import { Stack } from '@mui/material';
import BasicCard from '../../components/Card';
// import { Link } from 'react-router-dom';

const users = [
  {
    id: '1',
    name: 'binh',
  },
  {
    id: '2',
    name: 'cong',
  },
];
const ListUser = () => (
  <>
    <Stack
      sx={{ marginBottom: '50px' }}
      spacing={{ xs: 2, sm: 3 }}
      direction="row"
      useFlexGap
      flexWrap="wrap"
    >
      {users.map((user) => (
        <BasicCard name={user.name} key={user.id} />
      ))}
    </Stack>
    {/* <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Link to="/add">
        <BasicCard />
      </Link>
    </Box> */}
  </>
);

export default ListUser;
