import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or App Name */}
        <div className="flex items-center space-x-3">
          <img
            src="https://vectorseek.com/wp-content/uploads/2023/09/Election-Commission-Of-India-Logo-Vector.svg-.png"
            alt="Election Commission Logo"
            className="h-10 w-auto"
          />
          <Link to="/" className="text-2xl font-bold">
            e-Nirvachan
          </Link>
        </div>
        {/* Navigation Links */}
        <ul className="flex space-x-4 mr-8">
          <li>
            <Link
              to="/"
              className="hover:underline font-bold"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/vote"
              className="hover:underline font-bold"
            >
              Vote
            </Link>
          </li>
          <li>
            <Link
              to="/blockchain"
              className="hover:underline font-bold"
            >
              Blockchain
            </Link>
          </li>
          <li>
            <Link
              to="/analytics"
              className="hover:underline font-bold"
            >
              Analytics
            </Link>
          </li>
          <li>
            <Link
              to="/VoterVerification"
              className="hover:underline font-bold"
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
