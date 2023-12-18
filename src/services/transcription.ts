export const sendAudioToServer = async (audioBlob: Blob | null): Promise<string | undefined> => {
  if (!audioBlob) return undefined;

  const formData = new FormData();
  formData.append("file", audioBlob, "recording.wav");

  try {
    const response = await fetch(import.meta.env.VITE_TRANSCRIPTION_API_URL as string, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error("Error sending audio");
      return undefined;
    }

    console.log("Audio sent successfully");
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error while sending audio:", error);
    return undefined;
  }
};
