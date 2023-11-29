import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { sendAudioToServer } from "../../services/transcription";
import { sendPromptToServer } from "../../services/interpretation";
import useBoards from "../../hooks/taskManagment";

function InputSection() {
  const { addTask, moveTask, deleteTask } = useBoards();

  const [transcription, setTransctiption] = useState<string>("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  useEffect(() => {
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      alert("Recording not supported by your browser.");
      return;
    }
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      const audioChunks: BlobPart[] = [];
      recorder.ondataavailable = (event: BlobEvent) => {
        audioChunks.push(event.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        setAudioBlob(audioBlob);

        sendAudioToServer(audioBlob).then((transcription: any) => {
          if (transcription) {
            setTransctiption(transcription);
          } else {
            console.log("No transcription available or an error occurred.");
          }
        });
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const sendTranscriptionToServer = (prompt: string) => {
    sendPromptToServer(prompt).then((interpretation: any) => {
      console.log(interpretation);

      if (interpretation) {
        switch (interpretation.type) {
          case "CREATE":
            addTask(interpretation);
            break;
          case "MOVE":
            moveTask(interpretation);
            break;
          case "DELETE":
            deleteTask(interpretation);
            break;
        }
      } else {
        console.log("No interpretation available or an error occurred.");
      }
    });
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{
        "&": { m: "10px auto", display: "flex", justifyContent: "center", flexWrap: "wrap" },
        "& .MuiButtonBase-root": { m: "0 10px" },
        "& .MuiInputBase-input": { width: "350px" },
      }}
    >
      <TextField
        id="outlined-basic"
        label="Prompt"
        variant="outlined"
        size="small"
        value={transcription}
        onChange={(e) => {
          setTransctiption(e.target.value);
        }}
      />
      <Button
        variant="contained"
        color={isRecording ? "error" : "success"}
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </Button>
      <Button variant="contained" onClick={() => sendTranscriptionToServer(transcription)}>
        Upload command
      </Button>
    </Box>
  );
}

export default InputSection;
