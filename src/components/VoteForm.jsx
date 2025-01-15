import React, { useState, useEffect } from "react";

const VoteForm = () => {
  const [votingData, setVotingData] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isMining, setIsMining] = useState(false);

  useEffect(() => {
    fetch("/data/votingData.json")
      .then((response) => response.json())
      .then((data) => setVotingData(data))
      .catch((error) => console.error("Error loading voting data:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCandidate) {
      alert("Please select a candidate.");
      return;
    }

    try {
      // Submit the vote as a transaction
      const transactionResponse = await fetch("http://localhost:5000/transactions/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          voter_id: "voter123", // Replace with dynamic voter ID if available
          candidate_id: selectedCandidate,
        }),
      });

      if (!transactionResponse.ok) {
        throw new Error("Failed to submit vote.");
      }

      const transactionResult = await transactionResponse.json();
      console.log("Transaction submitted:", transactionResult.message);

      // Start mining the block
      setIsMining(true);
      const mineResponse = await fetch("http://localhost:5000/mine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          miner_address: "miner123", // Replace with dynamic miner address if available
        }),
      });

      if (!mineResponse.ok) {
        throw new Error("Failed to mine a block.");
      }

      const mineResult = await mineResponse.json();
      console.log("Block mined:", mineResult.block);

      alert(`Block successfully mined:\n${JSON.stringify(mineResult.block, null, 2)}`);
      setFormSubmitted(true);
    } catch (error) {
      console.error("Error during voting and mining process:", error);
      alert("An error occurred. Please check the console for details.");
    } finally {
      setIsMining(false);
    }
  };

  if (!votingData) {
    return <div>Loading...</div>;
  }

  if (formSubmitted) {
    return <h2>Thank you for voting! Your block has been mined.</h2>;
  }

  return (
    <div className="vote-form-container">
      <h1 className="text-3xl font-bold mb-4">{votingData.election.title}</h1>
      <p className="text-lg text-gray-600 mb-6">{votingData.election.description}</p>
      <form onSubmit={handleSubmit}>
        <ul className="mb-4">
          {votingData.candidates.map((candidate) => (
            <li key={candidate.id} className="mb-2">
              <label>
                <input
                  type="radio"
                  name="candidate"
                  value={candidate.id}
                  onChange={() => setSelectedCandidate(candidate.id)}
                  className="mr-2"
                />
                {candidate.name} ({candidate.party})
              </label>
            </li>
          ))}
        </ul>
        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
            isMining ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isMining}
        >
          {isMining ? "Mining Block..." : "Submit Vote"}
        </button>
      </form>
    </div>
  );
};

export default VoteForm;
