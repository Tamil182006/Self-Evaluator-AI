
import { useState } from 'react';

function SelfIntroInput({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim() !== '') {
      onSubmit(input);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4"> Self-Intro Evaluator</h1>
      <textarea
        className="w-full h-40 p-3 border rounded-lg mb-4"
        placeholder="Paste or type your self-introduction here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Rate Me
      </button>
    </div>
  );
}

export default SelfIntroInput;
