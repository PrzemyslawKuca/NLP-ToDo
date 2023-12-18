export const sendPromptToServer = async (message: string): Promise<any | undefined> => {
  const formData = new FormData();
  formData.append("message", message);

  try {
    const response = await fetch(import.meta.env.VITE_INTERPRETATION_API_URL as string, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error("Error sending prompt");
      return undefined;
    }

    console.log("Prompt sent successfully");
    const responseText = await response.text();
    const data = JSON.parse(responseText);
    const interpretation = JSON.parse(data.response);
    return interpretation;
  } catch (error) {
    console.error("Error while sending prompt:", error);
    return undefined;
  }
};
