import React, { useEffect, useState } from 'react';
import { FaChartLine, FaEquals, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const TeamStats = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('https://v3.football.api-sports.io/teams/statistics', {
          headers: {
            'x-apisports-key': import.meta.env.VITE_FOOTBALL_API_KEY
          }
        });
        const data = await res.json();
        setStats(data.response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="stats-loading glowing-stats-loading">Loading team stats...</div>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!stats) return null;

  return (
    <div className="team-stats glowing-team-stats">
      <h2 className="glowing-stats-title">Season Statistics</h2>
      <div className="stats-grid">
        <div className="stat-item glowing-stat-item">
          <FaChartLine className="stat-icon" />
          <h3>Form</h3>
          <p>{stats.form}</p>
        </div>
        <div className="stat-item glowing-stat-item win">
          <FaThumbsUp className="stat-icon" />
          <h3>Wins</h3>
          <p>{stats.fixtures.wins.total}</p>
        </div>
        <div className="stat-item glowing-stat-item loss">
          <FaThumbsDown className="stat-icon" />
          <h3>Losses</h3>
          <p>{stats.fixtures.loses.total}</p>
        </div>
        <div className="stat-item glowing-stat-item draw">
          <FaEquals className="stat-icon" />
          <h3>Draws</h3>
          <p>{stats.fixtures.draws.total}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamStats;