import React, { useState, useEffect } from "react";

const BlockchainView = () => {
  const [blockchain, setBlockchain] = useState([]);
  const [votingData, setVotingData] = useState(null);

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
    } catch (error) {
      console.error("Error fetching voting data:", error);
    }
  };

  if (!votingData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="blockchain-view-container">
      <h1 className="text-3xl font-bold mb-4">Blockchain View</h1>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Blockchain Data:</h2>
        <ul className="list-disc pl-6">
          {blockchain.map((block) => (
            <li key={block.index} className="mb-4">
              <strong>Block #{block.index}</strong>
              <pre className="bg-gray-100 p-2 rounded mt-1">
                {JSON.stringify(
                  {
                    index: block.index,
                    timestamp: block.timestamp,
                    proof: block.proof,
                    previous_hash: block.previous_hash,
                  },
                  null,
                  2
                )}
              </pre>
              <div className="mt-2">
                <h3 className="text-xl font-semibold">Transactions:</h3>
                <ul className="list-disc pl-6">
                  {block.transactions.map((transaction, idx) => (
                    <li key={idx}>
                      Voter ID: {transaction.voter_id}, Candidate:{" "}
                      {votingData.candidates.find(
                        (c) => c.id === transaction.candidate_id
                      )?.name || "Unknown"}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlockchainView;
