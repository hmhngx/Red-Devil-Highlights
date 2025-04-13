import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/MatchList.css';

const MatchList = ({ matches }) => {
  return (
    <div className="match-list">
      {matches.length > 0 ? (
        matches.map(match => (
          <Link to={`/match/${match.fixture.id}`} key={match.fixture.id} className="card-link">
            <div className="card">
              <p><strong>Opponent:</strong> {match.teams.home.id === 33 ? match.teams.away.name : match.teams.home.name}</p>
              <p><strong>Result:</strong> {match.goals.home} - {match.goals.away}</p>
              <p><strong>Venue:</strong> <FaMapMarkerAlt /> {match.teams.home.id === 33 ? 'Home' : 'Away'}</p>
            </div>
          </Link>
        ))
      ) : (
        <p className="no-matches">No matches found.</p>
      )}
    </div>
  );
};

export default MatchList;