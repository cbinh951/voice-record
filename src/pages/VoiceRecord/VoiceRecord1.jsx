import { useState } from 'react';
import { Button, Box } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import './VoiceRecord1.css';
import AudioRecorder from './AudioRecorder';
const VoiceRecord = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleButtonClick = () => {
    setIsRecording(!isRecording);
  };

  return (
    // is-recording
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#d8d8d8" // Change to your secondary color
    >
      <AudioRecorder />
      <button
        className={`${isRecording ? 'mic-toggle is-recording' : 'mic-toggle'}`}
        id="mic"
      >
        <Button
          onClick={handleButtonClick}
          sx={{
            position: 'relative',
            borderRadius: '50%',
            width: 100,
            height: 100,
            fontSize: '3em',
            color: '#fff',
            padding: 0,
            margin: 0,
            background: 'crimson', // Change to your primary color
            zIndex: 999,
            cursor: 'pointer',
          }}
        >
          <MicIcon sx={{ fontSize: 'inherit' }} />
        </Button>
      </button>
      <audio className="playback" controls></audio>
    </Box>
  );
};

export default VoiceRecord;
