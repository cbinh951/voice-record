import React, { useState, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import './VoiceRecord.css';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder';
// import AudioReactRecorder, { RecordState } from './AudioRecorder';
import 'audio-react-recorder/dist/index.css';
import { useNavigate, useSearchParams } from 'react-router-dom'; // Import useHistory

const VoiceRecord = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordState, setRecordState] = useState(RecordState.STOP);
  const [audioData, setAudioData] = useState(null);
  const navigate = useNavigate();
  const userNameStorage = localStorage.getItem('userName');
  const [searchParams] = useSearchParams();
  const username = searchParams.get('username');
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

  const handleRegisterRecord = async () => {
    const formData = new FormData();
    formData.append('file', audioData.blob, 'audio.wav');
    if (username) {
      formData.append('username', username);
      const response = await fetch(
        'https://voice-backend.cyberdino.dev/voice_id',
        {
          method: 'POST',
          body: formData,
        }
      );
      const responseData = await response.json();
      console.log('responseData', responseData);
      if (responseData.speaker === 'unknown') {
        const formDataGreet = new FormData();
        formDataGreet.append('username', username);

        const responseGreet = await fetch(
          'https://voice-backend.cyberdino.dev/greet',
          {
            method: 'POST',
            body: formDataGreet,
          }
        )
          .then((response) => response.arrayBuffer())
          .then((arrayBuffer) => {
            // Create audio context
            const audioContext = new (window.AudioContext ||
              window.webkitAudioContext)();

            // Decode audio data
            return audioContext
              .decodeAudioData(arrayBuffer)
              .then((audioBuffer) => {
                // Create audio source
                const source = audioContext.createBufferSource();
                source.buffer = audioBuffer;

                // Connect audio source to output (speakers)
                source.connect(audioContext.destination);

                // Start playback
                source.start();

                // Wait for 2 seconds before redirecting
                setTimeout(() => {
                  window.location.href = 'https://example.com'; // Redirect URL
                }, 2000);
              });
          })
          .catch((error) => {
            // Handle error if any
            console.error('Error:', error);
          });
        console.log('responseGreet', responseGreet);
      }
    } else {
      formData.append('username', userNameStorage);
      const response = await fetch(
        'https://voice-backend.cyberdino.dev/register',
        {
          method: 'POST',
          body: formData,
        }
      );
      const responseData = await response.json();
      console.log('responseData', responseData);
    }

    // navigate('/');
  };

  return (
    <>
      <Typography variant="h6" gutterBottom color={'white'}>
        Hello {username || userNameStorage}
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="500px"
        bgcolor="rgb(106 107 115 / 50%)"
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
          // backgroundColor="rgb(81 65 65 / 50%)"
          backgroundColor="rgb(1,55,91)"
        />
        <audio
          id="audio"
          controls
          src={audioData ? audioData.url : null}
        ></audio>
        <Button
          variant="contained"
          sx={{ position: 'absolute', top: '400px', marginTop: '30px' }}
          onClick={handleRegisterRecord}
        >
          Save
        </Button>
      </Box>
    </>
  );
};

export default VoiceRecord;
