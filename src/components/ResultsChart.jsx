import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../styles/ResultsChart.css';

const ResultsChart = ({ matches }) => {
  const chartData = matches.map(match => {
    const isHome = match.teams.home.id === 33;
    const homeGoals = match.goals.home;
    const awayGoals = match.goals.away;
    const result =
      (isHome && homeGoals > awayGoals) || (!isHome && awayGoals > homeGoals)
        ? 'Win'
        : (isHome && homeGoals < awayGoals) || (!isHome && awayGoals < homeGoals)
        ? 'Loss'
        : 'Draw';

    return {
      name: new Date(match.fixture.date).toLocaleDateString(),
      Win: result === 'Win' ? 1 : 0,
      Loss: result === 'Loss' ? 1 : 0,
      Draw: result === 'Draw' ? 1 : 0,
    };
  });

  return (
    <div className="chart-section">
      <h2>Match Results Over Time</h2>
      <BarChart width={800} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Win" fill="#4CAF50" />
        <Bar dataKey="Loss" fill="#F44336" />
        <Bar dataKey="Draw" fill="#FFC107" />
      </BarChart>
    </div>
  );
};

export default ResultsChart;