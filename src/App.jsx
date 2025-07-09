// src/App.jsx
import { useState } from "react";
import SelfIntroInput from "./components/SelfIntroInput";
import { evaluateIntro } from "./api/gemini"; // Gemini call

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleIntroSubmit = async (intro) => {
    setLoading(true);
    const rawOutput = await evaluateIntro(intro);
    console.log("Gemini Output:", rawOutput);
    // Extracting sections using simple split
    const ratingMatch = rawOutput.match(/\*\*Rating:\*\* (.*)/);
    const strengthsMatch = rawOutput
      .split("**Strengths:**")[1]
      ?.split("**Weaknesses:**")[0]
      ?.trim();
    const weaknessesMatch = rawOutput
      .split("**Weaknesses:**")[1]
      ?.split("**Actionable Tips to Improve:**")[0]
      ?.trim();
    const tipsMatch = rawOutput
      .split("**Actionable Tips to Improve:**")[1]
      ?.trim();

    setResult({
      rating: ratingMatch ? ratingMatch[1].trim() : "N/A",
      strengths:
        strengthsMatch
          ?.split("*")
          .filter((s) => s.trim())
          .map((s) => s.trim()) || [],
      weaknesses:
        weaknessesMatch
          ?.split("*")
          .filter((w) => w.trim())
          .map((w) => w.trim()) || [],
      tips:
        tipsMatch
          ?.split("*")
          .filter((t) => t.trim())
          .map((t) => t.trim()) || [],
    });

    setLoading(false);
  };

  return (
    <div>
      <SelfIntroInput onSubmit={handleIntroSubmit} />

      {loading && (
        <div className="text-center mt-4 text-blue-600 font-semibold">
          Evaluating your self-intro...
        </div>
      )}

      {result && (
        <div className="max-w-xl mx-auto mt-6 p-4 border rounded-lg bg-gray-100">
          <h2 className="text-xl font-semibold mb-2">AI Evaluation</h2>

          <p>
            <strong>Rating:</strong> {result.rating}
          </p>

          <div className="mt-4">
            <strong>Strengths:</strong>
            <ul className="list-disc list-inside text-green-700">
              {result.strengths.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <strong> Weaknesses:</strong>
            <ul className="list-disc list-inside text-red-700">
              {result.weaknesses.map((w, idx) => (
                <li key={idx}>{w}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <strong> Tips to Improve:</strong>
            <ul className="list-disc list-inside text-blue-700">
              {result.tips.map((t, idx) => (
                <li key={idx}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
