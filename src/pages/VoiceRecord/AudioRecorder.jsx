import React, { useState } from 'react';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);

  let mediaRecorder;
  let stream;

  const startRecording = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.addEventListener('dataavailable', (event) => {
        setAudioChunks((prevChunks) => [...prevChunks, event.data]);
      });

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      // Handle error (e.g., display an error message to the user)
    }
  };

  const stopRecording = () => {
    if (stream) {
      mediaRecorder.stop();
      stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const handleRecordClick = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const handlePlayback = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <div>
      <button onClick={handleRecordClick}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <button onClick={handlePlayback} disabled={audioChunks.length === 0}>
        Playback
      </button>
    </div>
  );
};

export default AudioRecorder;
