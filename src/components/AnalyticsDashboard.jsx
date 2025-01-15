import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AnalyticsDashboard = () => {
  const [blockchain, setBlockchain] = useState([]);
  const [votingData, setVotingData] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchVotingData();
    fetchBlockchain();
  }, []);

  const fetchVotingData = async () => {
    try {
      const response = await fetch("/data/votingData.json");
      if (!response.ok) {
        throw new Error("Failed to fetch voting data.");
      }
      const data = await response.json();
      setVotingData(data);
    } catch (error) {
      console.error("Error loading voting data:", error);
    }
  };

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

  useEffect(() => {
    if (blockchain.length > 0 && votingData) {
      calculateAnalytics();
    }
  }, [blockchain, votingData]);

  const calculateAnalytics = () => {
    const candidateVotes = votingData.candidates.reduce((acc, candidate) => {
      acc[candidate.id] = { name: candidate.name, votes: 0 };
      return acc;
    }, {});

    blockchain.forEach((block) => {
      block.transactions.forEach((transaction) => {
        if (transaction.candidate_id && candidateVotes[transaction.candidate_id]) {
          candidateVotes[transaction.candidate_id].votes += 1;
        }
      });
    });

    setAnalytics(Object.values(candidateVotes));
  };

  if (!blockchain.length || !votingData || !analytics) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="analytics-dashboard-container">
      <h1 className="text-3xl font-bold mb-4">Election Analytics Dashboard</h1>
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-2xl font-semibold mb-4">Votes Per Candidate</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={analytics}
            dataKey="votes"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label={({ name, votes }) => `${name}: ${votes}`}
          >
            {analytics.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
