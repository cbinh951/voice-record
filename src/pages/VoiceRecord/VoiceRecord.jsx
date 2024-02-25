import { Box, Button } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';

const VoiceRecord = () => {
  return (
    <Box
      height={150}
      width={'auto'}
      my={4}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
    >
      <Button
        sx={{
          borderRadius: '50%',
          width: 100,
          height: 100,
          fontSize: '3em',
          color: '#fff',
          margin: 0,
          background: 'primary.main',
          position: 'relative',
          zIndex: 999,
          lineHeight: '100px',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: 'primary.main',
          userSelect: 'none',
          '&:hover': {
            backgroundColor: 'red',
          },
        }}
      >
        <MicIcon sx={{ fontSize: 'inherit' }} />
      </Button>
      Hello Binh
    </Box>
  );
};

export default VoiceRecord;
