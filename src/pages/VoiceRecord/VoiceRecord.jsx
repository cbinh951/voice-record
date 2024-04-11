import { useState, useEffect } from 'react';
import { Button, Box, Typography, CircularProgress } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import './VoiceRecord.css';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder';
// import AudioReactRecorder, { RecordState } from './AudioRecorder';
import 'audio-react-recorder/dist/index.css';
import { useNavigate, useSearchParams } from 'react-router-dom'; // Import useHistory
import Tour from 'reactour';
import useStore from '../../globalStore';

const tourConfigRecord = [
  {
    selector: '[data-tut="reactour__icon-mic"]',
    content: `Click here to record`,
  },
  {
    selector: '[data-tut="reactour__btn-audio"]',
    content: `Click here to play audio.`,
  },
  {
    selector: '[data-tut="reactour__btn-save"]',
    content: `Click this button to identify user.`,
  },
];

const VoiceRecord = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordState, setRecordState] = useState(RecordState.STOP);
  const [audioData, setAudioData] = useState(null);
  const [isIdentifySuccess, setIsIdentifySuccess] = useState(false);
  const [loadingRecognition, setLoadingRecognition] = useState(false);
  const navigate = useNavigate();
  const userNameStorage = localStorage.getItem('userName');
  const [searchParams] = useSearchParams();
  const username = searchParams.get('username');
  const [isTourOpen, setIsTourOpen] = useState(false);
  const accentColor = '#5cb7b7';
  const [idMusic, setIdMusic] = useState(0);
  const { setLoginSuccess } = useStore();

  useEffect(() => {
    const record = localStorage.getItem('record');
    console.log(('addUser', record));
    setIsTourOpen(record === 'true');
  }, []);

  useEffect(() => {
    let timeout;
    if (isRecording) {
      timeout = setTimeout(() => {
        handleStopRecording();
      }, 5000); // Stop recording after 5 seconds
    }
    return () => clearTimeout(timeout);
  }, [isRecording]);

  const closeTour = () => {
    setIsTourOpen(false);
    localStorage.setItem('record', false);
  };

  const handleButtonClick = () => {
    if (isRecording) {
      handleStopRecording();
    } else {
      setIsRecording(true);
      setRecordState(RecordState.START);
      setIdMusic('');
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setRecordState(RecordState.STOP);
  };

  const onStop = (data) => {
    setAudioData(data);
    setIsRecording(false);
    handleRegisterRecord(data);
  };

  const handleRegisterRecord = async (data) => {
    const formData = new FormData();
    formData.append('file', audioData?.blob || data?.blob, 'audio.wav');
    if (isIdentifySuccess) {
      setLoadingRecognition(true);
      try {
        const response = await fetch(
          'https://voice-backend.cyberdino.dev/command',
          {
            method: 'POST',
            body: formData,
          }
        );
        const data = await response.json();
        console.log('data', data);
        if (data.command === 'play music') {
          setIdMusic(data.value);
        } else {
          navigate('/');
        }
        return;
      } catch {
        console.log('error');
      } finally {
        setLoadingRecognition(false);
      }
    }

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
      if (responseData.speaker !== 'unknown') {
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
                  // window.location.href = 'https://example.com'; // Redirect URL
                  setIsIdentifySuccess(true);
                }, 2000);
              });
          })
          .catch((error) => {
            // Handle error if any
            console.error('Error:', error);
          })
          .finally(() => {
            setLoginSuccess(true);
          });
        console.log('responseGreet', responseGreet);
      } else if (responseData.speaker === 'unknown') {
        const formDataGreetUnknown = new FormData();
        formDataGreetUnknown.append('username', 'unknown');

        await fetch('https://voice-backend.cyberdino.dev/greet', {
          method: 'POST',
          body: formDataGreetUnknown,
        })
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
              });
          })
          .catch((error) => {
            // Handle error if any
            console.error('Error:', error);
          })
          .finally(() => {
            console.log('Finished playing unknown greeting sound.');
            setLoginSuccess(true);
          });
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
      navigate('/');
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom color={'white'}>
        Hello {username || userNameStorage}
        {isIdentifySuccess
          ? ', Please talk:'
          : ', Please identify using your voice'}
      </Typography>
      <Box sx={{ display: 'flex', gap: '20px' }}>
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
            data-tut="reactour__icon-mic"
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
            data-tut="reactour__btn-audio"
          ></audio>
          <Button
            variant="contained"
            sx={{ position: 'absolute', top: '400px', marginTop: '30px' }}
            onClick={handleRegisterRecord}
            data-tut="reactour__btn-save"
          >
            Submit
          </Button>
        </Box>

        {loadingRecognition && <CircularProgress />}
        {idMusic ? (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${idMusic}?autoplay=1`}
            title="YouTube Video Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        ) : (
          ''
        )}
      </Box>

      <Tour
        onRequestClose={closeTour}
        steps={tourConfigRecord}
        isOpen={isTourOpen}
        maskClassName="mask-record"
        className="helper"
        rounded={5}
        accentColor={accentColor}
      />
    </>
  );
};

export default VoiceRecord;
