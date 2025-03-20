import React, { useState, useEffect } from "react";

const BlockchainView = () => {
  const [blockchain, setBlockchain] = useState([]);
  const [votingData, setVotingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlockchain();
    fetchVotingData();
  }, []);

  const fetchBlockchain = async () => {
    try {
      const response = await fetch("http://localhost:5000/chain");
      if (!response.ok) {
        throw new Error("Failed to fetch blockchain data.");
      }
      const data = await response.json();
      setBlockchain(data.chain);
    } catch (error) {
      console.error("Error fetching blockchain:", error);
    }
  };

  const fetchVotingData = async () => {
    try {
      const response = await fetch("/data/votingData.json");
      const data = await response.json();
      setVotingData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching voting data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
        Blockchain View
      </h1>

      {blockchain.length === 0 ? (
        <p className="text-center text-gray-600">No blockchain data available.</p>
      ) : (
        <div className="grid gap-6">
          {blockchain.map((block) => (
            <div key={block.index} className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500">
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">Block #{block.index}</h2>
              <p className="text-gray-600">
                <strong>Timestamp:</strong> {new Date(block.timestamp * 1000).toLocaleString()}
              </p>
              <p className="text-gray-600">
                <strong>Proof:</strong> {block.proof}
              </p>
              <p className="text-gray-600">
                <strong>Previous Hash:</strong> {block.previous_hash}
              </p>

              {block.transactions.length > 0 ? (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-blue-500">Transactions:</h3>
                  <ul className="list-disc pl-6 mt-2">
                    {block.transactions.map((transaction, idx) => (
                      <li key={idx} className="text-gray-700">
                        <strong>Voter ID:</strong> {transaction.voter_id} | 
                        <strong> Candidate:</strong>{" "}
                        {votingData?.candidates?.find((c) => c.id === transaction.candidate_id)?.name || "Unknown"}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500 mt-3">No transactions in this block.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlockchainView;
