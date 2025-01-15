import React from "react";

const Home = () => {
  return (
    <div className="home-container text-center py-10">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Blockchain Voting App</h1>
      <p className="text-lg text-gray-600 mb-6">
        Secure, transparent, and decentralized voting powered by blockchain technology.
      </p>
      <div className="flex justify-center gap-4">
        <a
          href="/vote"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Cast Your Vote
        </a>
        <a
          href="/blockchain"
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
        >
          View Blockchain
        </a>
        <a
          href="/analytics"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          View Analytics
        </a>
      </div>
    </div>
  );
};

export default Home;
