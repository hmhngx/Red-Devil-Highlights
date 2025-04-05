import { useState, useEffect } from 'react';
import './App.css';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FaFutbol, FaMapMarkerAlt, FaTrophy } from 'react-icons/fa';

function App() {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [resultFilter, setResultFilter] = useState('all');
  const [venueFilter, setVenueFilter] = useState('all');
  const [goalsSlider, setGoalsSlider] = useState(10);
  const [minGoals, setMinGoals] = useState('');
  const [maxGoals, setMaxGoals] = useState('');
  const [error, setError] = useState(null);

  const API_KEY = "6c1560b8097a95c33a1287c88e511f5b";

  useEffect(() => {
    const fetchAllMatches = async () => {
      try {
        if (!API_KEY) {
          throw new Error('API key is missing. Please set VITE_FOOTBALL_API_KEY in .env');
        }

        const response = await fetch(
          `https://v3.football.api-sports.io/fixtures?team=33&season=2023&league=39`,
          {
            headers: { 'x-apisports-key': API_KEY }
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.response && Array.isArray(data.response)) {
          setMatches(data.response);
          setFilteredMatches(data.response);
        } else {
          throw new Error('Invalid API response structure');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAllMatches();
  }, [API_KEY]);

  useEffect(() => {
    let filtered = [...matches];

    if (searchQuery) {
      filtered = filtered.filter(match => {
        const opponent = match.teams.home.id === 33 ? match.teams.away.name : match.teams.home.name;
        return opponent.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    if (resultFilter !== 'all') {
      filtered = filtered.filter(match => {
        const isHome = match.teams.home.id === 33;
        const homeGoals = match.goals.home;
        const awayGoals = match.goals.away;

        if (resultFilter === 'win') return isHome ? homeGoals > awayGoals : awayGoals > homeGoals;
        if (resultFilter === 'loss') return isHome ? homeGoals < awayGoals : awayGoals < homeGoals;
        if (resultFilter === 'draw') return homeGoals === awayGoals;
        return true;
      });
    }

    if (venueFilter !== 'all') {
      filtered = filtered.filter(match =>
        venueFilter === 'home' ? match.teams.home.id === 33 : match.teams.away.id === 33
      );
    }

    filtered = filtered.filter(match => {
      const totalGoals = match.goals.home + match.goals.away;
      return totalGoals <= goalsSlider;
    });

    if (minGoals !== '') {
      filtered = filtered.filter(match => (match.goals.home + match.goals.away) >= Number(minGoals));
    }
    if (maxGoals !== '') {
      filtered = filtered.filter(match => (match.goals.home + match.goals.away) <= Number(maxGoals));
    }

    setFilteredMatches(filtered);
  }, [searchQuery, resultFilter, venueFilter, goalsSlider, minGoals, maxGoals, matches]);

  const totalMatches = matches.length;
  const wins = matches.filter(match => {
    const isHome = match.teams.home.id === 33;
    const homeGoals = match.goals.home;
    const awayGoals = match.goals.away;
    return isHome ? homeGoals > awayGoals : awayGoals > homeGoals;
  }).length;
  const winPercentage = totalMatches ? ((wins / totalMatches) * 100).toFixed(2) : 0;

  const chartData = matches.map(match => ({
    name: new Date(match.fixture.date).toLocaleDateString(),
    goals: match.goals.home + match.goals.away,
  }));

  return (
    <div className="dashboard">
      <h1>Manchester United 2023/2024 season Dashboard</h1>

      {error && <p className="error">Error: {error}</p>}

      {/* Summary Stats */}
      <div className="stats">
        <div className="stat-card"><FaFutbol className="icon" /><p>Total Matches</p><span>{totalMatches}</span></div>
        <div className="stat-card"><FaTrophy className="icon" /><p>Wins</p><span>{wins}</span></div>
        <div className="stat-card"><FaFutbol className="icon" /><p>Win %</p><span>{winPercentage}%</span></div>
      </div>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by opponent..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        <select value={resultFilter} onChange={(e) => setResultFilter(e.target.value)} className="filter">
          <option value="all">All Results</option>
          <option value="win">Wins</option>
          <option value="loss">Losses</option>
          <option value="draw">Draws</option>
        </select>
        <select value={venueFilter} onChange={(e) => setVenueFilter(e.target.value)} className="filter">
          <option value="all">All Venues</option>
          <option value="home">Home</option>
          <option value="away">Away</option>
        </select>
      </div>

      {/* Goals Filter */}
      <div className="goals-filter">
        <label>Total Goals (Max: {goalsSlider})</label>
        <Slider
          min={0}
          max={10}
          value={goalsSlider}
          onChange={setGoalsSlider}
          trackStyle={{ backgroundColor: '#a52a2a', height: 5 }}
          handleStyle={{ borderColor: '#a52a2a', backgroundColor: '#fff' }}
          railStyle={{ backgroundColor: '#555', height: 5 }}
        />
        <div className="min-max-inputs">
          <input type="number" placeholder="Min Goals" value={minGoals} onChange={(e) => setMinGoals(e.target.value)} className="min-max" />
          <input type="number" placeholder="Max Goals" value={maxGoals} onChange={(e) => setMaxGoals(e.target.value)} className="min-max" />
        </div>
      </div>

      {/* CHART - Now placed before the matches */}
      <div className="chart-section">
        <h2>Goals per Match</h2>
        <LineChart width={800} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="goals" stroke="#a52a2a" />
        </LineChart>
      </div>

      {/* Match List */}
      <div className="match-list">
        {filteredMatches.length > 0 ? (
          filteredMatches.map(match => (
            <div key={match.fixture.id} className="card">
              <p><strong>Opponent:</strong> {match.teams.home.id === 33 ? match.teams.away.name : match.teams.home.name}</p>
              <p><strong>Result:</strong> {match.goals.home} - {match.goals.away}</p>
              <p><strong>Venue:</strong> <FaMapMarkerAlt /> {match.teams.home.id === 33 ? 'Home' : 'Away'}</p>
            </div>
          ))
        ) : (
          <p className="no-matches">No matches found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
