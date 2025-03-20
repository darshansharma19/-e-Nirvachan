import React, { useState } from "react";

const VoterVerification = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [voterId, setVoterId] = useState("");
  const [error, setError] = useState("");

  const handleVerification = () => {
    if (!walletAddress || !voterId) {
      setError("Please enter both Wallet Address and Voter ID.");
      return;
    }

    setError("");
    // Call API or Blockchain Verification Logic
    alert(`Verifying:\nWallet: ${walletAddress}\nVoter ID: ${voterId}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Voter Verification
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Wallet Address Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Wallet Address:</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your Wallet Address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
        </div>

        {/* Voter ID Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold">Voter ID:</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your Voter ID"
            value={voterId}
            onChange={(e) => setVoterId(e.target.value)}
          />
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerification}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >
          Verify & Proceed
        </button>
      </div>
    </div>
  );
};

export default VoterVerification;
