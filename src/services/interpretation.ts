export const sendPromptToServer = async (message: string): Promise<any | undefined> => {
  const formData = new FormData();
  formData.append("message", message);

  try {
    const response = await fetch(import.meta.env.VITE_INTERPRETATION_API_URL, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("Prompt sent successfully");
      //   response.text().then((text) => {
      // const data = JSON.parse(text);
      // const interpretation = JSON.parse(data.response);
      // return interpretation;

      const responseText = await response.text();
      const data = JSON.parse(responseText);
      const interpretation = JSON.parse(data.response);
      return interpretation;
      //   });
    } else {
      console.error("Error sending prompt");
      return undefined;
    }
  } catch (error) {
    console.error("Error while sending prompt:", error);
    return undefined;
  }
};
