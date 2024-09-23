"use client";

import { useState } from "react";

const PromptForm = () => {
  const [input, setInput] = useState(""); // Form input state
  const [queries, setQueries] = useState([]); // State to hold individual prompts
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const requestBody = { gptPrompt: input }; // Define request body
      console.log("Request body:", requestBody); // Log the request body

      const response = await fetch("/api/generate-prompts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody), // Pass the request body
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Response data:", data); // Log the response data

      // Assuming your API directly returns an array of strings
      if (Array.isArray(data.prompts)) {
        setQueries(data.prompts); // Update state with the prompts
      } else {
        throw new Error("Unexpected response format: expected an array.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle click on a box and set the form input
  const handleBoxClick = (query) => {
    setInput(query); // Update input with the text from the clicked box
  };

  return (
    <div>
      <h1>Generate Prompts</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your prompt"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display each prompt in its own box */}
      {queries.length > 0 && (
        <div className="flex flex-col gap-4 mt-4">
          {queries.map((query, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-md shadow-md text-gray-700 cursor-pointer hover:bg-gray-200 transition"
              onClick={() => handleBoxClick(query)} // Update input when box is clicked
            >
              {query}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PromptForm;