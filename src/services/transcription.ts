export const sendAudioToServer = async (audioBlob: Blob | null): Promise<string | undefined> => {
  if (!audioBlob) return undefined;

  const formData = new FormData();
  formData.append("file", audioBlob, "recording.wav");

  try {
    const response = await fetch(import.meta.env.VITE_TRANSCRIPTION_API_URL, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("Audio sent successfully");
      const responseText = await response.text();
      const data = JSON.parse(responseText);
      const transcription = data.response;
      return transcription;
    } else {
      console.error("Error sending audio");
      return undefined;
    }
  } catch (error) {
    console.error("Error while sending audio:", error);
    return undefined;
  }
};
