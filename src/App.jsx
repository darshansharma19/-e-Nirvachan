import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import VoteForm from "./components/VoteForm";
import BlockchainView from "./components/BlockchainView";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import "./styles/tailwind.css";

const App = () => (
    <Router>
        <Navigation />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vote" element={<VoteForm />} />
            <Route path="/blockchain" element={<BlockchainView />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
        </Routes>
    </Router>
);

export default App;
