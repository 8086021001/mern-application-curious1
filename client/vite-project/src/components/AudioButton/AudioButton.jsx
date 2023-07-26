import { Button } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import MicIcon from '@mui/icons-material/Mic';


const mimeType = "audio/webm";

const AudioButton = ({ handleAudio }) => {

    const [recording, setRecording] = useState(false);
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);





    const handleAudiorec = () => {
        if (recording) {
            handleAudioRecStop()
        } else {
            handleAudioRecStart()
        }

    }


    const handleAudioRecStart = () => {
        console.log("Start audio recording...By giving permission");
        startRecording()
        setRecording(true)
    };

    const handleAudioRecStop = () => {
        console.log("Stop audio recording...");
        stopRecording()
        setRecording(false);
    };




    const startRecording = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });

                setPermission(true);
                setStream(streamData);


                setRecordingStatus("recording");
                //create new Media recorder instance using the stream

                const media = new MediaRecorder(streamData, { type: mimeType });
                //set the MediaRecorder instance to the mediaRecorder ref

                mediaRecorder.current = media;
                //invokes the start method to start the recording process
                mediaRecorder.current.start();
                let localAudioChunks = [];
                console.log("stream data", mediaRecorder)

                mediaRecorder.current.ondataavailable = (event) => {
                    if (typeof event.data === "undefined") return;
                    if (event.data.size === 0) return;
                    localAudioChunks.push(event.data);
                };
                setAudioChunks(localAudioChunks);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const stopRecording = () => {
        setRecordingStatus("inactive");
        //stops the recording instance
        console.log("stream data", mediaRecorder)
        stream.getTracks().forEach((track) => track.stop());


        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            // const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioBlob);
            setAudioChunks([]);
        };
    };

    useEffect(() => {
        if (audio !== null) {
            console.log("my first audio url", audio)
            handleAudio(audio)
        }

    }, [audio, stream])



    return (
        <>
            <Button
                sx={{

                    backgroundColor: 'transparent',
                    borderRadius: '2rem',
                    '&:hover': {
                        backgroundColor: 'black'
                    }
                }}
                onClick={handleAudiorec}>
                <MicIcon />
            </Button>
        </>
    )
}

export default AudioButton
