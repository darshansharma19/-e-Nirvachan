import React from "react";

const Home = () => {
  return (
    <div className="home-container text-center py-10 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-lg">
        {/* Logo */}
        <img
          src="https://vectorseek.com/wp-content/uploads/2023/09/Election-Commission-Of-India-Logo-Vector.svg-.png"
          alt="Election Commission of India"
          className="mx-auto w-40 mb-4"
        />

        {/* Title */}
        <h1 className="text-5xl font-bold text-blue-700 mb-2">
          Election Commission of India
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Ensuring Free, Fair, and Tamper-Proof Elections with Blockchain Technology.
        </p>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-6 mb-8">
          <a
            href="/vote"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            🗳️ Cast Your Vote
          </a>
          <a
            href="/blockchain"
            className="bg-gray-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-700 transition"
          >
            🔗 View Blockchain
          </a>
          <a
            href="/analytics"
            className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            📊 View Analytics
          </a>
        </div>

        {/* Election Timeline */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">
            🗓️ Upcoming Elections
          </h2>
          <ul className="text-gray-700 text-lg space-y-2">
            <li>📌 Voter Registration Deadline: <strong>Sept 30, 2025</strong></li>
            <li>📌 Election Day: <strong>Nov 15, 2025</strong></li>
            <li>📌 Results Announcement: <strong>Nov 20, 2025</strong></li>
          </ul>
        </div>

        {/* Voter Statistics */}
        <div className="grid grid-cols-3 gap-4 text-center mb-6">
          <div className="bg-green-100 p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold text-green-700">🗳️ 120M+</h3>
            <p className="text-gray-700">Registered Voters</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold text-yellow-700">80M+</h3>
            <p className="text-gray-700">Votes Cast</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold text-red-700">99.9%</h3>
            <p className="text-gray-700">Blockchain Security</p>
          </div>
        </div>

        {/* Important Announcements */}
        <div className="bg-red-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-red-700 mb-3">
            🚨 Important Announcements
          </h2>
          <p className="text-gray-700">
            🔹 The last date for online voter registration is <strong>Sept 30, 2025</strong>.
          </p>
          <p className="text-gray-700">
            🔹 Ensure you have your voter ID ready before election day.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
