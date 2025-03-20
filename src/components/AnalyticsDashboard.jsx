import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const generateColors = (numColors) => {
  return Array.from({ length: numColors }, (_, i) => `hsl(${(i * 360) / numColors}, 70%, 50%)`);
};

const AnalyticsDashboard = () => {
  const [blockchain, setBlockchain] = useState([]);
  const [votingData, setVotingData] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [colors, setColors] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    fetchVotingData();
    fetchBlockchain();
  }, []);

  const fetchVotingData = async () => {
    try {
      const response = await fetch("/data/votingData.json");
      if (!response.ok) throw new Error("Failed to fetch voting data.");
      const data = await response.json();
      setVotingData(data);
    } catch (error) {
      console.error("Error loading voting data:", error);
    }
  };

  const fetchBlockchain = async () => {
    try {
      const response = await fetch("https://e-nirvachan.onrender.com/chain");
      if (!response.ok) throw new Error("Failed to fetch blockchain data.");
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

    let total = 0;
    blockchain.forEach((block) => {
      block.transactions.forEach((transaction) => {
        if (transaction.candidate_id && candidateVotes[transaction.candidate_id]) {
          candidateVotes[transaction.candidate_id].votes += 1;
          total += 1;
        }
      });
    });

    const analyticsData = Object.values(candidateVotes).sort((a, b) => b.votes - a.votes);
    setAnalytics(analyticsData);
    setTotalVotes(total);
    setColors(generateColors(analyticsData.length));
  };

  if (!blockchain.length || !votingData || !analytics) {
    return <div className="text-center text-lg font-semibold mt-10">Loading analytics...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">Election Analytics Dashboard</h1>

      {/* Flexbox Layout: Left (Pie Chart) & Right (Leaderboard) */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Section: Pie Chart */}
        <div className="w-full lg:w-1/2 bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Votes Per Candidate</h2>
          <div className="flex justify-center">
            <PieChart width={400} height={400}>
              <Pie data={analytics} dataKey="votes" nameKey="name" cx="50%" cy="50%" outerRadius={150}>
                {analytics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        {/* Right Section: Leaderboard Table */}
        <div className="w-full lg:w-1/2 bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Leaderboard</h2>
          <p className="text-lg font-semibold mb-2 text-center">Total Votes Placed: {totalVotes}</p>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-2 border border-gray-300">Rank</th>
                <th className="p-2 border border-gray-300">Candidate</th>
                <th className="p-2 border border-gray-300">Votes</th>
                <th className="p-2 border border-gray-300">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {analytics.map((candidate, index) => (
                <tr key={index} className="border border-gray-300 bg-white">
                  <td className="p-2 border border-gray-300">{index + 1}</td>
                  <td className="p-2 border border-gray-300">{candidate.name}</td>
                  <td className="p-2 border border-gray-300">{candidate.votes}</td>
                  <td className="p-2 border border-gray-300">
                    {totalVotes > 0 ? ((candidate.votes / totalVotes) * 100).toFixed(2) + "%" : "0%"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AnalyticsDashboard;
