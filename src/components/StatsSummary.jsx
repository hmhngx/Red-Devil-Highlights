import { FaFutbol, FaTrophy } from 'react-icons/fa';
import "../styles/StatsSummary.css";

const StatsSummary = ({ totalMatches, wins }) => {
  const winPercentage = totalMatches ? ((wins / totalMatches) * 100).toFixed(2) : 0;

  return (
    <div className="stats">
      <div className="stat-card">
        <FaFutbol className="icon" />
        <p>Total Matches</p>
        <span>{totalMatches}</span>
      </div>
      <div className="stat-card">
        <FaTrophy className="icon" />
        <p>Wins</p>
        <span>{wins}</span>
      </div>
      <div className="stat-card">
        <FaFutbol className="icon" />
        <p>Win %</p>
        <span>{winPercentage}%</span>
      </div>
    </div>
  );
};

export default StatsSummary;