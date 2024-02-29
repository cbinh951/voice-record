import React, { useState, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import './VoiceRecord1.css';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder';
import 'audio-react-recorder/dist/index.css';
import { useNavigate } from 'react-router-dom'; // Import useHistory

const VoiceRecord = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordState, setRecordState] = useState(RecordState.STOP);
  const [audioData, setAudioData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let timeout;
    if (isRecording) {
      timeout = setTimeout(() => {
        handleStopRecording();
      }, 6000); // Stop recording after 5 seconds
    }
    return () => clearTimeout(timeout);
  }, [isRecording]);

  const handleButtonClick = () => {
    if (isRecording) {
      handleStopRecording();
    } else {
      setIsRecording(true);
      setRecordState(RecordState.START);
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setRecordState(RecordState.STOP);
  };

  const onStop = (data) => {
    setAudioData(data);
    setIsRecording(false);
    console.log('onStop: audio data', data);
  };

  const handleRegisterRecord = () => {
    navigate('/');
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Hello Binh Pham
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="500px"
        bgcolor="#d8d8d8"
        position={'relative'}
      >
        <button
          className={`${
            isRecording ? 'mic-toggle is-recording' : 'mic-toggle'
          }`}
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
              background: 'crimson',
              zIndex: 999,
              cursor: 'pointer',
            }}
          >
            <MicIcon sx={{ fontSize: 'inherit' }} />
          </Button>
        </button>
        <AudioReactRecorder
          state={recordState}
          onStop={onStop}
          backgroundColor="#d8d8d8"
          sx={{ position: 'absolute', top: 0 }}
        />
        {audioData && (
          <audio
            id="audio"
            controls
            src={audioData ? audioData.url : null}
          ></audio>
        )}
        <Button
          variant="contained"
          sx={{ position: 'absolute', top: '400px' }}
          onClick={handleRegisterRecord}
        >
          Save
        </Button>
      </Box>
    </>
  );
};

export default VoiceRecord;
