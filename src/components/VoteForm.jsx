import React, { useState, useEffect } from "react";

const VoteForm = () => {
  const [votingData, setVotingData] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isMining, setIsMining] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    fetch("/data/votingData.json")
      .then((response) => response.json())
      .then((data) => setVotingData(data))
      .catch((error) => console.error("Error loading voting data:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCandidate) {
      setMessage("⚠️ Please select a candidate.");
      setMessageType("error");
      return;
    }

    try {
      const transactionResponse = await fetch("https://e-nirvachan.onrender.com/transactions/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          voter_id: "voter123",
          candidate_id: selectedCandidate,
        }),
      });

      if (!transactionResponse.ok) {
        throw new Error("Failed to submit vote.");
      }

      setIsMining(true);
      const mineResponse = await fetch("https://e-nirvachan.onrender.com/mine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ miner_address: "miner123" }),
      });

      if (!mineResponse.ok) {
        throw new Error("Failed to mine a block.");
      }

      setMessage("✅ Your vote has been successfully recorded!");
      setMessageType("success");
      setFormSubmitted(true);
    } catch (error) {
      console.error("Error during voting and mining process:", error);
      setMessage("❌ An error occurred. Please try again.");
      setMessageType("error");
    } finally {
      setIsMining(false);
      setTimeout(() => setMessage(""), 4000); // Hide message after 4s
    }
  };

  if (!votingData) {
    return <div>Loading...</div>;
  }

  if (formSubmitted) {
    return <h2 className="text-green-600 font-bold text-2xl pt-20">✅ Thank you for voting!</h2>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg text-center mt-10 relative pt-20">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">{votingData.election.title}</h1>
      <p className="text-lg text-gray-600 mb-6">{votingData.election.description}</p>

      {/* Notification Message */}
      {message && (
        <div
          className={`absolute top-0 left-1/2 transform -translate-x-1/2 mt-2 px-6 py-3 rounded-lg text-white text-lg transition-all ${
            messageType === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          {votingData.candidates.map((candidate) => (
            <label
              key={candidate.id}
              className={`p-4 border rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all text-center ${
                selectedCandidate === candidate.id ? "border-green-500 border-4" : "border-gray-300"
              }`}
              onClick={() => setSelectedCandidate(candidate.id)}
            >
              <input type="radio" name="candidate" value={candidate.id} className="hidden" />
              <img src={candidate.image} alt={candidate.name} className="w-24 h-24 mx-auto rounded-full mb-2" />
              <p className="text-lg font-semibold">{candidate.name}</p>
              <p className="text-sm text-gray-500">({candidate.party})</p>
            </label>
          ))}
        </div>

        <button
          type="submit"
          className={`bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition ${
            isMining ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isMining}
        >
          {isMining ? "Mining Block..." : "🗳️ Submit Vote"}
        </button>
      </form>
    </div>
  );
};

export default VoteForm;
