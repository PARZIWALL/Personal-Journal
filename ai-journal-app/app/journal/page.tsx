"use client";

import { useState } from "react";

const JournalPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [aiGeneratedContent, setAiGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);

  const generateAIContent = async (userContent: string): Promise<string> => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: userContent }),
      });

      if (!response.ok) throw new Error("Failed to generate AI content");

      const data = await response.json();
      return data.content; // Assuming backend returns the AI-modified content
    } catch (error) {
      console.error("Error generating AI content:", error);
      return userContent; // Fallback to user content
    } finally {
      setLoading(false);
    }
  };

  const saveJournalEntry = async (title: string, content: string) => {
    try {
      const response = await fetch("http://localhost:8080/journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: title, content }),
      });

      if (!response.ok) throw new Error("Failed to save journal entry");

      console.log("Journal entry saved successfully");
      alert("Journal entry saved successfully!");
    } catch (error) {
      console.error("Error saving journal entry:", error);
    }
  };

  const handleGenerateClick = async () => {
    const generatedContent = await generateAIContent(content);
    setAiGeneratedContent(generatedContent);
  };

  const handleSaveClick = () => {
    saveJournalEntry(title, aiGeneratedContent || content);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Journal Entry</h1>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <textarea
        placeholder="Write your journal entry..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-4 border rounded h-32"
      ></textarea>
      <button
        onClick={handleGenerateClick}
        className="bg-blue-500 text-white p-2 rounded mb-4"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate AI Content"}
      </button>
      {aiGeneratedContent && (
        <textarea
          value={aiGeneratedContent}
          readOnly
          className="w-full p-2 mb-4 border rounded h-32 bg-gray-100"
        ></textarea>
      )}
      <button
        onClick={handleSaveClick}
        className="bg-green-500 text-white p-2 rounded"
      >
        Save Journal Entry
      </button>
    </div>
  );
};

export default JournalPage;
