export async function evaluateIntro(userIntro) {
  try {
    const response = await fetch('http://localhost:3001/api/evaluate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ intro: userIntro }),
    });

    const data = await response.json();
    return data.result || " No output from Gemini.";
  } catch (err) {
    console.error("Frontend API Error:", err);
    return " Request failed.";
  }
}
