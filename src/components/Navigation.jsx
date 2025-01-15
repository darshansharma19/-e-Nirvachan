import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or App Name */}
        <div className="text-2xl font-bold">
          <Link to="/">Blockchain Voting</Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/"
              className="hover:underline"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/vote"
              className="hover:underline"
            >
              Vote
            </Link>
          </li>
          <li>
            <Link
              to="/blockchain"
              className="hover:underline"
            >
              Blockchain
            </Link>
          </li>
          <li>
            <Link
              to="/analytics"
              className="hover:underline"
            >
              Analytics
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
