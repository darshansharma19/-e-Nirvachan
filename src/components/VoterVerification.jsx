import React, { useState } from "react";
import { ethers } from "ethers";

const VoterVerification = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [voterId, setVoterId] = useState("");
  const [error, setError] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        setIsConnected(true);
      } catch (err) {
        setError("Failed to connect wallet.");
      }
    } else {
      setError("MetaMask or Phantom wallet not found.");
    }
  };

  const handleVerification = () => {
    const voterIdPattern = /^[A-Z]{3}[0-9]{7}$/;
    if (!walletAddress || !voterId.match(voterIdPattern)) {
      setError("Please enter a valid Wallet Address and Voter ID (Format: ABC1234567).");
      return;
    }
    setError("");
    alert(`Verifying:\nWallet: ${walletAddress}\nVoter ID: ${voterId}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-20">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Voter Verification
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Connect Wallet Button */}
        {!isConnected ? (
          <button
            onClick={connectWallet}
            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700 transition mb-4"
          >
            Connect Wallet
          </button>
        ) : (
          <p className="text-green-600 text-center mb-4">Wallet Connected: {walletAddress}</p>
        )}

        {/* Voter ID Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold">Voter ID:</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your Voter ID (ABC1234567)"
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
